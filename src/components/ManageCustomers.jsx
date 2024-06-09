import React, {useState,useEffect} from 'react'
import './Managecust.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css';


const ManageCustomers = () => {

    let baseurl = 'https://cgv2.creativegalileo.com/api/V1/customer/filter?';
    


    const [custinfo , setCustinfo] = useState([])
    const [loading , setloading] = useState(true)
    const [decider, setDec] = useState(false)

    const handleFilter = (field) => (e) => {
        baseurl += `&${field}=${e.target.value}`;
        setDec(true);
    };


    const handlesearch=async()=>{
        if(decider)
            
            {
                baseurl += '&paginated=true&pageNo=1&pageSize=50'
               const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Yzg4ZjAwZi0wYWI4LTExZWUtOGZjOC0wYTU0NDNmNmE5NzgiLCJlbnRpdHlUeXBlIjoidXNlciIsInYiOiIwLjEiLCJpYXQiOjE3MDY1MDcxNjMsImV4cCI6MTczODA2NDc2M30.DLWxMAdaupi_559pwGdQyVH_rmQWS1zr_FZUJWp_w9U'
                {console.log(baseurl)}
                const response = await fetch(baseurl,{method :'GET', headers:{'content-Type':'application/json', 'Authorization': `Bearer ${token}`}});
            const result = await response.json();
            setCustinfo(result);
            setloading(false);
               }
            }
            
    useEffect(()=> {

        const fetchdata = async() =>{
            const url = 'https://cgv2.creativegalileo.com/api/V1/customer?paginated=true&pageNo=1&pageSize=50';
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Yzg4ZjAwZi0wYWI4LTExZWUtOGZjOC0wYTU0NDNmNmE5NzgiLCJlbnRpdHlUeXBlIjoidXNlciIsInYiOiIwLjEiLCJpYXQiOjE3MDY1MDcxNjMsImV4cCI6MTczODA2NDc2M30.DLWxMAdaupi_559pwGdQyVH_rmQWS1zr_FZUJWp_w9U'
         
            const response = await fetch(url,{method :'GET', headers:{'content-Type':'application/json', 'Authorization': `Bearer ${token}`}});
            const result = await response.json();
            setCustinfo(result);
            setloading(false);

        }; fetchdata();
    },[]
    )

    if (loading) {
        return <p>Loading...</p>;
    }
  return (
    <div>
 
    <p style={{fontSize:'35px'}}> Customers </p>
    <div className="searchbar">

    <input type="text" placeholder="CGID" onChange={handleFilter('cgId')} />
    <input type="text" placeholder="Name" onChange={handleFilter('name')} />
    <input type="text" placeholder="Dial Code" onChange={handleFilter('dialCode')} />
    <input type="text" placeholder="Mobile" onChange={handleFilter('mobile')} />
    <input type="text" placeholder="Email Id" onChange={handleFilter('email')} />
        <select placeholder="Status"> <option> Active </option> <option> Inactive </option> </select>

        <button type="button" className="btn btn-primary" onClick={handlesearch}>
      <i className="bi bi-search"></i> 
    </button>
    <button type="button" className="btn btn-primary" >
      <i className="bi bi-arrow-clockwise"></i> 
    </button>
    </div>

    <table>
    <thead>
    <tr>
    
    <th> CGID </th>
    <th> Name </th>
    <th> Dial Code </th>
    <th> Mobile </th>
    <th> Email </th>
    <th> status </th>
    </tr>
    </thead>
    <tbody>
    {custinfo.data.profiles && custinfo.data.profiles.length > 0 ? (
                        custinfo.data.profiles.map((onecust, indx) => (
                            <tr key={indx}>
                                <td>{onecust.cgId}</td>
                                <td>{onecust.name}</td>
                                <td>{onecust.dialCode}</td>
                                <td>{onecust.mobile}</td>
                                <td>{onecust.email}</td>
                                <td className={onecust.recordStatus === 'true' ? 'status-true' : 'status-false'}>
                                    {onecust.recordStatus === 'true' ? '✔' : '✘'}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No data available</td>
                        </tr>
                    )}
    </tbody>
    </table>
   
        
        

    </div>
  )
}

export default ManageCustomers