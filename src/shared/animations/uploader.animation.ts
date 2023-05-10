import { animate, state, style, transition, trigger } from "@angular/animations";

export class Animations {
    static toggleFade = trigger('toggleFade', [
      state(
        'open',
        style({
          transform: 'translateX(0)'
        })
      ),
      state(
        'close',
        style({
            transform: 'translateX(-100%)'
        })
      ),
      transition('open <=> close', animate('250ms ease-in-out')),
    ]);

    static toggleLabelSelect = trigger('toggleLabelSelect', [
      state(
        'open',
        style({
          top: '-145%',
          right: '10px',
          'font-size': '0.75rem',
          'background-color': 'transparent !important',
          color:'#fff'
        })
      ),
      state(
        'close',
        style({
          top: '*',
        })
      ),
      transition('open <=> close', animate('250ms ease-in-out')),
    ]);

}