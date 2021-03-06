import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UsersServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

import { AngularFireDatabase } from '@angular/fire/database';

import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class TestProvider {

  constructor(private db: AngularFireDatabase) {}

  getUsers(start: BehaviorSubject<string>): Observable<any[]> {
     return start.switchMap(startText => {
      const endText = startText + '\uf8ff';
      return this.db
        .list('/users', ref =>
          ref
            .orderByChild('firstName')
            .limitToFirst(10)
            .startAt(startText)
            .endAt(endText)
        )
        .snapshotChanges()
        .debounceTime(200)
        .distinctUntilChanged()
        .map(changes => {
          return changes.map(c => {
            return { key: c.payload.key, ...c.payload.val() };
          });
        });
    });
  }
}
