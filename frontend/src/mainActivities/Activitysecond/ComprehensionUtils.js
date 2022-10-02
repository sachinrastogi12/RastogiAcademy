const ComprehensionPlaceHolder = {
  id: "",
  Activityquestion: "",
  correctedAns: "",
  image: "",
  distractor: [],
  trailCount: 0,
  selectedWord: "",
  correctIcon: false,
};

export const ComprehensionUtils = {
  initialize: (wrapperData) => {
    const sentence = wrapperData.map((mockData) => {
      const { id, question, answer, distractor, img } = mockData;
      let word = [...distractor];

      let sentence = {
        id: id,
        Activityquestion: question,
        correctedAns: answer,
        distractor: word,
        image: img,
      };
      return { ...ComprehensionPlaceHolder, ...sentence };
    });
    return { sentence };
  },
};
