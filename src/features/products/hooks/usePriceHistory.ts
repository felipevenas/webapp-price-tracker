import { useState, useCallback } from 'react';
import { productService } from '../services/productService';
import type { PriceHistoryResponse } from '../types/productTypes';
import toast from 'react-hot-toast';

export const usePriceHistory = () => {
  const [history, setHistory] = useState<PriceHistoryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async (productId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await productService.getPriceHistory(productId);
      if (response.status === 'success') {
        setHistory(response.data);
      } else {
        setError(response.message);
        toast.error(response.message || 'Falha ao buscar histórico de preços.');
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || 'Erro ao carregar histórico de preços.';
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    history,
    isLoading,
    error,
    fetchHistory,
  };
};
