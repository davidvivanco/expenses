import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Activity } from 'src/models/interfaces/activity.interface';
import { User } from 'src/models/interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFirestore) { }


  insertOne<T>(collection: string, document: T, update: boolean = true) {
    return new Promise((resolve, reject) => {
      this.db.collection(collection).add(document).then(res => {
        if (update) {
          this.db.collection(collection)
            .doc(res.id)
            .update({ id: res.id })
            .then(res2 => {
              resolve({ id: res.id })
            })
        } else {
          resolve(res)
        }
      })
    })
  }


  getUser(collection: string, userId: string, query: Array<any>) {
    return new Promise((resolve, reject) => {
      this.db.collection(collection, ref => ref.where(query[0], query[1], query[2])).valueChanges()
        .subscribe((res: any) => {
          if (res.length === 1) resolve(res[0]);
          if (res.length === 0) resolve(null);
          if (res.length > 1) reject('This shouldnt be happen');
        });

    })
  }

  findByOneQuery(collection: string, query: Array<any>): Observable<any> {
    return this.db.collection(
      collection,
      ref => ref
        .where(query[0], query[1], query[2]))
      .valueChanges()
  }

  findByTwoQueries(collection: string, query1: any, query2: any): Observable<any> {
    return this.db.collection(
      collection,
      ref => ref
        .where(query1[0], query1[1], query1[2])
        .where(query2[0], query2[1], query2[2]))
      .valueChanges()
  }

  updateById(collection: string, id: string, data: object) {
    return new Promise((resolve, reject) => {
      this.db.collection(collection)
        .doc(id)
        .update(data)
        .then(res => {
          resolve(res);
        })
    })
  }

  deleteDocument(collection: string, id: string) {
    return new Promise((resolve, reject) => {
      this.db.collection(collection)
        .doc(id)
        .delete()
        .then(res => {
          resolve(res);
        })
    })
  }

  getUsers(groupId: string) {
    return new Promise<Array<User>>((resolve, reject) => {
      this.db.collection('users',
        ref => ref
          .where('fakeUser', '==', true)
          .where('groups', 'array-contains', groupId))
        .valueChanges()
        .subscribe((users: Array<User>) => {
          resolve(users);
        });

    })
  }

  getElementsByOneQuery<T>(collection: string, id: string, fieldToSearch: string, operator: any) {
    return new Promise<Array<T>>((resolve, reject) => {
      this.db.collection(collection,
        ref => ref
        .where(fieldToSearch, operator, id))
        .valueChanges()
        .subscribe((res: Array<T>) => {
          resolve(res);
        });

    })
  }

  getExpenses(groupId: string, fieldToSearch: string, operator: any) {
    return new Promise<Array<Activity>>((resolve, reject) => {
      this.db.collection('expenses',
        ref => ref
          .where(fieldToSearch, operator, groupId))
        .valueChanges()
        .subscribe((activity: Array<Activity>) => {
          resolve(activity);
        });

    })
  }

  getTotalExpenses(id: string, fieldToQuery: string) {
    return new Promise<number>((resolve, reject) => {
      this.db.collection('expenses',
        ref => ref
          .where(fieldToQuery, '==', id))
        .valueChanges()
        .subscribe((expenses: Array<any>) => {
          let total = 0
          expenses.forEach(e => {
            total += e.expense;
          })
          resolve(total);
        });

    })
  }

}
