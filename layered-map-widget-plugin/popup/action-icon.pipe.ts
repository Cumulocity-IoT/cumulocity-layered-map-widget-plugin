import { Pipe, PipeTransform } from "@angular/core";
import { PopoverAction } from "../layered-map-widget.model";

@Pipe({
    name: 'actionIcon'
})
export class ActionIconPipe implements PipeTransform {
    transform(value: PopoverAction) {
        if (value.type === 'alarm') {
            return 'bell';
        } else if (value.type === 'event') {
            return 'c8y-icon c8y-icon-events';
        } else if (value.type === 'operation') {
            return 'c8y-icon c8y-icon-device-control'
        }
        return 'add'
    }
    
}