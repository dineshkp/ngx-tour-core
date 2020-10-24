(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@angular/router'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('ngx-tour-core', ['exports', '@angular/common', '@angular/core', '@angular/router', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory(global['ngx-tour-core'] = {}, global.ng.common, global.ng.core, global.ng.router, global.rxjs, global.rxjs.operators));
}(this, (function (exports, common, core, router, rxjs, operators) { 'use strict';

    (function (TourState) {
        TourState[TourState["OFF"] = 0] = "OFF";
        TourState[TourState["ON"] = 1] = "ON";
        TourState[TourState["PAUSED"] = 2] = "PAUSED";
    })(exports.TourState || (exports.TourState = {}));
    var TourService = /** @class */ (function () {
        function TourService(router) {
            this.router = router;
            this.stepShow$ = new rxjs.Subject();
            this.stepHide$ = new rxjs.Subject();
            this.initialize$ = new rxjs.Subject();
            this.start$ = new rxjs.Subject();
            this.end$ = new rxjs.Subject();
            this.pause$ = new rxjs.Subject();
            this.resume$ = new rxjs.Subject();
            this.anchorRegister$ = new rxjs.Subject();
            this.anchorUnregister$ = new rxjs.Subject();
            this.events$ = rxjs.merge(this.stepShow$.pipe(operators.map(function (value) { return ({ name: 'stepShow', value: value }); })), this.stepHide$.pipe(operators.map(function (value) { return ({ name: 'stepHide', value: value }); })), this.initialize$.pipe(operators.map(function (value) { return ({ name: 'initialize', value: value }); })), this.start$.pipe(operators.map(function (value) { return ({ name: 'start', value: value }); })), this.end$.pipe(operators.map(function (value) { return ({ name: 'end', value: value }); })), this.pause$.pipe(operators.map(function (value) { return ({ name: 'pause', value: value }); })), this.resume$.pipe(operators.map(function (value) { return ({ name: 'resume', value: value }); })), this.anchorRegister$.pipe(operators.map(function (value) { return ({
                name: 'anchorRegister',
                value: value
            }); })), this.anchorUnregister$.pipe(operators.map(function (value) { return ({
                name: 'anchorUnregister',
                value: value
            }); })));
            this.steps = [];
            this.anchors = {};
            this.status = exports.TourState.OFF;
            this.isHotKeysEnabled = true;
        }
        TourService.prototype.initialize = function (steps, stepDefaults) {
            if (steps && steps.length > 0) {
                this.status = exports.TourState.OFF;
                this.steps = steps.map(function (step) { return Object.assign({}, stepDefaults, step); });
                this.initialize$.next(this.steps);
            }
        };
        TourService.prototype.disableHotkeys = function () {
            this.isHotKeysEnabled = false;
        };
        TourService.prototype.enableHotkeys = function () {
            this.isHotKeysEnabled = true;
        };
        TourService.prototype.start = function () {
            this.startAt(0);
        };
        TourService.prototype.startAt = function (stepId) {
            var _this = this;
            this.status = exports.TourState.ON;
            this.goToStep(this.loadStep(stepId));
            this.start$.next();
            this.router.events
                .pipe(operators.filter(function (event) { return event instanceof router.NavigationStart; }), operators.first())
                .subscribe(function () {
                if (_this.currentStep && _this.currentStep.hasOwnProperty('route')) {
                    _this.hideStep(_this.currentStep);
                }
            });
        };
        TourService.prototype.end = function () {
            this.status = exports.TourState.OFF;
            this.hideStep(this.currentStep);
            this.currentStep = undefined;
            this.end$.next();
        };
        TourService.prototype.pause = function () {
            this.status = exports.TourState.PAUSED;
            this.hideStep(this.currentStep);
            this.pause$.next();
        };
        TourService.prototype.resume = function () {
            this.status = exports.TourState.ON;
            this.showStep(this.currentStep);
            this.resume$.next();
        };
        TourService.prototype.toggle = function (pause) {
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
        };
        TourService.prototype.next = function () {
            if (this.hasNext(this.currentStep)) {
                this.goToStep(this.loadStep(this.currentStep.nextStep || this.steps.indexOf(this.currentStep) + 1));
            }
        };
        TourService.prototype.hasNext = function (step) {
            if (!step) {
                console.warn('Can\'t get next step. No currentStep.');
                return false;
            }
            return (step.nextStep !== undefined ||
                this.steps.indexOf(step) < this.steps.length - 1);
        };
        TourService.prototype.prev = function () {
            if (this.hasPrev(this.currentStep)) {
                this.goToStep(this.loadStep(this.currentStep.prevStep || this.steps.indexOf(this.currentStep) - 1));
            }
        };
        TourService.prototype.hasPrev = function (step) {
            if (!step) {
                console.warn('Can\'t get previous step. No currentStep.');
                return false;
            }
            return step.prevStep !== undefined || this.steps.indexOf(step) > 0;
        };
        TourService.prototype.goto = function (stepId) {
            this.goToStep(this.loadStep(stepId));
        };
        TourService.prototype.register = function (anchorId, anchor) {
            if (!anchorId)
                return;
            if (this.anchors[anchorId]) {
                throw new Error('anchorId ' + anchorId + ' already registered!');
            }
            this.anchors[anchorId] = anchor;
            this.anchorRegister$.next(anchorId);
        };
        TourService.prototype.unregister = function (anchorId) {
            if (!anchorId)
                return;
            delete this.anchors[anchorId];
            this.anchorUnregister$.next(anchorId);
        };
        TourService.prototype.getStatus = function () {
            return this.status;
        };
        TourService.prototype.isHotkeysEnabled = function () {
            return this.isHotKeysEnabled;
        };
        TourService.prototype.goToStep = function (step) {
            var _this = this;
            if (!step) {
                console.warn('Can\'t go to non-existent step');
                this.end();
                return;
            }
            var navigatePromise = new Promise(function (resolve) { return resolve(true); });
            if (step.route !== undefined && typeof step.route === 'string') {
                navigatePromise = this.router.navigateByUrl(step.route);
            }
            else if (step.route && Array.isArray(step.route)) {
                navigatePromise = this.router.navigate(step.route);
            }
            navigatePromise.then(function (navigated) {
                if (navigated !== false) {
                    setTimeout(function () { return _this.setCurrentStep(step); });
                }
            });
        };
        TourService.prototype.loadStep = function (stepId) {
            if (typeof stepId === 'number') {
                return this.steps[stepId];
            }
            else {
                return this.steps.find(function (step) { return step.stepId === stepId; });
            }
        };
        TourService.prototype.setCurrentStep = function (step) {
            var _this = this;
            if (this.currentStep) {
                this.hideStep(this.currentStep);
            }
            this.currentStep = step;
            this.showStep(this.currentStep);
            this.router.events
                .pipe(operators.filter(function (event) { return event instanceof router.NavigationStart; }), operators.first())
                .subscribe(function () {
                if (_this.currentStep && _this.currentStep.hasOwnProperty('route')) {
                    _this.hideStep(_this.currentStep);
                }
            });
        };
        TourService.prototype.showStep = function (step) {
            var anchor = this.anchors[step && step.anchorId];
            if (!anchor) {
                console.warn('Can\'t attach to unregistered anchor with id ' + step.anchorId);
                this.end();
                return;
            }
            anchor.showTourStep(step);
            this.stepShow$.next(step);
        };
        TourService.prototype.hideStep = function (step) {
            var anchor = this.anchors[step && step.anchorId];
            if (!anchor) {
                return;
            }
            anchor.hideTourStep();
            this.stepHide$.next(step);
        };
        return TourService;
    }());
    TourService.decorators = [
        { type: core.Injectable }
    ];
    TourService.ctorParameters = function () { return [
        { type: router.Router }
    ]; };

    var TourHotkeyListenerComponent = /** @class */ (function () {
        function TourHotkeyListenerComponent(tourService) {
            this.tourService = tourService;
        }
        /**
         * Configures hot keys for controlling the tour with the keyboard
         */
        TourHotkeyListenerComponent.prototype.onEscapeKey = function () {
            if (this.tourService.getStatus() === exports.TourState.ON &&
                this.tourService.isHotkeysEnabled()) {
                this.tourService.end();
            }
        };
        TourHotkeyListenerComponent.prototype.onArrowRightKey = function () {
            if (this.tourService.getStatus() === exports.TourState.ON &&
                this.tourService.hasNext(this.tourService.currentStep) &&
                this.tourService.isHotkeysEnabled()) {
                this.tourService.next();
            }
        };
        TourHotkeyListenerComponent.prototype.onArrowLeftKey = function () {
            if (this.tourService.getStatus() === exports.TourState.ON &&
                this.tourService.hasPrev(this.tourService.currentStep) &&
                this.tourService.isHotkeysEnabled()) {
                this.tourService.prev();
            }
        };
        return TourHotkeyListenerComponent;
    }());
    TourHotkeyListenerComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'tour-hotkey-listener',
                    template: "<ng-content></ng-content>"
                },] }
    ];
    TourHotkeyListenerComponent.ctorParameters = function () { return [
        { type: TourService }
    ]; };
    TourHotkeyListenerComponent.propDecorators = {
        onEscapeKey: [{ type: core.HostListener, args: ['window:keydown.Escape',] }],
        onArrowRightKey: [{ type: core.HostListener, args: ['window:keydown.ArrowRight',] }],
        onArrowLeftKey: [{ type: core.HostListener, args: ['window:keydown.ArrowLeft',] }]
    };

    var TourModule = /** @class */ (function () {
        function TourModule() {
        }
        TourModule.forRoot = function () {
            return {
                ngModule: TourModule,
                providers: [
                    TourService,
                ],
            };
        };
        return TourModule;
    }());
    TourModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [TourHotkeyListenerComponent],
                    exports: [TourHotkeyListenerComponent],
                    imports: [common.CommonModule, router.RouterModule],
                },] }
    ];

    /*
     * Public API Surface of ngx-tour-core
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.TourHotkeyListenerComponent = TourHotkeyListenerComponent;
    exports.TourModule = TourModule;
    exports.TourService = TourService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-tour-core.umd.js.map
