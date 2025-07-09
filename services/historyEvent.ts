// frontend/services/historyEvent.ts
import { strapiRequest } from "./strapiRequest";

export async function fetchHistoryEvents() {
  const data = await strapiRequest("history-events", { query: "?populate=*" });
  return data.data || [];
}
