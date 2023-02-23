import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [id, idchange] = useState('');
    const [password, pwchange] = useState('');

    const navigate = useNavigate();

    const validate = true;

    useEffect(() => {
        localStorage.clear();

    }, [])

    const handlesubmit = (e) => {
        e.preventDefault();
        functionvalidate();
        if (validate) {

            fetch("http://localhost:8000/user?id=" + id + "&password=" + password).then(res => {
                if (!res.ok) {
                    toast.error('Login Failed')
                }
                return res.json();
            }).then(res => {
                if (res.length > 0) {
                    let userobj = res[0];
                    if (userobj.isactive === true) {
                        localStorage.setItem('username', id);
                        localStorage.setItem('userrole', userobj.role);
                        navigate('/');
                    } else {

                        toast.error('User in InActive state, please contact admin for activation');
                    }

                } else {
                    toast.error('Login Failed')
                }

            });

        } else {
            toast.warning('Please enter valid credenetials & proceed');
        }
        // if (validate) {
        //     fetch("http://localhost:8000/user", {
        //         method: "POST",
        //         headers: { "content-type": "application/json" },
        //         body: JSON.stringify(regobj)
        //     }).then(res => {
        //         toast.success('Registered successfully', 'Please contact admin for activation');
        //     }).catch((err) => {
        //         console.log(err.message);
        //     })
        // } else {
        //     toast.warning('Please enter valid data & proceed');
        // }
    };

    const functionvalidate = () => {
        if (id.length === 0) {
            validate = false;

        }
        if (password.length === 0) {
            validate = false;
        }
    }

    return (
        <div>

            <form className="container" onSubmit={handlesubmit}>
                <div className="row">
                    <div className="offset-lg-2 col-lg-8">
                        <div className="card">
                            <div className="card-header">
                                <h2>User Login</h2>
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label>User Name <span className="text-danger">*</span></label>
                                    <input value={id} onChange={e => idchange(e.target.value)} className="form-control"></input>
                                </div>

                                <div className="form-group">
                                    <label>Password<span className="text-danger">*</span></label>
                                    <input value={password} type="password" onChange={e => pwchange(e.target.value)} className="form-control"></input>
                                </div>

                            </div>
                            <div className="card-footer">
                                <button className="btn btn-success" type="submit">Login</button>
                                <Link className="btn btn-primary" to="/register">New User?</Link>
                            </div>

                        </div>

                    </div>
                </div>

            </form>
        </div>
    );
}

export default Login;