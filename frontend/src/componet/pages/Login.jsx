import React from 'react';
import { Formik } from 'formik'
import { useNavigate } from 'react-router';
import "../../styles/pages_styles/Registration.css"


const Login = () => {

    const navigat = useNavigate()

    const navigatRagistration = () => {
        navigat('/registration');
    }

    return (
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
                        const userData = JSON.parse(localStorage.getItem("user-data"));

                        if (!userData) {
                            alert("you are not ragister");
                            navigatRagistration();
                        } else {
                            const cheackUser = userData.find((item) => item?.email === values.email);
                            if (!cheackUser) {
                                alert("you are not ragister");
                                navigatRagistration();

                            } else {
                                const cheackUserPassword = userData.find((item) => item?.password === values.password);
                                if (cheackUserPassword) {
                                    localStorage.setItem("userLogin",JSON.stringify(cheackUserPassword))
                                    navigat('/Book-Management');
                                } else {
                                    alert("eamil or password not match")
                                }
                            }
                        }
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
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                        <button onClick={navigatRagistration}>
                            ragistration
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default Login
