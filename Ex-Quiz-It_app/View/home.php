<?php
$title = 'home';
$page = 'home';
include_once('View/header.php');
?>
<style>
#quiz_list{
  width : 80vw;
  border-spacing: 5em;
  margin-left: 10vw;
  margin-right: 10vw;
}

#filter_container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: #f0f0f0;
}

#filter_title {
    flex-grow: 1;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
}

#actions_container {
    display: flex;
    align-items: center;
    gap: 20px;
    position: relative;
}

select {
    display: flex;
    align-items: center;
    gap: 5px; /* Adds space between text and icon */
    cursor: pointer;
    position: relative;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 16px;
}

select:focus {
    outline: none;
    border-color: #007bff;
}

select option {
    padding: 10px;
}

</style>

<html>
<head></head>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Filter Container</title>
    <!-- Load Bootstrap Icons CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.7.2/font/bootstrap-icons.min.css">
</head>
<body>
    <div id="filter_container">
        <div id="filter_title">Current Filter</div>
        <div id="actions_container">
            <select id="filter"></select>
        </div>
    </div>
    <table id="quiz_list"></table>
</body>
</html>

<?php
include_once('View/footer.php');
?>
