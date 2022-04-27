import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';
import { AlainThemeModule } from '@delon/theme';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { MapPanelDirective } from './map-panel/map-panel.directive';
import { DefNumPipe } from './pipes/def-num.pipe';
import { KgTransformTon } from './pipes/kg-to-ton';
import { SHARED_DELON_MODULES } from './shared-delon.module';
import { SHARED_ZORRO_MODULES } from './shared-zorro.module';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
// #region third libs

const THIRDMODULES: Type<any>[] = [];

// #endregion

// #region your componets & directives

const COMPONENTS: Type<any>[] = [KgTransformTon, DefNumPipe];
const DIRECTIVES: Type<any>[] = [MapPanelDirective];

// #endregion

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AlainThemeModule.forChild(),
    DelonACLModule,
    DelonFormModule,
    NzResultModule,
    NzModalModule,
    NzIconModule,
    NzCalendarModule,
    NzTimelineModule,
    NzEmptyModule,
    NzDrawerModule,
    ...SHARED_DELON_MODULES,
    ...SHARED_ZORRO_MODULES,
    // third libs
    ...THIRDMODULES,
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlainThemeModule,
    DelonACLModule,
    DelonFormModule,
    NzResultModule,
    NzModalModule,
    NzIconModule,
    NzCalendarModule,
    NzTimelineModule,
    ...SHARED_DELON_MODULES,
    ...SHARED_ZORRO_MODULES,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
})
export class SharedModule {}
