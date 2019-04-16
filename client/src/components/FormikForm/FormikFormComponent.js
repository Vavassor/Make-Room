import React from 'react';
import { Formik } from 'formik';

import Form from "react-bootstrap/Form";
// import FormControl from "react-bootstrap/FormControl";

const Basic = () => (
  <div>
    <h1>Anywhere in your app!</h1>
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        let errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email && errors.email}
          <input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {errors.password && touched.password && errors.password}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
          <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Blurb</Form.Label>
          <Form.Control 
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="aboutme" 
            value ={values.blurb} 
            as="textarea" 
            rows="3" 
            placeholder="Pithy Statement 140 Characters or less" 
            maxLength="140" 
          />
        </Form.Group>
        </form>
      )}
    </Formik>
  </div>
);

export default Basic;




