import { auth, db, storage } from "../firebase/FirebaseInit";
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'
import { collection, getDocs } from "firebase/firestore"






export function Login({ user, setUser, username, setUsername }) {

      // User authentication
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    const login = (e) => {
        e.preventDefault()
        auth
          .signInWithEmailAndPassword(email, password)
          .catch((err) => alert(err.message))
        setEmail("")
        setPassword("")
    }
    


    useEffect(() => {
        // Sets a new user if sign in state changes
        auth.onAuthStateChanged((authUser) => {
            if (authUser)
                setUser(authUser)
            else
                setUser(null)
        });
    }, [user, username])





    return (
        <div 
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', outline: '0.05px solid black', borderRadius: '10px', paddingBottom: '35px', width: '450px'
            }}
        >
      
            <img
                src=" https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="Instagram original logo"
                style={{ width: '140px', height: '37px', marginTop: '50px'}}
            />

            <form style={{ 
                    width: '350px',
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '28px 0',
                    rowGap: '15px',
            }}>
                <input
                    placeholder="Email address"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    
                    
                />
                <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" onClick={login}
                    style={{     
                    backgroundColor: '#0095f6',
                    borderRadius: '4px',
                    color: '#fff',
                    padding: '5px 9px',
                    fontWeight: '600',
                    textAlign: 'center',
                    marginBottom: '-10px'
                    }}
                >
                    Log in
                </button>
                

                <Nav style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '5px'
                }}>
                    <Nav.Link to='/signup' as={NavLink} style={{ color: '#0095f6', textDecoration: 'none', fontFamily: 'sans-serif', fontSize: '15px' }}>
                        Sign up
                    </Nav.Link>
                </Nav>
          
                

            </form>
            <center className="authFooter">
                <small style={{color: 'rgb(172, 172, 172)'}}>
                    Instagram Clone by Robert Roach: {" "}
                    <a href="https://robertpatrickroach.com" style={{ color: '#0095f6' }}>My Website</a>
                </small>
            </center>
        </div>
    )
}