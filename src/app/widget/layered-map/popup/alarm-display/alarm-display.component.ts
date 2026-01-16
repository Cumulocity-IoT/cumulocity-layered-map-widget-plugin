import { Component, Input } from '@angular/core';
import { IManagedObject } from '@c8y/client';

@Component({
  selector: 'alarm-display',
  templateUrl: './alarm-display.component.html',
  standalone: false
})
export class AlarmDisplayComponent {
  @Input() mo: IManagedObject | undefined;
}
