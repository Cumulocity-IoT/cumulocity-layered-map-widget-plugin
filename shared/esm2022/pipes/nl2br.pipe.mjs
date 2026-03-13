import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class Nl2brPipe {
    transform(value) {
        const regEx = /\n/g;
        return value.replace(regEx, '<br>');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: Nl2brPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "18.2.14", ngImport: i0, type: Nl2brPipe, name: "nl2br" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: Nl2brPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'nl2br',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmwyYnIucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9waXBlcy9ubDJici5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQUtwRCxNQUFNLE9BQU8sU0FBUztJQUNwQixTQUFTLENBQUMsS0FBYTtRQUNyQixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUM7UUFFcEIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDOytHQUxVLFNBQVM7NkdBQVQsU0FBUzs7NEZBQVQsU0FBUztrQkFIckIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsT0FBTztpQkFDZCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICBuYW1lOiAnbmwyYnInLFxufSlcbmV4cG9ydCBjbGFzcyBObDJiclBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHJlZ0V4ID0gL1xcbi9nO1xuXG4gICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UocmVnRXgsICc8YnI+Jyk7XG4gIH1cbn1cbiJdfQ==