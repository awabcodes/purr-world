import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private servicesEndpoint = environment.theCatApiUrl.replace('api', 'services');

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request || !request.url || (/^http/.test(request.url) &&
            !request.url.startsWith(environment.theCatApiUrl) && !request.url.startsWith(this.servicesEndpoint))) {
            return next.handle(request);
        }

        const apiKey = environment.theCatApiApiKey;
        if (!!apiKey) {
            request = request.clone({
                setHeaders: {
                    'x-api-key': apiKey
                }
            });
        }
        return next.handle(request);
    }
}