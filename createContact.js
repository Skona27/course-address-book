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