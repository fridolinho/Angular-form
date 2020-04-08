import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderCollection: AngularFirestoreCollection<any>;
  orders: any;

  constructor(private firestore: AngularFirestore) {
    this.orderCollection = this.firestore.collection<Order>('order');
    this.orders = this.orderCollection.snapshotChanges();
  }

  async SendOrder(formData: Order) {
    console.log(formData);
    if (formData) {
      try {
        await this.orderCollection.add(formData);
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
