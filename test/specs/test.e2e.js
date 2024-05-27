const { expect } = require('@wdio/globals')
const allure = require('allure-commandline');
const LoginPage = require('../pageobjects/login.page')
//const testData = new Data ('../test/data/ohrmtest.json');
const SecurePage = require('../pageobjects/secure.page')
const { default: AllureReporter } = require('@wdio/allure-reporter')
const allureReporter = require('@wdio/allure-reporter').default;

describe('Orange HRM Login Application Test Cases', () => {
    it('DWS_TC_001:should login with valid username and credentials credentials', async () => {
        AllureReporter.addFeature("Sample Application")
        await LoginPage.open()
        await LoginPage.login('tomsmith', 'SuperSecretPassword!')
        await expect(SecurePage.flashAlert).toBeExisting()
        await expect(SecurePage.flashAlert).toHaveTextContaining('You logged into a secure area!')
        await console.log("Login into sample application")
        await AllureReporter.addStep('Step description');
    })
    it('HRM_TC_002:Verify userName and Password fields', async () => {
        AllureReporter.addFeature("OrangeHRM")
        await browser.pause(4000)
        await LoginPage.openUrl()
        await browser.maximizeWindow()
        await LoginPage.OrangeHrmFunction('Admin','admin123')
        await console.log("Sucessfully logined HRM Application")
        await allureReporter.addStep("Login into HRM application")
        
    })

    it.skip('HRM_TC_03:Verify user should able to login HRM login application', async () => {
        AllureReporter.addFeature("OrangeHRM")
        await LoginPage.openUrl()
        await allureReporter.addStep("Login into the Application")
        await browser.maximizeWindow()
        let tcData = testData.getTestCaseDataJson("HRM_TC_001")
        await LoginPage.OrangeHrmFunction(tcData.UserName,tcData.Password)
        await browser.pause(2000)
        await console.log("Verified Sucessfully logined HRM Application")
        await allureReporter.addStep("Verified Sucessfully logined HRM Application")
    })
    it('HRM_TC_004:Verify my info Dash board', async () => {
        AllureReporter.addFeature("OrangeHRM")
        await browser.pause(4000)
        await LoginPage.openUrl()
        await browser.maximizeWindow()
        await LoginPage.OrangeHrmFunction('Admin','admin123')
        await console.log("Sucessfully logined HRM Application")
        await allureReporter.addStep("Login into HRM application")
        await LoginPage.myInformationDetails('Sappa','Narasimha','Murthy')
        
    })


})

