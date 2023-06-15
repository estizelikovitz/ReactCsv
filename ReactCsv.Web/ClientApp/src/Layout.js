import React from 'react';
import { Link } from 'react-router-dom';


const Layout = (props) => {

    return (

        <>
            <div>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>@ViewData["Title"] - _3_02HMWK</title>
                <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.min.css" />
                <link rel="stylesheet" href="~/css/site.css" />
            </div>
            <div>
                <header>
                    <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                        <div className="container">
                            <div className="navbar-brand" asp-area="" asp-controller="Home" asp-action="Index">CSV</div>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                                <ul className="navbar-nav flex-grow-1">

                                    <Link to='/' className='nav-link text-light'>
                                        <li className="nav-item">
                                            <div className="nav-link text-dark" >Home</div>
                                        </li>
                                    </Link>

                                    <Link to='/generate' className='nav-link text-light'>
                                        <li className="nav-item">
                                            <div className="nav-link text-dark" >Generate</div>
                                        </li>
                                    </Link>

                                    <Link to='/upload' className='nav-link text-light'>
                                        <li className="nav-item">
                                            <div className="nav-link text-dark" >Upload</div>
                                        </li>
                                    </Link>
                       
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
                <div className="container">
                    <main role="main" className="pb-3">
                        {props.children}
                    </main>
                </div>

            </div>
        </>
    )
}
export default Layout;