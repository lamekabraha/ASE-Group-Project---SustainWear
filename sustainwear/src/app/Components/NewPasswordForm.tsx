import React, {useState} from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";



export default async function NewPasswordForm(){
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const session = getServerSession(authOptions);


    return(
        <div>
            <form action="" method="post">
                <label htmlFor="currentPassword">Current Password</label>
                <input type="password" id="currentPassword" required/>
                <label htmlFor="newPassword">New Password</label>  
                <input type="password" id="newPassword" required />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" required />
                <button type="submit">Save</button>
            </form>
        </div>
    )

}