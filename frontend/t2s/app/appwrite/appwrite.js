import { Client, Account } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('68d562b8002bba744ba5');

export const account = new Account(client);
export { ID } from 'appwrite';
