<?php
$title = 'connect';
$page = 'connect';
include_once('View/header.php');
?>

<html>
<head>

</head>
<body>

<!-- Register Form -->
<form style="width: 40%;  margin: 0px auto;">

<h2 style="text-align: center; margin-bottom: 20px;">Register</h2>

  <!-- First name input -->
  <div data-mdb-input-init class="form-outline mb-4">
    <input type="text" id="register_fname" class="form-control" placeholder="First Name"/></div>
  </div>

  <!-- Surname input -->
  <div data-mdb-input-init class="form-outline mb-4">
    <input type="text" id="register_sname" class="form-control" placeholder="Surname"/></div>
  </div>

  <!-- Email input -->
  <div data-mdb-input-init class="form-outline mb-4">
    <input type="email" id="register_email" class="form-control" placeholder="Email"/></div>
  </div>

  <!-- Password input -->
  <div data-mdb-input-init class="form-outline mb-4">
    <input type="password" id="register_password" class="form-control" placeholder="Password" />
  </div>

  <!-- 2 column grid layout for inline styling -->
  <div class="row mb-4">
    <div class="col d-flex justify-content-center">
      <!-- Checkbox -->
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
        <label class="form-check-label" for="form2Example31"> Remember me </label>
      </div>
    </div>

    <div class="col">
      <!-- Simple link -->
      <a href="index.php?action=reset_password">Forgot password?</a>
    </div>
  </div>

  <!-- Submit button -->
  <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4" style="width: 100%" id="register_submit">Sign up</button>
</form><br>



<!--login form -->
<form style="width: 40%;  margin: 0px auto; background-color : #e3e3e3; padding: 10px;">

<h2 style="text-align: center; margin-bottom: 20px;">Login</h2>

  <!-- Email input -->
  <div data-mdb-input-init class="form-outline mb-4">
    <input type="email" id="login_email" class="form-control" placeholder="Email"/></div>
  </div>

  <!-- Password input -->
  <div data-mdb-input-init class="form-outline mb-4">
    <input type="password" id="login_password" class="form-control" placeholder="Password" />
  </div>

<!-- Submit button -->
<button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-success btn-block mb-4" style="width: 100%" id="login_submit">Login</button>

</form>



</body>

</html>