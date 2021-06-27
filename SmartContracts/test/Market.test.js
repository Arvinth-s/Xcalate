const assert = require("assert");
const { before } = require("underscore");
const Market = artifacts.require("Market");
const Page = artifacts.require("Page");
const ERC20 = artifacts.require("ERC20");
const USDC = artifacts.require("USDC");


var default_params = {
    'usdc':{
        'address':null,
    },
    'web3':{
        'accounts':null
    },
    'Market':{
        'subscribe':{
            'validity':1,
        },
        'fee':1000,
        'token': null
    },
    'Page':{
        '_name': 'garuda_service',
        '_nstocks': 1000,
        '_owner': null,
        '_token': null
    }
}

function timeout(s) {
  return new Promise((resolve) => setTimeout(resolve, 1e3 * s));
}

async function create_usdc(){
    usdc = await USDC.new();
    accounts = await web3.eth.getAccounts();
    usdc_pool = await usdc.balanceOf(accounts[0]);
    var usdc_addr = await usdc.address;

    for (let i = 1; i < 10; i++) {
      await usdc.transfer.sendTransaction(accounts[i], usdc_pool / 1e10, {
        from: accounts[0],
      });
    }

    default_params["usdc"]["address"] =
      default_params["Market"]["token"] =
      default_params["Page"]["_token"] =
        usdc_addr;
    default_params["web3"]["accounts"] = accounts;
    default_params["Page"]["_owner"] = accounts[0];
    return;
}



describe("USDC contract", async () => {

    it("calls the USDC contract", async () => {
        await create_usdc();
        usdc = await ERC20.at(default_params["usdc"]["address"]);
        console.log(
        "account[0] balance: ",
        (await usdc.balanceOf.call(accounts[0])).toString()
        );
    });
});


var instance;
describe('Subsciption', async() => {
    it('creates an instance', async function() {
        await create_usdc();
        instance = await Market.new(default_params['Market']['fee'], default_params['Market']['token']);
    });


    it('allows user to subscribe', async function(){
        await usdc.approve.sendTransaction(
          instance.address,
          default_params["Market"]['fee']*default_params['Market']['subscribe']['validity'],
          { from: accounts[1] }
        );
        await instance.subscribe.sendTransaction(
          default_params["Market"]["subscribe"]["validity"],
          { from: accounts[1] }
        );
        assert(await(instance.isSubscriber.call({from: accounts[1]}))>0);
    });
    
});

