import { serveStdio } from "@modelcontextprotocol/server/stdio";
import { createServer } from "./server.js";

// The host starts this process and talks to it over stdin/stdout.
serveStdio(createServer);

// stdout belongs to the protocol. Log to stderr only!
console.error("catalog MCP server running on stdio");
