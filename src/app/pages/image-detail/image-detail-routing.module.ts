import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ImageDetailPage } from './image-detail.page';
import { Image } from 'src/app/models/image.model';
import { ImageService } from 'src/app/services/the-cat-api/image.service';
import { Observable, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ImageResolve implements Resolve<Image> {
  constructor(private service: ImageService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Image> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Image>) => response.ok),
        map((response: HttpResponse<Image>) => response.body)
      );
    }
  }
}

const routes: Routes = [
  {
    path: ':id/view',
    component: ImageDetailPage,
    resolve: {
      data: ImageResolve
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageDetailPageRoutingModule { }
