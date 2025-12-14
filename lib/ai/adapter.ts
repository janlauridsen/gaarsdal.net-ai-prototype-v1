export type GenerateTextInput = {
  prompt: string;
};

export type GenerateTextOutput = {
  text: string;
};

export async function generateText(
  input: GenerateTextInput
): Promise<GenerateTextOutput> {
  // Placeholder-implementering
  // Den konkrete model kobles på i et senere commit
  return {
    text: "Dette er et midlertidigt AI-svar.",
  };
}
