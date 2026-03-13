import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class FilterPipe {
    transform(data, filterValue) {
        if (!filterValue || !filterValue.length) {
            return data;
        }
        const returnData = [];
        data.forEach((item) => {
            if (this.filterBy(item, filterValue)) {
                returnData.push(item);
            }
        });
        return returnData;
    }
    unify(value) {
        switch (typeof value) {
            case 'string':
                return value.toLocaleUpperCase();
            case 'number':
            case 'boolean':
                return value.toString();
            default:
                return '';
        }
    }
    filterBy(item, filter) {
        let check = true;
        filter.forEach((f) => {
            if (check === true) {
                check = check && this.unify(item[f.attr]).includes(this.unify(f.value));
            }
        });
        return check ? item : null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: FilterPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "18.2.14", ngImport: i0, type: FilterPipe, name: "filter" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: FilterPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'filter',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGlwZXMvZmlsdGVyLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBU3BELE1BQU0sT0FBTyxVQUFVO0lBQ3JCLFNBQVMsQ0FBSSxJQUFTLEVBQUUsV0FBOEI7UUFDcEQsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN4QyxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7UUFFRCxNQUFNLFVBQVUsR0FBUSxFQUFFLENBQUM7UUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3BCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLEVBQUUsQ0FBQztnQkFDckMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0lBRU8sS0FBSyxDQUFDLEtBQWM7UUFDMUIsUUFBUSxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ3JCLEtBQUssUUFBUTtnQkFDWCxPQUFPLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ25DLEtBQUssUUFBUSxDQUFDO1lBQ2QsS0FBSyxTQUFTO2dCQUNaLE9BQU8sS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzFCO2dCQUNFLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQztJQUNILENBQUM7SUFFTyxRQUFRLENBQUksSUFBTyxFQUFFLE1BQXlCO1FBQ3BELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztRQUVqQixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDbkIsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFLENBQUM7Z0JBQ25CLEtBQUssR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDMUUsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzdCLENBQUM7K0dBdkNVLFVBQVU7NkdBQVYsVUFBVTs7NEZBQVYsVUFBVTtrQkFIdEIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsUUFBUTtpQkFDZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBGaWx0ZXJQaXBlVmFsdWUge1xuICBhdHRyOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuO1xufVxuQFBpcGUoe1xuICBuYW1lOiAnZmlsdGVyJyxcbn0pXG5leHBvcnQgY2xhc3MgRmlsdGVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm08VD4oZGF0YTogVFtdLCBmaWx0ZXJWYWx1ZTogRmlsdGVyUGlwZVZhbHVlW10pOiBUW10ge1xuICAgIGlmICghZmlsdGVyVmFsdWUgfHwgIWZpbHRlclZhbHVlLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgY29uc3QgcmV0dXJuRGF0YTogVFtdID0gW107XG5cbiAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmICh0aGlzLmZpbHRlckJ5KGl0ZW0sIGZpbHRlclZhbHVlKSkge1xuICAgICAgICByZXR1cm5EYXRhLnB1c2goaXRlbSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmV0dXJuRGF0YTtcbiAgfVxuXG4gIHByaXZhdGUgdW5pZnkodmFsdWU6IHVua25vd24pOiBzdHJpbmcge1xuICAgIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICByZXR1cm4gdmFsdWUudG9Mb2NhbGVVcHBlckNhc2UoKTtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBmaWx0ZXJCeTxUPihpdGVtOiBULCBmaWx0ZXI6IEZpbHRlclBpcGVWYWx1ZVtdKTogVCB7XG4gICAgbGV0IGNoZWNrID0gdHJ1ZTtcblxuICAgIGZpbHRlci5mb3JFYWNoKChmKSA9PiB7XG4gICAgICBpZiAoY2hlY2sgPT09IHRydWUpIHtcbiAgICAgICAgY2hlY2sgPSBjaGVjayAmJiB0aGlzLnVuaWZ5KGl0ZW1bZi5hdHRyXSkuaW5jbHVkZXModGhpcy51bmlmeShmLnZhbHVlKSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY2hlY2sgPyBpdGVtIDogbnVsbDtcbiAgfVxufVxuIl19