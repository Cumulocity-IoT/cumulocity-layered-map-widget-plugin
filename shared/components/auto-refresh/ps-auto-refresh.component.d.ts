import { AfterViewInit, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { CountdownIntervalComponent } from '@c8y/ngx-components';
import * as i0 from "@angular/core";
export declare class PSAutoRefreshComponent implements OnInit, AfterViewInit, OnDestroy {
    private fb;
    readonly refreshIntervalsInMilliseconds: number[];
    readonly DISABLE_AUTO_REFRESH: "Disable auto refresh";
    readonly ENABLE_AUTO_REFRESH: "Enable auto refresh";
    readonly SECONDS_UNTIL_REFRESH: "{{ seconds }} s";
    /**
     * Controls the loading state of the alarms list reload button.
     */
    isLoading$: BehaviorSubject<boolean>;
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
    set isIntervalToggleEnabled(value: boolean);
    /**
     * This getter allows you to access the current state of the `isIntervalEnabled` property, which reflects
     * the state of a toggle button. It retrieves the value from the associated form control, providing the
     * current state of the toggle button.
     */
    get isIntervalToggleEnabled(): boolean;
    /**
     * Event emitter for notifying when a countdown timer has completed.
     */
    onCountdownEnded: EventEmitter<void>;
    countdownIntervalComponent: CountdownIntervalComponent;
    toggleIntervalForm: import("@angular/forms").FormGroup<{
        intervalToggle: import("@angular/forms").FormControl<boolean>;
        refreshInterval: import("@angular/forms").FormControl<number>;
    }>;
    private destroy$;
    /**
     * Indicates whether the user has been interacting with the interval toggle.
     * Property holds the current state of the interval toggle input element entered by the user,
     * distinguishing it from changes made programmatically (e.g. value from isIntervalToggleEnabled).
     */
    private doesUserCheckedIntervalToggle;
    constructor(fb: FormBuilder);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    resetCountdown(): void;
    trackUserClickOnIntervalToggle(target: EventTarget): void;
    private startCountdown;
    private onIntervalToggleChange;
    private initForm;
    private listenToRefreshIntervalChange;
    private listenOnLoadingChanges;
    static ɵfac: i0.ɵɵFactoryDeclaration<PSAutoRefreshComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PSAutoRefreshComponent, "ps-auto-refresh", never, { "isLoading$": { "alias": "isLoading$"; "required": false; }; "isIntervalToggleEnabled": { "alias": "isIntervalToggleEnabled"; "required": false; }; }, { "onCountdownEnded": "onCountdownEnded"; }, never, never, true, never>;
}
