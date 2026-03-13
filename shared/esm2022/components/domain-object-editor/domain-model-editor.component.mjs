import { Component, effect, EventEmitter, Input, Output, signal, ViewChild, } from '@angular/core';
import { EditorComponent, MonacoEditorMarkerValidatorDirective } from '@c8y/ngx-components/editor';
import { CoreModule, FormGroupComponent, MessagesComponent } from '@c8y/ngx-components';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DOMAIN_MODEL_TEMPLATES_C8Y } from './domain-model-samples';
import { OPERATION_SCHEMA } from './operation-schema';
import { ALARM_SCHEMA } from './alarm-schema';
import { EVENT_SCHEMA } from './event-schema';
import * as i0 from "@angular/core";
import * as i1 from "@c8y/ngx-components";
import * as i2 from "@angular/forms";
export class DomainModelEditorComponent {
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: DomainModelEditorComponent, isStandalone: true, selector: "domain-model-editor", inputs: { domainModel: "domainModel", value: "value" }, outputs: { valueChange: "valueChange", isValidChange: "isValidChange" }, viewQueries: [{ propertyName: "editorComponent", first: true, predicate: EditorComponent, descendants: true }], usesOnChanges: true, ngImport: i0, template: "<form [formGroup]=\"form\" class=\"d-contents\">\n  <c8y-form-group class=\"d-col fit-h m-b-4\">\n    <label for=\"jsonEditor\" translate>{{ domainModel | humanize }} body</label>\n    <c8y-editor\n      class=\"flex-grow\"\n      name=\"jsonEditor\"\n      [formControlName]=\"'jsonEditor'\"\n      (editorInit)=\"assignSchema()\"\n      (ngModelChange)=\"updateCode($event)\"\n      [editorOptions]=\"options\"\n      monacoEditorMarkerValidator\n    ></c8y-editor>\n    <c8y-messages [helpMessage]=\"''\"></c8y-messages>\n  </c8y-form-group>\n\n  @if (form.valid) {\n    <p class=\"d-flex a-i-center\">\n      <i class=\"dlt-c8y-icon-ok text-success icon-20 m-r-4\"></i> Form is valid.\n    </p>\n  } @else {\n    <p class=\"d-flex a-i-center\">\n      <i class=\"dlt-c8y-icon-exclamation-circle text-danger icon-20 m-r-4\"></i> Form is invalid.\n    </p>\n  }\n</form>\n", dependencies: [{ kind: "ngmodule", type: CoreModule }, { kind: "directive", type: i1.C8yTranslateDirective, selector: "[translate],[ngx-translate]" }, { kind: "pipe", type: i1.HumanizePipe, name: "humanize" }, { kind: "directive", type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "component", type: i1.FormGroupComponent, selector: "c8y-form-group", inputs: ["hasError", "hasWarning", "hasSuccess", "novalidation", "status"] }, { kind: "component", type: i1.MessagesComponent, selector: "c8y-messages", inputs: ["show", "defaults", "helpMessage"] }, { kind: "directive", type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: EditorComponent, selector: "c8y-editor", inputs: ["editorOptions"], outputs: ["editorInit"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: MonacoEditorMarkerValidatorDirective, selector: "c8y-editor [monacoEditorMarkerValidator]" }] }); }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLW1vZGVsLWVkaXRvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9kb21haW4tb2JqZWN0LWVkaXRvci9kb21haW4tbW9kZWwtZWRpdG9yLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2RvbWFpbi1vYmplY3QtZWRpdG9yL2RvbWFpbi1tb2RlbC1lZGl0b3IuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxNQUFNLEVBQ04sWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBQ04sTUFBTSxFQUVOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLG9DQUFvQyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDbkcsT0FBTyxFQUFFLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hGLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0UsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQWM5QyxNQUFNLE9BQU8sMEJBQTBCO0lBbUJyQztRQWxCUyxnQkFBVyxHQUE2QyxXQUFXLENBQUM7UUFFbkUsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQ3pDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUU1QyxTQUFJLEdBQUcsTUFBTSxDQUFTLEVB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Tyw0QkFBNEI7UUFDbEMsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFdBQVcsRUFBRSxDQUFDO1lBQ3JDLE9BQU8sMEJBQTBCLENBQUMsU0FBUyxDQUFDO1FBQzlDLENBQUM7YUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssT0FBTyxFQUFFLENBQUM7WUFDeEMsT0FBTywwQkFBMEIsQ0FBQyxLQUFLLENBQUM7UUFDMUMsQ0FBQzthQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxPQUFPLEVBQUUsQ0FBQztZQUN4QyxPQUFPLDBCQUEwQixDQUFDLEtBQUssQ0FBQztRQUMxQyxDQUFDO2FBQU0sQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQztJQUNILENBQUM7K0dBN0hVLDBCQUEwQjttR0FBMUIsMEJBQTBCLGlRQVMxQixlQUFlLHFFQ3hDNUIsNDJCQXlCQSwyQ0RGSSxVQUFVLDhtQ0FDVixlQUFlLDBHQUdmLG1CQUFtQiwrQkFDbkIsb0NBQW9DOzs0RkFHM0IsMEJBQTBCO2tCQWJ0QyxTQUFTOytCQUNFLHFCQUFxQixjQUVuQixJQUFJLFdBQ1A7d0JBQ1AsVUFBVTt3QkFDVixlQUFlO3dCQUNmLGlCQUFpQjt3QkFDakIsa0JBQWtCO3dCQUNsQixtQkFBbUI7d0JBQ25CLG9DQUFvQztxQkFDckM7d0RBR1EsV0FBVztzQkFBbkIsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0ksV0FBVztzQkFBcEIsTUFBTTtnQkFDRyxhQUFhO3NCQUF0QixNQUFNO2dCQUtxQixlQUFlO3NCQUExQyxTQUFTO3VCQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIGVmZmVjdCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIHNpZ25hbCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVkaXRvckNvbXBvbmVudCwgTW9uYWNvRWRpdG9yTWFya2VyVmFsaWRhdG9yRGlyZWN0aXZlIH0gZnJvbSAnQGM4eS9uZ3gtY29tcG9uZW50cy9lZGl0b3InO1xuaW1wb3J0IHsgQ29yZU1vZHVsZSwgRm9ybUdyb3VwQ29tcG9uZW50LCBNZXNzYWdlc0NvbXBvbmVudCB9IGZyb20gJ0BjOHkvbmd4LWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERPTUFJTl9NT0RFTF9URU1QTEFURVNfQzhZIH0gZnJvbSAnLi9kb21haW4tbW9kZWwtc2FtcGxlcyc7XG5pbXBvcnQgeyBPUEVSQVRJT05fU0NIRU1BIH0gZnJvbSAnLi9vcGVyYXRpb24tc2NoZW1hJztcbmltcG9ydCB7IEFMQVJNX1NDSEVNQSB9IGZyb20gJy4vYWxhcm0tc2NoZW1hJztcbmltcG9ydCB7IEVWRU5UX1NDSEVNQSB9IGZyb20gJy4vZXZlbnQtc2NoZW1hJztcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RvbWFpbi1tb2RlbC1lZGl0b3InLFxuICB0ZW1wbGF0ZVVybDogJy4vZG9tYWluLW1vZGVsLWVkaXRvci5jb21wb25lbnQuaHRtbCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtcbiAgICBDb3JlTW9kdWxlLFxuICAgIEVkaXRvckNvbXBvbmVudCxcbiAgICBNZXNzYWdlc0NvbXBvbmVudCxcbiAgICBGb3JtR3JvdXBDb21wb25lbnQsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBNb25hY29FZGl0b3JNYXJrZXJWYWxpZGF0b3JEaXJlY3RpdmUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIERvbWFpbk1vZGVsRWRpdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZG9tYWluTW9kZWw6ICdhbGFybScgfCAnZXZlbnQnIHwgJ29wZXJhdGlvbicgfCAnanNvbicgPSAnb3BlcmF0aW9uJztcbiAgQElucHV0KCkgdmFsdWU6IHN0cmluZztcbiAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIEBPdXRwdXQoKSBpc1ZhbGlkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIHByb3RlY3RlZCBjb2RlID0gc2lnbmFsPHN0cmluZz4oJycpO1xuICBwcml2YXRlIHRpbWVvdXQ6IE5vZGVKUy5UaW1lb3V0O1xuXG4gIEBWaWV3Q2hpbGQoRWRpdG9yQ29tcG9uZW50KSBlZGl0b3JDb21wb25lbnQhOiBFZGl0b3JDb21wb25lbnQ7XG4gIGZvcm06IEZvcm1Hcm91cCA9IG5ldyBGb3JtR3JvdXAoeyBqc29uRWRpdG9yOiBuZXcgRm9ybUNvbnRyb2woJycpIH0pO1xuICBpc1ZhbGlkSnNvbjogYm9vbGVhbjtcblxuICBvcHRpb25zOiBFZGl0b3JDb21wb25lbnRbJ2VkaXRvck9wdGlvbnMnXSA9IHtcbiAgICBob3Zlcjoge1xuICAgICAgYWJvdmU6IGZhbHNlLFxuICAgIH0sXG4gIH07XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgZWZmZWN0KCgpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5jb2RlKCk7XG5cbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMubm90aWZ5SWZWYWxpZCh2YWx1ZSk7IC8vIGVtaXQgYWZ0ZXIgMjAwbXMgb2YgaW5hY3Rpdml0eVxuICAgICAgfSwgMjAwKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZUNvZGUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuY29kZS5zZXQodmFsdWUpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgbGV0IGpzb246IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIGpzb24gPSBKU09OLnBhcnNlKHRoaXMudmFsdWUpIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICAgIH0gY2F0Y2gge1xuICAgICAganNvbiA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAoIWpzb24pIHtcbiAgICAgIGpzb24gPSB0aGlzLmdldERlZmF1bHRKU09ORm9yRG9tYWluTW9kZWwoKTtcbiAgICB9XG5cbiAgICBjb25zdCBqc29uU3RyID0gSlNPTi5zdHJpbmdpZnkoXG4gICAgICBqc29uLCAvLyB7IGRldmljZUlkOiB0aGlzLmRldmljZUlkLCBbdGhpcy5zdXBwb3J0ZWRPcGVyYXRpb25dOiB7IGV4YW1wbGU6ICd7e3Rlc3R9fScgfSB9XG4gICAgICB1bmRlZmluZWQsXG4gICAgICAyXG4gICAgKTtcblxuICAgIHRoaXMuZm9ybSA9IG5ldyBGb3JtR3JvdXAoe1xuICAgICAganNvbkVkaXRvcjogbmV3IEZvcm1Db250cm9sKGpzb25TdHIpLFxuICAgIH0pO1xuXG4gICAgdGhpcy5ub3RpZnlJZlZhbGlkKGpzb25TdHIpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzWydkb21haW5Nb2RlbCddICYmICFjaGFuZ2VzWydkb21haW5Nb2RlbCddLmZpcnN0Q2hhbmdlKSB7XG4gICAgICBjb25zdCBwcmV2aW91cyA9IGNoYW5nZXNbJ2RvbWFpbk1vZGVsJ10ucHJldmlvdXNWYWx1ZSBhcyBzdHJpbmc7XG4gICAgICBjb25zdCBjdXJyZW50ID0gY2hhbmdlc1snZG9tYWluTW9kZWwnXS5jdXJyZW50VmFsdWUgYXMgc3RyaW5nO1xuXG4gICAgICBpZiAocHJldmlvdXMgIT09IGN1cnJlbnQpIHtcbiAgICAgICAgY29uc3QganNvbiA9IHRoaXMuZ2V0RGVmYXVsdEpTT05Gb3JEb21haW5Nb2RlbCgpO1xuICAgICAgICBjb25zdCBqc29uU3RyID0gSlNPTi5zdHJpbmdpZnkoanNvbiwgdW5kZWZpbmVkLCAyKTtcblxuICAgICAgICB0aGlzLmZvcm0/LmdldCgnanNvbkVkaXRvcicpPy5zZXRWYWx1ZShqc29uU3RyLCB7IGVtaXRFdmVudDogZmFsc2UgfSk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmFzc2lnblNjaGVtYSgpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3NpZ25TY2hlbWEoKSB7XG4gICAgY29uc29sZS53YXJuKCdBc3NpZ25pbmcgc2NoZW1hIGZvciBkb21haW4gbW9kZWw6ICcgKyB0aGlzLmRvbWFpbk1vZGVsKTtcblxuICAgIGlmICh0aGlzLmRvbWFpbk1vZGVsID09PSAnanNvbicpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHNjaGVtYSA9IHt9O1xuXG4gICAgaWYgKHRoaXMuZG9tYWluTW9kZWwgPT09ICdvcGVyYXRpb24nKSB7XG4gICAgICBzY2hlbWEgPSBPUEVSQVRJT05fU0NIRU1BO1xuICAgIH0gZWxzZSBpZiAodGhpcy5kb21haW5Nb2RlbCA9PT0gJ2FsYXJtJykge1xuICAgICAgc2NoZW1hID0gQUxBUk1fU0NIRU1BO1xuICAgIH0gZWxzZSBpZiAodGhpcy5kb21haW5Nb2RlbCA9PT0gJ2V2ZW50Jykge1xuICAgICAgc2NoZW1hID0gRVZFTlRfU0NIRU1BO1xuICAgIH1cblxuICAgIHRoaXMuZWRpdG9yQ29tcG9uZW50Lm1vbmFjbz8uanNvbj8uanNvbkRlZmF1bHRzPy5zZXREaWFnbm9zdGljc09wdGlvbnMoe1xuICAgICAgdmFsaWRhdGU6IHRydWUsXG4gICAgICBzY2hlbWFzOiBbeyBzY2hlbWEsIGZpbGVNYXRjaDogWycqJ10sIHVyaTogJ2VkaXRvci1qc29uLXNhbXBsZScgfV0sXG4gICAgICBlbmFibGVTY2hlbWFSZXF1ZXN0OiBmYWxzZSxcbiAgICAgIGFsbG93Q29tbWVudHM6IGZhbHNlLFxuICAgIH0pO1xuICB9XG5cbiAgbm90aWZ5SWZWYWxpZCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHZhbHVlPy5sZW5ndGggJiYgdGhpcy5mb3JtLnZhbGlkKSB7XG4gICAgICB0cnkge1xuICAgICAgICBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICAgICAgdGhpcy5pc1ZhbGlkQ2hhbmdlLmVtaXQodHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0pTT04gcGFyc2UgZmFpbGVkIGZvciB2YWx1ZTogJyArIHZhbHVlLCBlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5pc1ZhbGlkQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXREZWZhdWx0SlNPTkZvckRvbWFpbk1vZGVsKCkge1xuICAgIGlmICh0aGlzLmRvbWFpbk1vZGVsID09PSAnb3BlcmF0aW9uJykge1xuICAgICAgcmV0dXJuIERPTUFJTl9NT0RFTF9URU1QTEFURVNfQzhZLk9QRVJBVElPTjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZG9tYWluTW9kZWwgPT09ICdhbGFybScpIHtcbiAgICAgIHJldHVybiBET01BSU5fTU9ERUxfVEVNUExBVEVTX0M4WS5BTEFSTTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZG9tYWluTW9kZWwgPT09ICdldmVudCcpIHtcbiAgICAgIHJldHVybiBET01BSU5fTU9ERUxfVEVNUExBVEVTX0M4WS5FVkVOVDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgfVxufVxuIiwiPGZvcm0gW2Zvcm1Hcm91cF09XCJmb3JtXCIgY2xhc3M9XCJkLWNvbnRlbnRzXCI+XG4gIDxjOHktZm9ybS1ncm91cCBjbGFzcz1cImQtY29sIGZpdC1oIG0tYi00XCI+XG4gICAgPGxhYmVsIGZvcj1cImpzb25FZGl0b3JcIiB0cmFuc2xhdGU+e3sgZG9tYWluTW9kZWwgfCBodW1hbml6ZSB9fSBib2R5PC9sYWJlbD5cbiAgICA8Yzh5LWVkaXRvclxuICAgICAgY2xhc3M9XCJmbGV4LWdyb3dcIlxuICAgICAgbmFtZT1cImpzb25FZGl0b3JcIlxuICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCInanNvbkVkaXRvcidcIlxuICAgICAgKGVkaXRvckluaXQpPVwiYXNzaWduU2NoZW1hKClcIlxuICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwidXBkYXRlQ29kZSgkZXZlbnQpXCJcbiAgICAgIFtlZGl0b3JPcHRpb25zXT1cIm9wdGlvbnNcIlxuICAgICAgbW9uYWNvRWRpdG9yTWFya2VyVmFsaWRhdG9yXG4gICAgPjwvYzh5LWVkaXRvcj5cbiAgICA8Yzh5LW1lc3NhZ2VzIFtoZWxwTWVzc2FnZV09XCInJ1wiPjwvYzh5LW1lc3NhZ2VzPlxuICA8L2M4eS1mb3JtLWdyb3VwPlxuXG4gIEBpZiAoZm9ybS52YWxpZCkge1xuICAgIDxwIGNsYXNzPVwiZC1mbGV4IGEtaS1jZW50ZXJcIj5cbiAgICAgIDxpIGNsYXNzPVwiZGx0LWM4eS1pY29uLW9rIHRleHQtc3VjY2VzcyBpY29uLTIwIG0tci00XCI+PC9pPiBGb3JtIGlzIHZhbGlkLlxuICAgIDwvcD5cbiAgfSBAZWxzZSB7XG4gICAgPHAgY2xhc3M9XCJkLWZsZXggYS1pLWNlbnRlclwiPlxuICAgICAgPGkgY2xhc3M9XCJkbHQtYzh5LWljb24tZXhjbGFtYXRpb24tY2lyY2xlIHRleHQtZGFuZ2VyIGljb24tMjAgbS1yLTRcIj48L2k+IEZvcm0gaXMgaW52YWxpZC5cbiAgICA8L3A+XG4gIH1cbjwvZm9ybT5cbiJdfQ==