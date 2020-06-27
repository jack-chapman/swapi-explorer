export interface PaginatedClient {
  baseUrl: string;
  page: number;
  totalPages: number | undefined;
  cache?: Map<string, any>
  get(page?: number): Promise<any>
  nextPage(): Promise<any>
  prevPage(): Promise<any>
}