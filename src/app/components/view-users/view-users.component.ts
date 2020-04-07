import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { Order } from 'src/app/shared/models/order.model';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {
  orders: Order[];
  displayedColumns = ['nom', 'email', 'adresse', 'supprimer'];

  constructor(
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orderService.orders.subscribe((orders) => {
      this.orders = orders;
    });
  }

  onDeleteRow(order) {
    console.log(order);
    this.orderService.deleteOrder(order.id);
  }
}
