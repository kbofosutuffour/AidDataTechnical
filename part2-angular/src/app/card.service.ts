import { Injectable } from '@angular/core';
import { card } from './card';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CardService {

  cards: card[] = [];
  private cards$ = new BehaviorSubject<any>({});
  selectedCards$ = this.cards$.asObservable();

  constructor() { }

  submitInfo(name: string, age: string, school: string) {
    console.log(`Card received: name: ${name}, age: ${age}, school: ${school}.`);
    this.cards$.next({
      name: name,
      age: age,
      school: school
    })
  }

  getCards(): card[] {
    console.log(this.cards, 'test')
    return this.cards;
  }
}
