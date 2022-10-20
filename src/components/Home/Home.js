const Home = ({ newGreeting, setNewGreeting }) => {
  const printHello = () => {
    console.log(newGreeting);
    // fcl.authenticate();
  };

  return (
    <div>
      <main className="main">
        <h1 className="title">
          Welcome to my{" "}
          <a href="https://academy.ecdao.org" target="_blank">
            Emerald DApp!
          </a>
        </h1>
        <p>This is a DApp</p>

        <div className="flex">
          <button onClick={printHello}>Hello</button>
          <input
            onChange={(e) => setNewGreeting(e.target.value)}
            placeholder="Change the greeting here..."
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
