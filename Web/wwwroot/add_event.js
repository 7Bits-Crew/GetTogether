class EventDetails {
    constructor() {
        this.name = "";
        this.description = "";
        this.online = false;
        this.linkInput = "";
        this.type = [];
        this.startTime = "";
        this.endTime = "";
        this.participants = 0;
        this.saveTemplate = false;
        this.publicEvent = false;
        this.latitude = '';
        this.longitude = '';
    }


    setName(name) {
        this.name = name;
    }

    setDescription(description) {
        this.description = description;
    }

    setOnline(online) {
        this.online = online;
    }

    setLink(linkInput) {
        this.linkInput = linkInput;
    }

    setType(type) {
        this.type = type;
    }

    setStartTime(startTime) {
        this.startTime = startTime;
    }

    setEndTime(endTime) {
        this.endTime = endTime;
    }

    setParticipants(participants) {
        this.participants = participants;
    }

    setSaveTemplate(saveTemplate) {
        this.saveTemplate = saveTemplate;
    }

    setPublicEvent(publicEvent) {
        this.publicEvent = publicEvent;
    }

    setPlace(place) {
        this.place = place;
    }
}

class EventType {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.photoSource = `${name}.png`;
    }
  }

class Filtration {
    constructor() {
      this.type = [];
      this.dates = [];
      this.place = "";
      this.time = []
    }
  
    setType(selectedCategories) {
        this.type = selectedCategories;
    }
  
    setDates(selectedDates) {
        this.dates = selectedDates;
    }

    setPlace(address) {
        this.place = address;
    }

    setTime(time) {
        this.time = time;
    }
  
    reset() {
      this.type = [];
      this.dates = [];
      this.place = "";
      this.time = [];
    }
  }
  
  const filter = new Filtration();
  const eventDetails = new EventDetails();

function goBack() {
    window.history.back();
  }
  
