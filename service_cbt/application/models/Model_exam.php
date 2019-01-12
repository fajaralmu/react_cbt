<?php
class Model_exam extends CI_Model{
	
	public function __construct(){
		parent::__construct();
		$this->load->database();
	} 
	
	function all(){
		$query = $this->db->get('exam');
		$data = $query->result_array();
		$query->free_result();
		return $data;
	}
	
	
	function add($data){
		//print_r($data);
		//exit();
		$this->db->set($data);
		if($this->db->insert("exam"))
			return $this->db->insert_id();

		else
			return null;
	}
	
	function update($data){
		$this->db->where('id', $data["id"]);
		return $this->db->update('exam',$data);
		
	}
	
	public function remove($id){
		$this->db->where('id',$id);
		return $this->db->delete('exam');
	}
	
	public function get($id=0){
		
		if($id == 0){
			return null;
		}
		
		$query = $this->db->get_where('exam',array('id' => $id));
		return $query->row_array();
		
	}
	
	
		
}