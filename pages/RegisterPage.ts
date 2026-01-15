import { APIRequestContext, BrowserContext, Page } from "@playwright/test";
import User from "../Models/User";
import UserApi from "../Apis/UserApi";
import { th } from "@faker-js/faker";
import config from "../playwright.config";

export default class RegisterPage {

    private page: Page;
    private request?: APIRequestContext;
    private context?: BrowserContext;

    //constructor 
    constructor(page: Page, request?: APIRequestContext, context?: BrowserContext) {
        this.page = page;
        this.request = request;
        this.context = context;
    }

    //elements ui elements

    private get firstNameInput() {
        return '[data-testid="first-name"]';
    }
    private get lastNameInput() {

        return '[data-testid="last-name"]';
    }
    private get emailInput() {
        return '[data-testid="email"]';

    }
    private get passwordInput() {
        return '[data-testid="password"]';

    }
    private get confirmPasswordInput() {
        return '[data-testid="confirm-password"]';

    }
    private get submitButton() {
        return '[data-testid="submit"]';
    }

    //methods

    async load() {
        await this.page.goto('/signup');
    }

    async register(user: User) {
        await this.page.fill(this.firstNameInput, user.getFirstName());
        await this.page.fill(this.lastNameInput, user.getLastName());
        await this.page.fill(this.emailInput, user.getEmail());
        await this.page.type(this.passwordInput, user.getPassword());
        await this.page.type(this.confirmPasswordInput, user.getPassword());
        await this.page.click(this.submitButton);
    }

    async registerUsingApi(user: User) {
        const response = await new UserApi(this.request!).register(user);

        const responseBody = await response.json();
        const accessToken = responseBody.access_token;
        const userId = responseBody.userID;
        const firstName = responseBody.firstName;

        await this.context!.addCookies([
            {
                name: 'access_token',
                value: accessToken,
                url: config.use?.baseURL,
            },
            {
                name: 'userID',
                value: userId,
                url: config.use?.baseURL,
            },
            {
                name: 'firstName',
                value: firstName,
                url: config.use?.baseURL,
            }
        ])
    }

}