import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalHelper } from '@delon/theme';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CalculationService } from '../../../service/calculation.service';

@Component({
  selector: 'app-out-forms-list',
  templateUrl: './out-forms-list.component.html',
  styles: [
  ]
})
export class OutFormsListComponent implements OnInit {
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
    private modalService: NzModalService,
    private drawerService: NzDrawerService,
  ) {
    this.searchForm = this.fb.group({
      date: null,
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
      type: 'OUT',
    };
    this.pageInfo.loading = true;
    this.calculationService.pageDaily(params).subscribe((res) => {
      console.log(res);
      this.dataList = res.records;
      this.pageInfo.total = res.total;
      this.pageInfo.loading = false;
    });
  }

  reset(): void {
    this.pageInfo.pi = 1;
    this.searchForm.reset();
    this.load();
  }

  search(): void {
    this.pageInfo.pi = 1;
    this.load();
  }

  export(): any {

  }

}
