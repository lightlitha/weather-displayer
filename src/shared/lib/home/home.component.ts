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
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import moment from 'moment';
import { CarouselModule } from 'primeng/carousel';
import { MomentFormatPipe } from '@pipes';
// import { MomentFormatPipe } from "@pipes";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [CommonModule, FormsModule, CarouselModule, ButtonModule, RadioButtonModule, TableModule, CalendarModule, CardModule, StyleClassModule, DividerModule, MomentFormatPipe],
})
export class HomeComponent {
  openMeteoService = inject(OpenMeteoService);

  locationService = inject(LocationService);

  forecastData: Forecast | null = null;

  hourlyWeather: HourlyForecast[] = [];

  selectedPeriod: HourlyForecast | null = null;

  groupedWeather: { date: string, hours: any[] }[] = [];  // Grouped weather by date

  selectedDate: string = '';

  parameters: OpenMeteoForecastUriParameters = {
    latitude: 0,
    longitude: 0,
    hourly: ["temperature_2m", 'wind_speed_10m', 'relative_humidity_2m'],
    current: ['temperature_2m', 'wind_speed_10m', 'relative_humidity_2m'],
    timezone: 'auto',
  };

  responsiveOptions: any[] = [
    {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  tier2: number = 0;

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
        }));
        this.groupWeatherByDate();
      },
      error: (error) => {
        CommonHelper.exceptionHandling(error);
      },
    });
  }

  groupWeatherByDate(): void {
    const grouped: { [key: string]: any[] } = {};

    this.hourlyWeather.forEach(entry => {
      const date = entry.time.split('T')[0];  // Extract date (YYYY-MM-DD)
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(entry);
    });

    this.groupedWeather = Object.keys(grouped).map(date => ({
      date,
      hours: grouped[date]
    }));
  }

  // Select a date and show the hourly data
  selectDate(date: string): void {
    this.selectedDate = date;
  }
}
