import { useEffect } from "react";

export default function Requests() {
  useEffect(() => {
    console.log("Requests page loaded");
  }, []);

  return (
    <div>
      <h1>Requests</h1>
      <p>Skill exchange requests will appear here (Member 3 API)</p>
    </div>
  );
}