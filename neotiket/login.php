<link rel="stylesheet" href="style.css">
<?php
    require 'includes/functions.php';
    
    $error = '';

    if($_SERVER['REQUEST_METHOD']==='POST'){
        $username = $_POST['username'] ?? '';
        $password = $_POST['password'] ?? '';

        if(empty($username) || empty($password)){
            $error = 'Username dan password harus diisi!';
        } else {
            $query = $db->prepare('SELECT * FROM users WHERE username = ? LIMIT 1');
            $query->bind_param('s',$username);
            $query->execute();
            $user = $query->get_result()->fetch_assoc();
            
            if($user && $user['password'] === $password){
                unset($user['password']);
                $_SESSION['user'] = $user;

                if($user['role'] ==='admin'){
                    redirect('admin.php');
                }elseif($user['role'] ==='petugas'){
                    redirect('petugas.php');
                }else {
                    redirect('pelanggan.php');
                }
            } else {
                $error = 'Username atau password salah!';
            }
        }
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
    <?php if($error): ?>
        <div style="color: red; padding: 10px; background-color: #ffe6e6; border: 1px solid red; margin: 10px;">
            <?php echo htmlspecialchars($error); ?>
        </div>
    <?php endif; ?>
    
    <form method="post">
        <div>
            <p>Username</p>
            <input name="username" placeholder="Masukkan Username" required><br>
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