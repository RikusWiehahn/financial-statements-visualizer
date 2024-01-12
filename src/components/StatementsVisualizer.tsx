import { StoreState } from "@/config/ReduxStore";
import { StatementsVisualization, UiModes } from "@/config/_Interfaces";
import { toNoUnderscoreTitleCase } from "@/config/utils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { theme } from "../../tailwind.config";
import { H2 } from "./Typography";
import dayjs from "dayjs";

interface ChartData {
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
      const cap = props.viz.commonStock[I] * props.viz.price[I];
      newChart.push({
        name: props.viz.periods[I],
        [`market_cap_1/3`]: cap / 3,
      });
      newChart.push({
        [`market_cap_1/3`]: cap / 3,
      });
      newChart.push({
        [`market_cap_1/3`]: cap / 3,
      });

      const current_assets = props.viz.currentAssets[I];
      const non_current_assets = props.viz.nonCurrentAssets[I];

      newChart.push({
        [`current_assets`]: current_assets,
        [`non_current_assets`]: non_current_assets,
      });

      const current_liabilities = props.viz.currentLiabilities[I];
      const non_current_liabilities = props.viz.nonCurrentLiabilities[I];

      newChart.push({
        [`current_liabilities`]: current_liabilities,
        [`non_current_liabilities`]: non_current_liabilities,
      });

      const revenue = props.viz.revenue[I];
      const cost_of_revenue = props.viz.costOfRevenue[I];
      const research_and_development = props.viz.researchAndDevelopment[I];
      const selling_general_and_admin = props.viz.sellingGeneralAndAdmin[I];

      newChart.push({
        [`revenue`]: revenue,
      });

      newChart.push({
        [`cost_of_revenue`]: cost_of_revenue,
        [`research_and_development`]: research_and_development,
        [`selling_general_and_admin`]: selling_general_and_admin,
      });

      newChart.push({
        [`net_income`]: props.viz.netIncome[I],
      });

      const net_ops_cash = props.viz.netOpsCash[I];
      const net_investing_cash = props.viz.netInvestingCash[I];
      const net_financing_cash = props.viz.netFinancingCash[I];
      const cash_at_end = props.viz.cashAtEnd[I];

      newChart.push({
        [`cash_at_start`]:
          cash_at_end - net_ops_cash - net_investing_cash - net_financing_cash,
      });

      newChart.push({
        [`net_ops_cash`]: net_ops_cash,
        [`net_investing_cash`]: net_investing_cash,
        [`net_financing_cash`]: net_financing_cash,
      });

      newChart.push({
        [`cash_at_end`]: cash_at_end,
      });
    }

    setChartData(newChart);
  };

  return (
    <div>
      <H2 className="my-4">{props.label}</H2>
      <ResponsiveContainer width="100%" height={600}>
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
              borderWidth: 1,
              backgroundColor: isDark ? theme.colors.gray[900] : "white",
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          />
          <CartesianGrid
            strokeDasharray="5 5"
            stroke={isDark ? theme.colors.gray[700] : theme.colors.gray[300]}
          />
          <Bar
            type="monotone"
            stackId="1"
            dataKey="market_cap_1/3"
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
            tick={{
              fill: isDark ? theme.colors.gray[300] : theme.colors.gray[700],
            }}
            tickFormatter={(label) => {
              if (label) {
                const date = dayjs(label);
                return date.format("DD MMM YYYY");
              }
              return "";
            }}
          />
          <YAxis
            tickFormatter={(num) => `$${Intl.NumberFormat("en").format(num)}`}
            width={100}
            fontSize={12}
            tick={{
              fill: isDark ? theme.colors.gray[300] : theme.colors.gray[700],
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
