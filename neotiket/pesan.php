<?php
    require 'includes/functions.php';
    if(!is_pelanggan()){
        redirect('login.php');
    }

    echo '<a href="pelanggan.php">Kembali</a>';
    echo '<br>';

    $id = (int)($_GET['id'] ?? 4);
    $s = $db->query("
    SELECT s.*, name AS train_name
    FROM schedules s
    JOIN trains ON trains.id = s.train_id
    WHERE s.id = $id
    ")->fetch_assoc() or exit('Tidak menemukan jadwal');

    if ($_SERVER['REQUEST_METHOD'] ==='POST'){
        $uid = $_SESSION['user']['id'];
        $uname = $_SESSION['user']['username'];
        $jumlah = max(1,min(5,(int)($_POST['jumlah']) ?? 0));
        $out = [];

            for ($i = 1; $i <= 5 ; $i++){
        $checkinCode = 'CKN-' . strtoupper(substr(md5(uniqid()),0,6));
        $namaPemesan = $uname . ($i > 1 ? "-$i" : "");

        $db->query("
        INSERT INTO bookings(user_id,schedule_id,seat_no,status,checkin_code,nama_pemesan)
        VALUES ($uid,$id,'','booked','$checkinCode','$namaPemesan')");
        $out = [] . "$namaPemesan($checkinCode)";
    }

    echo '<h4>Berhasil Pesan'. $jumlah .'Tiket!</h4><ul>';
        foreach ($out as $o){
            '<li>'. e($o) .'</li>';
        }
    '</ul>';
}

?>

<h3>Pesan - <?= e($s['train_name']) ?></h3>
<form method="POST">
    Jumlah:
    <select name="Jumlah" id="">
        <?php for ($i = 1; $i <= 8 ; $i++) : ?>
            <option><?= $i ?></option>
        <?php endfor; ?>
    </select>
    <br>
    <button>Pesan</button>
</form>