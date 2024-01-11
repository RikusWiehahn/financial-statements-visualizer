export const UiModes = {
  LIGHT: "LIGHT",
  DARK: "DARK",
  DEFAULT: "DEFAULT",
} as const;
export type UiMode = (typeof UiModes)[keyof typeof UiModes];

export interface StockQuote {
  exchange?: string;
  shortname?: string;
  quoteType?: string;
  symbol?: string;
  longname?: string;
  exchDisp?: string;
  sector?: string;
  industry?: string;
  isYahooFinance?: boolean;
}

export interface StatementsVisualization {
  periods: string[];
  commonStock: number[];
  price: number[];
  currentAssets: number[];
  nonCurrentAssets: number[];
  currentLiabilities: number[];
  nonCurrentLiabilities: number[];
  revenue: number[];
  costOfRevenue: number[];
  researchAndDevelopment: number[];
  sellingGeneralAndAdmin: number[];
  netIncome: number[];
  netOpsCash: number[];
  netInvestingCash: number[];
  netFinancingCash: number[];
  cashAtEnd: number[];
}

export interface StockQuoteSummary {
  name?: string;
  summary?: string;
  industry?: string;
  sector?: string;
  insiderOwnership?: number;
  priceToBook?: number;
  currentRatio?: number;
  quickRatio?: number;
  debtToEquity?: number;
  grossMargin?: number;
  operatingMargin?: number;
  profitMargin?: number;
  returnOnAssets?: number;
  returnOnEquity?: number;
  annualStatements: StatementsVisualization;
  quarterlyStatements: StatementsVisualization;
}
