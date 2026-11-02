import { McpServer } from "@modelcontextprotocol/server";
import * as z from "zod/v4";
import { getProduct, listProducts, searchProducts } from "./catalog.js";

// Turn any value into the text content an MCP tool returns.
const asText = (value: unknown) => ({
  content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }],
});

// A factory that builds the server. The transport (stdio or HTTP) is chosen elsewhere.
export function createServer(): McpServer {
  const server = new McpServer({ name: "catalog", version: "1.0.0" });

  server.registerTool(
    "list_products",
    {
      title: "List products",
      // The description is written for the model, not for a human developer.
      description: "List products in the catalog. Optionally filter by category (accessories, displays, audio).",
      inputSchema: z.object({ category: z.string().optional().describe("Category to filter by") }),
    },
    async ({ category }) => asText(await listProducts(category)),
  );

  server.registerTool(
    "get_product",
    {
      title: "Get product",
      description: "Get one product by its id, for example p-100.",
      inputSchema: z.object({ id: z.string().describe("Product id") }),
    },
    async ({ id }) => {
      const product = await getProduct(id);
      if (!product) {
        // isError tells the model the call failed, so it can try something else.
        return { ...asText(`No product with id ${id}`), isError: true };
      }
      return asText(product);
    },
  );

  server.registerTool(
    "search_products",
    {
      title: "Search products",
      description: "Search products by name. Use maxPrice to stay within a budget.",
      inputSchema: z.object({
        query: z.string().describe("Text to search for in the product name"),
        maxPrice: z.number().optional().describe("Maximum price in USD"),
      }),
    },
    async ({ query, maxPrice }) => asText(await searchProducts(query, maxPrice)),
  );

  return server;
}
