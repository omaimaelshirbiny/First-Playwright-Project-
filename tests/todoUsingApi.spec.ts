import {expect, test} from  '@playwright/test';
import { faker } from '@faker-js/faker';
import { log } from 'node:console';

test ('should be able to register to the todo website', async ({page , request , context})=>{
 
  // API call to register user
  const response = await request.post('/api/v1/users/register', {
    data: {
  
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      password: "1234567890"

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


//   await  page.goto('/signup');
// await page.fill('[data-testid="first-name"]', faker.person.firstName());
//   await page.fill('[data-testid="last-name"]', faker.person.lastName());
//   await page.fill('[data-testid="email"]', faker.internet.email());
//   await page.type('[data-testid="password"]', '12345678900');
//   await page.type('[data-testid="confirm-password"]', '12345678900');
//   await page.click('[data-testid="submit"]');

    await  page.goto('/todo');
const welcomeMessage = page.locator('[data-testid="welcome"]');
    await expect (welcomeMessage).toBeVisible();
  // expect (page.url()).toBe('https://qacart-todo.herokuapp.com/todo');

});




test('should be able to login with adding todo list for qacartList website ' , async ( {page , request , context} )=>{

  // api call for register user 
    const response = await request.post('/api/v1/users/register', {
    data: {
  
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      password: "1234567890"

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

  
  
  // await  page.goto('/signup');
  //    await page.fill('[data-testid="first-name"]', faker.person.firstName());
  //    await page.fill('[data-testid="last-name"]', faker.person.lastName());
  //    await page.fill('[data-testid="email"]', faker.internet.email());
  //    await page.type('[data-testid="password"]', '12345678900');
  //    await page.type('[data-testid="confirm-password"]', '12345678900');
  //    await page.click('[data-testid="submit"]');

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

    await  page.goto('/todo');
    // await page.locator('[data-testid="add"]').click();
    // await page.locator('[data-testid="new-todo"]').fill('playwright');
    // await page.locator('[data-testid="submit-newTask"]').click();
    // await page.locator('[data-testid="complete-task"]').nth(0).click();
    const todoItems = page.locator('[data-testid="todo-item"]').nth(0);
    // await expect(todoItems).toHaveCSS('background-color','rgb(33, 76, 97)');
        await expect(todoItems).toHaveText('playwright');
});

test('should be able to delete todo list ', async ({page})=>{

     await  page.goto('/signup');
     await page.fill('[data-testid="first-name"]', faker.person.firstName());
  await page.fill('[data-testid="last-name"]', faker.person.lastName());
  await page.fill('[data-testid="email"]', faker.internet.email());
  await page.type('[data-testid="password"]', '12345678900');
  await page.type('[data-testid="confirm-password"]', '12345678900');
  await page.click('[data-testid="submit"]');
    await page.locator('[data-testid="add"]').click();
    await page.locator('[data-testid="new-todo"]').fill('playwright');
    await page.locator('[data-testid="submit-newTask"]').click();
    await page.locator('[data-testid="complete-task"]').nth(0).click();
    await page.locator('[data-testid="delete"]').nth(0).click();
    await expect(page.locator('[data-testid="no-todos"]')).toBeVisible();

});