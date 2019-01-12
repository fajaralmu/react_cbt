import { connect } from 'react-redux'
import React, { Component } from 'react';
import { submitExam, getExamById } from './redux/actionCreators';


class TakeExam extends Component {

    constructor(props) {
        super(props);
        this.exam = {
            id: this.props.idexam,
            questions: []
        }

        this.changeAnswer = (q_id, s_id) => {
            let checkboxes = document.getElementsByClassName("answer-checkboxes" + q_id);
            for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].id != s_id)
                    checkboxes[i].checked = false;
            }
            this.exam.questions.forEach(q => {
                if (q.id == q_id) {
                    q.selection_id = Number(s_id);
                }
            });
            console.log(this.exam);
        }

        this.submitExam = () => {
            this.props.submitExam(this.exam);
        }

        this.getExam = (id) =>{
            this.props.getExam(id);
        }
    }

    componentDidUpdate(){
        console.log(this.exam);
    }

    componentWillMount() {
        this.getExam(this.props.idexam);
    }

    render() {
        const exam = this.props.exam;
        let listQ, result;
        if (exam.questions) {
            this.exam.questions.splice(0, exam.questions.length);
            listQ = <QuestionItem questions={exam.questions} changeAnswer={this.changeAnswer} />;
            exam.questions.forEach(q => {
                let q_exam = {
                    id: q.id,
                    selection_id: 0
                }
                this.exam.questions.push(q_exam);
            })
        }
        else {
            listQ = "loading..";
        }
        if (this.props.result) {
            result = <div>
                <h3>Your result is</h3>
                <p>{this.props.result.correct}/{this.props.result.total}</p>
            </div>
            listQ = "";
        }
        return (
            <div>
                <button onClick={this.submitExam} >Submit Exam</button>
                {result}
                <h2>Subject: {exam.subject}</h2>
                {listQ}
            </div>
        );
    }
}

const QuestionItem = (props) => {
    return (
        <div>
            <h2><u>List of Questions</u></h2>
            {props.questions.map((q, i) => {
                let key = "q" + i;
                return (
                    <div key={key}>
                        <p>{i + 1}. {q.question} {/*id: {q.id*/}</p>
                        <ol> {q.selections.map((s, j) => {
                            let key = "sel" + j;
                            let selection_class = "answer-checkboxes" + q.id;
                            return (
                                <li key={key}><input type="checkbox" onChange={() => props.changeAnswer(q.id, s.id)} className={selection_class} id={s.id} />{s.value} {/*, id: {s.id*/}</li>
                            )
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
        result: state.examsState.result
    }
}

const mapDispatchToProps = dispatch => ({
    getExam: (id) => dispatch(getExamById(id)),
    submitExam: (exam) => dispatch(submitExam(exam))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TakeExam)