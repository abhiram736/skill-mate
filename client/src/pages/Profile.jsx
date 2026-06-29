import Navbar from "../components/Navbar";

function Profile() {
  return (
    <>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>Profile</h1>

        <p>Name: Hari</p>

        <p>
          Skills Offered:
          Java, React
        </p>

        <p>
          Skills Wanted:
          Python, NodeJS
        </p>
      </div>
    </>
  );
}

export default Profile;