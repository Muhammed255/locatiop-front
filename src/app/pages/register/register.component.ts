import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  public form:FormGroup;
  public settings: Settings;
  isLoading = false;
  constructor(private authService: AuthService, public appSettings:AppSettings, public fb: FormBuilder, public router:Router){
    this.settings = this.appSettings.settings; 
    this.form = this.fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': [null, Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required],
      'phone_number': ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      'bio': ['', Validators.compose([Validators.required, Validators.minLength(10)])]
    },{validator: matchingPasswords('password', 'confirmPassword')});
  }

  public onSubmit(values:Object):void {
    if (this.form.invalid) {
      return;
    }
    this.authService.signup(
      this.form.value.name,
      this.form.value.username,
      this.form.value.email,
      this.form.value.password,
      this.form.value.bio,
      this.form.value.phone_number
  ).subscribe(response => {
      this.isLoading = true;
      this.router.navigate(['/user/email/confirmation']);
  })
  }

  ngAfterViewInit(){
    this.settings.loadingSpinner = false; 
  }
}