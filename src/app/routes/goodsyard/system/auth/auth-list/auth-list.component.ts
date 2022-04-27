import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CardPlanEditComponent } from '../../../card/card-plan/card-plan-edit/card-plan-edit.component';
import { CardService } from '../../../card/card.service';
import { AuthEditComponent } from '../auth-edit/auth-edit.component';

@Component({
  selector: 'app-auth-list',
  templateUrl: './auth-list.component.html',
  styles: [],
})
export class AuthListComponent implements OnInit {
  dataList = [];
  pageInfo = {
    pi: 1,
    ps: 10,
    total: 0,
    loading: false,
  };
  searchForm: FormGroup;

  constructor(
    private cardService: CardService,
    private fb: FormBuilder,
    private modalService: NzModalService,
  ) {
    this.searchForm = this.fb.group({
      account: new FormControl(null),
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
    this.cardService.userPage(params).subscribe(res => {
      this.dataList = res.records;
      this.pageInfo.total = res.total;
      this.pageInfo.loading = false;
    });
  }

  search(): void {
    this.pageInfo.pi = 1;
    this.load();
  }

  reset(): void {
    this.pageInfo.pi = 1;
    this.searchForm.reset();
    this.load();
  }

  add(): any {
    this.modalService.create({
      nzContent: AuthEditComponent,
      nzTitle: '新增帐号',
      nzFooter: null,
      // nzWrapClassName: 'dasModal',
      nzBodyStyle: { height: '350px', overflow: 'auto', paddingBottom: '48px' },
    }).afterClose.subscribe((res) => {
      if (res) {
        this.load();
      }
    });
  }

  edit(record: any): any {
    this.modalService.create({
      nzContent: AuthEditComponent,
      nzComponentParams: { record },
      nzTitle: '编辑帐号',
      nzFooter: null,
      // nzWrapClassName: 'dasModal',
      nzBodyStyle: { height: '350px', overflow: 'auto', paddingBottom: '48px' },
    }).afterClose.subscribe((res) => {
      if (res) {
        this.load();
      }
    });
  }

  remove(data: any) {

  }
}
