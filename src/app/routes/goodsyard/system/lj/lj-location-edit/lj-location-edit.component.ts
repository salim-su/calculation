import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CardService } from '../../../card/card.service';

@Component({
  selector: 'app-lj-location-edit',
  templateUrl: './lj-location-edit.component.html',
  styles: [],
})
export class LjLocationEditComponent implements OnInit {
  @Input()
  record;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cardService: CardService,
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
  ) {
    this.form = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      cardNo: [null, [Validators.required]],
      remark: [null],
    });
  }

  ngOnInit(): void {
    if (this.record) {
      this.form.patchValue(this.record);
    }
  }

  save(): any {
    const isValid = this.validate();
    if (!isValid) {
      this.msgSrv.warning('请完善信息');
      return;
    }

    const postData = {
      ...this.form.value,
    };
    console.log(postData);
    this.cardService.mobileMachinerySubmit(postData).subscribe(res => {
      this.close(true);
    });
  }

  close(fg?: boolean): void {
    this.modal.close(fg);
  }

  validate(): any {
    for (const key in this.form.controls) {
      if (this.form.controls.hasOwnProperty(key)) {
        const element = this.form.controls[key];
        element.markAsDirty();
        element.updateValueAndValidity();
      }
    }
    return this.form.valid;
  }

}
