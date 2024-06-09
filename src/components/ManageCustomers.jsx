import React, {useState,useEffect} from 'react'
import './Managecust.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css';


const ManageCustomers = () => {

    let baseurl = 'https://cgv2.creativegalileo.com/api/V1/customer/filter?';
    const [inputs, setInputs] = useState({
        cgId:'',
        name: '',
        dialCode: '',
        mobile: '',
        email: ''
    });
    


    const [custinfo , setCustinfo] = useState([])
    const [loading , setloading] = useState(true)
    const [decider, setDec] = useState(false)
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });

    };

   
    const handlesearch= async()=>{
        {console.log(inputs)}
        if(inputs.cgId.length>0){ 
            setDec(true);
            baseurl += '&cgId=' + inputs.cgId;
        }
        if(inputs.name.length>0){ 
            setDec(true);
            baseurl += '&name=' + inputs.name;
        }
        if(inputs.mobile.length>0){ 
            setDec(true);
            baseurl += '&mobile=' + inputs.mobile;
        }
        if(inputs.dialCode.length>0){ 
            setDec(true);
            baseurl += '&dialCode=' + inputs.dialCode;
        }
        if(inputs.email.length>0){ 
            setDec(true);
            baseurl += '&email=' + inputs.email;
        }
        if(decider){
      const decidingfunc= async()=>{

                baseurl += '&paginated=true&pageNo=1&pageSize=50'
               const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Yzg4ZjAwZi0wYWI4LTExZWUtOGZjOC0wYTU0NDNmNmE5NzgiLCJlbnRpdHlUeXBlIjoidXNlciIsInYiOiIwLjEiLCJpYXQiOjE3MDY1MDcxNjMsImV4cCI6MTczODA2NDc2M30.DLWxMAdaupi_559pwGdQyVH_rmQWS1zr_FZUJWp_w9U'
                {console.log(baseurl)}
                const response = await fetch(baseurl,{method :'GET', headers:{'content-Type':'application/json', 'Authorization': `Bearer ${token}`}});
            const result = await response.json();
            setCustinfo(result);
            setloading(false);
      }
        }}


        
   
        const fetchdata = async() =>{
            const url = 'https://cgv2.creativegalileo.com/api/V1/customer?paginated=true&pageNo=1&pageSize=50';
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Yzg4ZjAwZi0wYWI4LTExZWUtOGZjOC0wYTU0NDNmNmE5NzgiLCJlbnRpdHlUeXBlIjoidXNlciIsInYiOiIwLjEiLCJpYXQiOjE3MDY1MDcxNjMsImV4cCI6MTczODA2NDc2M30.DLWxMAdaupi_559pwGdQyVH_rmQWS1zr_FZUJWp_w9U'
         
            const response = await fetch(url,{method :'GET', headers:{'content-Type':'application/json', 'Authorization': `Bearer ${token}`}});
            const result = await response.json();
            setCustinfo(result);
            setloading(false);}

        useEffect(() => {
                if (!decider) {
                    fetchdata();
                }
            }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        setloading(true);
    };

    const handleSort = () => {
        const sortedData = [...custinfo.data.profiles].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.cgId.localeCompare(b.cgId);
            } else {
                return b.cgId.localeCompare(a.cgId);
            }
        });
        setCustinfo({ ...custinfo, data: { ...custinfo.data, profiles: sortedData } });
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    if (loading) {
        return <p>Loading...</p>;
    }
  return (
    <div>
 
    <p style={{fontSize:'35px'}}> Customers </p>
    <div className="searchbar">
    <form onSubmit={handlesearch}>

    <input name="cgId" value={inputs.cgId} onChange={handleChange} placeholder="CGID" />
    <input name="name" value={inputs.name} onChange={handleChange} placeholder="NAME" />
    <input name="dialCode" value={inputs.dialCode} onChange={handleChange} placeholder="Dial Code" />
    <input name="mobile" value={inputs.mobile} onChange={handleChange} placeholder="Mobile No." />
    <input name="email" value={inputs.email} onChange={handleChange} placeholder="Email" />
   
        <select placeholder="Status"> <option> Active </option> <option> Inactive </option> </select>

        <button type="submit" className="btn btn-primary">
      <i className="bi bi-search"></i> 
    </button>
    <button type="button" className="btn btn-primary" >
      <i className="bi bi-arrow-clockwise"></i> 
    </button>
    </form>
    </div>

    <table>
    <thead>
    <tr>
    
    <th onClick={handleSort} style={{ cursor: 'pointer' }}>
    CGID {sortOrder === 'asc' ? '▲' : '▼'} </th>
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
    <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <span>Page {currentPage}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={custinfo.data.profiles.length < pageSize}>Next</button>
    </div>
        
        

    </div>
  )
}

export default ManageCustomers;