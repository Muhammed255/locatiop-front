import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-admin-layout',
  templateUrl: './main-admin-layout.component.html',
  styleUrls: ['./main-admin-layout.component.scss']
})
export class MainAdminLayoutComponent implements OnInit {
  sideBarOpen = true;
  
  constructor() { }

  ngOnInit() {
  }


  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
