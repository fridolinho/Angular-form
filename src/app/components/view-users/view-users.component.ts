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
  private elementId: string;
  orders: any[] = [];
  singleOrder: any = {};

  constructor(
    private orderService: OrderService,
    public dialog: MatDialog
  ) {}

  displayedColumns = ['nom', 'reference', 'amenagement', 'supprimer'];

  ngOnInit(): void {
    this.getAllOrders();
  }

  async getAllOrders() {
    this.orderService.getAllOrders().snapshotChanges().subscribe(value => {
      value.map((data) => {
        this.singleOrder = data.payload.doc.data();
        this.singleOrder.id = data.payload.doc.id;
        this.orders.push(this.singleOrder);
      });
    });

    console.log(this.orders);
  }

  deleteOrder(id) {
    this.orderService.deleteOrder(id);
  }

  showDetails(id: string): void {
    const singleOrder = this.orders.find(order => order.id === id);
    const dialogRef = this.dialog.open(SingleOrderComponent, {
      data: singleOrder,
      minHeight: '200px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
