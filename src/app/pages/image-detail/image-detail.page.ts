import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/models/image.model';
import { ActivatedRoute } from '@angular/router';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.page.html',
  styleUrls: ['./image-detail.page.scss'],
})
export class ImageDetailPage implements OnInit {
  image: Image;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((response) => {
      this.image = response.data;
    });
  }

  async save() {
    try {
      const fileName = this.image.url.substring(
        this.image.url.lastIndexOf('/') + 1
      );
      const result = await Filesystem.writeFile({
        path: fileName,
        data: this.image.url,
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });
      console.log('file Downloaded', result);
    } catch (e) {
      console.error('Unable to write file', e);
    }
  }

  async share() {
    const shareRet = await Share.share({
      title: 'Purr World',
      text: 'Awesome cat you need to see right meow',
      url: this.image.url,
      dialogTitle: 'Share with buddies',
    });
  }
}
