import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NgControlStatus,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../../../shared/service/toast.service';
import { LoadingService } from '../../../../shared/service/loading.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _authSerivce: AuthService,
    private _toastService: ToastService,
    private _loadingService: LoadingService
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  getControl(controlName: string) {
    return this.loginForm.controls[controlName];
  }

  onSubmit(): void {
    // Process checkout data here
    if (this.loginForm.valid) {
      this._loadingService.show();
      this._authSerivce.signIn(this.loginForm.getRawValue()).subscribe({
        next: (res) => {
          this._router.navigate(['/main'], { relativeTo: this._route });
          localStorage.setItem('token', res.token);
          this._loadingService.hide();
        },
        error: (error: HttpErrorResponse) => {
          this._toastService.showError(
            error.error.message ? error.error.message : 'Login Failed'
          );
          this.loginForm.reset();
          this._loadingService.hide();
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
      this._toastService.showError('Please input username and password');
    }
  }
}
