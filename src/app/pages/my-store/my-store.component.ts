import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-my-store',
  templateUrl: './my-store.component.html',
  styleUrls: ['./my-store.component.scss']
})
export class MyStoreComponent implements OnInit {

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  storeId: string;
  userId: string;
  user: any;
  store: any;

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('storeId')) {
        this.storeId = paramMap.get('storeId');

        this.authService.getOneStore(this.storeId).subscribe(result => {
          this.store = result.store;
          console.log(this.store);
        })
      }
    })
  }

}
