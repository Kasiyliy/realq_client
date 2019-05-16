import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  fullUrl = environment.apiUrl + 'api/images';

  constructor(private http: HttpClient) {
  }

  public save(testData: FormData) {
    return this.http.post(this.fullUrl + '/upload', testData);
  }

}
