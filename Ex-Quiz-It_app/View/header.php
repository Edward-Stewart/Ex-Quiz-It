<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href=".\View\Content\bootstrap-5.3.3\dist\css\bootstrap.min.css">
    <script src=".\View\Content\bootstrap-5.3.3\dist\js\bootstrap.min.js"></script> 
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" />   
    <script type="module" src=".\Model\firebase.js"></script>
</head>
<body style="padding-top: 100px;">
<nav class="navbar bg-success fixed-top" style=" z-index: 1000.header; position: fixed; top: 0; left: 0; width: 100%;">
  <div class="container-fluid">
    <a class="navbar-brand" href="index.php?action=home"><i class="bi bi-question-square-fill h1"></i></a>
    <div class="h1">Ex-Quiz-It</div>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div class="offcanvas-header bg-success">
        <h5 class="offcanvas-title text-white" id="offcanvasNavbarLabel">Ex-Quiz-It</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="index.php?action=home">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="ConnectionLink" href="index.php?action=connect_page">Connection Page</a>
            <a class="nav-link" id="CreateQuizLink" href="index.php?action=create_quiz_page" hidden>Create a quiz!</a>
            <a class="nav-link" id="adminPageLink" href="index.php?action=admin_page">Admin Page</a>
            <a class="nav-link" id="Logout" href="" hidden>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>
</body>
</html>


