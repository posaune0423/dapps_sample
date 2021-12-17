require('dotenv').config();
const Web3 = require("web3");
const abi = require("./polygonAbi");

const provider = process.env.PROVIDER_URL;
const web3 = new Web3(provider);

const myContract = new web3.eth.Contract(
  abi,
  process.env.POLYGON_CONTRACT_ADDRESS
);

myContract.events
  .allEvents(
    {
      fromBlock: "latest",
    },
    function (error, event) {
      if (error) {
        console.error(error);
      } else {
        console.log("Event Emission here !");
        console.log({ event });
      }
    }
  )
  .on("connected", function (subscriptionId) {
    console.log(subscriptionId);
    console.log("Successfully Connected, Listening to Contract events ...!");
  })
  .on("changed", function (event) {
    // remove event from local database
    console.log("Changed trigger fired !");
  })
  .on("error", function (error, receipt) {
    // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
    console.error(error);
  });
