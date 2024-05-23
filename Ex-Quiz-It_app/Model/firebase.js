// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, set, ref, onValue, push, remove} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJThtFwPi9FEbuQr60gwm-dQIhDSiY3aE",
  authDomain: "ex-quiz-it.firebaseapp.com",
  databaseURL: "https://ex-quiz-it-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ex-quiz-it",
  storageBucket: "ex-quiz-it.appspot.com",
  messagingSenderId: "1025720165236",
  appId: "1:1025720165236:web:e318326733606807fa4221"
};

// Initialize Firebase and Firebase tools
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);

//Values from register form
let fname = document.getElementById('register_fname');
let sname = document.getElementById('register_sname');
let email = document.getElementById('register_email');
let password = document.getElementById('register_password');

//Values from login form
let login_email = document.getElementById('login_email');
let login_password =  document.getElementById('login_password');
let currentUser;

//Values from create_a_quiz  
let quizForm = document.getElementById('quizForm')
let title = document.getElementById('quiz_title');
let description = document.getElementById('quiz_description');

//BDD references
const quizRef = ref(db, 'quizzes');
const themeRef = ref(db, 'themes');

//get title from URL
const urlParams = new URLSearchParams(window.location.search);
const getTitle = urlParams.get('title');
const getAuthor = urlParams.get('author');

//Values for quiz
let questionNum

//Functions for Connection page
if(window.location.toString().includes("connect")) {


  //login user
  document.getElementById("login_submit").addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission

    signInWithEmailAndPassword(auth, login_email.value, login_password.value)
    .then((result) => {
      //console.log("User login successful:", result);
      const user = result.user;
      alert("Welcome "+user.email);
      console.log(user);
      window.location.href = 'index.php?action=home';
    })
    .catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.code, errorMessage);
    })
  })


//Register Function
document.getElementById("register_submit").addEventListener('click', function(event) {
  event.preventDefault();
  createUserWithEmailAndPassword(auth, email.value, password.value)
  .then(function(result){
    auth.onAuthStateChanged(function(user){
      if (user) {
        // Update user's profile with display name
        updateProfile(user, {
            displayName: fname.value + " " + sname.value
        })
        .then(function() {
          // Get the updated user profile
          const updatedUser = auth.currentUser;
          alert("Welcome " + updatedUser.displayName);
          console.log(updatedUser);
          window.location = 'index.php?action=home';
        })
        .catch(function(error) {
          console.error("User profile update failed:", error);
          alert(error.message);
          window.location = 'index.php?action=home';
        });
      }
    })
    })
  })
}

//Function to verify whether user is logged in
auth.onAuthStateChanged(function(user) {
  if (user) {
    console.log("user logged in", user);
    currentUser = user;
    //document.getElementById("currentuser").innerHTML = user.displayName;
    document.getElementById("Logout").removeAttribute("hidden");
    document.getElementById("ConnectionLink").setAttribute("hidden", "");
    document.getElementById("CreateQuizLink").removeAttribute("hidden");
    document.getElementById("edit_page").removeAttribute("hidden");
    document.getElementById("footer_currentUser").innerHTML = user.displayName;
    onValue(ref(db, 'users/' + auth.currentUser.displayName), (snapshot) => {
      const data = snapshot.val();
  })
  } else {
    console.log("user logged out");
    currentUser = '';
  }
  });

  document.getElementById("Logout").addEventListener("click", function() {
    auth.signOut().then(() => {
        // Sign-out successful.
        //userType = null;
        console.log("SignOUT successful");
    })
    .catch((error) => {
        // An error happened.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + ":" + errorMessage);
    });
});


//Function for reset password
if(window.location.toString().includes("reset_password")){

  document.getElementById("resetPasswordButton").addEventListener('click', function(){
    const email = document.getElementById("resetEmail").value.trim();
    
    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert('Password reset email sent!');
        })
        .catch((error) => {
        console.error('Error sending password reset email:', error);
        alert('Error sending password reset email: ' + error.message);
        });
      } else {
        alert('Please enter a valid email address.');
      }
  })
}


