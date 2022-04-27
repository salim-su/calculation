import { Component, Input, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CardService } from '../../card/card.service';

@Component({
  selector: 'app-appointment-audit',
  templateUrl: './appointment-audit.component.html',
  styles: [],
})
export class AppointmentAuditComponent implements OnInit {
  @Input()
  record;
  radioValue = 1;
  drivingLicense: [];
  vehicleLicense: [];
  detectionPic: [];
  healthQrCode: [];
  tripQrCode: [];
  inputValue: any;

  constructor(private cardService: CardService, private nzDrawerRef: NzDrawerRef, private messageService: NzMessageService) {}

  ngOnInit(): void {
    console.log(this.record);
    const appointmentId = this.record.id;
    this.cardService.appointmentDetailsById({ appointmentId }).subscribe((res) => {
      console.log(res);
      this.drivingLicense = res?.drivingLicenseArray;
      this.vehicleLicense = res?.vehicleLicenseArray;
      this.detectionPic = res?.detectionPicArray;
      this.healthQrCode = res?.healthQrCodeArray;
      this.tripQrCode = res?.tripQrCodeArray;
    });
  }

  yes(): any {
    this.cardService.approvedAppointment(this.record.id).subscribe((res) => {
      console.log(res);
      this.nzDrawerRef.close(true);
    });
  }

  no(): any {
    const postData = {
      failureReason: this.inputValue,
      id: this.record.id,
    };
    this.cardService.unapprovedAppointment(postData).subscribe((res) => {
      console.log(res);
      this.nzDrawerRef.close(true);
    });
  }

  close(): any {
    this.nzDrawerRef.close(false);
  }

  save(): any {
    console.log(this.radioValue);
    if (this.radioValue) {
      this.yes();
    } else {
      if (!this.inputValue) {
        this.messageService.warning('请填写不通过原因');
      } else {
        this.no();
      }
    }
    // this.nzDrawerRef.close(true);
  }
}
