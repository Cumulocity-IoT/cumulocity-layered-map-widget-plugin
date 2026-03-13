import * as i0 from '@angular/core';
import { Component, Input, EventEmitter, Output, ViewChild, signal, effect, Pipe, Injectable } from '@angular/core';
import * as i1 from '@c8y/ngx-components';
import { CoreModule, gettext, CountdownIntervalComponent, MessagesComponent, FormGroupComponent, IconDirective, throttle, RealtimeService } from '@c8y/ngx-components';
import * as i3 from 'ngx-bootstrap/tooltip';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import * as i4 from '@angular/common';
import { Subject, Subscription, BehaviorSubject, combineLatest, from, Observable, merge, switchMap as switchMap$1, concatMap, map as map$1, filter as filter$1 } from 'rxjs';
import * as i1$1 from '@angular/forms';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntil, filter, tap, switchMap, map, startWith, shareReplay, pairwise } from 'rxjs/operators';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { EditorComponent, MonacoEditorMarkerValidatorDirective } from '@c8y/ngx-components/editor';
import { get, set, has, sortBy, debounce, invoke, uniqBy, uniq, isArray, isEmpty, isNil, cloneDeep } from 'lodash';
import { subMonths, subDays, startOfWeek, startOfDay, subMinutes } from 'date-fns';
import * as i4$1 from '@ngx-formly/core';
import * as i1$2 from '@c8y/client';
import { Severity, AlarmStatus, FetchClient, OperationStatus } from '@c8y/client';
import { __decorate } from 'tslib';
import { saveAs } from 'file-saver';

class AlarmIconComponent {
    constructor() {
        this.placement = 'right';
        this.display = 'severity';
    }
    set alarm(alarm) {
        this.severity = String(alarm.severity);
        this.status = String(alarm.status);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AlarmIconComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AlarmIconComponent, isStandalone: true, selector: "c8y-alarm-icon", inputs: { placement: "placement", display: "display", severity: "severity", status: "status", alarm: "alarm" }, ngImport: i0, template: "<ng-container *ngIf=\"severity && display === 'severity'\">\n  <ng-container [ngSwitch]=\"severity\">\n    <ng-container *ngSwitchCase=\"'CRITICAL'\">\n      <i c8yIcon=\"warning\" class=\"status critical\" container=\"body\" [tooltip]=\"'CRITICAL' | translate\" [placement]=\"placement\"></i>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"'MAJOR'\">\n      <i c8yIcon=\"exclamation-circle\" class=\"status major\" container=\"body\" [tooltip]=\"'MAJOR' | translate\" [placement]=\"placement\"></i>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"'MINOR'\">\n      <i c8yIcon=\"exclamation-circle\" class=\"status minor\" container=\"body\" [tooltip]=\"'MINOR' | translate\" [placement]=\"placement\"></i>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"'WARNING'\">\n      <i c8yIcon=\"circle\" class=\"status warning\" container=\"body\" [tooltip]=\"'WARNING' | translate\" [placement]=\"placement\"></i>\n    </ng-container>\n  </ng-container>\n</ng-container>\n\n<ng-container *ngIf=\"status && display === 'status'\">\n  <ng-container [ngSwitch]=\"status\">\n    <ng-container *ngSwitchCase=\"'ACTIVE'\">\n      <i c8yIcon=\"bell\" class=\"status active\" container=\"body\" [tooltip]=\"'ACTIVE' | translate\" [placement]=\"placement\"> </i>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"'ACKNOWLEDGED'\">\n      <i c8yIcon=\"bell-slash\" class=\"status acknowledged\" container=\"body\" [tooltip]=\"'ACKNOWLEDGED' | translate\" [placement]=\"placement\"> </i>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"'CLEARED'\">\n      <i c8yIcon=\"check-circle\" class=\"text-muted\" container=\"body\" [tooltip]=\"'CLEARED' | translate\" [placement]=\"placement\"> </i>\n    </ng-container>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CoreModule }, { kind: "directive", type: i1.IconDirective, selector: "[c8yIcon]", inputs: ["c8yIcon"] }, { kind: "pipe", type: i1.C8yTranslatePipe, name: "translate" }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i4.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "ngmodule", type: TooltipModule }, { kind: "directive", type: i3.TooltipDirective, selector: "[tooltip], [tooltipHtml]", inputs: ["adaptivePosition", "tooltip", "placement", "triggers", "container", "containerClass", "boundariesElement", "isOpen", "isDisabled", "delay", "tooltipHtml", "tooltipPlacement", "tooltipIsOpen", "tooltipEnable", "tooltipAppendToBody", "tooltipAnimation", "tooltipClass", "tooltipContext", "tooltipPopupDelay", "tooltipFadeDuration", "tooltipTrigger"], outputs: ["tooltipChange", "onShown", "onHidden", "tooltipStateChanged"], exportAs: ["bs-tooltip"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AlarmIconComponent, decorators: [{
            type: Component,
            args: [{ selector: 'c8y-alarm-icon', standalone: true, imports: [CoreModule, TooltipModule], template: "<ng-container *ngIf=\"severity && display === 'severity'\">\n  <ng-container [ngSwitch]=\"severity\">\n    <ng-container *ngSwitchCase=\"'CRITICAL'\">\n      <i c8yIcon=\"warning\" class=\"status critical\" container=\"body\" [tooltip]=\"'CRITICAL' | translate\" [placement]=\"placement\"></i>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"'MAJOR'\">\n      <i c8yIcon=\"exclamation-circle\" class=\"status major\" container=\"body\" [tooltip]=\"'MAJOR' | translate\" [placement]=\"placement\"></i>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"'MINOR'\">\n      <i c8yIcon=\"exclamation-circle\" class=\"status minor\" container=\"body\" [tooltip]=\"'MINOR' | translate\" [placement]=\"placement\"></i>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"'WARNING'\">\n      <i c8yIcon=\"circle\" class=\"status warning\" container=\"body\" [tooltip]=\"'WARNING' | translate\" [placement]=\"placement\"></i>\n    </ng-container>\n  </ng-container>\n</ng-container>\n\n<ng-container *ngIf=\"status && display === 'status'\">\n  <ng-container [ngSwitch]=\"status\">\n    <ng-container *ngSwitchCase=\"'ACTIVE'\">\n      <i c8yIcon=\"bell\" class=\"status active\" container=\"body\" [tooltip]=\"'ACTIVE' | translate\" [placement]=\"placement\"> </i>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"'ACKNOWLEDGED'\">\n      <i c8yIcon=\"bell-slash\" class=\"status acknowledged\" container=\"body\" [tooltip]=\"'ACKNOWLEDGED' | translate\" [placement]=\"placement\"> </i>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"'CLEARED'\">\n      <i c8yIcon=\"check-circle\" class=\"text-muted\" container=\"body\" [tooltip]=\"'CLEARED' | translate\" [placement]=\"placement\"> </i>\n    </ng-container>\n  </ng-container>\n</ng-container>\n" }]
        }], propDecorators: { placement: [{
                type: Input
            }], display: [{
                type: Input
            }], severity: [{
                type: Input
            }], status: [{
                type: Input
            }], alarm: [{
                type: Input
            }] } });

