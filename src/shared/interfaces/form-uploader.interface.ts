import { required } from '@rxweb/reactive-form-validators';

export class UploaderModel {
  @required({ message: 'مقدار این فیلد اجباری می باشد' })
  image!: any;
}
