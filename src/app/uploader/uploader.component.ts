import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Animations } from 'src/shared/animations/uploader.animation';

@Component({
  selector: 'libs-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
  animations: [Animations.toggleFade],
})
export class UploaderComponent {
  fileSize: any;
  scale: number = 1;
  currentImgUrl: any;
  transform: any = {};
  rotation: number = 0;
  croppedImage: any = '';
  isHover: boolean = false;
  canvasRotation: number = 0;
  imageChangedEvent: any = '';
  croppingImage: boolean = false;

  @Input() icons: any;
  @Input() closeIcon: any;
  @Input() controlForm: any;
  @Input() controlName: any;
  @Input() icon: string = '';
  @Input() text: string = '';
  @Input() textSelect: string = '';
  @Input() imageQuality: number = 100;
  @Input() aspectRatio: number = 16 / 9;
  @Input() resizeToWidth: any;
  @Input() multiUpload: boolean = false;
  @Input() roundCropper: boolean = false;
  @Input() maintainAspectRatio: boolean = false;
  @Input() format: 'png' | 'jpeg' | 'bmp' | 'webp' | 'ico' = 'png';

  @Output() onDeleteFailed = new EventEmitter<any>();
  @Output() onLoadImageFailed = new EventEmitter<any>();
  @Output() onFinishedCropped = new EventEmitter<any>();

  mouseEnter() {
    this.isHover = true;
  }

  mouseLeave() {
    this.isHover = false;
  }

  public dropped(event: any) {
    event.files[0].fileEntry.file(
      (ev: any) => {
        this.fileChangeEvent({ target: { files: [ev] } });
      },
      () => console.log('Failed to load image')
    );
  }

  fileChangeEvent(event: any): void {
    let target = event.target || event.srcElement;
    this.imageChangedEvent = event;
    if (target.value.length != 0) {
      this.croppingImage = true;
    }
  }

  finishCropped() {
    if (!this.multiUpload) {
      this.controlForm.controls[this.controlName].setValue({
        file: this.croppedImage,
        loading: true,
        id: '',
        src: '',
      });
    } else {
      this.controlForm.controls[this.controlName].value.push({
        file: this.croppedImage,
        id: '',
        loading: true,
        src: '',
      });
    }

    this.onFinishedCropped.emit(
      this.controlForm.controls[this.controlName].value.length - 1
    );
    this.croppingImage = false;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    let stringLength =
      this.croppedImage.length - 'data:image/png;base64,'.length;
    let sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
    this.fileSize = Math.round(sizeInBytes / 1000);
    if (this.fileSize > 1024) {
      this.fileSize /= 1024;
      this.fileSize = this.fileSize.toFixed(2);
      this.fileSize += ' MB';
    } else {
      this.fileSize += ' KB';
    }
  }

  cropperReady(eventArgs: any) {
    if (!this.currentImgUrl) {
      this.currentImgUrl = eventArgs.currentImgUrl;
    }
    /* cropper ready */
  }

  loadImageFailed() {
    /* show message */
    this.onLoadImageFailed.emit();
  }

  clearForm() {
    this.controlForm.controls[this.controlName].reset();
  }

  clearFromList(index: number) {
    let valid = true;
    this.controlForm.controls[this.controlName].value.forEach(
      (element: any) => {
        if (element.loading) {
          valid = false;
        }
      }
    );
    if (valid) {
      this.controlForm.controls[this.controlName].value.splice(index, 1);
    } else {
      this.onDeleteFailed.emit();
    }
  }

  cancelUpload() {
    this.croppingImage = false;
  }

  handleAnimation() {
    return this.croppingImage ? 'open' : 'cose';
  }

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH,
    };
  }

  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH,
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV,
    };
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  zoomOut() {
    this.scale -= 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  zoomIn() {
    this.scale += 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  imageLoaded() {
    /* show cropper */
  }
}
