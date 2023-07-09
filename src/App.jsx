import { db, auth } from "./firebase/FirebaseInit"
import { useEffect, useState } from 'react'
import './App.css'
import { Container, Nav } from "react-bootstrap"
import { Routes, Route } from 'react-router-dom'
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { Login } from './pages/Login'
import { SignUp } from './pages/SignUp'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { Explore } from './pages/Explore'
import { Reels } from './pages/Reels'
import { Messenger } from './pages/Messenger'
import { Likes } from './pages/Likes'
import { NavLink } from 'react-router-dom'

import { BottomNavbar } from './components/BottomNavbar'
import { SideNavbar } from './components/SideNavbar'
import { PopupSearch } from "./components/PopupSearch"






function App() {


  const [posts, setPosts] = useState([]);
  const [postSet, setPostSet] = useState(false)
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState("")

  const [selectedUser, setSelectedUser] = useState('')

  // Initializes selectedUser to be the user's data once logged in
  if (user && selectedUser === '') {
    setSelectedUser(user.displayName)
  }

  function resetSelectedUser() {
    setSelectedUser('')
  }

  const [searchOpen, setSearchOpen] = useState(false)


  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [hideNavbar, setHideNavbar] = useState(false)


  function toggleHideNavbar() {
    setHideNavbar(prev => !prev)
  }



  // When screenWidthFlag is true, screen with is over 850px
  const [screenWidthFlag, setScreenWidthFlag] = useState(screenWidth > 850 ? true : false)

  const [bigScreenFlag, setBigScreenFlag] = useState(screenWidth > 1200 ? true : false)


  // Toggles between two different general layouts on the instagram 
  // app depending on the width of the screen.
  const screenFun = () => {
      setScreenWidth(window.innerWidth)

      if (screenWidth > 1200)
        setBigScreenFlag(true)
      else 
        setBigScreenFlag(false)
      

      if (screenWidth > 850)
        setScreenWidthFlag(true)
      else 
        setScreenWidthFlag(false)
  }

  useEffect(() => {
      window.addEventListener("resize", screenFun);
      return () => window.removeEventListener("resize", screenFun)
  }, [screenFun])



  //Re-renders content every time page is updated
  useEffect(() => {
    updatePosts()
  }, [postSet]);

  async function updatePosts() {
    
    const allPosts = collection(db, 'posts')
    const queryPosts = query(allPosts, orderBy('timestamp', 'desc'))
    const postSnapshot = await getDocs(queryPosts)

    setPosts(
      postSnapshot.docs.map((doc) => ({
        id: doc.id,
        post: doc.data(),
      }))
    )
  }





  
  useEffect(() => {
    updateUsers() 
  }, [], user, username)

  async function updateUsers() {
    const allPosts = db.collection('users')
    const postSnapshot = await getDocs(allPosts)


    setUsers(
      postSnapshot.docs.map((doc) => (
        doc.data().user
      ))
    )
  }

/*
usrn, pw:

email@gmail.com
password

bobbyr9000@gmail.com
hihihi
*/




  return (
    <>
      {user ? (

          /**
           * This case renders every page except the login and sign-up 
           * page and is displayed when a user is logged in.
           *
           */
          <div>
          {!hideNavbar ? (
            <>
              {screenWidthFlag ? (
                <>
                  <SideNavbar bigScreenFlag={bigScreenFlag} user={user} setPostSet={setPostSet} selectedUser={selectedUser} setSelectedUser={setSelectedUser} users={users} searchOpen={searchOpen} setSearchOpen={setSearchOpen}/>

                  {searchOpen ? (
                    <PopupSearch bigScreenFlag={bigScreenFlag} searchOpen={searchOpen} setSearchOpen={setSearchOpen} selectededUser={selectedUser} setSelectedUser={setSelectedUser} users={users}/>
                  ) : (
                      <div></div>
                  )}
                </>
              ) : (
                <BottomNavbar user={user} setPostSet={setPostSet} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
              )}
            </>
          ) : (
            <div></div>
          )}


            <Routes>
              <Route
                  path='/'
                  element={
                    <Home
                      user={user}
                      setUser={setUser}
                      posts={posts}
                      setPosts={setPosts}
                      postSet={postSet}
                      setPostSet={setPostSet}
                      screenWidthFlag={screenWidthFlag}
                      setScreenWidthFlag={setScreenWidthFlag}
                      selectedUser={selectedUser}
                      setSelectedUser={setSelectedUser}
                      users={users}
                    />
                  }
              />

              <Route path='/Profile'
                element={
                  <Profile 
                    selectedUser={selectedUser}
                    posts={posts}
                    screenWidthFlag={screenWidthFlag}
                    bigScreenFlag={bigScreenFlag}
                    setSelectedUser={setSelectedUser}
                  />
                }
              />

              <Route path='/Explore' 
                element={ 
                  <Explore /> 
                }
              />
              
              <Route path='/Messenger' 
                element={ 
                  <Messenger /> 
                }
              />

              <Route path='/Reels' 
                element={ 
                  <Reels /> 
                }
              />

              <Route path='/Likes' 
                element={ 
                  <Likes /> 
                }
              />

              <Route path='signup'
                element={
                  <div style={{ 
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <Nav.Link to='/' as={NavLink}>
                      <button onClick={[toggleHideNavbar, resetSelectedUser]}
                        style={{
                          border: '1px solid rgba(0,0,0,0.3)',
                          backgroundColor: 'rgba(0, 150, 255, 0.6)',
                          padding: '10px',
                          borderRadius: '5px',
                          color: 'white'
                        }}
                      >
                        Get Started
                      </button>
                    </Nav.Link>
                  </div>
                }
              />


            </Routes>



          </div>  

      ) : (

        /** 
         * This case renders the login and sign-up pages and is displayed
         * when the user state is null (no one is currently logged in).
         * 
         * Contains two route pages that are functional components, login
         * and signup, and passes in the user state and the setUser state 
         * function to each
         */
        <Container 
          style={{ display: 'flex', justifyContent: 'center', marginTop: '80px'}}
        >
            <Routes>
              <Route
                path='/?'
                element={
                  <Login
                    user={user}
                    setUser={setUser}
                    users={users}
                    setUsers={setUsers}
                    username={username}
                    setUsername={setUsername}
                  />
                }
              />
              <Route
                path='/signup'
                element={
                  <SignUp
                    user={user}
                    setUser={setUser}
                    username={username}
                    setUsername={setUsername}
                    hideNavbar={hideNavbar}
                    setHideNavbar={setHideNavbar}
                  />
                }
              />
            </Routes>
        </Container>
      )}
    </>
  )
}

export default App
