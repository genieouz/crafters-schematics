import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector     : 'app-<%= dasherize(name) %>',
    standalone   : true,
    imports: [
        CommonModule,
        RouterModule
    ],
    templateUrl  : './<%= dasherize(name) %>.component.html',
})
export class <%= classify(name) %>Component {

}

