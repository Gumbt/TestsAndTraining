<?php
require_once 'user.php';

class UserAccess{
    function imprimeUsuario(){
        $user = new User;
        echo $user->nome;
        echo $user->getCpf();
        echo $user->getEndereco();
    }
}

?>