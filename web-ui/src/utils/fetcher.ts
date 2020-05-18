export async function graphQLFetcher(graphQLParams: any) {
  const resp = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(graphQLParams),
  });

  const json = await resp.json();
  return json;
}
