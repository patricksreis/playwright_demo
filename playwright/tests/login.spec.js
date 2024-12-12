// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageobjects/LoginPage');
const exp = require('constants');
const { before, beforeEach } = require('node:test');

const senha = 'secret_sauce';
test.describe('Testes com login correto', () => {
  let loginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goTo();
  await loginPage.login('standard_user', senha);
});

test('deve realizar login com sucesso', async ({ page }) => {
  const currentURL = page.url();
  // Validar a URL
  expect(currentURL).toBe('https://www.saucedemo.com/inventory.html');

});

test('deve realizar logout com sucesso', async ({ page }) => {
  
  
  let currentURL = page.url();
  // Validar a URL
  expect(currentURL).toBe('https://www.saucedemo.com/inventory.html');
  
  await loginPage.logout();

  currentURL = page.url();
  expect(currentURL).toBe('https://www.saucedemo.com/');
});

});

test('deve retornar um erro no login com um usuario invalido', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goTo();
  await loginPage.login('invalido_usuario', senha);

  const message = page.locator('h3[data-test="error"]');
  expect(await message.textContent()).toBe('Epic sadface: Username and password do not match any user in this service');

});
