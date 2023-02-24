import React, { useState, useEffect } from "react";
import GoBackArrow from "../components/backArrow";
import { Participant } from "../models/models";

const SecretSanta: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [result, setResult] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [inputNames, setInputNames] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");
  const [inputSpouseName, setInputSpouseName] = useState<string>("");

  const handleRemoveParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const handleInputChange = (
    index: number,
    field: keyof Participant,
    value: string
  ) => {
    const newParticipants = [...participants];
    newParticipants[index][field] = value;

    if (field === "spouse") {
      // Update spouse's spouse input if necessary
      const spouseIndex = participants.findIndex((p) => p.name === value);
      if (spouseIndex !== -1) {
        newParticipants[spouseIndex].spouse = newParticipants[index].name;
      }
    }

    setParticipants(newParticipants);
  };

  const handleInputNamesChange = (value: string) => {
    setInputNames(value);
  };

  const handleRollResult = () => {
    if (participants.length < 2) {
      setError("At least two participants are required.");
      return;
    }

    const availableSantas = participants.filter(
      (p) => p.name !== "" && p.lastSanta !== ""
    );

    if (availableSantas.length < 2) {
      setError("Not enough participants can be Santa.");
      return;
    }

    const usedSantas = new Set<string>();
    const newResult: Record<string, string> = {};

    availableSantas.forEach((p) => {
      let candidateSantas = availableSantas.filter(
        (q) =>
          q.name !== p.lastSanta && q.name !== p.name && !usedSantas.has(q.name)
      );

      if (candidateSantas.length === 0) {
        candidateSantas = availableSantas.filter(
          (q) => q.name !== p.lastSanta && q.name !== p.name
        );
      }

      if (candidateSantas.length === 0) {
        candidateSantas = availableSantas.filter(
          (q) => q.name !== p.name && !usedSantas.has(q.name)
        );
      }

      if (candidateSantas.length === 0) {
        candidateSantas = availableSantas.filter((q) => q.name !== p.name);
      }

      if (candidateSantas.length === 0) {
        setError("No valid Santa can be found.");
        setResult({});
        return;
      }

      const i = Math.floor(Math.random() * candidateSantas.length);
      const santa = candidateSantas[i].name;
      usedSantas.add(santa);
      newResult[p.name] = santa;
    });

    setResult(newResult);
    setError(null);
  };

  const handleParseNames = () => {
    const parsedNames = inputNames
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name !== "");

    setParticipants(
      parsedNames.map((name) => ({ name, spouse: "", lastSanta: "" }))
    );

    setInputNames("");
  };

  useEffect(() => {
    const storedData = localStorage.getItem("secretSantaData");

    if (storedData) {
      setParticipants(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("secretSantaData", JSON.stringify(participants));
  }, [participants]);

  useEffect(() => {
    // Find the index of the participant who has been selected as a spouse
    const spouseIndex = participants.findIndex(
      (p) => p.name === inputSpouseName && p.spouse === ""
    );
    // Update the spouse's spouse field to the selected participant
    if (spouseIndex !== -1) {
      const newParticipants = [...participants];
      newParticipants[spouseIndex].spouse = inputName;
      setParticipants(newParticipants);
    }
  }, [inputName]);

  return (
    <>
      <GoBackArrow />
      <div className="secret-santa-content">
        {participants.length === 0 ? (
          <div className="secret-santa-insert-names-container">
            <label>
              Enter names of participants, separated by commas:
              <input
                type="text"
                value={inputNames}
                onChange={(e) => handleInputNamesChange(e.target.value)}
              />
            </label>
            <button onClick={handleParseNames} disabled={!inputNames}>
              Add participants names
            </button>
          </div>
        ) : (
          <div className="secret-santa-content-result-container">
            {participants.map((participant, i) => (
              <div key={i}>
                <label>Name: {participant.name} </label>
                <span className="styled-text-separator">|</span>
                <label>
                  Spouse:{" "}
                  <select
                    value={participant.spouse}
                    onChange={(e) =>
                      handleInputChange(i, "spouse", e.target.value)
                    }
                  >
                    <option value="">Select a name</option>
                    {participants.map((p, j) => (
                      <option key={j} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </label>
                <span className="styled-text-separator">|</span>
                <label>
                  Last Santa:{" "}
                  <select
                    value={participant.lastSanta}
                    onChange={(e) =>
                      handleInputChange(i, "lastSanta", e.target.value)
                    }
                  >
                    <option value="">Select a name</option>
                    {participants.map((p, j) => (
                      <option key={j} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveParticipant(i)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button onClick={handleRollResult}>Roll Secret Santa</button>
            {error && <div className="error">{error}</div>}
            {Object.keys(result).length > 0 && (
              <div className="result">
                {Object.entries(result).map(([k, v]) => (
                  <p key={k}>
                    {k} is the Santa of {v}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SecretSanta;