class PSAutoRefreshComponent {
    /**
     * * Set the value of `isIntervalEnabled` in response to user interactions with the alarm list scroll.
     *  *
     *  * This input setter allows you to control the `isIntervalEnabled` property, which is used to manage the state
     *  * of a toggle button. When a user scrolls through the alarms list, you can update the `isIntervalEnabled` value
     *  * using this setter.
     *  *
     *  * @param value - A boolean value representing the new state of the `isIntervalEnabled` property.
     *  *   - `true` indicates that the interval is enabled.
     *  *   - `false` indicates that the interval is disabled.
     */
    set isIntervalToggleEnabled(value) {
        const shouldSetInterval = this.isIntervalToggleEnabled || this.doesUserCheckedIntervalToggle;
        const shouldToggleInterval = this.isIntervalToggleEnabled && this.doesUserCheckedIntervalToggle && value;
        const intervalToggleControl = this.toggleIntervalForm.get('intervalToggle');
        /**
         * We check if any interactions to toggle interval button were made.
         * When user interacts with toggle button, we need to ignore assigning value to the form.
         */
        if (intervalToggleControl.dirty && !shouldSetInterval) {
            return;
        }
        /**
         * This condition checks if the interval toggle is enabled and if there has been user interaction,
         * and if the provided value is truthy.
         * If all conditions are met, the interval toggle should not be updated due to unnecessary update of countdown interval component
         */
        if (shouldToggleInterval) {
            return;
        }
        intervalToggleControl.setValue(value);
    }
    /**
     * This getter allows you to access the current state of the `isIntervalEnabled` property, which reflects
     * the state of a toggle button. It retrieves the value from the associated form control, providing the
     * current state of the toggle button.
     */
    get isIntervalToggleEnabled() {
        return this.toggleIntervalForm.get('intervalToggle').value;
    }
    constructor(fb) {
        this.fb = fb;
        this.refreshIntervalsInMilliseconds = [5_000, 10_000, 15_000, 30_000, 60_000];
        this.DISABLE_AUTO_REFRESH = gettext('Disable auto refresh');
        this.ENABLE_AUTO_REFRESH = gettext('Enable auto refresh');
        this.SECONDS_UNTIL_REFRESH = gettext('{{ seconds }} s');
        /**
         * Event emitter for notifying when a countdown timer has completed.
         */
        this.onCountdownEnded = new EventEmitter();
        this.toggleIntervalForm = this.initForm();
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.listenToRefreshIntervalChange();
    }
    ngAfterViewInit() {
        this.onIntervalToggleChange();
        this.listenOnLoadingChanges();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    resetCountdown() {
        this.countdownIntervalComponent?.reset();
    }
    trackUserClickOnIntervalToggle(target) {
        this.doesUserCheckedIntervalToggle = target.checked;
    }
    startCountdown() {
        this.countdownIntervalComponent.start();
    }
    onIntervalToggleChange() {
        this.toggleIntervalForm
            .get('intervalToggle')
            .valueChanges.pipe(takeUntil(this.destroy$), filter(Boolean))
            .subscribe(() => setTimeout(() => this.startCountdown()));
    }
    initForm() {
        return this.fb.group({
            intervalToggle: true,
            refreshInterval: 30_000,
        });
    }
    listenToRefreshIntervalChange() {
        this.toggleIntervalForm
            .get('refreshInterval')
            .valueChanges.pipe(takeUntil(this.destroy$))
            .subscribe(() => this.resetCountdown());
    }
    listenOnLoadingChanges() {
        this.isLoading$.pipe(tap(() => this.countdownIntervalComponent?.stop())).subscribe((state) => {
            if (!state) {
                this.countdownIntervalComponent?.reset();
            }
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: PSAutoRefreshComponent, deps: [{ token: i1$1.FormBuilder }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: PSAutoRefreshComponent, isStandalone: true, selector: "ps-auto-refresh", inputs: { isLoading$: "isLoading$", isIntervalToggleEnabled: "isIntervalToggleEnabled" }, outputs: { onCountdownEnded: "onCountdownEnded" }, viewQueries: [{ propertyName: "countdownIntervalComponent", first: true, predicate: CountdownIntervalComponent, descendants: true }], ngImport: i0, template: "<form\n  class=\"d-flex a-i-center fit-w fit-h\"\n  [formGroup]=\"toggleIntervalForm\"\n>\n  <label class=\"m-b-0 m-r-8 text-normal text-muted flex-no-shrink\">\n    {{ 'Auto refresh' | translate }}\n  </label>\n  <div class=\"input-group\">\n    <label\n      class=\"toggle-countdown\"\n      [attr.aria-label]=\"\n        (isIntervalToggleEnabled ? DISABLE_AUTO_REFRESH : ENABLE_AUTO_REFRESH) | translate\n      \"\n      [tooltip]=\"(isIntervalToggleEnabled ? DISABLE_AUTO_REFRESH : ENABLE_AUTO_REFRESH) | translate\"\n      placement=\"bottom\"\n      [adaptivePosition]=\"false\"\n      [delay]=\"500\"\n    >\n      <input\n        type=\"checkbox\"\n        data-cy=\"c8y-alarms-interval-toggle\"\n        formControlName=\"intervalToggle\"\n        (click)=\"trackUserClickOnIntervalToggle($event.target)\"\n      />\n      <c8y-countdown-interval\n        *ngIf=\"isIntervalToggleEnabled\"\n        [countdownInterval]=\"toggleIntervalForm.value.refreshInterval\"\n        (countdownEnded)=\"onCountdownEnded.emit()\"\n      ></c8y-countdown-interval>\n      <i\n        c8yIcon=\"pause\"\n        *ngIf=\"!isIntervalToggleEnabled\"\n      ></i>\n    </label>\n    <div class=\"c8y-select-wrapper\">\n      <select\n        class=\"form-control text-12\"\n        [attr.aria-label]=\"'Refresh interval in seconds' | translate\"\n        [tooltip]=\"'Refresh interval in seconds' | translate\"\n        placement=\"bottom\"\n        [adaptivePosition]=\"false\"\n        [delay]=\"500\"\n        [container]=\"'body'\"\n        formControlName=\"refreshInterval\"\n        data-cy=\"c8y-alarms-interval-selector\"\n      >\n        <option\n          *ngFor=\"let refreshInterval of refreshIntervalsInMilliseconds\"\n          [ngValue]=\"refreshInterval\"\n        >\n          {{ SECONDS_UNTIL_REFRESH | translate: { seconds: refreshInterval / 1000 } }}\n        </option>\n      </select>\n      <span></span>\n    </div>\n    <div class=\"input-group-btn\">\n      <button\n        class=\"btn btn-default\"\n        style=\"border-left: 0\"\n        [attr.aria-label]=\"'Refresh' | translate\"\n        [tooltip]=\"'Refresh' | translate\"\n        placement=\"bottom\"\n        type=\"button\"\n        [adaptivePosition]=\"false\"\n        [delay]=\"500\"\n        [disabled]=\"isLoading$ | async\"\n        (click)=\"onCountdownEnded.emit()\"\n        data-cy=\"c8y-alarms-reload-button\"\n      >\n        <i\n          c8yIcon=\"refresh\"\n          [ngClass]=\"{ 'icon-spin': isLoading$ | async }\"\n        ></i>\n      </button>\n    </div>\n  </div>\n</form>\n", dependencies: [{ kind: "ngmodule", type: PopoverModule }, { kind: "ngmodule", type: TooltipModule }, { kind: "directive", type: i3.TooltipDirective, selector: "[tooltip], [tooltipHtml]", inputs: ["adaptivePosition", "tooltip", "placement", "triggers", "container", "containerClass", "boundariesElement", "isOpen", "isDisabled", "delay", "tooltipHtml", "tooltipPlacement", "tooltipIsOpen", "tooltipEnable", "tooltipAppendToBody", "tooltipAnimation", "tooltipClass", "tooltipContext", "tooltipPopupDelay", "tooltipFadeDuration", "tooltipTrigger"], outputs: ["tooltipChange", "onShown", "onHidden", "tooltipStateChanged"], exportAs: ["bs-tooltip"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1$1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1$1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1$1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1$1.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i1$1.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "ngmodule", type: CoreModule }, { kind: "directive", type: i1.IconDirective, selector: "[c8yIcon]", inputs: ["c8yIcon"] }, { kind: "pipe", type: i1.C8yTranslatePipe, name: "translate" }, { kind: "directive", type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "directive", type: i1.RequiredInputPlaceholderDirective, selector: "input[required], input[formControlName]" }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i1.CountdownIntervalComponent, selector: "c8y-countdown-interval", inputs: ["countdownInterval"], outputs: ["countdownEnded"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: PSAutoRefreshComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ps-auto-refresh', standalone: true, imports: [PopoverModule, TooltipModule, FormsModule, CoreModule], template: "<form\n  class=\"d-flex a-i-center fit-w fit-h\"\n  [formGroup]=\"toggleIntervalForm\"\n>\n  <label class=\"m-b-0 m-r-8 text-normal text-muted flex-no-shrink\">\n    {{ 'Auto refresh' | translate }}\n  </label>\n  <div class=\"input-group\">\n    <label\n      class=\"toggle-countdown\"\n      [attr.aria-label]=\"\n        (isIntervalToggleEnabled ? DISABLE_AUTO_REFRESH : ENABLE_AUTO_REFRESH) | translate\n      \"\n      [tooltip]=\"(isIntervalToggleEnabled ? DISABLE_AUTO_REFRESH : ENABLE_AUTO_REFRESH) | translate\"\n      placement=\"bottom\"\n      [adaptivePosition]=\"false\"\n      [delay]=\"500\"\n    >\n      <input\n        type=\"checkbox\"\n        data-cy=\"c8y-alarms-interval-toggle\"\n        formControlName=\"intervalToggle\"\n        (click)=\"trackUserClickOnIntervalToggle($event.target)\"\n      />\n      <c8y-countdown-interval\n        *ngIf=\"isIntervalToggleEnabled\"\n        [countdownInterval]=\"toggleIntervalForm.value.refreshInterval\"\n        (countdownEnded)=\"onCountdownEnded.emit()\"\n      ></c8y-countdown-interval>\n      <i\n        c8yIcon=\"pause\"\n        *ngIf=\"!isIntervalToggleEnabled\"\n      ></i>\n    </label>\n    <div class=\"c8y-select-wrapper\">\n      <select\n        class=\"form-control text-12\"\n        [attr.aria-label]=\"'Refresh interval in seconds' | translate\"\n        [tooltip]=\"'Refresh interval in seconds' | translate\"\n        placement=\"bottom\"\n        [adaptivePosition]=\"false\"\n        [delay]=\"500\"\n        [container]=\"'body'\"\n        formControlName=\"refreshInterval\"\n        data-cy=\"c8y-alarms-interval-selector\"\n      >\n        <option\n          *ngFor=\"let refreshInterval of refreshIntervalsInMilliseconds\"\n          [ngValue]=\"refreshInterval\"\n        >\n          {{ SECONDS_UNTIL_REFRESH | translate: { seconds: refreshInterval / 1000 } }}\n        </option>\n      </select>\n      <span></span>\n    </div>\n    <div class=\"input-group-btn\">\n      <button\n        class=\"btn btn-default\"\n        style=\"border-left: 0\"\n        [attr.aria-label]=\"'Refresh' | translate\"\n        [tooltip]=\"'Refresh' | translate\"\n        placement=\"bottom\"\n        type=\"button\"\n        [adaptivePosition]=\"false\"\n        [delay]=\"500\"\n        [disabled]=\"isLoading$ | async\"\n        (click)=\"onCountdownEnded.emit()\"\n        data-cy=\"c8y-alarms-reload-button\"\n      >\n        <i\n          c8yIcon=\"refresh\"\n          [ngClass]=\"{ 'icon-spin': isLoading$ | async }\"\n        ></i>\n      </button>\n    </div>\n  </div>\n</form>\n" }]
        }], ctorParameters: () => [{ type: i1$1.FormBuilder }], propDecorators: { isLoading$: [{
                type: Input
            }], isIntervalToggleEnabled: [{
                type: Input
            }], onCountdownEnded: [{
                type: Output
            }], countdownIntervalComponent: [{
                type: ViewChild,
                args: [CountdownIntervalComponent]
            }] } });

const DOMAIN_MODEL_TEMPLATES_C8Y = {
    ALARM: {
        type: 'c8y_TestAlarm',
        text: 'This is a new test alarm!',
        severity: 'MAJOR',
    },
    EVENT: {
        text: 'This is a new test event.',
        type: 'c8y_TestEvent',
    },
    OPERATION: {
        description: 'New camera operation!',
        type: 'maker_Vibration_Sensor',
    },
};

const OPERATION_SCHEMA = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'IOperation',
    type: 'object',
    required: [],
    properties: {
        id: {
            description: 'Identifier for operation',
            type: ['string', 'number'],
        },
        deviceId: {
            type: 'string',
            description: 'Identifies the target device on which this operation should be performed',
        },
        status: {
            description: 'Status of operation, see [[OperationStatus]]',
            allOf: [
                {
                    $ref: '#/definitions/OperationStatus',
                },
            ],
        },
    },
    additionalProperties: true,
    definitions: {
        OperationStatus: {
            description: 'Placeholder for OperationStatus enum or type',
            type: 'string',
        },
    },
};

const ALARM_SCHEMA = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'IAlarm',
    type: 'object',
    required: ['severity', 'type', 'time', 'text'],
    properties: {
        severity: {
            description: 'Specifies the severity of an alarm',
            allOf: [
                {
                    $ref: '#/definitions/SeverityType',
                },
            ],
        },
        source: {
            description: 'Specifies which device has the alarm',
            allOf: [
                {
                    $ref: '#/definitions/ISource',
                },
            ],
        },
        type: {
            type: 'string',
            description: 'Type of the alarm',
        },
        time: {
            type: 'string',
            description: 'Time when the alarm occurred',
            format: 'date-time',
        },
        text: {
            type: 'string',
            description: 'Alarm text',
        },
        id: {
            description: 'Identifier of the alarm',
            type: ['string', 'number'],
        },
        status: {
            description: 'Current status of the alarm',
            allOf: [
                {
                    $ref: '#/definitions/AlarmStatusType',
                },
            ],
        },
        count: {
            type: 'number',
            description: 'How many times the same alarm appeared',
        },
        name: {
            type: 'string',
            description: 'Name of the alarm',
        },
        history: {
            type: 'object',
            description: 'Object with audit records as array',
        },
        self: {
            type: 'string',
            description: 'Self link to the alarm',
        },
        creationTime: {
            type: 'string',
            description: 'When was the alarm created as first instance',
            format: 'date-time',
        },
        firstOccurrenceTime: {
            type: 'string',
            description: 'The time when the alarm first occurred',
            format: 'date-time',
        },
    },
    additionalProperties: true,
    definitions: {
        SeverityType: {
            type: 'string',
            enum: ['CRITICAL', 'MAJOR', 'MINOR', 'WARNING'],
        },
        AlarmStatusType: {
            type: 'string',
            enum: ['ACKNOWLEDGED', 'CLEARED', 'ACTIVE'],
        },
        ISource: {
            type: 'object',
            description: 'Placeholder for ISource definition',
        },
    },
};

const EVENT_SCHEMA = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'IEvent',
    type: 'object',
    required: ['type', 'time', 'text'],
    properties: {
        source: {
            description: 'The ManagedObject that the event originated from, see [[ISource]]',
            allOf: [
                {
                    $ref: '#/definitions/ISource',
                },
            ],
        },
        type: {
            type: 'string',
            description: 'Identifies the type of this event',
        },
        time: {
            type: 'string',
            description: 'Time of the event',
            format: 'date-time',
        },
        text: {
            type: 'string',
            description: 'Text description of the event',
        },
        id: {
            description: 'Uniquely identifies an event',
            type: ['string', 'number'],
        },
        self: {
            type: 'string',
            description: 'Link to this resource',
            format: 'uri',
        },
        creationTime: {
            type: 'string',
            description: 'Time when event was created in the database',
            format: 'date-time',
        },
    },
    additionalProperties: true,
    definitions: {
        ISource: {
            type: 'object',
            description: 'Placeholder for ISource definition',
            required: ['id'],
            properties: {
                id: {
                    type: 'string',
                },
                name: {
                    type: 'string',
                },
                self: {
                    type: 'string',
                    format: 'uri',
                },
            },
        },
    },
};

class DomainModelEditorComponent {
    constructor() {
        this.domainModel = 'operation';
        this.valueChange = new EventEmitter();
        this.isValidChange = new EventEmitter();
        this.code = signal('');
        this.form = new FormGroup({ jsonEditor: new FormControl('') });
        this.options = {
            hover: {
                above: false,
            },
        };
        effect(() => {
            const value = this.code();
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.notifyIfValid(value); // emit after 200ms of inactivity
            }, 200);
        });
    }
    updateCode(value) {
        this.code.set(value);
    }
    ngOnInit() {
        let json;
        try {
            json = JSON.parse(this.value);
        }
        catch {
            json = undefined;
        }
        if (!json) {
            json = this.getDefaultJSONForDomainModel();
        }
        const jsonStr = JSON.stringify(json, // { deviceId: this.deviceId, [this.supportedOperation]: { example: '{{test}}' } }
        undefined, 2);
        this.form = new FormGroup({
            jsonEditor: new FormControl(jsonStr),
        });
        this.notifyIfValid(jsonStr);
    }
    ngOnChanges(changes) {
        if (changes['domainModel'] && !changes['domainModel'].firstChange) {
            const previous = changes['domainModel'].previousValue;
            const current = changes['domainModel'].currentValue;
            if (previous !== current) {
                const json = this.getDefaultJSONForDomainModel();
                const jsonStr = JSON.stringify(json, undefined, 2);
                this.form?.get('jsonEditor')?.setValue(jsonStr, { emitEvent: false });
                setTimeout(() => this.assignSchema());
            }
        }
    }
    assignSchema() {
        console.warn('Assigning schema for domain model: ' + this.domainModel);
        if (this.domainModel === 'json') {
            return;
        }
        let schema = {};
        if (this.domainModel === 'operation') {
            schema = OPERATION_SCHEMA;
        }
        else if (this.domainModel === 'alarm') {
            schema = ALARM_SCHEMA;
        }
        else if (this.domainModel === 'event') {
            schema = EVENT_SCHEMA;
        }
        this.editorComponent.monaco?.json?.jsonDefaults?.setDiagnosticsOptions({
            validate: true,
            schemas: [{ schema, fileMatch: ['*'], uri: 'editor-json-sample' }],
            enableSchemaRequest: false,
            allowComments: false,
        });
    }
    notifyIfValid(value) {
        if (value?.length && this.form.valid) {
            try {
                JSON.parse(value);
                this.valueChange.emit(value);
                this.isValidChange.emit(true);
                return;
            }
            catch (e) {
                console.warn('JSON parse failed for value: ' + value, e);
            }
        }
        this.isValidChange.emit(false);
    }
    getDefaultJSONForDomainModel() {
        if (this.domainModel === 'operation') {
            return DOMAIN_MODEL_TEMPLATES_C8Y.OPERATION;
        }
        else if (this.domainModel === 'alarm') {
            return DOMAIN_MODEL_TEMPLATES_C8Y.ALARM;
        }
        else if (this.domainModel === 'event') {
            return DOMAIN_MODEL_TEMPLATES_C8Y.EVENT;
        }
        else {
            return {};
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DomainModelEditorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: DomainModelEditorComponent, isStandalone: true, selector: "domain-model-editor", inputs: { domainModel: "domainModel", value: "value" }, outputs: { valueChange: "valueChange", isValidChange: "isValidChange" }, viewQueries: [{ propertyName: "editorComponent", first: true, predicate: EditorComponent, descendants: true }], usesOnChanges: true, ngImport: i0, template: "<form [formGroup]=\"form\" class=\"d-contents\">\n  <c8y-form-group class=\"d-col fit-h m-b-4\">\n    <label for=\"jsonEditor\" translate>{{ domainModel | humanize }} body</label>\n    <c8y-editor\n      class=\"flex-grow\"\n      name=\"jsonEditor\"\n      [formControlName]=\"'jsonEditor'\"\n      (editorInit)=\"assignSchema()\"\n      (ngModelChange)=\"updateCode($event)\"\n      [editorOptions]=\"options\"\n      monacoEditorMarkerValidator\n    ></c8y-editor>\n    <c8y-messages [helpMessage]=\"''\"></c8y-messages>\n  </c8y-form-group>\n\n  @if (form.valid) {\n    <p class=\"d-flex a-i-center\">\n      <i class=\"dlt-c8y-icon-ok text-success icon-20 m-r-4\"></i> Form is valid.\n    </p>\n  } @else {\n    <p class=\"d-flex a-i-center\">\n      <i class=\"dlt-c8y-icon-exclamation-circle text-danger icon-20 m-r-4\"></i> Form is invalid.\n    </p>\n  }\n</form>\n", dependencies: [{ kind: "ngmodule", type: CoreModule }, { kind: "directive", type: i1.C8yTranslateDirective, selector: "[translate],[ngx-translate]" }, { kind: "pipe", type: i1.HumanizePipe, name: "humanize" }, { kind: "directive", type: i1$1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "component", type: i1.FormGroupComponent, selector: "c8y-form-group", inputs: ["hasError", "hasWarning", "hasSuccess", "novalidation", "status"] }, { kind: "component", type: i1.MessagesComponent, selector: "c8y-messages", inputs: ["show", "defaults", "helpMessage"] }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: EditorComponent, selector: "c8y-editor", inputs: ["editorOptions"], outputs: ["editorInit"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: MonacoEditorMarkerValidatorDirective, selector: "c8y-editor [monacoEditorMarkerValidator]" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DomainModelEditorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'domain-model-editor', standalone: true, imports: [
                        CoreModule,
                        EditorComponent,
                        MessagesComponent,
                        FormGroupComponent,
                        ReactiveFormsModule,
                        MonacoEditorMarkerValidatorDirective,
                    ], template: "<form [formGroup]=\"form\" class=\"d-contents\">\n  <c8y-form-group class=\"d-col fit-h m-b-4\">\n    <label for=\"jsonEditor\" translate>{{ domainModel | humanize }} body</label>\n    <c8y-editor\n      class=\"flex-grow\"\n      name=\"jsonEditor\"\n      [formControlName]=\"'jsonEditor'\"\n      (editorInit)=\"assignSchema()\"\n      (ngModelChange)=\"updateCode($event)\"\n      [editorOptions]=\"options\"\n      monacoEditorMarkerValidator\n    ></c8y-editor>\n    <c8y-messages [helpMessage]=\"''\"></c8y-messages>\n  </c8y-form-group>\n\n  @if (form.valid) {\n    <p class=\"d-flex a-i-center\">\n      <i class=\"dlt-c8y-icon-ok text-success icon-20 m-r-4\"></i> Form is valid.\n    </p>\n  } @else {\n    <p class=\"d-flex a-i-center\">\n      <i class=\"dlt-c8y-icon-exclamation-circle text-danger icon-20 m-r-4\"></i> Form is invalid.\n    </p>\n  }\n</form>\n" }]
        }], ctorParameters: () => [], propDecorators: { domainModel: [{
                type: Input
            }], value: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], isValidChange: [{
                type: Output
            }], editorComponent: [{
                type: ViewChild,
                args: [EditorComponent]
            }] } });

