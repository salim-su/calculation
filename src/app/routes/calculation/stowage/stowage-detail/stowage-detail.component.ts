import { Component, Input, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { CalculationService } from '../../service/calculation.service';

@Component({
  selector: 'app-stowage-detail',
  templateUrl: './stowage-detail.component.html',
  styleUrls: ['./stowage-detail.component.less'],
})
export class StowageDetailComponent implements OnInit {
  @Input()
  record;
  billingRuleId: any;
  ruleList = [];
  listOfData = [];
  listLoading = false;
  calculateOfData = [];

  postInfo: any;

  constructor(
    private calculationService: CalculationService,
    private nzDrawerRef: NzDrawerRef,
  ) {
  }

  // billingRuleId
  ngOnInit(): void {
    // this.calculationService
    console.log(this.record);
    if (this.record?.billingRuleId) {
      this.getRuleList(this.record?.billingRuleId);
      this.postInfo = { ...this.record };
      // this.getCalculateList(this.postInfo);
    }
    this.calculationService.listBillingRules('').subscribe(res => {
      this.billingRuleId = this.record.billingRuleId;
      this.ruleList = res;
      console.log(this.ruleList);
    });
  }

  changeVal($event: any): any {
    // console.log($event);
    this.getRuleList($event);
  }

  getRuleList(parentId: any): any {
    const data = { parentId };
    this.listLoading = true;
    this.calculationService.listBillingRules(data).subscribe(res => {
      console.log(res);
      this.listLoading = false;
      this.listOfData = [...res];
      this.postInfo.billingRules = this.listOfData;
      this.postInfo.billingRuleId = parentId;
      this.getCalculateList(this.postInfo);
    });
  }

  close(): any {
    this.nzDrawerRef.close(true);
  }

  getCalculateList(data: any): any {
    this.calculationService.calculate(data).subscribe(res => {
      console.log(res);
      this.calculateOfData = [...res];
      // this.calculateOfData = res;
      // this
    });
  }

  export(): any {

  }
}
