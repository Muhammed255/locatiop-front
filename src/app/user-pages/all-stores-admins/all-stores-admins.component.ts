import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { MatSnackBar, MatIcon } from '@angular/material';
import { trigger, transition, style, animate } from '@angular/animations';
import { UserStoresService } from 'src/app/services/user-store.service';
import { UserStoreAdminsService } from 'src/app/services/user-storeadmins.service';

@Component({
  selector: 'app-all-stores-admins',
  templateUrl: './all-stores-admins.component.html',
  styleUrls: ['./all-stores-admins.component.scss'],
  animations: [
    trigger('iconName', [
      transition('horiz <=> vert', [
        style({
          transform: `scale(1.5)`,
          opacity: 0
        }),
        animate('.2s 0s ease-out'),
      ])
    ])
  ]
})
export class AllStoresAdminsComponent implements OnInit {

  storeAdmins: any[];
  isLoading = false;
  user: any;
  add_icon: string = '';
  isFollow = false;
  @Input() public state: boolean = false;

  constructor(
    private userStoreAdminService: UserStoreAdminsService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.isLoading = true;
    this.userStoreAdminService.findOneUser(localStorage.getItem('userId')).subscribe(result => {
      this.user = result.user;
    })
    this.userStoreAdminService.getUserStoreAdmins().subscribe(response => {
      this.storeAdmins = response.admins;
      this.isLoading = false;
    })
    
  }

  // protected get iconName(): 'add' | 'check' {
  //   return this.state ? 'check' : 'add';
  // }
  // protected set iconName(_icon) {
  //   this.state ? _icon = 'check' : _icon = 'add';
  // }


  onFollowBtnClicked(id) {

    this.userStoreAdminService.findOneUser(localStorage.getItem('userId')).subscribe(result => {
      if(result.user.following.includes(id)) {
        this.userStoreAdminService.unfollowStoreAdmin(id).subscribe(res => {
          this.snackBar.open('UnFollowed', 'success', {duration: 5000})
        })
      } else {
        this.userStoreAdminService.followStoreAdmin(id).subscribe(res => {
          this.snackBar.open('Followed', 'success', {duration: 5000})
        })
      }
    })

    /* if(this.add_icon === 'add') {
      this.userService.followStoreAdmin(id).subscribe(result => {
        this.state = true;
        this.add_icon = 'check';
        this.snackBar.open('Followed', 'success', {duration: 3000});
      })
    } else {
      this.userService.unfollowStoreAdmin(id).subscribe(result => { 
        this.state = false;
        this.add_icon = 'add';
        this.snackBar.open('UnFollowed', 'success', {duration: 3000});
      })
    } */
  }

}
