const eventDetails = {
    eventName: sessionStorage.getItem("eventName"),
    description: sessionStorage.getItem("description"),
    onlineCheckbox: sessionStorage.getItem("onlineCheckbox"),
    linkInput: sessionStorage.getItem("linkInput"),
    selectedCategories: (sessionStorage.getItem("selectedCategories") || '').split(','),
    dateStart: sessionStorage.getItem("dateStart"),
    startTime: sessionStorage.getItem("startTime"),
    endTime: sessionStorage.getItem("endTime"),
    participants: sessionStorage.getItem("participants"),
    saveTemplate: sessionStorage.getItem("saveTemplate"),
    publicEvent: sessionStorage.getItem("publicEvent"), 
    dateEnd: sessionStorage.getItem("dateEnd"),
    address: sessionStorage.getItem("address"),
    selectedPhoto: null, // You can initialize it as null here
};


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
        let linkInput = document.getElementById("linkInput");
        linkInput.disabled = !this.checked;
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
        sessionStorage.setItem("participants", participantsInput.value);
    }

    // Function to decrement participants
    function decrementParticipants() {
        let participantsInput = document.getElementById("participants");
        let newValue = parseInt(participantsInput.value) - 1;
        if (newValue < 0) {
            newValue = 0;
        }
        participantsInput.value = newValue;
        sessionStorage.setItem("participants", newValue);
        
        // function handleSaveTemplateAndPublicEvent() {
        //     eventDetails.saveTemplate = document.getElementById("saveTemplate").checked;
        //     eventDetails.publicEvent = document.getElementById("publicEvent").checked;
        // }
    
        // // Add event listeners to the saveTemplate and publicEvent checkboxes
        // document.getElementById("saveTemplate").addEventListener("change", handleSaveTemplateAndPublicEvent);
        // document.getElementById("publicEvent").addEventListener("change", handleSaveTemplateAndPublicEvent);
    }
}

// Function to change the background photo
let selectedPhoto = null; // To keep track of the selected photo

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
        if (selectedPhoto) {
            let prevPhoto = document.getElementById(`photo${selectedPhoto}`);
            if (prevPhoto) {
                prevPhoto.checked = false;
            }
        }

        // Update the selected photo
        selectedPhoto = photoName;
        sessionStorage.setItem("selectedPhoto", selectedPhoto);
    } else {
        console.error("Element with id 'main_media' not found.");
    }
}

