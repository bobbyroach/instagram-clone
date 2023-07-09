import { NavLink } from 'react-router-dom'
import { Container, Nav, Navbar as NavbarBs} from 'react-bootstrap'
import { useState, useRef, useMemo } from 'react'
import Modal from '@mui/material/Modal'



const heartStyles = {
    height: '38px',
    position: 'absolute',
    right: '11px',
    top: '15px',
    userSelect: 'none'
}

const hoverHeartStyles = {
    height: '39px',
    top: '14.5px',
    position: 'absolute',
    right: '10.5px',
    userSelect: 'none'

}





export function Navbar({ selectedUser, setSelectedUser, users }) {
    
    const [open, setOpen] = useState(false)

    const [isHovering, setIsHovering] = useState(false)

    const hovering = () => { setIsHovering(true) }
    const notHovering = () => { setIsHovering(false) }


    function handleOpen() {
        setOpen(true)
    }
    function handleClose() {
        setOpen(false)
    }


    // Searchable items
    const [query, setQuery] = useState('')
    const filteredItems = useMemo(() => {
        return users.filter(user => {
            return user.toLowerCase().includes(query.toLowerCase())
        })
    }, [users, query])



    function resetSelectedUser(user) {
        setSelectedUser(user)
    }






    return (
    
        <NavbarBs className='sticky-top'
            style={{
                position: 'sticky',
                top: '0', boxShadow: '0px 0.5px gray',
                marginBottom: '20px', display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: 'white', zIndex: '100',
                height: '62px', 
            }}
        >
            <img
                src="src/images/instagram.png"
                style={{ width: '130px', height: '36px', marginTop: '10px', marginLeft: '10px', position: 'absolute',
                userSelect:'none' }}
            />




            <div>

                {/* Search bar */}
                <div style={{
                    position: 'absolute',
                    right: '65px',
                    top: '12px',
                }}>

                    <input type='search' placeholder='Search'
                        style={{
                            width: '250px',
                            backgroundColor: 'rgb(220, 220, 220, 0.6)',
                            color: 'black',
                            height: '40px',
                            border: 'none',
                            borderRadius: '8px'
                        }}
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onClick={handleOpen}
                    />

                    {open ? (
                        <Modal open={open} onClose={handleClose}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}>
                            <>

                                <div style={{
                                        width: '0px',
                                        height: '0px',
                                        position: 'absolute',
                                        right: '185px',
                                        top: '53px',
                                        zIndex: '100',
                                        borderLeft: '20px solid transparent',
                                        borderRight: '20px solid transparent',
                                        borderBottom: '20px solid white'
                                }}/>

                                <div
                                    style={{
                                        backgroundColor: 'rgba(250, 250, 250, 1)',
                                        width: '350px',
                                        height: '400px',
                                        top: '60px',
                                        position: 'absolute',
                                        right: '10px',
                                        border: '0.5px solid rgba(0,0,0,0.1)',
                                        borderRadius: '7px',
                                        overflow: 'hidden',
                                        overflowY: 'scroll'
                                    }}
                                >


                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}>
                                        {filteredItems.map(user => (
                                            
                                            <Nav.Link to='/Profile' as={NavLink}>
                                                <button data-user={user} onClick={(e) => resetSelectedUser(e.target.dataset.user)} style={{ 
                                                    borderRadius: '5px',
                                                    width: '100%',
                                                    display: 'flex',
                                                    justifyContent: 'left',
                                                    padding: '5px',
                                                    gap: '15px',
                                                    paddingLeft: '10px',
                                                    alignItems: 'center',
                                                    fontSize: '17px'
                                                }}>
                                                    <img src='src/images/avatar.jpg' style={{
                                                        borderRadius: '50%',
                                                        height: '40px',
                                                    }}/>
                                                    {user}
                                                </button>
                                            </Nav.Link>


                                        ))}
                                    </div>


                                </div>

                                <div style={{
                                    position: 'absolute',
                                    right: '82px',
                                    top: '12.7px'
                                }}>
                                    <input type='search' placeholder='Search'
                                        style={{
                                            width: '250px',
                                            backgroundColor: 'rgb(220, 220, 220, 1)',
                                            color: 'black',
                                            height: '40px',
                                            border: 'none',
                                            borderRadius: '8px'
                                        }}
                                        value={query}
                                        onChange={e => setQuery(e.target.value)}
                                        onClick={handleOpen}
                                    />
                                </div>

                            
                            </>

                        </Modal>
                    ) : (
                        <div></div>
                    )}
                </div>





                <Nav >
                    <Nav.Link to='/Likes' as={NavLink} >
                        <img
                            src='https://www.transparentpng.com/thumb/instagram-heart/OtpLVC-heart-shaped-instagram-transparent-image.png'
                            style={isHovering ? hoverHeartStyles : heartStyles}
                            onMouseEnter={hovering}
                            onMouseLeave={notHovering}

                        />
                    </Nav.Link>
                </Nav>

            </div>


        </NavbarBs>

    )


}