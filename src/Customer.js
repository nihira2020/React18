import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {toast} from "react-toastify";

const Customer = () => {

    const [custlist, custupdate] = useState(null);
    const navigate=useNavigate();

    const [haveadd, haveaddupdate] = useState(false);
    const [haveedit, haveeditupdate] = useState(false);
    const [havedelete, havedeleteupdate] = useState(false);

    const handleremove=(code)=>{

        if(window.confirm('do you want to remove this customer?')){
            fetch('http://localhost:8000/customer/'+code,{
                method:"DELETE"
            }).then(res => {
               toast.success('removed successfully.');
               navigate(0);
            }).catch((err) => {
                console.log(err.message);
            });
        }

    }

    useEffect(() => {
        getroleaccess();
        fetch('http://localhost:8000/customer').then(res => {
            return res.json();
        }).then(resp => {
            custupdate(resp);
        }).catch((err) => {
            console.log(err.message);
        });

    }, [])

    const getroleaccess=()=>{
        let userrole = localStorage.getItem('userrole') != null ? localStorage.getItem('userrole').toString() : '';
        fetch("http://localhost:8000/roleaccess?role="+userrole+"&menu=customer").then(res => {
            if(!res.ok){
                toast.warning('You are not autorized to access this menu');
                navigate('/');
            }
            return res.json();
        }).then(resp => {
            if(resp.length>0){
                let obj=resp[0];
                haveaddupdate(obj.haveadd);
                haveeditupdate(obj.haveedit);
                havedeleteupdate(obj.havedelete);
            }else{
                toast.warning('You are not autorized to access this menu');
                navigate('/');
            }
        }).catch((err) => {
            console.log(err.message);
        });

    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h2>Customer Listing</h2>
                </div>
                <div className="card-body">
                    <div>
                        <Link className="btn btn-success" to="/customer/create">Add Customer (+)</Link>
                    </div>
                <table className="table table-bordered">
                <thead className="bg-dark text-white">
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Area</td>
                        <td>CreditLimit</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {custlist &&
                        custlist.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.area}</td>
                                <td>{item.creditlimit}</td>
                                <td>
                                    <Link to={"/customer/edit/"+item.id} className="btn btn-primary">Edit</Link>
                                    <a onClick={()=>{handleremove(item.id)}} className="btn btn-danger">Remove</a>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
                </div>

            </div>

          
        </div>

    );
}

export default Customer;