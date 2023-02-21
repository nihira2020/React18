import { useState } from "react";
import {toast} from 'react-toastify'

const Registeration = () => {
    const [id, idchange] = useState('');
    const [name, namechange] = useState('');
    const [role, rolechange] = useState('');
    const [email, emailchange] = useState('');
    const [mobile, mobilechange] = useState('');
    const [password, pwchange] = useState('');
    const [address, addresschange] = useState('');
    const [isactive, activechange] = useState(false);

    const regobj={id,name,role,email,mobile,password,address,isactive};

    const handlesubmit=(e)=>{
        e.preventDefault();
       fetch("http://localhost:8000/user",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(regobj)
       }).then(res=>{
         toast.success('Registered successfully','Please contact admin for activation');
       }).catch((err)=>{
        console.log(err.message);
       })
    };

    return ( 
        <div>
              <div>

<form className="container" onSubmit={handlesubmit}>
    <div className="row">
        <div className="offset-lg-2 col-lg-8">
            <div className="card">
                <div className="card-header">
                    <h2>User Regsiteration</h2>
                </div>
                <div className="card-body">
                <div className="form-group">
                        <label>User Name</label>
                        <input value={id} onChange={e => idchange(e.target.value)} className="form-control"></input>
                    </div>
                    <div className="form-group">
                        <label>Name</label>
                        <input value={name} onChange={e => namechange(e.target.value)} className="form-control"></input>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input value={email} onChange={e => emailchange(e.target.value)} className="form-control"></input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input value={password} type="password" onChange={e => pwchange(e.target.value)} className="form-control"></input>
                    </div>
                    <div className="form-group">
                        <label>mobile</label>
                        <input value={mobile} onChange={e => mobilechange(e.target.value)} className="form-control"></input>
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <textarea value={address} onChange={e => addresschange(e.target.value)} className="form-control"></textarea>
                       
                    </div>

                </div>
                <div className="card-footer">
                    <button className="btn btn-success" type="submit">Register</button>
                </div>

            </div>

        </div>
    </div>

</form>
</div>
        </div>
     );
}
 
export default Registeration;