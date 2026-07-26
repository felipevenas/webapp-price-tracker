import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import Card from './Card';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content container */}
      <div className="relative w-full max-w-md z-10 animate-in fade-in zoom-in-95 duration-200">
        <Card className="shadow-2xl border border-dark-700 bg-dark-900">
          <div className="flex items-center justify-between border-b border-dark-800 pb-3 mb-4">
            <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white rounded-lg p-1 transition hover:bg-dark-800"
            >
              <X size={18} />
            </button>
          </div>
          <div>{children}</div>
        </Card>
      </div>
    </div>
  );
};

export default Modal;
