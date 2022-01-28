import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import {
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { StoresService } from "src/app/services/stores.service";

@Component({
  selector: "app-create-store-admin",
  templateUrl: "./create-store-admin.component.html",
  styleUrls: ["./create-store-admin.component.scss"]
})
export class CreateStoreAdminComponent implements OnInit {
  adminForm: FormGroup;
  stores: any[];

  constructor(
    public dialogRef: MatDialogRef<CreateStoreAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private storeService: StoresService
  ) {}

  ngOnInit() {
    this.initForm();
    this.data = {
      name: this.adminForm.controls.name,
      username: this.adminForm.controls.username,
      email: this.adminForm.controls.email,
      password: this.adminForm.controls.password,
      job_concern: this.adminForm.controls.job_concern,
      storeId: this.adminForm.controls.storeId
    };
    this.storeService.getStoreNames().subscribe(storeNames => {
      this.stores = storeNames.listNames
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private initForm() {
    this.adminForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", Validators.required],
      job_concern: [""],
      storeId: ["", Validators.required]
    });
  }
}
