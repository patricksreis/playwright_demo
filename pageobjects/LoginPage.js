class LoginPage {

    constructor(page)
    {
        this.page = page;
        this.username = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');
        this.loginButton=  page.getByText('Login');
        this.logoutButton = page.getByText('Logout');
        this.openMenuButton = page.locator('#react-burger-menu-btn');
    
    }
    
    async goTo()
    {
        await this.page.goto("https://www.saucedemo.com/");
    }
    
    async login(name, senha)
    {
        await this.username.fill(name);
        await this.password.fill(senha);
        await this.loginButton.click();
    
    }

    async logout()
    {
        await this.openMenuButton.click();
        await this.logoutButton.click();     

    
    }
}
module.exports = {LoginPage};
