import { Page, Locator } from '@playwright/test';

class RegistroPage {
    private page: Page;
    private registrarButton: Locator;
    private email: Locator;
    private userName: Locator;
    private password: Locator;
    private confirmPassword: Locator;
    private cadastroButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.registrarButton = page.locator('button:has-text("Registrar")');
        const cardRegister = page.locator('.card__register');
        this.email = cardRegister.locator('input[name="email"]');
        this.userName = cardRegister.locator('input[name="name"]');
        this.password = cardRegister.locator('input[name="password"]');
        this.confirmPassword = cardRegister.locator('input[name="passwordConfirmation"]');
        this.cadastroButton = page.locator('button:has-text("Cadastrar")');
    }

    async goTo(): Promise<void> {
        await this.page.goto("https://bugbank.netlify.app/#");
    }

    async createAccount(email: string, userName: string, password: string): Promise<void> {
        await this.registrarButton.click();
        await this.email.fill(email);
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.confirmPassword.fill(password);
        await this.cadastroButton.click();
    }
}

export { RegistroPage };