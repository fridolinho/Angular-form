import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderRef: AngularFirestoreCollection<any>;
  orders: Observable<Order[]>;
  constructor(private firestore: AngularFirestore) {
    this.orderRef = this.firestore.collection<Order>('order');
    this.orders = this.orderRef.valueChanges();
  }

  async SendOrder(formData: any) {
    console.log(formData);
    if (formData) {
      try {
        await this.orderRef.add(formData);
        console.log('success');
      } catch (error) {
        console.log(error);
      }
    }
  }

  deleteOrder(id: string) {
    this.firestore.collection('order').doc(id).delete();
  }
}
