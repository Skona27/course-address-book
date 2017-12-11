// Turn off the list of a new contact
document.querySelector("#contactList").style.display = "none";
document.querySelector("#contactSubmit").style.display = "none";

class CreateContact {
    constructor(firstName, lastName, phoneNumber, email, addNumberPhone, addNewEmail) {
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
        getFullName() {
            return `${this.firstName} ${this.lastName}`; 
        }
}
let uniqueID = 0;
const newContact = new CreateContact('Adam', 'Bugaj', '504334300', 'adambugaj@gmail.com');
newContact.getFullName();
console.log(newContact.getFullName());