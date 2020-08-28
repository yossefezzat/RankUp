import React, { Component } from 'react'
import { PieChart } from 'react-minimal-pie-chart';

import {classesWithNum, getClassCVs} from "../../Utils/rankingCalls";

export default class JobRanked extends Component {
  state = {
    classCvs: '',
    classesStats: {},
    currentClass: 'A'
  }
  getClassCVS = (clickedClass) => {
    this.setState({currentClass: clickedClass});
    getClassCVs(this.props.jobID, clickedClass)
      .then(data => this.setState({classCvs: data}))
      .catch(err => console.log(err));
  }
  componentDidMount() {
    classesWithNum(this.props.jobID)
      .then(data => this.setState({classesStats: data}))
      .catch(err => console.log(err));
    this.getClassCVS('A');
  }
  handleBrowseCV = (path) => {
    console.log(path);
  }
  render() {
    const {A : classA = 0, B: classB=0, C: classC=0} = this.state.classesStats;
    const sum = classA + classB + classC;
    const cvsList = (this.state.classCvs.length > 0)? ( this.state.classCvs.map(cv => {
      let pdfUrl = process.env.REACT_APP_CVS+'/'+this.props.jobID+'/'+cv.path;
      return (
        <div className="cv" key={cv._id}>
          <div className="check-box">
            <input type="checkbox" name="email" value={cv.email} />
          </div>
          <div className="name">
            <h6>{cv.name}</h6>
          </div>
          <div></div>
          <div></div>
          <div className="browse-link">
            <a target="_blank" rel="noopener noreferrer" href={pdfUrl}><img src="/icons/clipboard 1.png" alt="" /><span> Browse CV</span></a>
          </div>
        </div>       
      )
    })
    ) : ( <div className="cv"><p className="text-center" style={{width: '100%'}}>No CVs yet! in class {this.state.currentClass} </p></div> );
    return (
      <div className="ranking-section">
        <div className="classes">
          <div className="classes-states">
            <div className="row">
              <div className="offset-2 col-3">
                <div className="bars">
                  <div className="class-bar classA" onClick={() => {this.getClassCVS('A')}}>
                    <div className="bar" style={{ height: (classA/sum * 100)+'%' }}>
                    </div>
                  </div>
                  <div className="class-bar classB" onClick={() => {this.getClassCVS('B')}}>
                    <div className="bar" style={{ height: (classB/sum * 100)+'%' }}>
                    </div>
                  </div>
                  <div className="class-bar classC" onClick={() => {this.getClassCVS('C')}}>
                    <div className="bar" style={{ height: (classC/sum * 100)+'%' }}>
                    </div>
                  </div>
                </div>
              </div>
              <div className="offset-3 col-4">
                <div className="pie-char">
                <PieChart
                  data={[
                    { title: 'ClassA', value: classA, color: '#6C63FF' },
                    { title: 'ClassC', value: classC, color: '#69F0AE' },
                    { title: 'ClassB', value: classB, color: '#2196F3' },
                  ]}
                />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-2">
                <h5>Classes:</h5>
              </div>
              <div className="col-3">
                <div className="classes-names">
                  <div className="class-bar">
                    <span>A</span>
                  </div>
                  <div className="class-bar">
                    <span>B</span>
                  </div>
                  <div className="class-bar">
                    <span>C</span>
                  </div>
                </div>
              </div>
              <div className="offset-3 col-4">
                <div className="class-annos">
                  <div className="class-an">
                    <div className="color classA" />
                    <span>{classA}</span>
                  </div>
                  <div className="class-an">
                    <div className="color classB" />
                    <span>{classB}</span>
                  </div>
                  <div className="class-an">
                    <div className="color classC" />
                    <span>{classC}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="class-cvs">
            <div className="head classA">
              <span className="class-title">Class {this.state.currentClass}</span>
            </div>
            <div className="classes-cvs-body">
              <form>
                {cvsList}  
              </form>
            </div>
          </div>
          <div className="next-action">
            <button type="button" className="btn btn-bBlue" onClick={this.props.handleRank}>Message Selected</button>
          </div>
        </div>
      </div>
    )
  }
}
