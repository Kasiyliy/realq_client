import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Categories} from '../../models/categories';
import {environment} from '../../../environments/environment.prod';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private add = 'api/categories';
  private all = 'api/categories';


  constructor(private http: HttpClient) {

  }

  public save(category: Categories) {
    return this.http.post<Categories>(environment.apiUrl + this.add, category);
  }

  public getAll(): Observable<Categories[]> {
    return this.http.get<Categories[]>(environment.apiUrl + this.all);
  }

  public getById(id: number): Observable<Categories> {
    return this.http.get<Categories>(environment.apiUrl + this.all + `/${id}`);
  }

  public delete(category: Categories) {
    return this.http.delete(environment.apiUrl + `api/categories/${category.id}`);
  }

  public update(category: Categories) {
    return this.http.put(environment.apiUrl + `api/categories/${category.id}`, category);
  }
}
