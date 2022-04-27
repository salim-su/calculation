import { Component, Input, OnInit } from '@angular/core';
import { CardService } from '../../card/card.service';

@Component({
  selector: 'app-appointment-check',
  templateUrl: './appointment-check.component.html',
  styles: [],
})
export class AppointmentCheckComponent implements OnInit {
  @Input()
  record;

  drivingLicense: [];
  vehicleLicense: [];
  detectionPic: [];
  healthQrCode: [];
  tripQrCode: [];
  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    const a = 's,a';
    console.log(a.split(','));
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
}
