"use client";
import { useState } from "react";
import { Key, Plus, Copy, Check, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  function copyToClipboard(key: string, id: string) {
    navigator.clipboard.writeText(key);
    setCopiedId(id);
    setTimeout(function() { setCopiedId(null); }, 2000);
  }
  function toggleKeyVisibility(id: string) {
    setVisibleKeys(function(prev) {
      var newSet = new Set(prev);
      if (newSet.has(id)) { newSet.delete(id); } else { newSet.add(id); }
      return newSet;
    });
  }
  function deleteKey(id: string) {
    setKeys(function(prev) { return prev.filter(function(k) { return k.id !== id; }); });
  }
  function generateKey() {
    var newKey = {
      id: Date.now().toString(),
      name: newKeyName || "New Key",
      key: "sk_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      created: new Date().toISOString().split("T")[0],
      lastUsed: null,
    };
    setKeys(function(prev) { return prev.concat([newKey]); });
    setNewKeyName("");
  }
  function maskKey(key: string): string {
    return key.substring(0, 8) + "xxxxxxxxxxxx" + key.substring(key.length - 4);
  }
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">API Keys</h1>
        <p className="text-muted-foreground">Manage your API keys</p>
      </div>
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-base">Create New Key</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Input placeholder="Key name" value={newKeyName} onChange={(e) => setNewKeyName(e.target.value)} className="max-w-xs" />
          <Button onClick={generateKey} disabled={!newKeyName}><Plus className="h-4 w-4 mr-2" />Generate</Button>
        </CardContent>
      </Card>
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-base">Your Keys</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {keys.map(function(apiKey: any) {
            return (
              <div key={apiKey.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{apiKey.name}</span>
                  </div>
                  <div className="mt-1 font-mono text-sm text-muted-foreground">
                    {visibleKeys.has(apiKey.id) ? apiKey.key : maskKey(apiKey.key)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    <span>Created: {apiKey.created}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={function() { toggleKeyVisibility(apiKey.id); }} className="flex h-9 w-9 items-center justify-center rounded border border-white/10 hover:bg-white/5">
                    {visibleKeys.has(apiKey.id) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <button onClick={function() { copyToClipboard(apiKey.key, apiKey.id); }} className="flex h-9 w-9 items-center justify-center rounded border border-white/10 hover:bg-white/5">
                    {copiedId === apiKey.id ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </button>
                  <button onClick={function() { deleteKey(apiKey.id); }} className="flex h-9 w-9 items-center justify-center rounded border border-white/10 hover:bg-white/5 text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
