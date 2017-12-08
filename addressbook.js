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
        phoneNumber: [phoneNumber],
        email: email,
        getFullName: function(){
            return firstName + " " + this.lastName;
        }
    }
}

//unique ID of the sample contact
var uniqueID = 0;

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
  document.getElementById('contactList').innerHTML += '<hr><li class="list-group-item"; id="contactInList"><h4 id="contactTitle1">'+contactObj.id+". " +contactObj.getFullName()+'</h4>';  
    
  document.getElementById('contactList').innerHTML += '<li class="list-group-item">First Name:'+'<h5><span class="badge badge-secondary" id="firstName1" >'+contactObj.firstName+'</span><button style="float: right; margin: -5px; background-color: white;" type="button" class="btn btn-defualt" id="editButton" onclick="editFirstName()"><i style="float: right;" class="glyphicon glyphicon-edit"></i></button></h5></li>';
    
  document.getElementById('contactList').innerHTML += '<li class="list-group-item">Last Name:'+'<h5><span class="badge badge-secondary" id="lastName1">'+contactObj.lastName+'</span></h5></li>';
    

  document.getElementById('contactList').innerHTML += '<li class="list-group-item">Phone Number:'+'<h5><button onclick="addPhone()" id="addPhone" type="button" class="btn btn-default btn-circle" style="border-radius:30px; float:right; margin-top:-10px;"><i class="glyphicon glyphicon-plus"></i></button><span class="badge badge-secondary" id="phoneNumber-'+contactObj.id+'">'+contactObj.phoneNumber+'</span></h5></li>';

  document.getElementById('contactList').innerHTML += '<li class="list-group-item">Email:'+'<h5><span class="badge badge-secondary" id="email">'+contactObj.email+'</span></h5></li>';
   
  //a button to duplicate the contact 
  document.getElementById('contactList').innerHTML += '<button type="button" id="'+contactObj.id+'" style="margin-top:15px" class="btn btn-default btn-sm duplicateContact">Duplicate</button';  

  document.getElementById('contactList').innerHTML += '<button onclick="deleteButton('+contactObj.id+')" style="float: right; margin-top:15px" type="button" class="btn btn-danger btn-sm" id="deleteButton">Delete</button></li>'    

}

//click a button to create a new contact and show it in the list
document.getElementById("createNewContact").addEventListener('click', function(e){
    var inputFirstName = document.getElementById("inputFirstName").value;
    var inputLastName = document.getElementById("inputLastName").value;
    var inputPhoneNumber = document.getElementById("inputPhoneNumber").value;
    var inputEmail = document.getElementById("inputEmail").value;
    var phoneNumberString = Number(inputPhoneNumber);
    
    //save the contact but first fill all blank spaces
    if (inputFirstName.value === "") {
        alert("Please type first name");
    } else if (inputLastName === "") {
        alert("Please type last name")
    } else if (inputPhoneNumber === "") {
        alert("Please type phone number")
    }
        // alert if user provided not a number
      else if (Number.isInteger(phoneNumberString) === false) {
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
      
      // clear the contact form
      document.getElementById("inputFirstName").value = "";
      document.getElementById("inputLastName").value = "";
      document.getElementById("inputPhoneNumber").value = "";
      document.getElementById("inputEmail").value = "";
    }
        //show the contact
        
        document.getElementById("contactSubmit").style.display = "block";
        document.getElementById("contactList").style.display = "none";
        showContact(newContact);
        
         //clear the contact form
 /*        document.getElementById("inputFirstName").value = "";
         document.getElementById("inputLastName").value = "";
         document.getElementById("inputPhoneNumber").value = "";
         document.getElementById("inputEmail").value = "";*/
         
    //delete sample contact when adding a new contact
        if (contactList[0].id === 0) 
            contactList.shift();

  e.preventDefault();
});