//function to display quizzes on edit page
if(window.location.toString().includes("edit_page"))
{
  console.log("testingtesting123")
  
  const editContainer = document.getElementById("edit_content")
  editContainer.style.display = 'block';
  editContainer.style.marginLeft = '30vw';

  onValue(quizRef, (snapshot) => {
    const data = snapshot.val();

    for (let userID in data) {
      if (userID === currentUser.uid) {
        let userQuizzes = data[userID];
        for (let quizName in userQuizzes) {
          let quizDiv = document.createElement('div');
          quizDiv.classList.add('quiz-item');
          quizDiv.style.display = 'flex';
          quizDiv.style.justifyContent = 'space-between';
          quizDiv.style.alignItems = 'center';
          quizDiv.style.width = '60%';
          quizDiv.style.padding = '10px';
          quizDiv.style.margin = '10px 0';
          quizDiv.style.border = '1px solid #ccc';
          quizDiv.style.borderRadius = '5px';
          quizDiv.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
          quizDiv.style.backgroundColor = '#f9f9f9';

          let titleElement = document.createElement('h3');
          titleElement.textContent = quizName;
          titleElement.style.margin = '0';
          titleElement.style.fontSize = '1.2em';
          quizDiv.appendChild(titleElement);

          let editButton = document.createElement('button');
          editButton.textContent = 'Edit';
          editButton.style.padding = '5px 10px';
          editButton.style.fontSize = '1em';
          editButton.style.border = 'none';
          editButton.style.borderRadius = '5px';
          editButton.style.backgroundColor = '#007bff';
          editButton.style.color = 'white';
          editButton.style.cursor = 'pointer';
          editButton.addEventListener('click', () => {
            editPage(userID, quizName)
          });

   

          quizDiv.appendChild(editButton);
          editContainer.appendChild(quizDiv);
        }
        
      }
    }
  })
}

function editPage(x, y){
  const url = 'index.php?action=edit&author=' + encodeURIComponent(x) + '&title=' + encodeURIComponent(y);
  window.location.href = url;
  console.log(currentUser.uid)
}


//Function to upload quiz data to database
if(window.location.toString().includes("create_quiz_page"))
{
  const themelist = document.getElementById("themes")

  onValue(themeRef, (snapshot) => {
    const data = snapshot.val();

    for(let themeID in data){
      const option = document.createElement('option');
      option.value = themeID;
      option.textContent = themeID;
      themelist.appendChild(option)

    }
  })

  document.getElementById("quiz_submit").addEventListener('click', function() {

  if(title.value && description.value){

    set(ref(db, 'quizzes/' + currentUser.uid + "/" + title.value), {
      description: description.value,
      author: currentUser.displayName,
      theme: themelist.value,
      status: "offline"
    })

    for(var i = 1; i <= document.querySelectorAll('#quizForm input[name="question"]').length; i++)
    {
      console.log("question"+i)
      set(ref(db, 'quizzes/' + currentUser.uid + "/" + title.value + "/" + "question" + i), {text: document.getElementById("question"+i).value})
      for(var j = 1; j <= 4; j++){
        console.log("question"+i+"ans"+j)
        console.log("question"+i+"ans"+j+"cb")
        set(ref(db, 'quizzes/' + currentUser.uid + "/" + title.value + "/" + "question" + i + "/" + "answer" + j), {text: document.getElementById("question"+i+"ans"+j).value, correct: document.getElementById("question"+i+"ans"+j+"cb").checked})
      }
    }
  }
  })
}


