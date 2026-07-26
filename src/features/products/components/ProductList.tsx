import React from 'react';
import { PackageOpen, Plus } from 'lucide-react';
import type { ProductResponse } from '../types/productTypes';
import ProductCard from './ProductCard';
import Button from '../../../components/Button';
import Spinner from '../../../components/Spinner';

interface ProductListProps {
  products: ProductResponse[];
  isLoading: boolean;
  onToggleActive: (id: string, currentStatus: boolean) => void;
  onDelete: (id: string) => void;
  onOpenAddModal: () => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  isLoading,
  onToggleActive,
  onDelete,
  onOpenAddModal,
}) => {
  if (isLoading && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Spinner size="lg" />
        <p className="mt-4 text-sm text-gray-400">Carregando seus produtos monitorados...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-dark-900/40 backdrop-blur-xl border border-dark-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center max-w-lg mx-auto mt-8">
        <div className="w-16 h-16 rounded-2xl bg-dark-800 flex items-center justify-center text-gray-500 mb-6 border border-dark-700">
          <PackageOpen size={32} />
        </div>
        <h3 className="text-lg font-bold text-gray-100 mb-2">Nenhum produto cadastrado</h3>
        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
          Você ainda não está monitorando nenhum produto. Adicione links de produtos de e-commerce e receba alertas quando o preço cair!
        </p>
        <Button onClick={onOpenAddModal} leftIcon={<Plus size={16} />}>
          Cadastrar Meu Primeiro Produto
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <ProductCard
            product={product}
            onToggleActive={onToggleActive}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
