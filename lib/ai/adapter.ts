export type GenerateTextInput = {
  prompt: string;
};

export type GenerateTextOutput = {
  text: string;
};

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-4o-mini";

export async function generateText(
  input: GenerateTextInput
): Promise<GenerateTextOutput> {
  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: "system",
          content: input.prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error("OpenAI API request failed");
  }

  const data = await response.json();

  return {
    text: data.choices[0].message.content,
  };
}
