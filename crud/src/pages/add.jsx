import { useEffect, useState } from "react";
import './add.css'
import Header from "../components/header";
import { Link, useLocation } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
const Add = () => {
    // let location = useLocation()
    // console.log(location);
    // let deletestate = location.state ? location.state.delete : []
    // useEffect(()=>{
    //    if(deletestate && Array.isArray(deletestate))
    //     {
    //         setrecord(deletestate)
    //         localStorage.setItem('users',JSON.stringify(deletestate))
    //     }
    // },[deletestate])
  const Course = [
    "Full Stack Devloper",
    "Flutter Devloper",
    "Data Science",
    "C-C++",
    "Ui/Ux Designer",
    "Animation",
  ];
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [gender, setgender] = useState("");
  const [allcourse, setallcourse] = useState([]);
  const [date, setdate] = useState("");
  let data = localStorage.getItem("User")
    ? JSON.parse(localStorage.getItem("User"))
    : [];
  const [record, setrecord] = useState(data);
  const [status,setstatus] = useState("")
  const [showpassword,setshowpassword] = useState(true)
  const handlechangeCourse = (course, checked) => {
    let all = [...allcourse];
    if (checked) {
      all.push(course);
    } else {
      all = all.filter((val) => val != course);
    }
    setallcourse(all);
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    let obj = {
      id: Math.floor(Math.random() * 1000),
      name: name,
      email: email,
      password: password,
      gender: gender,
      course: allcourse,
      date: date,
      status : status
    };
    let allfield = [...record, obj];
    localStorage.setItem("User", JSON.stringify(allfield));
    setrecord(allfield);
    setname("");
    setemail("");
    setpassword("");
    setgender("");
    setallcourse([]);
    setdate("");
    setstatus("")
  };
  const handleclick = () => {
    setshowpassword(!showpassword)
  }
  return (
    <>
      <Header />

      <div className="container">
        <div className="row">
          <div className="col-8">
            <div className="d-flex justify-content-end">
              <Link to={`/view`} state={{data : record}}>
                <button className="btn btn-success btn-sm mb-2">View</button>
              </Link>
            </div>
            <form onSubmit={handlesubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => setname(e.target.value)}
                  value={name}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => setemail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="mb-3 input-password">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type={showpassword ? "password" : "text"}
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => setpassword(e.target.value)}
                  value={password}
                />
                <div className="eye-icon">
                    {
                        showpassword ? <FaEye onClick={handleclick}/> : <FaEyeSlash onClick={handleclick} />
                    }
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Gender
                </label>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      onChange={(e) => setgender(e.target.value)}
                      value="Male"
                      checked={gender === "Male"}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      Male
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      onChange={(e) => setgender(e.target.value)}
                      value="Female"
                      checked={gender === "Female"}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault2"
                    >
                      Female
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div>
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Course
                  </label>
                  {Course.map((val, i) => {
                    return (
                      <div className="form-check mt-2" key={i}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue
                          id="flexCheckDefault"
                          onChange={(e) =>
                            handlechangeCourse(val, e.target.checked)
                          }
                          checked={allcourse.includes(val)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          {val}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setdate(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Status</label>
                <select className="form-control" onChange={(e) => setstatus(e.target.value)} value={status}>
                  <option value="">--Select Status---</option>
                  <option value="UnActive">UnActive</option>
                  <option value="Active">Active</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Add;
