import { Link, useParams, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';



const Home = () => {

    const [people, setPeople] = useState([]);
    const history = useHistory();
    useEffect(() => {
        getPeople();

    }, []);

    const getPeople = async () => {
        const { data }=await axios.get('api/csv/getpeople');
        setPeople(data);
    }
    const onDeleteClick = async() => {
        await axios.post('api/csv/delete');
        getPeople();
        history.push('/');
    }


    return (

        <div className="container"><div>
            <h1>People</h1>
            <div>
                <button className="btn btn-danger col-md-6" onClick={onDeleteClick}>Delete All</button>
                <br />
                <br />
                <table className="table table-hover table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Email</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
 {people.map((person) => {
                                return <tr>
                                    <td>{person.id}</td>
                                    <td>{person.firstName}</td>
                                    <td>{person.lastName}</td>
                                    <td>{person.age}</td>
                                    <td>{person.email}</td>
                                    <td>{person.address}</td>
                                </tr>
                            })}


                    </tbody>
                </table>
            </div>
        </div>
        </div>

    )
}
export default Home;