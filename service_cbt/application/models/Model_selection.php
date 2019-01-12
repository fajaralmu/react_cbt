<?php
class Model_selection extends CI_Model{
	
	public function __construct(){
		parent::__construct();
		$this->load->database();
	} 
	
	function all(){
		$query = $this->db->get('selection');
		$data = $query->result_array();
		$query->free_result();
		return $data;
	}
	
	
	function add($data){
		$this->db->set($data);
		if($this->db->insert("selection"))
			return $this->db->insert_id();
		else
			return null;
	}
	
	function update($data){
		$this->db->where('id', $data["id"]);
		return $this->db->update('selection',$data);
		
	}
	
	public function remove($id){
		$this->db->where('id',$id);
		return $this->db->delete('selection');
	}
	
	public function removeByQuestionId($id){
		$this->db->where('question_id',$id);
		return $this->db->delete('selection');
	}
	
	public function getByQuestionId($id=0){
		if($id == 0){
			return null;
		}
		
		$query = $this->db->get_where('selection',array('question_id' => $id));
		return $query->result_array();
	}
	
	public function get($id=0){
		
		if($id == 0){
			return null;
		}
		
		$query = $this->db->get_where('selection',array('id' => $id));
		return $query->row_array();
		
	}
	
	public function checkAnswer($selection_id, $question_id){
		$this->db->where(array('id'=>$selection_id, 'correct'=>1, 'question_id'=>$question_id));
		$this->db->from('selection');
		$count = $this->db->count_all_results();
		if($count == 1){
			return TRUE;
		}else{
			return FALSE;
		}
	}
	
	
		
}