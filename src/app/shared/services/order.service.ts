import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private firestore: AngularFirestore) {}

  getAllOrders() {
   return this.firestore.collection('order');
  }

  async SendOrder(formData: Order) {
    if (formData) {
      try {
        await this.firestore.collection('order').add(formData);
      } catch (error) {
        return error;
      }
    }
  }

  deleteOrder(id: string) {
    return this.firestore.collection('order').doc(id).delete();
  }
}
