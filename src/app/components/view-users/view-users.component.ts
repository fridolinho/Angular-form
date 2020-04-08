import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { Order } from 'src/app/shared/models/order.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {

  displayedColumns = ['nom', 'reference', 'amenagement', 'supprimer'];
  orders: any[] = [];

  constructor(
    private orderService: OrderService
  ) {}

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

  onDeleteRow(reference) {
    this.orderService.deleteOrder(reference);
  }

  extendDetails(id) {
    document.getElementById(id);
  }
}
