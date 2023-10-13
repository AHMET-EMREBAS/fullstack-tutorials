import { Route } from '@angular/router';
import { TodoComponent } from './todo/todo.component';

export const appRoutes: Route[] = [
  { title: 'Todo Application', path: '', component: TodoComponent },
];
