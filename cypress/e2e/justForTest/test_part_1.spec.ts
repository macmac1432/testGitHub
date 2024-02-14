import { use } from 'chai'
import { baseData } from 'cypress/fixtures/base.json'
import { controllers } from 'cypress/fixtures/controllers.json'
import { Checker } from 'cypress/support/checker'
import { Helpers } from 'cypress/support/helpers'
import { Navigation } from 'cypress/support/navigation'
import { user } from 'cypress/support/registration.data.json'
import { format } from 'util'


describe('Register / login / logout users', () => {
    const helpers = new Helpers();
    const testUserName = `TestName_${Math.random().toString().slice(2, 12)}`
    const testUserEmail = `TestName_${Math.random().toString().slice(2, 12)}@op.pl`
    const testUserPassword = `TestName_${Math.random().toString().slice(2, 12)}`
    const checker = new Checker();
    const navigator = new Navigation();  


    before(() => { 
        //start
        helpers.goToPage(baseData.defaultUrl);
    })

    it('Register user test', () => {

        checker.checkIfMainPageDisplayProperly();
        checker.navigeteToSignUpPageAndCheckIfDisplaysProperly();
        navigator.setNewUserDataWhileSignUp(testUserName, testUserEmail);
        navigator.setAllRequiredDataInSignUpFormAndConfirm(testUserPassword, true);
        checker.checkIfUserCreatedAndSignUp(testUserName);
        checker.deleteAccountAndCheckIfDeleted();
    })

    it('Api Check', ()=>{
        cy.request('GET','https://automationexercise.com/api/productsList').then(res=>{
            cy.log(JSON.parse(res.body));
            const body =JSON.parse(res.body);
 
            expect(body.responseCode).equal(200);
        })
    })


})

