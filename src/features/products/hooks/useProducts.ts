import { useState, useCallback } from 'react';
import { productService } from '../services/productService';
import type { ProductResponse, CreateProductPayload, UpdateProductPayload } from '../types/productTypes';
import toast from 'react-hot-toast';

export const useProducts = () => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await productService.getProducts();
      if (response.status === 'success') {
        setProducts(response.data);
      } else {
        setError(response.message);
        toast.error(response.message || 'Falha ao buscar produtos.');
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || 'Erro de conexão ao buscar produtos.';
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addProduct = async (payload: CreateProductPayload) => {
    setIsLoading(true);
    try {
      const response = await productService.createProduct(payload);
      if (response.status === 'success') {
        setProducts((prev) => [response.data, ...prev]);
        toast.success('Produto cadastrado com sucesso!');
        return response.data;
      } else {
        toast.error(response.message || 'Falha ao cadastrar produto.');
        throw new Error(response.message);
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || 'Erro ao cadastrar produto.';
      toast.error(errMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProductConfig = async (productId: string, payload: UpdateProductPayload) => {
    try {
      const response = await productService.updateProduct(productId, payload);
      if (response.status === 'success') {
        setProducts((prev) =>
          prev.map((prod) => (prod.id === productId ? response.data : prod))
        );
        toast.success('Produto atualizado com sucesso!');
        return response.data;
      } else {
        toast.error(response.message || 'Falha ao atualizar produto.');
        throw new Error(response.message);
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || 'Erro ao atualizar produto.';
      toast.error(errMsg);
      throw err;
    }
  };

  const toggleProductActive = async (productId: string, currentStatus: boolean) => {
    try {
      const response = await productService.updateProduct(productId, { active: !currentStatus });
      if (response.status === 'success') {
        setProducts((prev) =>
          prev.map((prod) => (prod.id === productId ? response.data : prod))
        );
        toast.success(!currentStatus ? 'Monitoramento ativado!' : 'Monitoramento pausado!');
      } else {
        toast.error(response.message || 'Falha ao alterar status.');
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || 'Erro ao alterar status.';
      toast.error(errMsg);
    }
  };

  const removeProduct = async (productId: string) => {
    try {
      const response = await productService.deleteProduct(productId);
      if (response.status === 'success') {
        setProducts((prev) => prev.filter((prod) => prod.id !== productId));
        toast.success('Produto removido com sucesso!');
      } else {
        toast.error(response.message || 'Falha ao remover produto.');
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || 'Erro ao remover produto.';
      toast.error(errMsg);
    }
  };

  return {
    products,
    isLoading,
    error,
    fetchProducts,
    addProduct,
    updateProductConfig,
    toggleProductActive,
    removeProduct,
  };
};
