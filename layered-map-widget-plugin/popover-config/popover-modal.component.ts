import { Component } from '@angular/core';
import { ModalLabels } from '@c8y/ngx-components';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { PopoverConfig } from '../layered-map-widget.model';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { SAMPLE_TEMPLATES_C8Y } from './editor/jsoneditor-samples';
import { clone, has } from 'lodash';

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
})
export class PopoverModalComponent {
  title = 'Popover config';
  closeSubject: Subject<PopoverConfig | null> = new Subject();
  labels: ModalLabels = { ok: 'Save', cancel: 'Cancel' };

  SAMPLE_TEMPLATES_C8Y = SAMPLE_TEMPLATES_C8Y;

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
  protected cfg: PopoverConfig = { showAlarms: true, showDate: true, actions: [] };

  isActionsFormCollapsed = true;
  jsonEditorData: object = clone(SAMPLE_TEMPLATES_C8Y.OPERATION);
  jsonErrorMessage?: string;

  constructor(public bsModalRef: BsModalRef) {}

  setConfig(cfg: PopoverConfig): void {
    this.cfg = cfg;
    const [dateField, iconField] = this.fields;
    dateField.defaultValue = cfg.showDate;
    iconField.defaultValue = cfg.showAlarms;
  }

  changeTab(tabId: Tab['id']): void {
    this.tabs.map((t) => {
      t.active = t.id === tabId;
    });
    this.currentTab = tabId;

    delete this.jsonErrorMessage;
    if (tabId === 'operation') {
      this.jsonEditorData = clone(SAMPLE_TEMPLATES_C8Y.OPERATION);
    } else if (tabId === 'alarm') {
      this.jsonEditorData = clone(SAMPLE_TEMPLATES_C8Y.ALARM);
    } else if (tabId === 'event') {
      this.jsonEditorData = clone(SAMPLE_TEMPLATES_C8Y.EVENT);
    }
  }

  onChange(text: string): void {
    let requiredAttributes: string[] = [];
    if (this.currentTab === 'event') {
      requiredAttributes = ['type', 'text'];
    } else if (this.currentTab === 'alarm') {
      requiredAttributes = ['type', 'text', 'severity'];
    }

    try {
      const json = JSON.parse(text);
      this.jsonErrorMessage = '';
      requiredAttributes.forEach((attribute) => {
        if (!has(json, attribute)) {
          this.jsonErrorMessage = this.jsonErrorMessage + `Parameter "${attribute}" required. `;
        }
      });
    } catch (e) {
      this.jsonErrorMessage = 'No valid JSON!';
    }
  }

  scroll(element: HTMLElement): void {
    element.scrollIntoView();
  }

  addAction(currentTab: Tab['id']) {
    this.cfg.actions.push({
      label: `Create ${currentTab}`,
      body: this.jsonEditorData,
      type: currentTab,
    });
    this.isActionsFormCollapsed = true;
  }

  removeAction(action: object): void {
    this.cfg.actions = this.cfg.actions.filter((a) => a !== action);
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
    this.closeSubject.next(this.cfg);
  }
}
