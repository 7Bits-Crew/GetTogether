class EventDetails {
    constructor() {
        this.name = sessionStorage.getItem("_eventName") || "";
        this.description = sessionStorage.getItem("_description") || "";
        this.online = sessionStorage.getItem("_onlineCheckbox") === "true"; // Convert to boolean
        this.linkInput = sessionStorage.getItem("_linkInput") || "";
        this.type = [];
        this.startTime = sessionStorage.getItem("selectedDate_start") || "";
        this.endTime = sessionStorage.getItem("selectedDate_end") || "";
        this.participants = parseInt(sessionStorage.getItem("_participants"), 10); // Convert to a number
        this.saveTemplate = sessionStorage.getItem("saveTemplate") === "true"; // Convert to boolean
        this.publicEvent = sessionStorage.getItem("publicEvent") === "true"; // Convert to boolean
        this.place = sessionStorage.getItem("address") || "";
    }

    // Getters
    get _name() {
        return this.name;
    }

    get _description() {
        return this.description;
    }

    get _onlineCheckbox() {
        return this.online;
    }

    get _linkInput() {
        return this.linkInput;
    }

    get _type() {
        return this.type;
    }

    get _startTime() {
        return this.startTime;
    }

    get _endTime() {
        return this.endTime;
    }

    get _participants() {
        return this.participants;
    }

    get _saveTemplate() {
        return this._saveTemplate;
    }

    get _publicEvent() {
        return this.publicEvent;
    }

    get _place() {
        return this.place;
    }

    // Setters
    set _name(value) {
        this.name = value;
    }

    set _description(value) {
        this.description = value;
    }

    set _onlineCheckbox(value) {
        this.online = value;
    }

    set _linkInput(value) {
        this.linkInput = value;
    }

    set _type(value) {
        this.type = value;
    }

    set _participants(value) {
        this.participants = value;
    }

    set _saveTemplate(value) {
        this._saveTemplate = value;
    }

    set _publicEvent(value) {
        this.publicEvent = value;
    }

    set _place(value) {
        this.place = value;
    }
}

// Create an instance of the EventDetails class
const eventDetails = new EventDetails();

// Get the full path of the currently opened HTML file
let fullPath = window.location.pathname;

// Extract the filename from the path
let filename = fullPath.split('/').pop();

// Function to go back
function goBack() {
    window.history.back();
}

// Function to navigate to home
function Home() {
    window.location.href = "home.html";
}

if (filename === "add_event_1.html") {
    // Function to enable/disable the link input based on the checkbox
    document.getElementById("onlineCheckbox").addEventListener("change", function () {
        let _linkInput = document.getElementById("linkInput");
        _linkInput.disabled = !this.checked;
    });

    // Function to count selected categories
    function countSelectedCategories() {
        let checkboxes = document.querySelectorAll('.category input[type="checkbox"]');
        let selectedCount = 0;
        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                selectedCount++;
            }
        });
        return selectedCount;
    }

    // Function to update category count display
    function updateCategoryCount() {
        let categoryCount = countSelectedCategories();
        document.getElementById("categoryCount").textContent = "Selected categories: " + categoryCount;
    }

    // Event listener for category checkboxes
    let categoryCheckboxes = document.querySelectorAll('.category input[type="checkbox"]');
    categoryCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", updateCategoryCount);
    });
}

if (filename === "add_event_2.html") {
    // Function to toggle the date end picker
    function toggleDateEndPicker() {
        let dateEndInput = document.getElementById("date_end");
        dateEndInput.disabled = !document.getElementById("days").checked;
    }

    // Add this code at the end to ensure it's called when the page loads
    toggleDateEndPicker();

    // Function to increment participants
    function incrementParticipants() {
        let participantsInput = document.getElementById("participants");
        participantsInput.value = parseInt(participantsInput.value) + 1;
        sessionStorage.setItem("_participants", participantsInput.value);
    }

    // Function to decrement participants
    function decrementParticipants() {
        let participantsInput = document.getElementById("participants");
        let newValue = parseInt(participantsInput.value) - 1;
        if (newValue < 0) {
            newValue = 0;
        }
        participantsInput.value = newValue;
        sessionStorage.setItem("_participants", newValue);
    }
}

