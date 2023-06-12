import { Component, OnInit } from '@angular/core';
import { User } from '../app/models/user.model';
import { UserService} from "../app/services/user.service";
import { CookieStorageService } from './services/cookie-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isUserLoggedIn: boolean = false;

constructor(private userService: UserService, 
  private cookieStorageService: CookieStorageService ){
}

ngOnInit(){
  this.isUserLoggedIn = this.cookieStorageService.getCookie("username") !== null;
}

userLogin(isUserLoggedIn: boolean) {
  this.isUserLoggedIn = isUserLoggedIn;
}

}
