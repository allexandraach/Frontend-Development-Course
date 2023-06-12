import { Component, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from "../../services/user.service";
import { CookieStorageService } from "../../services/cookie-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Output() onLoginSubmit: EventEmitter<boolean> = new EventEmitter();

  username: string = "";
  password: string = "";
  loggedUsername: string = "";

  constructor(private modalService: NgbModal,
    private userService: UserService,
    private cookieStorageService: CookieStorageService) {
  }

  login() {
    this.userService.login(this.username, this.password).subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        this.cookieStorageService.setCookie("username", this.username, 1);
        this.onLoginSubmit.emit(true);
        this.loggedUsername = this.username;
      ;

      } else {
        this.onLoginSubmit.emit(false);

      }
    });
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

}
