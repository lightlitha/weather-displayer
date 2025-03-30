import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Forecast, OpenMeteoForecastUriParameters } from '@domain';
import { environment } from '@environment';
import { CommonHelper } from '@helpers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenMeteoService {
  private readonly http = inject(HttpClient);

  weatherReport(parameters: OpenMeteoForecastUriParameters): Observable<Forecast> {
    return this.http.get<Forecast>(
      `${environment.OpenMeteoAPIURI}?${CommonHelper.createQueryString(parameters)}`,
    );
  }
}
