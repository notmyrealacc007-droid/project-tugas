<link rel="stylesheet" href="style.css">
<?php
    require 'includes/functions.php';

    if($_SERVER['REQUEST_METHOD']==='POST'){
        $username = $_POST['username'];
        $password = $_POST['password'];

        $query = $db->prepare('SELECT * FROM users WHERE username = ? LIMIT 1');
        $query->bind_param('s',$username);
        $query->execute();
        $user = $query->get_result()->fetch_assoc();
        
        unset($user['password']);
        $_SESSION['user'] = $user;

        if($user['role'] ==='admin'){
            redirect('admin.php');
        }elseif($user['role'] ==='petugas'){
            redirect('petugas.php');
        }else redirect('pelanggan.php');
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <br>
    <form method="post">
        <div>
            <p>Username</p>
            <input name="username" placeholder="Masukkan Username"><br>
            <p>Password</p>
            <input type="password" name="password" placeholder="Masukkan Password" required><br><br>
            <button type="submit">Login</button>
            <br><br>
            Belum Punya Akun? <a href="register.php"><br>
            Daftar Sekarang</a>
        </div>
    </form>
</body>
</html>