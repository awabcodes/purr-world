import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageDetailPageRoutingModule } from './image-detail-routing.module';

import { ImageDetailPage } from './image-detail.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageDetailPageRoutingModule,
    TranslateModule
  ],
  declarations: [ImageDetailPage]
})
export class ImageDetailPageModule {}
