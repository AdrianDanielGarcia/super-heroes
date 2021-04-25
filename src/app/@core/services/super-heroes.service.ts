import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISuperHero, ISuperHeroesResponse } from '@models/super-hero.model';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperHeroesService {

  private baseAPI = `${environment.BASE_API}/super-heroes` ;

  constructor(
    private httpClient: HttpClient
  ) { }

  public getList(filter: string = '', pageNumber: number = 1, pageLength: number = 5): Observable<ISuperHeroesResponse> {

    let params = new HttpParams();

    if (filter.length > 0) {
      params = params.set('filter', filter);
    }

    if (pageNumber > 0) {
      params = params.set('pageNumber', String(pageNumber));
      params = params.set('pageLength', String(pageLength));
    }
    return this.httpClient.get<ISuperHeroesResponse>(this.baseAPI, { params: params });
  }

  public getOne(id: number): Observable<ISuperHero> {
    let params = new HttpParams();
    params = params.set('id', id.toString());
    return this.httpClient.get<ISuperHero>(this.baseAPI, { params: params });
  }

  public delete(hero: ISuperHero): Observable<void> {
    let params = new HttpParams();
    params = params.set('id', hero.id.toString());
    return this.httpClient.delete<void>(this.baseAPI, { params: params });
  }

  public update(hero: ISuperHero): Observable<void> {
    return this.httpClient.put<void>(this.baseAPI, hero);
  }

  public add(hero: ISuperHero): Observable<ISuperHero> {
    return this.httpClient.post<ISuperHero>(this.baseAPI, hero);
  }
}
