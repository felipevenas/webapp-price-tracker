import React from 'react';
import {
  AreaChart,
  Area,
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
  // Ordena o histórico por data de checagem crescente
  const chartData = [...history]
    .sort((a, b) => new Date(a.checked_at).getTime() - new Date(b.checked_at).getTime())
    .map((item) => ({
      ...item,
      // Formata a data de checagem para exibição compacta no eixo X
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
        <div className="bg-dark-900/90 border border-dark-700 backdrop-blur-md px-3.5 py-2.5 rounded-lg shadow-xl text-left">
          <p className="text-[11px] text-gray-500 font-medium mb-1">
            {payload[0].payload.formattedDate}
          </p>
          <p className="text-sm font-bold text-accent-purple">
            Preço: <span className="text-white">{formatCurrency(payload[0].value)}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (history.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center border border-dashed border-dark-800 rounded-xl bg-dark-900/20">
        <p className="text-sm text-gray-500 font-medium">Nenhum registro de preço disponível no momento.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-80 bg-dark-900/30 border border-dark-800/80 rounded-xl p-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
          <XAxis
            dataKey="formattedDate"
            stroke="#6b7280"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          <YAxis
            stroke="#6b7280"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `R$ ${value}`}
            domain={['auto', 'auto']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#8b5cf6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorPrice)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceHistoryChart;