//function to add more questions
if (window.location.toString().includes("create_quiz_page")) {
  document.getElementById("add_question").addEventListener('click', function() {
    var noQuestions = document.querySelectorAll('#quizForm input[name="question"]').length + 1;

      // Create a new div element to contain the question and answer inputs
      var questionContainer = document.createElement("div");
      questionContainer.classList.add("form-group");
      questionContainer.id = 'QuestionContainer' + noQuestions;

      // Create label and input for the question
      var questionLabel = document.createElement("label");
      questionLabel.textContent = "Question:";
      var questionInput = document.createElement("input");
      questionInput.type = "text";
      questionInput.name = "question";
      questionInput.id = "question" + noQuestions;

      // Append question label and input to the question container
      questionContainer.appendChild(questionLabel);
      questionContainer.appendChild(questionInput);

      // Create labels and inputs for the answers
      for (var i = 1; i <= 4; i++) {
        var answerLabel = document.createElement("label");
        answerLabel.textContent = "Answer " + i + ":";
        var answerInput = document.createElement("input");
        answerInput.type = "text";
        answerInput.name = "answer" + i;
        answerInput.id = "question" + noQuestions + "ans" + i;
        var checkboxInput = document.createElement("input");
        checkboxInput.type = "checkbox";
        checkboxInput.id = "question" + noQuestions + "ans" + i + "cb";
        checkboxInput.required = "true";

        // Append answer label and input to the question container
        questionContainer.appendChild(answerLabel);
        questionContainer.appendChild(answerInput);
        questionContainer.appendChild(checkboxInput);
      }

      var deleteQuestion = document.createElement("button");
      deleteQuestion.textContent = 'DELETE';
      deleteQuestion.style.height = '40px';
      deleteQuestion.style.width = '80px';
      deleteQuestion.style.display = 'block';
      deleteQuestion.style.margin = 'auto';
      deleteQuestion.type = 'button';
      deleteQuestion.id = 'deleteQuestion' + noQuestions;
      deleteQuestion.addEventListener('click', () => {
      questionContainer.remove();
        console.log('question removed');
      });

      questionContainer.appendChild(deleteQuestion);


      // Append the question container to the quiz form
      var quizForm = document.getElementById("quizForm");
      quizForm.appendChild(questionContainer);
      console.log("Number of questions in the form:", noQuestions);
  });
}


//function that transfers user to quiz
function startQuiz(x, y){
  const url = 'index.php?action=quiz&author=' + encodeURIComponent(x) + '&title=' + encodeURIComponent(y);
  window.location.href = url;
}

//functions for the quiz page
if (window.location.toString().includes("quiz")) {
  questionNum = 1;
          
  onValue(quizRef, (snapshot) => {
    const data = snapshot.val();

    //looks at URL in order to determin which quiz the page is related to and then creates HTML elements containing responding information
    for (let userID in data) {
      const userQuizzes = data[userID];
      for (let quizName in userQuizzes) {
        
        if (quizName == getTitle && userID == getAuthor) {
        {
          const titleContainer = document.getElementById("quiz_title")

          const quizTitle = document.createElement('h2');
          quizTitle.textContent = quizName;
          quizTitle.style.fontWeight = 'bold';
          quizTitle.style.fontSize = '40px';
          quizTitle.style.textAlign = 'center';
          quizTitle.style.marginBottom = '50px';
          titleContainer.appendChild(quizTitle);    
        }

          var score = 0;
          var currentQuestionNum = 1;

        
          function displayQuestion(quiz, questionNum) {
            const question = quiz["question" + questionNum];
            const questionElement = document.getElementById('quiz_question');
            const answerContainer = document.getElementById('answer_container');
        
            questionElement.textContent = question.text;
            answerContainer.innerHTML = '';
        
            let answerCount = 0;
            for (let key in question) {
              if (key.startsWith('answer')) {
                answerCount++;
              }
            }
        
            for (var i = 1; i <= answerCount; i++) {
              var answerButton = document.createElement("button");
              answerButton.type = "button";
              answerButton.textContent = question["answer" + i].text;
              answerButton.style.height = '100px';
              answerButton.style.width = '200px';
              answerButton.style.marginLeft = '20px';
              answerButton.style.backgroundColor = '#2fcc59';
              answerButton.style.fontSize = '25px';
              answerButton.style.color = 'white';
        
              let answer = question["answer" + i].correct;
        
              answerButton.addEventListener('click', (function(answer, nextQuestionNum) {
                return function() {
                  if (answer) {
                    score++;
                    console.log("Correct answer. Current score: " + score);
                  } else {
                    console.log("Incorrect answer. Current score: " + score);
                  }
                  if (nextQuestionNum <= Object.keys(quiz).filter(key => key.startsWith('question')).length) {
                    displayQuestion(quiz, nextQuestionNum);
                  } else {
                    set(ref(db, 'quizzes/' + userID + '/' + quizName + '/players' + '/' + currentUser.uid), {score: score, user: currentUser.displayName})
                    displayScore();
                  }
                };
              })(answer, questionNum + 1));
        
              answerContainer.appendChild(answerButton);
            }
          }
        
          function displayScore() {
            const quizContainer = document.getElementById('quiz_container');
            quizContainer.innerHTML = '<h2 style="display: block; margin: auto; text-align: center; font-size: 40px;">Quiz Completed</h2><p style="text-align: center; font-size: 30px;">Your score is: ' + score + '</p>';
          }
      
        for (let userID in data) {
          const userQuizzes = data[userID];
                      
          for (let quizName in userQuizzes) {
            if (quizName == getTitle && userID == getAuthor) {
              const quiz = userQuizzes[quizName];
        
              const quizContainer = document.getElementById("quiz_container");
              quizContainer.classList.add('quiz-container');

              const questionElement = document.createElement('p');
              questionElement.id = 'quiz_question';
              questionElement.style.fontSize = '30px';
              questionElement.style.textAlign = 'center';
              questionElement.style.marginBottom = '20px';
              quizContainer.appendChild(questionElement);
        
              const answerContainer = document.createElement('div');
              answerContainer.id = 'answer_container';
              answerContainer.style.display = 'flex';
              answerContainer.style.justifyContent = 'center';
              quizContainer.appendChild(answerContainer);
        
                displayQuestion(quiz, currentQuestionNum);
            }
          }
        }
      }
    }
    }
  })
}

