
const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank"); 

require('chai')
.use(require('chai-as-promised'))
.should()

contract('DecentralBank', ([owner, customer]) => {
   //all of the codes goes here for testing

   let tether, rwd, decentralBank;

   function tokens(number) {
      return web3.utils.toWei(number, 'ether')
   }

   before(async () => {        
      //load contracts
        tether = await Tether.new()
        rwd = await RWD.new();
         decentralBank = await DecentralBank.new(rwd.address, tether.address);

         //trasfer all rwd token to decentralbank
         await rwd.transfer(decentralBank.address, tokens('1000000'));

         //transfer 100 mock tether to customer
         await tether.transfer(customer, tokens('100'), {from: owner})
   })

   describe('Mock Tether Deployment', async () => {
      it('matches name successfully', async () => {
         const name = await tether.name()
         assert.equal(name, 'Mock Tether Token')
      })
   })

   describe('Reward Token Deployment', async () => {
      it('matches name successfully', async () => {
         const name = await rwd.name()
         assert.equal(name, 'Reward Token')
      })
   })

   describe('Reward Token Deployment', async () => {
      it('matches name successfully', async () => {
         const name = await decentralBank.name()
         assert.equal(name, 'Decentral Bank')
      })

      it('contract has tokens', async () => {
         let balance = await rwd.balanceOf(decentralBank.address);
         // console.log(web3.utils.fromWei(balance))
         assert.equal(balance, tokens('1000000'));
      })
   })
})