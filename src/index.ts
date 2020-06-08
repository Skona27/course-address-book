import { createContact, Contact } from "./functions/createContact";
import { showSingleContactInList } from "./functions/showSingleContactInList";

var contacts: Contact[] = [];

const contactListElement = document.getElementById("contactList");
const contactSubmitElement = document.getElementById("contactSubmit");
const contactTitleElement = document.getElementById("contactTitle");
const firstNameElement = document.getElementById("firstName");
const lastNameElement = document.getElementById("lastName");
const emailElement = document.getElementById("email");
const phoneElement = document.getElementById("phoneNumber");
const createNewContactElement = document.getElementById("createNewContact");
const showContactListElement = document.getElementById("showContactList");
const firstNameInput = document.getElementById(
  "inputFirstName"
) as HTMLInputElement;
const lastNameInput = document.getElementById(
  "inputLastName"
) as HTMLInputElement;
const phoneNumberInput = document.getElementById(
  "inputPhoneNumber"
) as HTMLInputElement;
const emailInput = document.getElementById("inputEmail") as HTMLInputElement;

function init() {
  contactListElement.style.display = "none";
  contactSubmitElement.style.display = "none";

  createNewContactElement.addEventListener("click", function (event) {
    addContact();
    event.preventDefault();
  });

  showContactListElement.addEventListener("click", function () {
    showContactList();
  });

  contactListElement.addEventListener("click", function (event) {
    const element = event.target as Element;
    if (element.className === "btn btn-default btn-sm duplicateContact") {
      const contact = getContactById(element.id);
      duplicateContact(contact);
    }
  });

  /**
   * Assign globals
   */
  // @ts-ignore
  global.deleteContactById = deleteContactById;
  // @ts-ignore
  global.addAnotherPhoneNumberById = addAnotherPhoneNumberById;
  // @ts-ignore
  global.addAnotherEmailById = addAnotherEmailById;
  // @ts-ignore
  global.editFirstNameById = editFirstNameById;
}

function duplicateContact(contact: Contact) {
  const firstName = contact.firstName;
  const lastName = contact.lastName + ".copy";
  const phoneNumbers = contact.phoneNumbers;
  const emails = contact.emails;

  // @ts-ignore
  const duplicate = new createContact({
    firstName,
    lastName,
    phoneNumbers,
    emails,
  });

  contacts.push(duplicate);
  showContactList();
}

function showContact(contact: Contact) {
  contactSubmitElement.style.display = "block";
  contactListElement.style.display = "none";

  contactTitleElement.innerHTML = contact.getFullName();
  firstNameElement.innerHTML = contact.firstName;
  lastNameElement.innerHTML = contact.lastName;
  phoneElement.innerHTML = contact.phoneNumbers.join(", ");
  emailElement.innerHTML = contact.emails.join(", ");
}

function clearForm() {
  firstNameInput.value = "";
  lastNameInput.value = "";
  phoneNumberInput.value = "";
  emailInput.value = "";
}

function addContact() {
  const email = emailInput.value;
  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const phoneNumber = phoneNumberInput.value;

  // @ts-ignore
  const newContact = new createContact({
    firstName,
    lastName,
    emails: [email],
    phoneNumbers: [phoneNumber],
  });

  contacts.push(newContact);

  showContact(newContact);
  clearForm();
}

function getContactById(id: string) {
  return contacts.find((contact) => contact.id === id);
}

function deleteContactById(id: string) {
  contacts = contacts.filter((contact) => contact.id !== id);
  showContactList();
}

function addAnotherPhoneNumberById(id: string) {
  const phone = prompt("Add phone number: ", "034 232 323");
  const contact = getContactById(id);

  contact.addPhoneNumber(phone);
  showContactList();
}

function addAnotherEmailById(id: string) {
  const email = prompt("Add new email: ");
  const contact = getContactById(id);

  contact.addEmail(email);
  showContactList();
}

function editFirstNameById(id: string) {
  const firstName = prompt("Change first name: ");
  console.log(id);
  console.log(contacts);
  const contact = getContactById(id);

  contact.editFirstName(firstName);
  showContactList();
}

function showContactList() {
  contactListElement.innerHTML = "";

  contactSubmitElement.style.display = "none";
  contactListElement.style.display = "block";

  if (contacts.length > 0) {
    contacts.sort(compareByName).forEach(showSingleContactInList);

    //remove hr and add margin to first contact
    document.querySelector("li").style.marginTop = "6px";
    (document.querySelector("hr:first-child") as HTMLElement).style.display =
      "none";
  }
}

function compareByName(a, b) {
  if (a.lastName < b.lastName) return -1;
  if (a.lastName > b.lastName) return 1;
  return 0;
}

init();
