import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { log } from 'node:console';
import User from '../Models/User';
import UserApi from '../Apis/UserApi';
import TodoApi from '../Apis/TodoApi';
import RegisterPage from '../pages/RegisterPage';
import TodoPage from '../pages/TodoPage';
import NewTodoPage from '../pages/NewTodoPage';
import { todo } from 'node:test';

test('should be able to register to the todo website 2', async ({ page, request, context }) => {

  const user = new User();

  const registerPage = new RegisterPage(page, request, context);
  await registerPage.registerUsingApi(user);

  const todoPage = new TodoPage(page);
  await todoPage.load();
  const welcomeMessage = todoPage.getWelcomeMessageText();
  await expect(welcomeMessage).toBeVisible();
});

test('should be able to register to the todo website', async ({ page, request, context }) => {

  const user = new User();

  // API call to register user
  const response = await new UserApi(request).register(user);

  const responseBody = await response.json();
  const accessToken = responseBody.access_token;
  const userId = responseBody.userID;
  const firstName = responseBody.firstName;

  await context.addCookies([
    {
      name: 'access_token',
      value: accessToken,
      url: 'https://qacart-todo.herokuapp.com',
    },
    {
      name: 'userID',
      value: userId,
      url: 'https://qacart-todo.herokuapp.com',
    },
    {
      name: 'firstName',
      value: firstName,
      url: 'https://qacart-todo.herokuapp.com',
    }
  ])

  await page.goto('/todo');
  const welcomeMessage = page.locator('[data-testid="welcome"]');
  await expect(welcomeMessage).toBeVisible();

});

test('should be able to login with adding todo list for qacartList website ', async ({ page, request, context }) => {


   const user = new User( );
  // api call for register user 
    const response = await new UserApi(request).register(user);


  const responseBody = await response.json();
  const accessToken = responseBody.access_token;
  const userId = responseBody.userID;
  const firstName = responseBody.firstName;

  await context.addCookies([
    {
      name: 'access_token',
      value: accessToken,
      url: 'https://qacart-todo.herokuapp.com',
    },
    {
      name: 'userID',
      value: userId,
      url: 'https://qacart-todo.herokuapp.com',
    },
    {
      name: 'firstName',
      value: firstName,
      url: 'https://qacart-todo.herokuapp.com',
    }
  ])

  // api call for add todo 

  await request.post('/api/v1/tasks', {
    data: {

      isCompleted: false,
      item: "playwright",

    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  await page.goto('/todo');
  const todoItems = page.locator('[data-testid="todo-item"]').nth(0);
  await expect(todoItems).toHaveText('playwright');
});



test('should be able to login with adding todo list for qacartList website 2', async ({ page, request, context }) => {


  const user = new User();

  // api call for register user 
  const registerPage = new RegisterPage(page, request, context);
  await registerPage.registerUsingApi(user);
  // ui steps to add todo 
  
  const newTodoPage = new NewTodoPage(page);
  await newTodoPage.register();
  await newTodoPage.addNewTodo('playwright');
  const todoPage = new TodoPage(page);
  const todoItems = todoPage.getTodoItemText();
  await expect(todoItems).toHaveText('playwright');
});




test('should be able to delete todo list ', async ({ page, request, context }) => {


   const user = new User();

  // api call for register user 
    const response = await new UserApi(request).register(user);

  const responseBody = await response.json();
  const accessToken = responseBody.access_token;
  const userId = responseBody.userID;
  const firstName = responseBody.firstName;

  user.setAccessToken(accessToken);

  await context.addCookies([
    {
      name: 'access_token',
      value: accessToken,
      url: 'https://qacart-todo.herokuapp.com',
    },
    {
      name: 'userID',
      value: userId,
      url: 'https://qacart-todo.herokuapp.com',
    },
    {
      name: 'firstName',
      value: firstName,
      url: 'https://qacart-todo.herokuapp.com',
    }
  ])

  // api call for add todo 
  await new TodoApi(request).todoFn(user);
  // ui steps
  await page.goto('/todo');
  await page.locator('[data-testid="complete-task"]').nth(0).click();
  await page.locator('[data-testid="delete"]').nth(0).click();
  await expect(page.locator('[data-testid="no-todos"]')).toBeVisible();

});

test('should be able to delete todo list 2 ', async ({ page, request, context }) => {

  const user = new User();

  // api call for register user 
  const registerPage = new RegisterPage(page, request, context);
  await registerPage.registerUsingApi(user);
  // api call for add todo 
  const newTodoPage = new NewTodoPage(page,request);
  await newTodoPage.addNewTodoUsingApi( user);

  // ui steps
  // await page.goto('/todo');
  // await page.locator('[data-testid="complete-task"]').nth(0).click();
  // await page.locator('[data-testid="delete"]').nth(0).click();
  // await expect(page.locator('[data-testid="no-todos"]')).toBeVisible();

  const todoPage = new TodoPage(page);
   await todoPage.load();
    await todoPage.deleteTodoItem();
    const noTodosMessageText = todoPage.getNoTodosMessageText();
    await expect(noTodosMessageText).toBeVisible();
  
});