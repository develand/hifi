import '/factories/account.js';

describe('Account', () => {
  describe('Creation', () => {
    let account = null;
    let onDeleteAccount = sinon.spy();
    let onSelectAccount = sinon.spy();

    beforeEach(() => {
      account = Factory.create('accounts');
    });
    
    it("saves a valid account", () => {
  
    });
  });

  describe('interfaces with account summary page', () => {

  });
});