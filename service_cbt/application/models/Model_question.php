<?php
class Model_question extends CI_Model{
	
	public function __construct(){
		parent::__construct();
		$this->load->database();
	} 
	
	function all(){
		$query = $this->db->get('question');
		$data = $query->result_array();
		$query->free_result();
		return $data;
	}
	
	
	function add($data){
		//print_r($data);
		//exit();
		$this->db->set($data);
		if($this->db->insert("question"))
			return $this->db->insert_id();
		else
			return null;
	}
	
	function update($data){
		$this->db->where('id', $data['id']);
		return $this->db->update('question',$data);
		
	}
	
	public function remove($id){
		$this->db->where('id',$id);
		return $this->db->delete('question');
	}
	
	public function removeByExamId($id){
		$this->db->where('exam_id',$id);
		return $this->db->delete('question');
	}
	
	public function getByExamId($id=0){
		if($id == 0){
			return null;
		}
		
		$query = $this->db->get_where('question',array('exam_id' => $id));
		return $query->result_array();
	}
	
	public function get($id=0){
		
		if($id == 0){
			return null;
		}
		
		$query = $this->db->get_where('question',array('id' => $id));
		return $query->row_array();
		
	}
	
	public function questionCount($exam_id){
		$this->db->where(array('exam_id'=>$exam_id));
		$this->db->from('question');
		return $this->db->count_all_results();
	}
	
	
		
}