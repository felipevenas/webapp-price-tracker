import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Search, Layers, RefreshCw, BarChart2, BellRing, CheckSquare } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import type { CreateProductPayload } from '../types/productTypes';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import Input from '../../../components/Input';
import { useDebounce } from '../../../hooks/useDebounce';

const ProductsPage: React.FC = () => {
  const {
    products,
    isLoading,
    fetchProducts,
    addProduct,
    toggleProductActive,
    removeProduct,
  } = useProducts();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive' | 'met'>('all');
  
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Estatísticas dos produtos
  const stats = useMemo(() => {
    const total = products.length;
    const activeCount = products.filter((p) => p.active).length;
    const metCount = products.filter((p) => p.active && p.current_price !== null && p.target_price !== null && p.current_price <= p.target_price).length;
    const alertCount = products.filter((p) => p.current_price === null).length;

    return { total, activeCount, metCount, alertCount };
  }, [products]);

  // Filtragem dos produtos
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
                            product.url.toLowerCase().includes(debouncedSearch.toLowerCase());
      
      const matchesFilter = 
        filterActive === 'all' ? true :
        filterActive === 'active' ? product.active :
        filterActive === 'inactive' ? !product.active :
        filterActive === 'met' ? (product.active && product.current_price !== null && product.target_price !== null && product.current_price <= product.target_price) : true;

      return matchesSearch && matchesFilter;
    });
  }, [products, debouncedSearch, filterActive]);

  const handleAddProductSubmit = async (payload: CreateProductPayload) => {
    try {
      await addProduct(payload);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Falha ao adicionar:', error);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-left">
          <h2 className="text-2xl font-bold text-theme-highlight tracking-tight">Meus Produtos</h2>
          <p className="text-sm text-theme-muted">Gerencie e monitore a variação de preços em tempo real</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => fetchProducts()}
            disabled={isLoading}
            leftIcon={<RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />}
          >
            Atualizar
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)} leftIcon={<Plus size={16} />}>
            Adicionar Produto
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="flex items-center space-x-4 py-4 px-5">
          <div className="w-10 h-10 rounded-xl bg-accent-purple/10 flex items-center justify-center text-accent-purple border border-accent-purple/20">
            <Layers size={18} />
          </div>
          <div className="text-left">
            <p className="text-xs text-theme-muted font-semibold uppercase tracking-wider">Total Monitorado</p>
            <p className="text-xl font-bold text-theme-highlight">{stats.total}</p>
          </div>
        </Card>

        <Card className="flex items-center space-x-4 py-4 px-5">
          <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue border border-accent-blue/20">
            <BellRing size={18} />
          </div>
          <div className="text-left">
            <p className="text-xs text-theme-muted font-semibold uppercase tracking-wider">Ativos</p>
            <p className="text-xl font-bold text-theme-highlight">{stats.activeCount}</p>
          </div>
        </Card>

        <Card className="flex items-center space-x-4 py-4 px-5">
          <div className="w-10 h-10 rounded-xl bg-accent-green/10 flex items-center justify-center text-accent-green border border-accent-green/20">
            <CheckSquare size={18} />
          </div>
          <div className="text-left">
            <p className="text-xs text-theme-muted font-semibold uppercase tracking-wider">Preço Alvo Atingido</p>
            <p className="text-xl font-bold text-theme-highlight">{stats.metCount}</p>
          </div>
        </Card>

        <Card className="flex items-center space-x-4 py-4 px-5">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 border border-yellow-500/20">
            <BarChart2 size={18} />
          </div>
          <div className="text-left">
            <p className="text-xs text-theme-muted font-semibold uppercase tracking-wider">Sem preço</p>
            <p className="text-xl font-bold text-theme-highlight">{stats.alertCount}</p>
          </div>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <Card className="py-4 px-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="w-full md:max-w-xs">
            <Input
              label="Buscar Produtos"
              placeholder="Buscar por nome ou URL..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              containerClassName="mb-0"
              leftIcon={<Search size={16} />}
            />
          </div>

          {/* Filter Options */}
          <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
            <button
              onClick={() => setFilterActive('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition ${
                filterActive === 'all'
                  ? 'bg-accent-purple/20 text-accent-purple border border-accent-purple/30'
                  : 'bg-dark-800 text-theme-muted hover:text-theme-base border border-dark-700'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterActive('active')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition ${
                filterActive === 'active'
                  ? 'bg-accent-blue/20 text-accent-blue border border-accent-blue/30'
                  : 'bg-dark-800 text-theme-muted hover:text-theme-base border border-dark-700'
              }`}
            >
              Monitorados
            </button>
            <button
              onClick={() => setFilterActive('met')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition ${
                filterActive === 'met'
                  ? 'bg-accent-green/20 text-accent-green border border-accent-green/30'
                  : 'bg-dark-800 text-theme-muted hover:text-theme-base border border-dark-700'
              }`}
            >
              Preço Alvo Atingido
            </button>
            <button
              onClick={() => setFilterActive('inactive')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition ${
                filterActive === 'inactive'
                  ? 'bg-dark-700 text-theme-base border border-dark-600'
                  : 'bg-dark-800 text-theme-muted hover:text-theme-base border border-dark-700'
              }`}
            >
              Pausados
            </button>
          </div>
        </div>
      </Card>

      {/* Product List Grid */}
      <ProductList
        products={filteredProducts}
        isLoading={isLoading}
        onToggleActive={toggleProductActive}
        onDelete={removeProduct}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      {/* Register Product Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Cadastrar Novo Produto"
      >
        <ProductForm
          onSubmit={handleAddProductSubmit}
          isLoading={isLoading}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default ProductsPage;
