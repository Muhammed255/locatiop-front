import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-store-admin-signup',
  templateUrl: './store-admin-signup.component.html',
  styleUrls: ['./store-admin-signup.component.scss']
})
export class StoreAdminSignupComponent implements OnInit {

  storeadminForm: FormGroup;

  stores: any[];
    isLoading = false;
    constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {}

    ngOnInit() {
        this.initializeForm();
        this.authService.getStoresNames().subscribe(response => {
          this.stores = response.listNames;
        })
    }

  onSubmitForm() {
    this.authService.admin_signup(
        this.storeadminForm.value.name,
        this.storeadminForm.value.username,
        this.storeadminForm.value.email,
        this.storeadminForm.value.password,
        this.storeadminForm.value.bio,
        this.storeadminForm.value.phone_number,
        this.storeadminForm.value.storeId,
        this.storeadminForm.value.job_concern,
        this.storeadminForm.value.postalCode
    ).subscribe(response => {
        this.isLoading = true;
        this.router.navigate(['/user/login']);
    })
}

initializeForm() {
    this.storeadminForm = this.fb.group({
        name: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        phone_number: ['', Validators.required],
        bio: ['', Validators.required],
        storeId: ['', Validators.required],
        job_concern: ['', Validators.required],
        postalCode: ['', Validators.required]
    });
}

}
