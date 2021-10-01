import "./styles.css";
import { useState, useEffect, useRef } from "react";

//https://randomuser.me/api/?results=20

export default function App() {
  // const [resultsArray, setResultsArray] = useState([]);
  const [locationHeaders, setLocationHeaders] = useState([]);
  const stringData = useRef("");

  //state for people data
  const [peopleData, setPeopleData] = useState([]);

  //useRef for sorting
  let ascending = useRef(true);

  async function grabData() {
    const response = await fetch("https://randomuser.me/api/?results=20");
    const rawData = await response.json();
    stringData.current = JSON.stringify(rawData, null, 2);
    // setResultsArray(rawData.results);
    return rawData.results;
  }

  function getPeopleTableData(resultsArray) {
    //results array, each element is a person
    //for each person we need tr, corresponding td
    //store it in new state variable? then render new elements

    let peopleData = [];
    resultsArray.forEach((person) => {
      const { street, coordinates, timezone, ...restOfKeys } = person.location;

      peopleData.push({
        PersonName: `${person.name.first} ${person.name.last}`,
        number: street.number,
        name: street.name,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        offset: timezone.offset,
        description: timezone.description,
        ...restOfKeys
      });
    });
    setPeopleData(peopleData);
    console.log(peopleData);
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
      "PersonName",
      ...Object.keys(street),
      ...Object.keys(coordinates),
      ...Object.keys(timezone),
      ...Object.keys(restOfKeys)
    ];
    setLocationHeaders(headersArray);
  }

  function ascendingOrder(e) {
    let header = e.target.innerText;
    let copyOfPeople = [...peopleData];

    if (ascending.current) {
      copyOfPeople.sort((a, b) => {
        if (a[header] > b[header]) {
          return 1;
        }
        if (a[header] < b[header]) {
          return -1;
        }
        return 0;
      });
    } else {
      copyOfPeople.sort((a, b) => {
        if (a[header] > b[header]) {
          return -1;
        }
        if (a[header] < b[header]) {
          return 1;
        }
        return 0;
      });
    }
    ascending.current = !ascending.current;
    setPeopleData(copyOfPeople);
  }

  let headers = locationHeaders.map((header, idx) => (
    <th
      onClick={(e) => ascendingOrder(e)}
      key={idx}
      style={{ border: "1px solid black" }}
    >
      {header}
    </th>
  ));

  let individualTableData = peopleData?.map((personObj, index) => (
    <tr key={index}>
      {/* {Object.entries(personObj).map((dataEntry, idx) => (
        <td style={{ border: "1px solid black" }} key={idx}>
          {dataEntry[1]}
        </td>
      ))} */}
      {locationHeaders.map((header, idx) => (
        <td style={{ border: "1px solid black" }} key={idx}>
          {personObj[header]}
        </td>
      ))}
    </tr>
  ));

  let table = (
    <table style={{ borderCollapse: "collapse" }}>
      <thead>
        <tr>{headers}</tr>
        {individualTableData}
      </thead>
    </table>
  );
  useEffect(() => {
    grabData()
      .then((resultsArray) => {
        flattenLocationHeaders(resultsArray);
        return resultsArray;
      })
      .then((resultsArray) => {
        getPeopleTableData(resultsArray);
      });
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
