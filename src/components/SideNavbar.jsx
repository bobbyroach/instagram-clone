import { NavLink } from 'react-router-dom'
import { Container, Nav, Navbar as NavbarBs} from 'react-bootstrap'
import '../componentcss/SideNavbar.css'
import { useLocation } from 'react-router-dom'
import Modal from '@mui/material/Modal'
import { UploadImage } from './UploadImage'
import { useState } from 'react'





const modalStyle = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '10vh',
    padding: '30% 10%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    boxShadow: '4',
    display: 'block'
}





export function SideNavbar({ bigScreenFlag, user, setPostSet, selectedUser, setSelectedUser, searchOpen, setSearchOpen }) {

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)


    const openSearch = () => {
        setSearchOpen(true)
    }


    function resetSelectedUser() {
        setSelectedUser(user.displayName)
    }


    const location = useLocation()


    return (
        <div style={{ zIndex: '100'}}>
            {bigScreenFlag ? (

                <NavbarBs className='big_side_nav fixed-top' >
                    <Nav className='big_nav'>

                        <Nav.Link to='/' as={NavLink}>
                            <img src='src/images/instagram.png' className='insta' />
                        </Nav.Link>

                        <div className='big_middle_nav'>

                            {/* Home icon */}
                            <Nav.Link to='/' as={NavLink} style={{ padding: '0px'}}>
                                {location.pathname === '/' ?
                                    (
                                        <button className='big_button_style'>
                                            <img src='src/images/black_home.png' className='big_black_home' />
                                            <h5 className='bold_link_name'>Home</h5>
                                        </button>

                                    ) : (
                                        <button className='big_button_style'>
                                            <img src='src/images/home.png' className='big_home' />
                                            <h5 className='link_name'>Home</h5>
                                        </button>
                                    )
                                }
                            </Nav.Link>


                            {/* Search icon */}
                            <button className='big_button_style' onClick={openSearch}>

                                <img src='src/images/search.png'
                                    className='big_search' />
                                <h5 className='link_name'>Search</h5>

                            </button>





                            {/* Explore icon */}
                            <Nav.Link to='/Explore' as={NavLink} style={{ padding: '0px'}}>
                                {location.pathname === '/Explore' ?
                                    (
                                        <button className='big_button_style'>
                                            <img src='src/images/black_explore.png' className='big_explore' />
                                            <h5 className='bold_link_name'>Explore</h5>
                                        </button>
                                    ) : (
                                        <button className='big_button_style'>
                                            <img src='src/images/explore.png' className='big_explore' />
                                            <h5 className='link_name'>Explore</h5>
                                        </button>
                                    )
                                }
                            </Nav.Link>

                            {/* Reels icon */}
                            <Nav.Link to='/Reels' as={NavLink} style={{ padding: '0px'}}>
                                {location.pathname === '/Reels' ?
                                    (
                                        <button className='big_button_style'>
                                            <img src='src/images/black_reels.png' className='big_reels' />
                                            <h5 className='bold_link_name'>Reels</h5>
                                        </button>
                                    ) : (
                                        <button className='big_button_style'>
                                            <img src='src/images/reels.png' className='big_reels' />
                                            <h5 className='link_name'>Reels</h5>
                                        </button>

                                    )
                                }
                            </Nav.Link>

                            {/* Messenger icon */}
                            <Nav.Link to='/Messenger' as={NavLink} style={{ padding: '0px'}}>
                                {location.pathname === '/Messenger' ?
                                    (
                                        <button className='big_button_style'>
                                            <img src='src/images/black_messenger.png' className='big_messenger' />
                                            <h5 className='bold_link_name'>Messages</h5>
                                        </button>

                                    ) : (
                                        <button className='big_button_style'>
                                            <img src='src/images/messenger.png' className='big_messenger' />
                                            <h5 className='link_name'>Messages</h5>
                                        </button>
                                    )
                                }
                            </Nav.Link>

                            {/* Likes icon */}
                            <Nav.Link to='/Likes' as={NavLink} style={{ padding: '0px'}}>
                                {location.pathname === '/Likes' ?
                                    (
                                        <button className='big_button_style'>
                                            <img src='src/images/black_heart.png'     className='big_black_likes' />
                                            <h5 className='bold_link_name'>Notifications</h5>
                                        </button>
                                    ) : (
                                        <button className='big_button_style'>
                                            <img src='src/images/heart.png'     className='big_likes' />
                                            <h5 className='link_name'>Notifications</h5>
                                        </button>
                                    )
                                }
                            </Nav.Link>

                            {/* Popup to post an image */}
                            <button onClick={handleOpen} className='big_button_style'>
                                <img src='src/images/upload.png' className='big_upload'/>
                                <h5 className='link_name'>Create</h5>
                            </button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                style={modalStyle}
                            >
                                <div className='upload_box'>
                                    <h5 className='create_post_title'>Create New Post</h5>
                                    <div className='separater'></div>
                                    <UploadImage user={user} setPostSet={setPostSet} />
                                </div>
                            </Modal>


                            {/* Profile icon */}
                            <Nav.Link to='/Profile' as={NavLink} style={{ padding: '0px'}}>
                                {location.pathname === '/Profile' ?
                                    (
                                        <button className='big_button_style' onClick={resetSelectedUser}>
                                            <img src='src/images/avatar.jpg'    className='big_black_avatar' />
                                            <h5 className='bold_link_name'>Profile</h5>
                                        </button>

                                    ) : (
                                        <button className='big_button_style' onClick={resetSelectedUser}>
                                            <img src='src/images/avatar.jpg'     className='big_avatar' />
                                            <h5 className='link_name'>Profile</h5>
                                        </button>
                                    )
                                }
                            </Nav.Link>


                        </div>


                        {/* Menu icon */}
                        <button className='big_menu_button'>
                            <img src='src/images/menu.png' className='big_menu' />
                            <h5 className='menu_name'>More</h5>
                        </button>

                    </Nav>
                </NavbarBs>





            ) : (





                <NavbarBs className='side_nav fixed-top' >

                    <Nav className='nav'>

                        <Nav.Link to='/' as={NavLink} >
                            <img src='src/images/logo.jpg' className='logo' />
                        </Nav.Link>

                        <div className='middle_nav'>

                            {/* Home icon */}
                            <Nav.Link to='/' as={NavLink}>
                                {location.pathname === '/' ?
                                    (
                                        <img src='src/images/black_home.png' className='black_home' />
                                    ) : (
                                        <img src='src/images/home.png' className='home' />
                                    )
                                }
                            </Nav.Link>






                            {/* Search icon */}
                            <button className='search_button' onClick={openSearch}>

                                <img src='src/images/search.png'
                                    className='search' />

                            </button>








                            {/* Explore icon */}
                            <Nav.Link to='/Explore' as={NavLink}>
                                {location.pathname === '/Explore' ?
                                    (
                                        <img src='src/images/black_explore.png' className='explore' />
                                    ) : (
                                        <img src='src/images/explore.png' className='explore' />
                                    )
                                }
                            </Nav.Link>

                            {/* Reels icon */}
                            <Nav.Link to='/Reels' as={NavLink}>
                                {location.pathname === '/Reels' ?
                                    (
                                        <img src='src/images/black_reels.png' className='reels' />
                                    ) : (
                                        <img src='src/images/reels.png' className='reels' />
                                    )
                                }
                            </Nav.Link>

                            {/* Messenger icon */}
                            <Nav.Link to='/Messenger' as={NavLink}>
                                {location.pathname === '/Messenger' ?
                                    (
                                        <img src='src/images/black_messenger.png' className='messenger' />
                                    ) : (
                                        <img src='src/images/messenger.png' className='messenger' />
                                    )
                                }
                            </Nav.Link>

                            {/* Likes icon */}
                            <Nav.Link to='/Likes' as={NavLink}>
                                {location.pathname === '/Likes' ?
                                    (
                                        <img src='src/images/black_heart.png' className='black_likes' />
                                    ) : (
                                        <img src='src/images/heart.png' className='likes' />
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
                                    
                                    <UploadImage user={user} setPostSet={setPostSet} />
                                </div>
                            </Modal>


                            {/* Profile icon */}
                            <Nav.Link to='/Profile' as={NavLink}>
                                {location.pathname === '/Profile' ?
                                    (
                                        <button onClick={resetSelectedUser}>
                                            <img src='src/images/avatar.jpg' className='avatar'
                                            style={{ border: '3px solid black' }} />
                                        </button>
                                    ) : (
                                        <button onClick={resetSelectedUser}>
                                            <img src='src/images/avatar.jpg' className='avatar' />
                                        </button>
                                    )
                                }
                            </Nav.Link>
                        </div>

                        {/* Menu icon */}
                        <button className='menu_button'>
                            <img src='src/images/menu.png' className='menu' />
                        </button>

                    </Nav>




                </NavbarBs>
            )
            }



        </div>
    )
}