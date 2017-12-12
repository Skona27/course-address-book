// Set ID number to the number saved in local storage
uniqueID = JSON.parse(localStorage.getItem('uniqueNum'));
// Click a button to create a new contact and show it in the list
document.getElementById("createNewContact").addEventListener('click', saveContact);
    
function saveContact(e) {
    var inputFirstName = document.getElementById("inputFirstName").value;
    var inputLastName = document.getElementById("inputLastName").value;
    var inputPhoneNumber = document.getElementById("inputPhoneNumber").value;
    var inputEmail = document.getElementById("inputEmail").value;
    var phoneNumberString = Number(inputPhoneNumber);
    var getContactCache = JSON.parse(localStorage.getItem('contactCache'));

    // Save the contact but first fill all blank spaces
    if (inputFirstName.value === "") {
        alert("Please type first name");
    } 
    else if (inputLastName === "") {
        alert("Please type last name");
    } 
    else if (inputPhoneNumber === "") {
        alert("Please type phone number");
    }
     // alert if user provided not a number
    else if (Number.isInteger(phoneNumberString) === false) {
        alert("Not number");
    } 
    else if (inputEmail === "") {
        alert("Please type email");
    } 
    // check if local storage is empty
    else if (localStorage.getItem('contactCache') === null) {
        // Set ID to count from 1 when local storage is empty
        uniqueID = 0;
        
        // Create a new contact
        var newContact = new CreateContact(inputFirstName, inputLastName, inputPhoneNumber, inputEmail);
        
        // If sample contact exist, delete it
        if (contactList[0] !== undefined) {
            contactList = [];
            document.getElementById('contactList').innerHTML = '';
            console.log(contactList[0]);
        }
        // Add contact to the list of contacts  
        contactList.push(newContact);
      
        // Save contact to browser cache in JSON
        localStorage.setItem('contactCache', JSON.stringify(contactList));
        localStorage.setItem('uniqueNum', JSON.stringify(uniqueID));
        
        // Show the contact
        showSubmitContact(newContact);
        clearContactForm();
                   
    }
    // When local storage is not empty, add a next contact
    else {
        // If sample contact exist, delete it
        if (contactList[0] !== undefined) {
            contactList = [];
            document.getElementById('contactList').innerHTML = '';
            console.log(contactList[0]);
        }
        var getLocalContacts = JSON.parse(localStorage.getItem('contactCache'));
        // Create a contact
        var newContact = new CreateContact(inputFirstName, inputLastName, inputPhoneNumber, inputEmail);
        
        // Save contacts to local storage
        saveLocalStorage(getContactCache, newContact);

        // Show the contact
        showSubmitContact(newContact);
        clearContactForm();
    }
  e.preventDefault();
}

function saveLocalStorage(getContactCache, newContact) {
    // Clear array of contacts
    contactList = [];
    for (const cacheContacts of getContactCache) {
        // Add contact to the list of contacts.
        contactList.push(cacheContacts);
    }

        // Save new contact in the array
        contactList.push(newContact); 
        
        // Save ID number in local storage
        localStorage.setItem('uniqueNum', JSON.stringify(uniqueID));
        
        // Add new contact to local storage with existing contacts
        localStorage.setItem('contactCache', JSON.stringify(contactList));
        
        // Test if works
        console.log(JSON.parse(localStorage.getItem('contactCache')));
}

function getLocalStorage() {
    var getLocalContacts = JSON.parse(localStorage.getItem('contactCache'))
    // loop through the array, and display contacts
    for (var i = 0; i < getLocalContacts.length; i++) {
        // Add function getFullName to every objects from local storage
        getLocalContacts[i].getFullName = function(){
        return this.firstName + " " + this.lastName;
        }
        // show full contact with function
        showList(getLocalContacts[i]);    
    }
}

// show the contact
function showSubmitContact(newContact) {
      document.getElementById("contactSubmit").style.display = "block";
      document.getElementById("contactList").style.display = "none";
      showContact(newContact);
}

// clear the contact form
function clearContactForm() {
      document.getElementById("inputFirstName").value = "";
      document.getElementById("inputLastName").value = "";
      document.getElementById("inputPhoneNumber").value = "";
      document.getElementById("inputEmail").value = "";
        
      document.getElementById("contactSubmit").style.display = "block";
      document.getElementById("contactList").style.display = "none";
}