import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from './todo.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoDto } from '@techbir/common';
import { firstValueFrom, interval, switchMap, tap } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { plainToInstance } from 'class-transformer';

import {
  ConfirmDialogComponent,
  ConfirmDialogData,
  ConfirmDialogResult,
  parseNgrxErrors,
} from '@techbir/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'techbir-todo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements AfterViewInit {
  loading$ = this.todoService.loading$;

  formGroup = this.formBuilder.group({
    title: [''],
    description: [''],
  });

  loginForm = this.formBuilder.group({
    username: [''],
    password: [''],
  });

  todos$ = this.todoService.entities$;

  count$ = this.todoService.count$;

  errors$ = this.todoService.errors$.pipe(
    tap((error) => {
      const messages = parseNgrxErrors(error);
      const property = messages.split(' ').shift();
      this.snackMessage(messages);

      if (property) this.setErrorMessage(property, messages);
    })
  );

  constructor(
    private readonly todoService: TodoService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
    private readonly formBuilder: FormBuilder
  ) {}

  ngAfterViewInit(): void {
    interval(2000)
      .pipe(
        switchMap(() => {
          this.todoService.getAll();
          return this.todoService.load();
        })
      )
      .subscribe();
  }

  saveTodo() {
    const newTodo = plainToInstance(TodoDto, {
      ...this.formGroup.value,
      status: 'todo',
    });

    this.todoService.add(newTodo);
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

  private setErrorMessage(formControlName: string, message: string) {
    const control = this.formGroup.get(formControlName);

    if (control) {
      control.setErrors({ error: message });
    }
  }

  getError(formControlName: string) {
    const errors = this.formGroup.get(formControlName)?.errors;
    if (errors) {
      return errors['error'];
    }
    return undefined;
  }
}
