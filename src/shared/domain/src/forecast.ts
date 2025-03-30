import { Current } from "./current";
import { CurrentUnits } from "./current-units";
import { Hourly } from "./hourly";
import { HourlyUnits } from "./hourly-units";

export interface Forecast {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: HourlyUnits;
  hourly: Hourly;
  current: Current;
  current_units: CurrentUnits;
}
