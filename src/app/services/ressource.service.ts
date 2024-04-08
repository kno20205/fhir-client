// resource.service.ts
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ResourceService<T> {
  constructor(
    private http: HttpClient,
    @Inject('resourceUrl') private resourceUrl: string
  ) {}

  getAll(): Observable<T[]> {
    return this.http
      .get<T[]>(this.resourceUrl)
      .pipe(catchError(this.handleError('getAll', [])));
  }

  get(id: string): Observable<T> {
    return this.http
      .get<T>(`${this.resourceUrl}/${id}`)
      .pipe(catchError(this.handleError('get', {} as T)));
  }

  delete(id: string): Observable<{}> {
    return this.http
      .delete(`${this.resourceUrl}/${id}`)
      .pipe(catchError(this.handleError('delete', {})));
  }

  add(item: T): Observable<T> {
    return this.http
      .post<T>(this.resourceUrl, item)
      .pipe(catchError(this.handleError('add', item)));
  }

  update(item: T): Observable<T> {
    return this.http
      .put<T>(`${this.resourceUrl}/${(item as any).id}`, item)
      .pipe(catchError(this.handleError('update', item)));
  }

  addOne(resource: T): Observable<T> {
    return this.http
      .post<T>(`${this.resourceUrl}`, resource)
      .pipe(catchError(this.handleError('addOne', resource)));
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
