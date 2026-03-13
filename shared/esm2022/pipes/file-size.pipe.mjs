import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
const FILE_SIZE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
const FILE_SIZE_UNITS_LONG = [
    'Bytes',
    'Kilobytes',
    'Megabytes',
    'Gigabytes',
    'Pettabytes',
    'Exabytes',
    'Zettabytes',
    'Yottabytes',
];
export class FormatFileSizePipe {
    /**
     * Returns the file size as user friendly string.
     * @param sizeInBytes
     * @param longForm
     * @returns
     */
    transform(sizeInBytes, longForm) {
        const units = longForm ? FILE_SIZE_UNITS_LONG : FILE_SIZE_UNITS;
        let power = Math.round(Math.log(sizeInBytes) / Math.log(1024));
        power = Math.min(power, units.length - 1);
        const size = sizeInBytes / Math.pow(1024, power); // size in new units
        const formattedSize = Math.round(size * 100) / 100; // keep up to 2 decimals
        const unit = units[power];
        return `${formattedSize} ${unit}`;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: FormatFileSizePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "18.2.14", ngImport: i0, type: FormatFileSizePipe, name: "formatFileSize" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: FormatFileSizePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'formatFileSize',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1zaXplLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGlwZXMvZmlsZS1zaXplLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBRXBELE1BQU0sZUFBZSxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM5RSxNQUFNLG9CQUFvQixHQUFHO0lBQzNCLE9BQU87SUFDUCxXQUFXO0lBQ1gsV0FBVztJQUNYLFdBQVc7SUFDWCxZQUFZO0lBQ1osVUFBVTtJQUNWLFlBQVk7SUFDWixZQUFZO0NBQ2IsQ0FBQztBQUtGLE1BQU0sT0FBTyxrQkFBa0I7SUFDN0I7Ozs7O09BS0c7SUFDSCxTQUFTLENBQUMsV0FBbUIsRUFBRSxRQUFrQjtRQUMvQyxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUM7UUFFaEUsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUUvRCxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUUxQyxNQUFNLElBQUksR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxvQkFBb0I7UUFDdEUsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsd0JBQXdCO1FBQzVFLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUxQixPQUFPLEdBQUcsYUFBYSxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ3BDLENBQUM7K0dBbkJVLGtCQUFrQjs2R0FBbEIsa0JBQWtCOzs0RkFBbEIsa0JBQWtCO2tCQUg5QixJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxnQkFBZ0I7aUJBQ3ZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5jb25zdCBGSUxFX1NJWkVfVU5JVFMgPSBbJ0InLCAnS0InLCAnTUInLCAnR0InLCAnVEInLCAnUEInLCAnRUInLCAnWkInLCAnWUInXTtcbmNvbnN0IEZJTEVfU0laRV9VTklUU19MT05HID0gW1xuICAnQnl0ZXMnLFxuICAnS2lsb2J5dGVzJyxcbiAgJ01lZ2FieXRlcycsXG4gICdHaWdhYnl0ZXMnLFxuICAnUGV0dGFieXRlcycsXG4gICdFeGFieXRlcycsXG4gICdaZXR0YWJ5dGVzJyxcbiAgJ1lvdHRhYnl0ZXMnLFxuXTtcblxuQFBpcGUoe1xuICBuYW1lOiAnZm9ybWF0RmlsZVNpemUnLFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtYXRGaWxlU2l6ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGZpbGUgc2l6ZSBhcyB1c2VyIGZyaWVuZGx5IHN0cmluZy5cbiAgICogQHBhcmFtIHNpemVJbkJ5dGVzXG4gICAqIEBwYXJhbSBsb25nRm9ybVxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgdHJhbnNmb3JtKHNpemVJbkJ5dGVzOiBudW1iZXIsIGxvbmdGb3JtPzogYm9vbGVhbik6IHN0cmluZyB7XG4gICAgY29uc3QgdW5pdHMgPSBsb25nRm9ybSA/IEZJTEVfU0laRV9VTklUU19MT05HIDogRklMRV9TSVpFX1VOSVRTO1xuXG4gICAgbGV0IHBvd2VyID0gTWF0aC5yb3VuZChNYXRoLmxvZyhzaXplSW5CeXRlcykgLyBNYXRoLmxvZygxMDI0KSk7XG5cbiAgICBwb3dlciA9IE1hdGgubWluKHBvd2VyLCB1bml0cy5sZW5ndGggLSAxKTtcblxuICAgIGNvbnN0IHNpemUgPSBzaXplSW5CeXRlcyAvIE1hdGgucG93KDEwMjQsIHBvd2VyKTsgLy8gc2l6ZSBpbiBuZXcgdW5pdHNcbiAgICBjb25zdCBmb3JtYXR0ZWRTaXplID0gTWF0aC5yb3VuZChzaXplICogMTAwKSAvIDEwMDsgLy8ga2VlcCB1cCB0byAyIGRlY2ltYWxzXG4gICAgY29uc3QgdW5pdCA9IHVuaXRzW3Bvd2VyXTtcblxuICAgIHJldHVybiBgJHtmb3JtYXR0ZWRTaXplfSAke3VuaXR9YDtcbiAgfVxufVxuIl19