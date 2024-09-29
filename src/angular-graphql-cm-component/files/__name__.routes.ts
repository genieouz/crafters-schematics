import { Routes } from '@angular/router';
import { <%= classify(name) %>CreatePage } from './pages/<%= dasherize(name) %>-create/<%= dasherize(name) %>-create.page';
import { <%= classify(name) %>DetailPage } from './pages/<%= dasherize(name) %>-detail/<%= dasherize(name) %>-detail.page';
import { <%= classify(name) %>EditPage } from './pages/<%= dasherize(name) %>-edit/<%= dasherize(name) %>-edit.page';
import { <%= classify(name) %>ListPage } from './pages/<%= dasherize(name) %>-list/<%= dasherize(name) %>-list.page';

export default [
  {
    path: 'list',
    component: <%= classify(name) %>ListPage
  },
  {
    path: 'create',
    component: <%= classify(name) %>CreatePage
  },
  {
    path: 'detail',
    component: <%= classify(name) %>DetailPage
  },
  {
    path: 'edit/:id',
    component: <%= classify(name) %>EditPage
  },
] as Routes;

