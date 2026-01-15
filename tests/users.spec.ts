import {expect, test} from  '@playwright/test';
import { faker } from '@faker-js/faker';
import User from '../Models/User';
import RegisterPage from '../pages/RegisterPage';
import TodoPage from '../pages/TodoPage';

test ('should be able to register to the todo website', async ({page})=>{

  const user = new User(
    faker.person.firstName(), 
    faker.person.lastName(), 
    faker.internet.email(), 
    '12345678900'
  );

  const registerPage = new RegisterPage(page);
  await registerPage.load();
  await registerPage.register(user);

  const todoPage = new TodoPage(page);  
  const welcomeMessage = todoPage.getWelcomeMessageText();
    await expect (welcomeMessage).toBeVisible();
});