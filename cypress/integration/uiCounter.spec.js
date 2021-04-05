/// <reference types="Cypress" />
import "@testing-library/cypress/add-commands";

beforeEach(() => {
	cy.visit("http://localhost:1234");
});

it("생성시 버튼과 초기값을 렌더링한다.", () => {
	cy.getByText("10").should("exist");
});

it("+ 버튼 클릭시 1 증가한다.", () => {
	cy.getByText("+").click();
	cy.getByText("11").should("exist");
});

it("- 버튼 클릭시 1 감소한다.", () => {
	cy.getByText("-").click();
	cy.getByText("9").should("exist");
});

it("Max값인 경우 + 버튼이 disabled 상태가 되며 클릭해도 증가하지 않는다.", () => {
	cy.getByText("+").click();
	cy.getByText("+").click();

	cy.getByText("12").should("exist");
	cy.getByText("+").should("be.disabled");
});

it("Min값인 경우 - 버튼이 disabled 상태가 되며 클릭해도 감소하지 않는다.", () => {
	cy.getByText("-").click();
	cy.getByText("-").click();
	cy.getByText("8").should("exist");

	// cy.getByText("-").should("be.disabled");
	// 아쉽지만 이런식으로 디버깅하면서 조율하는것이 최선...인가?
	// cy.getByText("-").parent().should("be.disabled");
	// cy.findByText("-").should("be.disabled");
	cy.findByRole("button", {name: "-"}).should("be.disabled");
});
