import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { log } from 'node:console';
import User from '../Models/User';
import RegisterPage from '../pages/RegisterPage';
import TodoPage from '../pages/TodoPage';
import NewTodoPage from '../pages/NewTodoPage';

test('should be able to register to the todo website', async ({ page }) => {

  const user = new User();

  const registerPage = new RegisterPage(page);
  await registerPage.load();
  await registerPage.register(user);

  const todoPage = new TodoPage(page);
  const welcomeMessage = todoPage.getWelcomeMessageText();
  await expect(welcomeMessage).toBeVisible();

});


test('should be able to login with adding todo task for qacartList website ', async ({ page }) => {

  const user = new User();

  const registerPage = new RegisterPage(page);
  await registerPage.load();
  await registerPage.register(user);

  const todoPage = new TodoPage(page);
  await todoPage.addNewTodo('playwright');
  const todoItems = todoPage.getTodoItemText();
  await expect(todoItems).toHaveText('playwright');
});

test('should be able to delete todo list ', async ({ page }) => {


  const user = new User( );

  const registerPage = new RegisterPage(page);
  await registerPage.load();
  await registerPage.register(user);

  const todoPage = new TodoPage(page);
  await todoPage.addNewTodo('playwright');
  await todoPage.deleteTodoItem();
  const noTodosMessageText = todoPage.getNoTodosMessageText();
  await expect(noTodosMessageText).toBeVisible();

});