import * as loc from '../support/locators/';
import * as users from '../support/utils/users';
import * as urls from '../support/utils/urls';

describe('Fill missing hours', () => {

    before(() => {
        cy.visit(Cypress.env('host'));
        cy.get(loc.login.loginContainer).should('be.visible');
        cy.get(loc.login.usernameField).should('be.visible').type(users.myUser.username);
        cy.get(loc.login.passwordField).should('be.visible').type(users.myUser.password);
        cy.get(loc.login.submitButton).should('be.visible').click();
        cy.get(loc.landing.main).should('be.visible');
    });

    it('Fill missing hours in Calendar page', () => {
        cy.visit(urls.calendarPage);
        cy.get(loc.calendar.tableRaw)
            .should('be.visible')
            .each(($el, index, $list) => {
                if ($el) {
                    cy.wrap($el).find('td input').eq(0).type('{movetostart}' + Cypress.env('startHour'));
                    cy.wrap($el).find('td input').eq(1).type('{movetostart}' + Cypress.env('endHour'));
                    return false;
                } else {
                    cy.log('No missing hours raws!');
                }
            });
        cy.get(loc.calendar.saveButton).contains('שמור').should('be.visible').click();
        cy.get('div.card-body').then($popup => {
            if ($popup.is(':visible')){
                cy.log('No new hours to save!');
            }
        });
    });
});
