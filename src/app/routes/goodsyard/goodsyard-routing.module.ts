import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentListComponent } from './appointment/appointment-list/appointment-list.component';
import { CardManageListComponent } from './card/card-manage/card-manage-list/card-manage-list.component';
import { CardOrderComponent } from './card/card-order/card-order.component';
import { CardPlanListComponent } from './card/card-plan/card-plan-list/card-plan-list.component';
import { CardReturnListComponent } from './card/card-return/card-return-list/card-return-list.component';
import { CardSendListComponent } from './card/card-send/card-send-list/card-send-list.component';
import { LibraryRecordListComponent } from './stack/library-record-list/library-record-list.component';
import { StackLedgerListComponent } from './stack/stack-ledger-list/stack-ledger-list.component';
import { StatisticalComponent } from './statistical/statistical.component';
import { AuthListComponent } from './system/auth/auth-list/auth-list.component';
import { LjLocationListComponent } from './system/lj/lj-location-list/lj-location-list.component';
import { PlaceManageListComponent } from './system/place/place-manage-list/place-manage-list.component';
import { SafetyNotifyListComponent } from './system/safety-notify-list/safety-notify-list.component';

const routes: Routes = [
  { path: 'statistical/list', component: StatisticalComponent },
  { path: 'card-plan/list', component: CardPlanListComponent },
  { path: 'card-send/list', component: CardSendListComponent },
  { path: 'card-return/list', component: CardReturnListComponent },
  { path: 'place-manage/list', component: PlaceManageListComponent },
  { path: 'safety-notify/list', component: SafetyNotifyListComponent },
  { path: 'system-auth/list', component: AuthListComponent },
  { path: 'lj-location/list', component: LjLocationListComponent },
  { path: 'card-manage/list', component: CardManageListComponent },
  { path: 'card-order/list', component: CardOrderComponent },
  { path: 'library-record/list', component: LibraryRecordListComponent },
  { path: 'stack-ledger/list', component: StackLedgerListComponent },
  { path: 'appointment/list', component: AppointmentListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoodsyardRoutingModule {}
