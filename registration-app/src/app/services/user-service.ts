import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: any[] = [];    
  // storing the userdata in this array and saving as a behavior subject 
 private userSubject = new BehaviorSubject<User[]>([]);
 // created to change the button text to edit a user record
 private isEdit =  new BehaviorSubject<boolean>(false);
  
 //adding user 
 registerUsers(user:User):void{
    user.id = new Date().getTime();
    this.users.push(user);
    this.userSubject.next(this.users);
    console.log('User Registered!');
  }

  getUserObservable(): Observable<User[]>{
    return this.userSubject.asObservable();
  }

   deleteUser(id:number): void{
    this.users = this.users.filter(user=> user.id !== id);
    this.userSubject.next(this.users); // updating the subject
  }

  updateUser(updatedUser: User):void{
  const index = this.users.findIndex((user)=> user.id === updatedUser.id)
  if(index !== -1){
    this.users[index]=updatedUser;
    this.userSubject.next(this.users); // updating the subject

  }
  }

  setEditable(value:boolean){
    this.isEdit.next(value);
  }

  getEditable(){
    return this.isEdit.asObservable();
  }

  
}
