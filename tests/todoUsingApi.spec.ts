import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { log } from 'node:console';
import User from '../Models/User';
import UserApi from '../Apis/UserApi';

test('should be able to register to the todo website', async ({ page, request, context }) => {

  const user = new User(
    faker.person.firstName(),
    faker.person.lastName(),
    faker.internet.email(),
    '12345678900'
  );

  // API call to register user
  const response = await new UserApi(request).register(user);

  const responseBody = await response.json();
  const accessTaken = responseBody.access_token;
  const userId = responseBody.userID;
  const firstName = responseBody.firstName;

  await context.addCookies([
    {
      name: 'access_token',
      value: accessTaken,
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


   const user = new User(
      faker.person.firstName(), 
      faker.person.lastName(), 
      faker.internet.email(), 
      '12345678900'
    );
  // api call for register user 
  const response = await request.post('/api/v1/users/register', {
    data: {

      email: user.getEmail(),
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      password: user.getPassword(),

    }
  });

  const responseBody = await response.json();
  const accessTaken = responseBody.access_token;
  const userId = responseBody.userID;
  const firstName = responseBody.firstName;

  await context.addCookies([
    {
      name: 'access_token',
      value: accessTaken,
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
      Authorization: `Bearer ${accessTaken}`,
    },
  });

  await page.goto('/todo');
  const todoItems = page.locator('[data-testid="todo-item"]').nth(0);
  await expect(todoItems).toHaveText('playwright');
});



test('should be able to delete todo list ', async ({ page, request, context }) => {


   const user = new User(
    faker.person.firstName(), 
    faker.person.lastName(), 
    faker.internet.email(), 
    '12345678900'
  );

  // api call for register user 
  const response = await request.post('/api/v1/users/register', {
    data: {

      email: user.getEmail(),
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      password: user.getPassword(),

    }
  });

  const responseBody = await response.json();
  const accessTaken = responseBody.access_token;
  const userId = responseBody.userID;
  const firstName = responseBody.firstName;

  await context.addCookies([
    {
      name: 'access_token',
      value: accessTaken,
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
      Authorization: `Bearer ${accessTaken}`,
    },
  });


  await page.goto('/todo');
  await page.locator('[data-testid="complete-task"]').nth(0).click();
  await page.locator('[data-testid="delete"]').nth(0).click();
  await expect(page.locator('[data-testid="no-todos"]')).toBeVisible();

});