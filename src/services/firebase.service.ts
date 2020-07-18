import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


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

  getOne(collection: string, query: [string, string, string | Array<string>]) {
    return new Promise((resolve, reject) => {
      this.db.collection(collection, ref => ref.where(query[0], '==', query[2])).valueChanges()
        .subscribe((res: any) => {
          console.log('getOne', res);
          if (res.length === 1) resolve(res[0]);
          if (res.length === 0) resolve(null);
          if (res.length > 1) reject('This shouldnt be happen');
        });

    })
  }
}
