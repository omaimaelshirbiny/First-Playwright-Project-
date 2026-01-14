import {expect, test} from  '@playwright/test';
import { faker } from '@faker-js/faker';
import User from '../Models/User';

test ('should be able to register to the todo website', async ({page})=>{

  const user = new User(
    faker.person.firstName(), 
    faker.person.lastName(), 
    faker.internet.email(), 
    '12345678900'
  );
  
  await  page.goto('/signup');
  await page.fill('[data-testid="first-name"]', user.getFirstName());
  await page.fill('[data-testid="last-name"]', user.getLastName());
  await page.fill('[data-testid="email"]', user.getEmail());
  await page.type('[data-testid="password"]', user.getPassword());
  await page.type('[data-testid="confirm-password"]', user.getPassword());
  await page.click('[data-testid="submit"]');

  const welcomeMessage = page.locator('[data-testid="welcome"]');
    await expect (welcomeMessage).toBeVisible();
});