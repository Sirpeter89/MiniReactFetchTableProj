import "./styles.css";
import { useState, useEffect, useRef } from "react";

//https://randomuser.me/api/?results=20

export default function App() {
  // const [resultsArray, setResultsArray] = useState([]);
  const [locationHeaders, setLocationHeaders] = useState([]);
  const stringData = useRef("");

  async function grabData() {
    const response = await fetch("https://randomuser.me/api/?results=20");
    const rawData = await response.json();
    stringData.current = JSON.stringify(rawData, null, 2);
    // setResultsArray(rawData.results);
    return rawData.results;
  }

  function flattenLocationHeaders(resultsArray) {
    //we're going to destructure to get inner keys
    const {
      street,
      coordinates,
      timezone,
      ...restOfKeys
    } = resultsArray[0].location;

    let headersArray = [
      "street",
      ...Object.keys(street),
      "coordinates",
      ...Object.keys(coordinates),
      "timezone",
      ...Object.keys(timezone),
      ...Object.keys(restOfKeys)
    ];
    setLocationHeaders(headersArray);
  }

  let headers = locationHeaders.map((header, idx) => <th>{header}</th>);

  let table = (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
    </table>
  );

  useEffect(() => {
    grabData().then((resultsArray) => flattenLocationHeaders(resultsArray));
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {/* <pre style={{ textAlign: "start" }}>{stringData.current}</pre> */}
      {table}
    </div>
  );
}
