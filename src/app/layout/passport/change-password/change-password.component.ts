import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { CardService } from '../../../routes/goodsyard/card/card.service';
import MD5 from 'md5';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styles: [],
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  a = false;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private nzModalRef: NzModalRef,
    // @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private router: Router,
    private cardService: CardService,
  ) {

    this.form = this.fb.group({
      oldPassword: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.required, Validators.maxLength(100)]),
      newPassword: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.required, Validators.maxLength(20), Validators.minLength(8), Validators.pattern('^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\\d)(?=.*?[!#@*&.])[a-zA-Z\\d!#@*&.]*$')]),
      newPassword1: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.required, Validators.maxLength(100)]),
    });
  }

  ngOnInit(): any {

  }

  saveAndClose(): any {
    const formValid = this.validateForm();
    if (this.form.value.newPassword1 === this.form.value.newPassword) {
      this.a = false;
    } else if (this.form.value.newPassword1 !== this.form.value.newPassword) {
      this.a = true;
      return;
    }
    if (!formValid) {
      return;
    }
    const postData = {
      ...this.form.value,
    };

    console.log(postData);

    // this.authUserService.changePassword(postData.oldPassword,postData.newPassword,postData.newPassword1).subscribe(res=>{
    //     console.log(res);
    // })

    this.cardService.changePassword(MD5(postData.oldPassword), MD5(postData.newPassword), MD5(postData.newPassword1)).subscribe(res => {
      console.log(res);
      this.message.info('密码修改成功');
      this.nzModalRef.close(true);
    }, (e) => {
      // this.message.error(e.error.msg);
    });

  }

  validateForm(): any {
    // tslint:disable-next-line:forin
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    return this.form.valid;
  }

  close(): any {
    this.nzModalRef.close();
  }
}

