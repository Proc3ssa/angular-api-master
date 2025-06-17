import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  html = document.documentElement;


   themeToggle(){
            this.html.classList.toggle('dark');
            const theme = this.html.classList.contains('dark') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
        }

}
