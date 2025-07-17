import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-registration.html',
  styleUrl: './user-registration.scss'
})
export class UserRegistration {
  registerForm!: FormGroup;
  submittedData: any = {};

  constructor(private fb : FormBuilder){
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email:['', [Validators.required]],
      phoneNumber:['',[Validators.required]],
      address : this.fb.group({
              street:['',Validators.required],
              city:['',Validators.required]
              }),
      phoneNumbers: this.fb.array([
        this.fb.control('',[Validators.required]),
      ]), 
    });
  }

  // pattern validations for email
  //Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  // pattern validation for phone
  //Validators.pattern(/^[0-9]{10}$/)

  get phoneNumbers(){
    return this.registerForm.get('phoneNumbers') as FormArray;
  }

  addPhone(){
    this.phoneNumbers.push(
      this.fb.control('',[Validators.required])
    )
  }

  removePhone(index: number){
      this.phoneNumbers.removeAt(index);
  }

  submitForm(){
    console.log('Register Form :',this.registerForm.value)
    
    // if(this.registerForm.valid){
      this.submittedData = this.registerForm.value;
      const street = this.submittedData.address.street;
      const city = this.submittedData.address.city;
    // }
  }

}
