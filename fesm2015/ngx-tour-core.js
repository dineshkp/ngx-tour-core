import { CommonModule } from '@angular/common';
import { Injectable, Component, HostListener, NgModule } from '@angular/core';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { Subject, merge } from 'rxjs';
import { map, filter, first } from 'rxjs/operators';

var TourState;
(function (TourState) {
    TourState[TourState["OFF"] = 0] = "OFF";
    TourState[TourState["ON"] = 1] = "ON";
    TourState[TourState["PAUSED"] = 2] = "PAUSED";
})(TourState || (TourState = {}));
class TourService {
    constructor(router) {
        this.router = router;
        this.stepShow$ = new Subject();
        this.stepHide$ = new Subject();
        this.initialize$ = new Subject();
        this.start$ = new Subject();
        this.end$ = new Subject();
        this.pause$ = new Subject();
        this.resume$ = new Subject();
        this.anchorRegister$ = new Subject();
        this.anchorUnregister$ = new Subject();
        this.events$ = merge(this.stepShow$.pipe(map(value => ({ name: 'stepShow', value }))), this.stepHide$.pipe(map(value => ({ name: 'stepHide', value }))), this.initialize$.pipe(map(value => ({ name: 'initialize', value }))), this.start$.pipe(map(value => ({ name: 'start', value }))), this.end$.pipe(map(value => ({ name: 'end', value }))), this.pause$.pipe(map(value => ({ name: 'pause', value }))), this.resume$.pipe(map(value => ({ name: 'resume', value }))), this.anchorRegister$.pipe(map(value => ({
            name: 'anchorRegister',
            value
        }))), this.anchorUnregister$.pipe(map(value => ({
            name: 'anchorUnregister',
            value
        }))));
        this.steps = [];
        this.anchors = {};
        this.status = TourState.OFF;
        this.isHotKeysEnabled = true;
    }
    initialize(steps, stepDefaults) {
        if (steps && steps.length > 0) {
            this.status = TourState.OFF;
            this.steps = steps.map(step => Object.assign({}, stepDefaults, step));
            this.initialize$.next(this.steps);
        }
    }
    disableHotkeys() {
        this.isHotKeysEnabled = false;
    }
    enableHotkeys() {
        this.isHotKeysEnabled = true;
    }
    start() {
        this.startAt(0);
    }
    startAt(stepId) {
        this.status = TourState.ON;
        this.goToStep(this.loadStep(stepId));
        this.start$.next();
        this.router.events
            .pipe(filter(event => event instanceof NavigationStart), first())
            .subscribe(() => {
            if (this.currentStep && this.currentStep.hasOwnProperty('route')) {
                this.hideStep(this.currentStep);
            }
        });
    }
    end() {
        this.status = TourState.OFF;
        this.hideStep(this.currentStep);
        this.currentStep = undefined;
        this.end$.next();
    }
    pause() {
        this.status = TourState.PAUSED;
        this.hideStep(this.currentStep);
        this.pause$.next();
    }
    resume() {
        this.status = TourState.ON;
        this.showStep(this.currentStep);
        this.resume$.next();
    }
    toggle(pause) {
        if (pause) {
            if (this.currentStep) {
                this.pause();
            }
            else {
                this.resume();
            }
        }
        else {
            if (this.currentStep) {
                this.end();
            }
            else {
                this.start();
            }
        }
    }
    next() {
        if (this.hasNext(this.currentStep)) {
            this.goToStep(this.loadStep(this.currentStep.nextStep || this.steps.indexOf(this.currentStep) + 1));
        }
    }
    hasNext(step) {
        if (!step) {
            console.warn('Can\'t get next step. No currentStep.');
            return false;
        }
        return (step.nextStep !== undefined ||
            this.steps.indexOf(step) < this.steps.length - 1);
    }
    prev() {
        if (this.hasPrev(this.currentStep)) {
            this.goToStep(this.loadStep(this.currentStep.prevStep || this.steps.indexOf(this.currentStep) - 1));
        }
    }
    hasPrev(step) {
        if (!step) {
            console.warn('Can\'t get previous step. No currentStep.');
            return false;
        }
        return step.prevStep !== undefined || this.steps.indexOf(step) > 0;
    }
    goto(stepId) {
        this.goToStep(this.loadStep(stepId));
    }
    register(anchorId, anchor) {
        if (!anchorId)
            return;
        if (this.anchors[anchorId]) {
            throw new Error('anchorId ' + anchorId + ' already registered!');
        }
        this.anchors[anchorId] = anchor;
        this.anchorRegister$.next(anchorId);
    }
    unregister(anchorId) {
        if (!anchorId)
            return;
        delete this.anchors[anchorId];
        this.anchorUnregister$.next(anchorId);
    }
    getStatus() {
        return this.status;
    }
    isHotkeysEnabled() {
        return this.isHotKeysEnabled;
    }
    goToStep(step) {
        if (!step) {
            console.warn('Can\'t go to non-existent step');
            this.end();
            return;
        }
        let navigatePromise = new Promise(resolve => resolve(true));
        if (step.route !== undefined && typeof step.route === 'string') {
            navigatePromise = this.router.navigateByUrl(step.route);
        }
        else if (step.route && Array.isArray(step.route)) {
            navigatePromise = this.router.navigate(step.route);
        }
        navigatePromise.then(navigated => {
            if (navigated !== false) {
                setTimeout(() => this.setCurrentStep(step));
            }
        });
    }
    loadStep(stepId) {
        if (typeof stepId === 'number') {
            return this.steps[stepId];
        }
        else {
            return this.steps.find(step => step.stepId === stepId);
        }
    }
    setCurrentStep(step) {
        if (this.currentStep) {
            this.hideStep(this.currentStep);
        }
        this.currentStep = step;
        this.showStep(this.currentStep);
        this.router.events
            .pipe(filter(event => event instanceof NavigationStart), first())
            .subscribe(() => {
            if (this.currentStep && this.currentStep.hasOwnProperty('route')) {
                this.hideStep(this.currentStep);
            }
        });
    }
    showStep(step) {
        const anchor = this.anchors[step && step.anchorId];
        if (!anchor) {
            console.warn('Can\'t attach to unregistered anchor with id ' + step.anchorId);
            this.end();
            return;
        }
        anchor.showTourStep(step);
        this.stepShow$.next(step);
    }
    hideStep(step) {
        const anchor = this.anchors[step && step.anchorId];
        if (!anchor) {
            return;
        }
        anchor.hideTourStep();
        this.stepHide$.next(step);
    }
}
TourService.decorators = [
    { type: Injectable }
];
TourService.ctorParameters = () => [
    { type: Router }
];

