import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';



const Generate = () => {

    const [count, setCount] = useState();
    useEffect(() => {

    }, []);



    const onGenerateClick = async() => {

       window.location.href = await `/api/csv/generate?count=${count}`;

    }


    return (

        <div className="d-flex vh-100" style={{ marginTop: -70 }}>
            <div className="d-flex w-100 justify-content-center align-self-center">
                <div className="row">
                    <input type="text"  className="form-control-lg" placeholder="Amount" onChange={e => setCount(e.target.value)}/>
                </div>
                <div className="row">
                    <div className="col-md-4 offset-md-2">
                        <button className="btn btn-primary btn-lg" onClick={onGenerateClick}>Generate</button>
                    </div>
                </div>
            </div>
        </div>

            )
}
export default Generate;