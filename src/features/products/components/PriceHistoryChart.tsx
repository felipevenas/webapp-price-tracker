import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { PriceHistoryResponse } from '../types/productTypes';
import { formatCurrency } from '../../../utils/formatters';

interface PriceHistoryChartProps {
  history: PriceHistoryResponse[];
}

const PriceHistoryChart: React.FC<PriceHistoryChartProps> = ({ history }) => {
  const chartData = [...history]
    .sort((a, b) => new Date(a.checked_at).getTime() - new Date(b.checked_at).getTime())
    .map((item) => ({
      ...item,
      formattedDate: new Date(item.checked_at).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
      }) + ' ' + new Date(item.checked_at).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-900 border border-dark-700 px-3.5 py-2.5 rounded-lg shadow-xl text-left">
          <p className="text-[11px] text-theme-muted font-medium mb-1">
            {payload[0].payload.formattedDate}
          </p>
          <p className="text-sm font-bold text-accent-purple">
            Preço: <span className="text-theme-highlight">{formatCurrency(payload[0].value)}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (history.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center border border-dashed border-dark-800 rounded-xl bg-dark-900">
        <p className="text-sm text-theme-muted font-medium">Nenhum registro de preço disponível no momento.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-80 bg-dark-900 border border-dark-800 rounded-xl p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--bg-800)" vertical={false} />
          <XAxis
            dataKey="formattedDate"
            stroke="var(--text-muted)"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          <YAxis
            stroke="var(--text-muted)"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `R$ ${value}`}
            domain={['auto', 'auto']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="price"
            stroke="var(--accent-purple)"
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 1 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceHistoryChart;
