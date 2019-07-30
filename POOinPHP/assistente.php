<?php
require_once 'user.php';

class Assistente extends User{
    protected $ramal;

    function Assistente(){
        parent::User();
        $this->ramal = '2154';
    }

    public function getRamal(){
        return $this->ramal;
    }

}

?>