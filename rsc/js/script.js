'use strict';
import { domEls } from './domElements.js';
import { months } from './months.js';

// GEOLOCATION API
// - takes two functions - one for success one for error
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
    },
    () => alert('Could not get your position')
  );
}
