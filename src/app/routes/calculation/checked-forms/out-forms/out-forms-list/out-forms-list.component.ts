import { Component, Input, OnInit } from '@angular/core';
import { Data } from '@angular/router';

@Component({
  selector: 'app-out-forms-list',
  templateUrl: './out-forms-list.component.html',
  styles: [],
})
export class OutFormsListComponent implements OnInit {
  @Input()
  record;
  @Input()
  singleSelection: any = true;

  checkedAll = false;
  indeterminate = false;
  setOfCheckedId = new Set();
  loading = false;

  dataList = [

  ];
  selItem: any;
  listOfCurrentPageData: readonly Data[] = [];
  constructor() {

  }

  ngOnInit(): void {

    this.dataList = new Array(100).fill(0).map((_, index) => ({
      id: index,
      name: `Edward King ${index}`,
      age: 32,
      address: `London, Park Lane no. ${index}`,
      disabled: index % 2 === 0
    }));

    this.setOfCheckedId.add('1');

  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (this.singleSelection) {
      if (checked) {
        this.setOfCheckedId.clear();
        this.setOfCheckedId.add(id);
      } else {
        this.setOfCheckedId.clear();
      }
    } else {
      if (checked) {
        this.setOfCheckedId.add(id);
      } else {
        this.setOfCheckedId.delete(id);
      }
    }
  }

  refreshCheckedStatus(): void {
    this.checkedAll = this.dataList.every((item) => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.dataList.some((item) => this.setOfCheckedId.has(item.id)) && !this.checkedAll;
  }

  onItemChecked(id: any, $event: any, data: any): any {
    this.updateCheckedSet(id, $event);
    this.refreshCheckedStatus();
    this.selItem = data;
  }

  saveAndClose(): any {
    console.log(this.setOfCheckedId);

    const params = {
      shipId: [...this.setOfCheckedId].join(),
    };
    console.log(params);
    console.log(this.selItem);
  }
  onCurrentPageDataChange(listOfCurrentPageData: readonly Data[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }
}
