import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { getQuestions } from '../constants/apiTrivia';

function Game() {
  const history = useHistory();
  const [questions, setQuestions] = useState([]);
  const [indexQuestions, setIndexQuestions] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    const testaToken = async () => {
      const token = localStorage.getItem('token');
      const response = await getQuestions(token);
      if (response.length === 0) {
        localStorage.removeItem('token');
        history.push('/');
      } else {
        setQuestions(response);
      }
    };
    testaToken();
  }, [history]);

  const shuffleAnswers = () => {
    if (questions.length === 0) return;
    const correct = {
      value: questions[indexQuestions]?.correct_answer,
      correct: true,
    };

    const incorrect = questions[indexQuestions]?.incorrect_answers.map((value) => ({
      value,
      correct: false,
    }));

    const allAnswers = [
      correct,
      ...incorrect,
    ];

    const shuffledAnswers = allAnswers.map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    setAnswers(shuffledAnswers);
  };

  useEffect(() => {
    shuffleAnswers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions, indexQuestions]);

  const handleClick = ({ target }) => {
    const { id } = target;
    const isTrue = id === 'correct-true';
    if (isTrue) console.log('Acertou');
    else console.log('errou');
    setAnswered(true);
    // Valeu Trybe por fazer nos fazer isso.
    setIndexQuestions(0);
  };

  return (
    <div>
      <Header />
      <h1 data-testid="question-category">{questions[indexQuestions]?.category}</h1>
      <h2 data-testid="question-text">{questions[indexQuestions]?.question}</h2>
      <div data-testid="answer-options">
        {answers.map((answer, index) => (
          <button
            type="button"
            id={ `correct-${answer.correct}` }
            key={ index }
            data-testid={ answer.correct ? 'correct-answer' : `wrong-answer-${index}` }
            onClick={ handleClick }
            style={
              answered
                ? { border: answer.correct
                  ? '3px solid rgb(6, 240, 15)' : '3px solid red' }
                : { border: '3px solid black' }
            }
          >
            {answer.value}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Game;