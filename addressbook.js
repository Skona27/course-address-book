// turn off the list of a new contact
document.getElementById("contactList").style.display = "none";
document.getElementById("contactSubmit").style.display = "none";
function createContact(id, firstName, lastName, phoneNumber, email) { 
    //assign unique ID to the contact
    uniqueID++;
    return{
        id: id,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
        getFullName: function(){
            return firstName + " " + this.lastName;
        }
    }
}

//unique ID of the sample contact
var uniqueID = 1;

var sampleContact = {
  id: uniqueID,
  firstName: "Bill",
  lastName: "Door",
  phoneNumber: "01 294 323 434",
  email: "billdoor@microsoft.com"
}

var contactList = [createContact(
    sampleContact.id,
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
  document.getElementById('contactList').innerHTML += '<hr><h4 id="contactTitle">'+contactObj.id+". " +contactObj.getFullName()+'</h4>';  
    
  document.getElementById('contactList').innerHTML += '<li class="list-group-item">First Name:'+'<h5><span class="badge badge-secondary" id="firstName">'+contactObj.firstName+'</span></h5></li>';
    
  document.getElementById('contactList').innerHTML += '<li class="list-group-item">Last Name:'+'<h5><span class="badge badge-secondary" id="lastName">'+contactObj.lastName+'</span></h5></li>';
    
  document.getElementById('contactList').innerHTML += '<li class="list-group-item">Phone Number:'+'<h5><span class="badge badge-secondary" id="phoneNumber">'+contactObj.phoneNumber+'</span></h5></li>';

  document.getElementById('contactList').innerHTML += '<li class="list-group-item">Email:'+'<h5><span class="badge badge-secondary" id="email">'+contactObj.email+'</span></h5></li>';
    
   document.getElementById('contactList').innerHTML += '<button onclick="deleteButton()" style="margin-top:15px" type="button" class="btn btn-danger btn-sm" id="deleteButton">Delete</button>'    
    
}

//click a button to create a new contact and show it in the list
document.getElementById("createNewContact").addEventListener('click', function(e){
    var inputFirstName = document.getElementById("inputFirstName").value;
    var inputLastName = document.getElementById("inputLastName").value;
    var inputPhoneNumber = document.getElementById("inputPhoneNumber").value;
    var inputEmail = document.getElementById("inputEmail").value;
    var phoneNumberString = Number(inputPhoneNumber);
    
//save the contact but first fill all blank spaces
    if (inputFirstName === "") {
        alert("Please type first name");
    } else if (inputLastName === "") {
        alert("Please type last name")
    } else if (inputPhoneNumber === "") {
        alert("Please type phone number")
    }
        // alert if user provided not a number
      else if (phoneNumberString !== Number(inputPhoneNumber)) {
          alert("Not number");

    } else if (inputEmail === "") {
        alert("Please type email");
    }
     else {
         
      //create a contact
      var newContact = new createContact(uniqueID, inputFirstName, inputLastName, inputPhoneNumber, inputEmail);

        contactList.push(newContact);
        //show the contact
        
        document.getElementById("contactSubmit").style.display = "block";
         document.getElementById("contactList").style.display = "none";
        showContact(newContact);
    }
    
    
    
    e.preventDefault();
});

//click to show the list of saved contacts
document.getElementById('showContactList').addEventListener('click', function(){
    
    // close the sample contact if shown
    document.getElementById("contactSubmit").style.display = "none";
    
    //  show the contact list
    document.getElementById("contactList").style.display = "block";

    // cleaning the contact list(if button clicked twice, contact list still displays properly)
    document.getElementById('contactList').innerHTML = '';
    
    // Looping through the object of contacts
    contactList.forEach(function(index){
      showList(index);   
    });
    
});

//function deleteButton() {
//    if (contactList.pop())
//    contactList.forEach(function(index){
//        document.getElementById('contactList').innerHTML = ''
//        showList(index);
//        console.log(index);
//    });
//    console.log(uniqueID);
//}
//
//$('#deleteButton').on("click", function(e){
//    console.log("it works!");
//});