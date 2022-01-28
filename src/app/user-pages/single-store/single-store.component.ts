import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserStoresService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-single-store',
  templateUrl: './single-store.component.html',
  styleUrls: ['./single-store.component.scss']
})
export class SingleStoreComponent implements OnInit {

  store: any;
  storeProducts: any[];
  storeOffers: any[];
  storeJobs: any[];

  constructor(private route: ActivatedRoute, private userStoresService: UserStoresService) { }

  ngOnInit() {
    this.findStore();
  }

  findStore() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("storeId")) {
        this.userStoresService.finOneStore(paramMap.get("storeId")).subscribe(response => {
          this.store = response.store;
          this.storeProducts = response.storeProducts;
          this.storeOffers = response.storeOffers;
          this.storeJobs = response.storeJobs;
        })
      }
    })
  }

}
