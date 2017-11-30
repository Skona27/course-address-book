// click a button to create a new contact and show it in the list
document.getElementById("createNewContact").addEventListener('click', saveContact);
    
function saveContact(e) {
    var inputFirstName = document.getElementById("inputFirstName").value;
    var inputLastName = document.getElementById("inputLastName").value;
    var inputPhoneNumber = document.getElementById("inputPhoneNumber").value;
    var inputEmail = document.getElementById("inputEmail").value;
    var phoneNumberString = Number(inputPhoneNumber);
    
    // save the contact but first fill all blank spaces
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

        // create a contact
        var newContact = new createContact(uniqueID, inputFirstName, inputLastName, inputPhoneNumber, inputEmail);
    
        // add contact to the list of contacts  
        contactList.push(newContact);
      
        // save contact to browser cache in JSON
        localStorage.setItem('contactCache', JSON.stringify(contactList));
        
        // show the contact
        showSubmitContact(newContact);
        clearContactForm();
                   
    }
    else {
        // create a contact
        var newContact = new createContact(uniqueID, inputFirstName, inputLastName, inputPhoneNumber, inputEmail);
        
        // JSON: get contacts from local storage and parse it
        var getContactCache = JSON.parse(localStorage.getItem('contactCache'));
        
        // add contact to the list of contacts  
        contactList.push(newContact);
       
        // add new contact to local storage with existing contacts
        localStorage.setItem('contactCache', JSON.stringify(contactList));
        
        // test if works
        console.log(JSON.parse(localStorage.getItem('contactCache')));
        
        // show the contact
        showSubmitContact(newContact);
        clearContactForm();
    }
    console.log(localStorage.getItem('contactCache'));
  e.preventDefault();
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