/**
 * Type guard to check whether a string matches a supported date preset.
 */
function isFormlyDateValue(value) {
    return ['today', 'now', 'this-week', 'week-ago', 'this-month', 'month-ago'].includes(value);
}
/**
 * Shared select options for date-based query blocks.
 */
const DATE_OPTIONS = [
    { value: 'today', label: 'Today' },
    { value: 'now', label: 'Now' },
    { value: 'this-week', label: 'This week' },
    { value: 'week-ago', label: 'A week ago' },
    { value: 'this-month', label: 'This month' },
    { value: 'month-ago', label: 'A month ago' },
];
/**
 * Creates a Formly "from" date select block with a default of `today`.
 */
function getDateFromBlock(meta) {
    return {
        key: meta.key,
        type: 'select',
        defaultValue: 'today',
        templateOptions: {
            label: meta.label,
            description: meta.description,
            options: [...DATE_OPTIONS],
        },
    };
}
/**
 * Creates a Formly "to" date select block with a default of `now`.
 */
function getDateToBlock(meta) {
    return {
        key: meta.key,
        type: 'select',
        defaultValue: 'now',
        templateOptions: {
            label: meta.label,
            description: meta.description,
            options: [...DATE_OPTIONS],
        },
    };
}
/**
 * Creates a Formly text input block for free-form query values.
 */
function getTextInputBlock(meta) {
    return {
        key: meta.key,
        type: 'input',
        templateOptions: {
            label: meta.label,
            placeholder: meta.placeholder ?? '',
            description: meta.description,
        },
    };
}
/**
 * Converts a relative date preset into an absolute date value.
 */
function getDateFromValue(value) {
    const currentDate = new Date();
    switch (value) {
        case 'today':
            return startOfDay(currentDate);
        case 'now':
            return currentDate;
        case 'this-week': {
            const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
            return startOfDay(startOfCurrentWeek);
        }
        case 'week-ago':
            return subDays(currentDate, 7);
        case 'this-month':
            return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        case 'month-ago':
            return subMonths(currentDate, 1);
        default:
            throw new Error('Invalid value provided.');
    }
}
/**
 * Replaces supported date presets in an object with ISO timestamp strings.
 */
function normalizeQueryFilter(params) {
    for (const key of Object.keys(params)) {
        const value = get(params, key);
        if (isFormlyDateValue(value)) {
            set(params, key, getDateFromValue(value).toISOString());
        }
    }
    return params;
}

