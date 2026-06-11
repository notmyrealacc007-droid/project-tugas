<link rel="stylesheet" href="style.css">
<?php
    require 'includes/functions.php';
    if(!is_pelanggan()){
        redirect('login.php');
    }
    
    echo '<p>Halo '. e($_SESSION['user']['name'] ?: $_SESSION['user']['username']) .'</p>';
    echo '<a href="logout.php">Logout</a>';           
    echo '<br>';
    
    $s = $db->query("
    SELECT s.*, name AS train_name
    FROM schedules s
    JOIN trains ON trains.id = s.train_id
    WHERE DATE(s.departure) = CURDATE()
    ");

    echo '<h3>Jadwal Hari Ini</h3>';
    echo '<table border="1" style="margin-left: 37%;">
            <td>
                <th>Nama Kereta</th>
                <th>Pemberangkatan</th>
                <th>Kedatangan</th>
                <th>Harga</th>
                <th>Aksi</th>
            </td>';

    if($s->num_rows){
        while($r = $s->fetch_assoc()){
            echo '<tr>
                    <th>'. e($r['id']) .'</th>
                    <th>'. e($r['train_name']) .'</th>
                    <th>'. e($r['departure']) .'</th>
                    <th>'. e($r['arrival']) .'</th>
                    <th>'. e($r['price']) .'</th>
                    <th><a href="pesan.php?=' . e($r['id']) . '">Pesan</a></th>
                </tr>';
        }
    }else{
        echo 'Tidak Ada Jadwal';
    }
    '</table>';
?>



