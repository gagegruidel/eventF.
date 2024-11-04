let map;

function initMap() {
    const initialLocation = { lat: -34.397, lng: 150.644 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: initialLocation,
    });

    loadEvents();
}

function loadEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const eventList = document.getElementById('event-list');
    eventList.innerHTML = '';
    events.forEach(event => {

        const eventDiv = document.createElement('div');
        eventDiv.className = 'event';
        eventDiv.innerHTML = `<h3>${event.name}</h3><p>${event.date} | ${event.location} | ${event.category}</p><p>${event.description}</p>`;
        eventList.appendChild(eventDiv);

        addMarker(event.location);
    });
}

function addMarker(location) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: location }, (results, status) => {
        if (status === 'OK' && results[0]) {
            const marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
            });
            map.setCenter(results[0].geometry.location);
        } else {
            console.error('Geocode was not successful for the following reason: ' + status);
        }
    });
}

document.getElementById('event-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('event-name').value;
    const date = document.getElementById('event-date').value;
    const location = document.getElementById('event-location').value;
    const description = document.getElementById('event-description').value;
    const category = document.getElementById('event-category').value;

    const events = JSON.parse(localStorage.getItem('events')) || [];
    const newEvent = { name, date, location, description, category };
    events.push(newEvent);
    localStorage.setItem('events', JSON.stringify(events));

    addMarker(location);


    this.reset();
    loadEvents();
});

window.onload = initMap;

// This function should be called when submitting the event
function submitEvent() {
    const name = document.getElementById('event-name').value;
    const date = document.getElementById('event-date').value;
    const location = document.getElementById('event-location').value;
    const description = document.getElementById('event-description').value;
    const category = document.getElementById('event-category').value;

    // Retrieve existing events from localStorage
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const newEvent = { name, date, location, description, category };

    // Add the new event to the events array
    events.push(newEvent);
    
    // Save the updated events array back to localStorage
    localStorage.setItem('events', JSON.stringify(events));

    // Update user count
    let userCount = parseInt(localStorage.getItem('userCount')) || 0;
    userCount++; // Increment user count
    localStorage.setItem('userCount', userCount);

    // Optionally clear the form after submission
    document.getElementById('event-form').reset();

    // Load events again to display
    displayEvents(events);
}

function displayUserCount() {
    const userCount = localStorage.getItem('userCount') || 0;
    const userCountDisplay = document.getElementById('user-count');
    userCountDisplay.innerText = `Number of users who have submitted events: ${userCount}`;
}

// Call this function on page load
window.onload = function() {
    loadPosts(); // If you have this function to load posts from the forum
    displayEvents(); // Load and display events
    displayUserCount(); // Display user count
};