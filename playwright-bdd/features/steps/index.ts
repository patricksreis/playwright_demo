import { expect } from "@playwright/test";
import { Given, When, Then } from "./fixtures";
import { RegistroPage } from "../../pageobjects/RegistroPage";

Given("que acesso a aplicacao", async ({ page }) => {
  const registroPage = new RegistroPage(page);
  await registroPage.goTo();
});

When("tento criar uma nova conta com dados validos", async ({ page }, name: string) => {
  const registroPage = new RegistroPage(page);
  await registroPage.createAccount('John@gmail.com', 'Connor', 'suaSenhaDesejada');
});

Then("uma nova conta deve ser criada com sucesso", async ({ page }, text: string) => {
  const mensagemSucesso = await page.locator('#modalText');
  // Pega o texto do elemento
  const texto = await mensagemSucesso.innerText();

  // Verifica se o texto corresponde à expressão regular
  expect(texto).toMatch(/A conta \d+-\d+ foi criada com sucesso/);
});