//click to show the list of saved contacts
document.getElementById('showContactList').addEventListener('click', function(){
    
    // close the sample contact if shown
    document.getElementById("contactSubmit").style.display = "none";
    
    //  show the contact list
    document.getElementById("contactList").style.display = "block";

    // refresh contact list
    showContactList();
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
    var newContact = new createContact(uniqueID, firstName, lastName, phoneNumber, email);
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

    
/*    
function deleteButton(idNumber) {   
    //check console for error
    console.log(idNumber);

    delete sampleContact.firstName;
    console.log(sampleContact.firstName);
    document.getElementById("deleteButton1").setAttribute("onClick", "");
    console.log(sampleContact);
}
    */

    // iterate through contactList and match the name (contact) to delete

    for (var i = 0; i < contactList.length; i++) {
        console.log(contactList[i].id === idNumber);
//        idNumber = Number(idNumber);
        // if name in a contact is the same, delete it
         if (contactList[i].id === idNumber) {
        console.log(contactList[i].id);
             console.log(contactList)
            contactList.splice(i,1);
            console.log(contactList[i].id);
             console.log(contactList);
         } 
            
    }
    //refresh contact list
    document.getElementById("contactList").innerHTML = '';
    contactList.forEach(function(index){
        showList(index);
       
    });
}

// add new number phone to exisiting one
function addPhone() {
    // Get string
    var addNumberPhone = prompt("Type a number phone: ", "034 232 323");
    
    // Change string to number
    var checkIfNumber = Number(addNumberPhone);
    
    // Check if user click cancel
    if (addNumberPhone !== null) {
        // Check if user submit empty input
        if (addNumberPhone !== "") {
            // Check if string or number
            if (Number.isInteger(checkIfNumber) !== false) {
                // Create a next phone number
//                var placeNextNumber = new createContact(phoneNumber);
                // Add a next phone number to exact contact
                contactList.forEach(function(index){
                    console.log(index);
                    index.phoneNumber.push(addNumberPhone);
                });
            } 
            else {
                alert("Please, type a phone number");
            }
        }
    }
   // showContactList();
    // Loop through all phone numbers array
    for (var i = 0; i < contactList.length; i++) {
        var showNextContact = contactList[i].phoneNumber.map(function(i) {
            return i;
        });
        showList(showNextContact);
    }
}

console.log(contactList[0].phoneNumber);
//edit first name
function editFirstName() {
    
    
    
}






/*    document.getElementById("contactList").innerHTML = '';
    contactList.forEach(function(index){
        showList(index);
    });*/

/*    for(var i = 0; i < arrayOfObjects.length; i++) {
    var obj = arrayOfObjects[i];

    if(listToDelete.indexOf(obj.id) !== -1) {
        arrayOfObjects.splice(i, 1);
    }*/
    
    
/*    var a = contactList.unshift(addNumberPhone);
    console.log(typeof addNumberPhone);
    if (addNumberPhone.isInteger === true)
            contactList[0].phoneNumber = addNumberPhone;*/
    

function showContactList() {
  // clear contact list content
  document.getElementById('contactList').innerHTML = '';
  // check if contact list is not empty
  if(contactList && contactList.length) {
    // loop through the array, and display contacts
    contactList.forEach(function(index){
      showList(index);
    });
    //remove hr and add margin to first contact  
    document.querySelector("hr:first-child").style.display = "none";
    document.querySelector("li").style.marginTop = "6px";
  } 
}



//other option still need to be fixed
//$('#contactList').on("click", '#deleteButton', function(){
//     var i = $(this).closest('#firstName1').text();
//     
//     for (var i = 0; i < contactList.length; i++) {
//        console.log(contactList[i].firstName, $('#firstName1').text());
//        // if name in a contact is the same, delete it
//        if (contactList[i].firstName === i)
//            contactList.splice(i, 1);
//            console.log("success", $('#firstName1').text(), $(this).find('#firstName').text());
//     }
//});
