import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../styles/pages_styles/BookDisplay.css";

const registrationDetails = [
    { detail: "User Name", placeholder: "abc", name: "userName", type: "text" },
    { detail: "User Contact", placeholder: "1547856952", name: "userContact", type: "tel" },
    { detail: "User Email", placeholder: "abc@gmail.com", name: "userEmail", type: "email" },
    { detail: "User Password", placeholder: "password", name: "userPassword", type: "password" },
    { detail: "confirm Password", placeholder: "conform password", name: "userConfirmPassword", type: "password" },
    { detail: "User Address", placeholder: "21 no,abc street,abc area", name: "userAddress", type: "text" }
];

// Validation Schema
const validationSchema = Yup.object().shape({
    userName: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "User Name cannot contain numbers")
        .required("User Name is required"),
    userContact: Yup.string()
        .matches(/^\d+$/, "User Contact must contain only numbers")
        .min(10, "User Contact must be at least 10 digits")
        .max(10, "User Contact must be  10 digits not more")
        .required("User Contact is required"),
    userEmail: Yup.string()
        .email("Invalid email format")
        .required("User Email is required"),
    userPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("User Password is required"),
    userConfirmPassword: Yup.string()
        .oneOf([Yup.ref("userPassword")], "Passwords must match"),
    userAddress: Yup.string()
        .required("User Address is required"),
});

