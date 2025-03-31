import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import {
  OpenMeteoForecastUriParameters,
  Forecast,
  HourlyForecast,
} from '@domain';
import { LocationService, OpenMeteoService } from '@services';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { StyleClassModule } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { MomentFormatPipe } from '@pipes';
import { SelectButton } from 'primeng/selectbutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import moment from 'moment';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    CommonModule,
    FormsModule,
    ProgressSpinnerModule,
    CarouselModule,
    ButtonModule,
    RadioButtonModule,
    TableModule,
    CalendarModule,
    CardModule,
    StyleClassModule,
    DividerModule,
    MomentFormatPipe,
    SelectButton,
    ErrorComponent,
  ],
})
export class HomeComponent {
  openMeteoService = inject(OpenMeteoService);

  locationService = inject(LocationService);

  forecastData: Forecast | null = null;

  hourlyWeather: HourlyForecast[] = [];

  selectedPeriod: HourlyForecast | null = null;

  groupedWeather: { date: string; hours: any[] }[] = [];

  selectedDate: string = '';

  selectedDateIndex: number = 0;

  currentTime: string = moment().format('h:mm a');

  tempUnitOptions: any[] = [
    { label: '°C', value: '' },
    { label: '°F', value: 'fahrenheit' },
  ];

  parameters: OpenMeteoForecastUriParameters = {
    latitude: 0,
    longitude: 0,
    hourly: ['temperature_2m', 'wind_speed_10m', 'relative_humidity_2m'],
    current: ['temperature_2m', 'wind_speed_10m', 'relative_humidity_2m'],
    timezone: 'auto',
    temperature_unit: '',
  };

  responsiveOptions: any[] = [
    {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  apiError = computed(() => this.openMeteoService.errorSignal());

  ngOnInit(): void {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    this.locationService
      .getCurrentLocation()
      .then((coords) => {
        this.parameters = {
          ...this.parameters,
          latitude: coords.latitude,
          longitude: coords.longitude,
        };
        this.WeatherReport(this.parameters);
        this.openMeteoService.errorSignal.set(null);
      })
      .catch(() => {
        this.openMeteoService.errorSignal.set('Location permission denied');
      });
  }

  WeatherReport(parameters: OpenMeteoForecastUriParameters) {
    this.openMeteoService.weatherReport(parameters).subscribe({
      next: (forecast) => {
        this.forecastData = forecast;
        this.hourlyWeather = forecast.hourly?.time.map((time, index) => ({
          time,
          temperature_2m: forecast.hourly.temperature_2m[index],
        }));
        this.groupWeatherByDate();
        this.openMeteoService.errorSignal.set(null);
      }
    });
  }

  groupWeatherByDate(): void {
    const grouped: { [key: string]: any[] } = {};

    this.hourlyWeather.forEach((entry) => {
      const date = entry.time.split('T')[0];
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(entry);
    });

    this.groupedWeather = Object.keys(grouped).map((date) => ({
      date,
      hours: grouped[date],
    }));
  }

  selectDate(date: string): void {
    this.selectedDate = date;
    this.selectedDateIndex = this.groupedWeather.findIndex((callback) =>
      callback.date.startsWith(this.selectedDate)
    );
  }

  refreshForecast() {
    this.WeatherReport(this.parameters);
  }
}
