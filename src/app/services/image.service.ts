import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from './request-util';
import { Image } from '../models/image.model';
import { ImageAnalysis } from '../models/image-analysis.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private resourceUrl = environment.theCatApiUrl + '/v1/images';

  constructor(protected http: HttpClient) { }

  list(req?: { size?: string, mime_types?: string[], order?: string, format?: string, breed_id?: string, category_ids?: number[], page?: number, limit?: number }): Observable<HttpResponse<Image[]>> {
    const options = createRequestOption(req);
    return this.http.get<Image[]>(this.resourceUrl + '/search', { params: options, observe: 'response' });
  }

  listUploaded(req?: { sub_id?: string, original_filename?: string, order?: string, format?: string, breed_ids?: string[], category_ids?: number[], page?: number, limit?: number, include_vote?: number, include_favourite?: number }): Observable<HttpResponse<Image[]>> {
    const options = createRequestOption(req);
    return this.http.get<Image[]>(this.resourceUrl + '/upload', { params: options, observe: 'response' });
  }

  upload(image: { file: any, sub_id: string }): Observable<HttpResponse<any[]>> {
    return this.http.post<any[]>(this.resourceUrl + '/upload', image, { observe: 'response' });
  }

  find(id: string): Observable<HttpResponse<Image>> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{ message: string }>> {
    return this.http.delete<{ message: string }>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  analysis(id: string): Observable<HttpResponse<ImageAnalysis>> {
    return this.http.get(`${this.resourceUrl}/${id}/analysis`, { observe: 'response' });
  }

}
