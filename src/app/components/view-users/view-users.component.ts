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

  constructor(
    private orderService: OrderService,
    public dialog: MatDialog
  ) {}

  displayedColumns = ['nom', 'reference', 'amenagement', 'supprimer'];
  orders: any[] = [];

  ngOnInit(): void {
    this.getAllOrders();
  }

  async getAllOrders() {
    this.orderService.orders.subscribe((allOrders) => {
      allOrders.map( data => {
        const currentOrders = this.orders;
        const singleorder = data.payload.doc.data();
        singleorder.id = data.payload.doc.id;
        currentOrders.push(singleorder);
        this.orders = currentOrders;
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
      minHeight: '200px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
