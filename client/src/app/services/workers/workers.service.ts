import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Workers} from '../../models/workers';

@Injectable({
  providedIn: 'root'
})
export class WorkersService {

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Workers[]> {
    return this.http.get<Workers[]>(environment.apiUrl + 'api/workers');
  }

  public getById(id: number): Observable<Workers> {
    return this.http.get<Workers>(environment.apiUrl + 'api/workers' + `/${id}`);
  }

  public save(worker: Workers) {
    return this.http.post<Workers>(environment.apiUrl + 'api/workers', worker);
  }

  public delete(worker: Workers) {
    return this.http.delete(environment.apiUrl + `api/workers/${worker.id}`);
  }

  public update(worker: Workers) {
    return this.http.put(environment.apiUrl + `api/workers/${worker.id}`, worker);
  }
}
