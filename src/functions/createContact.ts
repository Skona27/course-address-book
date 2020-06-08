function generateId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumbers: [string];
  emails: [string];
  getFullName: () => string;
  addPhoneNumber: (phone: string) => void;
  addEmail: (email: string) => void;
  editFirstName: (firstName: string) => void;
};

export type ContactDTO = {
  firstName: string;
  lastName: string;
  phoneNumbers: [string];
  emails: [string];
};

export function createContact(contact: ContactDTO): Contact {
  const { emails, firstName, lastName, phoneNumbers } = contact;

  return {
    id: generateId(),
    firstName,
    lastName,
    emails,
    phoneNumbers,
    getFullName: function () {
      return firstName + " " + this.lastName;
    },
    addPhoneNumber: function (phone) {
      this.phoneNumbers = [...this.phoneNumbers, phone];
    },
    addEmail: function (email) {
      this.emails = [...this.emails, email];
    },
    editFirstName: function (firstName) {
      this.firstName = firstName;
    },
  };
}
