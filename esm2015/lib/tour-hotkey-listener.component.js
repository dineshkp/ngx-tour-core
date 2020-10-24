import { Component, HostListener } from '@angular/core';
import { TourService, TourState } from './tour.service';
export class TourHotkeyListenerComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG91ci1ob3RrZXktbGlzdGVuZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2RpbmVzaC9Xb3Jrc3BhY2VzL0RpbmVzaC9uZ3gtdG91ci9wcm9qZWN0cy9uZ3gtdG91ci1jb3JlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi90b3VyLWhvdGtleS1saXN0ZW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFeEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU14RCxNQUFNLE9BQU8sMkJBQTJCO0lBQ3RDLFlBQW1CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQUcsQ0FBQztJQUUvQzs7T0FFRztJQUVJLFdBQVc7UUFDaEIsSUFDRSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxLQUFLLFNBQVMsQ0FBQyxFQUFFO1lBQzdDLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsRUFDbkM7WUFDQSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztJQUdNLGVBQWU7UUFDcEIsSUFDRSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxLQUFLLFNBQVMsQ0FBQyxFQUFFO1lBQzdDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO1lBQ3RELElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsRUFDbkM7WUFDQSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQUdNLGNBQWM7UUFDbkIsSUFDRSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxLQUFLLFNBQVMsQ0FBQyxFQUFFO1lBQzdDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO1lBQ3RELElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsRUFDbkM7WUFDQSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQzs7O1lBeENGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxRQUFRLEVBQUUsMkJBQTJCO2FBQ3RDOzs7WUFMUSxXQUFXOzs7MEJBWWpCLFlBQVksU0FBQyx1QkFBdUI7OEJBVXBDLFlBQVksU0FBQywyQkFBMkI7NkJBV3hDLFlBQVksU0FBQywwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBUb3VyU2VydmljZSwgVG91clN0YXRlIH0gZnJvbSAnLi90b3VyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0b3VyLWhvdGtleS1saXN0ZW5lcicsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmBcbn0pXG5leHBvcnQgY2xhc3MgVG91ckhvdGtleUxpc3RlbmVyQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHVibGljIHRvdXJTZXJ2aWNlOiBUb3VyU2VydmljZSkge31cblxuICAvKipcbiAgICogQ29uZmlndXJlcyBob3Qga2V5cyBmb3IgY29udHJvbGxpbmcgdGhlIHRvdXIgd2l0aCB0aGUga2V5Ym9hcmRcbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzprZXlkb3duLkVzY2FwZScpXG4gIHB1YmxpYyBvbkVzY2FwZUtleSgpOiB2b2lkIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnRvdXJTZXJ2aWNlLmdldFN0YXR1cygpID09PSBUb3VyU3RhdGUuT04gJiZcbiAgICAgIHRoaXMudG91clNlcnZpY2UuaXNIb3RrZXlzRW5hYmxlZCgpXG4gICAgKSB7XG4gICAgICB0aGlzLnRvdXJTZXJ2aWNlLmVuZCgpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzprZXlkb3duLkFycm93UmlnaHQnKVxuICBwdWJsaWMgb25BcnJvd1JpZ2h0S2V5KCk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIHRoaXMudG91clNlcnZpY2UuZ2V0U3RhdHVzKCkgPT09IFRvdXJTdGF0ZS5PTiAmJlxuICAgICAgdGhpcy50b3VyU2VydmljZS5oYXNOZXh0KHRoaXMudG91clNlcnZpY2UuY3VycmVudFN0ZXApICYmXG4gICAgICB0aGlzLnRvdXJTZXJ2aWNlLmlzSG90a2V5c0VuYWJsZWQoKVxuICAgICkge1xuICAgICAgdGhpcy50b3VyU2VydmljZS5uZXh0KCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OmtleWRvd24uQXJyb3dMZWZ0JylcbiAgcHVibGljIG9uQXJyb3dMZWZ0S2V5KCk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIHRoaXMudG91clNlcnZpY2UuZ2V0U3RhdHVzKCkgPT09IFRvdXJTdGF0ZS5PTiAmJlxuICAgICAgdGhpcy50b3VyU2VydmljZS5oYXNQcmV2KHRoaXMudG91clNlcnZpY2UuY3VycmVudFN0ZXApICYmXG4gICAgICB0aGlzLnRvdXJTZXJ2aWNlLmlzSG90a2V5c0VuYWJsZWQoKVxuICAgICkge1xuICAgICAgdGhpcy50b3VyU2VydmljZS5wcmV2KCk7XG4gICAgfVxuICB9XG59XG4iXX0=