import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html'
})
export class RegisterPageComponent {

  formBuilder = inject(FormBuilder);

  formUtils = FormUtils;

  myForm: FormGroup = this.formBuilder.group({
    name: ['name', Validators.required],
    email: ['email', Validators.email],
    username: ['username', [Validators.required, Validators.minLength(6)]],
    password: ['password', [Validators.required, Validators.minLength(6)]],
    password2: ['password2', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {

  }
}
