export const dynamic = "force-static";

// Legacy search API route (search is now handled client-side via /search-index.json)
export async function GET() {
  return new Response(JSON.stringify({ results: [] }), {
    headers: { "Content-Type": "application/json" },
  });
}
