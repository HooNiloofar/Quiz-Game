"use client";
import LoadingPage from "@/app/component/loading";
import PlayQuestion from "@/app/component/playquestion";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { list } from "postcss";
import { useEffect, useState } from "react";

export default function Gameing({ params }) {
  const [question, setQuestion] = useState(null);
  const [loadedQuestions, setLoadedQuestions] = useState([]);
  const [step, setStep] = useState(1);
  const [showResult, setShowResult] = useState(false);
  //const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);

  const questionCount = 4;

  useEffect(() => {
    async function fetchData() {
      var ids = loadedQuestions.map((x) => x.questionid);
      const res = await fetch("/api/question", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ categoryid: params.category, ids }),
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      var data = await res.json();
      if (data.question) {
        var item = data.question;
        item.step = step;
        item.total = questionCount;
        setQuestion(item);
        setLoadedQuestions([...loadedQuestions, item]);
        console.log(loadedQuestions);
        //setLoadedQuestions(item.total)
      }
    }
    fetchData();
  }, [step]);

  async function submitAnswer(question, answerid) {
    setQuestion({ ...question, onsubmit: true });
    const res = await fetch("/api/question/verify", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        categoryid: question.categoryid,
        questionid: question.questionid,
        answerid,
      }),
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    var data = await res.json();
    if (data.iscorrect) {
      setQuestion({ ...question, onsubmit: true, iscorrect: answerid });
      loadedQuestions.find(
        (x) => x.questionid == question.questionid
      ).iscorrect = true;
      setLoadedQuestions(loadedQuestions);
    } else {
      setQuestion({
        ...question,
        onsubmit: true,
        incorrect: answerid,
        iscorrect: data.correctid,
      });
    }
    setTimeout(() => {
      handleScore();
      if (step < questionCount) {
        setStep(step + 1);
      } else {
        setShowResult(true);
      }
    }, 3000);
  }

  useEffect(() => {
    if (showResult) {
      var categoryid = parseInt(params.category);
      storeLocalStorage(categoryid);
    }
  }, [showResult]);

  const handleScore = () => {
    var correctquestion = loadedQuestions.filter(
      (x) => x.iscorrect && x.incorrect == undefined
    );

    setScore(correctquestion.length);
    //scoreLocalStorage(score);
  };

  const storeLocalStorage = (currentCategory) => {
    let list = [];
    if (localStorage.getItem("playedCategory") != null) {
      list = JSON.parse(localStorage.getItem("playedCategory"));
    }
    list.push({ id: currentCategory, score, total: questionCount });
    localStorage.setItem("playedCategory", JSON.stringify(list));

    console.log(list);
  };
  // const scoreLocalStorage = (currentScore) => {
  //   let listScore = [];
  //   if (localStorage.getItem("score") != null) {
  //     listScore = JSON.parse(localStorage.getItem("score"));
  //   }
  //   listScore.push(score);
  //   localStorage.setItem("score", JSON.stringify(listScore));

  // }

  return (
    <div>
      {question == null && <LoadingPage />}

      {question != null && showResult == false && (
        <PlayQuestion question={question} submitAnswer={submitAnswer} />
      )}
      {showResult && (
        <div className=" flex justify-center items-center  text-white">
          {" "}
          <span>
            نتایح : {score} از {question.total}
            <div className="pt-5">
              <Link
                href="/category "
                className="bg-lime-400 rounded-xl p-2 outline-none"
              >
                بازگشت به صفحه ی بازی{" "}
              </Link>
            </div>
          </span>
        </div>
      )}

      <div></div>
    </div>
  );
}
