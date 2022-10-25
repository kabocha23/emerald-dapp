const Home = ({
  runTransaction,
  greeting,
  setNewGreeting,
  changeSimpleTest,
  number,
  setNewNumber,
}) => {
  return (
    <div>
      <main className="main">
        <h1 className="title">
          Welcome to my{" "}
          <a href="https://academy.ecdao.org" target="_blank">
            Emerald DApp!
          </a>
        </h1>
        <p>Jason Kobuchi's DApp</p>

        <div className="flex">
          <button onClick={runTransaction}>Run Transaction</button>
          <input
            onChange={(e) => setNewGreeting(e.target.value)}
            placeholder="Change the greeting here..."
          />
          <p>{greeting}</p>
        </div>

        <div>
          <button onClick={changeSimpleTest}>Change SimpleTest Number</button>
          <input
            onChange={(e) => setNewNumber(e.target.value)}
            placeholder="Change the number here..."
          />
          <p>{number}</p>
        </div>
      </main>
    </div>
  );
};

export default Home;
