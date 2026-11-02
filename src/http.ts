import { createMcpHandler } from "@modelcontextprotocol/server";
import { createMcpExpressApp } from "@modelcontextprotocol/express";
import { toNodeHandler } from "@modelcontextprotocol/node";
import { createServer } from "./server.js";

// Binds to 127.0.0.1 and turns on Host/Origin checks by default.
const app = createMcpExpressApp();

// No sessions: the factory builds a fresh server for every request.
const mcp = toNodeHandler(createMcpHandler(createServer));

// Every JSON-RPC message from the client arrives as a POST to /mcp.
app.post("/mcp", (req, res) => mcp(req, res, req.body));

app.listen(3000, () => console.error("catalog MCP server on http://localhost:3000/mcp"));
