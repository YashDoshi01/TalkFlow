import PropTypes from 'prop-types';
import { Outlet , Navigate } from "react-router-dom";

function PrivateRoutes({auth}) 
{
    return (
        auth ? <Outlet/> : <Navigate to="/login"/>
    ); 
}

PrivateRoutes.propTypes = {
    auth : PropTypes.bool.isRequired,
};   
export default PrivateRoutes;