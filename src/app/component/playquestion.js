"use client";
import { useEffect, useState } from "react";
import { CircularProgress, Progress, Spinner } from "@nextui-org/react";

export default function PlayQuestion({ question, submitAnswer }) {
  const [activeQestion, setActiveQestion] = useState(0);
  const answerTime = 20;
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (time == null) setTime(0);
  }, [question.questionid]);
  var timer;
  useEffect(() => {
    if (time != null) {
      timer = setTimeout(() => {
        if (time == null) {
          clearTimeout(timer);
          return;
        }
        console.log(time);
        setTime(time + 1);
        if (time + 1 >= answerTime && !question.onsubmit) {
          clearTimeout(timer);
          setTime(null);
          submitAnswer(question, -1);
        }
      }, 1000);
    } else {
      clearTimeout(timer);
    }
  }, [time]);

  async function sendAnswer(question, answerid) {
    setTime(null);
    clearTimeout(timer);
    submitAnswer(question, answerid);
  }

  return (
    <div>
      <div className="flex flex-col items-start mb-7">
        <h4 className="text-xl text-white/90">{question.text}</h4>
      </div>
      <div className="flex flex-col w-full gap-2">
        {question.answers.map((answer, index) => (
          <button
            disabled={question.onsubmit}
            key={index}
            onClick={() => {
              sendAnswer(question, answer.answerid);
            }}
            className={
              "flex items-center w-full py-4 ps-5 border-2  text-white rounded-xl " +
              (question.iscorrect == undefined &&
              question.incorrect == undefined
                ? " disabled:bg-gray-500/40 disabled:border-gray-600/40 disabled:text-gray-600/60 disabled:cursor-default"
                : question.onsubmit == undefined
                ? " cursor-pointer hover:bg-black/10"
                : "") +
              (question.iscorrect == answer.answerid
                ? " bg-lime-500 text-white cursor-default"
                : question.incorrect == answer.answerid
                ? " bg-red-500 text-white cursor-default"
                : "")
            }
          >
            <p className="ml-6 ">{answer.title}</p>
          </button>
        ))}
      </div>
      <div className="flex items-center mt-4" dir="ltr">
        <div className="flex items-center">
          {question.onsubmit &&
            time == null &&
            (question.iscorrect != undefined ||
              question.incorrect != undefined) && (
              <Spinner color="warning" size="sm" />
            )}
          {question.iscorrect == undefined &&
            question.incorrect == undefined && (
              <CircularProgress
                classNames={{
                  svg: "w-5 h-5 drop-shadow-md",
                  indicator: "stroke-white",
                  track: "stroke-white/10",
                  value: "text-3xl font-semibold text-white",
                }}
                maxValue={question.total}
                value={question.step}
                color="success"
                aria-label="Step"
              />
            )}
          <div className="text-l text-white/50 text-left ml-2 pt-1">
            {question.step} / {question.total}
          </div>
        </div>
        <div className="flex items-center flex-1 ml-8" dir="rtl">
          {question.onsubmit &&
            question.iscorrect == undefined &&
            question.incorrect == undefined && (
              <>
                <CircularProgress
                  classNames={{
                    svg: "w-5 h-5 drop-shadow-md",
                    indicator: "stroke-black",
                    track: "stroke-black/20",
                    value: "text-3xl font-semibold text-white",
                  }}
                  aria-label="Loading..."
                />
                <span className="text-sm mr-2">لطفا منتظر بمانید ...</span>
              </>
            )}

          {!question.onsubmit && time != null && (
            <Progress
              aria-label="Downloading..."
              size="md"
              value={time}
              maxValue={answerTime}
              color="success"
              className="max-w-md"
            />
          )}
        </div>
      </div>
    </div>
  );
}
