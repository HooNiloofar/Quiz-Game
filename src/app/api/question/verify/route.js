const { readFileSync } = require("fs");

export async function POST(req) {
  const { categoryid, questionid, answerid } = await req.json();
  const data = readFileSync("./data/quiz.json");

  var list = JSON.parse(data);

  var question = list.find(
    (e) => e.categoryid == categoryid && e.questionid == questionid
  );
  var iscorrect = false;
  var correctid = undefined;
  if (question != null) {
    console.log(question);
    var answer = question.answers.find((e) => e.answerid == answerid);
    if (answer != null && answer.iscorrect === true) {
      iscorrect = true;
    } else {
      var canswer = question.answers.find((e) => e.iscorrect == true);
      if (canswer != null) {
        correctid = canswer.answerid;
      }
    }
  }
  await sleep(700);
  return Response.json({ iscorrect, correctid });
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
