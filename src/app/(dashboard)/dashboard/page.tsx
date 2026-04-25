"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Key, 
  Activity, 
  CheckCircle2, 
  XCircle, 
  Copy, 
  RefreshCw, 
  Zap,
  Server,
  ExternalLink,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const MCP_SERVER_URL = process.env.NEXT_PUBLIC_MCP_SERVER_URL || "https://xiaozhi-mcp-server.railway.app";
const MCP_TOOLS = [
  { name: "weather", description: "Get current weather for any city", enabled: true },
  { name: "web_search", description: "Search the web for current information", enabled: true },
  { name: "wikipedia", description: "Search Wikipedia for factual information", enabled: true },
  { name: "joke", description: "Get a random joke", enabled: true },
  { name: "number_fact", description: "Get interesting trivia about a number", enabled: true },
  { name: "history_today", description: "Major events that happened today in history", enabled: true },
  { name: "crypto_price", description: "Get cryptocurrency prices in USD", enabled: true },
  { name: "currency_convert", description: "Convert between world currencies", enabled: true },
  { name: "air_quality", description: "Get air pollution/AQI for a city", enabled: true },
  { name: "send_telegram_message", description: "Send notification via Telegram", enabled: true },
  { name: "calculator", description: "Mathematical calculations", enabled: true },
];

export default function DashboardPage() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"connecting" | "connected" | "disconnected">("connecting");

  useEffect(() => {
    // Check connection status
    const checkStatus = async () => {
      try {
        const response = await fetch(`${MCP_SERVER_URL}/health`);
        if (response.ok) {
          setStatus("connected");
        } else {
          setStatus("disconnected");
        }
      } catch {
        setStatus("disconnected");
      }
    };
    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your MCP connection and tools
        </p>
      </div>

      {/* Connection Status */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">Connection Status</CardTitle>
            {status === "connected" ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : status === "connecting" ? (
              <RefreshCw className="h-5 w-5 text-yellow-500 animate-spin" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${
                status === "connected" ? "bg-green-500" : 
                status === "connecting" ? "bg-yellow-500 animate-pulse" : 
                "bg-red-500"
              }`} />
              <span className="text-sm capitalize">{status}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Last checked: {new Date().toLocaleTimeString()}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">API Endpoint</CardTitle>
            <Key className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <code className="flex-1 rounded bg-white/5 px-3 py-2 text-xs truncate">
                {MCP_SERVER_URL}
              </code>
              <button
                onClick={() => copyToClipboard(MCP_SERVER_URL)}
                className="flex h-9 w-9 items-center justify-center rounded border border-white/10 hover:bg-white/5 transition-colors"
              >
                {copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-base">Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to get you started
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <Button variant="outline" className="justify-start">
            <Globe className="h-4 w-4 mr-2" />
            Test Web Search
          </Button>
          <Button variant="outline" className="justify-start">
            <Activity className="h-4 w-4 mr-2" />
            Test Weather API
          </Button>
          <Button variant="outline" className="justify-start">
            <Server className="h-4 w-4 mr-2" />
            View All Tools
          </Button>
          <Button variant="outline" className="justify-start">
            <Zap className="h-4 w-4 mr-2" />
            Test Calculator
          </Button>
        </CardContent>
      </Card>

      {/* Available Tools */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-base">Available Tools</CardTitle>
          <CardDescription>
            {MCP_TOOLS.length} tools enabled for your MCP server
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2">
            {MCP_TOOLS.map((tool) => (
              <div
                key={tool.name}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3"
              >
                <div>
                  <p className="font-medium">{tool.name}</p>
                  <p className="text-xs text-muted-foreground">{tool.description}</p>
                </div>
                {tool.enabled && (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Documentation Link */}
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Need help integrating?</h3>
              <p className="text-sm text-muted-foreground">
                Check our documentation for integration guides
              </p>
            </div>
            <Button variant="outline" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                View Docs
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}