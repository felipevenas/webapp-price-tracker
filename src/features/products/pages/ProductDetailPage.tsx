import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, RefreshCw, Edit3, Settings, Play, Pause } from 'lucide-react';
import { productService } from '../services/productService';
import { usePriceHistory } from '../hooks/usePriceHistory';
import type { ProductResponse, UpdateProductPayload } from '../types/productTypes';
import PriceHistoryChart from '../components/PriceHistoryChart';
import ProductForm from '../components/ProductForm';
import Card from '../../../components/Card';
import Spinner from '../../../components/Spinner';
import Button from '../../../components/Button';
import toast from 'react-hot-toast';
import { formatCurrency, formatDate } from '../../../utils/formatters';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [isProductLoading, setIsProductLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { history, isLoading: isHistoryLoading, fetchHistory } = usePriceHistory();

  const loadProductData = async () => {
    if (!id) return;
    setIsProductLoading(true);
    try {
      const response = await productService.getProductDetails(id);
      if (response.status === 'success') {
        setProduct(response.data);
      } else {
        toast.error(response.message || 'Erro ao carregar detalhes do produto.');
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.error(err);
      toast.error('Erro de conexão ao carregar detalhes do produto.');
      navigate('/dashboard');
    } finally {
      setIsProductLoading(false);
    }
  };

  useEffect(() => {
    loadProductData();
    if (id) {
      fetchHistory(id);
    }
  }, [id, fetchHistory]);

  const handleUpdateSubmit = async (payload: UpdateProductPayload) => {
    if (!id) return;
    setIsUpdating(true);
    try {
      const response = await productService.updateProduct(id, payload);
      if (response.status === 'success') {
        setProduct(response.data);
        setIsEditMode(false);
        toast.success('Configurações atualizadas!');
      } else {
        toast.error(response.message || 'Falha ao atualizar configurações.');
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Erro ao salvar alterações.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleToggleActive = async () => {
    if (!product || !id) return;
    try {
      const newStatus = !product.active;
      const response = await productService.updateProduct(id, { active: newStatus });
      if (response.status === 'success') {
        setProduct(response.data);
        toast.success(newStatus ? 'Monitoramento ativado!' : 'Monitoramento pausado!');
      } else {
        toast.error(response.message || 'Falha ao alterar status.');
      }
    } catch (error) {
      toast.error('Erro ao alterar status de monitoramento.');
    }
  };

  if (isProductLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!product) return null;

  const hostname = new URL(product.url).hostname.replace('www.', '');

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Navigation & Actions Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-dark-850">
        <div className="flex items-center space-x-4">
          <Link
            to="/dashboard"
            className="p-2 bg-dark-900 border border-dark-800 hover:border-accent-purple rounded-xl text-theme-muted hover:text-theme-highlight transition duration-200"
          >
            <ArrowLeft size={18} />
          </Link>
          <div className="text-left">
            <h2 className="text-xl font-bold text-theme-highlight tracking-tight line-clamp-1 max-w-[280px] md:max-w-md" title={product.name}>
              {product.name}
            </h2>
            <p className="text-xs text-theme-muted mt-0.5">ID: {product.id}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3.5 self-start sm:self-auto">
          <Button
            variant={product.active ? 'outline' : 'primary'}
            onClick={handleToggleActive}
            leftIcon={product.active ? <Pause size={14} /> : <Play size={14} />}
          >
            {product.active ? 'Pausar' : 'Ativar'}
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              if (id) {
                loadProductData();
                fetchHistory(id);
                toast.success('Dados atualizados!');
              }
            }}
            leftIcon={<RefreshCw size={14} />}
          >
            Sincronizar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Chart and History Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chart Card */}
          <Card className="text-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-theme-highlight">Histórico de Preços</h3>
              <span className="text-xs text-theme-muted font-medium">Preço em Reais (BRL)</span>
            </div>
            {isHistoryLoading ? (
              <div className="h-80 flex items-center justify-center">
                <Spinner size="md" />
              </div>
            ) : (
              <PriceHistoryChart history={history} />
            )}
          </Card>

          {/* Product Overview specifications */}
          <Card className="text-left">
            <h3 className="text-base font-bold text-theme-highlight mb-4">Detalhes do Rastreamento</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-sm">
              <div className="flex justify-between py-2.5 border-b border-dark-800">
                <span className="text-theme-muted">Preço Atual</span>
                <span className="font-semibold text-theme-highlight">
                  {product.current_price !== null ? formatCurrency(product.current_price) : 'Não capturado'}
                </span>
              </div>
              <div className="flex justify-between py-2.5 border-b border-dark-800 md:border-l md:border-b md:pl-6">
                <span className="text-theme-muted">Preço Alvo</span>
                <span className="font-semibold text-theme-base">
                  {product.target_price !== null ? formatCurrency(product.target_price) : 'Nenhum definido'}
                </span>
              </div>
              <div className="flex justify-between py-2.5 border-b border-dark-800">
                <span className="text-theme-muted">Intervalo de Checagem</span>
                <span className="font-semibold text-theme-highlight">
                  A cada {product.check_interval_minutes} minutos
                </span>
              </div>
              <div className="flex justify-between py-2.5 border-b border-dark-800 md:border-l md:border-b md:pl-6">
                <span className="text-theme-muted">Status de Monitoramento</span>
                <span className={`font-semibold ${product.active ? 'text-accent-blue' : 'text-theme-muted'}`}>
                  {product.active ? 'Monitorando' : 'Suspenso'}
                </span>
              </div>
              <div className="flex justify-between py-2.5 border-b border-dark-800 md:border-b-0">
                <span className="text-theme-muted">Última Verificação</span>
                <span className="font-semibold text-theme-highlight">
                  {product.last_checked_at ? formatDate(product.last_checked_at) : 'Nenhuma checagem realizada'}
                </span>
              </div>
              <div className="flex justify-between py-2.5 md:border-l md:pl-6">
                <span className="text-theme-muted">Criado em</span>
                <span className="font-semibold text-theme-highlight flex items-center">
                  <Calendar size={14} className="mr-1 text-theme-muted" />
                  {formatDate(product.created_at)}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-dark-800 flex justify-between items-center text-xs">
              <span className="text-theme-muted">Endereço de Origem (E-commerce)</span>
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-blue hover:underline flex items-center font-medium"
              >
                {hostname} <ExternalLink size={12} className="ml-1" />
              </a>
            </div>
          </Card>
        </div>

        {/* Right Side: Quick Edit Form */}
        <div className="space-y-6">
          <Card className="text-left">
            <div className="flex items-center justify-between mb-4 border-b border-dark-800 pb-3">
              <h3 className="text-base font-bold text-theme-highlight flex items-center">
                <Settings size={16} className="mr-2 text-accent-purple" />
                Configurar Alerta
              </h3>
              {!isEditMode && (
                <button
                  onClick={() => setIsEditMode(true)}
                  className="text-xs text-accent-purple hover:text-theme-highlight flex items-center font-semibold bg-accent-purple/10 hover:bg-accent-purple/20 px-2.5 py-1.5 rounded-lg transition"
                >
                  <Edit3 size={12} className="mr-1" /> Editar
                </button>
              )}
            </div>

            {isEditMode ? (
              <ProductForm
                initialData={product}
                onSubmit={handleUpdateSubmit}
                isLoading={isUpdating}
                onCancel={() => setIsEditMode(false)}
              />
            ) : (
              <div className="space-y-4 text-sm text-theme-base">
                <div className="bg-dark-950 p-4 rounded-lg border border-dark-850">
                  <p className="text-xs text-theme-muted font-semibold uppercase tracking-wider mb-2">Preço Alvo</p>
                  <p className="text-lg font-bold text-theme-highlight">
                    {product.target_price !== null ? formatCurrency(product.target_price) : 'Não definido'}
                  </p>
                  <p className="text-xs text-theme-muted mt-1 leading-relaxed">
                    Você será alertado quando o preço coletado for menor ou igual a esse preço alvo.
                  </p>
                </div>

                <div className="bg-dark-950 p-4 rounded-lg border border-dark-850">
                  <p className="text-xs text-theme-muted font-semibold uppercase tracking-wider mb-2">Período de Monitoramento</p>
                  <p className="text-lg font-bold text-theme-highlight">
                    {product.check_interval_minutes} <span className="text-sm font-normal text-theme-muted">Minutos</span>
                  </p>
                  <p className="text-xs text-theme-muted mt-1 leading-relaxed">
                    A API PriceTracker irá visitar a URL do e-commerce e checar o preço atual com essa periodicidade.
                  </p>
                </div>

                <p className="text-xs text-theme-muted italic">
                  Clique no botão Editar acima para ajustar as configurações deste produto.
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
