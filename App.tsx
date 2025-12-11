import React, { useState } from 'react';
import { analyzeFeedback } from './services/geminiService';
import { AnalysisResult, FeedbackEntry } from './types';
import AnalysisCard from './components/AnalysisCard';
import HistoryList from './components/HistoryList';
import { Sparkles, Send, Loader2, ShieldCheck } from 'lucide-react';

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<FeedbackEntry[]>([]);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setError(null);
    setCurrentResult(null);

    try {
      const result = await analyzeFeedback(inputText);
      setCurrentResult(result);
      
      const newEntry: FeedbackEntry = {
        id: crypto.randomUUID(),
        originalText: inputText,
        timestamp: new Date(),
        analysis: result
      };

      setHistory(prev => [newEntry, ...prev]);
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro desconhecido ao processar o ticket.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-500/20">
                <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Módulo MAC</h1>
              <p className="text-xs text-slate-400">Análise e Gerenciamento de Crises</p>
            </div>
          </div>
          <div className="text-xs text-slate-500 font-mono hidden sm:block">
            v2.0.0-enterprise
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Input */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <label htmlFor="feedback" className="block text-sm font-medium text-slate-700 mb-2">
                Monitor de Feedback (Live Feed)
              </label>
              <div className="relative">
                <textarea
                  id="feedback"
                  rows={6}
                  className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 bg-slate-50 resize-none border focus:outline-none transition-all"
                  placeholder="Insira o relato bruto do usuário ou log de incidente..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <div className="absolute bottom-3 right-3 text-xs text-slate-400 pointer-events-none">
                  {inputText.length} caracteres
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setInputText("O dashboard está bom, mas a seção de Métricas de Produtividade está difícil de entender e as cores usadas não ajudam a diferenciar os dados. Além disso, seria ótimo se o chat tivesse notificações de leitura, isso facilitaria muito a comunicação.")}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium hover:underline"
                >
                  Carregar exemplo
                </button>
                <button
                  onClick={handleAnalyze}
                  disabled={loading || !inputText.trim()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="-ml-1 mr-2 h-4 w-4" />
                      Gerar Ticket
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
               <h4 className="text-xs font-bold text-indigo-800 uppercase tracking-wider mb-2">Protocolo MAC</h4>
               <p className="text-sm text-indigo-700 leading-relaxed">
                 O sistema processa inputs em tempo real para categorizar incidentes, atribuir prioridade de engenharia e direcionar automaticamente para as squads responsáveis.
               </p>
            </div>
          </div>

          {/* Right Column: Output */}
          <div className="lg:col-span-7">
            {error && (
              <div className="rounded-md bg-red-50 p-4 border border-red-200 mb-6 animate-pulse">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Falha no Processamento</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!currentResult && !loading && history.length === 0 && (
              <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50/50 text-slate-400">
                <ShieldCheck className="w-12 h-12 mb-4 opacity-20" />
                <p className="text-sm font-medium">Aguardando input para triagem...</p>
              </div>
            )}

            {loading && !currentResult && (
               <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl shadow-sm border border-slate-200">
                  <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                  <p className="text-sm text-slate-500 animate-pulse font-medium">Executando análise de crise (8 points)...</p>
               </div>
            )}

            {currentResult && (
              <AnalysisCard result={currentResult} />
            )}

            <HistoryList history={history} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;