// EXIM.IM SaaS Platform - Module 2: Fuzzy Sanctions Screener (Levenshtein Distance)

export interface SanctionEntity {
  entityId: string;
  entityName: string;
  registrySource: 'OFAC_SDN' | 'UN_SECURITY_COUNCIL' | 'EU_SANCTIONS' | 'UK_HMT' | 'DGFT_DENIED';
  programType: string;
  country: string;
  address?: string;
}

export interface ScreeningMatch {
  entity: SanctionEntity;
  similarityScore: number; // 0.0 to 1.0 (100% exact match)
  levenshteinDistance: number;
  matchType: 'EXACT' | 'HIGH_RISK_FUZZY' | 'MODERATE_FUZZY' | 'LOW_RISK';
}

export interface SanctionsScreeningResult {
  queryEntityName: string;
  thresholdScore: number;
  totalEntitiesChecked: number;
  hasHighRiskMatches: boolean;
  matches: ScreeningMatch[];
}

export const MOCK_DENIED_PARTIES: SanctionEntity[] = [
  {
    entityId: 'denied-1',
    entityName: 'Vostok Trading & Shipping Ltd',
    registrySource: 'OFAC_SDN',
    programType: 'RUSSIA-EO14024',
    country: 'RUS',
    address: 'Naberezhnaya 14, St. Petersburg, Russia'
  },
  {
    entityId: 'denied-2',
    entityName: 'Al-Farooq Maritime Logistics Enterprise',
    registrySource: 'UN_SECURITY_COUNCIL',
    programType: 'COUNTER-TERRORISM-UNSC1267',
    country: 'YEM',
    address: 'Port Area, Al Hudaydah, Yemen'
  },
  {
    entityId: 'denied-3',
    entityName: 'Caspian Shipping Line Joint Stock Co',
    registrySource: 'EU_SANCTIONS',
    programType: 'CRIMEA-SEVASTOPOL',
    country: 'IRN',
    address: 'Bandar Anzali Free Trade Zone, Iran'
  },
  {
    entityId: 'denied-4',
    entityName: 'Apex Global Logistics & Trading Pvt Ltd', // Not sanctioned - for clean test
    registrySource: 'DGFT_DENIED',
    programType: 'EXPORTER-ALERT-WATCH',
    country: 'IND',
    address: 'Mumbai, India'
  }
];

/**
 * Calculates standard Levenshtein distance between two strings.
 */
export function calculateLevenshteinDistance(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();

  const m = s1.length;
  const n = s2.length;

  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[m][n];
}

/**
 * Calculates similarity score between 0.0 and 1.0 based on Levenshtein distance.
 */
export function calculateSimilarityScore(str1: string, str2: string): number {
  const maxLen = Math.max(str1.trim().length, str2.trim().length);
  if (maxLen === 0) return 1.0;
  const dist = calculateLevenshteinDistance(str1, str2);
  const score = 1.0 - dist / maxLen;
  return Number(score.toFixed(3));
}

/**
 * Screens an entity name against denied party lists using fuzzy Levenshtein matching.
 */
export function screenEntity(entityName: string, thresholdScore: number = 0.70): SanctionsScreeningResult {
  const matches: ScreeningMatch[] = [];

  for (const entity of MOCK_DENIED_PARTIES) {
    const similarity = calculateSimilarityScore(entityName, entity.entityName);
    const distance = calculateLevenshteinDistance(entityName, entity.entityName);

    if (similarity >= thresholdScore) {
      let matchType: 'EXACT' | 'HIGH_RISK_FUZZY' | 'MODERATE_FUZZY' | 'LOW_RISK' = 'LOW_RISK';
      if (similarity >= 0.95) matchType = 'EXACT';
      else if (similarity >= 0.80) matchType = 'HIGH_RISK_FUZZY';
      else if (similarity >= 0.70) matchType = 'MODERATE_FUZZY';

      matches.push({
        entity,
        similarityScore: similarity,
        levenshteinDistance: distance,
        matchType
      });
    }
  }

  matches.sort((a, b) => b.similarityScore - a.similarityScore);

  const hasHighRiskMatches = matches.some(m => m.similarityScore >= 0.80);

  return {
    queryEntityName: entityName,
    thresholdScore,
    totalEntitiesChecked: MOCK_DENIED_PARTIES.length,
    hasHighRiskMatches,
    matches
  };
}
