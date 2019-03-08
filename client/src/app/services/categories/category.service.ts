import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Categories} from '../../models/categories';
import {environment} from '../../../environments/environment.prod';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private http: HttpClient) {

  }

  public save(category: Categories) {
    return this.http.post<Categories>(environment.apiUrl + 'api/categories', category);
  }

  public getAll(): Observable<Categories[]> {
    return this.http.get<Categories[]>(environment.apiUrl + 'api/categories');
  }

  public getById(id: number): Observable<Categories> {
    return this.http.get<Categories>(environment.apiUrl + `api/categories/${id}`);
  }

  public delete(category: Categories) {
    return this.http.delete(environment.apiUrl + `api/categories/${category.id}`);
  }

  public update(category: Categories) {
    return this.http.put(environment.apiUrl + `api/categories/${category.id}`, category);
  }
}
