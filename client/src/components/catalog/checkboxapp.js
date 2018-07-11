import React from 'react';

import {connect} from 'react-redux';

import {
      createNewPlan, 
      fetchAcadPlans} from '../../actions/catalogActions'

import {API_BASE_URL} from '../../config';

import Checkbox from './checkbox';

import requiresLogin from '../auth/requires-login';

import SelectionsPage from './selectionsPage';

import InputGroupList from './inputGroupList';

import './checkboxapp.css'


class CheckboxApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      buttonStatus: true,
      checkboxStatus: true,
      inputBoxStatus: true,
      clearSelection: false,
      selectedCount: 0,
      exceedsMaxGroupSelection: false,
      year: '',
      semester: '',
      semesterSelection:['Spring', 'Summer', 'Fall'],
      plan: [],
      existingPlan: {},
      oldPlan: [],
      newPlan: [],
      joinedPlan: [],
      courseAlreadyExists: false,
      information: ''
    }
  }

  componentDidMount(){
    const searchQuery = `?username=${this.props.currentUser.username}`;
    fetch(`${API_BASE_URL}/dashboard/${searchQuery}`, {method: 'GET'})
      .then(res => {
        if(!res.ok){
          return Promise.reject(res.statusText);
        }
        return res.json();
      })
      .then(acadplans => {
        if(acadplans.acadplans){
          const existPlan = (acadplans.acadplans.map(plans => plans.plan));
            this.setState({
              plan: [...existPlan]
            }) 
          this.setState({
            existingPlan: acadplans.acadplans,
            oldPlan: acadplans.acadplans.plan
          })
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  setPlan = (newPlan) => {
    this.setState({
      plan: [...this.state.plan, newPlan]
    })
  }

  componentWillMount(){
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox = (label, withinLimit) => {
    let checkedPlan = [];
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
      const cPlan = `${this.state.semester} ${this.state.year}, ${label}`;
      let tempPlan = this.state.plan;
      let newPlanArray = [].concat.apply([], tempPlan);

      const i = newPlanArray.indexOf(cPlan);
      if(i !== -1){
        const deletePlan = newPlanArray.splice(i, 1);
        this.setState({
          plan: newPlanArray
        })
      };
      this.setState({
        selectedCount: this.state.selectedCount - 1
      })

    } else {
        if(withinLimit){
          this.setState({
            information: ''
          });
          this.selectedCheckboxes.add(label);
          checkedPlan = checkedPlan.concat(`${this.state.semester} ${this.state.year}, ${label}`);
          let newArray = [];
          newArray = newArray.concat(this.state.plan, checkedPlan);
          let flatPlan = [].concat.apply([], newArray);
          this.setState({
            plan: flatPlan
          });
          this.setState({
            selectedCount: this.state.selectedCount + 1
          })
        } else {
          this.setState({
            information: 'Maximum selection reached or course already planned'
          })
        }
      }

      this.handleButton();
  }

  setNewPlan(nPlan){
    this.setState({
      newPlan: [...this.state.newPlan, nPlan]
    })
  };

  handleChange(e){
    this.setState({
      newPlan: e
    })
  }

  resetSelectedCount(){
    this.setState({
      selectedCount: 0
    });
  }

  handleButton = () => {
    const selectedCheckboxes = [...this.selectedCheckboxes]
    if(selectedCheckboxes.length > 0){
      this.setState({
        buttonStatus: false
      });
    }else {
      this.setState({
        buttonStatus: true
      });  
    }   
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    this.onSubmit();
  }

  removeDuplicates = (dupPlan) => {
      return dupPlan.filter(function(elem, pos, arr) {
        return arr.indexOf(elem) === pos;
      });
  }

  onSubmit = () => {
    const dupPlan = this.state.plan;
    const uniquePlan =this.removeDuplicates(dupPlan);

    this.setState({
      plan: uniquePlan
    });

    if((this.state.existingPlan.length === 0 && 
      this.state.semester.trim() !== '' && this.state.year.trim() !== '')){
      const plans = {
        username: this.props.currentUser.username,
        firstname: this.props.currentUser.firstName,
        lastname: this.props.currentUser.lastName,
        programcode: this.props.currentUser.programcode,
        plan: uniquePlan
      }
      const searchQuery = `?username=${plans.username}`;
      this.props
              .dispatch(createNewPlan(plans))
              .then(() => {
                this.props.dispatch(fetchAcadPlans(searchQuery));
              })
              .then(() => {
                  this.setState({
                    buttonStatus: true
                  })                                        
                  this.props.history.push({
                    pathname: '/dashboard',
                    state: {detail: plans}
                  });
              })
              .catch(err => {
                console.log(err);
              })
    } else {
      if(this.state.existingPlan.length > 0 && this.state.semester.trim() !== '' && this.state.year.trim() !== ''){

        let tempPlan = this.state.plan;
        const newPlanArray = [].concat.apply([], tempPlan);
        const uniqueNewPlanArray = this.removeDuplicates(newPlanArray);


        this.setState({
          plan: uniqueNewPlanArray
        });

        const plans = {
          username: this.props.currentUser.username,
          firstname: this.props.currentUser.firstName,
          lastname: this.props.currentUser.lastName,
          programcode: this.props.currentUser.programcode,
          plan: uniqueNewPlanArray
        }
        const searchQuery = `?username=${plans.username}`;
        const userId = this.state.existingPlan.map(plans => plans.id)[0];
        plans.id = userId;
        fetch(`${API_BASE_URL}/acadplan/${userId}`, {
          method: 'PUT',
          body: JSON.stringify(plans),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(() => {
          this.props.dispatch(fetchAcadPlans(searchQuery));
        })
        .then( () => {
              this.props.history.push({
                        pathname: '/dashboard',
                        state: {detail: plans}
                        })
        })
        .then(() => console.log('Updated!'))
                    
        }
    }
  }

  createCheckbox = (label, index) => (
    <Checkbox
      label={label}
      handleCheckboxChange={this.toggleCheckbox}
      key={label}
      checkboxStatus={this.state.checkboxStatus}
      selectedCountPerGroup={this.props.selectedCountPerGroup}
      selectedCheckboxes={this.selectedCheckboxes}
      plan={this.state.plan}
      groupcourses={this.props.groupcourses}
      setExceedsMaxGroupSelection={this.setExceedsMaxGroupSelection}
      clearInformation={this.clearInformation}
    />
  )

  createCheckboxes = () => (
    this.props.groupcourses.map(courseLists => 
      courseLists.map((course, index) => 
        this.createCheckbox(`${course[0]}, ${course[1]}, ${course[2]}, ${course[3]}, ${course[4]}`, index)))
  )

  setSemester = (event) => {
    this.setState({
      semester: event,
      inputBoxStatus: event.trim() === 'Choose...'
    });
    
  }

  setYear = (event) =>{
    this.setState({
      year: event,
      checkboxStatus: (event < new Date().getFullYear() || isNaN(event.trim()) || event.trim().length !== 4)
    })
    
  }

  setExceedsMaxGroupSelection=()=>{
    this.setState({
      exceedsMaxGroupSelection: true
    });

    if(this.state.exceedsMaxGroupSelection){
      this.selectedCheckboxes.clear();
      this.setState({
        selectedCount: 0
      })
    }
 
  }

  clearInformation = () =>{
    this.setState({
      information: ''
    });
  }
  
  refreshPage(){
    window.location.reload();
  }

  render() {
    return (
      <SelectionsPage>
        <div className="checkbox-creator" id="checkbox-creator">
          
            <div className="checkboxes">
              <form onSubmit={this.handleFormSubmit}>
                <label>
                  Enter a year (YYYY), select a semester and courses to plan your program
                </label>
                <InputGroupList 
                  setYear={this.setYear}
                  yearValue={this.state.year} 
                  setSemester={this.setSemester}
                  semesterValue={this.state.semester}
                  semesterSelection={this.state.semesterSelection}
                  inputBoxStatus={this.state.inputBoxStatus}
                  selectedCount={this.state.selectedCount}

                />
                  <br />
                  <br />
                <label className="selection">
                    Select Courses(Total Selected:
                    <span className="badge badge-warning badge-pill">
                       {this.state.selectedCount}
                    </span>
                  )</label>
                  <br />
                  <br />
                 <h5>
                    <label>Title, Course Code, Credit Hours, Group, Max Selection</label>
                  </h5>
                  
                 <label className="warning">{this.state.information}</label>
                  {this.createCheckboxes()}
                  <button className={`btn btn-lg btn-success`} 
                          disabled={this.state.buttonStatus} 
                          type="submit"
                          >Save</button>

                  <button className={`btn btn-lg btn-warning`} 
                          disabled={this.state.buttonStatus} 
                          type="submit"
                          onClick={this.refreshPage}
                          >Start Over</button>
              </form>
            </div>
          </div>
        
      </SelectionsPage>
    )
  }
}


function mapStateToProps(state, ownProps){
  let groupId ='';
  if(ownProps.match) {
    groupId = ownProps.match.params.group;
  }
  let courses =[];
  let programcode = '';
  if(state.catalogReducer.coursecatalog){
      courses = state.catalogReducer.coursecatalog.map(catalog => 
              catalog.courses.map(courses => 
              courses.split(','))).map(course => 
              course.filter(elem => 
              Number(elem[3]) === Number(groupId)));

    programcode= state.catalogReducer.coursecatalog.map(catalog => `${catalog.programTitle}`);
  }
  return {
          coursecatalog: state.catalogReducer.coursecatalog,
          groupcourses: courses,
          currentUser: state.auth.currentUser,
          programcode: programcode,
          plan: state.catalogReducer.plan
    }

};


export default requiresLogin()(connect(mapStateToProps)(CheckboxApp));


