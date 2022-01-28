import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from "@angular/router";

import {mimeType} from './mime-type.validator';
import { GetLocationComponent } from "../get-location/get-location.component";
import { Category } from "src/app/classes/category.model";
import { CategoryService } from "src/app/services/category.service";
import { StoresService } from "src/app/services/stores.service";

@Component({
  selector: "app-create-store",
  templateUrl: "./create-store.component.html",
  styleUrls: ["./create-store.component.scss"]
})
export class CreateStoreComponent implements OnInit {
  submitted = false;
  createStoreForm: FormGroup;
  address: string;
  locationData: any = {};

  imagePreview: string;

  categories: Category[];

  sideBarOpen = true;

  constructor(
    private catService: CategoryService,
    private storeService: StoresService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.locationData = {
      longitude: 0.0,
      latitude: 0.0
    }
    this.createStoreForm = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(4)]
      }),
      latitude: new FormControl(null),
      longitude: new FormControl(null),
      logo: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] }),
      catId: new FormControl(null, { validators: [Validators.required] })
    });
    this.catService.getCatNames().subscribe(names => {
      this.categories = names.listNames
    })
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  get forms() {
    return this.createStoreForm.controls;
  }

  OnSaveStore() {
    this.submitted = true;
    if (this.createStoreForm.invalid) {
      return;
    }

    this.storeService
      .createStore(
        this.createStoreForm.value.name,
        this.createStoreForm.value.latitude,
        this.createStoreForm.value.longitude,
        this.createStoreForm.value.logo,
        this.createStoreForm.value.catId
      ).subscribe(response => {
        console.log(response);
        this.router.navigate(["/account/stores/list"]);
      });
  }

  onGetLocationBtnClicked() {
    let options = {
      width: "600px",
      height: "500px",
      data: {
        latitude: this.locationData.latitude,
        longitude: this.locationData.longitude
      }
    }
    let dialogRef = this.dialog.open(GetLocationComponent, options);

    dialogRef
      .afterClosed()
      .subscribe(
        data => {
          this.locationData = data;
          this.snackBar.open(`Location is checked !`, "Success", {
            duration: 5000
          });
        },
        error => this.HandleMessage(error, "Failed to get location")
      );
  }

  HandleMessage(error, message) {
    console.error(error);
    this.snackBar.open(message, "Error", { duration: 5000 });
  }

  onReset() {
    this.submitted = false;
    this.createStoreForm.reset();
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.createStoreForm.patchValue({logo: file});
    this.createStoreForm.get('logo').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}