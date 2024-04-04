import React from "react";
import AuthForm from "../../Components/AuthForm";

export default function Signup() {
    return <AuthForm route="/api/user/register" method="signup"/>
}