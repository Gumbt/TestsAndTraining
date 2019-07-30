<?php
require_once 'userAccess.php';
require_once 'AcessaAssistente.php';

$user = new UserAccess();
$assis = new AcessaAssistente();

$user->imprimeUsuario();
echo '<br>';
$assis->imprimeAssistente();

?>