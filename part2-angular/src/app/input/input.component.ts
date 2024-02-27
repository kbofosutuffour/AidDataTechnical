import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CardService } from '../card.service';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  /** 
   * Settings up the form on the input screen
   */
  applyForm = new FormGroup({
    name: new FormControl(''),
    age: new FormControl(''),
    school: new FormControl(''),
  });

  /**
   * Tool used to communicate between components.
   * Holds all cards submitted by the user
   */
  cardService: CardService;

  /**
   * Shows whether or not the user is a student,
   * the user has submitted a name within 1-100 characters, and
   * the user has submitted an age within 1-125 years
   */
  isStudent: boolean = false;
  validName: boolean = true;
  validAge: boolean = true;
  validSchool: boolean = true;

  constructor(cardService: CardService) {
    this.cardService = cardService;
  }

  /**
   * Sends information from the input screen to the output screen.
   * Sends data to a service, which then provides new data to the output screen
   * via subscription
   */
  submitInfo() {
    let [name, age, school] = [
      this.applyForm.value.name ?? '',
      this.applyForm.value.age ?? '',
      this.applyForm.value.school ?? ''
    ]
    
    this.validateInformation(name, age, school);
    if (this.validAge && this.validName && this.validSchool) {
      this.cardService.submitInfo(name, age, school);
      this.clearForm();
    }
  }

  /**
   * Checks if the user input fits the desired specifications
   * @param name string with 1-100 character limit
   * @param age string with 1-125 age limit
   */
  validateInformation(name: string, age: string, school: string) {
    this.validName = name.length > 0 && name.length <= 100;
    this.validAge = Number(age) > 0 && Number(age) <= 125;
    this.validSchool = school.length <= 200;
  }

  /**
   * Disables or enables the school input box for the input screen
   * @param value whether or not the user is a student
   */
  setSchoolStatus(value: boolean) {
    this.isStudent = value;
    if (value) {
      this.applyForm.controls['school'].enable();
    } else {
      this.applyForm.controls['school'].disable();
    }
  }

  /**
   * Resets the input form after the user submits 
   * valid input data
   */
  clearForm() {
    this.applyForm = new FormGroup({
      name: new FormControl(''),
      age: new FormControl(''),
      school: new FormControl(''),
    });
  }

}
