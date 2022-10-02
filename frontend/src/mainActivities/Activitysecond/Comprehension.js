import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../../Components/NavBar/NavBar";
import { Activityframe } from "../../Components/Activityframe/Activityframe";
import Footer from "../../Components/Footer/Footer";
import Passage from "../../Components/Passage/Passage";
import { PauseButton } from "../../Components/Pausebutton/Pausebutton";
import { PlayButton } from "../../Components/Playbutton/PlayButton";
import { ComprehensionUtils } from "./ComprehensionUtils";
import InstructionButton from "../../Components/InstructionButton/InstructionButton";
import ComprehensionActivity from "./ComprehensionActivity";
import "./Comprehension.css";
import ScoreModal from "../../Components/scoremodal/ScoreModal";
import ServerModal from "../../Components/Modal/ServerModal";
import voice from "../../Sound/67234246.mp3";
// const wrapperData = [
//   {
//     id: 1,
//     question: "what are they doing in these ?",
//     corrected: "they are Playing",
//     distractor: [
//       "they are sleeping",
//       "they are eating",
//       "they are looking somewhere",
//     ],
//   },

//   {
//     id: 2,
//     question: "what are they doing in thesebvkytfcgjfcfgcytc",
//     corrected: "they are Playibuluyvguyling",
//     distractor: [
//       "they are sleeluygvuyping",
//       "they are eathgcykgtcing",
//       "they are  hjvytkvuvkuhv somewhere",
//     ],
//   },

//   {
//     id: 3,
//     question: "what are they doing in these",
//     corrected: "they are Playing",
//     distractor: [
//       "they are sleeping",
//       "they are eating",
//       "they are looking somewhere",
//     ],
//   },

//   {
//     id: 4,
//     question: "what are they doing in these",
//     corrected: "they are Playing",
//     distractor: [
//       "they are sleeping",
//       "they are eating",
//       "they are looking somewhere",
//     ],
//   },
// ];
const PassageData =
  "Bears are found in Europe, Asia, Africa and America. They are massively built, with short tails and thick legs. Bears are not really carnivores.They eat almost anything, the chief exception in the polar bear, which in its natural state lives on fish and seals.However, in captivity, they seem to enjoy meat, vegetables, fruits, milk, rice and porridge.Bears are not quite as dangerous as people imagine them it be like most animals they will dotheir best to avoid human beings. They have a special sense that is eyesight to see things.";

function Comprehension() {
  const navigate = useNavigate();
  const title = "Comprehension";
  const isActivity = true;
  const spekerSound = new Audio(voice);
  const [comprehensionData, setComprehensionData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [wrapperData, setwrapperData] = useState([]);
  const [imageArr, setImageArr] = useState([]);
  const [totalQues, setTotalQues] = useState();
  const [totalScore, setTotalScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState(false);
  useEffect(async () => {
    await fetch(`http://localhost:4000/comprehension`)
      .then((res) => res.json())
      .then((data) => {
        setTotalQues(data.length);
        setwrapperData(data);

        data.map((ques) => {
          setImageArr((prev) => [...prev, { id: ques.id, img: ques.img }]);
        });
      })
      .then(() => {});
  }, []);

  useEffect(() => {
    const handleData = () => {
      const comprehension = ComprehensionUtils.initialize(wrapperData);
      setComprehensionData(comprehension.sentence);
    };

    if (isActivity) {
      handleData();
    }
  }, [wrapperData]);

  const handleRadioChanges = (event) => {
    const cloneSentence = [...comprehensionData];
    const newCloneobj = cloneSentence[currentIndex];
    newCloneobj.selectedWord = event.target.value;
    cloneSentence[currentIndex] = newCloneobj;
    setComprehensionData(cloneSentence);
  };

  const handleSubmit = () => {
    let comprehensionObj = [...comprehensionData];
    let comprehensionObjectclone = comprehensionObj[currentIndex];

    if (
      comprehensionObjectclone.selectedWord ===
      comprehensionObjectclone.correctedAns
    ) {
      setTotalScore((prev) => prev + 1);
    }

    handletrials(comprehensionObjectclone);
    comprehensionObj = comprehensionObjectclone[currentIndex];

    // setComprehensionData(comprehensionObj);
  };

  const handletrials = (cloneComprehension) => {
    if (
      cloneComprehension.trailCount === 0 &&
      cloneComprehension.selectedWord === cloneComprehension.correctedAns
    ) {
      handleCorrectatfirst(cloneComprehension);
    } else if (
      cloneComprehension.trailCount === 0 &&
      cloneComprehension.selectedWord !== cloneComprehension.correctedAns
    ) {
      handleIncorrectatfirst(cloneComprehension);
    } else if (
      cloneComprehension.trailCount === 1 &&
      cloneComprehension.selectedWord === cloneComprehension.correctedAns
    ) {
      handleCorrectatsecond(cloneComprehension);
    } else if (
      cloneComprehension.trailCount === 1 &&
      cloneComprehension.selectedWord !== cloneComprehension.correctedAns
    ) {
      handleIncorrectatsecond(cloneComprehension);
    }
  };

  const handleCorrectatfirst = (cloneComprehension) => {
    cloneComprehension.trailCount++;
    cloneComprehension.correctIcon = true;
    setCurrentIndex(currentIndex + 1);
    return cloneComprehension;
  };
  const handleIncorrectatfirst = (cloneComprehension) => {
    cloneComprehension.trailCount++;
    cloneComprehension.correctIcon = false;

    return cloneComprehension;
  };
  const handleCorrectatsecond = (cloneComprehension) => {
    cloneComprehension.trailCount++;
    cloneComprehension.correctIcon = true;
    setCurrentIndex(currentIndex + 1);
    return cloneComprehension;
  };
  const handleIncorrectatsecond = (cloneComprehension) => {
    cloneComprehension.trailCount++;
    cloneComprehension.correctIcon = false;
    setCurrentIndex(currentIndex + 1);
    return cloneComprehension;
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    if (currentIndex === totalQues) setShowModal(true);
  }, [currentIndex]);
  const closeModalHandler = () => {
    setShowModal(false);
    navigate("/service");
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
  return (
    <div class="wrapp">
      {showModal && (
        <ScoreModal
          score={totalScore}
          totalQues={totalQues}
          closeModal={closeModalHandler}
        />
      )}
      <NavBar title={title} handleHelp={handleHelp} />
      <Activityframe>
        <>
          <InstructionButton handleClick={handleClick} />
          {modal && <ServerModal />}
          {isPaused ? (
            <span class="pausedClass"> Paused </span>
          ) : (
            <ComprehensionActivity
              images={imageArr}
              comprehensionData={comprehensionData[currentIndex]}
              handleRadioChanges={handleRadioChanges}
            />
          )}
        </>
      </Activityframe>
      <div className="activityFooter">
        <div className="activityFooterFrame">
          {isPaused ? (
            <PlayButton handlePause={handlePause} />
          ) : (
            <PauseButton handlePause={handlePause} />
          )}
          <Footer
            handleSubmit={handleSubmit}
            btnDisable={() => (currentIndex === totalQues ? true : false)}
          />
        </div>
      </div>
    </div>
  );
}

export default Comprehension;
