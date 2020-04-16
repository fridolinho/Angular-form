import {Component, Inject, OnInit} from '@angular/core';
import { DatePipe } from '@angular/common';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.scss']
})
export class SingleOrderComponent implements OnInit {
  dateDeVisite: string;
  dateDamenagement: string;
  dateDeNaissaince: string;
  dateDeNaissanceCo: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private datePipe: DatePipe
              ) {
    this.dateDeNaissaince = datePipe.transform(data.locataire.dateDeNaissance.toDate(), 'yyyy-MM-dd');
    this.dateDamenagement = datePipe.transform(data.immobilier.dateDemmenagementSouhaitee.toDate(), 'yyyy-MM-dd');
    this.dateDeVisite = datePipe.transform(data.immobilier.dateDeVisite.toDate(), 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    const coNaissance = this.data.coTitulaire.dateDeNaissance;
    if (coNaissance) {
      this.dateDeNaissanceCo = this.datePipe.transform(this.data.coTitulaire.dateDeNaissance.toDate(), 'yyyy-MM-dd');
    }
  }

}
