import type { SubTask } from "@/types/board";
import { useState, useCallback } from "react";

export interface AIEstimation {
  hours: number;
  confidence: number;
  complexity: "Low" | "Medium" | "High";
  reasoning: string;
  suggestedSteps: string[];
  fullReport: string;
}

export interface TaskAIResult {
  estimation: AIEstimation | null;
  isEstimating: boolean;
  error: string | null;
  getEstimation: (title: string, subTasks: SubTask[]) => Promise<void>;
}

export const useTaskAI = (description: string): TaskAIResult => {
  const [estimation, setEstimation] = useState<AIEstimation | null>(null);
  const [isEstimating, setIsEstimating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getEstimation = useCallback(async (title: string, subTasks: SubTask[]) => {
    if (!description.trim() && !title.trim()) return;

    setIsEstimating(true);
    setError(null);

    try {
      const response = await fetch("https://youssefhataba-n8n-automation.hf.space/webhook/velocity-ai-estimator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title, 
          description, 
          existingSubTasks: subTasks 
        }),
      });

      const responseData = await response.json();
      const rawData = Array.isArray(responseData) ? responseData[0] : responseData;

      if (!rawData || !rawData.text) {
        throw new Error("Invalid response format");
      }

      const parsedData = JSON.parse(rawData.text);

      setEstimation({
        hours: parsedData.estimated_hours || 0,
        confidence: (parsedData.confidence_score || 0) > 1 ? parsedData.confidence_score / 100 : parsedData.confidence_score,
        complexity: parsedData.complexity_level || "Low",
        reasoning: parsedData.reasoning || "",
        suggestedSteps: parsedData.suggested_steps || [],
        fullReport: parsedData.full_report || "",
      });
    } catch (err: unknown) {
      console.error("AI Estimation Error:", err);
      setError("Analysis failed");
    } finally {
      setIsEstimating(false);
    }
  }, [description]);

  return {
    estimation,
    isEstimating,
    error,
    getEstimation,
  };
};