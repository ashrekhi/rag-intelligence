import React, { useState } from "react";

export default function ChatPage() {
  const [bucketId, setBucketId] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAsk = async () => {
    if (!bucketId || !question) return;
    const res = await fetch(`/api/buckets/${bucketId}/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    if (res.ok) {
      const data = await res.json();
      setAnswer(data.answer);
    } else {
      setAnswer("Error getting answer");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Chat with Bucket</h2>
      <div>
        <label>Bucket ID: </label>
        <input value={bucketId} onChange={(e) => setBucketId(e.target.value)} />
      </div>
      <div>
        <label>Question: </label>
        <input value={question} onChange={(e) => setQuestion(e.target.value)} />
      </div>
      <button onClick={handleAsk}>Ask</button>
      <div>
        <h3>Answer:</h3>
        <p>{answer}</p>
      </div>
    </div>
  );
}