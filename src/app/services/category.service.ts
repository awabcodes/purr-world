import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from './request-util';
import { Category } from '../models/category.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private resourceUrl = environment.theCatApiUrl + '/v1/categories';

  constructor(protected http: HttpClient) { }

  list(req?: { page?: number, limit?: number }): Observable<HttpResponse<Category[]>> {
    const options = createRequestOption(req);
    return this.http.get<Category[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
}
