import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult } from "../types";

const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    ticket_id: {
      type: Type.STRING,
      description: "ID único e sequencial (Ex: MAC-20251211-001A)."
    },
    sentimento_refinado: {
      type: Type.STRING,
      enum: ["Positivo (Elogio)", "Neutro (Sugestão de Recurso)", "Negativo (Crítico/Usabilidade)"],
      description: "Classificação refinada do sentimento."
    },
    prioridade_interna: {
      type: Type.STRING,
      enum: ["Máxima (Bloqueador)", "Alta (Degradação)", "Média (Melhoria)", "Baixa (Qualidade de Vida)"],
      description: "Nível de urgência para a equipe interna."
    },
    equipe_responsavel: {
      type: Type.STRING,
      enum: ["Desenvolvimento Front-End (UI/UX)", "Desenvolvimento Back-End (Performance/API)", "Suporte ao Cliente", "Time de Produto"],
      description: "Equipe que deve receber o ticket."
    },
    analise_impacto: {
      type: Type.STRING,
      description: "Descrição do potencial impacto deste feedback."
    },
    sumario_acao_imediata: {
      type: Type.STRING,
      description: "Ação técnica clara e detalhada."
    },
    necessidade_relacionada: {
      type: Type.STRING,
      description: "Recurso ou correção secundária relacionada."
    },
    resposta_usuario_final: {
      type: Type.STRING,
      description: "Mensagem de agradecimento e confirmação para o usuário."
    }
  },
  required: [
    "ticket_id",
    "sentimento_refinado",
    "prioridade_interna",
    "equipe_responsavel",
    "analise_impacto",
    "sumario_acao_imediata",
    "necessidade_relacionada",
    "resposta_usuario_final"
  ]
};

export const analyzeFeedback = async (feedbackText: string): Promise<AnalysisResult> => {
  if (!apiKey) {
    throw new Error("API Key não encontrada. Verifique as configurações.");
  }

  const systemInstruction = `Você é o Módulo de Análise e Gerenciamento de Crises (MAC), a camada de inteligência de negócios mais avançada do aplicativo. Sua função é processar feedback de usuários em tempo real, transformando texto livre em um ticket de ação completo e priorizado.
  
  Analise o texto fornecido e gere uma saída estritamente em JSON seguindo o esquema fornecido e os 8 pontos de análise definidos. Gere o ticket_id dinamicamente com base na data atual.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: feedbackText,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.2,
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Resposta vazia da IA.");
    }

    return JSON.parse(text) as AnalysisResult;
  } catch (error) {
    console.error("Erro na análise de feedback:", error);
    throw error;
  }
};