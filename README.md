# catalog MCP server

A small MCP server for a product catalog. Same tools, two transports.

```bash
npm install
npm run stdio     # stdio transport (spawned by a host)
npm run inspect   # MCP Inspector on the stdio server (protocol 2026-07-28)
npm run http      # Streamable HTTP on http://localhost:3000/mcp
```

Tools: `list_products`, `get_product`, `search_products`.
Built with the MCP TypeScript SDK v2 (`@modelcontextprotocol/server` 2.4, protocol `2026-07-28`).
