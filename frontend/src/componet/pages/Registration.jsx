import React from 'react';
import { Formik } from 'formik';
import "../../styles/pages_styles/Registration.css"
import { useNavigate } from 'react-router';

const Registration = () => {

    const navigat = useNavigate();

    const navigatRagistration = () => {
        navigat("/Login")
    }

    return (
        <>
            <div className='form'>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={values => {
                        const errors = {};
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
                            const userData = JSON.parse(localStorage.getItem('user-data')) || [];
                            const matchUserData = userData.find((item) => item?.email === values.email);
                            if (!matchUserData) {
                                const userLoginData = [...userData, values];
                                localStorage.setItem("user-data", JSON.stringify(userLoginData));
                                navigat("/Login")
                            } else {
                                alert("match")
                            }
                            // console.log(matchUserData);
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
                            <span>

                                {errors.email && touched.email && errors.email}
                            </span>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            <span>

                                {errors.password && touched.password && errors.password}
                            </span>
                            <button type="submit">
                                Submit
                            </button>
                            <button onClick={navigatRagistration}>
                                Login
                            </button>
                        </form>
                    )}
                </Formik>
            </div >
        </>
    )
}

export default Registration;
