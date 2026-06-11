<?php
    session_start();
    require_once __DIR__.'/db.php';
    function is_logged(){return isset($_SESSION['user']);}
    function is_admin(){return is_logged()&&$_SESSION['user']['role']=='admin';}
    function is_petugas(){return is_logged()&&$_SESSION['user']['role']=='petugas';}
    function is_pelanggan(){return is_logged()&&$_SESSION['user']['role']=='pelanggan';}
    function redirect($u){header('Location:'.$u);}
?>