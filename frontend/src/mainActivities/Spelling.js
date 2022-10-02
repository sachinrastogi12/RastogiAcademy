import React, { useEffect, useState } from "react";
import { Activityframe } from "../Components/Activityframe/Activityframe";
import Footer from "../Components/Footer/Footer";
import { NavBar } from "../Components/NavBar/NavBar";
import InstructionButton from "../Components/InstructionButton/InstructionButton";
import "./Spelling.css";
import { SpellingUtils } from "./SpellingUtils";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Correctincorrect } from "../Components/Correctincorrecticon/Correctincorrect";
import { makeStyles } from "@mui/styles";
import { maxHeight, minHeight } from "@mui/system";
import { PauseButton } from "../Components/Pausebutton/Pausebutton";
import { PlayButton } from "../Components/Playbutton/PlayButton";
import ServerModal from "../Components/Modal/ServerModal";
import sound_1 from "../Sound/wrong.mp3";
import sound_2 from "../Sound/instructionVoice.mp3";
import { Howl, Howler } from "howler";
import { useNavigate } from "react-router-dom";
import ScoreModal from "../Components/scoremodal/ScoreModal";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "20vw",
  },
  select: {
    height: "5vh",
  },
}));

function Spelling(props) {
  const navigate = useNavigate();
  const WrongSound = new Audio(sound_1);
  const spekerSound = new Audio(sound_2);
  const title = "Sentence Fill In";
  const classes = useStyles();
  const currentQuestion = true;
  const [actualmockData, setactualmockData] = useState([]);
  const [sentences, setSentences] = useState([{}]);
  const [distrac, setDistrac] = useState();
  const [dummy, setDummy] = useState(false);
  const [selectedWordCorrect, setSelectedWordCorrect] = useState();
  const [CorrectIncorrect, setCorrectIncorrect] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [modal, setModal] = useState(false);
  const [totalQues, setTotalQues] = useState();
  const [score, setScore] = useState(0);
  const [currQues, setCurrQues] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(async () => {
    async function fetchData() {
      await fetch(`http://localhost:4000/education`)
        .then((res) => res.json())
        .then((data) => {
          setTotalQues(data.length);
          setactualmockData(data);
        });
    }

    fetchData();
  }, []);

  useEffect(() => {
    const loadActivity = () => {
      const { sentence } = SpellingUtils.initialize(actualmockData);
      setSentences(sentence);
      setDummy(true);
    };

    if (currentQuestion === true) {
      loadActivity();
    }
  }, [actualmockData]);

  // putting value in dropbox form menu list
  const handleChange = (event, id) => {
    const cloneSentence = [...sentences];
    const index = cloneSentence.findIndex((sentence) => {
      return sentence.id === id;
    });
    const sentenceObj = cloneSentence[index];
    sentenceObj.selectedWord = event.target.value;
    cloneSentence[index] = sentenceObj;
    cloneSentence[index].shows = true;
    cloneSentence[index].isDisable = false;
    setSentences(cloneSentence);
  };

  // checking word is selected wordcorrect  is correct or not
  const handleSubmitClick = (id) => {
    setCorrectIncorrect(true);
    const cloneSentence = [...sentences];
    const index = cloneSentence.findIndex((sentence) => {
      return sentence.id === id;
    });

    const sentenceObject = cloneSentence[index];

    handleTrailComplete(sentenceObject);
    cloneSentence[index] = sentenceObject;
    setSentences(cloneSentence);
  };

  const handleTrailComplete = (sentenceObject) => {
    if (
      sentenceObject.trailCount === 0 &&
      sentenceObject.selectedWord === sentenceObject.correctedWord
    ) {
      handleCorrectAtFirst(sentenceObject);
    } else if (
      sentenceObject.trailCount === 0 &&
      sentenceObject.selectedWord !== sentenceObject.correctedWord
    ) {
      handleWrongAtFirst(sentenceObject);
    } else if (
      sentenceObject.trailCount === 1 &&
      sentenceObject.selectedWord === sentenceObject.correctedWord
    ) {
      handleCorrectAtSecond(sentenceObject);
    } else {
      handleWrongAtSecond(sentenceObject);
    }
  };

  // const handleCorrectAtFirst = (sentenceObject) => {
  //   sentenceObject.isDisable = true;
  //   sentenceObject.isCorrect = true;
  //   sentenceObject.iconShow = true;
  //   //sentenceObject.shows = false;
  //   return sentenceObject;
  // };

  const handleWrongAtFirst = (sentenceObject) => {
    WrongSound.play();
    sentenceObject.selectedWord = " ";
    sentenceObject.isDisable = true;
    sentenceObject.trailCount++;
    sentenceObject.iconShow = true;
    return sentenceObject;
  };

  const handleCorrectAtFirst = (sentenceObject) => {
    sentenceObject.isDisable = true;
    sentenceObject.isCorrect = true;
    sentenceObject.iconShow = true;
    setScore((prev) => prev + 1);
    setCurrQues((prev) => prev + 1);

    //sentenceObject.shows = false;
    return sentenceObject;
  };

  const handleCorrectAtSecond = (sentenceObject) => {
    sentenceObject.isDisable = true;
    sentenceObject.isCorrect = true;
    sentenceObject.iconShow = true;
    //sentenceObject.shows = false;
    setCurrQues((prev) => prev + 1);
    return sentenceObject;
  };

  const handleWrongAtSecond = (sentenceObject) => {
    // sentenceObject.selectedWord;
    WrongSound.play();
    sentenceObject.isDisable = true;
    sentenceObject.trailCount++;
    sentenceObject.iconShow = true;
    sentenceObject.replicate = true;
    setCurrQues((prev) => prev + 1);
    return sentenceObject;
  };

  const handlePause = () => {
    // console.log("======");
    setIsPaused(!isPaused);
  };

  const handleHelp = () => {
    setModal(!modal);
    setIsPaused(!isPaused);
  };

  const handleClick = (e) => {
    e.preventDefault();
    spekerSound.play();
    console.log("calling instruction sound");
  };

  useEffect(() => {
    if (currQues === totalQues) setShowModal(true);
  }, [currQues]);

  const closeModalHandler = () => {
    setShowModal(false);
    navigate("/service");
  };

  const completeForm = () => {
    setShowModal(true);
  };

  return (
    <div class="wrapp spelling_container">
      {showModal && (
        <ScoreModal
          score={score}
          totalQues={totalQues}
          closeModal={closeModalHandler}
        />
      )}

      <div className="wrapperFrame">
        <NavBar title={title} handleHelp={handleHelp} />
        <div>
          <Activityframe>
            <>
              {modal === false && (
                <InstructionButton handleClick={handleClick} />
              )}
              {modal && <ServerModal />}
              {isPaused && modal === false ? (
                <span class="pausedClass"> Paused </span>
              ) : (
                modal === false && (
                  <div class="mainWrapper">
                    {sentences.length !== 0
                      ? sentences.map((item, index, arr) => {
                          return (
                            <div class="mapDiv">
                              <div style={{ fontWeight: "600" }}>
                                {index + 1}
                                {"."}
                              </div>
                              <span
                                style={{
                                  display: "flex",
                                  marginLeft: "20px",
                                }}
                              >
                                <span>
                                  <h5> {item.leftText ? item.leftText : ""}</h5>
                                </span>
                                <div
                                  style={{
                                    marginLeft: "15px",
                                    marginRight: "15px",
                                    display: "flex",
                                  }}
                                >
                                  <FormControl className={classes.formControl}>
                                    <Select
                                      className={classes.select}
                                      labelId="demo-simple-select-label"
                                      id={item.id}
                                      value={item.selectedWord}
                                      onChange={(e) => handleChange(e, item.id)}
                                    >
                                      {dummy &&
                                        item.distractor.map((currentValue) => {
                                          return (
                                            <MenuItem
                                              key={currentValue}
                                              value={currentValue}
                                            >
                                              {" "}
                                              {currentValue}
                                            </MenuItem>
                                          );
                                        })}
                                    </Select>
                                  </FormControl>
                                  {item.iconShow && item.shows ? (
                                    <span
                                      style={{
                                        marginLeft: "3px",
                                        marginTop: "5px",
                                      }}
                                    >
                                      <Correctincorrect
                                        correct={item.isCorrect}
                                        shows={item.iconShow}
                                      />{" "}
                                    </span>
                                  ) : (
                                    " "
                                  )}
                                </div>
                                <span>
                                  <h5>
                                    {item.rightText ? item.rightText : ""}
                                  </h5>
                                </span>
                              </span>
                              <div
                                style={{
                                  // marginLeft: "20px",
                                  marginLeft: "100px",
                                }}
                              >
                                {/* {console.log("00000000", item.id, index)} */}
                                {item.shows &&
                                item.trailCount < 2 &&
                                item.isCorrect === false ? (
                                  <button
                                    type="button"
                                    disabled={item.isDisable}
                                    class={item.isDisable === false ? "c1" : ""}
                                    onClick={() => handleSubmitClick(item.id)}
                                  >
                                    {" "}
                                    Submit
                                  </button>
                                ) : (
                                  ""
                                )}
                                <div id="replicate">
                                  {" "}
                                  {item.replicate && (
                                    <h5>
                                      {" "}
                                      {item.leftText +
                                        " " +
                                        item.correctedWord +
                                        " " +
                                        item.rightText}{" "}
                                    </h5>
                                  )}{" "}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      : " "}
                  </div>
                )
              )}
            </>
          </Activityframe>
        </div>

        <div className="activityFooter">
          <div className="activityFooterFrame">
            {isPaused ? (
              <PlayButton handlePause={handlePause} />
            ) : (
              <PauseButton handlePause={handlePause} />
            )}
            <Footer btnDisable={() => false} handleSubmit={completeForm} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Spelling;
