import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth-service';

@Component({
  selector: 'app-register-page-component',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-page-component.html',
  styleUrl: './register-page-component.css'
})
export class RegisterPageComponent {

  authService = inject(AuthService);
  route = inject(Router);
  hasError = signal(false);
  isPosting = signal(false);

  formBuilder = inject(FormBuilder);
  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    fName: ['', [Validators.required, Validators.minLength(2)]],
  });

  onSubmit(): void {
    if (this.registerForm.invalid) {
      //this.registerForm.markAllAsTouched();
      this.hasError.set(true);
      setTimeout(() => {
        this.registerForm.reset();
        this.hasError.set(false);
      }, 2000);
      return;
    }
    const { email = '', password = '', fName = '' } = this.registerForm.value;
    this.authService.register(email!, password!, fName!).subscribe((isRegistered) => {
      if (isRegistered) {
        this.route.navigateByUrl('auth/login');
      } else {
        this.hasError.set(true);
        setTimeout(() => {
          this.hasError.set(false);
        }, 2000);
      }
    });
  }
}
