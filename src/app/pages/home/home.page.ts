import { Component, OnInit } from '@angular/core';
import { Image } from '../../models/image.model';
import { ImageService } from '../../services/the-cat-api/image.service';
import { HttpResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { CustomAlertService } from '../../services/alert/custom-alert.service';
import { NavController } from '@ionic/angular';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  images: Image[];
  limit = 5;
  page = 0;

  constructor(
    private imageService: ImageService,
    private customAlertService: CustomAlertService,
    private navController: NavController
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

    this.imageService
      .list({
        page: this.page,
        limit: this.limit,
      })
      .pipe(
        filter((res: HttpResponse<Image[]>) => res.ok),
        map((res: HttpResponse<Image[]>) => res.body)
      )
      .subscribe(
        (response: Image[]) => {
          for (const image of response) {
            this.images.push(image);
          }

          if (typeof event !== 'undefined') {
            setTimeout(() => {
              event.target.complete();
            }, 750);
          }

          this.page++;
        },
        (error) => {
          console.error(error);
          this.customAlertService.showToast('failedToLoad');
        }
      );
  }

  trackId(index: number, item: Image) {
    return item.id;
  }

  doInfinite(event) {
    this.loadAll(false, event);
  }

  view(image: Image) {
    this.navController.navigateForward(
      '/home/image-detail/' + image.id + '/view'
    );
  }

  async save(image: Image) {
    try {
      const fileName = image.url.substring(image.url.lastIndexOf('/') + 1);
      const result = await Filesystem.writeFile({
        path: fileName,
        data: image.url,
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });
      console.log('file Downloaded', result);
    } catch (e) {
      console.error('Unable to write file', e);
    }
  }

  async share(image: Image) {
    const shareRet = await Share.share({
      title: 'Purr World',
      text: 'Awesome cat you need to see right meow',
      url: image.url,
      dialogTitle: 'Share with buddies',
    });
  }
}
