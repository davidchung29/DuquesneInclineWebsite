// Use the provided API key
const apiKey = 'd75fa73296a848712ab42e4e6c142a6a';
const city = 'Pittsburgh';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

function updateWeather() {
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const temp = Math.round(data.main.temp);
      const description = data.weather[0].description;
      document.getElementById('temperature').innerText = `${temp}°F`;
      document.getElementById('weather-description').innerText =
        `Current Weather: ${description.charAt(0).toUpperCase() + description.slice(1)}`;
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      document.getElementById('weather-description').innerText = 'Weather data unavailable';
    });
}

// Call updateWeather on DOM load
document.addEventListener('DOMContentLoaded', updateWeather);


$(document).ready(function() {
  // Only run if there's a hero-content element on the page.
  if ($('.hero-content').length > 0) {
    const headerHeight = $('header').outerHeight();
    const snapTarget = headerHeight; // Snap so that the bottom of the hero is at the top of the viewport
    const snapThreshold = 50; // Allow a little leeway into the next section
    let hasSnapped = false;
    let prevScroll = $(window).scrollTop();

    $(window).on('scroll', function() {
      const scrollPos = $(window).scrollTop();

      // Update the header background position so it moves slower (15% of the scroll amount)
      $('header').css('background-position', 'center ' + (-scrollPos * 0.15) + 'px');

      // Apply a 3D transform to the hero content while within the hero area
      if (scrollPos < headerHeight) {
        const translateY = scrollPos / 4;
        const translateZ = scrollPos / 20;
        const rotateX = scrollPos / 200;
        $('.hero-content').css('transform',
          `translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg)`
        );
      }

      // Snap behavior: on the first downward scroll past the hero,
      // if the user only scrolls a little beyond the hero,
      // animate back so that the bottom of the hero aligns at the top of the viewport.
      if (!hasSnapped && scrollPos > snapTarget && scrollPos < snapTarget + snapThreshold && scrollPos > prevScroll) {
        $('html, body').animate({ scrollTop: snapTarget }, 400, 'swing');
        hasSnapped = true;
      }

      prevScroll = scrollPos;
    });
  }
});


