import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InlineSVGModule } from 'ng-inline-svg-2';
import { ImageCropperModule } from 'ngx-image-cropper';

import { UploaderComponent } from './uploader.component';

@NgModule({
  declarations: [UploaderComponent],
  imports: [CommonModule, ImageCropperModule, InlineSVGModule.forRoot()],
  exports: [UploaderComponent],
})
export class UploaderModule {}
