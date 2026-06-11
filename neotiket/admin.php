<?php
    require 'includes/functions.php';
    
    if(!is_admin()){
        redirect('login.php');
    }

    echo '<p>Halo '. e($_SESSION['user']['name'] ?: $_SESSION['user']['username']) .'</p>';

    if($_SERVER['REQUEST_METHOD']==='POST'){
        $username = $_POST['username']??'';
        $name     = $_POST['name']??'';
        $password = $_POST['password']??'';

        $stmt = $db->prepare('INSERT INTO users (username,name,role,password) VALUES (?,?,"petugas",?)');
        $stmt->bind_param('sss',$username, $name, $password);
        $stmt->execute();
        redirect('admin.php');
    
        if($password && $password){

        }
    }
    
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <nav>
        <a href="logout.php">Logout</a>
    </nav>
    <h2>Tambah Petugas</h2>
    <br>
    <form method="POST">
            <p>Username</p>
            <input name="username" placeholder="Masukkan Username"><br>
            <p>Nama</p>
            <input name="name" placeholder="Masukkan Username"><br>
            <p>Password</p>
            <input type="password" name="password" placeholder="Masukkan Password"><br><br>
            <button type="post">Tambah</button>
    </form>
</body>
</html>