class DynamicQueryFormComponent {
    constructor() {
        this.selectedFilters = [];
        this.form = new FormGroup({});
        this.fields = [];
        this.filter = {};
        this.params = [];
    }
    ngAfterViewInit() {
        const fields = [];
        for (const title of Object.keys(this.filter)) {
            const match = this.params.find((p) => p.key === title);
            if (match) {
                this.selectedFilters.push(match.key.toString());
                fields.push(match);
            }
        }
        this.fields = fields;
    }
    getIcon(b) {
        const key = b.key?.toString();
        if (key?.includes('date') || key?.includes('created')) {
            return 'calendar-1';
        }
        if (b.type == 'select' || b.type == 'checkbox') {
            return 'radio-button-on';
        }
        else if (b.type === 'input') {
            return 'text-input';
        }
        // if (b.type === 'date') {
        //   return 'calendar-1';
        // }
        return '';
    }
    queryParamClick(key) {
        // const properties = <any>this.fields;
        if (this.selectedFilters.some((f) => f === key)) {
            this.selectedFilters = this.selectedFilters.filter((f) => f !== key);
            // delete properties[b.key!];
            delete this.filter[key];
            this.fields = this.fields.filter((f) => f.key !== key);
        }
        else {
            // set(<any>this.fields, b.key, b);
            const param = this.params.find((p) => p.key === key);
            if (param) {
                this.fields = [...this.fields, param];
                this.selectedFilters.push(key);
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DynamicQueryFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: DynamicQueryFormComponent, isStandalone: true, selector: "ps-dynamic-query-form", inputs: { filter: "filter", params: "params" }, ngImport: i0, template: `<form class="card" [formGroup]="form">
    <div class="card-header">
      <h4 class="card-title">Query filter</h4>
    </div>
    <div class="card-block">
      @for (p of params; track p.key) {
        <button
          class="btn btn-default btn-icon btn-sm m-t-8 m-l-0 m-r-8"
          [ngClass]="selectedFilters.includes(p.key!.toString()) ? 'active' : ''"
          (click)="queryParamClick(p.key!.toString())"
        >
          <i [c8yIcon]="getIcon(p)"></i>
          {{ p.key }}
        </button>
      }

      <div class="form-group m-t-16">
        <formly-form [form]="form" [fields]="fields" [model]="filter"></formly-form>
      </div>

      <ng-content></ng-content>
    </div>
  </form>`, isInline: true, dependencies: [{ kind: "ngmodule", type: CoreModule }, { kind: "directive", type: i1.IconDirective, selector: "[c8yIcon]", inputs: ["c8yIcon"] }, { kind: "directive", type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1$1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "component", type: i4$1.FormlyForm, selector: "formly-form", inputs: ["form", "model", "fields", "options"], outputs: ["modelChange"] }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DynamicQueryFormComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ps-dynamic-query-form',
                    standalone: true,
                    imports: [CoreModule, IconDirective],
                    template: `<form class="card" [formGroup]="form">
    <div class="card-header">
      <h4 class="card-title">Query filter</h4>
    </div>
    <div class="card-block">
      @for (p of params; track p.key) {
        <button
          class="btn btn-default btn-icon btn-sm m-t-8 m-l-0 m-r-8"
          [ngClass]="selectedFilters.includes(p.key!.toString()) ? 'active' : ''"
          (click)="queryParamClick(p.key!.toString())"
        >
          <i [c8yIcon]="getIcon(p)"></i>
          {{ p.key }}
        </button>
      }

      <div class="form-group m-t-16">
        <formly-form [form]="form" [fields]="fields" [model]="filter"></formly-form>
      </div>

      <ng-content></ng-content>
    </div>
  </form>`,
                }]
        }], propDecorators: { filter: [{
                type: Input
            }], params: [{
                type: Input
            }] } });

class InventoryQueryFormComponent {
    constructor() {
        this.filter = {};
        this.queryParams = [
            getTextInputBlock({
                key: 'fragmentType',
                description: 'A characteristic which identifies a managed object or event, for example, geolocation, electricity sensor, relay state.',
                label: 'Fragment Type',
            }),
            getTextInputBlock({
                key: 'ids',
                description: 'The managed object IDs to search for (comma separated).',
                label: 'Ids',
            }),
            getTextInputBlock({
                key: 'owner',
                description: 'Username of the owner of the managed objects.',
                label: 'Owner',
            }),
            getTextInputBlock({
                key: 'query',
                description: 'Use query language to perform operations and/or filter the results. See: https://cumulocity.com/api/core/#tag/Query-language',
                label: 'Query',
            }),
            getTextInputBlock({
                key: 'text',
                description: 'Search for managed objects where any property value is equal to the given one. Only string values are supported.',
                label: 'Text',
            }),
            getTextInputBlock({
                key: 'type',
                description: 'The type of event to search for.',
                label: 'Type',
            }),
        ];
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: InventoryQueryFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: InventoryQueryFormComponent, isStandalone: true, selector: "ps-inventory-query-form", inputs: { filter: "filter" }, ngImport: i0, template: `<ps-dynamic-query-form [filter]="filter" [params]="queryParams"
    ><ng-content></ng-content
  ></ps-dynamic-query-form>`, isInline: true, dependencies: [{ kind: "ngmodule", type: CoreModule }, { kind: "component", type: DynamicQueryFormComponent, selector: "ps-dynamic-query-form", inputs: ["filter", "params"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: InventoryQueryFormComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ps-inventory-query-form',
                    template: `<ps-dynamic-query-form [filter]="filter" [params]="queryParams"
    ><ng-content></ng-content
  ></ps-dynamic-query-form>`,
                    standalone: true,
                    imports: [CoreModule, DynamicQueryFormComponent],
                }]
        }], propDecorators: { filter: [{
                type: Input
            }] } });

class AlarmQueryFormComponent {
    constructor() {
        this.filter = {};
        this.queryParams = [
            getDateFromBlock({
                key: 'createdFrom',
                label: 'Created from',
                description: 'Start date or date and time of the alarm creation.',
            }),
            getDateToBlock({
                key: 'createdTo',
                label: 'Created to',
                description: 'End date or date and time of the alarm creation.',
            }),
            getDateFromBlock({
                key: 'dateFrom',
                label: 'Date from',
                description: 'Start date or date and time of the alarm occurrence.',
            }),
            getDateToBlock({
                key: 'dateTo',
                label: 'Date to',
                description: 'End date or date and time of the alarm occurrence.',
            }),
            {
                key: 'resolved',
                type: 'checkbox',
                templateOptions: {
                    label: 'Resolved',
                    description: 'When set to true, only alarms with status CLEARED will be fetched. When set to false, alarms with status ACTIVE or ACKNOWLEDGED will be fetched.',
                },
            },
            {
                key: 'type',
                type: 'input',
                templateOptions: {
                    label: 'Alarm Type(s)',
                    placeholder: 'Enter alarm types (comma separated)',
                    description: 'The type of alarm to search for (comma separated).',
                },
            },
            {
                key: 'severity',
                type: 'select',
                defaultValue: Severity.CRITICAL,
                templateOptions: {
                    label: 'Severity',
                    options: Object.keys(Severity).map((s) => ({ value: s, label: s })),
                },
            },
            {
                key: 'status',
                type: 'select',
                defaultValue: AlarmStatus.ACTIVE,
                templateOptions: {
                    label: 'Status',
                    options: Object.keys(AlarmStatus).map((s) => ({ value: s, label: s })),
                },
            },
        ];
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AlarmQueryFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AlarmQueryFormComponent, isStandalone: true, selector: "ps-alarm-query-form", inputs: { filter: "filter" }, ngImport: i0, template: `<ps-dynamic-query-form [filter]="filter" [params]="queryParams"
    ><ng-content></ng-content
  ></ps-dynamic-query-form>`, isInline: true, dependencies: [{ kind: "ngmodule", type: CoreModule }, { kind: "component", type: DynamicQueryFormComponent, selector: "ps-dynamic-query-form", inputs: ["filter", "params"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AlarmQueryFormComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ps-alarm-query-form',
                    template: `<ps-dynamic-query-form [filter]="filter" [params]="queryParams"
    ><ng-content></ng-content
  ></ps-dynamic-query-form>`,
                    standalone: true,
                    imports: [CoreModule, DynamicQueryFormComponent],
                }]
        }], propDecorators: { filter: [{
                type: Input
            }] } });

class EventQueryFormComponent {
    constructor() {
        this.filter = {};
        this.queryParams = [
            getDateFromBlock({
                key: 'createdFrom',
                label: 'Created from',
                description: "Start date or date and time of the event's creation (set by the platform during creation).",
            }),
            getDateToBlock({
                key: 'createdTo',
                label: 'Created to',
                description: "End date or date and time of the event's creation (set by the platform during creation).",
            }),
            getDateFromBlock({
                key: 'dateFrom',
                label: 'Date from',
                description: 'Start date or date and time of the event occurrence (provided by the device).',
            }),
            getDateToBlock({
                key: 'dateTo',
                label: 'Date to',
                description: 'End date or date and time of the event occurrence (provided by the device).',
            }),
            getTextInputBlock({
                key: 'fragmentType',
                description: 'A characteristic which identifies a managed object or event, for example, geolocation, electricity sensor, relay state.',
                label: 'Fragment Type',
            }),
            getTextInputBlock({
                key: 'fragmentValue',
                description: "Allows filtering events by the fragment's value, but only when provided together with fragmentType (only string values)",
                label: 'Fragment Value',
            }),
            getDateFromBlock({
                key: 'lastUpdatedFrom',
                label: 'Last updated from',
                description: 'Start date or date and time of the last update made.',
            }),
            getDateToBlock({
                key: 'lastUpdatedTo',
                label: 'Last updated to',
                description: 'End date or date and time of the last update made.',
            }),
            {
                key: 'revert',
                type: 'checkbox',
                templateOptions: {
                    label: 'Revert',
                    description: 'If you are using a range query (that is, at least one of the dateFrom or dateTo parameters is included in the request), then setting revert=true will sort the results by the oldest events first. By default, the results are sorted by the newest events first.',
                },
            },
            getTextInputBlock({
                key: 'type',
                description: 'The type of event to search for.',
                label: 'Type',
            }),
        ];
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: EventQueryFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: EventQueryFormComponent, isStandalone: true, selector: "ps-event-query-form", inputs: { filter: "filter" }, ngImport: i0, template: `<ps-dynamic-query-form [filter]="filter" [params]="queryParams"
    ><ng-content></ng-content
  ></ps-dynamic-query-form>`, isInline: true, dependencies: [{ kind: "ngmodule", type: CoreModule }, { kind: "component", type: DynamicQueryFormComponent, selector: "ps-dynamic-query-form", inputs: ["filter", "params"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: EventQueryFormComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ps-event-query-form',
                    template: `<ps-dynamic-query-form [filter]="filter" [params]="queryParams"
    ><ng-content></ng-content
  ></ps-dynamic-query-form>`,
                    standalone: true,
                    imports: [CoreModule, DynamicQueryFormComponent],
                }]
        }], propDecorators: { filter: [{
                type: Input
            }] } });

