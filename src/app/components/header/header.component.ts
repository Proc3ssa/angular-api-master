import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
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
