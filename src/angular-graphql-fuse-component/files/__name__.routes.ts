import { Routes } from '@angular/router';
import { <%= classify(name) %>Component } from 'app/modules/admin/<%= dasherize(name) %>/<%= dasherize(name) %>.component';
import { <%= classify(name) %>ListComponent } from './pages/<%= dasherize(name) %>-list/<%= dasherize(name) %>-list.component';

export default [
    {
        path     : '',
        component: <%= classify(name) %>Component,
        children: [
            {
                path: "",
                component: <%= classify(name) %>ListComponent
            }
        ]
    },
] as Routes;
