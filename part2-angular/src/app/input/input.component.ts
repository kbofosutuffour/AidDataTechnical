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
    ageType: new FormControl('Years'),
    date: new FormControl(''),
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

  /**
   * Age selected by the user if they use the drop-down input
   */
  age: string = '0';

  currentDate: string = '2024-02-27';
  date: Date;

  constructor(cardService: CardService) {
    this.cardService = cardService;
    this.date = new Date(); 
    // this.currentDate = (this.date.getFullYear() + '-' + (this.date.getMonth()+1) + '-' + this.date.getDay()).toString();
    console.log(this.currentDate, 'test')
  }

  /**
   * Calculates the age of the user based on their
   * selection in the drop-down menu if used
   * @param inputDate the date the user has selected
   */
  getAge(inputDate: any) {
    let newDate = new Date(inputDate.target.value);
    this.age = (Math.floor(Math.floor((Date.UTC(this.date.getFullYear(), this.date.getMonth(), this.date.getDate()) - Date.UTC(newDate.getFullYear(), newDate.getMonth()+1, newDate.getDate()) ) /(1000 * 60 * 60 * 24)) / 365)).toString();
    console.log(this.age)
  }

  /**
   * Sends information from the input screen to the output screen.
   * Sends data to a service, which then provides new data to the output screen
   * via subscription
   */
  submitInfo() {
    let [name, age, ageType, school] = [
      this.applyForm.value.name ?? '',
      this.applyForm.value.age ?? '',
      this.applyForm.value.ageType ?? '',
      this.applyForm.value.school ?? '',
    ]
    
    this.validateInformation(name, age, ageType, school);
    if (this.validAge && this.validName && this.validSchool) {
      this.cardService.submitInfo(name, age, ageType, school);
      this.clearForm();
      this.age = '0';
    }
  }

  /**
   * Checks if the user input fits the desired specifications
   * @param name string with 1-100 character limit
   * @param age string with 1-125 age limit
   * @param ageType shows whether the age is of years of months
   */
  validateInformation(name: string, age: string, ageType: string, school: string) {
    this.validName = name.length > 0 && name.length <= 100;
    this.validSchool = school.length <= 200;

    /**
     * Checks whether the user has used a valid age using the 
     * input OR the drop-down menu
     */
    this.validAge = (Number(age) > 0 && Number(age) <= 125) || (Number(this.age) > 0 && Number(this.age) <= 125);
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
      ageType: new FormControl('Years'),
      date: new FormControl(''),
      school: new FormControl(''),
    });
  }

}