// Function to load saved data from sessionStorage
function loadSavedData() {
    if (filename === "add_event_1.html") {
        let eventName = sessionStorage.getItem("eventName");
        let description = sessionStorage.getItem("description");
        let onlineCheckbox = sessionStorage.getItem("onlineCheckbox");
        let linkInput = sessionStorage.getItem("linkInput");
        let selectedCategories = sessionStorage.getItem("selectedCategories");

        // Populate input fields and checkboxes with saved data
        document.getElementById("eventName").value = eventName || "";
        document.getElementById("description").value = description || "";
        document.getElementById("onlineCheckbox").checked = onlineCheckbox === "true";
        document.getElementById("linkInput").value = linkInput || "";

        // Enable/disable the link input based on the checkbox
        document.getElementById("linkInput").disabled = !document.getElementById("onlineCheckbox").checked;

        // Restore selected categories
        if (selectedCategories) {
            let categories = selectedCategories.split(',');
            categories.forEach(function (category) {
                document.getElementById(category).checked = true;
            });
        }
        // Update category count display
        updateCategoryCount();
    }

    if (filename === "add_event_2.html") {
        let dateStart = sessionStorage.getItem("dateStart");
        let dateEnd = sessionStorage.getItem("dateEnd");
        let startTime = sessionStorage.getItem("startTime");
        let endTime = sessionStorage.getItem("endTime");
        let participants = sessionStorage.getItem("participants");
        let saveTemplate = sessionStorage.getItem("saveTemplate");
        let publicEvent = sessionStorage.getItem("publicEvent");

        // Populate input fields and checkboxes with saved data
        document.getElementById("date_start").value = dateStart || "";
        document.getElementById("date_end").value = dateEnd || "";
        document.getElementById("start").value = startTime || "";
        document.getElementById("end").value = endTime || "";
        document.getElementById("participants").value = participants || "0";
        document.getElementById("saveTemplate").checked = saveTemplate === "true";
        document.getElementById("publicEvent").checked = publicEvent === "true";

        // Enable/disable the date end picker based on the checkbox
        document.getElementById("date_end").disabled = !document.getElementById("days").checked;
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
        let eventName = document.getElementById("eventName").value;
        let description = document.getElementById("description").value;
        let onlineCheckbox = document.getElementById("onlineCheckbox").checked;
        let linkInput = document.getElementById("linkInput").value;

        // Get selected categories
        let selectedCategories = [];
        let categoryCheckboxes = document.querySelectorAll('.category input[type="checkbox"]');
        categoryCheckboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                selectedCategories.push(checkbox.id);
            }
        });

        // Validate the form fields using checkValidity()
        if (!eventName) {
            // Handle invalid data (apply error style)
            alert("Please fill in the name of the event.");
            return; // Exit the function if data is invalid
        }

        // Check if the online checkbox is checked and the link input is empty
        if (onlineCheckbox && !linkInput) {
            alert("Please provide a link for the online event.");
            return; // Exit the function if the link is required but empty
        }

        // Store data in session storage
        sessionStorage.setItem("eventName", eventName);
        sessionStorage.setItem("description", description);
        sessionStorage.setItem("onlineCheckbox", onlineCheckbox);
        sessionStorage.setItem("linkInput", linkInput);
        sessionStorage.setItem("selectedCategories", selectedCategories.join(','));

        // Navigate to the next page
        window.location.href = "add_event_2.html";
    }

    if (filename === "add_event_2.html") {
        let dateStart = document.getElementById("date_start").value;
        let startTime = document.getElementById("start").value;
        let endTime = document.getElementById("end").value;
        let dateEndInput = document.getElementById("date_end");
        let toggle = document.getElementById("days");
        let publicEvent = document.getElementById("public");
        let saveTemplate = document.getElementById("template");

        let dateEnd = document.getElementById("date_end").value;
        if (dateEndInput.disabled) {
            dateEnd = dateStart; // Set dateEnd to dateStart if it's disabled
        }

        const selectedDate_start = new Date(dateStart);
        selectedDate_start.setHours(parseInt(startTime.split(":")[0]), parseInt(startTime.split(":")[1]));

        const selectedDate_end = new Date(dateEnd);
        selectedDate_end.setHours(parseInt(endTime.split(":")[0]), parseInt(endTime.split(":")[1]));

        const currentDate = new Date();
        currentDate.setMinutes(currentDate.getMinutes() + 1); // Adding 1 minute

        if (selectedDate_start < currentDate) {
            alert("Please select a start date and time in the future.");
            return;
        }

        if (selectedDate_end <= selectedDate_start) {
            alert("Please select an end date and time after the start date and time.");
            return;
        }

        // Check if any of the required fields are empty
        if (!dateStart || (!dateEnd && document.getElementById("days").checked) || !startTime || !endTime) {
            alert("Please fill in all required fields.");
            return;
        }

        sessionStorage.setItem("dateStart", dateStart);
        sessionStorage.setItem("startTime", startTime);
        sessionStorage.setItem("endTime", endTime);
        sessionStorage.setItem("dateEnd", dateEnd); // Store dateEnd as well
        sessionStorage.setItem("toggle", toggle.checked); // Store whether the "days" checkbox is checked
        sessionStorage.setItem("publicEvent", publicEvent.checked);
        sessionStorage.setItem("saveTemplate", saveTemplate.checked);

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
     const selectedPhoto = sessionStorage.getItem("selectedPhoto");

     // Add selectedPhoto to the eventDetails object
     eventDetails.selectedPhoto = selectedPhoto;
 
     // Make a POST request to your server
     fetch('http://localhost:3000/events', {
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
