<?php

class Cbt extends CI_Controller{
	
	public function __construct(){
		parent::__construct();
		$this->load->model('model_exam');
		$this->load->model('model_question');
		$this->load->model('model_selection');
		$this->load->helper('url_helper');
	}
	
	function index(){
		echo "HELLO";
	}
	
	function all(){
		$data = array();
		$exams = $this->model_exam->all();
		for($i=0;$i<sizeof($exams);$i++){
			$exam = $exams[$i];
			
			$questions = $this->model_question->getByExamId($exam['id']);
			for($j=0;$j<sizeof($questions);$j++){
				$q_id = $questions[$j]["id"];
				$questions[$j]["selections"] = $this->model_selection->getByQuestionId($q_id);			
			}
			$exam["questions"] = $questions;
			array_push($data, $exam);
		}
		echo json_encode($data);
	}
		
	function submitexam(){
		if($_SERVER['REQUEST_METHOD'] == 'POST'){
			$data = json_decode(file_get_contents('php://input'), true);
			$exam_id = $data["id"];
			$question_tested = $data["questions"];
			
			$questions = $this->model_question->getByExamId($exam_id);
			$count_qst = sizeof($questions);
			$correct = 0;
			if(sizeof($question_tested)>0){
				for($i=0;$i<sizeof($question_tested);$i++){
					$q_id = $question_tested[$i]["id"];
					$selection_id = $question_tested[$i]["selection_id"];
					$correct_ = $this->model_selection->checkAnswer($selection_id, $q_id);	
					if($correct_){
						$correct++;
					}
				}
			}
			$result = array("correct"=>$correct, "total"=>$count_qst);
			echo json_encode($result);
		}
	}
	
	function get($id){
		if($_SERVER['REQUEST_METHOD'] == 'GET'){
			$exam = $this->model_exam->get($id);
			$questions = $this->model_question->getByExamId($id);
			if(sizeof($questions)>0){
				for($i=0;$i<sizeof($questions);$i++){
					$q_id = $questions[$i]["id"];
					$questions[$i]["selections"] = $this->model_selection->getByQuestionId($q_id);			
				}
			}
			$exam["questions"] = $questions;
			echo json_encode($exam);
		}
	}
	
	function add(){
		$data = json_decode(file_get_contents('php://input'), true);
		if($_SERVER['REQUEST_METHOD'] == 'POST'){
			//exit();
			$exam = array(
				"subject"=>$data['subject'],
				"selection_count"=>$data['selection_count']
			);
			
			$questions = $data["questions"];			
			$exam_id = $this->model_exam->add($exam);
			if($exam_id != null){
				for($i=0;$i<sizeof($questions);$i++){
					$qi = $questions[$i];
					$q = array(
						"exam_id" => $exam_id,
						"question" => $qi["question"]
					);
					$q_id = $this->model_question->add($q);
					if($q_id != null){
						$selections = $qi["selections"];
						for($j=0;$j<sizeof($selections);$j++){
							$si = $selections[$j];
							$s = array(
								"question_id" => $q_id,
								"value" => $si["value"],
								"correct" => $si["correct"]
							);
							$this->model_selection->add($s);
						}
					}
				}
				echo true;
			}else
				echo false;
		}
	}
	
	function updateexam(){
		$data = json_decode(file_get_contents('php://input'), true);
		if($_SERVER['REQUEST_METHOD'] == 'PUT'){
			//exit();
			$exam = array(
				"id" =>$data["id"],
				"subject"=>$data['subject'],
				"selection_count"=>$data['selection_count']
			);
			
			$questions = $data["questions"];			
			$update_ok = $this->model_exam->update($exam);
			$this->model_question->removeByExamId($exam["id"]);
				
			for($i=0;$i<sizeof($questions);$i++){
				$qi = $questions[$i];
				$q = array(
					"exam_id" => $data["id"],
					"question" => $qi["question"]
				);
				$q_id = 0;
				$selections = $qi["selections"];
				unset($qi["selections"]);
				
				
				if(isset($qi["id"])){
					$this->model_selection->removeByQuestionId($qi["id"]);
					$q["id"] = $qi["id"];
				}
				
				$q_id = $this->model_question->add($q);
						
				for($j=0;$j<sizeof($selections);$j++){
					$si = $selections[$j];
					
					$s = array(
						"question_id" => isset($qi["id"])? $qi["id"] : $q_id,
						"value" => $si["value"],
						"correct" => $si["correct"]
					);
					if(isset($si["id"])){
						$s["id"]=$si["id"];
					}
					
					$this->model_selection->add($s);
				}
				
			}
			echo true;
		}
	}
}