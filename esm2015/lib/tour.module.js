import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TourHotkeyListenerComponent } from './tour-hotkey-listener.component';
import { TourService } from './tour.service';
export class TourModule {
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
export { TourService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG91ci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvZGluZXNoL1dvcmtzcGFjZXMvRGluZXNoL25neC10b3VyL3Byb2plY3RzL25neC10b3VyLWNvcmUvc3JjLyIsInNvdXJjZXMiOlsibGliL3RvdXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDL0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBTzdDLE1BQU0sT0FBTyxVQUFVO0lBQ1osTUFBTSxDQUFDLE9BQU87UUFDakIsT0FBTztZQUNILFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFNBQVMsRUFBRTtnQkFDUCxXQUFXO2FBQ2Q7U0FDSixDQUFDO0lBQ04sQ0FBQzs7O1lBYkosUUFBUSxTQUFDO2dCQUNOLFlBQVksRUFBRSxDQUFDLDJCQUEyQixDQUFDO2dCQUMzQyxPQUFPLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztnQkFDdEMsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQzthQUN4Qzs7QUFZRCxPQUFPLEVBQUUsV0FBVyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IFRvdXJIb3RrZXlMaXN0ZW5lckNvbXBvbmVudCB9IGZyb20gJy4vdG91ci1ob3RrZXktbGlzdGVuZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRvdXJTZXJ2aWNlIH0gZnJvbSAnLi90b3VyLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1RvdXJIb3RrZXlMaXN0ZW5lckNvbXBvbmVudF0sXG4gICAgZXhwb3J0czogW1RvdXJIb3RrZXlMaXN0ZW5lckNvbXBvbmVudF0sXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUm91dGVyTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgVG91ck1vZHVsZSB7XG4gICAgcHVibGljIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8VG91ck1vZHVsZT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IFRvdXJNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICBUb3VyU2VydmljZSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5leHBvcnQgeyBUb3VyU2VydmljZSB9O1xuIl19