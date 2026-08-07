import { EES_DATA_MOON } from "./ees-config.js";

const api = EES_DATA_MOON.apiBaseUrl.replace(/\/$/, "");

async function request(path, options) {
  const response = await fetch(`${api}${path}`, options);
  if (!response.ok) {
    let message = `Data Moon returned HTTP ${response.status}`;
    try {
      const body = await response.json();
      message = body.detail || message;
    } catch {}
    throw new Error(message);
  }
  return response.json();
}

export const dataMoonHealth = () => request("/api/health");

export async function choosePharmaSchema() {
  const { schemas = [] } = await request("/api/catalog/schemas");
  const candidates = [EES_DATA_MOON.preferredSchema, ...EES_DATA_MOON.fallbackSchemas];
  return candidates.find(name => schemas.includes(name))
    ?? schemas.find(name => /pharma/i.test(name))
    ?? null;
}

export async function loadLiveCatalog(schema) {
  const { tables = [] } = await request(
    `/api/catalog/schemas/${encodeURIComponent(schema)}/tables`
  );
  const detailed = await Promise.all(
    tables.map(async table => {
      const [columnPayload, countPayload] = await Promise.all([
        request(`/api/catalog/${encodeURIComponent(schema)}/${encodeURIComponent(table.name)}/columns`)
          .catch(() => ({ columns: [] })),
        request(`/api/catalog/${encodeURIComponent(schema)}/${encodeURIComponent(table.name)}/count`)
          .catch(() => ({ row_count: null }))
      ]);
      return {
        name: table.name,
        type: table.type,
        columns: columnPayload.columns ?? [],
        rowCount: countPayload.row_count
      };
    })
  );
  return { schema, tables: detailed };
}

export const sampleTable = (schema, table, limit = 10) =>
  request(`/api/catalog/${encodeURIComponent(schema)}/${encodeURIComponent(table)}/sample?limit=${limit}`);

export const runReadOnlySql = (sql, limit = 250) =>
  request("/api/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sql, limit })
  });
