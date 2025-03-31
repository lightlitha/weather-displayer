import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { OpenMeteoForecastUriParameters, Forecast, HourlyForecast } from '@domain';
import { CommonHelper } from '@helpers';
import { LocationService, OpenMeteoService } from '@services';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { StyleClassModule } from 'primeng/styleclass'
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [CommonModule, ButtonModule, TableModule, CalendarModule, CardModule, StyleClassModule, DividerModule],
})
export class HomeComponent {
  openMeteoService = inject(OpenMeteoService);

  locationService = inject(LocationService);

  forecastData: Forecast | null = null;

  hourlyWeather: HourlyForecast[] = [];

  selectedPeriod: HourlyForecast | null = null;

  parameters: OpenMeteoForecastUriParameters = {
    latitude: 0,
    longitude: 0,
    hourly: ["temperature_2m"],
    current: ['temperature_2m'],
    timezone: 'auto',
  };

  ngOnInit(): void {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    this.locationService.getCurrentLocation().then((coords) => {
      this.parameters = { ...this.parameters, latitude: coords.latitude, longitude: coords.longitude, hourly: ['temperature_2m'] };
      this.WeatherReport(this.parameters);
    }).catch(() => {
      CommonHelper.exceptionHandling('Location permission denied');
    });
  }

  WeatherReport(parameters: OpenMeteoForecastUriParameters) {
    this.openMeteoService.weatherReport(parameters).subscribe({
      next: (forecast) => {
        this.forecastData = forecast;
        this.hourlyWeather = forecast.hourly.time.map((time, index) => ({
          time,
          temperature_2m: forecast.hourly.temperature_2m[index]
        }))
      },
      error: (error) => {
        CommonHelper.exceptionHandling(error);
      },
    });
  }
}
