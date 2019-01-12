<?php
class Model_user extends CI_Model{
	
	public function __construct(){
		parent::__construct();
		$this->load->database();
	} 
	
	function all(){
		$query = $this->db->get('user');
		$data = $query->result_array();
		$query->free_result();
		return $data;
	}
	
	function isLoggedIn($username, $password){
		$where_array = array('username'=>$username, 'password'=>$password);
		$query = $this->db->get_where('user',$where_array);
		$result = $query->num_rows();
		$query->free_result();
		if($result==1){
			return true;
		}else
			return false;
			
	}
	
	function add($data){
		//print_r($data);
		//exit();
		$this->db->set($data);
		if($this->db->insert("user"))
			return $this->db->insert_id();
		else
			return null;
	}
	
	function update($data){
		$this->db->where('id', $data["id"]);
		return $this->db->update('user',$data);
		
	}
	
	public function remove($id){
		$this->db->where('id',$id);
		return $this->db->delete('user');
	}
	
	public function get($id=0){
		
		if($id == 0){
			return null;
		}
		
		$query = $this->db->get_where('user',array('id' => $id));
		return $query->row_array();
		
	}
	
	
		
}