import { Component, OnInit } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { CreateStoreAdminComponent } from "./../create-store-admin/create-store-admin.component";
import { filter } from "rxjs/operators";
import { StoreAdminComponent } from "../store-admin/store-admin.component";
import { Router } from '@angular/router';
import { StoreAdminService } from "src/app/services/store-admin.service";
import { StoresService } from "src/app/services/stores.service";

@Component({
  selector: "app-list-store-admin",
  templateUrl: "./list-store-admin.component.html",
  styleUrls: ["./list-store-admin.component.scss"]
})
export class ListStoreAdminComponent implements OnInit {
  displayedColumns = [
    "name",
    "email",
    "username",
    "storeId",
    "addedBy",
    "star"
  ];
  path: string;
  storeAdmins: any[] = [];
  sideBarOpen = true;

  constructor(
    private adminService: StoreAdminService,
    public dialog: MatDialog,
    private storeService: StoresService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchStoreAdmins(); 
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  fetchStoreAdmins() {
    this.adminService.getStoreAdmins().subscribe(response => {
      console.log(response.admins);
      this.storeAdmins = response.admins;
    });
  }

  OnCreateBtnClicked() {
    let options = {
      width: "520px",
      height: "415px",
      data: {}
    }
    let dialogRef = this.dialog.open(CreateStoreAdminComponent, options);

    dialogRef
    // @ts-ignore
      .afterClosed().filter(adminParams => typeof adminParams === 'object')
      .flatMap(result => {
        filter(adminParam => typeof adminParam === "object");
        return this.adminService.createStoreAdmin(result);
      })
      .subscribe(
        data => {
          this.snackBar.open("Added Successfully! ❤😁", "Success", {
            duration: 5000
          });
          this.fetchStoreAdmins();
        },
        error => this.HandleMessage(error, "Failed to create store admin")
      );
  }

  OnMoreDetailsBtnClicked(id: any) {
    let dialogRef = this.dialog.open(StoreAdminComponent, {
      width: "900px",
      height: "700px",
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(
      data => {
        console.log('gooooooood')
      },
      error => this.HandleMessage(error, "Failed to create store admin")
    );
    // .flatMap(result => {
    //   return this.adminService.createStoreAdmin(result);
    // })
    // .subscribe(
    //   data => {
    //     this.snackBar.open("Added Successfully! ❤😁", "Success", {
    //       duration: 5000
    //     });
    //     this.fetchStoreAdmins();
    //   },
    //   error => this.HandleMessage(error, "Failed to create store admin")
    // );
  }

  HandleMessage(error, message) {
    console.error(error);
    this.snackBar.open(message, "Error", { duration: 5000 });
  }

  onBtnDeleteClick(id: String) {
    this.adminService.deleteStoreAdmin(id).subscribe(done => {
      this.snackBar.open("Deleted Successfully! 😢🤦‍♂️", "Success", {
        duration: 5000
      });
      this.fetchStoreAdmins();
    });
  }
}
