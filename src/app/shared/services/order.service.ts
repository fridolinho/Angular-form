import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private firestore: AngularFirestore) { }

  SendOrder(formData: Order) {
    if (formData) {
      return this.firestore.collection('order').add(formData).then(function() {
        console.log('Document successfully added!');
      }).catch(function(error) {
        console.error('Error adding document: ', error);
      });
    }
  }
}
