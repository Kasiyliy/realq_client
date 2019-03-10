import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Jobs} from '../../models/jobs';
import {Categories} from '../../models/categories';

@Injectable({
  providedIn: 'root'
})
export class JobService {


  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Jobs[]> {
    return this.http.get<Jobs[]>(environment.apiUrl + 'api/jobs');
  }

  public getAllBy(category: Categories): Observable<Jobs[]> {
    return this.http.get<Jobs[]>(environment.apiUrl + 'api/jobs', {params: { categoryId : `${category.id}`}});
  }

  public getById(id: number): Observable<Jobs> {
    return this.http.get<Jobs>(environment.apiUrl + `api/jobs/${id}`);
  }

  public save(job: Jobs) {
    return this.http.post<Jobs>(environment.apiUrl + 'api/jobs', job);
  }

  public delete(job: Jobs) {
    return this.http.delete(environment.apiUrl + `api/jobs/${job.id}`);
  }

  public update(job: Jobs) {
    return this.http.put(environment.apiUrl + `api/jobs/${job.id}`, job);
  }
}
