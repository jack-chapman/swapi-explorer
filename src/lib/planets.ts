import { PaginatedClient } from './IPaginatedClient';

interface BasePlanetsResponse {
  count: number;
  next: string;
  previous?: any;
  results: Planet[];
}

export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface PlanetResponse {
  results: Planet[];
  page: number;
  count: number;
}

export class Planets implements PaginatedClient {
  baseUrl = 'https://swapi.dev/api/planets';
  page = 1;
  totalPages = 1;

  cache = new Map<string, PlanetResponse>();

  public async get(): Promise<PlanetResponse> {
    const url = `${this.baseUrl}/?page=${this.page}`;
    const cachedResponse = this.cache.get(url);
    if (cachedResponse) {
      return cachedResponse;
    } else {
      const response: BasePlanetsResponse = await fetch(url).then((res) =>
        res.json()
      );
      this.totalPages = Math.floor(response.count / 10);
      const res = this.buildResponse(response);
      this.cache.set(url, res);
      return res;
    }
  }

  public async nextPage(): Promise<PlanetResponse> {
    this.page =
      this.page + 1 >= this.totalPages ? this.totalPages : this.page + 1;
    return this.get();
  }

  public async prevPage(): Promise<PlanetResponse> {
    this.page = this.page - 1 < 1 ? 1 : this.page - 1;
    return this.get();
  }

  private buildResponse(res: BasePlanetsResponse): PlanetResponse {
    return {
      results: res.results,
      page: this.page,
      count: this.totalPages,
    };
  }
}
