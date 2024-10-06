import { Component } from '@angular/core';

@Component({
  selector: 'app-<%= dasherize(name) %>-detail',
  standalone: true,
  imports: [],
  templateUrl: './<%= dasherize(name) %>-detail.page.html',
  styleUrl: './<%= dasherize(name) %>-detail.page.scss'
})
export class <%= classify(name) %>DetailPage {

}
