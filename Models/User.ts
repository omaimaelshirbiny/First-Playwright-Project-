import { faker } from "@faker-js/faker";
import { access } from "node:fs";

export default class User {
   
   private firstName: string;
    private lastName: string;
    private email: string;
    private password: string;
    private access_token: string;
    private userId: string;

    constructor( ) {
        this.firstName =  faker.person.firstName(); 
        this.lastName = faker.person.lastName();
        this.email =  faker.internet.email(); 
        this.password =  '12345678900';
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    setAccessToken(access_token: string) {
        this.access_token = access_token;
    }

    getAccessToken() {
        return this.access_token;
    }

    
}