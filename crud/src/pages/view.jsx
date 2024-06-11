import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/header";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
const View = () => {
  const navigate = useNavigate()
 let data = localStorage.getItem('User') ? JSON.parse(localStorage.getItem('User')) : []
 const [record,setrecord] = useState(data)
 const [filterRecord,setfilterRecord] = useState([])
 const [search,setsearch] = useState("")
 const [status,setstatus] = useState("")
 const [sort,setsort] = useState("")
 useEffect(()=>{
    let all = [...record]
    if(search)
      {
        all = all.filter(val => val.name.toLowerCase().includes(search.toLowerCase()))
      } 
      if(status)
        {
          all = all.filter(val => val.status == status)
        } 
        if(sort)
          {
            if(sort == 'asc'){
              all.sort((a,b)=>a.name.toLowerCase()>b.name.toLowerCase()?1 : -1)
            }
            else if(sort == 'dsc'){
              all.sort((a,b)=>a.name.toLowerCase()<b.name.toLowerCase()?1:-1)
            }
          }
      setfilterRecord(all)  
 },[search,status,sort])
 const  DeleteUser = (id) => {
  let d = record.filter(val => val.id != id)
  setfilterRecord(d)
  localStorage.setItem('User',JSON.stringify(d))
 }
  return (
    <>
      <Header />

      <div className="container mt-2">
        <div className="row">
          <div className="col-12">
            <div className="row">
            <div className="col-6">
              <input type="text" className="form-control" placeholder="Search Here.." onChange={(e) => setsearch(e.target.value)}/>
            </div>
            <div className="col-3">
              <select className="form-control" onChange={(e)=> setstatus(e.target.value)}>
                <option value="">--Select Status--</option>
                <option value="UnActive">UnActive</option>
                <option value="Active">Active</option>
              </select>
            </div>
            <div className="col-2">
              <select className="form-control" onChange={(e)=> setsort(e.target.value)}>
                <option value="">--Select Sort--</option>
                <option value="asc">A-Z</option>
                <option value="dsc">Z-A</option>
              </select>
            </div>
            <div className="col-1 d-flex justify-content-end">
              <Link to={`/`} >
                <button className="btn btn-success btn-sm mb-2">Add</button>
              </Link>
            </div>
            </div>
           
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Date</th>
                  <th scope="col">Course</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {filterRecord.map((val) => {
                  return (
                    <tr key={val.id}>
                      <th scope="row">{val.name}</th>
                      <td>{val.email}</td>
                      <td>{val.gender}</td>
                      <td>{val.date}</td>
                      <td>{val.course.join(' , ')}</td>
                      <td><button className={`btn ${val.status == "UnActive" ? `btn-danger` : `btn-success`}`}>{val.status}</button></td>
                      <td>
                        <button className="btn btn-danger me-2" onClick={()=> DeleteUser(val.id)}><FaTrash /></button>
                        <button className="btn btn-success" onClick={()=> navigate('/edit',{state:val})}><MdEdit /></button>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td>
              <Link to={`/`}>
                <button className="btn btn-success btn-sm mb-2 p-2 ms-2">Back</button>
              </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default View;
