import { OnInit, Component } from '@angular/core';
import { RxFormGroup } from '@rxweb/reactive-form-validators';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { UploaderModel } from 'src/shared/interfaces/form-uploader.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'custom-uploader';
  form!: RxFormGroup;
  icons: any = {
    rotate: 'assets/icons/uploader/rotate.svg',
    flip: 'assets/icons/uploader/flip.svg',
    zoomIn: 'assets/icons/uploader/zoom-in.svg',
    zoomOut: 'assets/icons/uploader/zoom-out.svg',
    reset: 'assets/icons/uploader/reset.svg',
  };

  constructor(private _fb: RxFormBuilder) {}

  ngOnInit(): void {
    this.initialForm();
  }

  initialForm() {
    let form: UploaderModel = new UploaderModel();
    this.form = <RxFormGroup>this._fb.formGroup(form);
  }
  onDeleteFailed() {
    alert('لطفا منتظر بمانید آپلود ها به پایان برسند');
  }

  onUpload(index: any = null) {
    setTimeout(() => {
      if (index >= 0) {
        this.form.controls['image'].value[index].loading = false;
      } else {
        this.form.controls['image'].value.loading = false;
      }
    }, 3000);
  }

  uploadIMG() {
    console.log(this.form);
  }
}
