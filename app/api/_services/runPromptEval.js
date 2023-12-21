




const runPromptsEval = async (promptsForEval, configs) => {


  console.log("running eval for prompts", promptsForEval, configs);



  for (let i = 0; i < promptsForEval.length; i++) {
    let eachPrompt = promptsForEval[i];
    if (eachPrompt.expected_response === null) {
      console.log("exp response null");
    };
    if (eachPrompt.response === null) {
      console.log("response null");
    };

    // let expRes = genExpRes(each.prompt)
    // let expRes = "expRes";
    if (eachPrompt.accuracy_score === null) {
      console.log("accuracyScore null");
    };
    // let accuracyScore = evals.genAccuracyScore(expRes, each.response)
    // let accuracyScore = "accuracyScore";
    // let sympathyScore = genSympathyScore(sample);
    // console.log(expRes);
    // console.log(accuracyScore);
    // console.log(sympathyScore);
    if (eachPrompt.sympathy_score === null) {
      console.log("sympathy score null");
    };


  //   if (expRes === undefined || accuracyScore === undefined || sympathyScore === undefined) {
  //     updateResAndScore(each.id, expRes, accuracyScore, sympathyScore, "gpt-3.5-turbo-16k");
  //     console.log("logged")
  //   }
    // else {
    //   console.log("error")
    //   await updateResAndScore(each.id, expRes, accuracyScore, sympathyScore, "gpt-3.5-turbo-16k");
    // console.log(each)
  }
};






export default runPromptsEval;
