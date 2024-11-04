import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createEmployee, getEmployee } from "../services/EmployeeService";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errors,setErrors]=useState({
    firstName:'',
    lastName:'',
    email:''
  })

  const {id}=useParams();
  const navigator=useNavigate();

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const saveEmployee = (e) => {
    e.preventDefault();
    if(validateForm()){
      const employee={firstName,lastName,email};
      console.log(employee);
  
      createEmployee(employee).then((res)=>{
        console.log(res.data);
        navigator('/employees')
      })
    }
    
  };

  function validateForm(){
    let valid=true;

    const errorsCopy={...errors};

    if(firstName.trim()){
      errorsCopy.firstName='';
    }else{
      errorsCopy.firstName='First name is required'
    }

    if(lastName.trim()){
      errorsCopy.lastName='';
    }else{
      errorsCopy.lastName='Last name is required'
    }
    if(email.trim()){
      errorsCopy.email='';
    }else{
      errorsCopy.email='Email is required'
    }

    setErrors(errorsCopy);

    return valid;
  }

  function pageTitle(){
    if(id){
     return <h2 className="text-center">Update Employee</h2>
    }else{
     return <h2 className="text-center">Add Employee</h2>
    }
  }

  useEffect(()=>{
    if(id){
      getEmployee(id).then((res)=>{
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setEmail(res.data.email);
      }).catch((e)=>{
        console.log(e);

      })
    }
  })

  return (
    <div className="container">
        <br /><br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">First Name:</label>
                <input
                  type="text"
                  placeholder="Enter Employee First Name"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${errors.firstName?'is-invalid':''}`}
                  onChange={handleFirstName}
                ></input>
                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Last Name:</label>
                <input
                  type="text"
                  placeholder="Enter Employee Last Name"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${errors.lastName?'is-invalid':''}`}
                  onChange={handleLastName}
                ></input>
                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Email:</label>
                <input
                  type="text"
                  placeholder="Enter Employee Email"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email?'is-invalid':''}`}
                  onChange={handleEmail}
                ></input>
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <button className="btn btn-success" onClick={saveEmployee}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
