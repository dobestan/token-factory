const Factory = artifacts.require("Factory");
const Token = artifacts.require("Token");


contract("Factory", (accounts) => {
    let factory;

    before("get deployed factory contract.", async () => {
        factory = await Factory.deployed();
    });

    it("should have a owner.", async () => {
        assert.equal(
            await factory.owner(),
            accounts[0],
        );
    });

    contract("createToken function", () => {
        let name_ = "UltimatePowerfulBitcoin";
        let symbol_ = "UPBIT";
        let initial_ = 1000000;
        let deployedToken;

        before("create a token contract", async () => {
            const deployed = await factory.createToken(
                name_,
                symbol_,
                initial_
            );
            const deployedTokenAddress = deployed.receipt.rawLogs[0].address;
            deployedToken = await Token.at(deployedTokenAddress);
        });

        it("deployed token should have a name, symbol, and own address.", async () => {
            assert.ok(deployedToken.address);
            assert.equal(await deployedToken.name(), name_);
            assert.equal(await deployedToken.symbol(), symbol_);
        });

        it("should mint initial tokens to original owner address instead of factory address.", async () => {
            assert.equal(
                web3.utils.fromWei(await deployedToken.balanceOf(accounts[0]), "ether"),
                initial_
            )
        });

        it("should store deployed token contract to tokens.", async () => {
            let tokenInformation = await factory.tokens(0);
            assert.equal(tokenInformation.name, await deployedToken.name());
            assert.equal(tokenInformation.symbol, await deployedToken.symbol());
            assert.equal(tokenInformation.owner, accounts[0]);
            assert.equal(tokenInformation.deployedAt, deployedToken.address);
        });
    });

     contract("getTokens function", () => {
        it("should return all deployed tokens", async () => {
            let firstDeployed = await factory.createToken("First Token", "T1", 1000);
            let secondDeployed = await factory.createToken("Second Token", "T2", 1000);
            let tokens = await factory.getTokens();

            assert.equal(tokens.length, 2);
            assert.equal(
                tokens[0].deployedAt,
                firstDeployed.receipt.rawLogs[0].address
            );

            let secondDeployedToken = await Token.at(secondDeployed.receipt.rawLogs[0].address);
            assert.equal(
                tokens[1].name,
                await secondDeployedToken.name()
            );
        });
    });
});
