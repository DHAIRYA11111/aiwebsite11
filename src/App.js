import React, { useState } from "react";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    try {
const response = await fetch(
  "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_HF_API_KEY}`,

      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: prompt }),
  }
);

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const json = await response.json();
        alert("Error: " + (json.error || "Unknown error from API"));
        setLoading(false);
        return;
      }

      const blob = await response.blob();
      const imageObjectURL = URL.createObjectURL(blob);
      setImage(imageObjectURL);
    } catch (error) {
      alert("Failed to generate image, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app dark-mode">
      <header className="hero-section">
        <div className="logo-text-container">
          <h1 className="gradient-title">Everything.ai</h1>
          <p className="tagline">simply for everything</p>
          <button
            className="menu-dot"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle menu"
          />
        </div>
      </header>

      <div className="main-layout">
        {sidebarOpen && (
          <aside className="sidebar">
            <h2 className="sidebar-heading">Other Features</h2>
            <ul className="sidebar-menu">
              <li>AI Podcast Generator</li>
              <li>AI Hotline</li>
              <li>AI Grammar Helper</li>
              <li>Notes to Podcast</li>
              <li>Project Helper</li>
              <li>Music Generator</li>
              <li>AI Chat Bot</li>
            </ul>
          </aside>
        )}

        <main className="main-content">
          <h2 className="image-generator-title">
            <span className="highlight-dark">AI</span> IMAGE GENERATOR
          </h2>
          <div className="input-section">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here..."
            />
            <button onClick={generateImage} disabled={loading}>
              {loading ? "Generating..." : "Generate Image"}
            </button>
          </div>
          {image && <img src={image} alt="Generated" className="generated-image" />}
        </main>
      </div>
    </div>
  );
}

export default App;