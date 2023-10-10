import { trigger, state, style, transition, animate } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
    state('in', style({ opacity: 1 })),
    transition(':enter', [
        style({ opacity: 0 }),
        animate(600)
    ]),
    transition(':leave', 
    animate(600, style({ opacity: 0 })))
]);

export const growInOut = trigger('growInOut', [
    state('in', style({ transform: 'scale(1)' })),
    
    transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate('600ms ease-out')
    ]),
    
    transition(':leave', [
        animate('600ms ease-in', style({ transform: 'scale(0)' }))
    ])
]);