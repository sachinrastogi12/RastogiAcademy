import React from "react";
import "./Comprehension.css";
import comprehension_1 from "../../images/comprehension_1.jpg";
import comprehension_2 from "../../images/comprehension_2.webp";
import comprehension_3 from "../../images/comprehension_3.gif";
import comprehension_4 from "../../images/comprehension_4.gif";

function ComprehensionActivity(props) {
  const { comprehensionData = {}, handleRadioChanges, images } = props;

  const {
    Activityquestion,
    correctedAns,
    distractor = {},
    id,
    image,
  } = comprehensionData;
  return (
    <>
      <div className="compQuestion">
        <span>{Activityquestion}</span>
      </div>
      <div className="imgcheckbox">
        {images.map((item) => {
          return (
            <>
              {item.id === id && (
                <div className="imageDiv">
                  <div className="imagePos">
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src={item.img}
                    />
                  </div>
                </div>
              )}
            </>
          );
        })}

        <div className="checkBoxdiv">
          <div className="checkBoxcontent">
            <div class="checktext">
              {Object.keys(distractor).map((item) => {
                return (
                  <div class="checkdivs">
                    <input
                      id={item}
                      value={distractor[item]}
                      type="radio"
                      name="quiz"
                      onChange={handleRadioChanges}
                    />
                    <span class="check_content"> {distractor[item]} </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ComprehensionActivity;
