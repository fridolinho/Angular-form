import {Component, Inject, OnInit} from '@angular/core';
import { DatePipe } from '@angular/common';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.scss']
})
export class SingleOrderComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private datePipe: DatePipe
              ) {}

  ngOnInit(): void {
    console.log(this.data.id);
  }

}
