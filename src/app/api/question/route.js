const { readFileSync } = require("fs");

export async function POST(req) {
  const { categoryid, ids } = await req.json();
  const data = readFileSync("./data/quiz.json");

  var list = JSON.parse(data);
  var question = null;

  list = list.filter(
    (e) => e.categoryid == categoryid && !ids.includes(e.questionid)
  );

  var randomindex = -1;
  if (list != null && list.length > 0) {
    randomindex = parseInt(Math.random() * list.length);
    question = list[randomindex];
    question.answers = question.answers.map((e) => {
      return {
        ...e,
        iscorrect: undefined,
      };
    });
  }

  return Response.json({ question, randomindex });
}
