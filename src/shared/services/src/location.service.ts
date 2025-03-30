import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LocationService {

  constructor(private router: Router) { }

  getCurrentLocation(): Promise<GeolocationCoordinates> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve(position.coords);
          },
          (error) => {
            this.router.navigate(['/error']);
            reject(error);
          }
        );
      } else {
        this.router.navigate(['/error']);
        reject('Geolocation is not supported by this browser.');
      }
    });
  }
}
