import { useEffect, useState, useContext } from "react";
import AuthContext from "../providers/AuthProvider";
import { Table } from "react-bootstrap";
import axios from "../libs/axios";

function Userlist() {
    const [users, setUsers] = useState([]);
    const { auth } = useContext(AuthContext)
    useEffect(() => {
        if (auth.token) {
            axios.get('users',).then((response) => {
                let userlist = response?.data?.data
                setUsers(userlist)
            }
            )
        }
    }, [setUsers, auth])
    return (
        <Table striped bordered hover variant='dark' id='user-list'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>
                            {user.id}
                        </td>
                        <td>
                            {user.first_name}
                        </td>
                        <td>
                            {user.last_name}
                        </td>
                    </tr>
                )
                )}

            </tbody>
        </Table>
    )
}

export default Userlist