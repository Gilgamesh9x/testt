document.addEventListener("DOMContentLoaded", function () {
  const allQuestions = [
    {
      question: "Question 1",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correct: 1,
    },
    {
      question: "Question 2",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correct: 1,
    },
    {
      question: "Question 3",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correct: 1,
    },
    {
      question: "Question 4",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correct: 1,
    },
    {
      question: "Question 5",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correct: 1,
    },
    {
      question: "Question 6",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correct: 1,
    },
    {
      question: "Question 7",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correct: 1,
    },
    {
      question: "Question 8",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correct: 1,
    },
    {
      question: "Question 9",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correct: 1,
    },
    {
      question: "Question 10",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correct: 1,
    },
  ];

  // Group questions into pages
  const questionsPerPage = 5;
  const groupedQuestions = [];
  for (let i = 0; i < allQuestions.length; i += questionsPerPage) {
    groupedQuestions.push(allQuestions.slice(i, i + questionsPerPage));
  }

  let currentPageIndex = 0;
  let answers = Array(allQuestions.length).fill(null);

  function displayQuestions() {
    const questions = groupedQuestions[currentPageIndex];
    let html = "";
    questions.forEach((question, questionIndex) => {
      let questionHtml = `<h4>${question.question}</h4><ul class="list-group mb-5">`;
      question.options.forEach((option, optionIndex) => {
        const globalIndex = currentPageIndex * questionsPerPage + questionIndex;
        const checked = answers[globalIndex] === optionIndex ? "checked" : "";
        questionHtml += `<li class="list-group-item" style="max-width: 300px"><input type="radio" name="question${globalIndex}" value="${optionIndex}" ${checked}> ${option} </li>`;
      });
      questionHtml += `</ul>`;
      html += questionHtml;
    });
    document.getElementById("questionSection").innerHTML = html;
    updateButtons();
  }

  function updateButtons() {
    document.getElementById("prevButton").disabled = currentPageIndex === 0;
    document.getElementById("nextButton").disabled =
      currentPageIndex === groupedQuestions.length - 1;
    document.getElementById("submitButton").disabled =
      !areAllQuestionsAnswered();
  }

  function calculateScore() {
    return answers.reduce((score, answer, index) => {
      return score + (answer === allQuestions[index].correct ? 1 : 0);
    }, 0);
  }

  function getCEFRLevel(score) {
    if (score <= 2) return "CEFR Level A1 (Beginner)";
    if (score <= 5) return "CEFR Level A2 (Elementary)";
    if (score <= 9) return "CEFR Level B1 (Intermediate)";
    return "CEFR Level B2 (Upper-Intermediate)";
  }

  function displayResult(score) {
    const level = getCEFRLevel(score);
    const resultHtml = `
        <div class="result-message text-center mt-5">
            <h3 class="mb-4">Your Level: <span class="text-primary">${level}</span></h3>
            <button id="retakeButton" class="btn btn-outline-primary btn-lg">Retake Test</button>
        </div>
    `;
    document.getElementById("testForm").innerHTML = resultHtml;
    document
      .getElementById("retakeButton")
      .addEventListener("click", function () {
        location.reload(); // Reloads the page to restart the test
      });
  }

  function areAllQuestionsAnswered() {
    return answers.every((answer) => answer !== null);
  }

  document
    .getElementById("questionSection")
    .addEventListener("click", function (event) {
      if (event.target.type === "radio") {
        const questionIndex = parseInt(
          event.target.name.replace("question", ""),
          10
        );
        answers[questionIndex] = parseInt(event.target.value, 10);
        updateButtons();
      }
    });

  document.getElementById("nextButton").addEventListener("click", function () {
    if (currentPageIndex < groupedQuestions.length - 1) {
      currentPageIndex++;
      displayQuestions();
    }
  });

  document.getElementById("prevButton").addEventListener("click", function () {
    if (currentPageIndex > 0) {
      currentPageIndex--;
      displayQuestions();
    }
  });

  document
    .getElementById("testForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const score = calculateScore();
      displayResult(score);
    });

  displayQuestions();
});
