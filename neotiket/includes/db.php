<?php
    $db = new mysqli('localhost','root','','ukkneo');
    if($db->connect_error)
        die('error');
    $db->set_charset('utf8mb4');
    function e($v){return htmlspecialchars($v??'',ENT_QUOTES,'UTF-8');}
?>