import Navbar from "../components/Navbar";

function Requests() {
  return (
    <>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>Requests</h1>

        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
            marginTop: "20px",
          }}
        >
          <p>Hari wants to learn React.</p>

          <button>Accept</button>

          <button
            style={{ marginLeft: "10px" }}
          >
            Reject
          </button>
        </div>
      </div>
    </>
  );
}

export default Requests;