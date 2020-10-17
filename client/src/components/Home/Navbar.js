import React from 'react';
import Logo from '../../assets/images/healthcare.png'

const navbar = props => (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className='container'>
            <a className="navbar-brand h1" href="/">
                <img src={Logo} width="30" height="30" className="d-inline-block align-top mx-2" alt="" loading="lazy"/>
                HEALTHGENICS
            </a>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <div className="ml-auto">
                    {props.children}
                </div>
            </div>
        </div>
    </nav>
);

export default navbar;