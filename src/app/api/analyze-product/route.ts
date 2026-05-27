import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { buildPrompt, parseAIResponse } from "@/lib/ai";
import { generateDemoAnalysis } from "@/lib/demo";
import { AnalyzeRequest } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body: AnalyzeRequest = await request.json();

    if (!body.productName || !body.market || !body.platform) {
      return NextResponse.json(
        { error: "Missing required fields: productName, market, platform" },
        { status: 400 }
      );
    }

    const provider = process.env.AI_PROVIDER || "deepseek";

    const client = new OpenAI({
      apiKey:
        provider === "openai"
          ? process.env.OPENAI_API_KEY
          : process.env.DEEPSEEK_API_KEY,
      baseURL:
        provider === "openai"
          ? process.env.OPENAI_BASE_URL || "https://api.openai.com/v1"
          : process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com",
    });

    const model =
      process.env.AI_MODEL ||
      (provider === "openai" ? "gpt-4o" : "deepseek-chat");

    const prompt = buildPrompt(body);

    let parsed;
    let fromAI = false;

    try {
      const completion = await client.chat.completions.create({
        model,
        messages: [
          {
            role: "system",
            content:
              "You are a senior cross-border e-commerce product analyst. You output ONLY valid JSON, no markdown, no code blocks, no extra text.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      });

      const rawResponse = completion.choices[0]?.message?.content || "";

      if (rawResponse) {
        const aiParsed = parseAIResponse(rawResponse);
        if (
          aiParsed.market_analysis &&
          aiParsed.user_profile &&
          aiParsed.content &&
          aiParsed.insights
        ) {
          parsed = aiParsed;
          fromAI = true;
        }
      }
    } catch (aiError) {
      console.warn(
        "AI API failed, falling back to demo mode:",
        aiError instanceof Error ? aiError.message : aiError
      );
    }

    // Fallback to demo mode if AI fails or returns invalid data
    if (!fromAI) {
      parsed = generateDemoAnalysis(body);
    }

    return NextResponse.json(parsed);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Analysis failed:", message);

    // Last-resort fallback
    try {
      const body: AnalyzeRequest = await request.clone().json().catch(() => ({
        productName: "Unknown Product",
        market: "欧美" as const,
        platform: "TikTok" as const,
      }));
      const fallback = generateDemoAnalysis(body);
      return NextResponse.json(fallback);
    } catch {
      return NextResponse.json(
        { error: "AI暂时无法分析，请稍后再试" },
        { status: 500 }
      );
    }
  }
}
