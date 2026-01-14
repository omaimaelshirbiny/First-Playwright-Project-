import {expect, test} from  '@playwright/test';
import { faker } from '@faker-js/faker';

test ('should be able to register to the todo website', async ({page})=>{

  await  page.goto('/signup');
  await page.fill('[data-testid="first-name"]', faker.person.firstName());
  await page.fill('[data-testid="last-name"]', faker.person.lastName());
  await page.fill('[data-testid="email"]', faker.internet.email());
  await page.type('[data-testid="password"]', '12345678900');
  await page.type('[data-testid="confirm-password"]', '12345678900');
  await page.click('[data-testid="submit"]');

  const welcomeMessage = page.locator('[data-testid="welcome"]');
    await expect (welcomeMessage).toBeVisible();
  expect (page.url()).toBe('https://qacart-todo.herokuapp.com/todo');

});