//function that prepares the quiz start page
if (window.location.toString().includes("start_page")) {
  console.log("test");
  onValue(quizRef, (snapshot) => {
    const data = snapshot.val();

    //looks at URL in order to determin which quiz the page is related to and then creates HTML elements containing responding information
    for (let userID in data) {
      const userQuizzes = data[userID];
      for (let quizName in userQuizzes) {
      //finds correct page 
      if(quizName == getTitle && userID == getAuthor){
          console.log("true");
  
          const startContent = document.getElementById('start_content');

          const startTitle = document.createElement('h2')
          startTitle.textContent = quizName;
          startTitle.style.fontWeight = 'bold';
          startTitle.style.fontSize = '40px';
          startTitle.style.textAlign = 'center';
          startTitle.style.marginBottom = '50px';

          const startDescription = document.createElement('p')
          startDescription.textContent = userQuizzes[quizName].description;
          startDescription.style.fontSize = '20px';
          startDescription.style.textAlign = 'center';
          startDescription.style.maxWidth = '600px';
          startDescription.style.maxHeight = '200px';
          startDescription.style.display = 'block';
          startDescription.style.margin = 'auto';


          const startImage = document.createElement('img')
          startImage.src = 'View/Content/Images/Pizza.jpg';
          startImage.style.maxHeight = '300px';
          startImage.style.maxWidth = '300px';
          startImage.style.minHeight = '200px';
          startImage.style.minWidth = '200px';
          startImage.style.display = 'block';
          startImage.style.margin = 'auto'

          const startQuizButton = document.createElement('button');
          startQuizButton.textContent = 'START QUIZ'
          startQuizButton.style.height = '100px';
          startQuizButton.style.width = '200px'
          startQuizButton.style.display = 'block';
          startQuizButton.style.margin = 'auto';
          startQuizButton.style.marginTop = '10vh';

          startQuizButton.addEventListener('click', () => {
            startQuiz(userID, quizName);
          });

          startContent.appendChild(startImage);
          startContent.appendChild(startTitle);
          startContent.appendChild(startDescription);
          startContent.appendChild(startQuizButton);

        }
      }
    }
  })
}

//function that transfers user to quiz start page
function startPage(x, y){
  const url = 'index.php?action=start_page&author=' + encodeURIComponent(x) + '&title=' + encodeURIComponent(y);
  window.location.href = url;
}


