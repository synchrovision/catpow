<?php
include __DIR__.'/classes/autoload.php';
session_start();
$id=filter_input(INPUT_GET,'id',FILTER_SANITIZE_SPECIAL_CHARS);
$req=$_REQUEST['req'];
$talk=$_SESSION['catpow']->stock['forms'][$id];
header('content-type: application/json; charset=utf-8');
$talk->run();