class QueryFormsTabComponent {
    constructor() {
        this.tabChange = new EventEmitter();
        this.filter = {};
        this.hiddenAutoRun = false;
        this.queryType = 'Inventory';
        this.tabs = [
            {
                active: false,
                icon: '',
                name: 'Inventory',
            },
            {
                active: false,
                icon: '',
                name: 'Alarm',
            },
            {
                active: false,
                icon: '',
                name: 'Event',
            },
        ];
    }
    ngOnInit() {
        if (this.queryType) {
            this.tabs.forEach((t) => {
                t.active = t.name === this.queryType;
            });
        }
    }
    onTabClick(name) {
        if (name === 'Inventory' || name === 'Alarm' || name === 'Event') {
            this.queryType = name;
            this.tabs.forEach((t) => {
                t.active = t.name === name;
            });
            this.filter = {};
            this.tabChange.emit(name);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: QueryFormsTabComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: QueryFormsTabComponent, isStandalone: true, selector: "ps-query-forms-tab", inputs: { filter: "filter", hiddenAutoRun: "hiddenAutoRun", queryType: "queryType" }, outputs: { tabChange: "tabChange" }, ngImport: i0, template: "<div class=\"tabContainer\" *ngIf=\"!hiddenAutoRun\">\n    <!-- tabs -->\n    <ul class=\"nav nav-tabs nav-tabsc8y m-b-8\">\n        @for(t of tabs; track t.name) {\n            <li [class.active]=\"t.active\">\n                <button type=\"button\" [title]=\"t.name\" (click)=\"onTabClick(t.name)\">\n                    @if (t.icon) {\n                        <i class=\"{{ t.icon }}\"></i>\n                    }\n                    <span class=\"txt\">{{ t.name }}</span>\n                </button>\n            </li>\n        }\n    </ul>\n\n    <div class=\"tab\">\n        @switch(queryType) {\n            @case('Inventory') {\n                <ps-inventory-query-form [filter]=\"filter\">\n                    <!-- <button class=\"btn btn-primary\" [class.btn-pending]=\"isQuerying\" [disabled]=\"isQuerying\" (click)=\"performQuery()\">\n                                <i c8yIcon=\"bolt\" class=\"m-r-4\"></i>{{ 'Perform query' | translate }}\n                            </button> -->\n                </ps-inventory-query-form>\n            }\n            @case('Alarm') {\n                <ps-alarm-query-form [filter]=\"filter\">\n                    <!--  <button class=\"btn btn-primary\" [class.btn-pending]=\"isQuerying\" [disabled]=\"isQuerying\" (click)=\"performQuery()\">\n                                <i c8yIcon=\"bolt\" class=\"m-r-4\"></i>{{ 'Perform query' | translate }}\n                            </button> -->\n                </ps-alarm-query-form>\n            }\n            @case('Event') {\n                <ps-event-query-form [filter]=\"filter\">\n                    <!-- <button class=\"btn btn-primary\" [class.btn-pending]=\"isQuerying\" [disabled]=\"isQuerying\" (click)=\"performQuery()\">\n                                <i c8yIcon=\"bolt\" class=\"m-r-4\"></i>{{ 'Perform query' | translate }}\n                            </button> -->\n                </ps-event-query-form>\n            }\n        }\n    </div>\n</div>", dependencies: [{ kind: "ngmodule", type: CoreModule }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: InventoryQueryFormComponent, selector: "ps-inventory-query-form", inputs: ["filter"] }, { kind: "component", type: AlarmQueryFormComponent, selector: "ps-alarm-query-form", inputs: ["filter"] }, { kind: "component", type: EventQueryFormComponent, selector: "ps-event-query-form", inputs: ["filter"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: QueryFormsTabComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ps-query-forms-tab', standalone: true, imports: [
                        CoreModule,
                        InventoryQueryFormComponent,
                        AlarmQueryFormComponent,
                        EventQueryFormComponent,
                    ], template: "<div class=\"tabContainer\" *ngIf=\"!hiddenAutoRun\">\n    <!-- tabs -->\n    <ul class=\"nav nav-tabs nav-tabsc8y m-b-8\">\n        @for(t of tabs; track t.name) {\n            <li [class.active]=\"t.active\">\n                <button type=\"button\" [title]=\"t.name\" (click)=\"onTabClick(t.name)\">\n                    @if (t.icon) {\n                        <i class=\"{{ t.icon }}\"></i>\n                    }\n                    <span class=\"txt\">{{ t.name }}</span>\n                </button>\n            </li>\n        }\n    </ul>\n\n    <div class=\"tab\">\n        @switch(queryType) {\n            @case('Inventory') {\n                <ps-inventory-query-form [filter]=\"filter\">\n                    <!-- <button class=\"btn btn-primary\" [class.btn-pending]=\"isQuerying\" [disabled]=\"isQuerying\" (click)=\"performQuery()\">\n                                <i c8yIcon=\"bolt\" class=\"m-r-4\"></i>{{ 'Perform query' | translate }}\n                            </button> -->\n                </ps-inventory-query-form>\n            }\n            @case('Alarm') {\n                <ps-alarm-query-form [filter]=\"filter\">\n                    <!--  <button class=\"btn btn-primary\" [class.btn-pending]=\"isQuerying\" [disabled]=\"isQuerying\" (click)=\"performQuery()\">\n                                <i c8yIcon=\"bolt\" class=\"m-r-4\"></i>{{ 'Perform query' | translate }}\n                            </button> -->\n                </ps-alarm-query-form>\n            }\n            @case('Event') {\n                <ps-event-query-form [filter]=\"filter\">\n                    <!-- <button class=\"btn btn-primary\" [class.btn-pending]=\"isQuerying\" [disabled]=\"isQuerying\" (click)=\"performQuery()\">\n                                <i c8yIcon=\"bolt\" class=\"m-r-4\"></i>{{ 'Perform query' | translate }}\n                            </button> -->\n                </ps-event-query-form>\n            }\n        }\n    </div>\n</div>" }]
        }], propDecorators: { tabChange: [{
                type: Output
            }], filter: [{
                type: Input
            }], hiddenAutoRun: [{
                type: Input
            }], queryType: [{
                type: Input
            }] } });

/**
 * Utility functions for creating and providing auto-mocked Angular services/classes for unit testing with Jest.
 *
 * @module auto-mock.helper
 */
/**
 * Automatically creates a mock object for the given class type.
 *
 * All methods are replaced with Jest mock functions (`jest.fn()`), and all properties are defined with a getter returning an empty string.
 *
 * @template T The type to mock.
 * @param obj The class constructor to mock.
 * @returns {T} The mocked instance of the class.
 */
function autoMock(obj) {
    const res = {};
    const keys = Object.getOwnPropertyNames(obj.prototype);
    const allMethods = keys.filter((key) => {
        try {
            return typeof obj.prototype[key] === 'function';
        }
        catch (error) {
            return false;
        }
    });
    const allProperties = keys.filter((x) => !allMethods.includes(x));
    allMethods.forEach((method) => (res[method] = jest.fn()));
    allProperties.forEach((property) => {
        Object.defineProperty(res, property, {
            get: function () {
                return '';
            },
            configurable: true,
        });
    });
    return res;
}
/**
 * Provides an Angular provider for a mocked class using autoMock.
 * Example to mock the `InventoryService`:
 *
 * TestBed.configureTestingModule({
 *   providers: [provideMock(InventoryService)],
 * });
 *
 * @template T The type to mock.
 * @param type The class constructor to mock.
 * @returns {Provider} An Angular provider with the mock as useValue.
 */
function provideMock(type) {
    const mock = autoMock(type);
    return { provide: type, useValue: mock };
}

function isObject(value) {
    return typeof value === 'object' && value !== null;
}
function isToCreateIOperation(obj) {
    return typeof obj === 'object' && obj !== null && 'deviceId' in obj && !('id' in obj);
}
function isMeasurementValue(value) {
    return isObject(value) && typeof value.value === 'number';
}
function isMeasurement(value) {
    if (!isObject(value))
        return false;
    // Required base fields
    if (!('id' in value) ||
        !(typeof value.id === 'string' || typeof value.id === 'number') ||
        typeof value.type !== 'string' ||
        typeof value.time !== 'string' ||
        typeof value.self !== 'string' ||
        !isObject(value.source)) {
        return false;
    }
    // Look for at least ONE fragment containing ONE MeasurementValue
    for (const key of Object.keys(value)) {
        // skip known base properties
        if (['id', 'type', 'time', 'self', 'source'].includes(key)) {
            continue;
        }
        const fragment = value[key];
        if (!isObject(fragment))
            continue;
        for (const series of Object.values(fragment)) {
            if (isMeasurementValue(series)) {
                return true; // ✅ found at least one valid fragment+series
            }
        }
    }
    return false;
}

/**
 * Recursively walks an object/array and extracts unique template placeholders
 * of the form `{{ ... }}` along with the path where they were found.
 * Returns placeholders in encounter order.
 */
function extractPlaceholdersFromObject(obj) {
    const results = [];
    const seen = new Set();
    const regex = /{{\s*([^{}\n]+?)\s*}}/g;
    function visit(value, path) {
        if (value == null)
            return;
        if (typeof value === 'string') {
            let match;
            while ((match = regex.exec(value)) !== null) {
                const extracted = match[1].trim();
                if (!seen.has(extracted)) {
                    seen.add(extracted);
                    results.push({
                        key: extracted,
                        path,
                    });
                }
            }
            // reset for next string
            regex.lastIndex = 0;
        }
        else if (Array.isArray(value)) {
            value.forEach((item, index) => {
                visit(item, `${path}[${index}]`);
            });
        }
        else if (typeof value === 'object') {
            Object.entries(value).forEach(([key, val]) => {
                visit(val, path ? `${path}.${key}` : key);
            });
        }
    }
    visit(obj, '');
    return results;
}
function removePlaceholders(obj) {
    const tuples = extractPlaceholdersFromObject(obj);
    for (const tuple of tuples) {
        set(obj, tuple.path, undefined);
    }
}