//functions for the filters
if (window.location.toString().includes("home")) {
  onValue(themeRef, (snapshot) => {
      const data = snapshot.val();
      const filterList = document.getElementById("filter");
      filterList.value = "all";

      const optionAll = document.createElement('option');
      optionAll.value = "all";
      optionAll.textContent = "all";
      filterList.appendChild(optionAll);
 
      for (let themeID in data) {
          const option = document.createElement('option');
          option.value = themeID;
          option.textContent = themeID;
          filterList.appendChild(option);
      }

      filterQuizzesByTheme(filterList.value)

      filterList.addEventListener('change', function() {
          const selectedTheme = this.value;
            filterQuizzesByTheme(selectedTheme);
      });
  });

function filterQuizzesByTheme(selectedTheme) {
  onValue(quizRef, (snapshot) => {
    const data = snapshot.val();
    const quizList = document.getElementById("quiz_list");
    quizList.innerHTML = ''; // Clear previous quizzes

    document.getElementById("filter_title").innerHTML = ("Current filter : " + selectedTheme)

    if(selectedTheme == "all" || selectedTheme == ""){
      for (let userID in data){
        const userQuizzes = data[userID];
        for(let quizName in userQuizzes){
          generateQuiz(userID, quizName);
        }
      } 
    }else{
      for (let userID in data) {
        const userQuizzes = data[userID];
        for (let quizName in userQuizzes) {
          const quiz = userQuizzes[quizName];
          if (quiz.theme === selectedTheme) {
            generateQuiz(userID, quizName);
          }
        }
      }
    } 
});


function generateQuiz(userID, quizName) {
    const quizList = document.getElementById("quiz_list");

    const quizElement = document.createElement('tr');
    quizElement.classList.add('quiz');
    quizElement.style.maxWidth = '100%';
    quizElement.style.maxHeight = '180px';
    quizElement.style.backgroundColor = '#b2f7c5';

    const titleElement = document.createElement('td');
    titleElement.textContent = quizName;
    titleElement.style.fontSize = '30px';
    titleElement.style.marginRight = '50px';
    titleElement.style.textAlign = 'center';

    const spacer = document.createElement('tr');
    const spacerCell = document.createElement('td');
    spacerCell.style.height = '10px';
    spacerCell.colSpan = 2;
    spacer.appendChild(spacerCell);

    const startPageButton = document.createElement('button');
    startPageButton.textContent = 'Start';
    startPageButton.style.fontWeight = 'bold';
    startPageButton.style.fontSize = '30px';
    startPageButton.style.padding = '5px 10px';
    startPageButton.style.border = 'none';
    startPageButton.style.cursor = 'pointer';
    startPageButton.style.height = "100px";
    startPageButton.style.width = "250px";
    startPageButton.style.marginRight = "3%"; 

    startPageButton.addEventListener('click', () => {
        startPage(userID, quizName);
        console.log('More details clicked for quiz: ' + quizName);
    });

    const startQuizCell = document.createElement('td');
    startQuizCell.style.textAlign = 'right';
    startQuizCell.appendChild(startPageButton);

    const imageElement = document.createElement('img');
    imageElement.src = 'View/Content/Images/Pizza.jpg'; // Update this to use the correct image if needed
    imageElement.style.maxWidth = "180px";
    imageElement.style.maxHeight = "180px";

    quizElement.appendChild(imageElement);
    quizElement.appendChild(titleElement);
    quizElement.appendChild(startQuizCell);

    quizList.appendChild(quizElement);
    quizList.appendChild(spacer);
  }
}
    
if (window.location.toString().includes("admin_page")) {
  onValue(themeRef, (snapshot) => {
    const data = snapshot.val();
    document.getElementById("theme_submit").addEventListener('click', function() {
      const theme = document.getElementById('theme_input').value.trim();
      console.log('themes/' + theme + '/' + theme);
      if (theme) {
        if (data && data[theme]) {
          alert("Theme already exists");
        } else {
          set(ref(db, 'themes/' + theme), { text: theme })
        }
      } else {
        alert("You must type a theme");
      }
    });
  });
}
}