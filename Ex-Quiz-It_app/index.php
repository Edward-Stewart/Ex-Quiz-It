<?php
require "Controller/controller.php";

if (isset($_GET['action'])){
    $action = $_GET['action'];
    switch($action){
        case 'home' :
            home();
            break;
        case 'connect_page' :
            connect_page();
            break;   
        case 'create_quiz_page' :
            create_quiz_page();
            break;    
        case 'start_page' :
            start_page();
            break;
        case 'quiz' :
            quiz();
            break;    
        case 'admin_page' :
            admin_page();
            break; 
        case 'reset_password' :
            reset_password();
            break;     
        case 'edit_page' :
            edit_page();
            break;
        case 'edit' :
            edit();
            break;      
        default :
            home();
            break;
    }
}else{
    home();
}

