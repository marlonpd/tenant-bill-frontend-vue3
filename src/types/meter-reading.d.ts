declare interface MeterReading {
  id?: number;
  tenantId: number | undefined;
  fromDate: string;
  presentReadingKwh: number;
  toDate: string;
  previousReadingKwh: number;
  consumedKwh: number;
  rate: number;
  bill: number;
  created?: string;
}
