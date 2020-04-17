import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { SingleOrderComponent } from './single-order/single-order.component';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})

export class ViewUsersComponent implements OnInit {
  orders;

  constructor(
    private orderService: OrderService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.getAllOrders().snapshotChanges().subscribe(value => {
      this.orders = [];
      value.map(order => {
        this.orders.push({
          id: order.payload.doc.id,
          data: order.payload.doc.data()
        });
      });
    });
  }

  deleteOrder(id) {
    this.orderService.deleteOrder(id);
  }

  showDetails(id: string): void {
    const singleOrder = this.orders.find(order => order.id === id);
    const dialogRef = this.dialog.open(SingleOrderComponent, {
      data: singleOrder,
      height: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
}
