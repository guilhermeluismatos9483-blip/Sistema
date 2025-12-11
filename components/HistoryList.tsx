import React from 'react';
import { FeedbackEntry } from '../types';
import { Clock, FileText } from 'lucide-react';

interface HistoryListProps {
  history: FeedbackEntry[];
}

const HistoryList: React.FC<HistoryListProps> = ({ history }) => {
  if (history.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-slate-500" />
        Histórico de Tickets
      </h3>
      <div className="space-y-4">
        {history.map((entry) => (
          <div key={entry.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:border-indigo-200 transition-colors group">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded border border-indigo-100">
                  {entry.analysis.ticket_id}
                </span>
                <span className="text-xs text-slate-400">
                  {entry.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${
                entry.analysis.prioridade_interna.includes("Máxima") ? 'bg-red-100 text-red-700' :
                entry.analysis.prioridade_interna.includes("Alta") ? 'bg-orange-100 text-orange-700' :
                entry.analysis.prioridade_interna.includes("Média") ? 'bg-yellow-100 text-yellow-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {entry.analysis.prioridade_interna.split(' ')[0]}
              </span>
            </div>
            <p className="text-slate-600 text-sm line-clamp-2 mb-3 group-hover:text-slate-900 transition-colors">"{entry.originalText}"</p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <FileText className="w-3 h-3" />
              <span>{entry.analysis.equipe_responsavel}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;