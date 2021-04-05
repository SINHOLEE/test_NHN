it("examples of some things", async () => {
	const famousWomanInHistory = "Ada Lovelace";
	const container = getExampleDOM();

	// Label 텍스트로 검색 (없으면 에러 발생)
	const input = getByLabelText(container, "Username");
	input.value = famousWomanInHistory;

	// 실제 텍스트로 검색 (없으면 에러 발생)
	getByText(container, "Print Username").click();

	await wait(() =>
		// [data-testid="printed-username"]인 요소 검색 -> 없으면 계속 시도 (timeout 까지)
		expect(queryByTestId(container, "printed-username")).toBeTruthy(),
	);
});
