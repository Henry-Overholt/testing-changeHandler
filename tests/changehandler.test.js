let { ChangeHandler } = require("../src/changehandler");

describe("Tests for ChangeHandler", function() {
  // Set up a test below...
  test("The ChangeHandler class is defined.", function() {
    // Remember, you can arrange, act, and assert...start small
    expect(ChangeHandler).toBeDefined();
  });
  test("amountDue is set based on an argument", function() {
    let vendingMachine = new ChangeHandler(105);
    expect(vendingMachine.amountDue).toBe(105);
  });
  test("cashTendered is set to zero", function() {
    let vendingMachine = new ChangeHandler(105);
    expect(vendingMachine.cashTendered).toBe(0);
  });
  describe("insertCoin", function() {
    test("inserting a penny adds 1 to cashTendered", function() {
      const vendingMachine = new ChangeHandler(105);
      vendingMachine.insertCoin("penny");
      expect(vendingMachine.cashTendered).toBe(1);
    });
    test("inserting a nickel adds 5 to cashTendered", function() {
      const vendingMachine = new ChangeHandler(105);
      vendingMachine.insertCoin("nickel");
      expect(vendingMachine.cashTendered).toBe(5);
    });
    test("inserting a dime adds 10 to cashTendered", function() {
      const vendingMachine = new ChangeHandler(105);
      vendingMachine.insertCoin("dime");
      expect(vendingMachine.cashTendered).toBe(10);
    });
    test("inserting a quarter adds 25 to cashTendered", function() {
      const vendingMachine = new ChangeHandler(105);
      vendingMachine.insertCoin("quarter");
      expect(vendingMachine.cashTendered).toBe(25);
    });
    test("Calling function multiple times continues to add on to the amount", function() {
      const vendingMachine = new ChangeHandler(105);
      vendingMachine.insertCoin("quarter");
      vendingMachine.insertCoin("quarter");
      vendingMachine.insertCoin("dime");
      vendingMachine.insertCoin("penny");
      expect(vendingMachine.cashTendered).toBe(61);
    });
  });
  describe("isPaymentSufficient", function() {
    test("Returns true if cashTendered more than amountDue", function() {
      const vendingMachine = new ChangeHandler(30);
      vendingMachine.insertCoin("quarter");
      vendingMachine.insertCoin("quarter");
      expect(vendingMachine.isPaymentSufficient()).toBe(true);
    });
    test("Returns false if cashTendered less than amountDue", function() {
      const vendingMachine = new ChangeHandler(55);
      vendingMachine.insertCoin("quarter");
      vendingMachine.insertCoin("quarter");
      expect(vendingMachine.isPaymentSufficient()).toBe(false);
    });
    test("Returns true if cashTendered equal to amountDue", function() {
      const vendingMachine = new ChangeHandler(50);
      vendingMachine.insertCoin("quarter");
      vendingMachine.insertCoin("quarter");
      expect(vendingMachine.isPaymentSufficient()).toBe(true);
    });
  });
  describe("giveChange", function() {
    test("32 change produces: quarters: 1, dimes: 0, nickels: 1, pennies: 2.", function() {
      const vendingMachine = new ChangeHandler(32);
      vendingMachine.insertCoin("quarter");
      vendingMachine.insertCoin("quarter");
      vendingMachine.insertCoin("nickel");
      vendingMachine.insertCoin("nickel");
      vendingMachine.insertCoin("penny");
      vendingMachine.insertCoin("penny");
      vendingMachine.insertCoin("penny");
      vendingMachine.insertCoin("penny");
      expect(vendingMachine.giveChange()).toEqual({
        quarters: 1,
        dimes: 0,
        nickels: 1,
        pennies: 2
      });
    });

    test("10 change produces: quarters: 0, dimes: 1, nickels: 0, pennies: 0", function() {
      const vendingMachine = new ChangeHandler(10);
      vendingMachine.insertCoin("dime");
      vendingMachine.insertCoin("dime");
      expect(vendingMachine.giveChange()).toEqual({
        quarters: 0,
        dimes: 1,
        nickels: 0,
        pennies: 0
      });
    });
    test("27 change produces: quarters: 1, dimes: 0, nickels: 0, pennies: 2", function() {
      const vendingMachine = new ChangeHandler(27);
      vendingMachine.insertCoin("quarter");
      vendingMachine.insertCoin("quarter");
      vendingMachine.insertCoin("penny");
      vendingMachine.insertCoin("penny");
      vendingMachine.insertCoin("penny");
      vendingMachine.insertCoin("penny");
      expect(vendingMachine.giveChange()).toEqual({
        quarters: 1,
        dimes: 0,
        nickels: 0,
        pennies: 2
      });
    });
    test("68 change produces: quarters: 2, dimes: 1, nickels: 1, pennies: 3", function() {
      const vendingMachine = new ChangeHandler(32);
      vendingMachine.insertCoin("quarter");
      vendingMachine.insertCoin("quarter");
      vendingMachine.insertCoin("quarter");
      vendingMachine.insertCoin("quarter");
      expect(vendingMachine.giveChange()).toEqual({
        quarters: 2,
        dimes: 1,
        nickels: 1,
        pennies: 3
      });
    });
  });
});
