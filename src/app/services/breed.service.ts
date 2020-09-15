import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from './request-util';
import { Breed } from '../models/breed.model';


@Injectable({
  providedIn: 'root'
})
export class BreedService {
  private resourceUrl = environment.theCatApiUrl + '/v1/breeds';

  constructor(protected http: HttpClient) { }

  list(req?: { attach_breed?: number, page?: number, limit?: number }): Observable<HttpResponse<Breed[]>> {
    const options = createRequestOption(req);
    return this.http.get<Breed[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  search(req?: { q: string }): Observable<HttpResponse<Breed[]>> {
    const options = createRequestOption(req);
    return this.http.get<Breed[]>(this.resourceUrl + '/search', { params: options, observe: 'response' });
  }
}
