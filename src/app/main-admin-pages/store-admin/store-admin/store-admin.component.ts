import { Component, OnInit, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { StoreAdminService } from "src/app/services/store-admin.service";

@Component({
  selector: "app-store-admin",
  templateUrl: "./store-admin.component.html",
  styleUrls: ["./store-admin.component.scss"]
})
export class StoreAdminComponent implements OnInit {
  storeAdmin: any;
  id: any;
  name: string;
  email: string;
  username: string;
  storeId: any[0];
  addedBy: any;
  createdAt: Date;
  logo: string;
  storeName: string;
  storeLocation: string;
  storeCreatedAt: Date;
  storeCategoryName: string;
  storeCategoryDesc: string;
  addedByName: string;
  addedByEmail: string;
  addedByUsername: string;
  addedByBio: string;
  addedByImage: string;


  constructor(
    public dialogRef: MatDialogRef<StoreAdminComponent>,
    private adminService: StoreAdminService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    this.setAdminDataToDialog();
  }

  setAdminDataToDialog() {
    this.id = this.data.id;
    this.adminService.findOneStoreAdmin(this.id).subscribe(response => {
      this.name = response.data[0].name;
      this.email = response.data[0].email;
      this.username = response.data[0].username;
      this.storeId = response.data[0].storeId[0];
      this.logo = response.data[0].storeId.logo;
      this.storeName = response.data[0].storeId.name;
      this.storeLocation = response.data[0].storeId.location;
      this.storeCreatedAt = response.data[0].storeId.createdAt;
      this.storeCategoryName = response.data[0].storeId.catId.name;
      this.storeCategoryDesc = response.data[0].storeId.catId.description;
      this.addedByName = response.data[0].addedBy.name;
      this.addedByImage = response.data[0].addedBy.image;
      this.addedByEmail = response.data[0].addedBy.email;
      this.addedByUsername = response.data[0].addedBy.username;
      this.addedByBio = response.data[0].addedBy.bio;
      this.createdAt = response.data[0].createdAt;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
