import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CommonModule } from '@angular/common';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { <%= classify(name) %>FormComponent } from '../../components/<%= dasherize(name) %>-form/<%= dasherize(name) %>-form.component';

@Component({
  selector: 'app-<%= dasherize(name) %>-edit',
  standalone: true,
  imports: [
    <%= classify(name) %>FormComponent,
    CommonModule,
    AngularEditorModule,
    MatSlideToggleModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './<%= dasherize(name) %>-edit.page.html',
  styleUrl: './<%= dasherize(name) %>-edit.page.scss',
})
export class <%= classify(name) %>EditPage {
  <%= camelize(name) %>Id!: string;
  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      this.<%= camelize(name) %>Id = params.get('id');
    });
  }
}
