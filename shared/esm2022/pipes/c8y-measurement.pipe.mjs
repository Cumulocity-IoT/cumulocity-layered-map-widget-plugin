import { Pipe } from '@angular/core';
import { get, has } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@c8y/ngx-components";
export class C8yMeasurementPipe {
    constructor(number) {
        this.number = number;
    }
    transform(measurement, round, digitsInfo) {
        if (!measurement) {
            return '-';
        }
        const paths = this.detectMeasurementPaths(measurement);
        const l = paths.length;
        if (l === 0) {
            return '-';
        }
        else if (l === 1) {
            const m = get(measurement, paths[0]);
            let { value } = m;
            const unit = m.unit;
            if (!isNaN(+value)) {
                value = this.number.transform(value, round ?? 'ceil', digitsInfo ?? '1.1-2');
            }
            return unit?.length ? `${value} ${unit}` : `${value}`;
        }
        else {
            return `Found multiple measurements (${l}).`;
        }
    }
    detectMeasurementPaths(m) {
        const nope = ['id', 'type', 'time', 'self', 'source'];
        const result = [];
        const fragmentCandidates = Object.keys(m).filter((key) => !nope.includes(key));
        for (const key of fragmentCandidates) {
            const fragment = get(m, key);
            const nestedKeys = Object.keys(fragment);
            for (const nestedKey of nestedKeys) {
                if (has(fragment, `${nestedKey}.value`)) {
                    result.push(`${key}.${nestedKey}`);
                }
            }
        }
        return result;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: C8yMeasurementPipe, deps: [{ token: i1.NumberPipe }], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "18.2.14", ngImport: i0, type: C8yMeasurementPipe, name: "c8yMeasurement" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: C8yMeasurementPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'c8yMeasurement',
                }]
        }], ctorParameters: () => [{ type: i1.NumberPipe }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYzh5LW1lYXN1cmVtZW50LnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGlwZXMvYzh5LW1lYXN1cmVtZW50LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFcEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxRQUFRLENBQUM7OztBQU1sQyxNQUFNLE9BQU8sa0JBQWtCO0lBQzdCLFlBQW9CLE1BQWtCO1FBQWxCLFdBQU0sR0FBTixNQUFNLENBQVk7SUFBRyxDQUFDO0lBRTFDLFNBQVMsQ0FBQyxXQUF5QixFQUFFLEtBQXdCLEVBQUUsVUFBbUI7UUFDaEYsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2pCLE9BQU8sR0FBRyxDQUFDO1FBQ2IsQ0FBQztRQUNELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN2RCxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBRXZCLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ1osT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDO2FBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDbkIsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQThDLENBQUM7WUFDbEYsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNsQixNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBRXBCLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUNuQixLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEtBQUssSUFBSSxNQUFNLEVBQUUsVUFBVSxJQUFJLE9BQU8sQ0FBQyxDQUFDO1lBQy9FLENBQUM7WUFFRCxPQUFPLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDO1FBQ3hELENBQUM7YUFBTSxDQUFDO1lBQ04sT0FBTyxnQ0FBZ0MsQ0FBQyxJQUFJLENBQUM7UUFDL0MsQ0FBQztJQUNILENBQUM7SUFFTyxzQkFBc0IsQ0FBQyxDQUFlO1FBQzVDLE1BQU0sSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3RELE1BQU0sTUFBTSxHQUFhLEVBQUUsQ0FBQztRQUM1QixNQUFNLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUUvRSxLQUFLLE1BQU0sR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7WUFDckMsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQTRCLENBQUM7WUFDeEQsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUV6QyxLQUFLLE1BQU0sU0FBUyxJQUFJLFVBQVUsRUFBRSxDQUFDO2dCQUNuQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUUsR0FBRyxTQUFTLFFBQVEsQ0FBQyxFQUFFLENBQUM7b0JBQ3hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUMsQ0FBQztnQkFDckMsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzsrR0E1Q1Usa0JBQWtCOzZHQUFsQixrQkFBa0I7OzRGQUFsQixrQkFBa0I7a0JBSDlCLElBQUk7bUJBQUM7b0JBQ0osSUFBSSxFQUFFLGdCQUFnQjtpQkFDdkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJTWVhc3VyZW1lbnQgfSBmcm9tICdAYzh5L2NsaWVudCc7XG5pbXBvcnQgeyBnZXQsIGhhcyB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBOdW1iZXJQaXBlIH0gZnJvbSAnQGM4eS9uZ3gtY29tcG9uZW50cyc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2M4eU1lYXN1cmVtZW50Jyxcbn0pXG5leHBvcnQgY2xhc3MgQzh5TWVhc3VyZW1lbnRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbnVtYmVyOiBOdW1iZXJQaXBlKSB7fVxuXG4gIHRyYW5zZm9ybShtZWFzdXJlbWVudDogSU1lYXN1cmVtZW50LCByb3VuZD86ICdjZWlsJyB8ICdmbG9vcicsIGRpZ2l0c0luZm8/OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICghbWVhc3VyZW1lbnQpIHtcbiAgICAgIHJldHVybiAnLSc7XG4gICAgfVxuICAgIGNvbnN0IHBhdGhzID0gdGhpcy5kZXRlY3RNZWFzdXJlbWVudFBhdGhzKG1lYXN1cmVtZW50KTtcbiAgICBjb25zdCBsID0gcGF0aHMubGVuZ3RoO1xuXG4gICAgaWYgKGwgPT09IDApIHtcbiAgICAgIHJldHVybiAnLSc7XG4gICAgfSBlbHNlIGlmIChsID09PSAxKSB7XG4gICAgICBjb25zdCBtID0gZ2V0KG1lYXN1cmVtZW50LCBwYXRoc1swXSkgYXMgeyB2YWx1ZTogbnVtYmVyIHwgc3RyaW5nOyB1bml0Pzogc3RyaW5nIH07XG4gICAgICBsZXQgeyB2YWx1ZSB9ID0gbTtcbiAgICAgIGNvbnN0IHVuaXQgPSBtLnVuaXQ7XG5cbiAgICAgIGlmICghaXNOYU4oK3ZhbHVlKSkge1xuICAgICAgICB2YWx1ZSA9IHRoaXMubnVtYmVyLnRyYW5zZm9ybSh2YWx1ZSwgcm91bmQgPz8gJ2NlaWwnLCBkaWdpdHNJbmZvID8/ICcxLjEtMicpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdW5pdD8ubGVuZ3RoID8gYCR7dmFsdWV9ICR7dW5pdH1gIDogYCR7dmFsdWV9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGBGb3VuZCBtdWx0aXBsZSBtZWFzdXJlbWVudHMgKCR7bH0pLmA7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZXRlY3RNZWFzdXJlbWVudFBhdGhzKG06IElNZWFzdXJlbWVudCk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCBub3BlID0gWydpZCcsICd0eXBlJywgJ3RpbWUnLCAnc2VsZicsICdzb3VyY2UnXTtcbiAgICBjb25zdCByZXN1bHQ6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3QgZnJhZ21lbnRDYW5kaWRhdGVzID0gT2JqZWN0LmtleXMobSkuZmlsdGVyKChrZXkpID0+ICFub3BlLmluY2x1ZGVzKGtleSkpO1xuXG4gICAgZm9yIChjb25zdCBrZXkgb2YgZnJhZ21lbnRDYW5kaWRhdGVzKSB7XG4gICAgICBjb25zdCBmcmFnbWVudCA9IGdldChtLCBrZXkpIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICAgICAgY29uc3QgbmVzdGVkS2V5cyA9IE9iamVjdC5rZXlzKGZyYWdtZW50KTtcblxuICAgICAgZm9yIChjb25zdCBuZXN0ZWRLZXkgb2YgbmVzdGVkS2V5cykge1xuICAgICAgICBpZiAoaGFzKGZyYWdtZW50LCBgJHtuZXN0ZWRLZXl9LnZhbHVlYCkpIHtcbiAgICAgICAgICByZXN1bHQucHVzaChgJHtrZXl9LiR7bmVzdGVkS2V5fWApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIl19