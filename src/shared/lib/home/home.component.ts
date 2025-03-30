import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { OpenMeteoForecastUriParameters, Forecast, HourlyForecast } from '@domain';
import { CommonHelper } from '@helpers';
import { OpenMeteoService } from '@services';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [CommonModule, ButtonModule, TableModule, CalendarModule, CardModule],
})
export class HomeComponent {
  openMeteoService = inject(OpenMeteoService);

  forecastData: Forecast | null = null;

  hourlyWeather: HourlyForecast[] = [];

  parameters: OpenMeteoForecastUriParameters = {
    latitude: 0,
    longitude: -13.41,
    hourly: ['temperature_2m'],
  };

  ngOnInit(): void {
    this.WeatherReport();  
  }

  WeatherReport() {
    this.openMeteoService.weatherReport(this.parameters).subscribe({
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
