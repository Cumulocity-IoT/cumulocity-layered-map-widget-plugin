import { IMeasurement, MeasurementService } from '@c8y/client';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class MeasurementDownloadService {
    private measurementService;
    constructor(measurementService: MeasurementService);
    private createBaseFilter;
    private getTotalPages;
    getMeasurementsWithProgress(source: string): Observable<{
        progress: number;
        measurements: IMeasurement[];
    }>;
    prepare(measurements: IMeasurement[]): string;
    private detectMeasurementPaths;
    private jsonToCsv;
    download(text: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MeasurementDownloadService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MeasurementDownloadService>;
}
