"use client";
import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 배경 오버레이 */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* 모달 컨텐츠 */}
      <div 
        ref={modalRef}
        className="relative bg-surface border border-border rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto animate-in zoom-in duration-300"
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-border hover:bg-white/20 flex items-center justify-center transition-colors duration-200"
          >
            <span className="text-white text-lg">×</span>
          </button>
        </div>
        
        {/* 컨텐츠 */}
        <div className="text-muted leading-relaxed">
          {children}
        </div>
        
        {/* 닫기 버튼 */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-brand text-black font-semibold rounded-lg hover:bg-brand/90 transition-colors duration-200"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}