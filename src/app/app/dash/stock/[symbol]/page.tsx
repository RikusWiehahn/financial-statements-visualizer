"use client";

import { Indicator } from "@/components/Indicator";
import { StatementsVisualizer } from "@/components/StatementsVisualizer";
import { Body, H1 } from "@/components/Typography";
import { StockQuoteSummary } from "@/config/_Interfaces";
import { clientURL } from "@/config/keys";
import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";

export default function StockPage(props: { params: { symbol: string } }) {
  const [loading, setLoading] = useState(false);
  const [stock, setStock] = useState<StockQuoteSummary | null>(null);

  useEffect(() => {
    _fetchStock();
  }, [props.params.symbol]);

  const _fetchStock = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${clientURL}/api/stock/${props.params.symbol}`);
      const json = await res.json();
      setLoading(false);
      setStock(json.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const renderAssetProfile = () => {
    return (
      <div>
        <H1 className="px-4 pt-4 mb-2">{`${stock?.name}`}</H1>
        <Body className="px-4 font-semibold mb-2">{`${stock?.sector} - ${stock?.industry}`}</Body>
        <Body className="text-sm px-4">{`${stock?.summary}`}</Body>
        <div className="grid grid-cols-5 gap-2 p-4">
          <Indicator
            label="Insider Ownership"
            value={`${((stock?.insiderOwnership || 0) * 100).toFixed(2)}%`}
          />
          <Indicator
            label="Price to Book Ratio"
            value={`${(stock?.priceToBook || 0).toFixed(2)}`}
          />
          <Indicator
            label="Current Ratio"
            value={`${(stock?.currentRatio || 0).toFixed(2)}`}
          />
          <Indicator
            label="Quick Ratio"
            value={`${(stock?.quickRatio || 0).toFixed(2)}`}
          />
          <Indicator
            label="Gross Margin"
            value={`${(stock?.grossMargin || 0).toFixed(2)}`}
          />
          <Indicator
            label="Operating Margin"
            value={`${(stock?.operatingMargin || 0).toFixed(2)}`}
          />
          <Indicator
            label="Profit Margin"
            value={`${(stock?.profitMargin || 0).toFixed(2)}`}
          />
          <Indicator
            label="Return on Assets"
            value={`${(stock?.returnOnAssets || 0).toFixed(2)}`}
          />
          <Indicator
            label="Return on Equity"
            value={`${(stock?.returnOnEquity || 0).toFixed(2)}`}
          />
        </div>
      </div>
    );
  };

  const renderAnnualHistory = () => {
    if (!stock?.annualStatements) return null;
    return (
      <div className="px-4">
        <StatementsVisualizer
          viz={stock?.annualStatements}
          label={"Annual Statements"}
        />
      </div>
    );
  };

  const renderQuarterlyHistory = () => {
    if (!stock?.quarterlyStatements) return null;
    return (
      <div className="px-4">
        <StatementsVisualizer
          viz={stock?.quarterlyStatements}
          label={"Quarterly Statements"}
        />
      </div>
    );
  };

  return (
    <div>
      {loading ? <LinearProgress color="inherit" /> : null}
      {!loading ? renderAssetProfile() : null}
      {!loading ? renderAnnualHistory() : null}
      {!loading ? renderQuarterlyHistory() : null}
    </div>
  );
}
