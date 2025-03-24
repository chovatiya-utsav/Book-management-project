import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router";
import * as yup from "yup";
import "../../styles/pages_styles/Login.css";
import ForgetPasswordModal from "../commonComponet/ForgetPasswordModal";
import useApiUrl from "../commonComponet/useApiUrl.js";


const validationSchema = yup.object().shape({
    userContact: yup
        .string()
        .matches(/^\d+$/, "User Contact must contain only numbers")
        .min(10, "User Contact must be at least 10 digits")
        .max(10, "User Contact must be 10 digits not more")
        .required("User Contact is required"),
    userEmail: yup.string().email("Invalid email format")
        .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, "Invalid email format")
        .required("User Email is required"),
    userPassword: yup.string()
        .min(6, "Password must be at least 6 characters")
        .max(10, "Password not more then 10 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[@$!%*?&]/, "Password must contain at least one special character (@, $, !, %, *, ?, &)")
        .required("User Password is required"),
});



const Login = () => {
    const baseUrl = useApiUrl()
    const [loginContect, setLoginContect] = useState(false);
    const [isSubmittingForm, setIsSubmittingForm] = useState(false);
    const navigate = useNavigate();
    const [displayError, setDisplayError] = useState(false);
    const [userNotExists, setUserNotExists] = useState(false)
    const [modalOpen, setModalOpen] = useState(false);
    const [changePasswordConform, setChangePasswordConform] = useState(false);
    const [autoLoginData, setAutoLoginData] = useState(null)


    const [message, setMessage] = useState(null);

    useEffect(() => {
        const initialMessage = JSON.parse(localStorage?.getItem("userExistError")) || null;
        const userRagistretionData = JSON.parse(localStorage?.getItem("userRagistretion")) || null;

        setMessage(initialMessage)
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);  // Clear the message
                localStorage.clear()
            }, 4000);

            return () => clearTimeout(timer); // Cleanup
        } else if (userRagistretionData) {

            autoLogin(userRagistretionData)

        }

    }, [message]);

    const autoLogin = async (userRagistretionData) => {
        const userLoginData = {
            email: userRagistretionData?.email,
            password: userRagistretionData?.password
        }

        const loginData = JSON.stringify(userLoginData);

        const response = await fetch(`${baseUrl}/api/v1/users/login`, {
            method: "post",
            body: loginData,
            headers: {
                'content-Type': 'application/json'
            },
            credentials: "include"
        })

        const responeData = await response.json()

        if (responeData.statuscode === 200) {
            setAutoLoginData(responeData.data)
            localStorage.clear()
            localStorage.setItem("userLogin", JSON.stringify(responeData.data.user))
            navigate("/Book-Management")
        } else {
            alert("somting went worng")
        }
    }

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

    const handelSubmit = async (data, errors, resetForm) => {
        if (loginContect) {
            if (!errors.userContact && !errors.userPassword && data.userContact && data.userPassword) {
                const userLoginData = {
                    password: data?.userPassword,
                    contactNo: data?.userContact
                }

                const loginData = JSON.stringify(userLoginData);

                const response = await fetch(`${baseUrl}/api/v1/users/login`, {
                    method: "post",
                    body: loginData,
                    headers: {
                        'content-Type': 'application/json'
                    },
                    credentials: "include"
                })

                const responeData = await response.json()
                console.log(responeData.statuscode)


                if (responeData.statuscode === 200) {
                    console.log("response", responeData.data.user);
                    localStorage.setItem("userLogin", JSON.stringify(responeData.data.user))
                    navigate("/Book-Management")
                }
                if (responeData.statuscode === 202) {
                    navigate("/admin-dashboard");  // Redirect admin to admin pane
                }


                if (responeData.statuscode === 404) {
                    setUserNotExists(true)
                    setTimeout(() => {
                        setUserNotExists(false)
                    }, 4000);
                    resetForm()
                } else if (responeData.statuscode === 401) {
                    setDisplayError(true)
                    setTimeout(() => {
                        setDisplayError(false)
                    }, 4000);
                    resetForm()
                }

                setIsSubmittingForm(true)
            }
        } else {
            if (!errors.userEmail && !errors.userPassword && data.userEmail && data.userPassword) {
                const userLoginData = {
                    email: data?.userEmail,
                    password: data?.userPassword
                }
                const loginData = JSON.stringify(userLoginData);


                const response = await fetch(`${baseUrl}/api/v1/users/login`, {
                    method: "post",
                    body: loginData,
                    headers: {
                        'content-Type': 'application/json'
                    },
                    credentials: "include"
                })

                const responeData = await response.json()

                if (responeData.statuscode === 200) {
                    localStorage.setItem("userLogin", JSON.stringify(responeData.data.user))
                    navigate("/Book-Management")
                } else if (responeData.statuscode === 404) {
                    setUserNotExists(true)
                    setTimeout(() => {
                        setUserNotExists(false)
                    }, 4000);
                    resetForm()
                } else if (responeData.statuscode === 401) {
                    setDisplayError(true)
                    setTimeout(() => {
                        setDisplayError(false)
                    }, 4000);
                    resetForm()
                }

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
                {message && <div className="change-password-info"><h2>{decodeURIComponent(message)}</h2></div>}


                <Formik
                    initialValues={
                        {
                            userEmail: autoLoginData?.email || "",
                            userPassword: autoLoginData?.password || "",
                            userContact: ""
                        }
                    }
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
