import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule, SharedModule } from '@shared';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzImageModule } from 'ng-zorro-antd/image';

import { CalculationRoutingModule } from './calculation-routing.module';
import { StowageListComponent } from './stowage/stowage-list/stowage-list.component';
import { StowageEditComponent } from './stowage/stowage-edit/stowage-edit.component';
import { InFormsListComponent } from './checked-forms/in-forms/in-forms-list/in-forms-list.component';
import {
  InventoryFormsListComponent,
} from './checked-forms/inventory-forms/inventory-forms-list/inventory-forms-list.component';
import { OutFormsListComponent } from './checked-forms/out-forms/out-forms-list/out-forms-list.component';
import { StowageTemplateComponent } from './stowage/stowage-template/stowage-template.component';
import { StowageDetailComponent } from './stowage/stowage-detail/stowage-detail.component';
import { ChargingSetListComponent } from './charging-set/charging-set-list/charging-set-list.component';
import { OutinSetListComponent } from './outin-set/outin-set-list/outin-set-list.component';
import { ChargingSetEditComponent } from './charging-set/charging-set-edit/charging-set-edit.component';

const COMPONENTS = [StowageListComponent, InFormsListComponent, InventoryFormsListComponent, OutFormsListComponent];
const COMPONENTS_NOROUNT = [StowageEditComponent];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    StowageTemplateComponent,
    StowageDetailComponent,
    ChargingSetListComponent,
    OutinSetListComponent,
    ChargingSetEditComponent,
  ],
  imports: [
    CommonModule,
    CalculationRoutingModule,
    SharedModule,
    ComponentsModule,
    NzEmptyModule,
    NzImageModule,
  ],
})
export class CalculationModule {
}
