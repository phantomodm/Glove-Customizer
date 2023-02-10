import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobileService {

  currentTab = new Subject<number>();
  currentTab$ = this.currentTab.asObservable();
  constructor() {
    this.currentTab.next(0);
  }

  nextPrev(n: number) {
    this.currentTab.next(n);
  }
}
