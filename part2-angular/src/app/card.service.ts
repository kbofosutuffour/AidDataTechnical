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

  /**
   * Submits the user's input data and triggers a
   * notification to the output component
   */
  submitInfo(name: string, age: string, ageType: string, school: string) {
    console.log(`Card received: name: ${name}, age: ${age} ${ageType}, school: ${school}.`);
    this.cards$.next({
      name: name,
      age: age,
      ageType: ageType,
      school: school
    })
  }

}