// Function to change the background photo
let _selectedPhoto = null; // To keep track of the selected photo

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

// Function to load saved data from sessionStorage
function loadSavedData() {
    if (filename === "add_event_1.html") {
        let _eventName = sessionStorage.getItem("_eventName");
        let _description = sessionStorage.getItem("_description");
        let _onlineCheckbox = sessionStorage.getItem("_onlineCheckbox");
        let _linkInput = sessionStorage.getItem("_linkInput");
        let _selectedCategories = sessionStorage.getItem("_selectedCategories");

        // Populate input fields and checkboxes with saved data
        document.getElementById("eventName").value = _eventName || "";
        document.getElementById("description").value = _description || "";
        document.getElementById("onlineCheckbox").checked = _onlineCheckbox === "true";
        document.getElementById("linkInput").value = _linkInput || "";

        // Enable/disable the link input based on the checkbox
        document.getElementById("linkInput").disabled = !document.getElementById("onlineCheckbox").checked;

        // Restore selected categories
        if (_selectedCategories) {
            let categories = _selectedCategories.split(',');
            categories.forEach(function (category) {
                document.getElementById(category).checked = true;
            });
        }
        // Update category count display
        updateCategoryCount();
    }

    if (filename === "add_event_2.html") {
        let dateStart = (new Date(document.getElementById("date_start").value)).toISOString();
        let _startTime = document.getElementById("start").value;
        let _endTime = document.getElementById("end").value;
        let dateEndInput = document.getElementById("date_end");
        let toggle = document.getElementById("days");
        let _publicEvent = document.getElementById("public");
        let _saveTemplate = document.getElementById("template");

        let dateEnd = (new Date(document.getElementById("date_end").value)).toISOString();
        if (dateEndInput.disabled) {
            dateEnd = dateStart; // Set dateEnd to dateStart if it's disabled
        }

        const selectedDateStart = new Date(`${dateStart}T${_startTime}`);
        const selectedDateEnd = new Date(`${dateEnd}T${_endTime}`);

        // Check if any of the required fields are empty
        if (!dateStart || (!dateEnd && document.getElementById("days").checked) || !_startTime || !_endTime) {
            alert("Please fill in all required fields.");
            return;
        }

        sessionStorage.setItem("dateStart", dateStart);
        sessionStorage.setItem("_startTime", _startTime);
        sessionStorage.setItem("_endTime", _endTime);
        sessionStorage.setItem("dateEnd", dateEnd);
        sessionStorage.setItem("toggle", toggle.checked);
        sessionStorage.setItem("publicEvent", _publicEvent.checked);
        sessionStorage.setItem("saveTemplate", _saveTemplate.checked);
        sessionStorage.setItem("selectedDate_start", selectedDateStart.toISOString());
        sessionStorage.setItem("selectedDate_end", selectedDateEnd.toISOString());

        window.location.href = "add_event_3.html";
    }

    if (filename === "add_event_3.html") {
        var address = sessionStorage.getItem("address");

        // Populate input fields with saved data
        document.getElementById("addressInput").value = address || "";
    }
}

// Load saved data when the page loads
loadSavedData();

