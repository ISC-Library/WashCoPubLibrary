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
import 'rxjs/add/operator/switchMap';

@Injectable()
export class CalenderEventsServiceProvider {

  constructor(private db: AngularFireDatabase) {}

  getEvents(start: BehaviorSubject<string>): Observable<any[]> {
     return start.switchMap(startText => {
      const endText = startText; //+ '\uf8ff';
      return this.db
        .list('/events', ref =>
          ref
            .orderByChild('startDate')
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
