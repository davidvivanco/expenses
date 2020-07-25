import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFirestore) { }


  insertOne<T>(collection: string, document: T) {
    return new Promise((resolve, reject) => {
      this.db.collection(collection).add(document).then(res => {
        resolve((res));
      })
    })
  }

  getUser(collection: string, userId: string) {
    return new Promise((resolve, reject) => {
      this.db.collection(collection, ref => ref.where('id', '==', userId)).valueChanges()
        .subscribe((res: any) => {
          if (res.length === 1) resolve(res[0]);
          if (res.length === 0) resolve(null);
          if (res.length > 1) reject('This shouldnt be happen');
        });

    })
  }

  findBy(collection: string, query: [string, any, string | number | string[]]): Observable<any> {
    return this.db.collection(collection, ref => ref.where(query[0], query[1], query[2])).valueChanges()
  }

  updateById(collection: string, id: string,data:object) {
    console.log(id);
    return new Promise((resolve, reject) => {
      this.db.collection(collection)
        .doc(id)
        .update(data)
        .then(res => {
          resolve(res);
        })
    })
  }

}
