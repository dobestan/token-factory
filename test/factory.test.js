const Factory = artifacts.require("Factory");


contract("Factory", (accounts) => {
    it("should have a owner.", async () => {
        const factory = await Factory.deployed();
        assert.equal(
            await factory.owner(),
            accounts[0],
        );
    });
});
