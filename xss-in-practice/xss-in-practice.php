<?php
  header('X-XSS-Protection:0');
  $username = $_GET['username']
?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="de">
  <head>
    <meta http-equiv="content-type" content="t/html; charset=utf-8">
    <title>ae</title>
  </head>
  <body>
    <div style="width: 200px; height: 300px; margin: auto; margin-top: 30px;">
      <p>Hi <?php echo $username ?> !</p>
      <form action="xss-in-practice.php" method="post">
        <b>Username:</b>
        <input type="text" name="username" value="<?php echo $username ?>">
        <br>
        <b>Password</b>
        <input type="password" name="password">
        <button type="submit">Send</button>
      </form>
    </div>
    <script>
       
    </script>
  </body>
</html>