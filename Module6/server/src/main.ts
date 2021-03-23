import path from "path";
import express, {Express, NextFunction, Request, Response} from "express";
import {serverInfo} from "./ServerInfo";
import * as IMAP from "./IMAP";
import * as SMTP from "./SMTP";
import * as Contacts from "./Contacts";
import {IContact} from "./Contacts";

const app: Express = express();
app.use(express.json()); // this middleware takes care of parsing incoming request bodies that contain JSON
// this static middlware allows us to simply serve static files like images, html pages requested by client in the / directory
app.use("/", express.static(path.join(__dirname, "../../client/dist"))); 

// Enable CORS so that we can call the API even from anywhere.
app.use(function(inRequest: Request, inResponse: Response, inNext: NextFunction){
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    inNext();
});

//RESTful endpoints begin

//get a list of mailboxes
app.get("/mailboxes", 
async(inRequest: Request, inResponse: Response) => {
    try{
        const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
        const mailboxes: IMAP.IMailbox[] = await imapWorker.listMailboxes();
        console.log("GET /mailboxes (1): Ok", mailboxes);
        inResponse.json(mailboxes);
    } catch(inError){
        console.log("GET /mailboxes (1): Error", inError);
        inResponse.send("error getting mailboxes");
    }
});

//endpoint for getting a list of messages in a mailbox
app.get("/mailboxes/:mailbox",
    async (inRequest: Request, inResponse: Response) => {
        try{
            const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
            const messages: IMAP.IMessage[] = await imapWorker.listMessages(
                {mailbox: inRequest.params.mailbox}
            );
            inResponse.json(messages);
        } catch (inError) {
            inResponse.send("error retreiving list of messages");
        }
    }
);

//rest endpoint to get a message
app.get("/messages/:mailbox/:id",
    async (inRequest: Request, inResponse: Response) => {
        try{
            const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
            const messageBody: string = await imapWorker.getMessageBody({
                mailbox: inRequest.params.mailbox,
                id: parseInt(inRequest.params.id, 10)
            });
            inResponse.send(messageBody);
        } catch(inError) {
            inResponse.send("error retreiving this message");
        }
    }
);

//rest endpoint to delete a message

app.delete("/messages/:mailbox/:id",
    async (inRequest: Request, inResponse: Response) => {
        try{
            const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
            await imapWorker.deleteMessage({
                mailbox: inRequest.params.mailbox,
                id: parseInt(inRequest.params.id, 10)
            });
            inResponse.send("message deleted");
        } catch(inError) {
            inResponse.send("error deleting message");
        }
    }
);

//REST endpoint to send a mesage
app.post("/messages", 
    async (inRequest: Request, inResponse: Response) => {
        try{
            const smtpWorker: SMTP.Worker = new SMTP.Worker(serverInfo);
            await smtpWorker.sendMessage(inRequest.body);
            inResponse.send("message sent");
        } catch(inError) {
            inResponse.send("error sending message");
        }
    }
);

//REST endpoint to list contacts
app.get("/contacts", 
    async (inRequest: Request, inResponse: Response) => {
        try{
            const contactsWorker: Contacts.Worker = new Contacts.Worker();
            const contacts: IContact[] = await contactsWorker.listContacts();
            inResponse.json(contacts);
        } catch(inError) {
            inResponse.send("error retrieving contacts");
        }
    }
);

//REST endpoint to add contact
app.post("/contacts", 
async (inRequest: Request, inResponse: Response) => {
        try{
            const contactsWorker: Contacts.Worker = new Contacts.Worker();
            const contact: IContact = await contactsWorker.addContact(inRequest.body);
            inResponse.json(contact);
        } catch(inError) {
            inResponse.send("error adding contact");
        }
    }
);

//REST endpoint to update contact
app.put("/contacts", 
    async (inRequest: Request, inResponse: Response) => {
        try{
            console.log("server received put request" + inRequest.body);
            const contactsWorker: Contacts.Worker = new Contacts.Worker();
            const contact: IContact = await contactsWorker.updateContact(inRequest.body);
            inResponse.json(contact);
        } catch(inError) {
            inResponse.send("error updating contact");
        }
    }
);

//REST endpoint to delete a contact
app.delete("/contacts/:id", 
    async (inRequest: Request, inResponse: Response) => {
        try{
            const contactsWorker: Contacts.Worker = new Contacts.Worker();
            await contactsWorker.deleteContact(inRequest.params.id);
            inResponse.send("deleted contact");
        } catch(inError) {
            inResponse.send("error deleting contact");
        }
    }
);
app.listen(80, function () {
    console.log('Listening on http://localhost:80/');
});