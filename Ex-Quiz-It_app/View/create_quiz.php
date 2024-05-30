<?php
$title = 'create_quiz';
$page = 'create_quiz';
include_once('View/header.php');
?>

<style>
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f2f2f2;
}

.container {
    background-color: #fff;
    padding: 30px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 100%;
    box-sizing: border-box;
}




h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
    color: #555;
}

input[type="text"],
textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

.answer-group {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.answer-column {
    flex: 1;
    margin-right: 10px;
}

input[type="checkbox"] {
    margin-right: 5px;
}

#themes {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

#quiz_submit {
    background-color: #007bff; /* Blue color */
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    width: calc(50% - 5px); /* Adjusted width */
    box-sizing: border-box;
}

#add_question {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    width: calc(50% - 5px); /* Adjusted width */
    box-sizing: border-box;
}

#button_container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    width: 100%;
}

</style>


<html>
<head></head>

<body>
<div class="container">
    <form id="quizForm" class="quiz-form">
        <h1>Create Quiz</h1>
        <div class="form-group">
            <label for="quizTitle">Title:</label>
            <input type="text" id="quiz_title" name="quizTitle" required>
        </div>
        <div class="form-group">
            <label for="quizDescription">Description:</label>
            <textarea id="quiz_description" name="quizDescription" rows="4" required></textarea>
        </div>
        <div>
            <select id="themes"></select>
        </div>
        <div class="form-group">
            <label for="question">Question:</label>
            <input type="text" id="question1" name="question">
        </div>
        <div class="form-group">
            <label>Answers:</label>
            <div class="answer-group">
                <div class="answer-column">
                    <label for="answer1">Answer 1:</label>
                    <input type="text" id="question1ans1" name="answer1" required>
                    <input type="checkbox" id="question1ans1cb" name="answer1_checkbox">
                </div>
                <div class="answer-column">
                    <label for="answer2">Answer 2:</label>
                    <input type="text" id="question1ans2" name="answer2" required>
                    <input type="checkbox" id="question1ans2cb" name="answer2_checkbox">
                </div>
            </div>
            <div class="answer-group">
                <div class="answer-column">
                    <label for="answer3">Answer 3:</label>
                    <input type="text" id="question1ans3" name="answer3" required>
                    <input type="checkbox" id="question1ans3cb" name="answer3_checkbox">
                </div>
                <div class="answer-column">
                    <label for="answer4">Answer 4:</label>
                    <input type="text" id="question1ans4" name="answer4" required>
                    <input type="checkbox" id="question1ans4cb" name="answer4_checkbox">
                </div>
            </div>
        </div>
    </form>
    <div id="button container">
        <button type="submit" id="quiz_submit">Create Quiz</button>
        <button id="add_question" type="button">MORE+</button>
    </div>
</div>
</body>

</html>

<?php
include_once('View/footer.php');
?>
