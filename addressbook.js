// turn off the list of a new contact
document.getElementById("contactList").style.display = "none";

function createContact(firstName, lastName, phoneNumber, email) { 
    return{
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
        getFullName: function(){
            return firstName + " " + this.lastName;
        }
    }
}

var sampleContact = {
  firstName: "Bill",
  lastName: "Door",
  phoneNumber: "01 294 323 434",
  email: "billdoor@microsoft.com",
}

var contactList = [createContact(
    sampleContact.firstName, 
    sampleContact.lastName,
    sampleContact.phoneNumber, 
    sampleContact.email
)];

function showContact(contactObj) {
  document.getElementById('contactTitle').innerHTML = contactObj.getFullName();    
  document.getElementById('firstName').innerHTML = contactObj.firstName;  
  document.getElementById('lastName').innerHTML = contactObj.lastName;    
  document.getElementById('phoneNumber').innerHTML = contactObj.phoneNumber;
  document.getElementById('email').innerHTML = contactObj.email;
}


//show the list of contacts
function showList(contactObj) {
  document.getElementById('contactList').innerHTML += '<hr><h4 id="contactTitle">'+contactObj.getFullName()+'</h4>';  
    
  document.getElementById('contactList').innerHTML += '<li class="list-group-item">First Name:'+'<h5><span class="badge badge-secondary" id="firstName">'+contactObj.firstName+'</span></h5></li>';
    
  document.getElementById('contactList').innerHTML += '<li class="list-group-item">Last Name:'+'<h5><span class="badge badge-secondary" id="lastName">'+contactObj.lastName+'</span></h5></li>';
    
  document.getElementById('contactList').innerHTML += '<li class="list-group-item">Phone Number:'+'<h5><span class="badge badge-secondary" id="phoneNumber">'+contactObj.phoneNumber+'</span></h5></li>';

  document.getElementById('contactList').innerHTML += '<li class="list-group-item">Email:'+'<h5><span class="badge badge-secondary" id="email">'+contactObj.email+'</span></h5></li>';
    
}

//click a button to create a new contact and show it in the list
document.getElementById("createNewContact").addEventListener('click', function(e){
    var inputFirstName = document.getElementById("inputFirstName").value;
    var inputLastName = document.getElementById("inputLastName").value;
    var inputPhoneNumber = document.getElementById("inputPhoneNumber").value;
    var inputEmail = document.getElementById("inputEmail").value;
    var phoneNumberString = Number(inputPhoneNumber);
//create a contact
    var newContact = new createContact(inputFirstName, inputLastName, inputPhoneNumber, inputEmail);
    

    
//save the contact but first fill all blank spaces
    if (inputFirstName === "") {
        alert("Please type first name");
    } else if (inputLastName === "") {
        alert("Please type last name")
    } else if (inputPhoneNumber === "") {
        alert("Please type phone number")
    }
        // alert if user provided not a number
      else if (Number.isInteger(phoneNumberString) !== true) {
          alert("Not number");

    } else if (inputEmail === "") {
        alert("Please type email");
    }
     else {
        contactList.push(newContact);
        //show the contact
        document.getElementById("contactList").style.display = "block";
        showContact(newContact);
    }
    
    e.preventDefault();
});


//click to show the list of saved contacts
document.getElementById('showContactList').addEventListener('click', function(){
    
    //close the form of Sample Contact
    document.getElementById("contactList").style.display = "block";
    // Looping through the object of contacts
    contactList.forEach(function(index){
    showList(index);
        
    });
    
});


// To do: remove sample contact when contacts button clicked
// when clicking button submit, contact lists turns off.