import { StockQuoteSummary } from "@/config/_Interfaces";
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

    // if (!fundamentals.incomeStatementHistory?.incomeStatementHistory) {
    //   throw new Error("No income statement history");
    // }
    // if (!fundamentals.balanceSheetHistory?.balanceSheetStatements) {
    //   throw new Error("No balance sheet history");
    // }
    // if (!fundamentals.cashflowStatementHistory?.cashflowStatements) {
    //   throw new Error("No cashflow statement history");
    // }
    const incomeHist =
      fundamentals.incomeStatementHistory?.incomeStatementHistory || [];
    const balanceHist =
      fundamentals.balanceSheetHistory?.balanceSheetStatements || [];
    const cashflowHist =
      fundamentals.cashflowStatementHistory?.cashflowStatements || [];

    console.log(JSON.stringify(incomeHist, null, 2));

    for (let I = 0; I < incomeHist.length; I++) {
      const y = incomeHist[I];
      let st = response.annualStatements;

      st.periods.push(dayjs(y.endDate).format("YYYY-MM-DD"));
      st.revenue.push(y.totalRevenue);
      st.costOfRevenue.push(y.costOfRevenue);
      st.researchAndDevelopment.push(y.researchDevelopment || 0);
      st.sellingGeneralAndAdmin.push(y.sellingGeneralAdministrative || 0);
      st.netIncome.push(y.netIncome || 0);
    }

    for (let I = 0; I < balanceHist.length; I++) {
      const y = balanceHist[I];
      let st = response.annualStatements;
      st.currentAssets.push(y.totalCurrentAssets || 0);
      st.nonCurrentAssets.push(
        (y.totalAssets || 0) - (y.totalCurrentAssets || 0)
      );
      st.currentLiabilities.push(y.totalCurrentLiabilities || 0);
      st.nonCurrentLiabilities.push(
        (y.totalLiab || 0) - (y.totalCurrentLiabilities || 0)
      );

      st.cashAtEnd.push(y.cash || 0);
    }

    for (let I = 0; I < cashflowHist.length; I++) {
      const y = cashflowHist[I];
      let st = response.annualStatements;
      st.netOpsCash.push(y.totalCashFromOperatingActivities || 0);
      st.netInvestingCash.push(y.totalCashflowsFromInvestingActivities || 0);
      st.netFinancingCash.push(y.totalCashFromFinancingActivities || 0);
    }

    for (let I = 0; I < response.annualStatements.periods.length; I++) {
      // fetch price for each period
      const y = response.annualStatements.periods[I];
      const res = await yahooFinance.historical(symbol, {
        period1: y,
        interval: "1d",
      });

      response.annualStatements.price.push(res?.[0]?.close || 0);

      const sharesOutstanding =
        fundamentals.defaultKeyStatistics?.sharesOutstanding;
      response.annualStatements.commonStock.push(sharesOutstanding || 0);
    }

    //

    // if (!fundamentals.incomeStatementHistoryQuarterly?.incomeStatementHistory) {
    //   throw new Error("No income statement history");
    // }
    // if (!fundamentals.balanceSheetHistoryQuarterly?.balanceSheetStatements) {
    //   throw new Error("No balance sheet history");
    // }
    // if (!fundamentals.cashflowStatementHistoryQuarterly?.cashflowStatements) {
    //   throw new Error("No cashflow statement history");
    // }
    const incomeHistQ =
      fundamentals.incomeStatementHistoryQuarterly?.incomeStatementHistory ||
      [];
    const balanceHistQ =
      fundamentals.balanceSheetHistoryQuarterly?.balanceSheetStatements || [];
    const cashflowHistQ =
      fundamentals.cashflowStatementHistoryQuarterly?.cashflowStatements || [];

    for (let I = 0; I < incomeHistQ.length; I++) {
      const y = incomeHistQ[I];
      let st = response.quarterlyStatements;

      st.periods.push(dayjs(y.endDate).format("YYYY-MM-DD"));
      st.revenue.push(y.totalRevenue);
      st.costOfRevenue.push(y.costOfRevenue);
      st.researchAndDevelopment.push(y.researchDevelopment || 0);
      st.sellingGeneralAndAdmin.push(y.sellingGeneralAdministrative || 0);
      st.netIncome.push(y.netIncome || 0);
    }

    for (let I = 0; I < balanceHistQ.length; I++) {
      const y = balanceHistQ[I];
      let st = response.quarterlyStatements;
      st.currentAssets.push(y.totalCurrentAssets || 0);
      st.nonCurrentAssets.push(
        (y.totalAssets || 0) - (y.totalCurrentAssets || 0)
      );
      st.currentLiabilities.push(y.totalCurrentLiabilities || 0);
      st.nonCurrentLiabilities.push(
        (y.totalLiab || 0) - (y.totalCurrentLiabilities || 0)
      );

      st.cashAtEnd.push(y.cash || 0);
    }

    for (let I = 0; I < cashflowHistQ.length; I++) {
      const y = cashflowHistQ[I];
      let st = response.quarterlyStatements;
      st.netOpsCash.push(y.totalCashFromOperatingActivities || 0);
      st.netInvestingCash.push(y.totalCashflowsFromInvestingActivities || 0);
      st.netFinancingCash.push(y.totalCashFromFinancingActivities || 0);
    }

    for (let I = 0; I < response.quarterlyStatements.periods.length; I++) {
      // fetch price for each period
      const y = response.quarterlyStatements.periods[I];
      const res = await yahooFinance.historical(symbol, {
        period1: y,
        interval: "1d",
      });

      response.quarterlyStatements.price.push(res?.[0]?.close || 0);

      const sharesOutstanding =
        fundamentals.defaultKeyStatistics?.sharesOutstanding;
      response.quarterlyStatements.commonStock.push(sharesOutstanding || 0);
    }

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
