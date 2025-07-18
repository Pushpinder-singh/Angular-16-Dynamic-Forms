import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [
    CommonModule
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss'
})
export class UserList implements OnInit {

  users: User[]=[];

  // for sending the userdata back to parent to edit the record
  isEditMode: boolean = false;
  @Output() selectedUser = new EventEmitter<User>();

  constructor(private userService: UserService){}

ngOnInit(): void {
    this.userService.getUserObservable().subscribe((usersArray)=>
    this.users = usersArray 
  )}

  onDelete(id:number): void{
    this.userService.deleteUser(id);
  }

  onEdit(user:User){
    this.selectedUser.emit(user);
    this.userService.setEditable(true);
  }
}