class TourHotkeyListenerComponent {
    constructor(tourService) {
        this.tourService = tourService;
    }
    /**
     * Configures hot keys for controlling the tour with the keyboard
     */
    onEscapeKey() {
        if (this.tourService.getStatus() === TourState.ON &&
            this.tourService.isHotkeysEnabled()) {
            this.tourService.end();
        }
    }
    onArrowRightKey() {
        if (this.tourService.getStatus() === TourState.ON &&
            this.tourService.hasNext(this.tourService.currentStep) &&
            this.tourService.isHotkeysEnabled()) {
            this.tourService.next();
        }
    }
    onArrowLeftKey() {
        if (this.tourService.getStatus() === TourState.ON &&
            this.tourService.hasPrev(this.tourService.currentStep) &&
            this.tourService.isHotkeysEnabled()) {
            this.tourService.prev();
        }
    }
}
TourHotkeyListenerComponent.decorators = [
    { type: Component, args: [{
                selector: 'tour-hotkey-listener',
                template: `<ng-content></ng-content>`
            },] }
];
TourHotkeyListenerComponent.ctorParameters = () => [
    { type: TourService }
];
TourHotkeyListenerComponent.propDecorators = {
    onEscapeKey: [{ type: HostListener, args: ['window:keydown.Escape',] }],
    onArrowRightKey: [{ type: HostListener, args: ['window:keydown.ArrowRight',] }],
    onArrowLeftKey: [{ type: HostListener, args: ['window:keydown.ArrowLeft',] }]
};

class TourModule {
    static forRoot() {
        return {
            ngModule: TourModule,
            providers: [
                TourService,
            ],
        };
    }
}
TourModule.decorators = [
    { type: NgModule, args: [{
                declarations: [TourHotkeyListenerComponent],
                exports: [TourHotkeyListenerComponent],
                imports: [CommonModule, RouterModule],
            },] }
];

/*
 * Public API Surface of ngx-tour-core
 */

/**
 * Generated bundle index. Do not edit.
 */

export { TourHotkeyListenerComponent, TourModule, TourService, TourState };
//# sourceMappingURL=ngx-tour-core.js.map
