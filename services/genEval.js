



// export default function runPromptsEval(promptsForEval) {
const runPromptsEval = async (promptsForEval, configs) => {

// const runPromptEval = async (promptsForEval, configs) => {
  // const prompts = getPrompts();
  // console.log("prompts:", prompts);


  console.log("running eval for prompts", promptsForEval, configs);



  // for (let i = 0; i < promptsForEval.length; i++) {
  //   let each = promptsForEval[i];
    // let expRes = genExpRes(each.prompt)
    // let expRes = "expRes";

    // let accuracyScore = evals.genAccuracyScore(expRes, each.response)
    // let accuracyScore = "accuracyScore";
    // let sympathyScore = genSympathyScore(sample);
    // console.log(expRes);
    // console.log(accuracyScore);
    // console.log(sympathyScore);
  //   if (expRes === undefined || accuracyScore === undefined || sympathyScore === undefined) {
  //     updateResAndScore(each.id, expRes, accuracyScore, sympathyScore, "gpt-3.5-turbo-16k");
  //     console.log("logged")
  //   }
    // else {
    //   console.log("error")
    //   await updateResAndScore(each.id, expRes, accuracyScore, sympathyScore, "gpt-3.5-turbo-16k");
    // console.log(each)
  // }
};






export default runPromptsEval;
