import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  @Output() onLogoutSubmit: EventEmitter<boolean> = new EventEmitter();

  

  logout() {
    this.onLogoutSubmit.emit(true);

}
}