function Home() {
    window.location.href = "home.html";
  }
  
  function reset() {
    // Clear input fields
    document.getElementById("addressInput").value = "";
    document.getElementById("current_address").checked = false;
  
    // Uncheck checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  
    // Clear the previous marker, if any
    if (marker) {
      marker.setMap(null);
    }
  
    // Reset filter object
    filter.reset();
  }
  
  function apply() {
    let selectedCategories = [];
    let categoryCheckboxes = document.querySelectorAll('.category input[type="checkbox"]');
    categoryCheckboxes.forEach(function (checkbox, index) {
        if (checkbox.checked) {
            selectedCategories.push(new EventType(index, checkbox.name));
        }
    });

    filter.setType(selectedCategories);

    const selectedDate = getSelectedDate();
    filter.setDates(selectedDate);

    const selectedTime = getSelectedTime();
    filter.setTime(selectedTime);

    const requestBody = JSON.stringify(filter);

      fetch('https://localhost:8081/filtration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: requestBody,
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Request failed with status: ${response.status}`);
        }
    })
    .then((data) => {
        console.log("Data retrieved successfully:", data);
    })
    .catch((error) => {
        console.error("Error:", error.message);
        alert("Failed to retrieve data. " + error.message);
    });

    document.getElementById("filtration_").classList.remove('vertTranslate');
    setTimeout(function () {
      document.getElementById("filtration_").classList.add('hidden');
  }, 1000);
}


  function getSelectedDate() {
    const todayCheckbox = document.getElementById("today");
    const tomorrowCheckbox = document.getElementById("tomorrow");
    const weekCheckbox = document.getElementById("week");

    if (weekCheckbox.checked) {
        return {start : getCurrentDate(),
        end : getNextWeekDates()};
    }
  
    if (todayCheckbox.checked && tomorrowCheckbox.checked) {
        return {
            start: getCurrentDate(),
            end: getTomorrowDate()
        };
    }

    if (todayCheckbox.checked) {
        return {
            start: getCurrentDate(),
            end: getCurrentDate()
        };
    }

    if (tomorrowCheckbox.checked) {
        return {
            start: getTomorrowDate(),
            end: getTomorrowDate()
        };
    }

    return [];
  }

function getSelectedTime() {
    const morningCheckbox = document.getElementById("morning");
    const lunchCheckbox = document.getElementById("lunch");
    const eveningCheckbox = document.getElementById("evening");
    const nightCheckbox = document.getElementById("night");

    let chosenTime = [];

    if (morningCheckbox.checked) {
        chosenTime.push({ start: 5, end: 12 });
    }

    if (lunchCheckbox.checked) {
        chosenTime.push({ start: 12, end: 17 });
    }

    if (eveningCheckbox.checked) {
        chosenTime.push({ start: 17, end: 21 });
    }

    if (nightCheckbox.checked) {
        chosenTime.push({ start: 21, end: 5 });
    }

    return chosenTime;
}

function getCurrentDate() {
    const today = new Date();
    today.setDate(today.getDate());

    const day = today.getDate();
    const month = today.getMonth() + 1; // Months are zero-based
    const year = today.getFullYear();

    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  }

  function getTomorrowDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const day = tomorrow.getDate();
    const month = tomorrow.getMonth() + 1; // Months are zero-based
    const year = tomorrow.getFullYear();

    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
}

function getNextWeekDates() {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    const day = nextWeek.getDate();
    const month = nextWeek.getMonth() + 1; // Months are zero-based
    const year = nextWeek.getFullYear();

    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
}

let currentScreen = 1;

function showScreen(screenNumber) {
    // Hide the current screen
document.getElementById(`screen${currentScreen}`).classList.add('hidden');

    // Show the selected screen
document.getElementById(`screen${screenNumber}`).classList.remove('hidden');

    // Update the current screen variable
currentScreen = screenNumber;
}

function goBack() {
            // Go back to the previous screen
    const previousScreen = currentScreen - 1;
    if (previousScreen >= 1) {
        showScreen(previousScreen);
    }
    else {
        Home();
    }
}

function Home() {
    window.location.href = "home.html";
  }

document.getElementById("onlineCheckbox").addEventListener("change", function () {
    let _linkInput = document.getElementById("linkInput");
    _linkInput.disabled = !this.checked;

    if (_linkInput.disabled) {
      _linkInput.value = ""; // Clear the input value
    }
  });

  const name = document.getElementById("eventName");
  const link = document.getElementById("linkInput");
  let online = document.getElementById("onlineCheckbox");

  name.addEventListener("input", (event) => {
    if (name) {
        document.getElementById("error_message").classList.add('hidden');
      document.getElementById("name").style.border = 'none';
    }
  });

  link.addEventListener("input", (event) => {
    if (link) {
        document.getElementById("error_message_online").classList.add('hidden');
        document.getElementById("link").style.border = 'none';
    }
  });

  place.addEventListener("input", (event) => {
    if (place) {
        document.getElementById("error_message_online").classList.add('hidden');
        document.getElementById("place").style.border = 'none';
    }
  });

  online.addEventListener("change", (event) => {
    if (!online.checked) {
        document.getElementById("error_message_online").classList.add('hidden');
        document.getElementById("link").style.border = 'none';
    }
  });

  function validateAndNavigate() {
    let _eventName = document.getElementById("eventName").value;
    let _description = document.getElementById("description").value;
    let _onlineCheckbox = document.getElementById("onlineCheckbox").checked;
    let _linkInput = document.getElementById("linkInput").value;

      // Get selected categories
    let _selectedCategories = [];
    let categoryCheckboxes = document.querySelectorAll('.category input[type="checkbox"]');
    categoryCheckboxes.forEach(function (checkbox, index) {
        if (checkbox.checked) {
        _selectedCategories.push(new EventType(index, checkbox.name));
        }
    });

    if (!_eventName || (_onlineCheckbox && !_linkInput)) {
        if (!_eventName) {
            document.getElementById("error_message").classList.remove('hidden');
            document.getElementById("name").style.border = '1px solid #FF8989';
            document.getElementById("eventName").classList.add('red-placeholder');
          }

          if (_onlineCheckbox && !_linkInput) {
            document.getElementById("error_message_online").classList.remove('hidden');
            document.getElementById("link").style.border = '1px solid #FF8989';
        }

        return;
    }

    let dateStart = document.getElementById("date_start").value;
    let _startTime = document.getElementById("start").value;
    let _endTime = document.getElementById("end").value;
    let dateEndInput = document.getElementById("date_end");
    let dateEnd = document.getElementById("date_end").value;
    let toggle = document.getElementById("days");
    let _publicEvent = document.getElementById("public").checked;
    let _saveTemplate = document.getElementById("template").checked;

    let selectedDate_start = new Date(dateStart);
    selectedDate_start.setHours(parseInt(_startTime.split(":")[0]), parseInt(_startTime.split(":")[1]));

    if (dateEndInput.disabled) {
        dateEnd = dateStart;
    }
    else {
        dateEnd = dateEndInput.value;
    }
    let selectedDate_end = new Date(dateEnd);
    selectedDate_end.setHours(parseInt(_endTime.split(":")[0]), parseInt(_endTime.split(":")[1]));

    // let address = document.getElementById("addressInput").value;

    if (currentScreen === 2)
    {
        document.getElementById("end").style.border = 'none';
        document.getElementById("start").style.border = 'none';
        document.getElementById("date_end").style.border = 'none';
        document.getElementById("date_start").style.border = 'none';

      let [hours_end, minutes_end] = _endTime.split(':').map(Number);

      selectedDate_end.setHours(hours_end, minutes_end);

      const today = new Date();
      today.setDate(today.getDate());

      if (selectedDate_start < today || selectedDate_end <= selectedDate_start
      || !dateStart || (!dateEnd && document.getElementById("days").checked) || !_startTime || !_endTime) {
        if (selectedDate_start < today) {
            document.getElementById("date_start").style.border = 'solid 1px #FF8989';
          }

          if (selectedDate_end <= selectedDate_start && document.getElementById("days").checked) {
            document.getElementById("date_end").style.border = 'solid 1px #FF8989';
          }
    
          if (selectedDate_end <= selectedDate_start && !document.getElementById("days").checked) {
            document.getElementById("start").style.border = 'solid 1px #FF8989';
    
            document.getElementById("end").style.border = 'solid 1px #FF8989';
          }

            if (!dateStart) {
                document.getElementById("date_start").style.border = 'solid 1px #FF8989';
            }

            if (!dateEnd && document.getElementById("days").checked) {
                document.getElementById("date_end").style.border = 'solid 1px #FF8989';
            }

            if (!_startTime) {
                document.getElementById("start").style.border = 'solid 1px #FF8989';
            }

            if (!_endTime) {
                document.getElementById("end").style.border = 'solid 1px #FF8989';
            }

            return;
        }
    }

    
      if (currentScreen === 3) {
          if (eventDetails.latitude === '' && eventDetails.longitude === '') {
              document.getElementById("place").style.border = 'solid 1px #FF8989';
              return;
          }
      }


    if (currentScreen === 4) {
        eventDetails.name = _eventName;
        eventDetails.description = _description;
        eventDetails.online = _onlineCheckbox;
        eventDetails.linkInput = _linkInput;
        eventDetails.type = _selectedCategories;
        eventDetails.startTime = selectedDate_start;
        eventDetails.endTime = selectedDate_end;
        eventDetails.participants = parseInt(document.getElementById("participants").value);
        eventDetails.publicEvent = _publicEvent;
        eventDetails.saveTemplate = _saveTemplate;
        // eventDetails.place = address;
    }
    
    if (currentScreen < 4) {
        showScreen(currentScreen+1);
    }
}

function toggleDateEndPicker() {
    let dateEndInput = document.getElementById("date_end");
    dateEndInput.disabled = !document.getElementById("days").checked;

    if (document.getElementById("days").checked) {
        let dateStartInput = document.getElementById("date_start");
        dateStartInput.style.width = '47.5%';
        dateEndInput.style.width = '47.5%';
    } else {
        document.getElementById("date_start").style.width = '100%';
    }
}

function incrementParticipants() {
    let participantsInput = document.getElementById("participants");
    participantsInput.value = parseInt(participantsInput.value) + 1;
}

function decrementParticipants() {
    let participantsInput = document.getElementById("participants");
    let newValue = parseInt(participantsInput.value) - 1;
    if (newValue < 0) {
        newValue = 0;
    }
    participantsInput.value = newValue;
}

function changeBackgroundPhoto(photoName) {
    let media = document.getElementById("main_media"); // Verify that this element exists
    if (media) {
        let backgroundPhoto = "photos/photo1.png"; // Default background photo
  
        // Map photo names to background photos (replace with actual file names)
        let photoMapping = {
            "back1": "photos/photo1.png",
            "back2": "photos/photo2.png",
            "back3": "photos/photo3.png",
        };
  
        if (photoMapping.hasOwnProperty(photoName)) {
            backgroundPhoto = `url(${photoMapping[photoName]})`;
        }
  
        // Set the background photo
        media.style.backgroundImage = backgroundPhoto;
  
        // Uncheck the previously selected photo if there was one
        if (_selectedPhoto) {
            let prevPhoto = document.getElementById(`photo${selectedPhoto}`);
            if (prevPhoto) {
                prevPhoto.checked = false;
            }
        }
  
        // Update the selected photo
        _selectedPhoto = photoName;
        sessionStorage.setItem("_selectedPhoto", _selectedPhoto);
    } else {
        console.error("Element with id 'main_media' not found.");
    }
  }


function addNewEvent() {
    console.log(JSON.stringify(eventDetails))
    fetch('https://localhost:8081/api/event/add', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
       },
       body: JSON.stringify(eventDetails),
   })
       .then((response) => {
           if (response.ok) {
               // Data uploaded successfully
               return response.json();
           } else {
               throw new Error("Request failed");
           }
       })
       .then((data) => {
           // Handle the response from the server (e.g., show a success message)
           console.log("Data uploaded successfully:", data);
       })
       .catch((error) => {
           console.error("Error:", error);
           alert("Failed to upload data.");
       });
}

function show() {
    document.getElementById("filtration_").classList.remove('hidden');
    document.getElementById("filtration_").classList.add('vertTranslate');
}

document.addEventListener("DOMContentLoaded", function () {

  fetchCategories();

  function fetchCategories() {
      const endpoint = 'https://localhost:8081/api/Categories/all';

      fetch(endpoint,{
          method: 'GET',
              headers: {
              'Content-Type': 'application/json',
        }
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
          }
        return response.json();
      })
      .then((data) => {
        // Once data is received, update the categories list
        updateCategoriesList(data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }

  // Function to update the categories list in the HTML
  function updateCategoriesList(categories) {
    const categoryListMain = document.getElementById('category-list-main');

    // Clear existing content
    categoryListMain.innerHTML = '';

    // Iterate through the categories and create checkboxes
    categories.forEach((category) => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = category.id; // You may need to adjust this based on your server response
      checkbox.name = category.name; // You may need to adjust this based on your server response

      const label = document.createElement('label');
      label.htmlFor = category.id; // Match the checkbox id
      label.textContent = category.name; // Match the checkbox name

      const div = document.createElement('div');
      div.className = 'category';
      div.appendChild(checkbox);
      div.appendChild(label);

      // Append the category div to the categoryListMain div
      categoryListMain.appendChild(div);
    });
  }
});


marker = new google.maps.Marker({
    position: place.geometry.location,
    map: map,
    title: place.name,
    });

function initMap() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const map = new google.maps.Map(document.getElementById("map"), {
                center: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                },
                zoom: 13,
                mapTypeControl: false,
                disableDefaultUI: true,
            });

            initAutocomplete(map);

            const addressInput = document.getElementById("addressInput");
            const currentAddressCheckbox = document.getElementById("current_address");
            const current_address = null;

            // Flag to track whether we've manually selected an option
            let manuallySelected = false;

            currentAddressCheckbox.addEventListener("change", function () {
                if (currentAddressCheckbox.checked) {
                    if ("geolocation" in navigator) {
                        navigator.geolocation.getCurrentPosition(function (position) {
                            const latitude = position.coords.latitude;
                            const longitude = position.coords.longitude;

                            const geocoder = new google.maps.Geocoder();
                            const latLng = new google.maps.LatLng(latitude, longitude);
                            eventDetails.latitude = latitude;
                            eventDetails.longitude = longitude;

                            filter.place = {
                                latitude: latitude,
                                longitude: longitude
                            };

                            geocoder.geocode({ location: latLng }, function (results, status) {
                                if (status === "OK" && results[0]) {
                                    const formattedAddress = results[0].formatted_address;
                                    addressInput.value = formattedAddress;
                                    current_address = formattedAddress;

                                    // Clear the previous marker, if any
                                    if (marker) {
                                        marker.setMap(null);
                                    }

                                    // Center the map on the current location and add a marker
                                    const currentLocation = new google.maps.LatLng(latitude, longitude);
                                    map.setCenter(currentLocation);
                                    map.setZoom(17); // You can adjust the zoom level as needed

                                    marker = new google.maps.Marker({
                                        position: currentLocation,
                                        map: map,
                                        title: "Current Location",
                                    });
                                } else {
                                    addressInput.value = "Address not found";
                                }
                            });
                        });
                    } else {
                        addressInput.value = "Default Address";
                    }
                } else {
                    addressInput.value = "";
                    eventDetails.longitude = '';
                    eventDetails.latitude = '';
                }
            });


        // Handle blur event on the input field
        addressInput.addEventListener("blur", function () {
          if (!manuallySelected) {
            // If an option wasn't manually selected, choose the first prediction
            const predictions = document.getElementsByClassName("pac-item");
            if (predictions.length > 0) {
              predictions[0].click(); // Simulate a click on the first prediction
            }
          }
          manuallySelected = false; // Reset the flag
        });
      });
    } else {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 49.8440201, lng: 24.0236374 },
        zoom: 13,
        mapTypeControl: false,
        disableDefaultUI: true,
      });
      initAutocomplete(map);
    }
  }

function initAutocomplete(map) {
    const input = document.getElementById("addressInput");
    let marker = null;
    const currentAddressCheckbox = document.getElementById("current_address");

    const options = {
        fields: ["formatted_address", "geometry", "name"],
        strictBounds: false,
    };

    const autocomplete = new google.maps.places.Autocomplete(input, options);

    autocomplete.bindTo("bounds", map);

    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) {
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        // Clear the previous marker, if any
        if (marker) {
            marker.setMap(null);
        }

        // Update the map's center and add a new marker
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17); // You can adjust the zoom level as needed
        }

        eventDetails.latitude = place.geometry.location.lat();
        eventDetails.longitude = place.geometry.location.lng();
        filter.place = {
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng()
        };

        marker = new google.maps.Marker({
            position: place.geometry.location,
            map: map,
            title: place.name,
        });

        // Automatically select the first prediction if not manually selected
        if (!manuallySelected) {
            const predictions = document.getElementsByClassName("pac-item");
            if (predictions.length > 0) {
                predictions[0].click(); // Simulate a click on the first prediction
            }
        }

        // Reset the manuallySelected flag
        manuallySelected = false;

        if (current_address != input.value) {
            currentAddressCheckbox.checked = false;
        }
    });

    // Add an input event listener to track manual input
    input.addEventListener("input", function () {
        manuallySelected = false; // Reset the manuallySelected flag when manual input is detected
    });
}
