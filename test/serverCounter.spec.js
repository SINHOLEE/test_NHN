import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {waitForDomChange, wait, getByText, fireEvent} from "@testing-library/dom";
import {createServerCounter} from "../src/serverCounter/counter";

const mockAxios = new MockAdapter(axios);

mockAxios
	.onGet("/users", {
		params: {
			searchText: "John",
		},
	})
	.reply(200, {
		users: [
			{
				id: 1,
				name: "John Smith",
			},
		],
	});
let container;

describe("목 aixos 테스트 ", () => {
	it("get users 값은 데모와 같다.", async () => {
		const res = await axios.get("/users", {
			params: {
				searchText: "John",
			},
		});
		// const res2 = await axios.get("/users");
		expect(res.data).toEqual({
			users: [
				{
					id: 1,
					name: "John Smith",
				},
			],
		});
		expect(mockAxios.history.get.length).toBe(1);
		// expect(mockAxios.history.get[0].data).toEqual({page: 1});
	});
});

beforeEach(async () => {
	container = document.createElement("div");
	document.body.appendChild(container);
	mockAxios.onGet("/counter").reply(200, {
		value: 10,
		isMin: false,
		isMax: false,
	});
});

afterEach(() => {
	document.body.innerHTML = "";
	mockAxios.reset();
});

it("생성시 버튼과 초기값을 렌더링한다.", async () => {
	createServerCounter(container);
	await waitForDomChange({container});
	expect(getByText(container, "10")).toBeVisible();
	expect(getByText(container, "-")).toBeVisible();
	expect(getByText(container, "+")).toBeVisible();
});

it("+ 버튼 클릭시 서버에 inc요청을 보낸 후 응답값으로 뷰를 갱신한다.", async () => {
	createServerCounter(container);
	await waitForDomChange({container});
	// 미리 반환값을 정해주고 -> event를 fire한다.
	await mockAxios.onPut("/counter/inc").reply(200, {
		value: 11,
		isMax: false,
		isMin: false,
	});

	fireEvent.click(getByText(container, "+"), new Event("click"));
	await wait(() => {
		expect(getByText(container, "11")).toBeVisible();
	});
});

it("- 버튼 클릭시 서버에 dec 요청을 보낸 후 응답값으로 뷰를 갱신한다.", async () => {
	createServerCounter(container);
	await waitForDomChange({container});

	mockAxios.onPut("/counter/dec").reply(200, {
		value: 9,
		isMin: false,
		isMax: false,
	});
	fireEvent.click(getByText(container, "-"), new Event("click"));
	await wait(() => {
		expect(getByText(container, "9")).toBeVisible();
	});
});

it("최대값이면 + 버튼이 disabled 상태가 되고, 클릭해도 서버에 요청을 보내지 않는다", async () => {
	mockAxios.onGet("/counter").reply(200, {
		value: 10,
		isMax: true,
		isMin: false,
	});
	createServerCounter(container);
	await wait(() => {
		expect(getByText(container, "+")).toBeDisabled();
		expect(getByText(container, "-")).not.toBeDisabled();
	});
});

it("최소값이면 - 버튼이 disabled 상태가 되고, 클릭해도 서버에 요청을 보내지 않는다", async () => {
	mockAxios.onGet("/counter").reply(200, {
		value: 10,
		isMax: false,
		isMin: true,
	});
	createServerCounter(container);
	await wait(() => {
		expect(getByText(container, "-")).toBeDisabled();
		expect(getByText(container, "+")).not.toBeDisabled();
	});
});
