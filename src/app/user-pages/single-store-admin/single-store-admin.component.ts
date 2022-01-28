import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UserStoreAdminsService } from 'src/app/services/user-storeadmins.service';
import { UserProductsService } from 'src/app/services/user-products.service';

@Component({
  selector: 'app-single-store-admin',
  templateUrl: './single-store-admin.component.html',
  styleUrls: ['./single-store-admin.component.scss']
})
export class SingleStoreAdminComponent implements OnInit {

  storeAdmin: any;
  isLoading: boolean = false;
  products: any[];
  random_admins: any[];
  auth_user: any;
  isAuthProfile: boolean = false;
  sFollow = false;
  @Input() public state: boolean = false;
  icon: string = '';

  constructor(
    private route: ActivatedRoute,
    private userStoreAdminsService: UserStoreAdminsService,
    private userProductsService: UserProductsService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.isLoading = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('adminId')) {
        this.userStoreAdminsService.finOneStoreAdmin(paramMap.get('adminId')).subscribe(result => {
          this.isLoading = false;
          this.storeAdmin = result.data;
          this.userProductsService.getSpecificAdminProducts(paramMap.get('adminId')).subscribe(result => {
            this.products = result.products;
          });
          this.userStoreAdminsService.findOneUser(localStorage.getItem('userId')).subscribe(response => {
            this.auth_user = response.user;
            if(result.data.followers.includes(response.user._id)) {
              this.icon = 'check'
            } else {
              this.icon = 'add'
            }
            if (this.storeAdmin._id === this.auth_user._id) {
              this.isAuthProfile = true;
            } else {
              this.isAuthProfile = false;
            }
          })
        })
      }
    })

    this.userStoreAdminsService.getRandomStoreAdmins().subscribe(result => {
      this.random_admins = result.admins;
    })
  }

  // protected get iconName(): 'fa fa-plus' | 'fa fa-check' {
  //   return this.state ? 'fa fa-check' : 'fa fa-plus';
  // }
  // protected set iconName(_icon) {
  //   this.state ? _icon = 'fa fa-check' : _icon = 'fa fa-plus';
  // }

  onFollowBtnClicked(id) {
    if(this.icon === 'add') {
      this.userStoreAdminsService.followStoreAdmin(id).subscribe(result => {
        this.state = true;
        this.icon = 'check';
        this.snackBar.open('Followed', 'success', {duration: 3000});
      })
    } else {
      this.userStoreAdminsService.unfollowStoreAdmin(id).subscribe(result => { 
        this.state = false;
        this.icon = 'add';
        this.snackBar.open('UnFollowed', 'success', {duration: 3000});
      })
    }
  }

}
