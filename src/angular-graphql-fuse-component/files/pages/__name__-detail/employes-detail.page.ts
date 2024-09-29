import { Component } from '@angular/core';

@Component({
  selector: 'app-<%= dasherize(name) %>-detail',
  standalone: true,
  imports: [],
  templateUrl: './actualite-detail.page.html',
  styleUrl: './actualite-detail.page.scss'
})
export class <%= classify(name) %>DetailPage {

}
