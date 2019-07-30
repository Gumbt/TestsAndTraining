<?php
require_once 'assistente.php';

class AcessaAssistente {
    function imprimeAssistente(){
        $assis = new Assistente();
        echo $assis->getRamal();
        echo $assis->nome;
        echo $assis->getCpf();
        echo $assis->getEndereco();
    }
}


?>