const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("SimpleStorage", function () {
    let SimpleStorageFactory, simpleStorage;
    beforeEach(async function () {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await SimpleStorageFactory.deploy();
    });

    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve();
        const expectedValue = "0";
        assert.equal(currentValue.toString(), expectedValue);
    });
    it("Should update when we call store", async function () {
        const expectedValue = "7";
        const transactionResponse = await simpleStorage.store(expectedValue);
        await transactionResponse.wait(1);

        const currentValue = await simpleStorage.retrieve();
        assert.equal(currentValue.toString(), expectedValue);
    });
    it("Should add a person with their favorite number", async function () {
        const expectedNumber = "10";
        const expectedName = "Caleb";
        const transactionResponse = await simpleStorage.addPerson(
            expectedName,
            expectedNumber
        );
        await transactionResponse.wait(1);

        const currentPerson = await simpleStorage.people(0);
        const currentName = currentPerson[1];
        const currentNumber = currentPerson[0];
        const nameToNumber = await simpleStorage.nameToFavoriteNumber(
            currentName
        );

        assert.strictEqual(currentName, expectedName);
        assert.equal(currentNumber.toString(), expectedNumber);
        assert.equal(nameToNumber.toString(), expectedNumber);
    });
});
