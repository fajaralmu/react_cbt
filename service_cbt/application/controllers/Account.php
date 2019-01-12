<?php

class Account extends CI_Controller{
	
	public function __construct(){
		parent::__construct();
		$this->load->model('model_user');
		$this->load->helper('url_helper');
	}
	
	function index(){
		echo "HELLO";
	}
	
	function add(){
		$data = json_decode(file_get_contents('php://input'),1);
		if(isset($data['username']) && isset($data['username']) && isset($data['username'])){
			if($this->model_user->add($data))
				echo true;
			else
				echo false;
		}else
			echo false;
		
	}

	function update(){
		$data=json_decode(file_get_contents('php://input'),1);
		if($this->model_user->update($data))
			echo true;
		else
			echo false;
	
	}

	function get($id=''){
		if($id!='' && $id != null){
			$user=  $this->model_user->dapatkan_user($id);
			echo json_encode($user);
		}
	}
	
	
	function dasbor(){
		$api_dasbor = $this->api->dasbor();
		if($api_dasbor[0]){
			$user=  $this->model_user->dapatkan_user_id($api_dasbor[1]);
			echo json_encode(array('status'=>true, 'user'=>$user ));
		}else{
			echo json_encode(array('status'=>false));
		}
	}

	function login(){
		if($this->api->validasiparam()){
			$this->api->buattoken();
		}else{
			$this->api->kirimError(IDENTITY_INVALID,'identitas tidak valid');
		}
		// $data = json_decode(file_get_contents('php://input'),1);
		// if($this->model_user->masuk($data['username'], $data['katasandi']))
		// {
		// 	echo true;
		// }else{
		// 	echo false;
		// }
	}

	
	function getin(){
		$data = json_decode(file_get_contents('php://input'),1);
		if($this->model_user->isLoggedIn($data['username'], $data['password']))
			echo true;
		else
			echo false;
	}
	
	
	
	
}