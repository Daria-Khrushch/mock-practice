import { rest } from 'msw';
import { faker } from '@faker-js/faker';

const Contacts = [];

export function createRandomContact() {
  return {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    phone: faker.phone.phoneNumber(),
    avatar: faker.image.avatar(),
  };
}

Array.from({ length: 10 }).forEach(() => {
  Contacts.push(createRandomContact());
});

 const contactsHandler = rest.get("http://localhost:8080/contacts", (req, res, ctx) => {
    return res(
        ctx.json({
            "status": 200,
            "contacts": Contacts
        }),
    );
 });

 export const addContactHandler = rest.post("http://localhost:8080/contacts", (req, res, ctx) => { 
  return res(
    ctx.json({ "status": 200,
            "message": "You have new contact"}),
);

});

export const handlers = [
    contactsHandler,
    addContactHandler
]