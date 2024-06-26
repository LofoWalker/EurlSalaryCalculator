import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EurlNet';

  tjm: number = 500;

  newFeeLabel: string = "";
  newFeeAmount: number = 0;
  fees: Fee[] = [
    {feeLabel: 'Ordinateur', feeAmount: 4000, isActive: true},
    {feeLabel: 'Restaurant', feeAmount: 2500, isActive: true},
    {feeLabel: 'Chèques vacances', feeAmount: 2600, isActive: true},
    {feeLabel: 'CESU', feeAmount: 1800, isActive: true},
  ];

  getSalesFigures(): number {
    return (this.tjm * 11 * 22) - this.getTotalFee();
  }

  getSocialSecurityCharges(): number {
    const ca = this.getSalesFigures();

    return ca - (ca * (45/100));
  }

  getBenefits(): number {
    return this.getSalesFigures() - this.getSocialSecurityCharges();
  }

  getTotalFee(): number {
    return this.fees.filter(fee => fee.isActive).reduce((sum, fee) => sum + fee.feeAmount, 0);
  }

  deleteFee(fee: Fee) {
    const index = this.fees.indexOf(fee);
    if (index > -1) {
      this.fees.splice(index, 1);
    }
  }

  addFee() {
    this.fees.push({feeLabel: this.newFeeLabel, feeAmount: this.newFeeAmount, isActive: true} as Fee);
    this.newFeeLabel = "";
    this.newFeeAmount = 0;
  }
}

export interface Fee {
  feeLabel: string;
  feeAmount: number;
  isActive: boolean;
}
