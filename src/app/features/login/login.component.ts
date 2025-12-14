import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environment/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

myForm: FormGroup;
  loginOK = false;
  errorMessage = '';

  constructor(private form: FormBuilder, private authService: AuthService) {
    this.myForm = this.form.group({
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    console.log(environment.production);
console.log(environment.apiUrl);

    if (this.myForm.invalid) return;

    //devuelve un observable, se usa subscribe() para recibir la respuesta.
    //next recibe la respuesta del servidor.
    this.authService.login(this.myForm.value).subscribe({
      next: (res) => {
      
        // Guardamos estado
        this.loginOK = true;
        this.errorMessage = '';

        // 1) saca el user_id que viene en la respuesta
        const userId = res.user.id;
        console.log ("es el userid",userId, "es el res",res )
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Email o password incorrectos';
        this.loginOK = false;
      }
    });
  }
}
