import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    NgZone,
    Inject
} from '@angular/core';
import { AgmMap, MapsAPILoader, MouseEvent } from '@agm/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { google } from '@agm/core/services/google-maps-types';

const INITIAL_OPACITY = 1;
const DIMMED_OPACITY = 0.3;

@Component({
    selector: 'app-get-location',
    templateUrl: './get-location.component.html',
    styleUrls: ['./get-location.component.scss']
})
export class GetLocationComponent implements OnInit {
    latitude: number;
    longitude: number;
    zoom: number;
    address: string;
    private geoCoder;
    @ViewChild('search', {static: false}) public searchElementRef: ElementRef;

    @ViewChild(AgmMap, { static: false }) map: AgmMap;

    constructor(
        public mapsApiLoader: MapsAPILoader,
        private zone: NgZone,
        public dialogRef: MatDialogRef<GetLocationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {
        this.mapsApiLoader.load().then(() => {
            this.setCurrentLocation();
            this.geoCoder = new google.maps.Geocoder();
            let autoComplete = new google.maps.places.Autocomplete(
                this.searchElementRef.nativeElement,
                { types: ['address'] }
            );
            autoComplete.addListener('place_changed', () => {
                this.zone.run(() => {
                    let place = google.maps.places.PlaceResult = autoComplete.getPlace();
                    // Verify Result
                    if (
                        place.geometry === undefined ||
                        place.geometry === null
                    ) {
                        return;
                    }
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.zoom = 12;
                });
            });
        });

        this.data = {
          latitude: this.latitude,
          longitude: this.longitude
        }
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    private setCurrentLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 8;
                // console.log(position.coords.latitude, position.coords.longitude)
            });
        }
    }

    markerDragEnd($event: MouseEvent) {
      this.latitude = $event.coords.lat;
      this.longitude = $event.coords.lng;
      // console.log($event.coords.lat, $event.coords.lng)
      this.getAddress(this.latitude, this.longitude);
      this.data = {
        latitude: this.latitude,
        longitude: this.longitude
      }
    }


    getAddress(latitude, longitude) {
        this.geoCoder.geocode({'location': {lat: latitude, lng: longitude}}, (results, status) => {
          // @ts-ignore
          if(status === 'OK'){
            if(results[0]) {
              this.zoom = 12;
              this.address = results[0].formatted_address;
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed dut to ' + status);
          }
        })
      }

    }

/* 

latitude: number;
    longitude: number;
    zoom: number;
    address: string;
    private geoCoder;
    @ViewChild('search', {static: false}) public searchElementRef: ElementRef;

    @ViewChild(AgmMap, { static: false }) map: AgmMap;

    constructor(
        public mapsApiLoader: MapsAPILoader,
        private zone: NgZone,
        public dialogRef: MatDialogRef<GetLocationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {
        this.mapsApiLoader.load().then(() => {
            this.setCurrentLocation();
            this.geoCoder = new google.maps.Geocoder();
            let autoComplete = new google.maps.places.Autocomplete(
                this.searchElementRef.nativeElement,
                { types: ['address'] }
            );
            autoComplete.addListener('place_changed', () => {
                this.zone.run(() => {
                    let place: google.maps.places.PlaceResult = autoComplete.getPlace();
                    // Verify Result
                    if (
                        place.geometry === undefined ||
                        place.geometry === null
                    ) {
                        return;
                    }
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.zoom = 12;
                });
            });
        });

        this.data = {
          latitude: this.latitude,
          longitude: this.longitude,
          address: this.address
        }
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    private setCurrentLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 8;
            });
        }
    }

    markerDragEnd($event: MouseEvent) {
      this.latitude = $event.coords.lat;
      this.longitude = $event.coords.lng;
    
      this.getAddress(this.latitude, this.longitude);
    }


    getAddress(latitude, longitude) {
        this.geoCoder.geocode({'location': {lat: latitude, lng: longitude}}, (results, status) => {
          // @ts-ignore
          if(status === 'OK'){
            if(results[0]) {
              this.zoom = 12;
              this.address = results[0].formatted_address;
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed dut to ' + status);
          }
        })
      }






const coord1 = [-5707673.76, -3499420.81];
  const coord2 = [-6707673.76, -3499420.81];

  var lineStyle = new Style({
    stroke: new Stroke({ color: '#ffcc33', width: 3 })
  });
  var styleMarker = new Style({
    image: new Icon({
      scale: .7, anchor: [0.5, 1],
      src: '//raw.githubusercontent.com/jonataswalker/map-utils/master/images/marker.png'
    })
  });

  const marker1 = new Point(coord1);
  const featureMarker1 = new Feature(marker1);
  var marker2 = new Point(coord2);
  var featureMarker2 = new Feature(marker2);
  var line = new LineString([coord1, coord2]);
  var lineFeature = new Feature(line);

  var vector = new Vector({
    source: new SourceVector({
      features: [lineFeature, featureMarker1, featureMarker2]
    }),
    style: [lineStyle, styleMarker]
  });

  this.map = new Map({
    target: document.querySelector('#map'),
    layers: [
      new TileLayer({ source: new Osm() }),
      vector
    ],
    view: new View({center: coord1, zoom: 5})
  });

  var translate1 = new Translate({
    features: new Collection([featureMarker1])
  });
  var translate2 = new Translate({
    features: new Collection([featureMarker2])
  });
  this.map.addInteraction(translate1);
  this.map.addInteraction(translate2);
  
  var coordMarker1, coordMarker2;
  translate1.on('translatestart', function (evt) {
    coordMarker2 = marker2.getCoordinates();
  });
  translate1.on('translating', function (evt) {
    line.setCoordinates([coordMarker2, evt.coordinate]);
  });
  translate2.on('translatestart', function (evt) {
    coordMarker1 = marker1.getCoordinates();
  });
  translate2.on('translating', function (evt) {
    line.setCoordinates([coordMarker1, evt.coordinate]);
  });
  
  this.map.on('pointermove', function(e) {
    if (e.dragging) return;
    var hit = e.map.hasFeatureAtPixel(e.map.getEventPixel(e.originalEvent));
    this.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
  });
  

}


*/