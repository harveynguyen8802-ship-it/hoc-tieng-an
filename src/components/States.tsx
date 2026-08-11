'use client';

import { Loader2 } from 'lucide-react';

export function Loading({ message = 'Đang tải...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      <div className="text-slate-500 text-sm">{message}</div>
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description }: { icon: React.ComponentType<{ className?: string }>; title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
        <Icon className="w-8 h-8 text-slate-400" />
      </div>
      <div className="font-semibold text-slate-700">{title}</div>
      {description && <div className="text-sm text-slate-500 max-w-md">{description}</div>}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
      <div className="text-red-500 text-sm">{message || 'Đã có lỗi xảy ra'}</div>
      {onRetry && <button onClick={onRetry} className="btn-secondary text-sm">Thử lại</button>}
    </div>
  );
}