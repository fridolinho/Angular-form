import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { Order } from 'src/app/shared/models/order.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {
  private elementId: string;

  constructor(
    private orderService: OrderService
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

  onDeleteRow(reference) {
    this.orderService.deleteOrder(reference);
  }

  showDetails(id: string): void {
    const element = document.getElementById(id);
    if (element.classList.contains('order_details')) {
      element.classList.remove('order_details');
      element.classList.add('order_details_show');
    } else {
      element.classList.add('order_details');
      element.classList.remove('order_details_show');
    }
  }
}
