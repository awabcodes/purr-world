/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from './request-util';
import { Vote } from '../../models/vote.model';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  private resourceUrl = environment.theCatApiUrl + '/v1/votes';

  constructor(protected http: HttpClient) {}

  list(req?: {
    sub_id?: string;
    page?: number;
    limit?: number;
  }): Observable<HttpResponse<Vote[]>> {
    const options = createRequestOption(req);
    return this.http.get<Vote[]>(this.resourceUrl, {
      params: options,
      observe: 'response',
    });
  }

  create(
    vote: Vote
  ): Observable<HttpResponse<{ message: string; id: number }>> {
    return this.http.post<{ message: string; id: number }>(
      this.resourceUrl,
      vote,
      { observe: 'response' }
    );
  }

  find(id: string): Observable<HttpResponse<Vote>> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{ message: string }>> {
    return this.http.delete<{ message: string }>(`${this.resourceUrl}/${id}`, {
      observe: 'response',
    });
  }
}
