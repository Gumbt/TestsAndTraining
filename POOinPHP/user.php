<?php
class User {
    public $nome;
    protected $cpf;
    private $endereco;
    function User(){
        $this->newUser();
    }

    private function newUser(){
        $this->nome = "gumb";
        $this->cpf = "99999999999";
        $this->endereco = "rua sei la";
    }
    public function getCpf(){
        return $this->cpf;
    }

    public function getNome(){
        return $this->nome;
    }

    function getEndereco(){
        return $this->endereco;
    }
}

?>