import { Component } from '@angular/core';
import { CardService } from '../card.service';
import { card } from '../card';

@Component({
  selector: 'app-output',
  standalone: true,
  imports: [],
  templateUrl: './output.component.html',
  styleUrl: './output.component.css'
})
export class OutputComponent {

  /**
   * Tool used to communicate between components.
   * Holds all cards submitted by the user
   */
  cardService: CardService;

  /**
   * Array that contains the cards the user has sent.
   * Iteratively displayed in the output screen
   */
  cards: card[] = [];

  constructor(cardService: CardService) {
    this.cardService = cardService;
  }

  /**
   * When the component is initialized, the cardService object listens
   * to any information inputted by the user and saves any submissions to the
   * cards list
   */
  ngOnInit() {
    this.cardService.selectedCards$.subscribe((data: card) => this.cards.push(data));
  }

}
