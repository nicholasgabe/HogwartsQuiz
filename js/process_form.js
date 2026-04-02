document.getElementById("info-button").addEventListener("click", validateData);

function validateData() {
  const dataValidation = [
    { id: "first-name", regex: /^[A-Z][a-zA-Z]*$/, errorId: "firstNameResult", errorMsg: "Invalid entry (e.g. John)." },
    { id: "last-name", regex: /^[A-Z][a-zA-Z' ]*$/, errorId: "lastNameResult", errorMsg: "Invalid entry (e.g. Smith or O'Neil)." },
    { id: "phone", regex: /^\d{3} \d{3}-\d{4}$/, errorId: "phoneResult", errorMsg: "Invalid entry (e.g. XXX XXX-XXXX)." },
    { id: "email", regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, errorId: "emailResult", errorMsg: "Invalid entry (e.g. jsmith@yahoo.com)." },
    /*{ id: "url", regex: /^https:\/\/[^\/]+\/.*~.*\/$/, errorId: "urlResult", errorMsg: "Invalid entry (e.g. https://www.website.com/~/)." }*/
  ];

  let validated = true;

  dataValidation.forEach(data => {
    const element = document.getElementById(data.id);
    const value = element.value.trim();

    if (value === "") {
      element.style.backgroundColor = "rgb(251, 177, 177)";
      setTextContent(data.errorId, "Please enter something.");
      validated = false;
    } else if (data.regex.test(value)) {
      element.style.backgroundColor = "rgb(208, 255, 170)";
      setTextContent(data.errorId, "");
    } else {
      element.style.backgroundColor = "rgb(251, 177, 177)";
      setTextContent(data.errorId, data.errorMsg);
      validated = false;
    }
  });

  if (validated) {
    displayBlock("view2");
    displayNone("view1");
  }
}

document.getElementById("survey-button").addEventListener("click", handleTest);

function handleTest() {
  const answerChoices = [];

  for (let i = 1; i <= 5; i++) {
    const questionName = "q" + i;
    const answerChoice = document.querySelector('input[name="' + questionName + '"]:checked');

    if (!answerChoice) {
      setTextContent("quizCheck", "Please answer all questions.");
      return;
    }

    answerChoices.push(answerChoice.id);
  }

  const mostPicked = determineMostPicked(answerChoices);
  const imgElements = ["img1", "img2", "img3", "img4"].map(id => document.getElementById(id));

  imgElements.forEach(img => (img.style.display = "none"));

  switch (mostPicked) {
    case "g":
      displayBlock("img1");
      break;
    case "s":
      displayBlock("img2");
      break;
    case "r":
      displayBlock("img3");
      break;
    case "h":
      displayBlock("img4");
      break;
  }

  displayBlock("view3");
  displayNone("view2");

  displayUserInputs();
}

function determineMostPicked(answerChoices) {
  const choiceCount = {};
  answerChoices.forEach(choice => {
    choiceCount[choice] = (choiceCount[choice] || 0) + 1;
  });

  let mostPicked;
  let maxCount = 0;

  for (const choice in choiceCount) {
    if (choiceCount[choice] > maxCount) {
      mostPicked = choice;
      maxCount = choiceCount[choice];
    }
  }

  return mostPicked;
}

function displayUserInputs() {
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    /*const url = document.getElementById("url").value;*/
  
    document.getElementById("yourName").textContent = `Name: ${firstName} ${lastName}`;
    document.getElementById("yourPhone").textContent = `Phone: ${phone}`;
    document.getElementById("yourEmail").textContent = `Email: ${email}`;
    /*document.getElementById("yourURL").textContent = `URL: ${url}`;*/
  }

function setTextContent(id, text) {
  document.getElementById(id).textContent = text;
}

function displayBlock(id) {
  document.getElementById(id).style.display = "block";
}

function displayNone(id) {
  document.getElementById(id).style.display = "none";
}

