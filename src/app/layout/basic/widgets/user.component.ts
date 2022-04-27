import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { SettingsService, User } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ChangePasswordComponent } from '../../passport/change-password/change-password.component';

@Component({
  selector: 'header-user',
  template: `
    <div class="alain-default__nav-item d-flex align-items-center px-sm justify-content-center" nz-dropdown nzPlacement="bottomRight" [nzDropdownMenu]="userMenu">
      <nz-avatar [nzSrc]="'./assets/img/default-avatar.png'" nzSize="small"></nz-avatar>
<!--      {{ user.name }}-->
    </div>
    <nz-dropdown-menu #userMenu="nzDropdownMenu">
      <div nz-menu class="width-sm">
<!--        <div nz-menu-item routerLink="/pro/account/center">-->
<!--          <i nz-icon nzType="user" class="mr-sm"></i>-->
<!--          个人中心-->
<!--        </div>-->
<!--        <div nz-menu-item routerLink="/pro/account/settings">-->
<!--          <i nz-icon nzType="setting" class="mr-sm"></i>-->
<!--          个人设置-->
<!--        </div>-->
<!--        <div nz-menu-item routerLink="/exception/trigger">-->
<!--          <i nz-icon nzType="close-circle" class="mr-sm"></i>-->
<!--          触发错误-->
<!--        </div>-->
<!--        <li nz-menu-divider></li>-->
        <div nz-menu-item (click)='changePassword()'>
          <i nz-icon nzType='unlock' class='mr-sm'></i>
          修改密码
        </div>
        <div nz-menu-item (click)="logout()">
          <i nz-icon nzType="logout" class="mr-sm"></i>
          退出登录
        </div>
      </div>
    </nz-dropdown-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderUserComponent {
  get user(): User {
    return this.settings.user;
  }

  constructor(private modalService: NzModalService,private settings: SettingsService, private router: Router, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {}

  logout(): void {
    this.tokenService.clear();
    this.router.navigateByUrl(this.tokenService.login_url!);
  }
  changePassword() {
    this.modalService.create({
      nzContent: ChangePasswordComponent,
      nzTitle: '修改密码',
      nzFooter: null,
      nzWrapClassName: 'dasModal',
      nzBodyStyle: { height: '350px', overflow: 'auto', paddingBottom: '48px' },
    }).afterClose.subscribe((res) => {
      if (res) {
        this.tokenService.clear();
        this.router.navigateByUrl(this.tokenService.login_url);
      }
    });

  }
}
