"use client";

import { useState, useEffect } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  // Session id – generated ONLY after mount (avoids hydration mismatch)
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    setSessionId(crypto.randomUUID());
  }, []);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  // Debug state
  const [ragSectionIds, setRagSectionIds] = useState<string[]>([]);
  const [safetyViolation, setSafetyViolation] = useState<string | null>(null);
  const [events, setEvents] = useState<{ type: string }[]>([]);

  function resetSession() {
    setSessionId(crypto.randomUUID());
    setMessages([]);
    setMessage("");
    setRagSectionIds([]);
    setSafetyViolation(null);
    setEvents([]);
  }

  async function sendMessage() {
    if (!message || !sessionId) return;

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

    // Debug metadata (optional)
    if (data.debug) {
      setRagSectionIds(data.debug.ragSectionIds ?? []);
      setSafetyViolation(data.debug.safetyViolation ?? null);
      setEvents(data.debug.events ?? []);
    } else {
      setRagSectionIds([]);
      setSafetyViolation(null);
      setEvents([]);
    }

    setLoading(false);
  }

  // Guard: render nothing until sessionId exists (prevents hydration mismatch)
  if (!sessionId) {
    return null;
  }

  return (
    <main style={{ padding: 24, maxWidth: 640 }}>
      <h1>AI Hypnoterapi – Test UI</h1>

      {/* Session info */}
      <div style={{ marginBottom: 16 }}>
        <strong>Session ID:</strong>
        <div style={{ fontSize: 12, wordBreak: "break-all" }}>
          {sessionId}
        </div>
        <button onClick={resetSession} style={{ marginTop: 8 }}>
          Reset session
        </button>
      </div>

      {/* Chat history */}
      <div style={{ marginBottom: 24 }}>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.role === "user" ? "Du" : "Assistent"}:</strong>{" "}
            {msg.content}
          </p>
        ))}
      </div>

      {/* Input */}
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

      {/* Debug panel */}
      <hr style={{ margin: "32px 0" }} />

      <section>
        <h2>Debug</h2>

        <div style={{ fontSize: 14, marginBottom: 12 }}>
          <strong>Safety:</strong>{" "}
          {safetyViolation ? (
            <span style={{ color: "red" }}>{safetyViolation}</span>
          ) : (
            <span style={{ opacity: 0.6 }}>None</span>
          )}
        </div>

        <div style={{ fontSize: 14, marginBottom: 12 }}>
          <strong>RAG sections (ids):</strong>
          {ragSectionIds.length === 0 ? (
            <div style={{ opacity: 0.6 }}>None</div>
          ) : (
            <ul>
              {ragSectionIds.map((id) => (
                <li key={id}>{id}</li>
              ))}
            </ul>
          )}
        </div>

        <div style={{ fontSize: 14 }}>
          <strong>Observability events:</strong>
          {events.length === 0 ? (
            <div style={{ opacity: 0.6 }}>None</div>
          ) : (
            <ul>
              {events.map((e, i) => (
                <li key={i}>{e.type}</li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
