export type ObservabilityEvent =
  | {
      type: "session_start";
      sessionId: string;
    }
  | {
      type: "user_message";
      sessionId: string;
      messageLength: number;
    }
  | {
      type: "rag_selection";
      sessionId: string;
      sectionIds: string[];
    }
  | {
      type: "safety_violation";
      sessionId: string;
      violationType: string;
    }
  | {
      type: "assistant_response";
      sessionId: string;
      responseLength: number;
    };
