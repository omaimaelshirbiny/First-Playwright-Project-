import { Page } from "@playwright/test";
import User from "../Models/User";

export default class TodoPage {

 private page: Page;
    //constructor 
    constructor(page : Page ){
        this.page = page;
    }

    //elements ui elements
   

  private get welcomeMessage() {
    return '[data-testid="welcome"]';
}

    //methods

 getWelcomeMessageText(){
return this.page.locator(this.welcomeMessage);

}
}