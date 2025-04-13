import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import BudgetChart from "./components/BudgetChart";
import { Globe } from "lucide-react";

function GeminiBudgetAssistant() {
  const [userPrompt, setUserPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  const callGemini = async () => {
    setLoading(true);
    setResponse("");
    try {
      const res = await fetch("http://54.147.4.244:8000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userPrompt })
      });
      const data = await res.json();
      setResponse(data.output);

      // mock parsing chart data from backend (replace with real parser)
      setChartData([
        { name: "Week 1", Spending: 5000 },
        { name: "Week 2", Spending: 7000 },
        { name: "Week 3", Spending: 3000 },
        { name: "Week 4", Spending: 8000 }
      ]);
    } catch (err) {
      setResponse("Error contacting Gemini backend.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-2 justify-center">
        <Globe className="w-6 h-6 text-blue-600" />
        <h1 className="text-3xl font-semibold text-center">Multilingual Gemini Budget Assistant</h1>
      </div>
      <p className="text-center text-gray-600">
        Ask budget questions in any language (e.g., Hindi, Tamil, Telugu...)
      </p>
      <Textarea
        className="w-full p-4 rounded-xl border"
        rows={4}
        placeholder="e.g. ₹25,000 कमाने वाले छात्र के लिए बजट योजना क्या होनी चाहिए?"
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
      />
      <Button className="w-full" onClick={callGemini} disabled={loading}>
        {loading ? "Generating..." : "Generate Budget Plan"}
      </Button>
      {response && (
        <div className="mt-6 p-4 bg-gray-50 rounded-xl border whitespace-pre-wrap text-sm">
          {response}
        </div>
      )}
      {chartData.length > 0 && <BudgetChart data={chartData} />}
    </div>
  );
}

export default GeminiBudgetAssistant;
