import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CalculationService } from '../../service/calculation.service';

@Component({
  selector: 'app-charging-set-edit',
  templateUrl: './charging-set-edit.component.html',
  styles: [],
})
export class ChargingSetEditComponent implements OnInit {
  form: FormGroup;
  listOfData = [];
  editId: string | null = null;
  i = 0;

  constructor(
    private fb: FormBuilder,
    private nzMessageService: NzMessageService,
    private calculationService: CalculationService,
    private nzModalRef: NzModalRef,
  ) {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      isDefault: [null, [Validators.required]],
    });
  }

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  ngOnInit(): void {
    this.addRow();
  }

  change($event: any): any {

  }

  close(): any {

  }

  addRow(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        key: `${this.i}`,
        days: '',
        bill: ``,
      },
    ];
    this.i++;
  }

  deleteRow(key: string): void {
    console.log(key);
    this.listOfData = this.listOfData.filter((d) => d.key !== key);
  }

  save(): any {
    console.log(this.listOfData);
    const isValid = this.validate();
    if (!isValid) {
      this.nzMessageService.warning('请完善信息');
      return;
    }
    for (const aElement of this.listOfData) {
      if (!this.checkNull(aElement)) {
        this.nzMessageService.warning('请完善信息');
        return;
      }
    }
    console.log(this.form.value);
    console.log(this.listOfData);
    const postData = {
      ...this.form.value,
      children: this.listOfData,
    };

    this.calculationService.saveBillingRules(postData).subscribe(res => {
      this.nzModalRef.close(true);
    });

  }

  checkNull(params: any): any {
    const flag = true;
    for (const key in params) {
      if (params[key] !== '0' && !params[key]) {
        return false; // 终止程序
      }
    }
    return flag;
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
