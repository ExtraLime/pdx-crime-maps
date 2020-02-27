import React, { useState } from "react";

const people = [
  "Siri",
  "Alexa",
  "Google",
  "Facebook",
  "Twitter",
  "Linkedin",
  "Sinkedin"
];

const Filter = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const results = !searchTerm
    ? people
    : people.filter(person =>
        person.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      );

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {results.map(item => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Filter;