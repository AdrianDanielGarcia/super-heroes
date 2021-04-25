import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpClient,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SuperHeroesMockArray } from '@app/@mocks/super-heroes.mock';

@Injectable()
export class SuperHeroesMockHttpInterceptor implements HttpInterceptor {

  constructor(
    private superHeroMock: SuperHeroesMockArray
  ) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.handleRequests(req, next);
  }

  private handleRequests(req: HttpRequest<any>, next: HttpHandler): any {
    const { url, method, params } = req;
    if (url.startsWith('https://super-herores.api')) {

      if (method === 'GET') {
        // url params:  id, pageNumber, pageLength, filter

        // no params, get all super heroes
        if (params.keys().length === 0) {
          return of(new HttpResponse({ status: 200, body: this.superHeroMock.getAll() })).pipe(delay(500));
        }

        // check if ask for an id (one hero)
        if (params.has('id')) {
          // TODO: check id if number
          const id = Number(params.get('id'));
          const data = this.superHeroMock.getOne(id);
          return of(new HttpResponse({ status: 200, body: data })).pipe(delay(500));
        }

        if (params.has('filter')) {
          const filter = params.get('filter');
          if (params.has('pageNumber')) {
            // TODO: check numbers & values
            const pageNumber = Number(params.get('pageNumber'));
            const pageLength = Number(params.get('pageLength'));
            return of(new HttpResponse({ status: 200, body: this.superHeroMock.getFilteredPage(filter, pageNumber, pageLength ) })).pipe(delay(500));
          } else {
            return of(new HttpResponse({ status: 200, body: this.superHeroMock.getFlitered(filter) })).pipe(delay(500));
          }
        } else {
          // TODO: check numbers & values
          const pageNumber = Number(params.get('pageNumber'));
          const pageLength = Number(params.get('pageLength'));
          return of(new HttpResponse({ status: 200, body: this.superHeroMock.getPage(pageNumber, pageLength ) })).pipe(delay(500));
        }

      }

      if (method === 'DELETE') {
        const id = Number(params.get('id'));
        const data = this.superHeroMock.delete(id);
        return of(new HttpResponse({ status: 200, body: data })).pipe(delay(500));;
      }

      if (method === 'PUT') {
        const { body } = req.clone();
        return of(new HttpResponse({ status: 200, body: this.superHeroMock.update(body) })).pipe(delay(500));
      }

      if (method === 'POST') {
        const { body } = req.clone();
        return of(new HttpResponse({ status: 200, body: this.superHeroMock.add(body) })).pipe(delay(500));
      }
    }
    // if there is not any matches return default request.
    return next.handle(req);
  }

}

export const SuperHeroesMockProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: SuperHeroesMockHttpInterceptor,
  multi: true,
};
