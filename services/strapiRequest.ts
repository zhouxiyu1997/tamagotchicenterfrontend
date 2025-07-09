// frontend/services/strapiRequest.ts

const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

interface StrapiRequestOptions extends RequestInit {
  // 你可以扩展更多自定义参数
  query?: string; // 例如 "?populate=*" 等
}

export async function strapiRequest(
  endpoint: string,
  options: StrapiRequestOptions = {}
) {
  const url = `${API_URL}/api/${endpoint}${options.query || ""}`;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {}),
    ...options.headers,
  };

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    throw new Error(`Strapi API error: ${res.status} ${res.statusText}`);
  }

  // 解析数据
  const data = await res.json();
  console.log("Strapi 返回的数据内容：", data); // 这里打印实际数据内容

  return data;
}
