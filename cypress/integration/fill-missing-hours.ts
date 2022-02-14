import * as loc from '../support/locators/';
import * as users from '../support/utils/users';

let i: number = 0;
let rows: any = 0;

describe('Fill missing hours', () => {

    before(() => {
        cy.visit(Cypress.env('host'));
        cy.get(loc.login.loginContainer).should('be.visible');
        cy.get(loc.login.usernameField).should('be.visible').type(users.myUser.username);
        cy.get(loc.login.passwordField).should('be.visible').type(users.myUser.password);
        cy.get(loc.login.submitButton).should('be.visible').click();
        cy.get(loc.landing.main).should('be.visible');
    });

    it('Select missing hours in Calendar page', async  () => {

        cy.get(loc.landing.missingHourRow).should('be.visible').then((row) => {
            rows = row.length;
            console.log("rows: " + rows);

        if (rows > 0) {
            for (i = 0; i < rows; i++) {
                cy.get(loc.landing.missingHourBtn).eq(0).should('be.visible').click();
                cy.get(loc.calendar.calendar).should('be.visible');
                cy.frameLoaded(loc.calendar.iframe);
                cy.iframe().find(loc.calendar.tableDiv).should('be.visible');
                cy.iframe().find(loc.calendar.tableRaw).should('be.visible')
                    .then(($el) => {
                        cy.wrap($el).eq(1).find(loc.calendar.tableRow).eq(0).type('{movetostart}' + Cypress.env('startHour'));
                        cy.wrap($el).eq(1).find(loc.calendar.tableRow).eq(1).type('{movetostart}' + Cypress.env('endHour'));
                    });
                cy.server();
                cy.route('GET', '/EmployeeErrorHandling.aspx').as('route1');
                cy.iframe().find(loc.calendar.saveButton).contains('שמור וסגור').should('be.visible').dblclick();
                cy.wait(1000);
                cy.reload();
            }
        } else {
            cy.log('No new hours to save!');
            console.log('No new hours to save!');
        }
        });
    });
});
