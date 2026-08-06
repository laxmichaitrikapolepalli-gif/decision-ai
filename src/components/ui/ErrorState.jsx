import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export const ErrorState = ({ message = 'Failed to load data from server.', onRetry }) => {
  return (
    <div className="p-8 rounded-3xl glass-card border border-rose-500/30 text-center space-y-4 shadow-xl my-4">
      <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 flex items-center justify-center mx-auto">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-base font-black text-slate-900">Something went wrong</h3>
        <p className="text-xs text-slate-700 font-extrabold mt-1 max-w-md mx-auto">{message}</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} variant="secondary" size="sm" icon={RefreshCw} className="mx-auto">
          Retry Request
        </Button>
      )}
    </div>
  );
};
