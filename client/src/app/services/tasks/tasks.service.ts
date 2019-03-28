import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tasks} from '../../models/tasks';
import {environment} from '../../../environments/environment';
import {stringify} from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(environment.apiUrl + 'api/tasks');
  }

  public getAllNullCompleted(): Observable<any> {
    return this.http.get<Tasks[]>(environment.apiUrl + 'api/tasks/all');
  }

  public getAllAscWithLimitSix(): Observable<Tasks[]> {
    let params = new HttpParams();
    params = params.append('desc', 'false');
    params = params.append('count', '6');
    return this.http.get<Tasks[]>(environment.apiUrl + 'api/tasks', {params});
  }

  public getAllWithoutDesc(): Observable<Tasks[]> {
    let params = new HttpParams();
    params = params.append('desc', 'false');
    return this.http.get<Tasks[]>(environment.apiUrl + 'api/tasks', {params});
  }

  public getAllAscWithLimitAndWithoutIDs(desc: boolean, count: number, ids: number[]): Observable<Tasks[]> {
    let params = new HttpParams();
    params = params.append('desc', stringify(desc));
    params = params.append('count', stringify(count));
    for (const id of ids) {
      params = params.append('ids', stringify(id));
    }
    return this.http.get<Tasks[]>(environment.apiUrl + 'api/tasks', {params});
  }

  public getById(id: number): Observable<Tasks> {
    return this.http.get<Tasks>(environment.apiUrl + `api/tasks/${id}`);
  }

  public save(job: Tasks) {
    return this.http.post<Tasks>(environment.apiUrl + 'api/tasks', job);
  }

  public delete(job: Tasks) {
    return this.http.delete(environment.apiUrl + `api/tasks/${job.id}`);
  }

  public update(job: Tasks) {
    return this.http.put(environment.apiUrl + `api/tasks/${job.id}`, job);
  }
}
