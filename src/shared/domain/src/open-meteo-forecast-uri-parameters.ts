export interface OpenMeteoForecastUriParameters {
    latitude: number;
    longitude: number;
    elevation?: number;
    hourly?: string[];
    daily?: string[];
    current?: string[];

    temperature_unit?: String;
    wind_speed_unit?: String;
    precipitation_unit?: String;
    timeformat?: String;
    timezone?: String;
    past_days?: number;	// 0-92
    
    forecast_days?:	number; // (0-16)
    forecast_hours?: number; // > 0
    forecast_minutely_15?: number; // > 0
    past_hours?: number; // > 0
    past_minutely_15?: number; // > 0

    start_date?: string; // (yyyy-mm-dd)
    end_date?: string; // (yyyy-mm-dd)

    start_hour?: string; // (yyyy-mm-ddThh:mm)
    end_hour?: string; // (yyyy-mm-ddThh:mm)
    start_minutely_15?: string; // (yyyy-mm-ddThh:mm)
    end_minutely_15?: string; // (yyyy-mm-ddThh:mm)
    
    models?: string[];

    apikey?: string;
}