class QueryParser {
    constructor(tokenizer) {
        this.tokenizer = tokenizer;
        this.previousToken = null;
        this.current = tokenizer.next();
    }
    parse() {
        const expr = this.parseOr();
        this.expect('EOF');
        return expr;
    }
    advance() {
        this.previousToken = this.current;
        this.current = this.tokenizer.next();
        return this.previousToken;
    }
    peek() {
        return this.current;
    }
    match(type) {
        if (this.current.type === type) {
            this.advance();
            return true;
        }
        return false;
    }
    expect(type) {
        if (this.current.type !== type) {
            throw new Error(`Expected ${type}, got ${this.current.type}`);
        }
        return this.advance();
    }
    parseOr() {
        const left = this.parseAnd();
        const nodes = [left];
        while (this.match('OR')) {
            nodes.push(this.parseAnd());
        }
        return nodes.length === 1 ? left : { type: 'or', nodes };
    }
    parseAnd() {
        const left = this.parseUnary();
        const nodes = [left];
        while (this.match('AND')) {
            nodes.push(this.parseUnary());
        }
        return nodes.length === 1 ? left : { type: 'and', nodes };
    }
    parseUnary() {
        if (this.match('NOT')) {
            // Support both: not X  AND  not(X)
            if (this.match('LPAREN')) {
                const expr = this.parseOr();
                this.expect('RPAREN');
                return { type: 'not', node: expr };
            }
            return { type: 'not', node: this.parseUnary() };
        }
        return this.parsePrimary();
    }
    parsePrimary() {
        if (this.match('LPAREN')) {
            const expr = this.parseOr();
            this.expect('RPAREN');
            return expr;
        }
        return this.parsePredicate();
    }
    parsePredicate() {
        const field = this.expect('IDENT').value;
        if (field.toLowerCase() === 'has') {
            // Check if it's function syntax has(...) or comparison syntax has eq/lt/etc
            if (this.peek().type === 'LPAREN') {
                this.expect('LPAREN');
                const fragment = this.expect('IDENT').value;
                this.expect('RPAREN');
                return { type: 'has', fragment };
            }
            // Otherwise treat as normal comparison
        }
        if (field.toLowerCase() === 'bygroupid') {
            // Check if it's function syntax bygroupid(...) or comparison syntax
            if (this.peek().type === 'LPAREN') {
                this.expect('LPAREN');
                const id = Number(this.expect('NUMBER').value);
                this.expect('RPAREN');
                return { type: 'bygroupid', groupId: id };
            }
            // Otherwise treat as normal comparison
        }
        const operator = this.expect('OP').value;
        return {
            type: 'comparison',
            field,
            operator,
            value: this.parseLiteral(),
        };
    }
    parseLiteral() {
        if (this.match('STRING')) {
            return this.previousToken.value;
        }
        if (this.match('NUMBER')) {
            return Number(this.previousToken.value);
        }
        throw new Error(`Expected literal, got ${this.current.type}`);
    }
}

class Tokenizer {
    constructor(input) {
        this.input = input;
        this.pos = 0;
    }
    next() {
        const s = this.input;
        while (this.pos < s.length && /\s/.test(s[this.pos])) {
            this.pos++;
        }
        if (this.pos >= s.length)
            return { type: 'EOF' };
        const ch = s[this.pos];
        if (ch === '(')
            return this.consume('LPAREN');
        if (ch === ')')
            return this.consume('RPAREN');
        if (ch === ',')
            return this.consume('COMMA');
        if (ch === "'" || ch === '"') {
            return this.readString();
        }
        if (/[0-9]/.test(ch)) {
            return this.readNumber();
        }
        if (/[a-zA-Z_]/.test(ch)) {
            return this.readIdentifierOrOperator();
        }
        throw new Error(`Unexpected character: ${ch}`);
    }
    consume(type, value) {
        this.pos++;
        return { type, value };
    }
    readString() {
        const quote = this.input[this.pos++];
        let value = '';
        while (this.pos < this.input.length && this.input[this.pos] !== quote) {
            value += this.input[this.pos++];
        }
        this.pos++; // skip ending quote
        return { type: 'STRING', value };
    }
    readNumber() {
        let value = '';
        while (/[0-9]/.test(this.input[this.pos])) {
            value += this.input[this.pos++];
        }
        return { type: 'NUMBER', value };
    }
    readIdentifierOrOperator() {
        let value = '';
        while (/[a-zA-Z0-9_.]/.test(this.input[this.pos])) {
            value += this.input[this.pos++];
        }
        const lower = value.toLowerCase();
        if (lower === 'and')
            return { type: 'AND' };
        if (lower === 'or')
            return { type: 'OR' };
        if (lower === 'not')
            return { type: 'NOT' };
        const ops = ['eq', 'lt', 'le', 'gt', 'ge'];
        if (ops.includes(lower)) {
            return { type: 'OP', value: lower };
        }
        // Handle operators like __gt, __lt, etc (but not __ne since it's not supported)
        if (value.startsWith('__') && ops.includes(lower.substring(2))) {
            return { type: 'OP', value: lower.substring(2) };
        }
        return { type: 'IDENT', value };
    }
}

class ReverseQueriesUtil {
    convert(ast) {
        switch (ast.type) {
            case 'and':
                return {
                    __and: ast.nodes.map((node) => this.convert(node)),
                };
            case 'or':
                return {
                    __or: ast.nodes.map((node) => this.convert(node)),
                };
            case 'not':
                return {
                    __not: this.convert(ast.node),
                };
            case 'has':
                return {
                    __has: ast.fragment,
                };
            case 'bygroupid':
                return {
                    __bygroupid: ast.groupId,
                };
            case 'comparison': {
                const { field, operator, value } = ast;
                // eq is implicit in QueriesUtil JSON
                if (operator === 'eq') {
                    return { [field]: value };
                }
                return {
                    [field]: {
                        [`__${operator}`]: value,
                    },
                };
            }
            default: {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                throw new Error(`Unknown AST node type: ${ast['type']}`);
            }
        }
    }
    buildQueryJSON(query) {
        if (!query || query.length === 0) {
            return null;
        }
        try {
            // Strip $filter=() wrapper if present
            let processedQuery = query;
            if (processedQuery.startsWith('$filter=')) {
                processedQuery = processedQuery.substring(8); // Remove '$filter='
                if (processedQuery.startsWith('(') && processedQuery.endsWith(')')) {
                    processedQuery = processedQuery.slice(1, -1); // Remove outer parentheses
                }
            }
            const parser = new QueryParser(new Tokenizer(processedQuery));
            const syntaxTree = parser.parse();
            const json = this.convert(syntaxTree);
            return json;
        }
        catch (e) {
            console.error(e);
            return null;
        }
    }
}

class C8yMeasurementPipe {
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

class FileNameToIconPipe {
    constructor() {
        this.fileTypeIconsMap = {
            'file-archive-o': ['7z', 'apk', 'cab', 'gz', 'iso', 'jar', 'rar', 'tar', 'zip'],
            excel: ['xls', 'xlsx'],
            'image-file': ['bmp', 'gif', 'png', 'svg', 'ico'],
            jpg: ['jpeg', 'jpg'],
            tif: ['tiff'],
            pdf: ['pdf'],
            ppt: ['ppt', 'pptx'],
            'file-text': ['txt'],
            'file-video-o': ['3gp', 'asf', 'avi', 'flv', 'mov', 'mp4', 'ogv', 'qt', 'rm', 'rmvb', 'wmv'],
            word: ['doc', 'docx'],
        };
        this.fileNameRegexp = /(?:\.([^.]+))?$/;
    }
    /**
     * Returns the icon for a specific binary.
     */
    transform(name) {
        if (!name) {
            return 'file';
        }
        const [, suffix] = this.fileNameRegexp.exec(name);
        for (const icon of Object.keys(this.fileTypeIconsMap)) {
            if (get(this.fileTypeIconsMap, icon).includes(suffix)) {
                return icon;
            }
        }
        return 'file';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: FileNameToIconPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "18.2.14", ngImport: i0, type: FileNameToIconPipe, name: "fileNameToIcon" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: FileNameToIconPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'fileNameToIcon' }]
        }] });

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
class FormatFileSizePipe {
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

class FilterPipe {
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

class Nl2brPipe {
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

class ReplacePipe {
    transform(value, searchStr, replaceStr = '') {
        return value.split(searchStr).join(replaceStr);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ReplacePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "18.2.14", ngImport: i0, type: ReplacePipe, name: "replace" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ReplacePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'replace',
                }]
        }] });

class SortPipe {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform(values, attr) {
        if (typeof values === 'string') {
            values = Array(values);
        }
        else if (!Array.isArray(values)) {
            return [];
        }
        return sortBy(values, attr);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: SortPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "18.2.14", ngImport: i0, type: SortPipe, name: "sort" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: SortPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'sort' }]
        }] });

class StringToBoolPipe {
    transform(value) {
        return value?.toLowerCase() === 'true';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: StringToBoolPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "18.2.14", ngImport: i0, type: StringToBoolPipe, name: "stringToBool" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: StringToBoolPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'stringToBool',
                    standalone: false,
                }]
        }] });

class LocalStorageService {
    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.storage$ = new Subject();
        this._debounceTime = 100;
    }
    get debounceTime() {
        return this._debounceTime;
    }
    set debounceTime(delayInMS) {
        this._debounceTime = delayInMS;
        this.setStorageDebounce(delayInMS);
    }
    init() {
        this.setStorageDebounce();
        this.listenToStorageChanges();
    }
    delete(key) {
        localStorage.removeItem(key);
    }
    destroy() {
        this.storage$.complete();
    }
    get(key) {
        const storage = localStorage.getItem(key);
        return storage ? JSON.parse(storage) : undefined;
    }
    getOrDefault(key, defaultValue) {
        return this.get(key) || defaultValue;
    }
    // basically not needed but this way you can handle it all via the service
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
        return value;
    }
    listenToStorageChanges() {
        window.addEventListener('storage', () => this.storageUpdateDebounce(localStorage), false);
    }
    setStorageDebounce(debounceTime = this.debounceTime) {
        this.storageUpdateDebounce = debounce((ls) => this.storage$.next(ls), debounceTime);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: LocalStorageService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: LocalStorageService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: LocalStorageService, decorators: [{
            type: Injectable
        }] });

