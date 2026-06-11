<link rel="stylesheet" href="style.css">
<?php
    require 'includes/functions.php';

    if($_SERVER['REQUEST_METHOD']==='POST'){
        $username = $_POST['username']??'';
        $name     = $_POST['name']??'';
        $password = $_POST['password']??'';

        $stmt = $db->prepare('INSERT INTO users (username,name,role,password) VALUES (?,?,"pelanggan",?)');
        $stmt->bind_param('sss',$username, $name, $password);
        $stmt->execute();
        redirect('login.php');
    
        if($password && $password){

        }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
</head>
<body>
    <br>
    <form method="POST">
            <p>Username</p>
            <input name="username" placeholder="Masukkan Username"><br>
            <p>Nama</p>
            <input name="name" placeholder="Masukkan Username"><br>
            <p>Password</p>
            <input type="password" name="password" placeholder="Masukkan Password"><br><br>
            <button type="post">Register</button>
            <br><br>
            Sudah Punya Akun? <a href="login.php">Login</a>
    </form>
</body>
</html>