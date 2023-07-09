import { auth, db, storage } from "../firebase/FirebaseInit";
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Nav } from 'react-bootstrap'




export function SignUp({ user, setUser, username, setUsername, hideNavbar, setHideNavbar }) {

      // User authentication
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    


    useEffect(() => {
        // Sets a new user if sign in state changes
        auth.onAuthStateChanged((authUser) => {
            if (authUser)
                setUser(authUser)
            else
                setUser(null)
        });
    }, [user, username])



    const signUp = (e) => {
        e.preventDefault()
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username,
                });
            })
            .catch((err) => (
                alert(err.message))
            )

        setUsername("")
        setEmail("")
        setPassword("")


        const uploadTask = storage.ref(`users/${username}`).put(user)


        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Progress function
                const progress = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
            },
            (error) => {
                // Displays error message if found
                alert(error.message)

            },
            () => {
                updateDatabase()
            }
        )

    }


    /**
     * Handles the uploading of the user to Firebase firestore by
     * Retrieving the URL of image just uploaded and add it to database
     */
    function updateDatabase() {
        storage
        .ref("users")
        .child(username)
        .getDownloadURL()
        .then((url) => {
            // Post user inside db
            const allUsers = db.collection('users')

            allUsers.doc().set({
                user: username,
            })
        })

        // auth
        //     .signInWithEmailAndPassword(email, password)
        //     .catch((err) => alert(err.message))
        setHideNavbar(prev => !prev)
    }





        

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', outline: '0.05px solid black', borderRadius: '10px', paddingBottom: '35px', width: '450px'}}>
            
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
                    placeholder="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
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
                <button type="submit" onClick={signUp}
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
                    Sign up
                </button>

                

                <Nav style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '5px'
                }}>
                    <Nav.Link to='/?' as={NavLink} style={{ color: '#0095f6', textDecoration: 'none', fontFamily: 'sans-serif', fontSize: '15px' }}>
                        Log in
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