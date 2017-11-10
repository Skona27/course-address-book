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
    
  document.getElementById('contactList').innerHTML += '<li class="list-group-item">First Name:'+'<h5><span class="badge badge-secondary" id="firstName1">'+contactObj.firstName+'</span></h5></li>';
    
  document.getElementById('contactList').innerHTML += '<li class="list-group-item">Last Name:'+'<h5><span class="badge badge-secondary" id="lastName1">'+contactObj.lastName+'</span></h5></li>';
    
  document.getElementById('contactList').innerHTML += '<li class="list-group-item">Phone Number:'+'<h5><span class="badge badge-secondary" id="phoneNumber1">'+contactObj.phoneNumber+'</span><button onclick="addPhone()" id="addPhone" type="button" class="btn btn-default btn-circle" style="border-radius:30px; float:right; margin-top:-10px;"><i class="glyphicon glyphicon-plus"></i></button></h5></li>';

  document.getElementById('contactList').innerHTML += '<li class="list-group-item">Email:'+'<h5><span class="badge badge-secondary" id="email1">'+contactObj.email+'</span><button onclick="addPhone()" id="addPhone" type="button" class="btn btn-default btn-circle" style="border-radius:30px; float:right; margin-top:-10px;"><i class="glyphicon glyphicon-plus"></i></button></h5></li>';
    
   document.getElementById('contactList').innerHTML += '<button onclick="deleteButton(\''+contactObj.id+'\')" style="margin-top:15px" type="button" class="btn btn-danger btn-sm" id="deleteButton">Delete</button></li>'    
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
        
         //clear the contact form
         document.getElementById("inputFirstName").value = "";
         document.getElementById("inputLastName").value = "";
         document.getElementById("inputPhoneNumber").value = "";
         document.getElementById("inputEmail").value = "";
         }
    
    //delete sample contact when adding a new contact
        if (contactList[0].id === 0) 
        contactList.shift();
           
        
  
    
    e.preventDefault();
});

//click to show the list of saved contacts
document.getElementById('showContactList').addEventListener('click', function(){
    
    console.log(contactList[0].id)
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


function deleteButton(idNumber) {
    //check console for error
    console.log(Number(idNumber));
    console.log(jQuery.type());


    // iterate through contactList and match the name (contact) to delete
    for (var i = 0; i < contactList.length; i++) {
        console.log(contactList[i].id === idNumber);
        
        // if name in a contact is the same, delete it
         if (contactList[i].id === idNumber) {
        
            contactList.splice(i,1);
            console.log(contactList[i].id);
         } 
            
    }
    //refresh contact list
    contactList.forEach(function(index){
    document.getElementById("contactList").innerHTML = '';
    showList(index);
        
    })
   
    
    
    
    //    $('#contactList').children().each(function(){
//    $(this).filter('#firstName').remove();
//   });
};



function addPhone() {
    alert("works");
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