import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Toast } from '@capacitor/toast';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  latitude: number;
  longitude: number;

  map: any;
  mapElementRef: any;

  service: any;
  nearestHospitals: any;

  display: any;
  nearestCount: number;
  rating: number;

  constructor() {
    this.latitude = 0;
    this.longitude = 0;
    this.nearestHospitals = [];
    this.nearestCount = 0;
    this.rating = 0;
  }

  oneStar() {
    this.rating = 1;
    const request = {
      location: { lat: this.latitude, lng: this.longitude },
      rankBy: google.maps.places.RankBy.DISTANCE,
      keyword: 'hospital'
    };

    this.service.nearbySearch(request, (results: any, status: any) => {
      console.log(results)
      console.log(status)
      if (status == "OK") { // (status == google.maps.places.PlacesServiceStatus.OK)
        for (let i = 0; i < results.length; i++) {
          let place = results[i];
          if (!place.geometry || !place.geometry.location) return;
          if (place.rating >= 1) {
            this.nearestHospitals.push(place);
            this.addMarker(place.geometry.location.lat(), place.geometry.location.lng(), place.name, "https://imgtr.ee/images/2023/05/22/wRPNQ.png");
          }
        }
      }
    })
    this.loadMap()
  }

  twoStar() {
    this.rating = 2;
    const request = {
      location: { lat: this.latitude, lng: this.longitude },
      rankBy: google.maps.places.RankBy.DISTANCE,
      keyword: 'hospital'
    };

    this.service.nearbySearch(request, (results: any, status: any) => {
      console.log(results)
      console.log(status)
      if (status == "OK") { // (status == google.maps.places.PlacesServiceStatus.OK)
        for (let i = 0; i < results.length; i++) {
          let place = results[i];
          if (!place.geometry || !place.geometry.location) return;
          if (place.rating >= 2) {
            this.nearestHospitals.push(place);
            this.addMarker(place.geometry.location.lat(), place.geometry.location.lng(), place.name, "https://imgtr.ee/images/2023/05/22/wRPNQ.png");
          }
        }
      }
    })
    this.loadMap()
  }

  threeStar() {
    this.rating = 3;
    const request = {
      location: { lat: this.latitude, lng: this.longitude },
      rankBy: google.maps.places.RankBy.DISTANCE,
      keyword: 'hospital'
    };

    this.service.nearbySearch(request, (results: any, status: any) => {
      console.log(results)
      console.log(status)
      if (status == "OK") { // (status == google.maps.places.PlacesServiceStatus.OK)
        for (let i = 0; i < results.length; i++) {
          let place = results[i];
          if (!place.geometry || !place.geometry.location) return;
          if (place.rating >= 3) {
            this.nearestHospitals.push(place);
            this.addMarker(place.geometry.location.lat(), place.geometry.location.lng(), place.name, "https://imgtr.ee/images/2023/05/22/wRPNQ.png");
          }
        }
      }
    })
    this.loadMap()
  }

  fourStar() {
    this.rating = 4;
    const request = {
      location: { lat: this.latitude, lng: this.longitude },
      rankBy: google.maps.places.RankBy.DISTANCE,
      keyword: 'hospital'
    };

    this.service.nearbySearch(request, (results: any, status: any) => {
      console.log(results)
      console.log(status)
      if (status == "OK") { // (status == google.maps.places.PlacesServiceStatus.OK)
        for (let i = 0; i < results.length; i++) {
          let place = results[i];
          if (!place.geometry || !place.geometry.location) return;
          if (place.rating >= 4) {
            this.nearestHospitals.push(place);
            this.addMarker(place.geometry.location.lat(), place.geometry.location.lng(), place.name, "https://imgtr.ee/images/2023/05/22/wRPNQ.png");
          }
        }
      }
    })
    this.loadMap()
  }

  fiveStar() {
    this.rating = 5;
    const request = {
      location: { lat: this.latitude, lng: this.longitude },
      rankBy: google.maps.places.RankBy.DISTANCE,
      keyword: 'hospital'
    };

    this.service.nearbySearch(request, (results: any, status: any) => {
      console.log(results)
      console.log(status)
      if (status == "OK") { // (status == google.maps.places.PlacesServiceStatus.OK)
        for (let i = 0; i < results.length; i++) {
          let place = results[i];
          if (!place.geometry || !place.geometry.location) return;
          if (place.rating == 5) {
            this.nearestHospitals.push(place);
            this.addMarker(place.geometry.location.lat(), place.geometry.location.lng(), place.name, "https://imgtr.ee/images/2023/05/22/wRPNQ.png");
          }
        }
      }
    })
    this.loadMap()
  }
  
  async getPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.latitude = coordinates.coords.latitude;
    this.longitude = coordinates.coords.longitude;
  }

  async loadMap() {
    await this.getPosition();
    let mapOptions = {
      center: { lat: this.latitude, lng: this.longitude },
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP

    }
    this.mapElementRef = document.getElementById("map");
    this.map = new google.maps.Map(this.mapElementRef, mapOptions);
    const image = "https://imgtr.ee/images/2023/05/22/wR3lB.png";
    this.addMarker(this.latitude, this.longitude, "My Location", image);

    this.service = new google.maps.places.PlacesService(this.map);
    //let currentLocation = new google.maps.LatLng(this.latitude, this.longitude);
    //this.GooglePlacesNearbySearch(this.latitude, this.longitude, this.rating);
    this.display = new google.maps.DirectionsRenderer();
  }

  addMarker(latitude: number, longitude: number, placeName: string, image: any) {
    const marker = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: this.map,
      icon: image,
    });

    let myinfowindow = new google.maps.InfoWindow({
      content: "<div style='color: #000; background: #FFF;'>" + placeName + "</div>"
    });

    google.maps.event.addListener(marker, 'click', () => {
      myinfowindow.open(this.map, marker);
      this.displayToast();
    })

    return marker
  }

  displayToast() {
    const toast = document.createElement('ion-toast');
    toast.message = 'This toast will disappear after 5 seconds';
    toast.duration = 5000;
    document.body.appendChild(toast);
    return toast.present();
  }

  

  /*GooglePlacesNearbySearch(latitude: number, longitude: number, stars: number){
    
    const request = {
      location: { lat: latitude, lng: longitude },
      rankBy: google.maps.places.RankBy.DISTANCE,
      keyword: 'hospital'
    };

    this.service.nearbySearch(request, (results: any, status: any) => {
      console.log(results)
      console.log(status)
      if (status == "OK") { // (status == google.maps.places.PlacesServiceStatus.OK)
        for (let i = 0; i < results.length; i++) {
          let place = results[i];
          if (!place.geometry || !place.geometry.location) return;
          if (place.rating >= stars) {
            this.nearestHospitals.push(place);
            this.addMarker(place.geometry.location.lat(), place.geometry.location.lng(), place.name, "https://imgtr.ee/images/2023/05/02/JeL8L.png");
          }
        }
      }
    })
  }*/

  RouteToNextNearest(){
    let index = this.nearestCount % this.nearestHospitals.length;
    let nearestHospitalLat = this.nearestHospitals[index].geometry.location.lat();
    let nearestHospitalLng = this.nearestHospitals[index].geometry.location.lng();
    this.drawRoute(this.latitude, this.longitude, nearestHospitalLat, nearestHospitalLng);
    this.nearestCount++;
  }

  drawRoute(startLat: number, startLng: number, endLat: number, endLng: number){
    this.service = new google.maps.DirectionsService();
    this.display.setMap(this.map);
    let request = {
      origin: { lat: startLat, lng: startLng },
      destination: { lat: endLat, lng: endLng },
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.service.route(request, (result: any, status: any) => {
      if (status == "OK") {
        this.display.setDirections(result);
      }
    })
  }

  async ngOnInit() {
    //await Geolocation.requestPermissions();
    await this.loadMap();
  }
}