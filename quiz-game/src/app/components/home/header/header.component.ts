import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css',
    '../home.component.css']
})
export class HeaderComponent {

  @Input() loggedUser: string = '';

  isDarkTheme: boolean = false;

  toggleTheme() {

    this.isDarkTheme = !this.isDarkTheme;
  }


}
