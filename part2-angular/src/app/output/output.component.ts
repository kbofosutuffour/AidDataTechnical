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

  cardService: CardService;
  cards: card[] = [];

  constructor(cardService: CardService) {
    this.cardService = cardService;
  }

  ngOnInit() {
    this.cardService.selectedCards$.subscribe((data: card) => this.cards.push(data));
  }

}
