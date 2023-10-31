import '@angular/localize/init';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormFieldComponent } from '../../../forms';

@Component({
  selector: 'tb-new-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatStepperModule,
    MatIconModule,
    FormFieldComponent,
  ],
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent {
  credentialsFormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    lastName: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    gender: new FormControl('', []),
    username: new FormControl('', [Validators.email]),
    password: new FormControl('', [
      Validators.pattern(/[A-Z]{1}/),
      Validators.pattern(/[a-z]{1}/),
      Validators.pattern(/[0-9]{1}/),
      Validators.pattern(/[!@#$%^&*()_+{}:"<?]{1}/),
      Validators.minLength(6),
    ]),
    cpassword: new FormControl('', [
      Validators.pattern(/[A-Z]{1}/),
      Validators.pattern(/[a-z]{1}/),
      Validators.pattern(/[0-9]{1}/),
      Validators.pattern(/[!@#$%^&*()_+{}:"<?]{1}/),
      Validators.minLength(6),
    ]),
  });

  addressFormGroup = new FormGroup({
    street: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zip: new FormControl(''),
  });

  resetForm(formGroup: FormGroup) {
    formGroup.reset();
    formGroup.markAsUntouched();
  }
}
