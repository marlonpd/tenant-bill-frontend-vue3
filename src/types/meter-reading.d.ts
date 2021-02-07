declare interface MeterReading {
  id?: number;
  tenant_id: number;
  from_date: string;
  present_reading_kwh: number;
  to_date: string;
  previous_reading_kwh: number;
  consumed_kwh: number;
  rate: number;
  bill: number;
  created?: string;
}
