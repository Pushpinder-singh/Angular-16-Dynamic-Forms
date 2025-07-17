import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges,  } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user-service';
import { User } from '../interfaces/user';

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
export class UserRegistration implements OnChanges{
  registerForm!: FormGroup;
  submittedData: any = {}; // form data 

  isEdit!:boolean // toggle add/edit button
// getting the value of User from app component thorugh list component for edit the record
  @Input() selectedUserfromAppToEdit!: User;

  constructor(private fb : FormBuilder,
    private userService: UserService
  ){
    this.registerForm = this.fb.group({
      id : new Date().getTime(),
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

    // subscribing isEdit behaviorsubject for toggling the add/edit button
    this.userService.getEditable().subscribe( 
      response => this.isEdit = response
      );
    // {next: (response)=>(this.isEdit=response)}

  }

  //Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  //Validators.pattern(/^[0-9]{10}$/)

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['selectedUserfromAppToEdit']?.currentValue){
        const currentValues = changes['selectedUserfromAppToEdit']?.currentValue;
        console.log('Patch values: ',currentValues);
        this.registerForm.patchValue({
          id : currentValues.id,
          name: currentValues.name,
          email: currentValues.email,
          address:{
            street: currentValues.address?.street,
            city: currentValues.address?.city,
          },
          phoneNumbers: currentValues.phoneNumbers

        })
      }
  }

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
    
  //  if(this.registerForm.invalid){
  //     this.submittedData = this.registerForm.value;
  //   return;
  //   }
    const user: User = this.registerForm.value;
    if(this.isEdit){
      this.userService.updateUser(user);
      this.userService.setEditable(false);
    }else{
      this.userService.registerUsers(user);
    }
    this.registerForm.reset();
    // }
  }

}
