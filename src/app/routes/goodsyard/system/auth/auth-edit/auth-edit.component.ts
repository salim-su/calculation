import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CardService } from '../../../card/card.service';

@Component({
  selector: 'app-auth-edit',
  templateUrl: './auth-edit.component.html',
  styles: [],
})
export class AuthEditComponent implements OnInit {
  @Input()
  record: any;
  form: FormGroup;
  roleGroup = [];

  constructor(
    private fb: FormBuilder,
    private cardService: CardService,
    private nzModalRef: NzModalRef,
    private msgSrv: NzMessageService,
  ) {
    this.form = this.fb.group({
      id: [null],
      account: [null, [Validators.required]],
      realName: [null, [Validators.required]],
      phone: [null],
      roleId: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.record) {
      const formValue = { ...this.record };
      this.form.patchValue(formValue);
    }
    this.loadRoles();
  }


  validate(): boolean  {
    for (const key in this.form.controls) {
      if (this.form.controls.hasOwnProperty(key)) {
        const element = this.form.controls[key];
        element.markAsDirty();
        element.updateValueAndValidity();
      }
    }

    return this.form.valid;
  }

  close(): void  {
    this.nzModalRef.close();
  }
  loadRoles(): void  {
    this.cardService.roleList('').subscribe(data => {
      this.roleGroup = data;
      console.log(this.roleGroup);
    });
  }

  save(): void {
    const isValid = this.validate();
    if (!isValid) {
      return;
    }
    const data = this.form.value;
    // data.roleId = data.roleId.join(',');
    data.deptId = '1123598813738675201';

    if (this.record) {
      this.cardService.userUpdate(data).subscribe(() => {
        this.msgSrv.success('保存成功');
        this.nzModalRef.close(true);
      });
    } else {
      this.cardService.userSubmit(data).subscribe(() => {
        this.msgSrv.success('保存成功');
        this.nzModalRef.close(true);
      });
    }
  }
}
