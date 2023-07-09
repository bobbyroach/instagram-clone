import { NavLink } from 'react-router-dom'
import { Nav, Navbar as NavbarBs} from 'react-bootstrap'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import '../componentcss/BottomNavbar.css'
import Modal from '@mui/material/Modal'
import { UploadImage } from './UploadImage'




const modalStyle = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    padding: '40% 0',
    backgroundColor: 'rgba(255,255,255,0.1)',
    boxShadow: '4',
    display: 'block'
  }






export function BottomNavbar({ user, setPostSet, selectedUser, setSelectedUser }) {

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const location = useLocation()


    function resetSelectedUser() {
        setSelectedUser(user.displayName)
    }


    return (


        
        <NavbarBs className='bottom_nav fixed-bottom' style={{ backgroundColor: 'white'}}>

            <Nav className='nav'>
                <Nav.Link to='/' as={NavLink}>
                    {location.pathname === '/' ?
                        (
                            <img src='src/images/black_home.png' className='black_home'/> 
                        ) : (
                            <img src='src/images/home.png' className='home'/>
                        )
                    }   
                </Nav.Link>

                <Nav.Link to='/Explore' as={NavLink}>
                    {location.pathname === '/Explore' ?
                        (
                            <img src='src/images/black_explore.png' className='explore'/> 
                        ) : (
                            <img src='src/images/explore.png' className='explore'/>
                        )
                    }   
                </Nav.Link>


                <Nav.Link to='/Reels' as={NavLink}>
                    {location.pathname === '/Reels' ?
                        (
                            <img src='src/images/black_reels.png' className='reels'/> 
                        ) : (
                            <img src='src/images/reels.png' className='reels'/>
                        )
                    }   
                </Nav.Link>




                {/* Popup to post an image */}

                <button onClick={handleOpen}>
                    <img src='src/images/upload.png' className='upload'/>
                </button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    style={modalStyle}
                >
                    <div className='upload_box'>
                        <h5 className='create_post_title'>Create New Post</h5>

                        <div className='separater'></div>
                        
                        <UploadImage user={user} setPostSet={setPostSet} handleClose={handleClose}/>
                    </div>
                </Modal>




                <Nav.Link to='/Messenger' as={NavLink}>
                    {location.pathname === '/Messenger' ?
                        (
                            <img src='src/images/black_messenger.png' className='messenger'/> 
                        ) : (
                            <img src='src/images/messenger.png' className='messenger'/>
                        )
                    }   
                </Nav.Link>

                <Nav.Link to='/Profile' as={NavLink}>
                    {location.pathname === '/Profile' ?
                        (
                            <button onClick={resetSelectedUser}>
                                <img src='src/images/avatar.jpg' className='avatar'
                                style={{ border: '3px solid black'}}/>
                            </button>
 
                        ) : (
                            <button onClick={resetSelectedUser}>
                                <img src='src/images/avatar.jpg' className='avatar'/>
                            </button>
                        )
                    } 
                </Nav.Link>

            </Nav>

        </NavbarBs>
    )
}