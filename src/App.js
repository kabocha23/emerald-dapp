import { useState, useEffect } from "react";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import * as fcl from "@onflow/fcl";

import "./App.css";

function App() {
  const [greeting, setGreeting] = useState("Hello");
  const [newGreeting, setNewGreeting] = useState("");
  const [user, setUser] = useState({ loggedIn: false });
  const [number, setNumber] = useState(0);
  const [newNumber, setNewNumber] = useState(0);
  const [txStatus, setTxStatus] = useState("Run Transaction");

  const runTransaction = async () => {
    const transactionId = await fcl.mutate({
      cadence: `
        import HelloWorld from ${process.env.REACT_APP_TESTNET_ACCOUNT_ADDRESS}
          
        transaction(myNewGreeting: String) {
          prepare(signer: AuthAccount) {}
          execute {
              HelloWorld.changeGreeting(newGreeting: myNewGreeting)
          }
        }
      `,
      args: (arg, t) => [arg(newGreeting, t.String)],
      proposer: fcl.authz,
      payer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 999,
    });
    console.log("Here is the transactionId: " + transactionId);
    fcl.tx(transactionId).subscribe((res) => {
      console.log(res);
      if (res.status === 0 || res.status === 1) {
        setTxStatus("Pending...");
      } else if (res.status === 2) {
        setTxStatus("Finalized...");
      } else if (res.status === 3) {
        setTxStatus("Executed...");
      } else if (res.status === 4) {
        setTxStatus("Sealed!");
        setTimeout(() => setTxStatus("Run Transaction"), 2000);
      }
    });
    await fcl.tx(transactionId).onceSealed();
    executeScript();
  };

  const executeScript = async () => {
    const response = await fcl.query({
      cadence: `
        import HelloWorld from ${process.env.REACT_APP_TESTNET_ACCOUNT_ADDRESS}
        
        pub fun main(): String {
          return HelloWorld.greeting
        }
      `,
      args: (arg, t) => [],
    });

    setGreeting(response);
  };

  const changeSimpleTest = async () => {
    const transactionId = await fcl.mutate({
      cadence: `
        import SimpleTest from 0x6c0d53c676256e8c

        transaction(myNewNumber: Int) {
          prepare(signer: AuthAccount) {}
          execute {
              SimpleTest.updateNumber(newNumber: myNewNumber)
          }
        }
      `,
      args: (arg, t) => [arg(newNumber, t.Int)],
      proposer: fcl.authz,
      payer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 999,
    });
    console.log("Here is the transactionId: " + transactionId);
    await fcl.tx(transactionId).onceSealed();
    readSimpleTest();
  };

  const readSimpleTest = async () => {
    const response = await fcl.query({
      cadence: `
        import SimpleTest from 0x6c0d53c676256e8c

        pub fun main(): Int {
          return SimpleTest.number
        }
      `,
      args: (arg, t) => [],
    });

    setNumber(response);
  };

  useEffect(() => {
    executeScript();
    readSimpleTest();
  }, []);

  return (
    <div className="App">
      <Navbar fcl={fcl} user={user} setUser={setUser} />
      <Home
        runTransaction={runTransaction}
        greeting={greeting}
        newGreeting={newGreeting}
        setNewGreeting={setNewGreeting}
        number={number}
        setNewNumber={setNewNumber}
        changeSimpleTest={changeSimpleTest}
        txStatus={txStatus}
      />
    </div>
  );
}

export default App;
