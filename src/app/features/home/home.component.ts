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

      // Guardamos estado
      this.loginOK = true;
      this.errorMessage = '';

      // 1) saco el user_id que viene en la respuesta
      const userId = res.user.id;
      console.log (userId, "es el userid" )

      // 2) llamo a getUserFunctionalities ENVIANDO el userId
      this.authService.getUserFunctionalities(userId).subscribe({
        next: (resp) => {
          console.log('Functionalities OK', resp);
        },
        error: (err) => {
          console.error(err);
        }
      });
    },

    error: (err) => {
      console.error(err);
      this.errorMessage = 'Email o password incorrectos';
      this.loginOK = false;
    }
  });
}

}
