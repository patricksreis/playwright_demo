import { Page, Locator } from 'playwright';

class LoginPage {
    private page: Page;
    private username: Locator;
    private password: Locator;
    private loginButton: Locator;
    private logoutButton: Locator;
    private openMenuButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');
        this.loginButton = page.getByText('Login');
        this.logoutButton = page.getByText('Logout');
        this.openMenuButton = page.getByRole('button', { name: 'Open Menu' });
    }

    async goTo(): Promise<void> {
        await this.page.goto("https://www.saucedemo.com/");
    }

    async login(name: string, senha: string): Promise<void> {
        await this.username.fill(name);
        await this.password.fill(senha);
        await this.loginButton.click();
    }

    async logout(): Promise<void> {
        await this.openMenuButton.click();
        await this.logoutButton.click();
    }
}

export { LoginPage };
