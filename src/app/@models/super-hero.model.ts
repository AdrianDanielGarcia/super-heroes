export interface ISuperHero {
  id: number;
  name: string;
  franchise: string;
  authors: string;
}

export interface ISuperHeroesResponse {
  totalCount: number;
  pageNumber: number;
  pageLength: number;
  response: ISuperHero[];
}
