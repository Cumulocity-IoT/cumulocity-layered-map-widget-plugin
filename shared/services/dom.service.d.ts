import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injector, Type } from '@angular/core';
import * as i0 from "@angular/core";
export declare class DomService {
    private componentFactoryResolver;
    private appRef;
    private injector;
    constructor(componentFactoryResolver: ComponentFactoryResolver, appRef: ApplicationRef, injector: Injector);
    appendComponentToBody(component: Type<unknown>): ComponentRef<unknown>;
    destroyComponent(componentRef: ComponentRef<unknown>): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DomService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DomService>;
}
