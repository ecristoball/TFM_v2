import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  myForm: FormGroup;
  loginOK = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.myForm = this.fb.group({
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
       if (this.myForm.invalid) return;

    this.authService.login(this.myForm.value).subscribe({
      next: (res) => {
        console.log('Login OK', res);
        this.loginOK = true;
        this.errorMessage = '';
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Email o password incorrectos';
        this.loginOK = false;
      }
    });
  }
}