const BookDisplay = () => {
    const [flippedPages, setFlippedPages] = useState(0);
    const [frontPageDisplay, setFrontPageDisplay] = useState(1);
    const [bookCoverOpen, setBookCoverOpen] = useState(false);
    const [backBookCoverOpen, setBackBookCoverOpen] = useState(false);
    const [userInfo, setUserInfo] = useState([])

    const flipPage = (direction, values, errors) => {
        if (!bookCoverOpen) {
            setBookCoverOpen(true);
        } else if (backBookCoverOpen) {
            setBackBookCoverOpen(false);
        } else {
            const currentField = registrationDetails[flippedPages]?.name;

            if (direction === "next") {
                if (!errors[currentField] && values[currentField]) {
                    setFlippedPages((prev) => prev + 1);
                    setFrontPageDisplay((prev) => prev + 1);

                    setUserInfo((prev) => ({
                        ...prev,
                        [currentField]: values[currentField],
                    }));

                }
            } else if (direction === "prev") {
                if (!errors[currentField]) {
                    setFlippedPages((prev) => Math.max(prev - 1, 0));
                    setFrontPageDisplay((prev) => Math.max(prev - 1, 1));
                }
            }

            if (direction === "prev" && flippedPages === 0) {
                setBookCoverOpen(false);
            }

            if (direction === "next" && flippedPages === registrationDetails.length) {
                setBackBookCoverOpen(true);
            }
        }
    };

    const getAutoCompleteValue = (fieldName, values) => {
        const autoCompleteValues = {
            userName: "name",
            userContact: "tel",
            userEmail: "email",
            userPassword: "new-password",
            userConfirmPassword: values.userPassword,
            userAddress: "street-address"
        };
        return autoCompleteValues[fieldName] || "off";
    };


    return (
        <Formik
            initialValues={{
                userName: "",
                userContact: "",
                userEmail: "",
                userPassword: "",
                userConfirmPassword: "",
                userAddress: "",
            }}
            validationSchema={validationSchema}
            validateOnChange
            validateOnBlur
            onSubmit={
                (values, actions) => {
                    const fromData = {
                        userName: values?.userName,
                        userContact: values?.userContact,
                        userEmail: values?.userEmail,
                        userPassword: values?.userPassword,
                        userAddress: values?.userAddress,
                    }

                    const userData = JSON.stringify(fromData)
                    console.log("data base store Data:", userData);

                    setTimeout(async () => {
                        if (userData) {
                            const response = await fetch("https://localhost:8080/api/v1/users/register", {
                                method: "post",
                                body: userData,
                                headers: {
                                    'content-Type': 'application/json'
                                }
                            })
                            const Data = await response.json();

                            console.log("api response",Data)
                        }

                    });



                }

            }
        >
            {(
                {
                    values,
                    errors,
                }) => (
                <Form className="Book_Body">
                    {/* Left Arrow Button */}
                    {
                        bookCoverOpen ?
                            <button
                                className={`prev_button ${bookCoverOpen && !backBookCoverOpen ? "prve_button_move" : ""}`}
                                type="button"
                                onClick={() => flipPage("prev", values, errors)}
                            >
                                <i className="fa fa-arrow-circle-left"></i>
                            </button>

                            : null
                    }

                    {/* Book Pages */}
                    <div
                        className={`Book ${bookCoverOpen && !backBookCoverOpen ? "Book_move" : ""}  
                        ${flippedPages === registrationDetails.length && backBookCoverOpen ? "Book_current_location" : ""}`}
                    >
                        {/* Front Book Cover */}
                        <div className={`Book_front_cover ${bookCoverOpen ? "front_cover_opened" : "front_cover_close"}`}>
                            <div className="front" >
                                {/* <div className="front" id={!bookCoverOpen ? "p1" : "p2"}> */}
                                <div className="Book_Cover_front_Content">
                                    <h1>User Registration Book</h1>
                                </div>
                            </div>
                            <div className="back">
                                <div className="Book_Cover_back_Content">
                                    <h1>Fill all fields</h1>
                                </div>
                            </div>
                        </div>

                        {/* Pages */}
                        <div className="Book_pages">
                            {registrationDetails.map((item, index) => (
                                <div
                                    key={index}
                                    id={frontPageDisplay === index + 1 ? "p1" : "p2"}
                                    className={`page ${flippedPages >= index + 1 ? "flipped" : ""}`}
                                >
                                    <div className="front">
                                        <div className="front-content">
                                            <div className="user_info">
                                                <h1>{item.detail}</h1>
                                            </div>
                                            <div className="user_info_input">
                                                <Field
                                                    type={item.type}
                                                    name={item.name}
                                                    placeholder={item.placeholder}
                                                    autoComplete={getAutoCompleteValue(item.name, values)}
                                                />
                                                <ErrorMessage name={item.name} component="span" className="error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="back">
                                        <div className="back-content">
                                            <div className="user_submitted_info">
                                                <h1>Submitted Details</h1>
                                                {Object.entries(userInfo).map(([key, value]) => (
                                                    <div key={key} className="user_Data">
                                                        <strong className="info_title">{key} <span>:</span></strong>
                                                        <span className={`user_value ${key === "userPassword" || key === "userConfirmPassword" ? "Password" : null}`} > {value} </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Back Book Cover */}
                        <div className={`Book_front_cover ${!backBookCoverOpen ? "Back_cover_opened" : "Back_cover_close"}`}>
                            <div className="front" >
                                {/* <div className="front" id={!backBookCoverOpen ? "b1" : "p2"}> */}
                                {
                                    registrationDetails.length === flippedPages ?
                                        <div className="Book_Cover_front_Content">
                                            <h1>Check the side information you provided. If all the details are accurate, click the button below to register</h1>
                                            <button type="button" onClick={() => flipPage("next", values, errors)}>
                                                register
                                            </button>
                                        </div>
                                        : null
                                }
                            </div>
                            <div className="back">
                                <div className="Book_Cover_back_Content">
                                    <h1>Click the 'Below' button to confirm your registration</h1>
                                    <button type="submit" >
                                        confirm register
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Arrow Button */}
                    {registrationDetails.length !== flippedPages ?
                        <button
                            className={`next_button ${bookCoverOpen && !backBookCoverOpen ? "next_button_move" : ""}`}
                            type="button"
                            onClick={() => flipPage("next", values, errors)}
                        >
                            <i className="fa fa-arrow-circle-right"></i>
                        </button>
                        : null
                    }
                </Form>
            )}
        </Formik>
    );
};

export default BookDisplay;
