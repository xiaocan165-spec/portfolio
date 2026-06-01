import type { Scoring, Decision, DecisionLevel } from "./types";

const DIMENSION_COUNT = 6;

export function computeDecision(scoring: Scoring): Decision {
  const dims = [
    scoring.market_demand.score,
    scoring.competition.score,
    scoring.profit_margin.score,
    scoring.logistics.score,
    scoring.repurchase.score,
    scoring.differentiation.score,
  ];

  const total = dims.reduce((sum, s) => sum + s, 0);
  const average = Math.round((total / DIMENSION_COUNT) * 10) / 10;

  let level: DecisionLevel;
  if (average >= 8) {
    level = "强烈推荐";
  } else if (average >= 7) {
    level = "建议入场";
  } else if (average >= 5) {
    level = "谨慎评估";
  } else {
    level = "不建议入场";
  }

  const labels: Record<DecisionLevel, string> = {
    强烈推荐: "综合评分优秀，各项指标均衡，建议优先入场",
    建议入场: "综合评分良好，关注风险项后可考虑入场",
    谨慎评估: "存在明显短板，需深入调研后再做决策",
    不建议入场: "多项指标偏低，当前条件下不建议投入",
  };

  return {
    average_score: average,
    level,
    label: labels[level],
  };
}
