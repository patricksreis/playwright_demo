import { expect } from "@playwright/test";
import { Given, When, Then } from "./fixtures";
import { LoginPage } from "../../pageobjects/LoginPage";

const senha = 'secret_sauce';

Given("que acesso a pagina de login", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goTo();    
});

When("preencho com usuario {string} e senha {string} validos", async ({ page }, usuario: string, senha: string) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(usuario, senha);
});

When("preencho com usuario {string} e senha {string} invalidos", async ({ page }, usuario: string, senha: string) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(usuario, senha);
});

When("clico para realizar o logout", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('standard_user', 'secret_sauce');

  let currentURL = page.url();
    // Validar a URL
    expect(currentURL).toBe('https://www.saucedemo.com/inventory.html');
    
    await loginPage.logout();

    currentURL = page.url();
    expect(currentURL).toBe('https://www.saucedemo.com/');
});

Then("deve ser redirecionado para a pagina de login", async ({ page }) => {
    const currentURL = page.url();
    expect(currentURL).toBe('https://www.saucedemo.com/');
});

Then("deve ser redirecionado para a pagina de inicial", async ({ page }) => {
  const currentURL = page.url();
  // Validar a URL
  expect(currentURL).toBe('https://www.saucedemo.com/inventory.html');
});

Then("deve retornar um erro no login com um usuario invalido", async ({ page }) => {
  const message = page.locator('h3[data-test="error"]');
  expect(await message.textContent()).toBe('Epic sadface: Username and password do not match any user in this service');

});
