import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { OpenMeteoForecastUriParameters, Forecast } from '@domain';
import { CommonHelper } from '@helpers';
import { OpenMeteoService } from '@services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [CommonModule],
})
export class HomeComponent {
  openMeteoService = inject(OpenMeteoService);

  forecastData: Forecast | null = null;

  parameters: OpenMeteoForecastUriParameters = {
    latitude: 0,
    longitude: -13.41,
    hourly: ['temperature_2m'],
  };

  ngOnInit(): void {
    this.openMeteoService.weatherReport(this.parameters).subscribe({
      next: (forecast) => {
        this.forecastData = forecast;
      },
      error: (error) => {
        CommonHelper.exceptionHandling(error);
      },
    });
  }
}
