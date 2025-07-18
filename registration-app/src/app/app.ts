import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderModule } from './header/header-module';
import { UserRegistrationModule } from './user-registration/user-registration-module';
import { Header } from './header/header';
import { UserRegistration } from './user-registration/user-registration';
import { UserList } from './user-list/user-list';
import { User } from './interfaces/user';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderModule,
    Header,
    UserList,
    UserRegistrationModule,
    UserRegistration
  ],
  providers: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('registration-app');

  selectedUserfromAppComponentOfUserList!: User;



selectUserInAppComponent(user:User){
  this.selectedUserfromAppComponentOfUserList = user;
}

}
