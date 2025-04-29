import React, { useEffect, useState } from "react";

const Home = ({ email }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Store answers for all questions
  const [count, setCount] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const shuffleAnswers = (question) => {
    const answers = [
      ...question.incorrect_answers,
      question.correct_answer,
    ];
    return answers.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple";
      const response = await fetch(url);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setQuestions(data.results);
        setShuffledAnswers(shuffleAnswers(data.results[0]));
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      setShuffledAnswers(shuffleAnswers(questions[currentIndex]));
    }
  }, [currentIndex, questions]);

  useEffect(() => {
    const storedAnswers = JSON.parse(localStorage.getItem("selectedAnswers"));
    if (storedAnswers) {
      setSelectedAnswers(storedAnswers);
    }
  }, []);

  const handleAnswerClick = (answer) => {
    const updatedAnswers = { ...selectedAnswers, [currentIndex]: answer };
    setSelectedAnswers(updatedAnswers);

    localStorage.setItem("selectedAnswers", JSON.stringify(updatedAnswers));

    if (answer === questions[currentIndex].correct_answer) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-blue-500">
      <div className="h-[60px] w-full bg-blue-800 flex items-center gap-[800px]">
        <div>
          <p className="font-bold font-serif text-3xl text-white ml-5">Quizzs</p>
        </div>
        <div className="flex">
          <p className="text-xl p-3 text-white">{email}</p>
          <img
            className="h-[50px] w-[50px] object-cover rounded-full cursor-pointer"
            src="https://w7.pngwing.com/pngs/302/770/png-transparent-hotel-computer-icons-linkedin-native-advertising-chatbot-hotel-blue-logo-sphere.png"
            alt=""
          />
        </div>
      </div>
      <div className="h-screen w-screen flex items-center justify-center flex-col gap-10">
        {questions.length > 0 ? (
          <>
            <p className="h-max w-[550px] border-2 border-blue-800 bg-blue-700 font-bold p-3 text-white text-xl">
              {questions[currentIndex].question}
            </p>
            {shuffledAnswers.map((answer, index) => (
              <p
                key={index}
                onClick={() => handleAnswerClick(answer)}
                className={`cursor-pointer h-[50px] w-[500px] border-2 p-2 font-bold text-white ${
                  selectedAnswers[currentIndex]
                    ? answer === questions[currentIndex].correct_answer
                      ? "bg-green-700" // Correct answer
                      : answer === selectedAnswers[currentIndex]
                      ? "bg-red-700" 
                      : "bg-blue-700" 
                    : "bg-blue-700" 
                }`}
              >
                {answer}
              </p>
            ))}
          </>
        ) : (
          <p className="text-white text-xl">Loading questions...</p>
        )}
        <div className="flex gap-10 mb-3">
          <button
            onClick={handlePrevious}
            className="h-[50px] w-[150px] bg-blue-800 text-white font-bold text-xl flex items-center justify-center"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="h-[50px] w-[150px] bg-blue-800 text-white font-bold text-xl flex items-center justify-center"
          >
            Next
          </button>
        </div>
      </div>
      <div className="text-white font-bold flex items-center justify-center h-[100] w-full bg-blue-500">
        <p className="text-white text-xl">Your Score: {count}</p>
      </div>
    </div>
  );
};

export default Home;
