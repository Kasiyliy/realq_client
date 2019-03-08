import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tasks} from '../../models/tasks';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(environment.apiUrl + 'api/tasks');
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
