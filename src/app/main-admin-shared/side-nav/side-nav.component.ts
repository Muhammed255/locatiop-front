import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'main-admin-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  opened = true;

  user: any;

  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  
  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (window.innerWidth < 768) {
      // this.sidenav.fixedTopGap = 0;
      this.opened = false;
    } else {
      // this.sidenav.fixedTopGap = 0;
      this.opened = true;
    }



    // this.authService.findOneUser(this.authService.getUserId()).subscribe(res => {
    //   this.user = res.user;
    // });
  }

  onLogout() {
    this.authService.logout();
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      // this.sidenav.fixedTopGap = 0;
      this.opened = false;
    } else {
      // this.sidenav.fixedTopGap = 0
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

}
