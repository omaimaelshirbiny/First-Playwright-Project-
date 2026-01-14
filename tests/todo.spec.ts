import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { log } from 'node:console';
import User from '../Models/User';

test('should be able to register to the todo website', async ({ page }) => {

  const user = new User(
    faker.person.firstName(),
    faker.person.lastName(),
    faker.internet.email(),
    '12345678900'
  );

  await page.goto('/signup');
  await page.fill('[data-testid="first-name"]', user.getFirstName());
  await page.fill('[data-testid="last-name"]', user.getLastName());
  await page.fill('[data-testid="email"]', user.getEmail());
  await page.type('[data-testid="password"]', user.getPassword());
  await page.type('[data-testid="confirm-password"]', user.getPassword());
  await page.click('[data-testid="submit"]');
  const welcomeMessage = page.locator('[data-testid="welcome"]');
  await expect(welcomeMessage).toBeVisible();

});


test('should be able to login with adding todo task for qacartList website ', async ({ page }) => {

  const user = new User(
    faker.person.firstName(),
    faker.person.lastName(),
    faker.internet.email(),
    '12345678900'
  );

  await page.goto('/signup');
  await page.fill('[data-testid="first-name"]', user.getFirstName());
  await page.fill('[data-testid="last-name"]', user.getLastName());
  await page.fill('[data-testid="email"]', user.getEmail());
  await page.type('[data-testid="password"]', user.getPassword());
  await page.type('[data-testid="confirm-password"]', user.getPassword());
  await page.click('[data-testid="submit"]');
  await page.locator('[data-testid="add"]').click();
  await page.locator('[data-testid="new-todo"]').fill('playwright');
  await page.locator('[data-testid="submit-newTask"]').click();
  await page.locator('[data-testid="complete-task"]').nth(0).click();
  const todoItems = page.locator('[data-testid="todo-item"]').nth(0);
  await expect(todoItems).toHaveCSS('background-color', 'rgb(33, 76, 97)');
  await expect(todoItems).toHaveText('playwright');
});

test('should be able to delete todo list ', async ({ page }) => {


  const user = new User(
    faker.person.firstName(),
    faker.person.lastName(),
    faker.internet.email(),
    '12345678900'
  );

  await page.goto('/signup');
  await page.fill('[data-testid="first-name"]', user.getFirstName());
  await page.fill('[data-testid="last-name"]', user.getLastName());
  await page.fill('[data-testid="email"]', user.getEmail());
  await page.type('[data-testid="password"]', user.getPassword());
  await page.type('[data-testid="confirm-password"]', user.getPassword());
  await page.click('[data-testid="submit"]');
  await page.locator('[data-testid="add"]').click();
  await page.locator('[data-testid="new-todo"]').fill('playwright');
  await page.locator('[data-testid="submit-newTask"]').click();
  await page.locator('[data-testid="complete-task"]').nth(0).click();
  await page.locator('[data-testid="delete"]').nth(0).click();
  await expect(page.locator('[data-testid="no-todos"]')).toBeVisible();

});