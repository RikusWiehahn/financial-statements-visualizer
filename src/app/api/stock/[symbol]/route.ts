import {
  AnnualTimeSeriesRecord,
  QtrTimeSeriesData,
  StockQuoteSummary,
} from "@/config/_Interfaces";
import dayjs from "dayjs";
import yahooFinance from "yahoo-finance2";

export async function GET(
  request: Request,
  { params }: { params: { symbol: string } }
) {
  try {
    const symbol = params.symbol;

    const fundamentals = await yahooFinance.quoteSummary(
      symbol,
      {
        modules: [
          "assetProfile",
          "balanceSheetHistory",
          "balanceSheetHistoryQuarterly",
          "incomeStatementHistory",
          "incomeStatementHistoryQuarterly",
          "cashflowStatementHistory",
          "cashflowStatementHistoryQuarterly",
          "defaultKeyStatistics",
          "price",
          "financialData",
        ],
      },
      {
        validateResult: false,
      }
    );

    const response: StockQuoteSummary = {
      name: fundamentals.price?.longName || "",
      summary: fundamentals.assetProfile?.longBusinessSummary,
      industry: fundamentals.assetProfile?.industry,
      sector: fundamentals.assetProfile?.sector,
      insiderOwnership: fundamentals.defaultKeyStatistics?.heldPercentInsiders,
      priceToBook: fundamentals.defaultKeyStatistics?.priceToBook,
      priceToSales:
        (fundamentals.price?.marketCap || 0) /
        (fundamentals.financialData?.totalRevenue || 0),
      priceToEarnings:
        (fundamentals.price?.regularMarketPrice || 0) /
        (fundamentals.defaultKeyStatistics?.trailingEps || 0),
      currentRatio: fundamentals.financialData?.currentRatio,
      quickRatio: fundamentals.financialData?.quickRatio,
      debtToEquity: fundamentals.financialData?.debtToEquity,
      grossMargin: fundamentals.financialData?.grossMargins,
      operatingMargin: fundamentals.financialData?.operatingMargins,
      profitMargin: fundamentals.financialData?.profitMargins,
      returnOnAssets: fundamentals.financialData?.returnOnAssets,
      returnOnEquity: fundamentals.financialData?.returnOnEquity,
      annualStatements: {
        periods: [],
        commonStock: [],
        price: [],
        currentAssets: [],
        nonCurrentAssets: [],
        currentLiabilities: [],
        nonCurrentLiabilities: [],
        revenue: [],
        costOfRevenue: [],
        researchAndDevelopment: [],
        sellingGeneralAndAdmin: [],
        netIncome: [],
        netOpsCash: [],
        netInvestingCash: [],
        netFinancingCash: [],
        cashAtEnd: [],
      },
      quarterlyStatements: {
        periods: [],
        commonStock: [],
        price: [],
        currentAssets: [],
        nonCurrentAssets: [],
        currentLiabilities: [],
        nonCurrentLiabilities: [],
        revenue: [],
        costOfRevenue: [],
        researchAndDevelopment: [],
        sellingGeneralAndAdmin: [],
        netIncome: [],
        netOpsCash: [],
        netInvestingCash: [],
        netFinancingCash: [],
        cashAtEnd: [],
      },
    };

    const qtrTimeseriesData: QtrTimeSeriesData[] =
      await yahooFinance.fundamentalsTimeSeries(
        symbol,
        {
          period1: dayjs().subtract(2, "year").format("YYYY-MM-DD"),
          period2: dayjs().format("YYYY-MM-DD"), // end date
          type: "quarterly",
        },
        { validateResult: false }
      );
    // reverse the array so that the most recent data is first
    qtrTimeseriesData.reverse();

    for (const period of qtrTimeseriesData) {
      const res = await yahooFinance.historical(symbol, {
        period1: dayjs(period.date).subtract(1, "day").format("YYYY-MM-DD"),
        interval: "1d",
      });
      response.quarterlyStatements.price.push(res?.[0]?.close || 0);

      response.quarterlyStatements.periods.push(period.date);

      const sharesOutstanding =
        fundamentals.defaultKeyStatistics?.sharesOutstanding;
      response.quarterlyStatements.commonStock.push(sharesOutstanding || 0);
      response.quarterlyStatements.currentAssets.push(
        period.quarterlyCurrentAssets || 0
      );
      response.quarterlyStatements.nonCurrentAssets.push(
        period.quarterlyTotalNonCurrentAssets || 0
      );
      response.quarterlyStatements.currentLiabilities.push(
        period.quarterlyCurrentLiabilities || 0
      );
      response.quarterlyStatements.nonCurrentLiabilities.push(
        period.quarterlyTotalNonCurrentLiabilitiesNetMinorityInterest || 0
      );
      response.quarterlyStatements.revenue.push(
        period.quarterlyReceivables || 0
      ); // Assuming revenue refers to receivables
      response.quarterlyStatements.costOfRevenue.push(
        period.quarterlyAccountsPayable || 0
      ); // Assuming cost of revenue refers to accounts payable
      response.quarterlyStatements.netIncome.push(
        (period.quarterlyAccountsReceivable || 0) -
          (period.quarterlyAccountsPayable || 0)
      );
      response.quarterlyStatements.cashAtEnd.push(
        period.quarterlyCashAndCashEquivalents
      );
    }

    const annualTimeseriesData: AnnualTimeSeriesRecord[] =
      await yahooFinance.fundamentalsTimeSeries(
        symbol,
        {
          period1: dayjs().subtract(10, "year").format("YYYY-MM-DD"),
          period2: dayjs().format("YYYY-MM-DD"), // end date
          type: "annual",
        },
        { validateResult: false }
      );
    // reverse the array so that the most recent data is first
    annualTimeseriesData.reverse();

    for (const period of annualTimeseriesData) {
      // fetch price for each period
      const res = await yahooFinance.historical(symbol, {
        period1: dayjs(period.date).subtract(1, "day").format("YYYY-MM-DD"),
        interval: "1d",
      });
      response.annualStatements.price.push(res?.[0]?.close || 0);

      response.annualStatements.periods.push(period.date);

      const sharesOutstanding =
        fundamentals.defaultKeyStatistics?.sharesOutstanding;
      response.annualStatements.commonStock.push(sharesOutstanding || 0);
      response.annualStatements.currentAssets.push(
        period.trailingTotalOperatingIncomeAsReported || 0
      );
      response.annualStatements.nonCurrentAssets.push(
        period.trailingNetIncomeFromContinuingOperationNetMinorityInterest || 0
      );
      response.annualStatements.currentLiabilities.push(
        period.trailingReconciledDepreciation || 0
      );
      response.annualStatements.nonCurrentLiabilities.push(
        period.trailingNormalizedEBITDA || 0
      );
      response.annualStatements.revenue.push(
        period.trailingOperatingRevenue || 0
      );
      response.annualStatements.costOfRevenue.push(
        period.trailingCostOfRevenue || 0
      );
      response.annualStatements.researchAndDevelopment.push(
        period.trailingResearchAndDevelopment || 0
      );
      response.annualStatements.sellingGeneralAndAdmin.push(
        period.trailingSellingGeneralAndAdministration || 0
      );
      response.annualStatements.netIncome.push(period.trailingNetIncome || 0);
      response.annualStatements.netOpsCash.push(period.trailingEBITDA || 0);
      response.annualStatements.netInvestingCash.push(
        period.trailingOperatingIncome || 0
      );
      response.annualStatements.netFinancingCash.push(
        period.trailingNetIncomeFromContinuingAndDiscontinuedOperation || 0
      );
      response.annualStatements.cashAtEnd.push(
        period.trailingTotalRevenue || 0
      );
    }

    // console.log(JSON.stringify(response, null, 2));

    return Response.json({
      headers: { "content-type": "application/json" },
      data: response,
    });
  } catch (e) {
    return Response.json({
      headers: { "content-type": "application/json" },
      data: e,
      status: 500,
    });
  }
}
