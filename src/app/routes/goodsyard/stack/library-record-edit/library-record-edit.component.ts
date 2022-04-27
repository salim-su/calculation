import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CardService } from '../../card/card.service';

@Component({
  selector: 'app-library-record-edit',
  templateUrl: './library-record-edit.component.html',
  styles: [],
})
export class LibraryRecordEditComponent implements OnInit {
  @Input()
  record;
  stackList = [];
  form: FormGroup;
  typeList = [
    { key: 'IN', value: '入库' },
    { key: 'OUT', value: '出库' },
  ];

  constructor(
    private modalService: NzModalService,
    private cardService: CardService,
    private fb: FormBuilder,
    private msgSrv: NzMessageService,
    private modal: NzModalRef,
  ) {
    this.form = this.fb.group({
      id: [null],
      type: [null, [Validators.required]],
      stackId: [null, [Validators.required]],
      time: [null, [Validators.required]],
      tonnage: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.cardService.stackList('').subscribe((res) => {
      console.log(res);
      this.stackList = res;
    });

    // this.form.setControl('type')
    // this.form.setControl('type').disable()
    if (this.record) {
      console.log(this.record);
      this.form.patchValue(this.record);
      this.form.get('type').disable();
    }
  }

  save(): void {
    const isValid = this.validate();
    if (!isValid) {
      this.msgSrv.warning('请完善信息');
      return;
    }
    let postData;
    if (this.record) {
      postData = {
        ...this.form.value,
        type: this.record?.type,
        time: moment(this.form.value.time).format('YYYY-MM-DD hh:mm:ss'),
      };
    } else {
      postData = {
        ...this.form.value,
        time: moment(this.form.value.time).format('YYYY-MM-DD hh:mm:ss'),
      };
    }

    this.cardService.stackRecordSubmit(postData).subscribe((res) => {
      console.log(res);
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
