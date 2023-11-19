import { useCallback, useContext, useState } from "react";
import AuthContext from "../providers/AuthProvider";
import axios, { setToken } from "../libs/axios";

function Login() {
    const { setAuth } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [succes, setSucces] = useState(false);
    const [errMsg, seterrMsg] = useState("");
    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                const response = await axios.post(
                    "login",
                    JSON.stringify({ email, password: pwd }),
                    { headers: { "Content-Type": "application/json" } }
                );
                console.log(response?.data);
                const token = response?.data?.token;
                setAuth({ email, token });
                setToken(token);
                setEmail("");
                setPwd("");
                seterrMsg("");
                setSucces(true);
            } catch (error) {
                console.log(error);
                if (!error?.response) {
                    seterrMsg("No serve Response");
                } else if (error.response?.status === 400) {
                    seterrMsg("Missing User or PWd");
                } else if (error.response?.status === 401) {
                    seterrMsg("Unauthorized");
                } else {
                    seterrMsg("Login Failed");
                }
            }
        },
        [email, pwd, seterrMsg, setEmail, setPwd, setSucces, setAuth]
    );
    return (
        <>
            {succes ? (
                <section>
                    <h1>You are logged in</h1>
                </section>
            ) : (
                <section>
                    <p className={errMsg ? "errngs" : "offscreen"}>{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email address</label>
                        <br />
                        <input
                            type="email"
                            id="email"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                        <br />
                        <label htmlFor="password">Password</label>
                        <br />
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <br />
                        <button>Sign in</button>
                    </form>
                </section>
            )}
        </>
    );
}

export default Login;
