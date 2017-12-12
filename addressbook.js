// Turn off the list of a new contact
document.getElementById("contactList").style.display = "none";
document.getElementById("contactSubmit").style.display = "none";

// The constructor function, by convention, starts with a capital letter
function CreateContact(firstName, lastName, phoneNumber, email, addNumberPhone, addNewEmail) { 
    //assign unique ID to the contact
        uniqueID++;
        this.id = uniqueID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = [phoneNumber];
        this.addNumberPhone = [addNumberPhone];
        this.email = email;
        this.addNewEmail = [addNewEmail];

}

CreateContact.prototype.getFullName = function(){
            return this.firstName + " " + this.lastName;
        }

// Unique ID of the sample contact
var uniqueID = 0;

var contactList = [];

function showContact(contactObj) {
    document.getElementById('contactTitle').innerHTML = contactObj.getFullName();
    document.getElementById('firstName').innerHTML = contactObj.firstName;  
    document.getElementById('lastName').innerHTML = contactObj.lastName;    
    document.getElementById('phoneNumber').innerHTML = contactObj.phoneNumber;
    document.getElementById('email').innerHTML = contactObj.email;
}

//show the list of contacts
function showList(contactObj) {
    
    document.getElementById('contactList').innerHTML += '<hr><li class="list-group-item"; id="contactInList"><h4 id="contactTitle1">'+contactObj.id+'. '+contactObj.getFullName()+'</h4>';

    document.getElementById('contactList').innerHTML += '<li class="list-group-item">First Name:'+'<h5><span class="badge badge-secondary" id="firstName1" >'+contactObj.firstName+'</span><button type="button" class="btn btn-defualt" id="editButton" onclick="editFirstName('+'\''+contactObj.firstName+'\''+');"><i class="glyphicon glyphicon-edit"></i></button></h5></li>';

    document.getElementById('contactList').innerHTML += '<li class="list-group-item">Last Name:'+'<h5><span class="badge badge-secondary" id="lastName1">'+contactObj.lastName+'</span><button type="button" class="btn btn-defualt" id="editButton" onclick="editLastName('+'\''+contactObj.lastName+'\''+');"><i class="glyphicon glyphicon-edit"></i></button></h5></li>';
    

    document.getElementById('contactList').innerHTML += '<li class="list-group-item">Phone Number:'+'<h5><button onclick="addPhone()" id="addPhone" type="button" class="btn btn-default btn-circle"><i class="glyphicon glyphicon-plus"></i></button><span class="badge badge-secondary" id="phoneNumber1">'+contactObj.phoneNumber+'</span>'+contactObj.addNumberPhone+'</h5></li>';

    document.getElementById('contactList').innerHTML += '<li class="list-group-item">Email:'+'<h5><button onclick="addEmail()" id="addEmail" type="button" class="btn btn-default btn-circle"><i class="glyphicon glyphicon-plus"></i></button><span class="badge badge-secondary" id="email">'+contactObj.email+'</span>'+contactObj.addNewEmail+'</h5></li>';
   
    //a button to duplicate the contact 
    document.getElementById('contactList').innerHTML += '<button type="button" id="'+contactObj.id+'" class="btn btn-default btn-sm duplicateContact">Duplicate</button';  

    document.getElementById('contactList').innerHTML += '<button onclick="deleteButton('+contactObj.id+')" type="button" class="btn btn-danger btn-sm" id="deleteButton">Delete</button></li>'    

}

//click to show the list of saved contacts
document.getElementById('showContactList').addEventListener('click', function(){
    var getLocalContacts = JSON.parse(localStorage.getItem('contactCache'));
    // add sample contact
    if (getLocalContacts === null || getLocalContacts.length === 0) {
        // Check if array is empty and don't double the sample contact
        if (contactList[0] === undefined){
            // Create sample contact
            var newContact = new CreateContact("Bill", "Door", "01 234 323 343", "billdoor@microsoft.com");
            // Push it to contact array
            contactList.push(newContact);

            // Display sample contact
            document.getElementById("contactSubmit").style.display = "none";
            document.getElementById("contactList").style.display = "block";
            showList(newContact);

        }
    } 
    else {       
        document.getElementById('contactList').innerHTML = '';
        document.getElementById("contactSubmit").style.display = "none";
        document.getElementById("contactList").style.display = "block";
        // loop through the array, and display contacts
        getLocalStorage()
    }
});

