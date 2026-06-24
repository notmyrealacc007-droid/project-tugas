<link rel="stylesheet" href="style.css">
<?php
    require 'includes/functions.php';
    
    $error = '';
    $success = '';

    if($_SERVER['REQUEST_METHOD']==='POST'){
        $username = $_POST['username']??'';
        $name     = $_POST['name']??'';
        $password = $_POST['password']??'';
        $confirm_password = $_POST['confirm_password']??'';

        if(empty($username) || empty($name) || empty($password) || empty($confirm_password)){
            $error = 'Semua field harus diisi!';
        } elseif($password !== $confirm_password){
            $error = 'Password tidak cocok!';
        } elseif(strlen($password) < 3){
            $error = 'Password minimal 3 karakter!';
        } else {
            // Check if username already exists
            $check = $db->prepare('SELECT id FROM users WHERE username = ?');
            $check->bind_param('s', $username);
            $check->execute();
            $result = $check->get_result();
            
            if($result->num_rows > 0){
                $error = 'Username sudah digunakan!';
            } else {
                $stmt = $db->prepare('INSERT INTO users (username, name, role, password) VALUES (?, ?, "pelanggan", ?)');
                $stmt->bind_param('sss', $username, $name, $password);
                
                if($stmt->execute()){
                    $success = 'Registrasi berhasil! Silahkan login.';
                    $username = '';
                    $name = '';
                    $password = '';
                    $confirm_password = '';
                } else {
                    $error = 'Terjadi kesalahan saat registrasi!';
                }
            }
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
    <?php if($error): ?>
        <div style="color: red; padding: 10px; background-color: #ffe6e6; border: 1px solid red; margin: 10px;">
            <?php echo htmlspecialchars($error); ?>
        </div>
    <?php endif; ?>
    
    <?php if($success): ?>
        <div style="color: green; padding: 10px; background-color: #e6ffe6; border: 1px solid green; margin: 10px;">
            <?php echo htmlspecialchars($success); ?>
            <a href="login.php">Klik di sini untuk login</a>
        </div>
    <?php endif; ?>
    
    <form method="POST">
        <p>Username</p>
        <input name="username" placeholder="Masukkan Username" value="<?php echo htmlspecialchars($username ?? ''); ?>" required><br>
        <p>Nama</p>
        <input name="name" placeholder="Masukkan Nama Lengkap" value="<?php echo htmlspecialchars($name ?? ''); ?>" required><br>
        <p>Password</p>
        <input type="password" name="password" placeholder="Masukkan Password" required><br>
        <p>Konfirmasi Password</p>
        <input type="password" name="confirm_password" placeholder="Konfirmasi Password" required><br><br>
        <button type="submit">Register</button>
        <br><br>
        Sudah Punya Akun? <a href="login.php">Login</a>
    </form>
</body>
</html>