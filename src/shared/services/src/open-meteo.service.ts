import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Forecast, OpenMeteoForecastUriParameters } from '@domain';
import { environment } from '@environment';
import { CommonHelper } from '@helpers';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenMeteoService {
  private readonly http = inject(HttpClient);

  errorSignal = signal<string | null>(null);

  weatherReport(parameters: OpenMeteoForecastUriParameters): Observable<Forecast> {
    return this.http.get<Forecast>(
      `${environment.OpenMeteoAPIURI}?${CommonHelper.createQueryString(parameters)}`,
    ).pipe(
      catchError(() => {
        this.errorSignal.set('Failed to fetch weather data, Check if required options are set');
        return throwError(() => new Error('Failed to fetch weather data'));
      })
    );
  }
}
