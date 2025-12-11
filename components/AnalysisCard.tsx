import React from 'react';
import { AnalysisResult } from '../types';
import { 
  AlertOctagon, 
  CheckCircle2, 
  Activity, 
  Users, 
  Zap, 
  Link2, 
  MessageSquare, 
  FileText,
  ShieldAlert
} from 'lucide-react';

interface AnalysisCardProps {
  result: AnalysisResult;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ result }) => {
  const getPriorityColor = (priority: string) => {
    if (priority.includes("Máxima")) return "bg-red-100 text-red-800 border-red-200";
    if (priority.includes("Alta")) return "bg-orange-100 text-orange-800 border-orange-200";
    if (priority.includes("Média")) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-blue-100 text-blue-800 border-blue-200";
  };

  const getSentimentColor = (sentiment: string) => {
    if (sentiment.includes("Negativo")) return "text-red-600";
    if (sentiment.includes("Neutro")) return "text-slate-600";
    return "text-green-600";
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden animate-fade-in-up">
      {/* Header: Ticket ID & Priority */}
      <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-500/20 p-2 rounded-lg border border-indigo-500/30">
             <FileText className="w-5 h-5 text-indigo-300" />
          </div>
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Ticket ID</div>
            <div className="text-lg font-mono font-bold tracking-tight text-white">{result.ticket_id}</div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${getPriorityColor(result.prioridade_interna)}`}>
          {result.prioridade_interna}
        </span>
      </div>
      
      <div className="p-6 space-y-6">
        
        {/* Row 1: Sentiment & Team */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-slate-400" />
              <h4 className="text-xs font-bold text-slate-500 uppercase">Sentimento Refinado</h4>
            </div>
            <p className={`font-semibold ${getSentimentColor(result.sentimento_refinado)}`}>
              {result.sentimento_refinado}
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
             <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-slate-400" />
              <h4 className="text-xs font-bold text-slate-500 uppercase">Equipe Responsável</h4>
            </div>
            <p className="font-semibold text-slate-800">
              {result.equipe_responsavel}
            </p>
          </div>
        </div>

        {/* Row 2: Impact Analysis */}
        <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-orange-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-orange-900 mb-1">Análise de Impacto</h4>
              <p className="text-orange-800 text-sm leading-relaxed">
                {result.analise_impacto}
              </p>
            </div>
          </div>
        </div>

        {/* Row 3: Technical Actions (Action & Related Need) */}
        <div className="space-y-4">
            {/* Immediate Action */}
            <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200">
                        <Zap className="w-4 h-4 text-indigo-600" />
                    </div>
                </div>
                <div>
                    <h4 className="text-sm font-bold text-slate-900">Ação Imediata Sugerida</h4>
                    <p className="text-slate-600 text-sm mt-1">{result.sumario_acao_imediata}</p>
                </div>
            </div>

             {/* Related Need */}
             <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center border border-teal-200">
                        <Link2 className="w-4 h-4 text-teal-600" />
                    </div>
                </div>
                <div>
                    <h4 className="text-sm font-bold text-slate-900">Necessidade Relacionada (Raiz)</h4>
                    <p className="text-slate-600 text-sm mt-1">{result.necessidade_relacionada}</p>
                </div>
            </div>
        </div>

        {/* Footer: User Response */}
        <div className="border-t border-slate-100 pt-5 mt-2">
           <div className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-slate-400 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Draft de Resposta ao Usuário</h4>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-600 text-sm italic">
                    "{result.resposta_usuario_final}"
                </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default AnalysisCard;