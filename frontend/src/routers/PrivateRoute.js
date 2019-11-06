import React, { Component } from "react";
import { Route, Redirect }  from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    userObject: PropTypes.object.isRequired
  }


const PrivateRoute = ({ isAuthenticated, userObject, component:Component, ...rest}) => (
    <Route
        {...rest}
        render={props => {
            console.log(`props.whatever is ${isAuthenticated}`);
            return (
                isAuthenticated  ? (<Component {...props} />)
                : (
                    <Redirect to= {{
                        pathname: "/users/loginpage",
                        // state: { from: props.location }
                        }}
                    />
                )
            )
        }
        }
    />
);


const mapStatetoProps = state => ({
    // TEMPLATE
    // propYouWantInserted : state.ItemName,
    authAction: state.auth,
    isAuthenticated: state.auth.isAuthenticated,
    userObject: state.auth.user,
    error: state.error
  });


export default connect(
    mapStatetoProps,
)(PrivateRoute);