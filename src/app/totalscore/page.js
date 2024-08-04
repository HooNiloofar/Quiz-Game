"use client";
import { useEffect, useState } from "react";

export default function TotalScore() {
  const [totalScore, setTotalScore] = useState([]);
  const [totalQuestion, setTotalQuestion] = useState([]);

 useEffect(
  ()=>{
    let tScore = [];
    let tquestion= []
    if (localStorage.getItem("playedCategory") != null) {
      tScore = JSON.parse(localStorage.getItem("playedCategory"));
     tquestion =JSON.parse(localStorage.getItem("playedCategory")); 
   
    }
    let sumScore=tScore.reduce((partialSum, a) => partialSum + a.score, 0)
    let sumQuestion=tScore.reduce((partialSum, a) => partialSum + a.total, 0)
    setTotalScore(sumScore);
    setTotalQuestion(sumQuestion)
    
  }
 ,[])
  

  //console.log(tScore)
  return (
    <div className="flex items-center justify-center bg-indigo-400 h-screen">
      <div>نتایج کلی : {totalScore} از {totalQuestion} </div>
    </div>
  );
}
