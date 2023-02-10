import { Injectable } from "@angular/core";
import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

@Injectable({
  providedIn: "root"
})
export class MyHammerConfig extends HammerGestureConfig {
  override overrides = <any> {
    swipe: {
      velocity: 0.4,
      direction: Hammer.DIRECTION_HORIZONTAL
    },
    pan:{
      direction: (Hammer.DIRECTION_LEFT | Hammer.DIRECTION_RIGHT)

    },


  };
}