const ACTIVE_TAB_STORAGE_KEY = 'c8y_rpActiveTab';
class ActiveTabService {
    constructor(localStorageService) {
        this.localStorageService = localStorageService;
        this.subscriptions = new Subscription();
        this.setActiveTabListener();
        this.subscriptions.add(this.localStorageService.storage$.subscribe(() => this.handleStorageUpdate()));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    init() {
        const tabActive = !document.hidden;
        this.tabId = crypto.randomUUID();
        this.active$ = new BehaviorSubject(tabActive);
        this.lastActive$ = new BehaviorSubject(tabActive);
        if (tabActive)
            this.setCurrentTabActive();
    }
    isActive() {
        return this.tabId === this.localStorageService.get(ACTIVE_TAB_STORAGE_KEY);
    }
    handleStorageUpdate() {
        const isActive = this.localStorageService.get(ACTIVE_TAB_STORAGE_KEY) === this.tabId;
        // update lastActive, if it has changed
        if (isActive !== this.lastActive$.getValue())
            this.lastActive$.next(isActive);
    }
    setActiveTabListener() {
        // focus » active, lastActive via localStorage (via setCurrentTabActive)
        window.onfocus = () => {
            this.setCurrentTabActive();
            if (!this.active$.getValue())
                this.active$.next(true);
        };
        // blur » inactive, no update to lastActive
        window.onblur = () => {
            this.active$.next(false);
        };
    }
    setCurrentTabActive() {
        this.localStorageService.set(ACTIVE_TAB_STORAGE_KEY, this.tabId);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ActiveTabService, deps: [{ token: LocalStorageService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ActiveTabService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ActiveTabService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: LocalStorageService }] });

class DataGridPatchService {
    constructor() {
        this.ORIGINAL_METHOD_BACKUP_ATTRIBUTE_NAME = 'multiSortMethod';
    }
    /**
     * Enforces that always only one column can be sorted.
     * WARNING: This method might brake in the future as private API is accessed!
     *
     * Usage in your component:
     *
     * @ViewChild(DataGridComponent, { static: false })
     * set grid(value: DataGridComponent) {
     *   if (value) {
     *     this.patchService.applySingleSortBehavior(value);
     *   }
     * }
     *
     * @param grid
     */
    applySingleSortBehavior(grid) {
        if (has(grid, this.ORIGINAL_METHOD_BACKUP_ATTRIBUTE_NAME)) {
            return;
        }
        if (!has(grid, 'changeSortOrder')) {
            throw new Error('Patching of c8y-data-grid failed. Method changeSortOrder not found.');
        }
        set(grid, this.ORIGINAL_METHOD_BACKUP_ATTRIBUTE_NAME, grid.changeSortOrder.bind(grid));
        grid.changeSortOrder = (columnName) => {
            const oldSortedColumns = grid.columns.filter((c) => c.name !== columnName && c.sortable && c.sortOrder !== '');
            oldSortedColumns.map((c) => {
                c.sortOrder = '';
                return c;
            });
            invoke(grid, this.ORIGINAL_METHOD_BACKUP_ATTRIBUTE_NAME, columnName);
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DataGridPatchService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DataGridPatchService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DataGridPatchService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class DomService {
    constructor(componentFactoryResolver, appRef, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
    }
    appendComponentToBody(component) {
        const componentRef = this.componentFactoryResolver
            .resolveComponentFactory(component)
            .create(this.injector);
        this.appRef.attachView(componentRef.hostView);
        const domElem = componentRef.hostView.rootNodes[0];
        document.body.appendChild(domElem);
        return componentRef;
    }
    destroyComponent(componentRef) {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DomService, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.ApplicationRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DomService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DomService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i0.ComponentFactoryResolver }, { type: i0.ApplicationRef }, { type: i0.Injector }] });

class HierarchyAggregationService {
    constructor(inventoryService) {
        this.inventoryService = inventoryService;
        this.cache = new Map();
    }
    getAllChildrenOfManagedObject$(moId, cache = true) {
        const directChildren$ = this.getDirectChildrenOfManagedObject$(moId, cache);
        const allChildren$ = directChildren$.pipe(switchMap((children) => combineLatest(children
            .filter((child) => this.hasChildren(child))
            .map((child) => this.getAllChildrenOfManagedObject$(child.id, cache)))), map((children) => {
            return children.flat();
        }));
        return combineLatest([directChildren$, allChildren$]).pipe(map(([directChildren, allChildren]) => {
            return uniqBy([...directChildren, ...allChildren], (item) => item.id);
        }), startWith([]));
    }
    getAttributeValueOfAllChildren$(extractAttribute, moId) {
        return this.getAllChildrenOfManagedObject$(moId).pipe(map((children) => children.map(extractAttribute)));
    }
    getUniqAttributeValueOfAllChildren$(extractAttribute, moId) {
        return this.getAttributeValueOfAllChildren$(extractAttribute, moId).pipe(map((children) => uniq(children)));
    }
    getDirectChildrenOfManagedObject$(moId, cache = true) {
        if (cache && this.cache.has(moId)) {
            return this.cache.get(moId);
        }
        const observable = from(this.inventoryService.list({
            query: `$filter=(bygroupid(${moId}))`,
            withChildrenCount: true,
            pageSize: 2000,
        })).pipe(map(({ data }) => data), startWith([]), shareReplay(1));
        this.cache.set(moId, observable);
        return observable;
    }
    hasChildren(mo) {
        const { childAdditions, childAssets, childDevices } = mo;
        return childAdditions.count > 0 || childAssets.count > 0 || childDevices.count > 0;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: HierarchyAggregationService, deps: [{ token: i1$2.InventoryService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: HierarchyAggregationService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: HierarchyAggregationService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i1$2.InventoryService }] });

const FETCH_INTERVAL$1 = 5000;
class InventoryDeltaPollingService {
    constructor(inventory) {
        this.inventory = inventory;
    }
    createPolling$(filter, interval = FETCH_INTERVAL$1, mos = []) {
        return new Observable((observer) => {
            this.iterateAfter(observer, filter, interval, mos);
        });
    }
    iterateAfter(observer, filter, interval, mos) {
        if (observer.closed) {
            return;
        }
        setTimeout(() => {
            this.checkForUpdates(filter, mos).then((delta) => {
                if (delta.add.length || delta.remove.length) {
                    observer.next(delta);
                }
                this.iterateAfter(observer, filter, interval, mos);
            }, () => {
                this.iterateAfter(observer, filter, interval, mos);
            });
        }, interval);
    }
    checkForUpdates(filter, mos) {
        return this.fetchMatchingManagedObjects(filter).then((sources) => this.toDelta(sources, mos));
    }
    toDelta(matches, old) {
        const delta = {
            add: new Array(),
            remove: new Array(),
        };
        for (const mo of matches) {
            if (!old.includes(mo.id)) {
                delta.add.push(mo);
            }
        }
        const toRemoveIds = old.filter((id) => matches.find((m) => m.id === id) === undefined);
        toRemoveIds.forEach((id) => delta.remove.push(id));
        return delta;
    }
    async fetchMatchingManagedObjects(filter) {
        const result = new Array();
        const queryParams = {
            withTotalPages: true,
            pageSize: 2000,
            ...filter,
        };
        let res = await this.inventory.list(queryParams);
        while (res.data.length) {
            res.data.forEach((mo) => result.push(mo));
            if (!res.paging?.nextPage) {
                break;
            }
            res = await res.paging.next();
        }
        return result;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: InventoryDeltaPollingService, deps: [{ token: i1$2.InventoryService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: InventoryDeltaPollingService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: InventoryDeltaPollingService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1$2.InventoryService }] });

class LocationGeocoderService {
    constructor() {
        this.geoCodeSearchUrl = `https://nominatim.openstreetmap.org`;
    }
    async geoCode(address) {
        const response = await new FetchClient(`${this.geoCodeSearchUrl}`).fetch(`search?city=${address}&format=json`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
        const data = (await response.json());
        if (isArray(data) && !isEmpty(data)) {
            const { lat, lon } = data[0];
            return { lat: parseFloat(lat), lon: parseFloat(lon) };
        }
        return undefined;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: LocationGeocoderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: LocationGeocoderService }); }
}
__decorate([
    throttle(200)
], LocationGeocoderService.prototype, "geoCode", null);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: LocationGeocoderService, decorators: [{
            type: Injectable
        }], propDecorators: { geoCode: [] } });

const EMPTY_EVENT = {
    c8y_Position: {
        lat: 0,
        lng: 0,
        alt: 0,
        accuracy: 0,
    },
    source: { id: '' },
    text: '',
    type: 'c8y_LocationUpdate',
    creationTime: '',
    time: new Date(0).toISOString(),
};
class LocationRealtimeService extends RealtimeService {
    constructor(realtime, event) {
        super(realtime);
        this.event = event;
    }
    channel() {
        return '/events/*';
    }
    startListening(devices) {
        const cache = new Map();
        for (const device of devices) {
            const observable$ = this.fetchLatestAndRealtime$(device.id);
            cache.set(device.id, observable$);
        }
        return cache;
    }
    fetchLatestAndRealtime$(source) {
        const latestValue$ = from(this.event.list({
            source,
            pageSize: 1,
            withTotalPages: false,
            dateFrom: new Date(0).toISOString(),
            dateTo: new Date().toISOString(),
            type: 'c8y_LocationUpdate',
        })).pipe(map((result) => result.data), filter((data) => !isEmpty(data)), map((data) => data[0]));
        const realtime$ = this.onCreate$(source).pipe(filter((event) => this.isLocationUpdateEvent(event)));
        return merge(latestValue$, realtime$).pipe(startWith(EMPTY_EVENT), pairwise(), filter(([prev, curr]) => (prev === EMPTY_EVENT ? true : curr.time >= prev.time)), map(([, curr]) => curr));
    }
    isLocationUpdateEvent(event) {
        return event.type === 'c8y_LocationUpdate' && has(event, 'c8y_Position');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: LocationRealtimeService, deps: [{ token: i1.RealtimeSubjectService }, { token: i1$2.EventService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: LocationRealtimeService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: LocationRealtimeService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.RealtimeSubjectService }, { type: i1$2.EventService }] });

