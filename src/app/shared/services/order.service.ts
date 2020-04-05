import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderRef: AngularFirestoreCollection<any>;
  constructor(private firestore: AngularFirestore) {
    this.orderRef = this.firestore.collection<Order>('order');
  }

  async SendOrder(formData: Order) {
    if (formData) {
      try {
        await this.orderRef.add(formData);
      } catch (error) {
        return error;
      }
    }
  }
}
