// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageobjects/LoginPage');
const { StorePage } = require('../pageobjects/StorePage');
const exp = require('constants');

const senha = 'secret_sauce';
  
let loginPage;
let storePage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  storePage = new StorePage(page);
  await loginPage.goTo();
  await loginPage.login('standard_user', senha);
});

test('adicionar um item no carrinho', async ({ page }) => {
  await storePage.addToCart()
  
  const element = await page.locator('.inventory_item_name')
  
  await expect(element).toHaveText('Sauce Labs Backpack')
});

test('selecionar um filtro de produtos', async ({ page }) => {
  await storePage.filter('Name (Z to A)')
  const nameShirt = 'Test.allTheThings() T-Shirt (Red)'
  await expect(await page.locator('.inventory_item_name').first()).toHaveText(nameShirt)
});

test('remover item do carrinho', async ({ page }) => {
  await storePage.addToCart()

  const cartAdd = await page.locator('[data-test="shopping-cart-badge"]')

  await expect(cartAdd).toHaveCount(1)
  
  await storePage.removeToCart()

  await expect(cartAdd).toHaveCount(0)
});

test('interagir com menu lateral - sobre o site', async ({ page }) => {
    await storePage.aboutWebSite()
  
    const currentURL = page.url();

    await expect(currentURL).toBe('https://saucelabs.com/')
  });

test('compra até o checkout', async ({ page }) => {
    await storePage.addToCart()
  
    await storePage.checkout()

    const checkoutInformation = page.locator('[data-test="title"]')

    await expect(checkoutInformation).toHaveText('Checkout: Your Information')
}); 

  test('checkout completo', async ({ page }) => {
    await storePage.addToCart()
  
    await storePage.fullCheckout('teste','teste','123')

    const orderFinish = page.locator('[data-test="complete-header"]')

    await expect(orderFinish).toHaveText('Thank you for your order!')
});  