//check if the duplicate button was clicked
document.querySelector("#contactList").addEventListener('click', function(e){
  if(e.target.className === 'btn btn-default btn-sm duplicateContact'){
    //get the id of the contact which we want to duplicate
    var id = Number(e.target.id);
      
    // get contact by id
    contact = getContactByID(id);
      
    //asign properties
    var firstName = contact.firstName;
    var lastName = contact.lastName + ".copy";
    var phoneNumber = contact.phoneNumber;
    var email = contact.email;

    //create a duplicated contact
    var newContact = new CreateContact(firstName, lastName, phoneNumber, email);
    // push contact to contact list
    contactList.push(newContact);

    // refresh contact list
    showContactList();
  }
});

// gets contact by its ID, returns false if doesn't exist
function getContactByID(id) {
  // loop through the contactList array
    for(var i=0; i<contactList.length; i++){
        // check if the contact's ID is equal to id
        if(contactList[i].id === id) return contactList[i];
  }
    // Looping through the object of contacts
    contactList.forEach(function(index){
        showList(index);   
    });
    //delete hr from the first contact
    document.querySelector('hr:first-child').style.display = "none";
};

function deleteButton(idNumber) {

        var getLocalContacts = JSON.parse(localStorage.getItem('contactCache'));
        
        // loop through contacts from local storage
        for (var i = 0; i <  getLocalContacts.length; i++) {
            console.log(i);
            // If a contact ID from local storage is eaqual, delete
            if (getLocalContacts[i].id === idNumber) {
                getLocalContacts.splice(i, 1);
            }
        }
        // Save left contacts into local storage    
        localStorage.setItem('contactCache', JSON.stringify(getLocalContacts));
        // Clear displayed contacts
        document.getElementById('contactList').innerHTML = '';
        // Show new contacts from local storage
        getLocalStorage()
}

// add new number phone to exisiting one
function addPhone() {
    var addNumberPhone = prompt("Type a number phone: ");
    //check if string or number
    addNumberPhone1 = Number(addNumberPhone);

    if (addNumberPhone !== null) {
        if (addNumberPhone !== "") {
            if (Number.isInteger(addNumberPhone1) !== false) {
                var newContact2 = new CreateContact(addNumberPhone);
                contactList[0].addNumberPhone.push('<h5><span class="badge badge-secondary" id="phoneNumber1">'+addNumberPhone+'</span></h5>');
            } else {
                alert("Please, type a phone number");
            }
        }
    }
    showContactList()
}
    
// add new email to exisiting contact
function addEmail() {
    var getValue = prompt("Add new email: ");
    var newContact3 = new CreateContact(getValue)
    console.log(typeof getValue);
    
    if (getValue !== null) {
        if (getValue !== "") {
            //document.getElementById("email").innerHTML += getValue;
            contactList[0].addNewEmail.push('<h5><span class="badge badge-secondary"  id="phoneNumber1">'+getValue+'</span></h5>')
        }
    }
    showContactList()
}

// edit first name  
function editFirstName(editFirstName) {
    var editFirst = prompt("Type new first name: ");
    
    for (var i = 0; i < contactList.length; i++) {
        var editFirstName = editFirstName.toString();  
        
    // prevent from accepting empty field and null (cancel button) 
        if (editFirst !== null && editFirst !== "") {
            if (contactList[i].firstName === editFirstName) {
                contactList[i].firstName = editFirst;
            }
        } 
    }
    showContactList();  
}   

// edit last name  
function editLastName(editLastName) {
    
    var editLast = prompt("Type new last name: ")
    
    for (var i = 0; i < contactList.length; i++) {
        
        var editLastName = editLastName.toString();
    if (editLast !== null && editLast !== "") {
        if(contactList[i].lastName === editLastName) {
            contactList[i].lastName = editLast;
        }
    }
    }
    showContactList(); 
}


function showContactList() {
    // clear contact list content
    document.getElementById('contactList').innerHTML = '';
    
    // check if contact list is not empty
    if(contactList && contactList.length) {
        
      // sort contact list by last name
      contactList = contactList.sort(compareByName);
        
        var getLocalContacts = JSON.parse(localStorage.getItem('contactCache'));
        
      // loop through the array, and display contacts
        getLocalContacts.forEach(function(index){
            showList(index);
        });
        
    //remove hr and add margin to first contact  
//    document.querySelector("hr:first-child").style.display = "none";
    document.querySelector("li").style.marginTop = "6px";
  } 
}

function compareByName(a, b) {
  if (a.lastName < b.lastName)
    return -1;
  if (a.lastName > b.lastName)
    return 1;
  return 0;
}