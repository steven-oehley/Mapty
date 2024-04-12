'use strict';
import { domEls } from './domElements.js';
import { months } from './months.js';

let map;
let mapEvent;

// GEOLOCATION API
// - takes two functions - one for success one for error
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      const coords = [latitude, longitude];
      map = L.map('map').setView(coords, 13);
      L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // when clicking on map
      map.on('click', mapE => {
        mapEvent = mapE;
        // unhide form and focus on distance text input
        domEls.form.classList.remove('hidden');
        domEls.inputDistance.focus();
      });
    },
    () => alert('Could not get your position')
  );
}

// Form submission

domEls.form.addEventListener('submit', e => {
  e.preventDefault();
  // get latitude and longitude from click
  const { lat, lng } = mapEvent.latlng;

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('Getting a sweat on!')
    .openPopup();

  // clear and blur input fields
  domEls.inputDistance.value = '';
  domEls.inputDistance.blur();
  domEls.inputDuration.value = '';
  domEls.inputDuration.blur();
  domEls.inputCadence.value = '';
  domEls.inputCadence.blur();
  domEls.inputElevation.value = '';
  domEls.inputElevation.blur();
});

domEls.inputType.addEventListener('change', () => {
  domEls.inputElevation
    .closest('.form__row')
    .classList.toggle('form__row--hidden');
  domEls.inputCadence
    .closest('.form__row')
    .classList.toggle('form__row--hidden');
});
