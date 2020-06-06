import { generateId } from "./generateId";

type Contact = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  addNumberPhone?: string;
  addNewEmail?: string;
};

export function createContact(contact: Contact) {
  const {
    email,
    firstName,
    lastName,
    phoneNumber,
    addNewEmail,
    addNumberPhone,
  } = contact;

  return {
    id: generateId(),
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: [phoneNumber],
    addNumberPhone: [addNumberPhone],
    addNewEmail: [addNewEmail],
    getFullName: function () {
      return firstName + " " + this.lastName;
    },
  };
}
