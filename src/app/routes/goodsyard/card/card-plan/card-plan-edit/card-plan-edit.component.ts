import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CardService } from '../../card.service';

@Component({
  selector: 'app-card-plan-edit',
  templateUrl: './card-plan-edit.component.html',
  styles: [],
})
export class CardPlanEditComponent implements OnInit {
  @Input()
  record;
  form: FormGroup;
  fieldList = [];
  stackList = [];
  chooseFiled: any;
  flag = false;
  constructor(private fb: FormBuilder, private cardService: CardService, private modal: NzModalRef, private msgSrv: NzMessageService) {
    this.form = this.fb.group({
      id: [null],
      fieldId: [null],
      commodityPaper: [null, [Validators.required]],
      remark: [null],
      planNo: [null, [Validators.required]],
      shipName: [null, [Validators.required]],
      stackId: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.record) {
      this.form.patchValue(this.record);
      this.form.get('commodityPaper').disable({ onlySelf: true });
      this.form.get('planNo').disable({ onlySelf: true });
      this.form.get('shipName').disable({ onlySelf: true });
      this.getStackList(this.record?.fieldId);
    }
    this.getFieldList();
  }

  getFieldList(): void {
    this.cardService.fieldList().subscribe((res) => {
      console.log(res);
      this.fieldList = res;
    });
  }

  getStackList(fieldId: any): void {
    const params = {
      fieldId,
    };

    this.cardService.stackList(params).subscribe((res) => {
      if (this.form.value.stackId) {
        res.forEach((i) => {
          if (i.id === this.form.value.stackId) {
            i.selected = true;
          }
        });
      }
      this.stackList = res;
    });
  }

  chooseFiledChange($event: any): void {
    this.form.patchValue({
      stackId: null,
    });
    this.getStackList($event);
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

    this.cardService.planSubmit(postData).subscribe((res) => {
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

  onClickMap($event: any): void {
    this.form.patchValue({
      stackId: $event.id,
    });
    this.chooseStack($event.id);
  }

  chooseStack(e: any): void {
    this.stackList.forEach((v) => {
      if (v.id === e) {
        v.selected = true;
      } else {
        v.selected = false;
      }
    });
    this.stackList = [].concat(this.stackList);
  }
}
