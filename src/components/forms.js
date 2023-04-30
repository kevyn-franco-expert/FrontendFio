import React from 'react';
import { useFormik } from 'formik';
import { Checkbox } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'

export default function forms({formType}) {

  const validate = values => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = 'Required';
    } else if (values.firstName.length > 15) {
      errors.firstName = 'Must be 15 characters or less';
    }
  
    if (!values.lastName) {
      errors.lastName = 'Required';
    } else if (values.lastName.length > 20) {
      errors.lastName = 'Must be 20 characters or less';
    }
  
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
  
    return errors;
  };
  
  const SignupForm = () => {
    const formik = useFormik({
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
      },
      validate,
      onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
      },
    });
    return (
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
        {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
  
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
        {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}
  
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
  
        <button type="submit">Submit</button>
      </form>
    );
  };
  
  const FormPreRegister = () => {
    const formik = useFormik({
      initialValues: {
        fullName: '',
        dni: '',
        phone: '',
        department: '',
        province: '',
        district: '',
        address: ''
      },
      validate,
      onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
      },
    });
    return (
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="firstName">Nombre completo</label>
        <input
          id="fullname"
          name="fullname"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.fullname}
        />
        {formik.errors.fullname ? <div>{formik.errors.fullname}</div> : null}
  
        <label htmlFor="lastName">DNI</label>
        <input
          id="dni"
          name="dni"
          type="tel"
          onChange={formik.handleChange}
          value={formik.values.dni}
        />
        {formik.errors.dni ? <div>{formik.errors.dni}</div> : null}
  
        <label htmlFor="email">Celular</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          onChange={formik.handleChange}
          value={formik.values.phone}
        />
        {formik.errors.phone ? <div>{formik.errors.phone}</div> : null}
        <label htmlFor="lastName">Departamento</label>
        <input
          id="department"
          name="department"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.department}
        />
        {formik.errors.department ? <div>{formik.errors.department}</div> : null}
        
        <label htmlFor="lastName">Provincia</label>
        <input
          id="province"
          name="province"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.province}
        />
        {formik.errors.province ? <div>{formik.errors.province}</div> : null}
        
        <label htmlFor="lastName">Distrito</label>
        <input
          id="district"
          name="district"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.district}
        />
  
      <label htmlFor="lastName">Dirección</label>
        <input
          id="address"
          name="address"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.address}
        />
        {formik.errors.address ? <div>{formik.errors.address}</div> : null}
  
        <Checkbox defaultChecked>Checkbox</Checkbox>
  
        <button type="submit">Siguiente</button>
      </form>
    );
  };

  const FormDefault = () => {
    return (
      <>
        <Box>
          <p>No Form selected..</p>
        </Box>
      </>
    )
  }
  
  const RenderForm = () => {
    if (formType === 'signup') {
      return <SignupForm />
    } else if (formType === 'preRegister') {
      return <FormPreRegister />
    } else {
      return <FormDefault />
    }
  }
  return (
    <>
      {
        <RenderForm />
      }
    </>
  )
}