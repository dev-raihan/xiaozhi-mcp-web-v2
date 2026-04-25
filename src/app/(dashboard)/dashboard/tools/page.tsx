"use client";

import { useState } from "react";
import { 
  Server, 
  Play, 
  Copy, 
  Check, 
  Loader2,
  Globe,
  Search,
  Calculator,
  Cloud,
  Book,
  Image,
  Send,
  TrendingUp,
  
  Wind,
  Lightbulb,
  
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TOOLS = [
  { id: "web_search", name: "Web Search", icon: Search, params: [{ name: "query", label: "Search Query", type: "text" }] },
  { id: "weather", name: "Weather", icon: Cloud, params: [{ name: "city", label: "City Name", type: "text" }] },
  { id: "wikipedia", name: "Wikipedia", icon: Book, params: [{ name: "topic", label: "Topic", type: "text" }] },
  { id: "joke", name: "Random Joke", icon: Loader2, params: [] },
  { id: "number_fact", name: "Number Fact", icon: Calculator, params: [{ name: "number", label: "Number (0-100)", type: "number" }] },
  { id: "history_today", name: "History Today", icon: Calendar, params: [] },
  { id: "crypto_price", name: "Crypto Price", icon: TrendingUp, params: [{ name: "symbol", label: "Crypto Symbol (e.g., BTC)", type: "text" }] },
  { id: "currency_convert", name: "Currency Convert", icon: TrendingUp, params: [{ name: "from", label: "From (e.g., USD)", type: "text" }, { name: "to", label: "To (e.g., EUR)", type: "text" }, { name: "amount", label: "Amount", type: "number" }] },
  { id: "air_quality", name: "Air Quality", icon: Wind, params: [{ name: "city", label: "City Name", type: "text" }] },
  { id: "calculator", name: "Calculator", icon: Calculator, params: [{ name: "expression", label: "Expression (e.g., 2+2)", type: "text" }] },
];

export default function ToolsPage() {
  const [selectedTool, setSelectedTool] = useState(TOOLS[0]);
  const [params, setParams] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  const runTool = async () => {
    setLoading(true);
    setError("");
    setResult("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setResult(`{"success": true, "data": "Tool '${selectedTool.name}' executed successfully. Result: Here's your simulated result for ${JSON.stringify(params)}}`);
    } catch (err) {
      setError("An error occurred while executing the tool");
    } finally {
      setLoading(false);
    }
  };

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Test Tools</h1>
        <p className="text-muted-foreground">
          Test all available MCP tools interactively
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Tools List */}
        <Card className="bg-white/5 border-white/10 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Available Tools</CardTitle>
            <CardDescription>
              {TOOLS.length} tools ready to test
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {TOOLS.map((tool) => (
              <button
                key={tool.id}
                onClick={() => {
                  setSelectedTool(tool);
                  setParams({});
                  setResult("");
                  setError("");
                }}
                className={`w-full flex items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors ${
                  selectedTool.id === tool.id
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-white/5"
                }`}
              >
                <tool.icon className="h-5 w-5" />
                <span className="font-medium">{tool.name}</span>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Tool Config & Result */}
        <Card className="bg-white/5 border-white/10 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <selectedTool.icon className="h-5 w-5 text-primary" />
              <CardTitle>{selectedTool.name}</CardTitle>
            </div>
            <CardDescription>
              Configure parameters and execute the tool
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedTool.params.length > 0 ? (
              <div className="space-y-4">
                {selectedTool.params.map((param) => (
                  <div key={param.name} className="space-y-2">
                    <Label>{param.label}</Label>
                    <Input
                      type={param.type}
                      placeholder={`Enter ${param.label.toLowerCase()}`}
                      value={params[param.name] || ""}
                      onChange={(e) => setParams(p => ({ ...p, [param.name]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                This tool doesn&apos;t require any parameters. Click &quot;Run Tool&quot; to execute.
              </p>
            )}

            <Button onClick={runTool} disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Executing...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Run Tool
                </>
              )}
            </Button>

            {error && (
              <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {result && (
              <div className="space-y-2">
                <Label>Result</Label>
                <div className="relative">
                  <pre className="rounded-lg bg-white/5 p-4 text-sm overflow-auto max-h-64">
                    {result}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(result)}
                    className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded bg-white/10 hover:bg-white/20"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}