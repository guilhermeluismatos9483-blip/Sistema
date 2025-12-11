export interface AnalysisResult {
  ticket_id: string;
  sentimento_refinado: string;
  prioridade_interna: string;
  equipe_responsavel: string;
  analise_impacto: string;
  sumario_acao_imediata: string;
  necessidade_relacionada: string;
  resposta_usuario_final: string;
}

export interface FeedbackEntry {
  id: string;
  originalText: string;
  timestamp: Date;
  analysis: AnalysisResult;
}