'use client';

import { useToastStore } from '@/store/useToastStore';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

import { useMounted } from '@/hooks/useMounted';

export function ToastProvider() {
  const mounted = useMounted();
  const toasts = useToastStore(state => state.toasts);
  const removeToast = useToastStore(state => state.removeToast);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[150] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "pointer-events-auto flex items-center justify-between w-full max-w-sm rounded-lg pr-2 pl-4 py-3 shadow-lg transform transition-all duration-300 translate-y-0 opacity-100",
            {
              "bg-green-50 text-green-800 border border-green-200": toast.type === 'success',
              "bg-red-50 text-red-800 border border-red-200": toast.type === 'error',
              "bg-blue-50 text-blue-800 border border-blue-200": toast.type === 'info',
            }
          )}
        >
          <div className="flex items-center gap-3">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-blue-500" />}
            <p className="text-sm font-medium">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 rounded-md hover:bg-black/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
