import Web3 from "web3";
import starNotaryArtifact from "../../build/contracts/StarNotary.json";
// import './styles/app.css';
const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      console.log('NetworkID '+ networkId);
      console.log('ABI '+ starNotaryArtifact.abi);      
      const deployedNetwork = starNotaryArtifact.networks[networkId];
      console.log('Address '+ deployedNetwork.address);      
      this.meta = new web3.eth.Contract(
        starNotaryArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
      console.log( 'Account' + account);
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },
// function called to show the starName
starNameFunc: async function() {
  const { starName } = this.meta.methods; // to be able to use the functions in your Smart Contract use destructuring to get the function to be call
  const response = await starName().call({from:this.account}); // calling the starName property from your Smart Contract.
  const owner = document.getElementById("name"); // Updating Html
  owner.innerHTML = response;
},

// function called to show the starOwner
starOwnerFunc: async function() {
  const { starOwner } = this.meta.methods; // to be able to use the functions in your Smart Contract use destructuring to get the function to be call
  const response = await starOwner().call({from:this.account}); // calling the starOwner property from your Smart Contract.
  const owner = document.getElementById("owner"); // Updating Html
  owner.innerHTML = response;
},

// function called to claim a Star
claimStarFunc: async function(){
  const { claimStar, starOwner } = this.meta.methods; // to be able to use the functions in your Smart Contract use destructuring to get the function to be call
  await claimStar().send({from: this.account}); // Use `send` instead of `call` when you called a function in your Smart Contract
  const response = await starOwner().call({from:this.account});
  App.setStatus("New Star Owner is " + response + ".");
},
  createStar: async function() {
    const { createStar } = this.meta.methods;
    const name = document.getElementById("starName").value;
    const id = document.getElementById("starId").value;
    await createStar(name, id).send({from: this.account});
    App.setStatus("New Star Owner is " + this.account + ".");
  },

  // Implement Task 4 Modify the front end of the DAPP

  lookUp: async function (){
    const {lookUptokenIdToStarInfo } = this.meta.methods;
    let starId = document.getElementById("lookid").value;
    if(starId){
      let starName = await lookUptokenIdToStarInfo(starId).call({from:this.account});
      App.setStatus(`The Star Name is ${starName}`);
    }
  }

};

window.App = App;

window.addEventListener("load", async function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:7545. You should remove this fallback when you deploy live",);
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"),);
  }

  App.start();
});