import { Component } from '@angular/core';
import { Image } from '../../models/image.model';
import { ImageService } from '../../services/the-cat-api/image.service';
import { HttpResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { CustomAlertService } from '../../services/alert/custom-alert.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  images: Image[];
  limit: number = 5;
  page: number = 0;

  constructor(
    private imageService: ImageService,
    private customAlertService: CustomAlertService
  ) {
    this.images = [];
  }

  ngOnInit() {
    this.loadAll(true);
  }

  loadAll(reset: boolean, event?: any) {
    if (reset) {
      this.images = [];
      this.page = 0;
    }

    this.imageService.list({
      page: this.page,
      limit: this.limit
    }).pipe(
      filter((res: HttpResponse<Image[]>) => res.ok),
      map((res: HttpResponse<Image[]>) => res.body)
    )
      .subscribe(
        (response: Image[]) => {
          for (let i = 0; i < response.length; i++) {
            this.images.push(response[i]);
          }

          if (typeof (event) !== 'undefined') {
            setTimeout(() => {
              event.target.complete();
            }, 750);
          }

          this.page++;
        },
        (error) => {
          console.error(error);
          this.customAlertService.showToast('FAILED_TO_LOAD');
        });
  }

  trackId(index: number, item: Image) {
    return item.id;
  }

  doInfinite(event) {
    this.loadAll(false, event);
  }
}
