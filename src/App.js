import "./styles.css";
import { useState, useEffect, useRef } from "react";

//https://randomuser.me/api/?results=20

export default function App() {
  const [resultsArray, setResultsArray] = useState([]);
  const stringData = useRef("");

  async function grabData() {
    const response = await fetch("https://randomuser.me/api/?results=20");
    const rawData = await response.json();
    stringData.current = JSON.stringify(rawData, null, 2);
    setResultsArray(rawData.results);
  }

  let userList = resultsArray.map((person, index) => (
    <tr key={index}>
      <td>{person.name.first}</td>
      <td>{person.name.last}</td>
      <td>
        {person.location.street.number}
        {person.location.street.name}
      </td>
      <td>{person.location.city}</td>
      <td>{person.location.state}</td>
      <td>{person.location.country}</td>
      <td>{person.location.postcode}</td>
      <td>
        {person.location.coordinates.latitude}
        {person.location.coordinates.longitude}
      </td>
      <td>
        {person.location.timezone.offset}
        {person.location.timezone.description}
      </td>
    </tr>
  ));

  let table = (
    <table>
      <thead>
        <tr>
          <th>FirstName</th>
          <th>LastName</th>
          <th>Street</th>
          <th>City</th>
          <th>State</th>
          <th>Country</th>
          <th>PostCode</th>
          <th>Coordinates</th>
          <th>Timezone</th>
        </tr>
        {userList}
      </thead>
    </table>
  );

  useEffect(() => {
    grabData();
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {/* <pre style={{textAlign:"start"}}>
        {stringData.current}
      </pre> */}
      {table}
    </div>
  );
}
