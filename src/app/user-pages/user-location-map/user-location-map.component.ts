import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AgmMap, MapsAPILoader } from '@agm/core';
import { UserStoresService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-user-location-map',
  templateUrl: './user-location-map.component.html',
  styleUrls: ['./user-location-map.component.scss']
})
export class UserLocationMapComponent implements OnInit {


    my_latitude: number;
    my_longitude: number;
    latitude: number;
    longitude: number;
    zoom: number;
    address: string;
    private geoCoder;

    stores: any[];
    @ViewChild('search', {static: false}) public searchElementRef: ElementRef;

    @ViewChild(AgmMap, { static: false }) map: AgmMap;

  constructor(public mapsApiLoader: MapsAPILoader, private userStoresService: UserStoresService) { }

  ngOnInit() {
    this.userStoresService.getAllStores().subscribe(res => {
      this.stores = res.stores;
    })
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            this.my_latitude = position.coords.latitude;
            this.my_longitude = position.coords.longitude;
            this.zoom = 8;
            // console.log(position.coords.latitude, position.coords.longitude)
        });
    }
}

}
