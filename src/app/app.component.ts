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
  title = 'EurlSalaryCalculator';

  tjm: number = 500;

  tmpFeeName: string = '';
  tmpFeeValue: string = '';

  fees = new Map<string, number>([
    ["Voiture", 10000],
    ["Macbook", 4000],
    ["FAI", 600],
    ["IK", 2500],
    ["Resto", 2500],
    ["Cadeau Client", 2600],
    ["Chèque vacances", 460],
    ["Cesu", 1800],
    ["Frais Voiture", 2000],
    ["IDE", 250],
    ["Dashlane", 120]
  ]);

  addFee(): void {
    this.fees.set(this.tmpFeeName, Number(this.tmpFeeValue));
    this.tmpFeeName = '';
    this.tmpFeeValue = '';
  }

  getCa(): number {
    return (this.tjm * 11 * 22) - this.getTotalFee();
  }

  getCs(): number {
    const ca = this.getCa();

    return ca - (ca * (45/100));
  }

  getBenef(): number {
    return this.getCa() - this.getCs();
  }

  getBenefAfterIr(): number {
    const benef = this.getBenef() / 12;

    return benef - (benef * (10/100));
  }

  getTotalFee(): number {
    let total = 0;
    this.fees.forEach((value) => {
      total += value;
    });
    return total;
  }

  removeFee(key: string) {
    this.fees.delete(key);
  }
}
