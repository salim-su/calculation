import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CardService } from '../../card.service';

@Component({
  selector: 'app-car-bind-edit',
  templateUrl: './car-bind-edit.component.html',
  styles: [],
})
export class CarBindEditComponent implements OnInit {
  @Input()
  record;
  form: FormGroup;

  dataList = [];
  pageInfo = {
    pi: 1,
    ps: 10,
    total: 0,
    loading: false,
  };

  constructor(
    private modalService: NzModalService,
    private cardService: CardService,
    private fb: FormBuilder,
    private msgSrv: NzMessageService,
  ) {
    this.form = this.fb.group({
      cardNo: [null, [Validators.required]],
      licenseNumber: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    console.log(this.record);
    this.load();
  }

  load(): void {
    const params = {
      planId: this.record?.id,
    };
    // const formData = new FormData();
    // formData.append('planId', this.record?.id);
    this.pageInfo.loading = true;
    this.cardService.truckListByPlanId(params).subscribe((res) => {
      console.log(res);
      this.dataList = res;
      this.pageInfo.loading = false;
    });
  }

  add(): any {
    const isValid = this.validate();
    if (!isValid) {
      this.msgSrv.warning('请完善信息');
      return;
    }
    const postData = {
      ...this.form.value,
      planId: this.record?.id,
    };
    // this.form.clearValidators();
    // this.form.setValidators(null);


    // this.form.
    this.cardService.truckIssueCard(postData).subscribe(res => {
      this.form.setValue(
        {
          cardNo: '',
          licenseNumber: '',
        },
      );
      this.form.reset();
      this.load();
    });
  }

  remove(data: any) {
    this.cardService.removePlanTruck(data?.id).subscribe(res => {
      this.load();
    });
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
