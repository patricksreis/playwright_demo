import { expect } from "@playwright/test";
import { Given, When, Then } from "./fixtures";
import { LoginPage } from "../../pageobjects/LoginPage";
import { StorePage } from "../../pageobjects/StorePage";

const credentials = {
    usuario: 'standard_user',
    senha: 'secret_sauce'
};
let loginPage: LoginPage;
let storePage: StorePage;

Given("que acesso a aplicacao", async ({ page }) => {
    loginPage = new LoginPage(page);
    storePage = new StorePage(page);
    await loginPage.goTo();    
    await loginPage.login(credentials.usuario, credentials.senha);
});

When("clico para adicionar item no carrinho", async ({ page }) => {  
  await storePage.addToCart()
});

Then("deve ser adicionado um item no carrinho", async ({ page }) => {
  const element = await page.locator('.inventory_item_name')
  
  await expect(element).toHaveText('Sauce Labs Backpack')
});
