"use client";

import { TextInput } from "@/components/TextInput";
import { StoreState } from "@/config/ReduxStore";
import { StockQuote } from "@/config/_Interfaces";
import { routes } from "@/config/_routes";
import { clientURL } from "@/config/keys";
import { LinearProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [quotes, setQuotes] = useState<StockQuote[]>([]);
  const router = useRouter();

  const searchApi = async () => {
    setLoading(true);
    const res = await fetch(`${clientURL}/api/search/${searchTerm}`);
    const json = await res.json();
    setLoading(false);
    setQuotes(json.data);
  };

  const renderQuotes = () => {    
    const list = quotes.map((q) => {
      return (
        <div
          key={q.symbol}
          className="p-4 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 cursor-pointer bg-white dark:bg-gray-800 mb-2"
          onClick={() => {
            router.push(`${routes.STOCK}/${q.symbol}`)
          }}
        >
          <div className="text-lg font-semibold">{q.shortname}</div>
          <div className="text-sm text-gray-500">{q.symbol}</div>
          <div className="text-sm text-gray-500">{q.quoteType}</div>
          <div className="text-sm text-gray-500">{`${q.exchange} ${q.exchDisp}`}</div>
          <div className="text-sm text-gray-500">{q.sector}</div>
          <div className="text-sm text-gray-500">{q.industry}</div>
        </div>
      );
    });
    return <div>{list}</div>;
  };

  return (
    <div>
      {loading ? <LinearProgress color="inherit" /> : null}
      <div className="p-4">
        <TextInput
          placeholder="Search for a stock"
          onChangeText={(e) => setSearchTerm(e)}
          value={searchTerm}
          onPressEnter={searchApi}
          className="mb-0 bg-white dark:bg-gray-800"
          autoComplete="off"
        />
      </div>
      <div className="px-4">{renderQuotes()}</div>
    </div>
  );
}
