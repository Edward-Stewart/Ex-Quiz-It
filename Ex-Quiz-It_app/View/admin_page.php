<?php
$title = 'admin_page';
$page = 'admin_page';
include_once('View/header.php');
?>

<style>

h2{
    text-align: center;
    font-size: 40px;
}

#theme_input{
text-align: center;
display: block;
justify-content: center;
margin: auto;
}

#theme_submit{
text-align: center;
display: block;
justify-content: center;
margin: auto;
}
</style>

<html>
<head></head>
<h2>Themes</h2>
<input id="theme_input" type="text" placeholder="Enter a theme to add" required>
<button type="submit" id="theme_submit">submit</button>
</form>

<h2>Quizzes</h2>
<div id="admin_editcontent"></div>

</body>
</html>

<?php
include_once('View/footer.php');
?>