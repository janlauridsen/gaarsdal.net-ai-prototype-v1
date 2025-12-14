"use client";

import { useState } from "react";

export default function Home() {
  const [sessionId] = useState(() => crypto.randomUUID());
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!message) return;

    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId,
        message,
      }),
    });

    const data = await res.json();
    setReply(data.reply);
    setMessage("");
    setLoading(false);
  }

  return (
    <main style={{ padding: 24, maxWidth: 600 }}>
      <h1>AI Hypnoterapi – Test UI</h1>

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

      {reply && (
        <div style={{ marginTop: 24 }}>
          <h3>Svar</h3>
          <p>{reply}</p>
        </div>
      )}
    </main>
  );
}
