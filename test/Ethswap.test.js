const { assert } = require('chai')
const { default: Web3 } = require('web3')

const Token=artifacts.require('Token')
const Ethswap=artifacts.require('Ethswap')

require('chai')
.use(require('chai-as-promised'))
.should()

function tokens(n){
    return web3.utils.toWei(n,'ether')
}
contract ('Ethswap',([deployer,investor])=>{
    let token
    let ethSwap
    before(async()=>{
        token=await Token.new()
        ethSwap=await Ethswap.new(token.address)
        await token.transfer(ethSwap.address,tokens('1000000'))
    })
    describe('Token deployment',async()=>{
        it("contract has a name",async()=>{
           
            const name=await token.name()
            assert.equal(name,'HEALTH TOKEN')
        })
    })

    describe('Ethswap deployment',async()=>{
        it("contract has a name",async()=>{
           
            const name=await ethSwap.name()
            assert.equal(name,'Ethswap')
        })

        it('contract has token',async()=>{
            let balance=await token.balanceOf(ethSwap.address)
            assert.equal(balance.toString(),tokens('1000000'))
        })
    })

    describe('Buy tokens',async()=>{
        let result
        before(async()=>{
            result=await ethSwap.buyTokens({from:investor,value:web3.utils.toWei('1','ether')})
        })
        it('allows user to instantly purchase tokens for a fixed price',async()=>{
            let investorBalance=await token.balanceOf(investor)
            // console.log(investorBalance.toString())
            assert.equal(investorBalance.toString(),tokens('100'))
            let ethSwapBalance
            ethSwapBalance=await token.balanceOf(ethSwap.address)
            // console.log(ethSwapBalance.toString())
            assert.equal(ethSwapBalance.toString(),tokens('999900'))
            ethSwapBalance=await web3.eth.getBalance(ethSwap.address)
            assert.equal(ethSwapBalance.toString(),web3.utils.toWei('1','Ether'))

            const event=result.logs[0].args
            assert.equal(event.account,investor)
            assert.equal(event.token,token.address)
            assert.equal(event.amount.toString(),tokens('100').toString())
            assert.equal(event.rate.toString(),'100')
        })
    })
})