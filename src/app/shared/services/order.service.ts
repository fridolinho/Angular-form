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
        console.log(formData);
        await this.firestore.collection('order').add(formData);
        console.log('success');
      } catch (error) {
        console.log(error);
      }
    }
  }

  deleteOrder(id: string) {
    return this.firestore.collection('order').doc(id).delete();

  }
}
