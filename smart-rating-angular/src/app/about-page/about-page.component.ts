import { Component } from '@angular/core';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss'
})
export class AboutPageComponent {
  teamMembers = ['Eduardo Silva', 'João Matheus', 'Marcus de Faria'];

}
