import React, { Component } from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { all } from 'q';
import { fetchAllExam, fetchOneExam, login, logout, appNewExam, getExamById, deleteExam } from './redux/actionCreators';
import TakeExam from './TakeExam';
import UpdateExam from './UpdateExam';
import Login from './Login';


class App extends Component {

    constructor(props) {
        super(props);
        this.apiURL = "http://localhost/ReactLatihan/service_cbt/index.php/cbt/";

        this.allExam = () => {
            this.props.allExam();
        }

        this.add = (exam) => {
            this.props.addExam(exam);
        }

        this.getExam = (id) => {
            this.props.getExam(id);
        }

        this.remove = (id) => {
            this.props.deleteExam(id);
        }

    }

    render() {
        const nav =
            <div>
                <Link className="App-link" to="/home" >Home</Link> |
                <Link className="App-link" to="/add" >New Exam</Link> |
                <Link className="App-link" to="/listexam" >Exams</Link> |
                <Link className="App-link" to="/login" >Login</Link> |
            </div>;
        let style = {
            width: '100%',
            backgroundColor: 'white',
            padding: 0,
            margin: 0
        }
        return (
            <div id="container" style={style}>
                <Header title="Home" />
                <button onClick={this.props.login}>log in</button>
                <button onClick={this.props.logout}>log out</button>
                <Router>
                    <div>
                        {nav}
                        <Switch>
                            <Route path="/exam/:id" render={
                                (renderProps) =>
                                    <TakeExam idexam={renderProps.match.params.id} />
                            } />
                            <Route path="/login" render={
                                (renderProps) =>
                                    <Login/>
                            } />
                            <Route path="/home" render={
                                (renderProps) =>
                                   <div>HOME</div>
                            } />
                            <Route path="/edit/:id" render={
                                (renderProps) =>
                                    <UpdateExam idexam={renderProps.match.params.id} updateExam={this.updateExam} editMode={true} />
                            } />
                            <Route path="/add" render={
                                (props) => <UpdateExam addExam={this.add} />
                            } />
                            <Route path="/listexam" render={
                                (props) => <ListExams exams={this.props.exams} add={this.add} remove={this.remove} allExam={this.allExam} update={this.update} />
                            } />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}


const ListExams = props => {
    return (
        <div>List Exams
            <br />
            <button onClick={props.allExam}>show all exams</button>
            <ol>
                {props.exams.map(
                    e => {
                        const url_test = "/exam/" + e.id;
                        const url_edit = "/edit/" + e.id;
                        return (
                            <li><Link to={url_test}><h3>{e.subject}</h3></Link> |  <Link to={url_edit}>edit</Link></li>
                        )
                    }
                )}
            </ol>
        </div>
    )
}
const Header = props => {
    return (
        <div className="App-header" >{props.title}</div>
    )
}

const mapStateToProps = state => {
    //console.log(state);
    return {
        exams: state.examsState.exams,
        exam: state.examsState.exam,
        user: state.userState.user
    }
}

const mapDispatchToProps = dispatch => ({
    allExam: () => dispatch(fetchAllExam()),
    getExam: (id) => dispatch(getExamById(id)),
    oneExam: () => dispatch(fetchOneExam()),
    addExam: (exam) => dispatch(appNewExam(exam)),
    deleteExam: (id) => dispatch(deleteExam(id)),
    login: () => dispatch(login()),
    logout: () => dispatch(logout())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)



//export default App;
