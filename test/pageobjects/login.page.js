const { $ } = require('@wdio/globals')
const Page = require('./page');
// const { assert } = require('chai');
const { start} = require('chromedriver');
const { default: AllureReporter } = require('@wdio/allure-reporter');
class LoginPage extends Page {

    get inputUsername () {
        return $('#username');
    }

    get inputPassword () {
        return $('#password');
    }

    get btnSubmit () {
        return $('button[type="submit"]');
    }

    get adminUsername () {
        return $('//input[@name="username"]');
    }
    get adminPassword () {
        return $('//input[@name="password"]');
    }
    get loginButton() {
        return $('//button[@type="submit"]');
    }

    get clickOnLogin () {
        return $('//button[@class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]');
    }

    get userEmail () {
        return $('//*[text()="Email:"]');
    }

    get userPassword () {
        return $('//*[text()="Password:"]');
    }
    get loginButton () {
        return $('//input[@class="button-1 login-button"]');
    }

    get myInformation() {
        return $('//a[contains(.//span, "My Info")]');
    }

    get myInfoFirstName () {
        return $('//input[@class="oxd-input oxd-input--active orangehrm-firstname"]');
    }
    get myInfoMiddleName () {
        return $('//input[@class="oxd-input oxd-input--active orangehrm-middlename"]');
    }
    get myInfoLastName () {
        return $('//input[@class="oxd-input oxd-input--active orangehrm-lastname"]');
    }

    get myInfoNickname () {
        return $('//input[@class="oxd-input oxd-input--active orangehrm-lastname"]');
    }

//This method for loading element time wait
    async browserWaitUntillLoadingInprogress(){
        await console.log("Wait until loading in progress")
        await AllureReporter.addStep("Wait until loading in progress")
        for(let index = 0; index < 20; index++){
            if (await this.elementLoadingInprogress.isDisplayed()){
                await browser.pause(10000)   
            }else{
                break
            }
        }
        await browser.pause(5000)
    }



    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }


    async openUrl(){
    await browser.url("https://opensource-demo.orangehrmlive.com/")
        await console.log("Opened Admin Url")
    }

    async demoUrl(){
        await browser.url("https://demowebshop.tricentis.com/")
            await console.log("Click on Demowebshop URL")
            await this.clickOnLogin.click(); 
            await browser.pause(3000)
    }

    async demoWebShopOpenUrl(usermail,userpsw){   
        await this.userEmail.setValue(usermail);
        await console.log("Enter the Valid username")
        await this.userPassword.setValue(userpsw);
        await console.log("Enter the valid password")
        await this.clickOnLogin.click();
        await browser.pause(2000);
        await AllureReporter.addStep("Click on Login Button")
        }
      
    async OrangeHrmFunction(username,password){
        await this.adminUsername.setValue(username);
        await console.log("Entered Username")
        await this.adminPassword.setValue(password);
        await console.log("Entered Password")
        await this.clickOnLogin.click();
        await browser.pause(2000)
        await console.log("click on login button")
        
    }

    async myInformationDetails(firstName,middleName,lastName){
        await browser.pause(3000)
        await this.myInformation.waitForClickable({ timeout: 5000 });
        await this.myInformation.click();
        await browser.pause(2000)        
        await await this.myInfoFirstName.clearValue()
        await this.myInfoFirstName.setValue(firstName)
        await AllureReporter.addStep("Please Enter First name")
        await browser.pause(2000)        
        await this.myInfoMiddleName.clearValue();
        await this.myInfoMiddleName.setValue(middleName)
        await AllureReporter.addStep("Please Enter Middle name")
        await browser.pause(2000)        
        await this.myInfoLastName.clearValue();
        await this.myInfoLastName.setValue(lastName)
        await AllureReporter.addStep("Please Enter Last name")

    }













    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('login');
    }
}

module.exports = new LoginPage();
