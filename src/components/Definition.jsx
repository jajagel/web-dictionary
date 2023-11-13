import React, { useEffect, useState } from "react";
import "./Definition.css";
import { newWindow } from "../assets/images";
import axios from "axios";

const Definition = ({ word }) => {
  const [showDefinition, setShowDefinition] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [synonym, setSynonym] = useState(null);

  const playAudio = (audioUrl) =>
    audioUrl?.find((item) => item.audio)?.audio &&
    new Audio(audioUrl.find((item) => item.audio).audio).play();

  const fetchData = async (keyword) => {
    if (!keyword) return;

    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`
      );
      setResult(response.data);
      setShowDefinition(true);
    } catch (error) {
      setError("Word not found in the dictionary.");
      setShowDefinition(false);
    } finally {
      setLoading(false);
      setSynonym("");
    }
  };

  useEffect(() => {
    fetchData(word);
  }, [word]);

  useEffect(() => {
    fetchData(synonym);
  }, [synonym]);

  return (
    <div>
      {isLoading && <div className="loader">Loading...</div>}
      {!isLoading && (
        <>
          {showDefinition && result ? (
            <>
              {result.map((resultItem, index) => (
                <div key={index} className="definition">
                  <div className="word">
                    <h1>{resultItem.word}</h1>
                    {resultItem.phonetics.filter((item) => item.audio)[0] && (
                      <div
                        className="play-btn"
                        onClick={() => playAudio(resultItem.phonetics)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="75"
                          height="75"
                          viewBox="0 0 75 75"
                        >
                          <g fill="#A445ED" fillRule="evenodd">
                            <circle
                              cx="37.5"
                              cy="37.5"
                              r="37.5"
                              opacity=".25"
                            />
                            <path d="M29 27v21l21-10.5z" />
                          </g>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="pronunciation">{resultItem.phonetic}</div>

                  {resultItem.meanings.map((meaning, index) => (
                    <div key={index} className="speech">
                      <div className="speech__type">{meaning.partOfSpeech}</div>
                      <div>
                        <div className="title">Meaning</div>
                        <div className="speech__meaning">
                          <ul>
                            {meaning.definitions.map((definition, index) => (
                              <li key={index}>
                                <span>{definition.definition}</span>
                                {definition.example && (
                                  <div className="example">
                                    "{definition.example}"
                                  </div>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      {meaning.synonyms.length > 0 && (
                        <div className="synonyms">
                          <div className="title__synonyms">Synonyms </div>
                          {meaning.synonyms.map((synonym, index) => (
                            <div
                              key={index}
                              className="synonym"
                              onClick={() => setSynonym(synonym)}
                            >
                              {synonym}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="end">
                    <hr />
                    <div className="source">
                      <span>Source</span>
                      <a href={resultItem.sourceUrls} target="_blank">
                        {resultItem.sourceUrls}
                        <img src={newWindow} alt="" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="error">{error}</div>
          )}
        </>
      )}
    </div>
  );
};

export default Definition;
