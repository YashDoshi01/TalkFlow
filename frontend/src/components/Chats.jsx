import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

function Chats({handleLoggedin}) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        async function checkLogin() {
            // Check if the token exists
            if (!token) {
                navigate("/login");
                handleLoggedin(false);
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/api/auth/checklogin", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }), // Include the token in the request
                });

                if (!response.ok) {
                    // If response is not OK, handle it as an error
                    throw new Error('Failed to check login');
                }

                const data = await response.json();
                console.log(data); // For debugging

                // Adjust the condition based on your API response
                if (data.message !== "Logged in") {
                    navigate("/login");
                    handleLoggedin(false);
                } else {
                    // Optionally, you can handle successful login without navigating
                    // This will allow you to render chat UI directly
                }
            } catch (error) {
                console.error("Error checking login:", error);
                navigate("/login"); // Redirect to login on error
                handleLoggedin(false);
            }
            handleLoggedin(true);
        }

        checkLogin();
    }, [navigate, token,handleLoggedin]); // Include token in the dependency array

    return (
        <div className="chats-container">
            
        </div>
    );
};
Chats.propTypes={
    handleLoggedin: PropTypes.func.isRequired,
  }
export default Chats;
