const json = (statusCode: number, body: unknown) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  body: JSON.stringify(body),
});

export const handler = async (event: {
  httpMethod: string;
  queryStringParameters: Record<string, string | undefined>;
}) => {
  if (event.httpMethod !== "GET") {
    return json(405, { error: "Method not allowed" });
  }

  const classId = event.queryStringParameters.classId;
  if (!classId) {
    return json(400, { error: "Missing classId query parameter" });
  }

  const baseUrl = process.env.EXTERNAL_WEAPONS_API_BASE_URL;
  if (!baseUrl) {
    return json(500, { error: "Missing EXTERNAL_WEAPONS_API_BASE_URL env variable" });
  }

  const token = process.env.LOADOUT_TOKEN;
  const tokenHeader = process.env.LOADOUT_TOKEN_HEADER || "LOADOUT_TOKEN";
  const authType = process.env.LOADOUT_AUTH_TYPE || "header";
  const endpointTemplate = process.env.WEAPONS_ENDPOINT_TEMPLATE || "/classes/{classId}/weapons";
  const endpointPath = endpointTemplate.replace("{classId}", encodeURIComponent(classId));

  const requestUrl =
    authType === "query" && token
      ? `${baseUrl}${endpointPath}${endpointPath.includes("?") ? "&" : "?"}${encodeURIComponent(tokenHeader)}=${encodeURIComponent(token)}`
      : `${baseUrl}${endpointPath}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token && authType === "bearer") {
    headers.Authorization = `Bearer ${token}`;
  } else if (token && authType === "header") {
    headers[tokenHeader] = token;
  }

  try {
    const response = await fetch(requestUrl, { method: "GET", headers });
    const data = await response.json();

    if (!response.ok) {
      return json(response.status, { error: "External weapons API error", details: data });
    }

    return json(200, data);
  } catch (error) {
    return json(500, {
      error: "Failed to fetch data from external weapons API",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

