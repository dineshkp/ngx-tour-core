import { TourService } from './tour.service';
export declare class TourHotkeyListenerComponent {
    tourService: TourService;
    constructor(tourService: TourService);
    /**
     * Configures hot keys for controlling the tour with the keyboard
     */
    onEscapeKey(): void;
    onArrowRightKey(): void;
    onArrowLeftKey(): void;
}
