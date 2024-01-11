import { StatementsVisualization, UiModes } from "@/config/_Interfaces";
import { toNoUnderscoreTitleCase } from "@/config/utils";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { H2 } from "./Typography";
import { useSelector } from "react-redux";
import { StoreState } from "@/config/ReduxStore";
import { theme } from "../../tailwind.config";

// export interface StatementsVisualization {
//   periods: string[];
//   commonStock: number[];
//   price: number[];
//   current_assets: number[];
//   non_current_assets: number[];
//   current_liabilities: number[];
//   non_current_liabilities: number[];
//   revenue: number[];
//   cost_of_revenue: number[];
//   research_and_development: number[];
//   selling_general_and_admin: number[];
//   net_ops_cash: number[];
//   net_investing_cash: number[];
//   net_financing_cash: number[];
//   cash_at_end: number[];
// }

interface ChartData {
  name: string;
  [key: string]: number | string;
}

export const StatementsVisualizer = (props: {
  viz: StatementsVisualization;
  label: string;
}) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const config = useSelector((s: StoreState) => s.config);
  const isDark = config.ui_mode === UiModes.DARK;

  useEffect(() => {
    _buildChartData();
  }, [props.viz]);

  const _buildChartData = () => {
    const newChart: ChartData[] = [];

    for (let I = props.viz.periods.length - 1; I >= 0; I--) {
      newChart.push({
        name: props.viz.periods[I],
      });

      const cap = props.viz.commonStock[I] * props.viz.price[I];
      newChart.push({
        name: `Market Cap`,
        [`market_cap`]: cap / 3,
      });
      newChart.push({
        name: `Market Cap`,
        [`market_cap`]: cap / 3,
      });
      newChart.push({
        name: `Market Cap`,
        [`market_cap`]: cap / 3,
      });

      const current_assets = props.viz.currentAssets[I];
      const non_current_assets = props.viz.nonCurrentAssets[I];

      newChart.push({
        name: `Assets`,
        [`current_assets`]: current_assets,
        [`non_current_assets`]: non_current_assets,
      });

      const current_liabilities = props.viz.currentLiabilities[I];
      const non_current_liabilities = props.viz.nonCurrentLiabilities[I];

      newChart.push({
        name: `Liabilities`,
        [`current_liabilities`]: current_liabilities,
        [`non_current_liabilities`]: non_current_liabilities,
      });

      const revenue = props.viz.revenue[I];
      const cost_of_revenue = props.viz.costOfRevenue[I];
      const research_and_development = props.viz.researchAndDevelopment[I];
      const selling_general_and_admin = props.viz.sellingGeneralAndAdmin[I];

      newChart.push({
        name: `Sales`,
        [`revenue`]: revenue,
      });

      newChart.push({
        name: `Expenses`,
        [`cost_of_revenue`]: cost_of_revenue,
        [`research_and_development`]: research_and_development,
        [`selling_general_and_admin`]: selling_general_and_admin,
      });

      newChart.push({
        name: `Net Income`,
        [`net_income`]: props.viz.netIncome[I],
      });

      const net_ops_cash = props.viz.netOpsCash[I];
      const net_investing_cash = props.viz.netInvestingCash[I];
      const net_financing_cash = props.viz.netFinancingCash[I];
      const cash_at_end = props.viz.cashAtEnd[I];

      newChart.push({
        name: `Cash`,
        [`cash_at_start`]:
          cash_at_end - net_ops_cash - net_investing_cash - net_financing_cash,
      });

      newChart.push({
        name: `Cash`,
        [`net_ops_cash`]: net_ops_cash,
        [`net_investing_cash`]: net_investing_cash,
        [`net_financing_cash`]: net_financing_cash,
      });

      newChart.push({
        name: `Cash`,
        [`cash_at_end`]: cash_at_end,
      });
    }

    setChartData(newChart);
  };

  return (
    <div>
      <H2 className="my-4">{props.label}</H2>
      <ResponsiveContainer width="100%" height={1000}>
        <BarChart stackOffset="sign" data={chartData}>
          <Tooltip
            labelStyle={{ fontWeight: "bold" }}
            labelFormatter={(label) => {
              return toNoUnderscoreTitleCase(label);
            }}
            itemStyle={{ fontWeight: "semibold" }}
            formatter={(num) =>
              `${Intl.NumberFormat("en").format(Math.round(Number(num)))}`
            }
            wrapperStyle={{ zIndex: 1, backgroundColor: "transparent" }}
            contentStyle={{
              borderWidth: 0,
              backgroundColor: isDark ? theme.colors.gray[800] : "white",
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          />
          <CartesianGrid strokeDasharray="5 5" />
          <Bar
            type="monotone"
            stackId="1"
            dataKey="market_cap"
            stroke="rgba(0,0,0,0)"
            fillOpacity={1}
            fill="#7e22ce"
          />
          <Bar
            type="monotone"
            stackId="1"
            dataKey="current_assets"
            stroke="rgba(0,0,0,0)"
            fillOpacity={1}
            fill="#6366f1"
          />
          <Bar
            type="monotone"
            stackId="1"
            dataKey="non_current_assets"
            stroke="rgba(0,0,0,0)"
            fillOpacity={1}
            fill="#3730a3"
          />
          <Bar
            type="monotone"
            stackId="1"
            dataKey="current_liabilities"
            stroke="rgba(0,0,0,0)"
            fillOpacity={1}
            fill="#f43f5e"
          />
          <Bar
            type="monotone"
            stackId="1"
            dataKey="non_current_liabilities"
            stroke="rgba(0,0,0,0)"
            fillOpacity={1}
            fill="#9f1239"
          />
          <Bar
            type="monotone"
            stackId="1"
            dataKey="revenue"
            stroke="rgba(0,0,0,0)"
            fillOpacity={1}
            fill="#fbbf24"
          />
          <Bar
            type="monotone"
            stackId="1"
            dataKey="cost_of_revenue"
            stroke="rgba(0,0,0,0)"
            fillOpacity={1}
            fill="#f59e0b"
          />
          <Bar
            type="monotone"
            stackId="1"
            dataKey="net_income"
            stroke="rgba(0,0,0,0)"
            fillOpacity={1}
            fill="#fbbf24"
          />
          <Bar
            type="monotone"
            stackId="1"
            dataKey="selling_general_and_admin"
            stroke="rgba(0,0,0,0)"
            fillOpacity={1}
            fill="#d97706"
          />
          <Bar
            type="monotone"
            stackId="1"
            dataKey="research_and_development"
            stroke="rgba(0,0,0,0)"
            fillOpacity={1}
            fill="#b45309"
          />
          <Bar
            type="monotone"
            stackId="1"
            dataKey="cash_at_start"
            stroke="rgba(0,0,0,0)"
            fillOpacity={1}
            fill="#10b981"
          />
          <Bar
            type="monotone"
            stackId="1"
            dataKey="net_ops_cash"
            stroke="rgba(0,0,0,0)"
            fillOpacity={1}
            fill="#047857"
          />
          <Bar
            type="monotone"
            stackId="1"
            dataKey="net_investing_cash"
            stroke="rgba(0,0,0,0)"
            fillOpacity={1}
            fill="#065f46"
          />
          <Bar
            type="monotone"
            stackId="1"
            dataKey="net_financing_cash"
            stroke="rgba(0,0,0,0)"
            fillOpacity={1}
            fill="#064e3b"
          />
          <Bar
            type="monotone"
            stackId="1"
            dataKey="cash_at_end"
            stroke="rgba(0,0,0,0)"
            fillOpacity={1}
            fill="#10b981"
          />
          <XAxis
            dataKey="name"
            angle={90}
            textAnchor="start"
            height={120}
            fontSize={12}
          />
          <YAxis
            tickFormatter={(num) => `$${Intl.NumberFormat("en").format(num)}`}
            width={100}
            fontSize={12}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
