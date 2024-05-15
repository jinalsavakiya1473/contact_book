import React, { useEffect} from 'react'
import Header from './Header'
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validate = Yup.object({
  first: Yup.string()
            .matches(/^[A-Za-z]+$/, 'First name must contain only letters')
            .min(2, 'First name must be at least 2 characters')
            .required('First name must be required...!'),
  last:Yup.string()
          .matches(/^[A-Za-z]+$/, 'First name must contain only letters')
          .min(2, 'First name must be at least 2 characters')
          .required('Last name must be required...!'),
  mobile:Yup.string()
            .matches(/^[0-9]+$/, 'Mobile number must contain only numbers')
            .min(10, 'Mobile number must be exactly 10 digits')
            .max(10, 'Mobile number must be exactly 10 digits')
            .required('Mobile number must be required...!'),
  email:Yup.string()
           .email('Invalid email address')
           .required('Email must be required...!'),
  nick:Yup.string().required('Nickname must be required...!')
})

function Addcont() {

  useEffect(() => {
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3MTU3ODUwMjIzNTItNjg3MDQ4MTI0IiwiaWF0IjoxNzE1Nzg1MDIyLCJleHAiOjE3MTU5NTc4MjJ9.WPgw-rCRbFUrw-M763tLjnroFE5MDKFOrrR0tLXwecE')
  }, []);

  const token = localStorage.getItem('token')

  const formik = useFormik({
    initialValues: {
      first: '',
      last:'',
      mobile:'',
      email:'',
      nick:''
    },
    validationSchema: validate,
    onSubmit: values => {
      axios.post('https://service.apikeeda.com/contact-book', {
        firstName: values.first,
        lastName: values.last,
        mobileNo: values.mobile,
        email: values.email,
        nickName: values.nick
      },
      {
        headers: {
          Authorization: token
        }
      })
      .then((res) => {
        formik.resetForm()
        console.log('Contact added successfully');
      })
      .catch((error) => {
        console.log('Error adding contact:', error);
      });
    }
  })

  return (
    <div>
      <Header />
      <div className="add d-flex justify-content-center">
        <div className="main">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <input type="text" name='first' className='form-control' placeholder='First Name' value={formik.values.first} onChange={formik.handleChange}/>
              {(formik.errors.first && formik.touched.first) ? <div className='form-text text-danger'>{formik.errors.first}</div> : null}
            </div>
            <div className="mb-3">
              <input type="text" name='last' className='form-control' placeholder='Last Name' value={formik.values.last} onChange={formik.handleChange} />
              {(formik.errors.last && formik.touched.last) ? <div className='form-text text-danger'>{formik.errors.last}</div> : null}
            </div>
            <div className="mb-3">
              <input type="text" name='mobile' className='form-control' placeholder='Mobile No' value={formik.values.mobile} onChange={formik.handleChange}/>
              {(formik.errors.mobile && formik.touched.mobile) ? <div className='form-text text-danger'>{formik.errors.mobile}</div> : null}
            </div>
            <div className="mb-3">
              <input type="email" name='email' className='form-control' placeholder='Email' value={formik.values.email} onChange={formik.handleChange} />
              {(formik.errors.email && formik.touched.email) ? <div className='form-text text-danger'>{formik.errors.email}</div> : null}
            </div>
            <div className="mb-4">
              <input type="text" name='nick' className='form-control' placeholder='nickName' value={formik.values.nick} onChange={formik.handleChange} />
              {(formik.errors.nick && formik.touched.nick) ? <div className='form-text text-danger'>{formik.errors.nick}</div> : null}
            </div>
            <div className='text-center'>
              <button type='submit'>Add Contents</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Addcont
