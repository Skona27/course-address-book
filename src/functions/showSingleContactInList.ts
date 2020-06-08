import { Contact } from "./createContact";

export function showSingleContactInList(contact: Contact) {
  const contactListElement = document.getElementById("contactList");

  const html = `
    <hr>
    <li class="list-group-item";>
      <h4>${contact.getFullName()}</h4>
      
      <li class="list-group-item">
        First Name:
        <h5>
          <span class="badge badge-secondary">${contact.firstName}</span>
          <button type="button" class="btn btn-defualt" 
           style="float: right; margin: -5px;  background-color: white;"
           onclick="editFirstNameById('${contact.id}');">
          <i class="glyphicon glyphicon-edit"></i></button>
        </h5>
      </li>
    
      <li class="list-group-item">
        Last Name:
        <h5>
          <span class="badge badge-secondary">${contact.lastName}</span>
        </h5> 
      </li>

      <li class="list-group-item">
        Phone Number:
        <h5>
          <button onclick="addAnotherPhoneNumberById('${
            contact.id
          }')" style="border-radius:30px; float:right;  margin-top:-10px;" type="button" class="btn btn-default btn-circle">
            <i class="glyphicon glyphicon-plus"></i>
          </button>

          <span class="badge badge-secondary" style="position:relative">${contact.phoneNumbers.join(
            ", "
          )}</span>
          </h5> 
      </li>

      <li class="list-group-item">
        Email:
        <h5>
          <button onclick="addAnotherEmailById('${
            contact.id
          }')" style="border-radius:30px; float:right; margin-top:-10px;" type="button" class="btn btn-default btn-circle">
            <i class="glyphicon glyphicon-plus"></i>
          </button>

          <span class="badge badge-secondary">${contact.emails.join(
            ", "
          )}</span>
        </h5>
      </li>

      <button type="button" id="${
        contact.id
      }" class="btn btn-default btn-sm duplicateContact" style="margin-top:15px;">Duplicate</button>

      <button onclick="deleteContactById('${
        contact.id
      }')" type="button" class="btn btn-danger btn-sm" style="float: right;  margin-top:15px;">Delete</button>
    </li>`;

  contactListElement.innerHTML += html;
}
