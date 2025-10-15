import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page-component',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page-component.html',
  styleUrl: './login-page-component.css',
})
export class LoginPageComponent {
  hasError = signal(false);

  formBuilder = inject(FormBuilder);
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      //this.loginForm.markAllAsTouched();
      this.hasError.set(true);
      setTimeout(() => {
        this.loginForm.reset();
        this.hasError.set(false);
      }, 2000);
      return;
    }
    const { email, password } = this.loginForm.value;
    console.log({ email, password });
  }
}
