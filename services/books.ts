import { strapiRequest } from "./strapiRequest";

export async function fetchBookById(id: string) {
  const data = await strapiRequest(`books/${id}`, { query: "?populate=*" });
  return { id: data.data.id, ...data.data.attributes };
}

export async function fetchBooks() {
  const data = await strapiRequest("books", { query: "?populate=*" });
  return data.data || [];
}
