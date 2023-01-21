import React , {useState} from 'react';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert'
import {useNavigate} from "@reach/router";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
from 'mdb-react-ui-kit';
import { registerAction } from "../../state/Actions/authActions";


const Register = () =>{
    const [file, setFile] = useState();
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        image: null
        });
        
        const { username, email, password, image } = formData;
        
        const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
        
        const onSubmit = async e => {
            e.preventDefault();
            const formData = new FormData();
            formData.append('image', image);
            formData.append('username', username);
            formData.append('email', email);
            formData.append('password', password);
            try {
                await registerAction(formData);
                alert('success', 'Registration successful');
                navigate("/");
            } catch (err) {
                alert('danger', err.response.data.msg);
            }
        };
        
        const handleChange = e => {
            setFormData({ ...formData, image: e.target.files[0] });


        };
    function handleSubmit(e) {
        e.preventDefault();

        console.log(file);
    }
    function handleDeleteFile(e) {
        e.preventDefault();
        setFile(null);
    }
    return (
        <MDBContainer fluid className="login-continer p-4">
          <MDBRow>
            <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
              <h1 className="login-title my-5 display-3 fw-bold ls-tight px-3">
                Perfumery <br />
                <span className="text-primary">for your business</span>
              </h1>
              <p className='px-3' style={{color: 'hsl(217, 10%, 50.8%)'}}>
                Wanna be a part of THE BIGGEST COMMUNITY OF PERFUME LOVERS? <br />
              </p>
            </MDBCol>
            <MDBCol md='6'>
              <MDBCard className='my-5'>
                <MDBCardBody className='p-5'>
                  <MDBRow>
                    <MDBCol col='6'>
                      <MDBInput wrapperClass='mb-4' label='First name' id='form1' type='text' onChange={onChange} name="username" value={username}/>
                    </MDBCol>
                    {/* <MDBCol col='6'>
                      <MDBInput wrapperClass='mb-4' label='Last name' id='form1' type='text' onChange={onChange} name="lastname" value={lastname}/>
                    </MDBCol> */}
                  </MDBRow>
                  <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' onChange={onChange} name="email" value={email}/>
                  <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' onChange={onChange} name="password" value={password}/>
                  <div className='d-flex justify-content-center mb-4'>
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                  </div>
                  <div className="App">
                    <h2>Add Image:</h2>
                    <input type="file" onChange={handleChange} />
                    <img src={file} />
                    <MDBBtn onClick={handleDeleteFile}>Delete File</MDBBtn>
                  </div> 
                  <MDBBtn onClick={onSubmit} className='w-100 mb-4' size='md'>sign up  <MDBIcon far icon='paper-plane' className='ms-2' />
                  </MDBBtn>
                    <p className='text-center'>
                        <a href='/login'>Already a member?</a>
                    </p>
                    
                </MDBCardBody>
                </MDBCard>
            </MDBCol>
            </MDBRow>
        </MDBContainer>

)      

} 

export default Register;