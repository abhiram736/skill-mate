import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>Dashboard</h1>

        <h3>Skills Offered</h3>
        <p>Java, React</p>

        <h3>Skills Wanted</h3>
        <p>Python, NodeJS</p> 

        <h3>Pending Requests</h3>
        <p>2</p>
      </div>
    </>
  );
}

export default Dashboard;