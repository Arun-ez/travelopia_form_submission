
describe('Form submission', () => {

    const [name, email, place, persons, budget] = ['Cypress', 'cypress@test.com', 'europe', 6, 5000];

    beforeEach(() => {
        cy.visit('http://localhost:3000');
    })

    it('should have input fields for name, email, No of travellers, Budget per person', () => {
        cy.wait(3000);
        cy.get('input[name="name"]').should('exist');
        cy.get('input[name="email"]').should('exist');
        cy.get('input[name="persons"]').should('exist');
        cy.get('input[name="budget"]').should('exist');
    })

    it('should have a select tag with India, Africa, Europe as options', () => {
        cy.get('select[name="place"]').should('exist');
        cy.get('select[name="place"]').find('option').contains('India');
        cy.get('select[name="place"]').find('option').contains('Africa');
        cy.get('select[name="place"]').find('option').contains('Europe');
    })

    it('should have a submit button', () => {
        cy.get('#submit_btn').contains('Submit');
    })

    it('should submit the form and display the message', () => {
        cy.get('input[name="name"]').type(name);
        cy.get('input[name="email"]').type(email);
        cy.get('select[name="place"]').select(place)
        cy.get('input[name="persons"]').type(persons);
        cy.get('input[name="budget"]').type(budget);

        cy.get('#submit_btn').click();
        cy.wait(2000);
        cy.get('h1').contains('Submitted')
    })

})

describe('Check dashboard', () => {

    const [name, email, place, persons, budget] = ['Cypress', 'cypress@test.com', 'europe', 6, 5000];

    beforeEach(() => {
        cy.visit('http://localhost:3000/dashboard');
    })

    it('should have a table', () => {
        cy.wait(2000);
        cy.get('table').should('exist');
    })

    it('should contain the submitted data', () => {
        cy.get('tbody').contains(name);
        cy.get('tbody').contains(email);
        cy.get('tbody').contains(place);
        cy.get('tbody').contains(persons);
        cy.get('tbody').contains(budget);
    })
})