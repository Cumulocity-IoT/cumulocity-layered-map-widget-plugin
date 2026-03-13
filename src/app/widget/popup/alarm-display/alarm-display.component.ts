import { Component, Input } from '@angular/core';
import { IManagedObject } from '@c8y/client';
import { CoreModule } from '@c8y/ngx-components';

@Component({
  selector: 'alarm-display',
  templateUrl: './alarm-display.component.html',
  standalone: true,
  imports: [CoreModule],
})
export class AlarmDisplayComponent {
  @Input() mo: IManagedObject | undefined;
}
