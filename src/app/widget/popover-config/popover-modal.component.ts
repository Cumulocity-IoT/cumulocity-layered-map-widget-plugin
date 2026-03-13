import { Component, Input } from '@angular/core';
import { CommonModule, CoreModule, ModalLabels } from '@c8y/ngx-components';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { PopoverConfig } from '../layered-map-widget.model';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DomainModelEditorComponent } from 'shared';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

interface Tab {
  id: 'operation' | 'alarm' | 'event';
  label: string;
  icon?: string;
  active?: boolean;
  disabled?: boolean;
}

@Component({
  templateUrl: './popover-modal.component.html',
  styleUrls: ['./popover-modal.component.less'],
  standalone: true,
  imports: [CoreModule, CommonModule, DomainModelEditorComponent, CollapseModule, TooltipModule],
})
export class PopoverModalComponent {
  title = 'Popover config';
  closeSubject: Subject<PopoverConfig | null> = new Subject();
  labels: ModalLabels = { ok: 'Save', cancel: 'Cancel' };
  json: Record<string, unknown>;

  @Input() set cfg(value: PopoverConfig) {
    if (value) {
      this.config = value;
      const [dateField, iconField] = this.fields;

      dateField.defaultValue = value.showDate;
      iconField.defaultValue = value.showAlarms;
    }
  }

  mode = 'operation';

  config: PopoverConfig = { showAlarms: true, showDate: true, actions: [] };

  tabs: Tab[] = [
    {
      id: 'alarm',
      label: 'Alarm',
      icon: 'dlt-c8y-icon-bell',
    },
    {
      id: 'event',
      label: 'Event',
      icon: 'c8y-icon c8y-icon-events',
    },
    {
      id: 'operation',
      label: 'Operation',
      icon: 'c8y-icon c8y-icon-device-control',
      active: true,
    },
  ];

  currentTab: Tab['id'] = this.tabs.find((t) => t.active)?.id ?? this.tabs[2].id;

  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [
    {
      key: 'showDate',
      templateOptions: {
        label: 'Show last update date',
      },
      type: 'checkbox',
      defaultValue: true,
    },
    {
      key: 'showAlarms',
      templateOptions: {
        label: 'Show alarm icons',
      },
      type: 'checkbox',
      defaultValue: true,
    },
  ];

  isActionsFormCollapsed = true;
  isEditorValid = false;

  constructor(public bsModalRef: BsModalRef) {}

  changeTab(tabId: Tab['id']): void {
    this.tabs.map((t) => {
      t.active = t.id === tabId;
    });
    this.currentTab = tabId;
  }

  onChange(text: string): void {
    this.json = JSON.parse(text) as Record<string, unknown>;
  }

  scroll(element: HTMLElement): void {
    element.scrollIntoView();
  }

  addAction(currentTab: Tab['id']) {
    this.config.actions.push({
      label: `Create ${currentTab}`,
      body: this.json,
      type: currentTab,
    });
    this.isActionsFormCollapsed = true;
  }

  removeAction(action: object): void {
    this.config.actions = this.config.actions.filter((a) => a !== action);
  }

  cancelAdd(): void {
    // TODO: reset the form
    this.isActionsFormCollapsed = true;
  }

  // - MODAL section

  // called if cancel is pressed
  onDismiss(): void {
    this.closeSubject.next(null);
  }

  // called if save is pressed
  onClose(): void {
    this.closeSubject.next(this.config);
  }
}
