import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { ChangePasswordComponent } from '../layout/passport/change-password/change-password.component';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// single pages
import { CallbackComponent } from './passport/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { RouteRoutingModule } from './routes-routing.module';

const COMPONENTS: Type<void>[] = [
  DashboardComponent,
  // passport pages
  UserLoginComponent,
  // single pages
  CallbackComponent,
  UserLockComponent,
  ChangePasswordComponent,
];
const COMPONENTS_NOROUNT: Type<void>[] = [];

@NgModule({
  imports: [CommonModule, SharedModule, RouteRoutingModule, NzBadgeModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
})
// @ts-ignore
export class RoutesModule {
}
