"use client";

import { useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [sessionId] = useState(() => crypto.randomUUID());
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!message) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId,
        message: userMessage.content,
      }),
    });

    const data = await res.json();

    const assistantMessage: ChatMessage = {
      role: "assistant",
      content: data.reply,
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setLoading(false);
  }

  return (
    <main style={{ padding: 24, maxWidth: 600 }}>
      <h1>AI Hypnoterapi – Test UI</h1>

      <div style={{ marginBottom: 24 }}>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.role === "user" ? "Du" : "Assistent"}:</strong>{" "}
            {msg.content}
          </p>
        ))}
      </div>

      <textarea
        rows={4}
        style={{ width: "100%", marginBottom: 12 }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Skriv en besked..."
      />

      <button onClick={sendMessage} disabled={loading}>
        {loading ? "Sender..." : "Send"}
      </button>
    </main>
  );
}
