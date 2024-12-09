// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageobjects/LoginPage');
const exp = require('constants');
const { before, beforeEach } = require('node:test');

const senha = 'secret_sauce';
test.describe('Testes de login', () => {
  let loginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goTo();
  await loginPage.login('standard_user', senha);
});

test('login com um usuario valido', async ({ page }) => {
  const currentURL = page.url();
  // Validar a URL
  expect(currentURL).toBe('https://www.saucedemo.com/inventory.html');

});

test.skip('logout com sucesso', async ({ page }) => {
  
  
  loginPage.logout();
  const currentURL = page.url();
  // Validar a URL
  expect(currentURL).toBe('https://www.saucedemo.com/inventory.html');

});
});

test('login com um usuario invalido', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goTo();
  await loginPage.login('invalido_usuario', senha);

  const message = page.locator('h3[data-test="error"]');
  expect(await message.textContent()).toBe('Epic sadface: Username and password do not match any user in this service');

});
