import { APIRequestContext, Page } from "@playwright/test";
import User from "../Models/User";
import TodoApi from "../Apis/TodoApi";

export default class NewTodoPage {

 private page: Page;
 private request?: APIRequestContext;
    //constructor 
    constructor(page : Page , request?: APIRequestContext ){
        this.page = page;
        this.request = request;
    }

    //elements ui elements
   
  private get newTodoItem() {
    return '[data-testid="new-todo"]';
}
  private get submitTododItem() {
    return '[data-testid="submit-newTask"]';
}

    //methods

async register(){
await this.page.goto('/todo/new');
}

async addNewTodo(todoTask: string){
  await this.page.locator(this.newTodoItem).fill(todoTask);
  await this.page.locator(this.submitTododItem).click();
}


async addNewTodoUsingApi(user: User){
    await new TodoApi(this.request!).todoFn(user);
}
}