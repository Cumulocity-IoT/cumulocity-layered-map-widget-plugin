import { EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import { EditorComponent } from '@c8y/ngx-components/editor';
import { FormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class DomainModelEditorComponent implements OnInit {
    domainModel: 'alarm' | 'event' | 'operation' | 'json';
    value: string;
    valueChange: EventEmitter<string>;
    isValidChange: EventEmitter<boolean>;
    protected code: import("@angular/core").WritableSignal<string>;
    private timeout;
    editorComponent: EditorComponent;
    form: FormGroup;
    isValidJson: boolean;
    options: EditorComponent['editorOptions'];
    constructor();
    updateCode(value: string): void;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    assignSchema(): void;
    notifyIfValid(value: string): void;
    private getDefaultJSONForDomainModel;
    static ɵfac: i0.ɵɵFactoryDeclaration<DomainModelEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DomainModelEditorComponent, "domain-model-editor", never, { "domainModel": { "alias": "domainModel"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, { "valueChange": "valueChange"; "isValidChange": "isValidChange"; }, never, never, true, never>;
}
