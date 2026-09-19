import { useState } from "react";

function AIAssistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function askAI(e) {
    e.preventDefault();

    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong.");
      }

      const data = await response.json();

      setAnswer(data.answer);
    } catch (error) {
      setAnswer(
        "Unable to connect to the AI assistant right now."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <div className="page-header">
        <p className="eyebrow">AI POWERED</p>
        <h1>AI Study Assistant</h1>
        <p>
          Ask questions, explain concepts or create study material.
        </p>
      </div>

      <form onSubmit={askAI} className="ai-form">
        <textarea
          placeholder="Ask me something..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Thinking..." : "Ask AI"}
        </button>
      </form>

      {answer && (
        <div className="ai-answer">
          <h3>AI Assistant</h3>
          <p>{answer}</p>
        </div>
      )}
    </section>
  );
}

export default AIAssistant;