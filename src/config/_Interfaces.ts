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

export interface AnnualTimeSeriesRecord {
  date: string;
  trailingBasicAverageShares: number;
  trailingTotalOperatingIncomeAsReported: number;
  trailingNetIncomeFromContinuingOperationNetMinorityInterest: number;
  trailingReconciledDepreciation: number;
  trailingDilutedEPS: number;
  trailingNormalizedEBITDA: number;
  trailingOperatingRevenue: number;
  trailingNetIncomeIncludingNoncontrollingInterests: number;
  trailingBasicEPS: number;
  trailingSellingGeneralAndAdministration: number;
  trailingOtherNonOperatingIncomeExpenses: number;
  trailingResearchAndDevelopment: number;
  trailingCostOfRevenue: number;
  trailingDilutedNIAvailtoComStockholders: number;
  trailingNetIncome: number;
  trailingEBIT: number;
  trailingOperatingExpense: number;
  trailingNetIncomeContinuousOperations: number;
  trailingNormalizedIncome: number;
  trailingNetIncomeCommonStockholders: number;
  trailingTaxRateForCalcs: number;
  trailingTotalExpenses: number;
  trailingDilutedAverageShares: number;
  trailingReconciledCostOfRevenue: number;
  trailingPretaxIncome: number;
  trailingGrossProfit: number;
  trailingEBITDA: number;
  trailingOperatingIncome: number;
  trailingNetIncomeFromContinuingAndDiscontinuedOperation: number;
  trailingOtherIncomeExpense: number;
  trailingTotalRevenue: number;
  trailingTaxProvision: number;
}

export interface QtrTimeSeriesData {
	date: string;
	quarterlyDuefromRelatedPartiesCurrent: number;
	quarterlyTotalDebt: number;
	quarterlyDuetoRelatedPartiesCurrent: number;
	quarterlyTangibleBookValue: number;
	quarterlyCashAndCashEquivalents: number;
	quarterlyCurrentDeferredRevenue: number;
	quarterlyCapitalLeaseObligations: number;
	quarterlyGoodwillAndOtherIntangibleAssets: number;
	quarterlyFinancialAssetsDesignatedasFairValueThroughProfitorLossTotal: number;
	quarterlyCashCashEquivalentsAndShortTermInvestments: number;
	quarterlyNonCurrentDeferredTaxesLiabilities: number;
	quarterlyCurrentLiabilities: number;
	quarterlyCommonStockEquity: number;
	quarterlyLongTermCapitalLeaseObligation: number;
	quarterlyNetPPE: number;
	quarterlyRetainedEarnings: number;
	quarterlyShareIssued: number;
	quarterlyLongTermDebtAndCapitalLeaseObligation: number;
	quarterlyReceivables: number;
	quarterlyCurrentAssets: number;
	quarterlyMachineryFurnitureEquipment: number;
	quarterlyOtherProperties: number;
	quarterlyOtherNonCurrentAssets: number;
	quarterlyTotalNonCurrentLiabilitiesNetMinorityInterest: number;
	quarterlyNonCurrentDeferredAssets: number;
	quarterlyAccountsPayable: number;
	quarterlyTreasuryStock: number;
	quarterlyInvestmentProperties: number;
	quarterlyTotalLiabilitiesNetMinorityInterest: number;
	quarterlyNonCurrentDeferredTaxesAssets: number;
	quarterlyTotalNonCurrentAssets: number;
	quarterlyWorkingCapital: number;
	quarterlyOtherPayable: number;
	quarterlyNonCurrentDeferredLiabilities: number;
	quarterlyTotalAssets: number;
	quarterlyTotalTaxPayable: number;
	quarterlyLongTermDebt: number;
	quarterlyOrdinarySharesNumber: number;
	quarterlyInvestmentinFinancialAssets: number;
	quarterlyGrossPPE: number;
	quarterlyPayables: number;
	quarterlyIncomeTaxPayable: number;
	quarterlyGainsLossesNotAffectingRetainedEarnings: number;
	quarterlyInvestedCapital: number;
	quarterlyInvestmentsAndAdvances: number;
	quarterlyCurrentDeferredLiabilities: number;
	quarterlyStockholdersEquity: number;
	quarterlyTotalCapitalization: number;
	quarterlyPayablesAndAccruedExpenses: number;
	quarterlyAccountsReceivable: number;
	quarterlyTotalEquityGrossMinorityInterest: number;
	quarterlyRestrictedCash: number;
	quarterlyNetTangibleAssets: number;
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
  priceToSales?: number;
  priceToEarnings?: number;
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
