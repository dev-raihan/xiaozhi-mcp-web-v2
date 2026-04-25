"use client";

import { useState } from "react";
import { 
  Key, 
  Plus, 
  Copy, 
  Check, 
  Trash2, 
  Eye, 
  EyeOff,
  RefreshCw,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const API_KEYS = [
  { id: "1", name: "Production", key: "sk_live_xxxxxxxxxxxxx", created: "2024-01-15", lastUsed: "2024-01-20" },
  { id: "2", name: "Development", key: "sk_test_xxxxxxxxxxxxx", created: "2024-01-10", lastUsed: null },
];

export default function ApiKeysPage() {
  const [keys, setKeys] = useState(API_KEYS);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [newKeyName, setNewKeyName] = useState("");

  const copyToClipboard = async (key: string, id: string) => {
    await navigator.clipboard.writeText(key);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const deleteKey = (id: string) => {
    setKeys(prev => prev.filter(k => k.id !== id));
  };

  const generateKey = () => {
    const newKey = {
      id: Date.now().toString(),
      name: newKeyName || "New Key",
      key: `sk_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      created: new Date().toISOString().split("T")[0],
      lastUsed: null,
    };
    setKeys(prev => [...prev, newKey]);
    setNewKeyName("");
  };

  const maskKey = (key: string) => {
    return key.substring(0, 8) + "••••••••••••" + key.substring(key.length - 4);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">API Keys</h1>
        <p className="text-muted-foreground">
          Manage your API keys for programmatic access
        </p>
      </div>

      {/* Create New Key */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-base">Create New API Key</CardTitle>
          <CardDescription>
            Generate a new API key for your applications
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Input
            placeholder="Key name (e.g., Production)"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            className="max-w-xs"
          />
          <Button onClick={generateKey} disabled={!newKeyName}>
            <Plus className="h-4 w-4 mr-2" />
            Generate Key
          </Button>
        </CardContent>
      </Card>

      {/* API Keys List */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-base">Your API Keys</CardTitle>
          <CardDescription>
            {keys.length} key{keys.length !== 1 ? "s" : ""} available
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {keys.map((apiKey) => (
            <div
              key={apiKey.id}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{apiKey.name}</span>
                </div>
                <div className="mt-1 font-mono text-sm text-muted-foreground">
                  {visibleKeys.has(apiKey.id) ? apiKey.key : maskKey(apiKey.key)}
                </div>
                <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Created: {apiKey.created}</span>
                  {apiKey.lastUsed && <span>Last used: {apiKey.lastUsed}</span>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleKeyVisibility(apiKey.id)}
                  className="flex h-9 w-9 items-center justify-center rounded border border-white/10 hover:bg-white/5"
                >
                  {visibleKeys.has(apiKey.id) ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                  className="flex h-9 w-9 items-center justify-center rounded border border-white/10 hover:bg-white/5"
                >
                  {copiedId === apiKey.id ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={() => deleteKey(apiKey.id)}
                  className="flex h-9 w-9 items-center justify-center rounded border border-white/10 hover:bg-white/5 text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Documentation */}
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-6">
          <h3 className="font-medium mb-2">API Documentation</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Learn how to integrate the MCP API into your applications.
          </p>
          <code className="block rounded bg-white/5 p-4 text-sm">
            curl -X POST https://your-mcp-server.com/mcp \<br/>
            &nbsp;&nbsp;-H "Authorization: Bearer YOUR_API_KEY" \<br/>
            &nbsp;&nbsp;-H "Content-Type: application/json" \<br/>
            &nbsp;&nbsp;-d '{"method":"tools/list"}'
          </code>
        </CardContent>
      </Card>
    </div>
  );
}