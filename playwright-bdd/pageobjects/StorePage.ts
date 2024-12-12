import { Page, Locator } from 'playwright';

export class StorePage {
    private page: Page;
    private openMenuButton: Locator;
    private addToCartButton: Locator;
    private buttonCartLink: Locator;
    private filterButton: Locator;
    private pricesValue: Locator;
    private removeToCartButton: Locator;
    private spanCountCart: Locator;
    private aboutButton: Locator;
    private checkoutButton: Locator;
    private inputFirstName: Locator;
    private inputLastName: Locator;
    private inputPostaCode: Locator;
    private continueButton: Locator;
    private finishButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.openMenuButton = page.getByRole('button', { name: 'Open Menu' });
        this.addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.buttonCartLink = page.locator('.shopping_cart_link');
        this.filterButton = page.locator('[data-test="product-sort-container"]');
        this.pricesValue = page.locator('[data-test="inventory-item-price"]');
        this.removeToCartButton = page.getByText('Remove');
        this.spanCountCart = page.locator('span.cart_item_count');
        this.aboutButton = page.locator('[data-test="about-sidebar-link"]');
        this.checkoutButton = page.locator('#checkout');
        this.inputFirstName = page.getByPlaceholder('First Name');
        this.inputLastName = page.getByPlaceholder('Last Name');
        this.inputPostaCode = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
    }

    async addToCart(): Promise<void> {
        await this.addToCartButton.click();
        await this.buttonCartLink.click();
    }

    async filter(filter: string): Promise<void> {
        await this.filterButton.selectOption(filter);
    }

    async removeToCart(): Promise<void> {
        await this.removeToCartButton.click();
    }

    async aboutWebSite(): Promise<void> {
        await this.openMenuButton.click();
        await this.aboutButton.click();
    }

    async checkout(): Promise<void> {
        await this.checkoutButton.click();
    }
    
    async fullCheckout(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.checkoutButton.click();
        await this.inputFirstName.fill(firstName);
        await this.inputLastName.fill(lastName);
        await this.inputPostaCode.fill(postalCode);
        await this.continueButton.click();
        await this.finishButton.click();
    }
}