import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SetAttributeDirective } from '../set-attribute.directive';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

export class FieldOptions {
  formGroup!: FormGroup;
  name!: string;
  type!:
    | 'text'
    | 'password'
    | 'email'
    | 'date'
    | 'number'
    | 'checkbox'
    | 'radio'
    | 'select';

  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  autocomplete?: HTMLInputElement['autocomplete'];
  icon?: string;
  label?: string;
  required?: boolean;
  options?: string[];

  constructor(value: FieldOptions) {
    Object.assign(this, value);
  }
}

@Component({
  selector: 'tb-form-field',
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
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SetAttributeDirective,
    MatRadioModule,
    MatSelectModule,
  ],
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent {
  value = '';

  @Input() field!: FieldOptions;
}
