import "@testing-library/jest-dom/extend-expect";
import {getByText, fireEvent, getByTestId} from "@testing-library/dom";
import {createUICounter} from "../../src/uiCounter/counter";

let container;

beforeEach(() => {
	container = document.createElement("div");
	document.body.appendChild(container);
	createUICounter(container, {initVal: 10, min: 8, max: 12});
});

afterEach(() => {
	document.body.innerHTML = "";
});

it("생성시 버튼과 초기값을 렌더링한다.", () => {
	expect(getByText(container, "+")).toBeVisible();
	expect(getByText(container, "-")).toBeVisible();
	expect(getByText(container, "10")).toBeVisible();
});

it("+ 버튼 클릭시 1 증가한다.", async () => {
	fireEvent.click(getByText(container, "+"));
	expect(getByText(container, "11"));
	expect(getByText(container, "11")).toBeVisible();
});

it("- 버튼 클릭시 1 감소한다.", () => {
	fireEvent.click(getByText(container, "-"));
	// 사용자 입장에서 더 명확한 테스트가 가능
	expect(getByText(container, "9"));
	expect(getByText(container, "9")).toBeVisible();

	// 사용자 입장보다는 개발자 입장에서 테스트 가능 즉 지양해야하는 스타일
	expect(container.querySelector(".value")).toHaveTextContent("9");
});

it("Max값인 경우 + 버튼이 disabled 상태가 되며 클릭해도 증가하지 않는다.", () => {
	fireEvent.click(getByText(container, "+"));
	fireEvent.click(getByText(container, "+"));
	fireEvent.click(getByText(container, "+"));
	// expect(getByText(container.querySelector("value"), "8")).toBeVisible();
	expect(getByText(container, "12"));
	expect(getByText(container, "+")).toBeDisabled();
});

it("Min값인 경우 - 버튼이 disabled 상태가 되며, 클릭해도 감소하지 않는다.", () => {
	fireEvent.click(getByText(container, "-"));
	fireEvent.click(getByText(container, "-"));
	fireEvent.click(getByText(container, "-"));
	expect(getByText(container, "8"));
	expect(getByText(container, "-")).toBeDisabled();
});

// snapshot 테스트와 html 구조테스트와의 비교 여기까지가 시각적 테스트
/**
 * 1. html 구조테스트
 *  - html이 변하더라고 시각적으로 변하지 않을 수 있다.
 *  - 반대로 html이 변하지 않더라도 시각적으로 변할 수 있다(css값 변경 등)
 *  - 테스트 코드만 보고서는 의도하는 화면을 파악하기 어렵다.
 *
 * 2. 스냅샷 테스트
 *  - 구조테스트보다 코딩량이 현저히 준다.
 *  - 회귀테스트의 용도로만 쓸 수 있다.
 *  - 의도가 명확하지 않다.
 *  - html 구조테스트와 같은 특징을 가지고 있다.
 *
 * 3. dom-testing-library
 *  - html 구조를 모르더라도, 사용자 입장에서 눈에 보이는 요소를 선택할 수 있는 셀렉터 존재
 *  - 즉, 직관적인 유저 테스트 가능
 *  - 텍스트가 없는 요소의 경우에만 data-testid를 이용하여 선택할 수 있도록 관리
 */
