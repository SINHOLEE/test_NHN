import "@testing-library/jest-dom/extend-expect";
import {getByText, fireEvent} from "@testing-library/dom";
import {createUICounter} from "../../src/uiCounter/counter";
import {createCounter} from "../../src/backup/counter";

jest.mock("../../src/backup/counter");

let container;

beforeEach(() => {
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	document.body.innerHTML = "";
});

it("생성시 주어진 옵션으로 counter를 생성한다.", () => {
	createCounter.mockImplementation(() => ({
		val: () => 10,
		isMin: () => false,
		isMax: () => false,
	}));

	const options = {
		initVal: 10,
		min: 8,
		max: 12,
	};

	createUICounter(container, options);

	expect(createCounter).toHaveBeenCalledWith(options);
});

it("생성시 counter의 상태에 버튼과 초기값을 렌더링한다.", () => {
	createCounter.mockImplementation(() => ({
		val: () => 10,
		isMin: () => false,
		isMax: () => false,
	}));
	createUICounter(container);

	expect(getByText(container, "+")).toBeVisible();
	expect(getByText(container, "-")).toBeVisible();
	expect(getByText(container, "10")).toBeVisible();
});

it("isMin/isMax 값이 true이면 -/+ 버튼은 disabled 상태가 된다.", () => {
	createCounter.mockImplementation(() => ({
		val: () => 10,
		isMin: () => true,
		isMax: () => true,
	}));
	createUICounter(container);

	expect(getByText(container, "-")).toBeDisabled();
	expect(getByText(container, "+")).toBeDisabled();
});

it("+ 버튼 클릭시 counter의 inc()를 호출한 후 다시 렌더링한다.", () => {
	let value = 10;
	const counterInc = jest.fn().mockImplementation(() => {
		value = 11;
	});
	createCounter.mockImplementation(() => ({
		val: () => value,
		isMin: () => false,
		isMax: () => false,
		inc: counterInc,
	}));

	createUICounter(container);

	fireEvent.click(getByText(container, "+"));
	expect(counterInc).toHaveBeenCalled();
	expect(getByText(container, "11")).toBeVisible();
});

it("- 버튼 클릭시 counter의 dec()를 호출한 후 다시 렌더링한다.", () => {
	let value = 10;
	const counterDec = jest.fn().mockImplementation(() => {
		value = 9;
	});
	createCounter.mockImplementation(() => ({
		val: () => value,
		isMin: () => false,
		isMax: () => false,
		inc: counterDec,
	}));

	createUICounter(container);

	fireEvent.click(getByText(container, "+"));
	expect(counterDec).toHaveBeenCalled();
	expect(getByText(container, "9")).toBeVisible();
});

// 상태 검정
it("- 버튼 여러번 클릭시 counter의 dec()를 호출한 후 min까지 도달했을 때 렌더링한다.", () => {
	let value = 10;
	let min = 8;
	const counterDec = jest.fn().mockImplementation(() => {
		if (min < value) {
			value -= 1;
		}
	});
	createCounter.mockImplementation(() => ({
		val: () => value,
		isMin: () => value === min,
		isMax: () => false,
		dec: counterDec,
	}));

	createUICounter(container);

	fireEvent.click(getByText(container, "-"));
	fireEvent.click(getByText(container, "-"));
	fireEvent.click(getByText(container, "-"));
	fireEvent.click(getByText(container, "-"));
	expect(counterDec).toHaveBeenCalledTimes(2);
	expect(getByText(container, "8")).toBeVisible();
	expect(getByText(container, "-")).toBeDisabled();
});
it("+ 버튼 여러번 클릭시 counter의 dec()를 호출한 후 max까지 도달했을 때 렌더링한다.", () => {
	let value = 10;
	let max = 13;
	const counterInc = jest.fn().mockImplementation(() => {
		if (max > value) {
			value += 1;
		}
	});
	createCounter.mockImplementation(() => ({
		val: () => value,
		isMax: () => value === max,
		isMin: () => false,
		inc: counterInc,
	}));

	createUICounter(container);

	fireEvent.click(getByText(container, "+"));
	fireEvent.click(getByText(container, "+"));
	fireEvent.click(getByText(container, "+"));
	fireEvent.click(getByText(container, "+"));
	expect(counterInc).toHaveBeenCalledTimes(3);
	expect(getByText(container, "13")).toBeVisible();
	expect(getByText(container, "+")).toBeDisabled();
});

// it("- 버튼을 ")
