import { Page } from "@playwright/test";
import User from "../Models/User";

export default class RegisterPage {

 private page: Page;
    //constructor 
    constructor(page : Page ){
        this.page = page;
    }

    //elements ui elements
    // await  page.goto('/signup');
  // await page.fill('[data-testid="first-name"]', user.getFirstName());
  // await page.fill('[data-testid="last-name"]', user.getLastName());
  // await page.fill('[data-testid="email"]', user.getEmail());
  // await page.type('[data-testid="password"]', user.getPassword());
  // await page.type('[data-testid="confirm-password"]', user.getPassword());
  // await page.click('[data-testid="submit"]');

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

async register(user: User){
      await this.page.fill(this.firstNameInput, user.getFirstName());
  await this.page.fill( this.lastNameInput, user.getLastName());
  await this.page.fill(this.emailInput, user.getEmail());
  await this.page.type(this.passwordInput, user.getPassword());
  await this.page.type( this.confirmPasswordInput, user.getPassword());
  await this.page.click(this.submitButton);
}

}