const FETCH_INTERVAL = 5;
const FAILURE_LIMIT = 10;
class ManagedObjectUpdatePollingService {
    constructor(inventory) {
        this.inventory = inventory;
        this.subject = new Subject();
        this.update$ = this.subject.asObservable();
        this.running = false;
        this.failureCount = 0;
        this.interval = FETCH_INTERVAL;
    }
    /**
     *
     * @param queryExtension for instructions how queries are built - check https://cumulocity.com/api/core/2024/#tag/Query-language
     * @param interval
     * @returns
     */
    startListening(queryExtension, interval = FETCH_INTERVAL) {
        if (this.running) {
            return this.update$;
        }
        this.loop = new Subject();
        this.currentDate = subMinutes(new Date(), 5).toISOString();
        this.counter = this.loop.subscribe(() => this.checkForUpdates(queryExtension));
        this.running = true;
        this.interval = interval;
        this.iterateAfter();
        return this.update$;
    }
    iterateAfter() {
        setTimeout(() => {
            this.loop.next();
        }, this.interval);
    }
    stopListening() {
        if (this.loop) {
            this.loop.complete();
            this.loop = null;
        }
        if (this.counter) {
            this.counter.unsubscribe();
            this.counter = null;
        }
        this.running = false;
    }
    checkForUpdates(queryExtension) {
        const query = `$filter=(lastUpdated.date gt '${this.currentDate}' and ${queryExtension}')`;
        const filter = {
            pageSize: 200,
            withTotalPages: false,
            query,
        };
        this.inventory
            .list(filter)
            .then((result) => {
            this.failureCount = 0;
            if (result.data.length) {
                this.subject.next(result.data);
                const moWithLatestDate = result.data.reduce((a, b) => a.lastUpdated > b.lastUpdated ? a : b);
                this.currentDate = moWithLatestDate.lastUpdated;
            }
        }, (error) => {
            this.failureCount++;
            if (this.failureCount >= FAILURE_LIMIT) {
                this.failureCount = 0;
                console.error(`Unable to detect updates for query ${query}`, error);
            }
        })
            .finally(() => {
            this.iterateAfter();
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ManagedObjectUpdatePollingService, deps: [{ token: i1$2.InventoryService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ManagedObjectUpdatePollingService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ManagedObjectUpdatePollingService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1$2.InventoryService }] });

class MeasurementDownloadService {
    constructor(measurementService) {
        this.measurementService = measurementService;
    }
    createBaseFilter(source) {
        return {
            dateFrom: new Date(0).toISOString(),
            dateTo: new Date().toISOString(),
            source,
            pageSize: 2000,
        };
    }
    async getTotalPages(filter) {
        const { paging: measurementPaging } = await this.measurementService.list({
            ...filter,
            withTotalPages: true,
            pageSize: 1,
        });
        const totalMeasurements = measurementPaging.totalPages;
        const maxPageSize = 2000;
        const requestsNeeded = Math.ceil(totalMeasurements / maxPageSize);
        const totalPages = Array.from({ length: requestsNeeded }, (_, index) => index + 1);
        return totalPages;
    }
    getMeasurementsWithProgress(source) {
        const filter = this.createBaseFilter(source);
        return from(this.getTotalPages(filter)).pipe(switchMap$1((totalPagesArray) => {
            const totalPages = totalPagesArray.length;
            return from(totalPagesArray).pipe(concatMap((currentPage) => from(this.measurementService.list({
                ...filter,
                withTotalPages: true,
                currentPage,
            })).pipe(map$1(({ data: measurements }) => ({
                progress: Math.round((currentPage / totalPages) * 100),
                measurements,
            })))));
        }));
    }
    prepare(measurements) {
        const jsonRows = measurements.map((m) => {
            const json = {};
            const paths = this.detectMeasurementPaths(m);
            for (const path of paths) {
                const measurementValue = get(m, path);
                json[path] = measurementValue.value;
            }
            return json;
        });
        const csv = this.jsonToCsv(jsonRows);
        return csv;
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
    jsonToCsv(jsonData) {
        if (jsonData.length === 0) {
            throw new Error('The input JSON is empty.');
        }
        const headers = Object.keys(jsonData[0]);
        const csvRows = [];
        csvRows.push(headers.join(','));
        jsonData.forEach((item) => {
            const row = headers
                .map((header) => {
                const value = item[header];
                return !isNil(value) ? `"${value}"` : '';
            })
                .join(',');
            csvRows.push(row);
        });
        return csvRows.join('\n');
    }
    download(text) {
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, `measurements-${new Date().toISOString()}.csv`);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: MeasurementDownloadService, deps: [{ token: i1$2.MeasurementService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: MeasurementDownloadService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: MeasurementDownloadService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1$2.MeasurementService }] });

class MicroserviceService {
    constructor(fetch) {
        this.fetch = fetch;
        this.GET_OPTIONS = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        this.POST_OPTIONS = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        this.PUT_OPTIONS = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        this.DELETE_OPTIONS = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        this.defaultResponseHandler = async (response) => {
            if (!response.ok) {
                const errorMessage = await response.text();
                let message = `Request failed with status ${response.status}`;
                try {
                    const parsed = JSON.parse(errorMessage);
                    if (parsed.message) {
                        message = parsed.message;
                    }
                }
                catch {
                    // ignore JSON parse errors, use the status message
                }
                throw new Error(message);
            }
            if (response.status !== 204) {
                const data = await response.json();
                return data;
            }
        };
    }
    async get(url, responseHandler = this.defaultResponseHandler) {
        const response = await this.fetch.fetch(url, this.GET_OPTIONS);
        return responseHandler(response);
    }
    async post(url, data, responseHandler = this.defaultResponseHandler) {
        const options = cloneDeep(this.POST_OPTIONS);
        options.body = JSON.stringify(data);
        const response = await this.fetch.fetch(url, options);
        return responseHandler(response);
    }
    async put(url, data, responseHandler = this.defaultResponseHandler) {
        const options = cloneDeep(this.PUT_OPTIONS);
        options.body = JSON.stringify(data);
        const response = await this.fetch.fetch(url, options);
        return responseHandler(response);
    }
    async delete(url) {
        const response = await this.fetch.fetch(url, this.DELETE_OPTIONS);
        if (!response.ok) {
            throw new Error(`DELETE request failed with status ${response.status}`);
        }
        return response;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: MicroserviceService, deps: [{ token: i1$2.FetchClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: MicroserviceService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: MicroserviceService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i1$2.FetchClient }] });

class OperationToastService {
    constructor(alertService, operationRealtime) {
        this.alertService = alertService;
        this.operationRealtime = operationRealtime;
        this.realtimeSubscriptions = new Map();
        this.alertsCache = new Map();
    }
    add(alert) {
        const { deviceId, uuid } = alert.operationDetails;
        this.alertsCache.set(uuid, alert);
        // @ts-ignore
        delete alert.operationDetails;
        this.alertService.add(alert);
        this.subscribe(uuid, deviceId);
        return this.operationRealtime.onUpdate$(deviceId).pipe(filter$1((o) => {
            return ((o.status === OperationStatus.SUCCESSFUL || o.status === OperationStatus.FAILED) &&
                o['uuid'] === uuid);
        }));
    }
    remove(alert) {
        this.alertService.remove(alert);
        if (alert.operationDetails) {
            const uuid = alert.operationDetails?.uuid;
            this.alertsCache.delete(uuid);
            this.unsubscribe(uuid);
        }
    }
    handleRealtimeElement(operation) {
        const uuid = operation['uuid'];
        const alert = this.alertsCache.get(uuid);
        if (alert) {
            this.alertService.remove(alert);
        }
        const text = operation['description'];
        let detailedData = '';
        if (operation.status === OperationStatus.FAILED) {
            // text += `<br /><a href="/apps/devicemanagement/index.html#/device/${operation.deviceId}/operations" target="_blank">Go to operation details</a>`;
            detailedData = operation['failureReason'];
        }
        else {
            detailedData = operation['param'];
        }
        this.alertService.add({
            type: operation.status === OperationStatus.SUCCESSFUL ? 'success' : 'danger',
            text: text,
            detailedData,
            allowHtml: true,
        });
        // first need to remove from cache and then check for unsubscribe!
        this.alertsCache.delete(uuid);
        this.unsubscribe(uuid);
    }
    /**
     * Creates an operation realtime listener for a device.
     * @param deviceId
     * @param uuid
     * @returns
     */
    subscribe(uuid, deviceId) {
        if (this.realtimeSubscriptions.has(uuid)) {
            // already subscribed
            return;
        }
        const sub = this.operationRealtime
            .onUpdate$(deviceId)
            .pipe(filter$1((o) => {
            return ((o.status === OperationStatus.SUCCESSFUL || o.status === OperationStatus.FAILED) &&
                o['uuid'] === uuid);
        }))
            .subscribe((o) => this.handleRealtimeElement(o));
        this.realtimeSubscriptions.set(uuid, sub);
    }
    /**
     * Cancels the listening to an operation channel.
     * @param uuid
     */
    unsubscribe(uuid) {
        const sub = this.realtimeSubscriptions.get(uuid);
        if (sub) {
            sub.unsubscribe();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: OperationToastService, deps: [{ token: i1.AlertService }, { token: i1.OperationRealtimeService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: OperationToastService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: OperationToastService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.AlertService }, { type: i1.OperationRealtimeService }] });

/**
 * Service for managing tenant option credentials.
 */
class TenantOptionCredentialsService {
    constructor(tenantOptions) {
        this.tenantOptions = tenantOptions;
        this.CATEGORY = 'my-custom.credentials';
    }
    /**
     * Saves the provided credentials and returns a token.
     * @param credentials - The credentials to be saved.
     * @returns A promise that resolves to the generated token.
     */
    saveCredentials(credentials) {
        const token = `${Math.floor(Math.random() * 1e16)}`;
        const username = this.tenantOptions.create({
            category: this.CATEGORY,
            key: `${token}.username`,
            value: credentials.username,
        });
        const password = this.tenantOptions.create({
            category: this.CATEGORY,
            key: `credentials.${token}.password`,
            value: credentials.password,
        });
        return Promise.all([username, password]).then(() => token);
    }
    /**
     * Retrieves the credentials associated with the provided token.
     * @param token - The token associated with the credentials.
     * @returns A promise that resolves to the username and password.
     */
    getCredentials(token) {
        return Promise.all([
            this.tenantOptions.detail({ category: this.CATEGORY, key: `${token}.username` }),
            this.tenantOptions.detail({ category: this.CATEGORY, key: `credentials.${token}.password` }),
        ]).then(([username, password]) => ({
            username: username.data.value,
            password: password.data.value,
        }));
    }
    /**
     * Deletes the credentials associated with the given token.
     * @param {string} token - The token for which the credentials should be deleted.
     * @returns {Promise<void>} - A promise that resolves when the credentials are successfully deleted.
     */
    deleteCredentials(token) {
        return Promise.all([
            this.tenantOptions.delete({ category: this.CATEGORY, key: `${token}.username` }),
            this.tenantOptions.delete({ category: this.CATEGORY, key: `credentials.${token}.password` }),
        ]);
    }
    clearAllCredentials() {
        return this.tenantOptions.list({ category: this.CATEGORY }).then((res) => {
            return res.data
                .filter((o) => o.category === this.CATEGORY)
                .map((option) => this.tenantOptions.delete(option));
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: TenantOptionCredentialsService, deps: [{ token: i1$2.TenantOptionsService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: TenantOptionCredentialsService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: TenantOptionCredentialsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i1$2.TenantOptionsService }] });

class WidgetConfigurationService {
    constructor(inventoryService, alertService) {
        this.inventoryService = inventoryService;
        this.alertService = alertService;
    }
    async updateWidgetConfiguration(dashboardId, widgetId, newConfig) {
        const { data: mo } = await this.inventoryService.detail(dashboardId);
        const dashboard = mo['c8y_Dashboard'];
        if (!has(dashboard.children, widgetId)) {
            throw new Error(widgetId + ' doesn not exist in Dashboard ' + dashboardId);
        }
        dashboard.children[widgetId].config = newConfig;
        await this.inventoryService
            .update({
            id: dashboardId,
            c8y_Dashboard: dashboard,
        })
            .catch((error) => this.alertService.addServerFailure(error));
    }
    getWidgetConfiguration(dashboardId, widgetId) {
        return this.inventoryService.detail(dashboardId).then((res) => {
            const dashboard = res.data['c8y_Dashboard'];
            if (!has(dashboard.children, widgetId)) {
                throw new Error(widgetId + ' doesn not exist in Dashboard ' + dashboardId);
            }
            return dashboard.children[widgetId].config;
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: WidgetConfigurationService, deps: [{ token: i1$2.InventoryService }, { token: i1.AlertService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: WidgetConfigurationService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: WidgetConfigurationService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1$2.InventoryService }, { type: i1.AlertService }] });

// Components

/**
 * Generated bundle index. Do not edit.
 */

export { ACTIVE_TAB_STORAGE_KEY, ActiveTabService, AlarmIconComponent, AlarmQueryFormComponent, C8yMeasurementPipe, DATE_OPTIONS, DataGridPatchService, DomService, DomainModelEditorComponent, DynamicQueryFormComponent, EventQueryFormComponent, FileNameToIconPipe, FilterPipe, FormatFileSizePipe, HierarchyAggregationService, InventoryDeltaPollingService, InventoryQueryFormComponent, LocalStorageService, LocationGeocoderService, LocationRealtimeService, ManagedObjectUpdatePollingService, MeasurementDownloadService, MicroserviceService, Nl2brPipe, OperationToastService, PSAutoRefreshComponent, QueryFormsTabComponent, QueryParser, ReplacePipe, ReverseQueriesUtil, SortPipe, StringToBoolPipe, TenantOptionCredentialsService, Tokenizer, WidgetConfigurationService, autoMock, extractPlaceholdersFromObject, getDateFromBlock, getDateFromValue, getDateToBlock, getTextInputBlock, isFormlyDateValue, isMeasurement, isToCreateIOperation, normalizeQueryFilter, provideMock, removePlaceholders };
//# sourceMappingURL=shared.mjs.map
