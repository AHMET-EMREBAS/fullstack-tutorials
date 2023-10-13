import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../app-material.module';
import { TodoService } from './todo.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TodoDto } from '@techbir/common';
import { firstValueFrom, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { AuthService } from './auth.service';

@Component({
  template: `
    <div
      style="padding: 3em; display: flex; flex-direction: column; justify-content: center; align-items: center;"
    >
      <p>Are you sure to delete the item with {{ id }}?</p>
      <button mat-raised-button color="warn" (click)="confirm()">
        Confirm
      </button>
    </div>
  `,

  imports: [CommonModule, AngularMaterialModule],
  standalone: true,
})
export class ConfirmDeleteComponent {
  id = '';
  constructor(
    private readonly dilog: MatDialogRef<any>,
    @Inject(DIALOG_DATA) private readonly data: any
  ) {
    this.id = data.id;
  }

  confirm() {
    this.dilog.close({ confirm: true });
  }
}

@Component({
  selector: 'techbir-todo',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, ConfirmDeleteComponent],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  formGroup = this.formBuilder.group({
    title: [''],
    description: [''],
  });

  loginForm = this.formBuilder.group({
    username: [''],
    password: [''],
  });

  todos$ = this.todoService.filteredEntities$;

  count$ = this.todoService.count$;
  errors$ = this.todoService.errors$.pipe(
    tap((error) => {
      this.snackMessage(error.payload.data.error.message);
    })
  );

  constructor(
    private readonly todoService: TodoService,
    private readonly authService: AuthService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
    private readonly formBuilder: FormBuilder
  ) {
    this.todoService.getAll();
  }

  protected createTodo() {
    return plainToInstance(TodoDto, {
      ...this.formGroup.value,
      status: 'todo',
    });
  }

  protected validateTodo(todo: TodoDto) {
    const errors = validateSync(todo);

    if (errors?.length > 0) {
      const errorMessage = Object.values(errors[0].constraints || {})?.pop();
      this.snackMessage(errorMessage);
      return false;
    }
    return true;
  }

  saveTodo() {
    const newTodo = this.createTodo();
    const isValid = this.validateTodo(newTodo);

    if (isValid) {
      this.todoService.add(newTodo);
    }
  }

  async deleteTodo(id: number) {
    const dialogWindow = this.dialog.open(ConfirmDeleteComponent, {
      data: { id },
    });

    const result = await firstValueFrom(dialogWindow.afterClosed());

    if (result.confirm) {
      this.todoService.removeOneFromCache(id);
      this.todoService.delete(id);
      this.snackMessage(`Deleted item by id ${id}`);
    }
  }

  protected snackMessage(message = 'Message is not provided!') {
    this.snackBar.open(message, undefined, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  async login() {
    const { username, password } = this.loginForm.value;
    if (username && password) {
      console.log('Login ...........');
      await this.authService.login(username, password);
    }
  }

  async logout() {
    this.authService.logout();
  }
}
