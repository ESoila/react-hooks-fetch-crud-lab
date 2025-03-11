import React from "react";
import  { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

useEffect(() => {
  async function getQuestions() {
    try {
      const apiResp = await fetch("http://localhost:4000/questions");
      const fetchedQuestions = await apiResp.json();
      setQuestions(fetchedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }
  getQuestions();
}, []);

async function deleteQuestion(id) {
  try{
    const apiResp = await fetch(`http://localhost:4000/questions/${id}`, {method : "DELETE",});

    if (!apiResp.ok){
      throw new Error("Failed to delete question");
    }

    //remove the question
    setQuestions((prevQuestions) => prevQuestions.filter((question) => question.id !== id));
  } catch (error) {
    console.error("Error deleting question:", error);
  }

}

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionItem key={question.id} question={question} deleteQuestion={deleteQuestion} />
          ))
        ) : (<li>No questions</li>)}
      </ul>
    </section>
  );
}

export default QuestionList;
