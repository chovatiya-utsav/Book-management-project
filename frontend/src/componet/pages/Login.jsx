import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router";
import * as yup from "yup";
import "../../styles/pages_styles/Login.css";
import ForgetPasswordModal from "../commonComponet/ForgetPasswordModal";

const validationSchema = yup.object().shape({
    userContact: yup
        .string()
        .matches(/^\d+$/, "User Contact must contain only numbers")
        .min(10, "User Contact must be at least 10 digits")
        .max(10, "User Contact must be 10 digits not more")
        .required("User Contact is required"),
    userEmail: yup.string().email("Invalid email format").required("User Email is required"),
    userPassword: yup.string().min(6, "Password must be at least 6 characters").required("User Password is required"),
});

const Login = () => {
    const [loginContect, setLoginContect] = useState(false);
    const [isSubmittingForm, setIsSubmittingForm] = useState(false);
    const navigate = useNavigate();
    const [displayError, setDisplayError] = useState(false);
    const [userNotExists, setUserNotExists] = useState(false)
    const [modalOpen, setModalOpen] = useState(false);
    const [changePasswordConform, setChangePasswordConform] = useState(false)

    const closeModal = () => {
        setModalOpen(!modalOpen);
    };

    const changePassword = () => {
        setChangePasswordConform(true)
        setTimeout(() => {
            setChangePasswordConform(false)
        }, 2000);
    }

    const handelForgetPassword = () => {
        setModalOpen(true)
    }

    const navigateRegistration = () => {
        navigate("/registration");
    };

    const handelSubmit = (data, errors, resetForm) => {
        if (loginContect) {
            if (!errors.userContact && !errors.userPassword && data.userContact && data.userPassword) {
                const userLoginData = {
                    userPassword: data?.userPassword,
                    userContact: data?.userContact
                }

                const userData = JSON.parse(localStorage.getItem("userData"));

                const CheckUser = userData.find((item) => item?.userContact === data?.userContact)

                if (!CheckUser) {
                    console.log("user not ragistr please ragister first")
                    setUserNotExists(true)
                    setTimeout(() => {
                        setUserNotExists(false)
                    }, 4000);
                    resetForm()
                } else {
                    const CheckPassword = userData.find((item) => item?.userPassword === data?.userPassword)
                    if (!CheckPassword) {
                        setTimeout(() => {
                            setDisplayError(false)
                        }, 4000);
                        setDisplayError(!displayError)
                        resetForm()

                    } else {
                        localStorage.setItem("userLogin", JSON.stringify(data))
                        navigate("/Book-Management")
                    }
                }

                setIsSubmittingForm(true)
                console.log("contect", userLoginData);
            }
        } else {
            if (!errors.userEmail && !errors.userPassword && data.userEmail && data.userPassword) {
                const userLoginData = {
                    userEmail: data?.userEmail,
                    userPassword: data?.userPassword
                }

                const userData = JSON.parse(localStorage.getItem("userData"));

                const CheckUser = userData.find((item) => item?.userEmail === data?.userEmail)
                if (!CheckUser) {
                    console.log("user not ragistr please ragister first")
                    setUserNotExists(true)
                    setTimeout(() => {
                        setUserNotExists(false)
                    }, 4000);
                    resetForm()
                } else {
                    const CheckPassword = userData.find((item) => item?.userPassword === data?.userPassword)
                    if (!CheckPassword) {
                        setTimeout(() => {

                            setDisplayError(false);
                        }, 4000);
                        setDisplayError(!displayError);
                        resetForm()
                    } else {
                        console.log("user susecc fully login")
                        localStorage.setItem("userLogin", JSON.stringify(data))
                        navigate("/Book-Management")
                    }
                }
                setIsSubmittingForm(true)
                console.log("email", userLoginData);
            }

        }
    }

    return (
        <>
            <div className="login-form">
                {
                    changePasswordConform ?
                        <div className="change-password-info">
                            <h2> password change successfully</h2>
                        </div>
                        : null
                }

                <Formik
                    initialValues={{ userEmail: "", userPassword: "", userContact: "" }}
                    validationSchema={validationSchema}
                    validateOnBlur
                    validateOnChange

                >
                    {({ values, errors, isSubmitting, setErrors, resetForm }) => (
                        <Form className={`form ${isSubmittingForm ? "submitting" : ""}`}>
                            <div className={`ragistrtion-error ${displayError || userNotExists ? "showError" : ""}`} >
                                {displayError ? <h1>enter correct password</h1> : null}
                                {userNotExists ? <h1>please complit your ragistrtion</h1> : null}
                            </div>
                            <div className="login-heding">
                                <h1>Login</h1>
                            </div>
                            <div className="input-filed">
                                {!loginContect ? (
                                    <>
                                        <label htmlFor="email">Email</label>
                                        <Field type="email" name="userEmail" id="email" />
                                        <ErrorMessage name="userEmail" component="span" className="error" />
                                    </>
                                ) : (
                                    <>
                                        <label htmlFor="Contact">Contact</label>
                                        <Field type="tel" name="userContact" id="Contact" />
                                        <ErrorMessage name="userContact" component="span" className="error" />
                                    </>
                                )}
                            </div>
                            <div className="input-filed">
                                <div className="froget-password">
                                    <label htmlFor="password">Password</label>
                                    <h3 onClick={handelForgetPassword}>forget password</h3>
                                </div>
                                <Field type="password" name="userPassword" id="password" />
                                <ErrorMessage name="userPassword" component="span" />
                            </div>
                            <div className="button">
                                {!values.userEmail && !values.userContact ? (
                                    <button type="button" onClick={() => { setLoginContect(!loginContect); setErrors({}); }} className="login_type">
                                        {!loginContect ? "Login using contact" : "Login using email"}
                                    </button>
                                ) : null}
                                <div className="login_button">
                                    <button type="button" onClick={navigateRegistration}>
                                        Register
                                    </button>
                                    <button type="button" onClick={() => handelSubmit(values, errors, resetForm)} >
                                        Login
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className="form_modal">
                <ForgetPasswordModal modalOpen={modalOpen} closeModal={closeModal} changePassword={changePassword} />
            </div>
        </>
    );
};





export default Login;
