import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, Trash2, Eye, ExternalLink, ArrowDown, ArrowUp, AlertCircle, CheckCircle } from 'lucide-react';
import type { ProductResponse } from '../types/productTypes';
import { formatCurrency, formatDate } from '../../../utils/formatters';
import Card from '../../../components/Card';

interface ProductCardProps {
  product: ProductResponse;
  onToggleActive: (id: string, currentStatus: boolean) => void;
  onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onToggleActive, onDelete }) => {
  const {
    id,
    name,
    url,
    target_price,
    current_price,
    active,
    last_checked_at,
  } = product;

  // Determinar o status visual
  const isTargetMet = current_price !== null && target_price !== null && current_price <= target_price;
  const hasNoPrice = current_price === null;

  let statusBadge = (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-accent-blue/10 text-accent-blue">
      Ativo
    </span>
  );

  if (!active) {
    statusBadge = (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-dark-700 text-gray-400">
        Pausado
      </span>
    );
  } else if (hasNoPrice) {
    statusBadge = (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500">
        <AlertCircle size={12} className="mr-1" /> Sem preço capturado
      </span>
    );
  } else if (isTargetMet) {
    statusBadge = (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-accent-green/10 text-accent-green">
        <CheckCircle size={12} className="mr-1" /> Preço Alvo Atingido
      </span>
    );
  }

  // Determinar a variação em relação ao preço alvo
  let priceDiffIndicator = null;
  if (current_price !== null && target_price !== null) {
    const diff = current_price - target_price;
    const diffPercent = (diff / target_price) * 100;

    if (diff < 0) {
      priceDiffIndicator = (
        <span className="inline-flex items-center text-xs font-medium text-accent-green bg-accent-green/10 px-2 py-0.5 rounded-lg">
          <ArrowDown size={12} className="mr-0.5" />
          {Math.abs(diffPercent).toFixed(1)}% abaixo do alvo
        </span>
      );
    } else if (diff > 0) {
      priceDiffIndicator = (
        <span className="inline-flex items-center text-xs font-medium text-accent-red bg-accent-red/10 px-2 py-0.5 rounded-lg">
          <ArrowUp size={12} className="mr-0.5" />
          {diffPercent.toFixed(1)}% acima do alvo
        </span>
      );
    } else {
      priceDiffIndicator = (
        <span className="inline-flex items-center text-xs font-medium text-gray-400 bg-dark-800 px-2 py-0.5 rounded-lg">
          No preço alvo
        </span>
      );
    }
  }

  const hostname = new URL(url).hostname.replace('www.', '');

  return (
    <Card hoverEffect className="flex flex-col justify-between h-full bg-dark-900/60 border border-dark-800">
      {/* Top section: Status & actions */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          {statusBadge}
          <div className="flex items-center space-x-1.5">
            {/* Toggle Active/Pause */}
            <button
              onClick={() => onToggleActive(id, active)}
              title={active ? 'Pausar monitoramento' : 'Retomar monitoramento'}
              className={`p-1.5 rounded-lg border transition ${
                active
                  ? 'border-dark-700 hover:border-yellow-500/50 hover:bg-yellow-500/10 text-gray-400 hover:text-yellow-500'
                  : 'border-accent-purple/30 hover:border-accent-purple hover:bg-accent-purple/10 text-accent-purple hover:text-white'
              }`}
            >
              {active ? <Pause size={14} /> : <Play size={14} />}
            </button>
            
            {/* View Details Link */}
            <Link
              to={`/products/${id}`}
              title="Visualizar histórico e gráficos"
              className="p-1.5 rounded-lg border border-dark-700 hover:border-accent-purple hover:bg-accent-purple/10 text-gray-400 hover:text-accent-purple transition"
            >
              <Eye size={14} />
            </Link>

            {/* Delete button */}
            <button
              onClick={() => onDelete(id)}
              title="Remover produto"
              className="p-1.5 rounded-lg border border-dark-700 hover:border-accent-red hover:bg-accent-red/10 text-gray-400 hover:text-accent-red transition"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {/* Product Meta */}
        <h3 className="font-semibold text-gray-100 text-base mb-1 text-left line-clamp-2" title={name}>
          {name}
        </h3>
        
        {/* Source link */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-xs text-gray-500 hover:text-accent-blue mb-4 transition"
        >
          <span className="truncate max-w-[180px]">{hostname}</span>
          <ExternalLink size={10} className="ml-1" />
        </a>

        {/* Price specs */}
        <div className="grid grid-cols-2 gap-4 py-3 border-t border-b border-dark-800/80 mb-4">
          <div className="text-left">
            <span className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider block">
              Preço Atual
            </span>
            <span className="text-lg font-bold text-white">
              {current_price !== null ? formatCurrency(current_price) : '---'}
            </span>
          </div>
          <div className="text-left border-l border-dark-800/80 pl-4">
            <span className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider block">
              Preço Alvo
            </span>
            <span className="text-lg font-bold text-gray-300">
              {target_price !== null ? formatCurrency(target_price) : 'Sem alvo'}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom section: price variation percent and last checked date */}
      <div className="space-y-3">
        <div className="flex justify-start">{priceDiffIndicator}</div>
        <div className="text-left text-[11px] text-gray-500">
          Última checagem: <span className="text-gray-400">{formatDate(last_checked_at)}</span>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