// Function to validate and navigate
function validateAndNavigate() {
    if (filename === "add_event_1.html") {
        let _eventName = document.getElementById("eventName").value;
        let _description = document.getElementById("description").value;
        let _onlineCheckbox = document.getElementById("onlineCheckbox").checked;
        let _linkInput = document.getElementById("linkInput").value;

        // Get selected categories
        let _selectedCategories = [];
        let categoryCheckboxes = document.querySelectorAll('.category input[type="checkbox"]');
        categoryCheckboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                _selectedCategories.push(checkbox.id);
            }
        });

        // Validate the form fields using checkValidity()
        if (!_eventName) {
            // Handle invalid data (apply error style)
            alert("Please fill in the name of the event.");
            return; // Exit the function if data is invalid
        }

        // Check if the online checkbox is checked and the link input is empty
        if (_onlineCheckbox && !_linkInput) {
            alert("Please provide a link for the online event.");
            return; // Exit the function if the link is required but empty
        }

        // Store data in session storage
        sessionStorage.setItem("_eventName", _eventName);
        sessionStorage.setItem("_description", _description);
        sessionStorage.setItem("_onlineCheckbox", _onlineCheckbox);
        sessionStorage.setItem("_linkInput", _linkInput);
        sessionStorage.setItem("_selectedCategories", _selectedCategories.join(','));

        // Navigate to the next page
        window.location.href = "add_event_2.html";
    }

    if (filename === "add_event_2.html") {
        let dateStart = document.getElementById("date_start").value;
        let _startTime = document.getElementById("start").value;
        let _endTime = document.getElementById("end").value;
        let dateEndInput = document.getElementById("date_end");
        let toggle = document.getElementById("days");
        let _publicEvent = document.getElementById("public");
        let _saveTemplate = document.getElementById("template");

        let dateEnd = document.getElementById("date_end").value;
        if (dateEndInput.disabled) {
            dateEnd = dateStart; // Set dateEnd to dateStart if it's disabled
        }

        const selectedDate_start = new Date(dateStart);
        selectedDate_start.setHours(parseInt(_startTime.split(":")[0]), parseInt(_startTime.split(":")[1]));
        let iso_selected_start = selectedDate_start.toISOString();

        const selectedDate_end = new Date(dateEnd);
        selectedDate_end.setHours(parseInt(_endTime.split(":")[0]), parseInt(_endTime.split(":")[1]));
        let iso_selected_end = selectedDate_end.toISOString();

        const currentDate = new Date();
        currentDate.setMinutes(currentDate.getMinutes()); // Adding 1 minute

        if (selectedDate_start < currentDate) {
            alert("Please select a start date and time in the future.");
            return;
        }

        if (selectedDate_end <= selectedDate_start) {
            alert("Please select an end date and time after the start date and time.");
            return;
        }

        // Check if any of the required fields are empty
        if (!dateStart || (!dateEnd && document.getElementById("days").checked) || !_startTime || !_endTime) {
            alert("Please fill in all required fields.");
            return;
        }

        sessionStorage.setItem("selectedDate_start", iso_selected_start);
        sessionStorage.setItem("dateStart", dateStart);
        sessionStorage.setItem("_startTime", _startTime);
        sessionStorage.setItem("selectedDate_end", iso_selected_end);
        sessionStorage.setItem("_endTime", _endTime);
        sessionStorage.setItem("dateEnd", dateEnd); // Store dateEnd as well
        sessionStorage.setItem("toggle", toggle.checked); // Store whether the "days" checkbox is checked
        sessionStorage.setItem("publicEvent", _publicEvent.checked);
        sessionStorage.setItem("saveTemplate", _saveTemplate.checked);

        window.location.href = "add_event_3.html";
    }

    if (filename === "add_event_3.html") {
        let address = document.getElementById("addressInput").value;

        // Validate the form fields using checkValidity()
        if (!address) {
            // Handle invalid data (apply error style)
            alert("Please fill in the event's address.");
            return; // Exit the function if data is invalid
        }

        // Store data in session storage
        sessionStorage.setItem("address", address);

        // Navigate to the next page
        window.location.href = "add_event_4.html";
    }

    if (filename === "add_event_4.html") {
        // Get selected photo from session storage
        const _selectedPhoto = sessionStorage.getItem("_selectedPhoto");

        // Add selectedPhoto to the eventDetails object

        // Make a POST request to your server
        fetch('https://localhost:8080/api/event', {
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
}