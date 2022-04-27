import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalHelper } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CalculationService } from '../../../service/calculation.service';

@Component({
  selector: 'app-inventory-forms-list',
  templateUrl: './inventory-forms-list.component.html',
  styles: [
  ]
})
export class InventoryFormsListComponent implements OnInit {
  searchForm: FormGroup;
  dataList = [];
  pageInfo = {
    pi: 1,
    ps: 10,
    total: 0,
    loading: false,
  };
  constructor(
    private calculationService: CalculationService, private fb: FormBuilder,
    private modal: ModalHelper,
    private modalService: NzModalService
  ) {
    this.searchForm = this.fb.group({
      shipName: null,
      cargoOwner: null,
      inDate: null,
      archive: '0',
    });
  }

  ngOnInit(): void {
    this.load();
  }
  load(): void {
    const params = {
      ...this.searchForm.value,
      current: this.pageInfo.pi,
      size: this.pageInfo.ps,
    };
    this.pageInfo.loading = true;
    this.calculationService.pageReportForms(params).subscribe((res) => {
      console.log(res);
      this.dataList = res.records;
      this.pageInfo.total = res.total;
      this.pageInfo.loading = false;
    });
  }
  edit(data: any) {

  }

  remove(data: any) {

  }

  stop(data: any) {

  }

  search(): void {
    this.pageInfo.pi = 1;
    this.load();
  }

  reset(): void {
    this.pageInfo.pi = 1;
    this.searchForm.reset({
      archive: '0',
    });
  }

  pigeonhole(data: any) {

  }

  change($event: any) {
    this.dataList = [];
    setTimeout(res => {
      // console.log(this.searchForm.value);
      this.load();
    }, 100);
  }
}
