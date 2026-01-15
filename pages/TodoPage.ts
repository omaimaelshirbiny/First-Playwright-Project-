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

private get todoItem(){
    return '[data-testid="todo-item"]';
}

   
  private get newTodoItem() {
    return '[data-testid="new-todo"]';
}
  private get submitTododItem() {
    return '[data-testid="submit-newTask"]';
}

    //methods

async load(){
    await this.page.goto('/todo');
}

 getWelcomeMessageText(){
return this.page.locator(this.welcomeMessage);

}
getNoTodosMessageText(){
    return this.page.locator('[data-testid="no-todos"]');
}
getTodoItemText(){
    return this.page.locator(this.todoItem).nth(0);
}

async deleteTodoItem(){
      await this.page.locator('[data-testid="delete"]').nth(0).click();

}


async addNewTodo(todoTask: string){
    await this.page.locator('[data-testid="add"]').click();
    await this.page.locator(this.newTodoItem).fill(todoTask);
  await this.page.locator(this.submitTododItem).click();
}
}