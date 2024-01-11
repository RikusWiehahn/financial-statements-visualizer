import { StockQuote } from "@/config/_Interfaces";
import yahooFinance from "yahoo-finance2";

export async function GET(
  request: Request,
  { params }: { params: { searchTerm: string } }
) {
  const searchTerm = params.searchTerm;

  const results = await yahooFinance.search(searchTerm);

  const quotes: StockQuote[] = results.quotes.filter((quote) => quote.quoteType === "EQUITY" && quote.isYahooFinance);

  return Response.json({
    headers: { "content-type": "application/json" },
    data: quotes,
  });
}
