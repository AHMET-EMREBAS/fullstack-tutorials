import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from './todo.service';
import { FormBuilder } from '@angular/forms';
import { TodoDto } from '@techbir/common';
import { firstValueFrom, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { AuthService } from './auth.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
  ConfirmDialogResult,
  MaterialModule,
} from '@techbir/material';

@Component({
  selector: 'techbir-todo',
  standalone: true,
  imports: [CommonModule, MaterialModule],
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
    const dialogWindow = this.dialog.open(ConfirmDialogComponent, {
      data: new ConfirmDialogData({
        message: `Are you sure to delete the item by id ${id}`,
      }),
    });

    const result = await firstValueFrom<ConfirmDialogResult>(
      dialogWindow.afterClosed()
    );

    if (result) {
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
      await this.authService.login(username, password);
    }
  }

  async logout() {
    this.authService.logout();
  }
}
