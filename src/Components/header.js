import React from "react";
import { Link } from "react-router-dom";
import "../index.css"

const Header = ()=>{

    return (
        <div className="header">
            <header>
                <Link to={'/home'}>
                    <h1>Quizee</h1>
                </Link>
                <p>
                    An trivial knowledge assessment website
                </p>
            </header>
        </div>
    )
}
export default Header;