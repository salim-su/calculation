import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChargingSetListComponent } from './charging-set/charging-set-list/charging-set-list.component';
import { InFormsListComponent } from './checked-forms/in-forms/in-forms-list/in-forms-list.component';
import {
  InventoryFormsListComponent
} from './checked-forms/inventory-forms/inventory-forms-list/inventory-forms-list.component';
import { OutFormsListComponent } from './checked-forms/out-forms/out-forms-list/out-forms-list.component';
import { OutinSetListComponent } from './outin-set/outin-set-list/outin-set-list.component';
import { StowageListComponent } from './stowage/stowage-list/stowage-list.component';

const routes: Routes = [

  { path: 'stowage/list', component: StowageListComponent },
  { path: 'in-forms/list', component: InFormsListComponent },
  { path: 'inventory-forms/list', component: InventoryFormsListComponent },
  { path: 'out-forms/list', component: OutFormsListComponent },
  { path: 'charging-set/list', component: ChargingSetListComponent },
  { path: 'out-in-set/list', component: OutinSetListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculationRoutingModule { }
