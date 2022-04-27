import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzImageModule } from 'ng-zorro-antd/image';
import { CardManageEditComponent } from './card/card-manage/card-manage-edit/card-manage-edit.component';
import { CardManageListComponent } from './card/card-manage/card-manage-list/card-manage-list.component';
import { CardPlanEditComponent } from './card/card-plan/card-plan-edit/card-plan-edit.component';
import { CardPlanListComponent } from './card/card-plan/card-plan-list/card-plan-list.component';
import { CardReturnEditComponent } from './card/card-return/card-return-edit/card-return-edit.component';
import { CardReturnListComponent } from './card/card-return/card-return-list/card-return-list.component';
import { CarBindEditComponent } from './card/card-send/car-bind-edit/car-bind-edit.component';
import { CardSendListComponent } from './card/card-send/card-send-list/card-send-list.component';
import { GoodsyardRoutingModule } from './goodsyard-routing.module';
import { StatisticalComponent } from './statistical/statistical.component';
import { AuthEditComponent } from './system/auth/auth-edit/auth-edit.component';
import { AuthListComponent } from './system/auth/auth-list/auth-list.component';
import { LjLocationEditComponent } from './system/lj/lj-location-edit/lj-location-edit.component';
import { LjLocationListComponent } from './system/lj/lj-location-list/lj-location-list.component';
import { PlaceManageEditComponent } from './system/place/place-manage-edit/place-manage-edit.component';
import { PlaceManageListComponent } from './system/place/place-manage-list/place-manage-list.component';
import { SafetyNotifyListComponent } from './system/safety-notify-list/safety-notify-list.component';
import { CardOrderComponent } from './card/card-order/card-order.component';
import { CardOrderSendComponent } from './card/card-order/card-order-send/card-order-send.component';
import { StackLedgerListComponent } from './stack/stack-ledger-list/stack-ledger-list.component';
import { LibraryRecordListComponent } from './stack/library-record-list/library-record-list.component';
import { LibraryRecordEditComponent } from './stack/library-record-edit/library-record-edit.component';
import { CardManageDebugComponent } from './card/card-manage/card-manage-debug/card-manage-debug.component';
import { AppointmentListComponent } from './appointment/appointment-list/appointment-list.component';
import { AppointmentCheckComponent } from './appointment/appointment-check/appointment-check.component';
import { AppointmentAuditComponent } from './appointment/appointment-audit/appointment-audit.component';

const COMPONENTS = [StatisticalComponent, CardPlanListComponent, CardSendListComponent, CardReturnListComponent];
const COMPONENTS_NOROUNT = [CardPlanEditComponent];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    CarBindEditComponent,
    CardReturnEditComponent,
    PlaceManageListComponent,
    PlaceManageEditComponent,
    SafetyNotifyListComponent,
    AuthListComponent,
    AuthEditComponent,
    LjLocationListComponent,
    LjLocationEditComponent,
    CardManageListComponent,
    CardManageEditComponent,
    CardOrderComponent,
    CardOrderSendComponent,
    StackLedgerListComponent,
    LibraryRecordListComponent,
    LibraryRecordEditComponent,
    CardManageDebugComponent,
    AppointmentListComponent,
    AppointmentCheckComponent,
    AppointmentAuditComponent,
  ],
  imports: [CommonModule, GoodsyardRoutingModule, SharedModule, ComponentsModule, NzEmptyModule, NzImageModule],
})
export class GoodsyardModule {}
