import React from 'react';

import {connect} from 'react-redux';


import { 
      createNewPlan, 
      fetchAcadPlans} from '../../actions/catalogActions'

import { ToastContainer, toast } from 'react-toastify';


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
      year: '',
      semester: '',
      semesterSelection:['Spring', 'Summer', 'Fall'],
      plan: [],
      existingPlan: {},
      oldPlan: [],
      newPlan: [],
      joinedPlan: []
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
            existingPlan: acadplans.acadplans
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

  toggleCheckbox = label => {
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
    }
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

  notify(type){
    return () => {
      switch (type) {
        case 'info':
          toast.info('Info message', {
            autoClose: 3000
          });
          break;
        case 'success':
          toast.success('Success message', {
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
        case 'warning':
          toast.warn('Warning message');
          break;
        case 'error':
          toast.error('Error message');
          break;
      }
    };
  };

  handleButton = () => {
      this.setState({
        buttonStatus: true
      }); 
    for (let checkbox of this.selectedCheckboxes) {
      if(checkbox && this.state.semester !== '' && this.state.year.trim().length === 4){
        this.setState({
          buttonStatus: false
        });
      }
    }
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    this.onSubmit();
  }

  onSubmit = () => {
    if((this.state.existingPlan.length === 0 && this.state.semester.trim() !== '' && this.state.year.trim() !== '')){
      const plans = {
        username: this.props.currentUser.username,
        firstname: this.props.currentUser.firstName,
        lastname: this.props.currentUser.lastName,
        programcode: this.props.currentUser.programcode,
        plan: this.state.plan
      }
      const searchQuery = `?username=${plans.username}`;
      return this.props
                    .dispatch(createNewPlan(plans))
                    .then(() => {
                      this.props.dispatch(fetchAcadPlans(searchQuery));
                    })
                    .then(() => {
                        this.props.history.push({
                          pathname: '/dashboard',
                          state: {detail: plans}
                        });
                        this.setState({
                          buttonStatus: true
                        })
                    })
                    .catch(err => {
                      console.log(err);
                    })
    } else {
      if(this.state.existingPlan.length > 0 && this.state.semester.trim() !== '' && this.state.year.trim() !== ''){
        let tempPlan = this.state.plan;
        const newPlanArray = [].concat.apply([], tempPlan);
        const plans = {
          username: this.props.currentUser.username,
          firstname: this.props.currentUser.firstName,
          lastname: this.props.currentUser.lastName,
          programcode: this.props.currentUser.programcode,
          plan: newPlanArray
        }
        const searchQuery = `?username=${plans.username}`;
        const userId = this.state.existingPlan.map(plans => plans.id)[0];
        
        plans.id = userId;
        return fetch(`${API_BASE_URL}/acadplan/${userId}`, {
          method: 'PUT',
          body: JSON.stringify(plans),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(() => {
          this.props.dispatch(fetchAcadPlans(searchQuery));
        })
        .then(this.props.history.push({
                        pathname: '/dashboard',
                        state: {detail: plans}
                        }))
        .then(() => console.log('Updated!'))
                    
        }
    }
  }

  createCheckbox = (label, index) => (
    <Checkbox
      label={label}
      handleCheckboxChange={this.toggleCheckbox}
      key={label}
      handleButtonStatus={this.handleButton}
      checkboxStatus={this.state.checkboxStatus}
    />
  )



  createCheckboxes = () => (
    this.props.groupcourses.map(courseLists => 
      courseLists.map((course, index) => 
        this.createCheckbox(`${course[0]}, ${course[1]}, ${course[2]}`, index)))
  )

  setSemester = (event) => {
    this.setState({
      semester: event,
      inputBoxStatus: event.trim() === 'Choose...'
    });

    this.handleButton();

  }

  setYear = (event) =>{
    this.setState({
      year: event,
      checkboxStatus: (event < new Date().getFullYear() || isNaN(event.trim()) || event.trim().length !== 4)
    })


    this.handleButton();
  }

  countSelectedCourses(){
    this.setState({
      selectedCount: this.state.selectedCount + 1
    })
  }

  render() {
    console.log(this.state.selectedCount);
    return (
      <SelectionsPage>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
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
                <h5>
                <label className="selection">
                  Select Courses from the Group (Count:
                  <span className="badge badge-warning badge-pill">
                     {this.state.selectedCount}
                  </span>
                  )
                </label>
                </h5>
                  {this.createCheckboxes()}
                  <button className={`btn btn-lg btn-success`} 
                          disabled={this.state.buttonStatus} 
                          type="submit"
                          >Save</button>

              </form>
            </div>
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
  
  const courses = state.catalogReducer.coursecatalog.map(catalog => 
              catalog.courses.map(courses => 
              courses.split(','))).map(course => 
              course.filter(elem => 
              Number(elem[3]) === Number(groupId)));

  return {
          coursecatalog: state.catalogReducer.coursecatalog,
          groupcourses: courses,
          currentUser: state.auth.currentUser,
          programcode: state.catalogReducer.coursecatalog.map(catalog => `${catalog.programTitle}`),
          plan: state.catalogReducer.plan
    }

};


export default requiresLogin()(connect(mapStateToProps)(CheckboxApp));


