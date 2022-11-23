import { Component } from '@angular/core';

import { Router } from '@angular/router'
import { FormBuilder, Validators } from '@angular/forms'
import { MessageService } from 'primeng/api'

import { AuthService } from 'src/app/services/auth.service';

import { ProgressComponent } from 'src/app/shared/progress/progress.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent {

  public loading: boolean = false;

  public loginForm = this.formBuilder.group({
    usuario: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  })


  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    private apiAuthService: AuthService,
    private messageService: MessageService
  ){}

  login() {
    this.loading = true
    console.log('login: ', this.loginForm.value)

    this.apiAuthService.login(this.loginForm.value)
      .subscribe({
        next: (response) => {
          this.loading = false;
          if ( response.access_token && response.access_token.length > 0  ) {
            this.router.navigate(['/']);
          } else {
            console.log(response);
          }
        },
        error: (error) => {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Unauthorized',
            detail: 'User or password incorrected'
          })
          console.log('error: ', error)
        }
      })
  }

}
