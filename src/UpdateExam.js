import { connect } from 'react-redux'
import React, { Component } from 'react';
import { submitExam, updateExam, getExamById } from './redux/actionCreators';

class UpdateExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exam: {
                subject: "",
                selection_count: 3,
                questions: [
                ]
            },
            selections: [],
            add_qst: false,
            edit_qst: false,
            add_sel: false,
            selected_question: {},
            selected_q_index: 0,
        };

        this.updateExam = () => {
            let exam = this.state.exam;
            exam.subject = this.subject_field.current.value;
            this.setState({ exam })
            this.props.updateExam(this.state.exam);
        }

        this.addExam = () => {
            let exam = this.state.exam;
            exam.subject = this.subject_field.current.value;
            this.setState({ exam })
            this.props.addExam(this.state.exam);
        }

        this.selectionCount = () => {
            let exam = this.state.exam;
            exam.selection_count = this.selection_count_field.current.value;
            this.setState({ exam });
        }

        this.newQuestion = () => {
            this.question_field.current.value = "";
            this.setState({ selections: [] });
        }

        this.detail = (index) => {
            let selected_question = this.state.exam.questions.find((q, i) => i == index);
            let selections = selected_question.selections;
            this.setState({ selections, selected_question, selected_q_index: index, add_qst: true, edit_qst: true });
            this.question_field.current.value = selected_question.question;
        }

        this.addQuestion = () => {
            if (this.question_field.current.value == "") {
                alert("You must fill the question");
                return;
            }
            if (this.state.selections.length <= 0) {
                alert("You must fill the selection");
                return;
            }
            let thereIsCorrectAnswer = false;
            for (let i = 0; i < this.state.selections.length; i++) {
                if (this.state.selections[i].correct == 1) {
                    thereIsCorrectAnswer = true;
                }
            }
            if (!thereIsCorrectAnswer) {
                alert("You must set the correct answer");
                return;
            }
            let qst = { question: this.question_field.current.value };
            let exam = this.state.exam;
            qst.selections = this.state.selections;
            exam.questions.push(qst);
            this.setState({ exam, add_qst: false });
            this.newQuestion();

        }

        this.addSelection = () => {
            if (this.selection_field.current.value == "") {
                alert("You must fill the selection");
                return;
            }
            if (this.state.selections.length + 1 > this.selection_count_field.current.value) {
                alert("maximum selection: " + this.selection_count_field.current.value);
                return;
            }
            let selection = { value: this.selection_field.current.value, correct: 0 };
            let selections = this.state.selections;
            selections.push(selection);
            this.setState({ selections });
            this.selection_field.current.value = "";
            this.selection_field.current.focus();
        }

        this.removeQuestion = (i) => {
            let exam = this.state.exam;
            exam.questions.splice(i, 1);
            this.setState({ exam });
        }

        this.removeSelection = (i) => {
            let selections = this.state.selections;
            selections.splice(i, 1);
            this.setState({ selections });
        }

        this.updateQuestion = () => {
            let selected_q = this.state.selected_question;
            let selections = this.state.selections;
            let q_index = this.state.selected_q_index;
            let exam = this.state.exam;
            selected_q.selections = selections;
            selected_q.question = this.question_field.current.value;
            exam.questions.forEach((q, i) => {
                if (i == q_index)
                    q = selected_q;
            });
            this.question_field.current.value = "";
            this.setState({ exam, selected_question: {}, selections: [], selected_q_index: 0 });
        }

        this.setCorrectAnswer = (id) => {
            let checkboxes = document.getElementsByClassName("correct-checkboxes");
            for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].id != id)
                    checkboxes[i].checked = false;
            }
            let selections = this.state.selections;
            selections.forEach((s, i) => {
                if (i == id) {
                    s.correct = 1;
                } else {
                    s.correct = 0;
                }
            });
            this.setState({ selections });
            console.log("id:" + id, this.state.selections);
        }
    }

    componentWillMount() {
        this.subject_field = React.createRef();
        this.selection_count_field = React.createRef();
        this.question_field = React.createRef();
        this.selection_field = React.createRef();
        if (this.props.editMode == true) {
            this.id = Number(this.props.idexam);
            this.props.getExam(this.id);
        }
        this.updated_first_time = false;
    }

    componentDidUpdate(){
        
        if (Object.keys(this.props.exam).length && !this.updated_first_time) {
            this.setState({exam:this.props.exam});
            this.subject_field.current.value = this.props.exam.subject;
            this.selection_count_field.current.value = this.props.exam.selection_count;
            this.updated_first_time = true;
        }
    }

    render() {
        let questions = this.state.exam.questions ? this.state.exam.questions:[];
        let update_exam_btn =<button onClick={this.addExam}>Add Exam</button>;
        if(this.props.idexam){
            update_exam_btn = <button onClick={this.updateExam} >Update Exam</button>
        }
        
        let selection_field = <div>
            <p>Selection value</p>
            <input ref={this.selection_field} />
            <p></p>
            <button onClick={this.addSelection}>Submit Selection</button>
        </div>;

        let selection_list;
        if (this.state.selections.length > 0)
            selection_list = this.state.selections.map(
                (s, j) => {
                    let isCorrect = s.correct == 1;
                    return (
                        <li key={j}>{s.value} <input onChange={() => this.setCorrectAnswer(j)} id={j} type="checkbox" checked={isCorrect} className="correct-checkboxes" />Correct  <a onClick={() => this.removeSelection(j)}>remove</a></li>
                    )
                })

        const question_field = <div>
            <p>Question</p>
            <input id="question_field" ref={this.question_field} />
            <p>Selections</p>
            {selection_field}
            <ol>
                {selection_list}
            </ol>
        </div>;
        return (
            <div>
                <table>
                    <tbody >
                        <tr valign="top">
                            <td>
                                {update_exam_btn}
                                <h3>New Exam</h3>
                                <p>Subject</p>
                                <input id="subject_field" ref={this.subject_field} />
                                <p>Selection count</p>
                                <input type="number" id="selection_count_field" ref={this.selection_count_field} onChange={this.selectionCount} />
                                <p>Questions</p>
                                <button onClick={this.addQuestion}>Submit Question</button>
                                <button onClick={this.newQuestion}>Add Question</button>
                                or
                                <button onClick={this.updateQuestion}>Update Question</button>
                                {question_field}
                            </td>
                            <td>
                                <QuestionItem questions={questions} detail={this.detail} removeQuestion={this.removeQuestion} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

const QuestionItem = (props) => {
    return (
        <div>
            <h2><u>List of Questions</u></h2>
            {props.questions.map(
                (q, i) => {
                    let key = "q" + i;
                    return (
                        <div key={key}>
                            <p>{i + 1}. Q: {q.question}</p>
                            <a  onClick={() => props.detail(i)}>edit </a> | 
                            <a  onClick={() => props.removeQuestion(i)}> remove</a>
                            <ol> {q.selections.map((s, j) => {
                                let key = "sel" + j;
                                let correct = s.correct == 1 ? <i>-correct answer</i> : "";
                                return (<li key={key}>{s.value} {correct}</li>)
                            })}
                            </ol></div>
                    )
                })}
        </div>
    )
}

const mapStateToProps = state => {
    //console.log(state);
    return {
        exam: state.examsState.exam,
    }
}

const mapDispatchToProps = dispatch => ({
    getExam: (id) => dispatch(getExamById(id)),
    updateExam: (exam) => dispatch(updateExam(exam)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateExam)