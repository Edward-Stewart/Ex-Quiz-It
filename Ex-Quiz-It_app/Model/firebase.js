// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, set, ref, onValue, push, remove} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, signInWithPopup, updateProfile} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';
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

//get title from URL
const urlParams = new URLSearchParams(window.location.search);
const getTitle = urlParams.get('title');
const getAuthor = urlParams.get('author');

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
    //document.getElementById("user-logout").removeAttribute("hidden");
    //document.getElementById("user-login").setAttribute("hidden", "");
    onValue(ref(db, 'users/' + auth.currentUser.displayName), (snapshot) => {
      const data = snapshot.val();
  })
  } else {
    console.log("user logged out");
    currentUser = '';
  }
  });


//Function to upload quiz data to database
if(window.location.toString().includes("create_quiz_page"))
{
  document.getElementById("quiz_submit").addEventListener('click', function(event) {
  event.preventDefault();

  if(title.value && description.value){

    set(ref(db, 'quizzes/' + currentUser.uid + "/" + title.value), {
      description: description.value,
      author: currentUser.displayName,
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

//function for the delete question button 




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

//function that transfers user to quiz start page of quiz
function startQuiz(x, y){
  const url = 'index.php?action=start_page&author=' + encodeURIComponent(x) + '&title=' + encodeURIComponent(y);
  window.location.href = url;
}


// function to display quizzes on homepage
if (window.location.toString().includes("home")) {
  onValue(quizRef, (snapshot) => {
    const data = snapshot.val();

    const quizList = document.getElementById('quiz_list');
    quizList.innerHTML = '';

    for (let userID in data) {
      const userQuizzes = data[userID];

      //Creates HTML elements that make up the home page
      for (let quizName in userQuizzes) {

        const quizElement = document.createElement('tr');
        quizElement.classList.add('quiz');
        quizElement.style.maxwidth = '100%';
        quizElement.style.maxHeightheight = '180px';
        quizElement.style.backgroundColor = '#b2f7c5';
  
        const titleElement = document.createElement('td');

        // Set the title to the quiz name
        titleElement.textContent = quizName;
        titleElement.style.fontSize = '30px';
        titleElement.style.marginRight = '50px';
        titleElement.style.textAlign = 'center';

        // The space between each item, just for aesthetic reasons
        const spacer = document.createElement('tr');
        const spacerCell = document.createElement('td');
        spacerCell.style.height = '10px';
        spacerCell.colspan = 2;
        spacer.appendChild(spacerCell);

        // Create a button that goes to quiz start page
        const startQuizButton = document.createElement('button');
        startQuizButton.textContent = 'Start';
        startQuizButton.style.fontWeight = 'bold';
        startQuizButton.style.fontSize = '30px';
        startQuizButton.style.padding = '5px 10px';
        startQuizButton.style.border = 'none';
        startQuizButton.style.cursor = 'pointer';
        startQuizButton.style.height = "100px";
        startQuizButton.style.width = "250px";
        startQuizButton.style.marginRight = "3%"; 

        startQuizButton.addEventListener('click', () => {
          startQuiz(userID, quizName);
          console.log('More details clicked for quiz: ' + quizName);
        });

        const startQuizCell = document.createElement('td');
        startQuizCell.style.textAlign = 'right';
        startQuizCell.appendChild(startQuizButton);

        const imageElement = document.createElement('img');
        imageElement.src = 'View/Content/Images/Pizza.jpg'; // Leave src empty initially
        imageElement.style.maxWidth = "180px";
        imageElement.style.maxHeight = "180px";

        quizElement.appendChild(imageElement);
        quizElement.appendChild(titleElement);
        quizElement.appendChild(startQuizCell);

        quizList.appendChild(quizElement);
        quizList.appendChild(spacer);
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
          startTitle.style.marginBottom = '20px';

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

          const startButton = document.createElement('button');
          startButton.textContent = 'START QUIZ'
          startButton.style.height = '100px';
          startButton.style.width = '200px'
          startButton.style.display = 'block';
          startButton.style.margin = 'auto'
          startButton.style.marginTop = '10vh'

          startContent.appendChild(startImage);
          startContent.appendChild(startTitle);
          startContent.appendChild(startDescription);
          startContent.appendChild(startButton);

        }
      }
    }
  })
}