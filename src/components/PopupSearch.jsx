import { Offcanvas, Stack } from "react-bootstrap";
import { useState, useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { Container, Nav, Navbar as NavbarBs} from 'react-bootstrap'



export function PopupSearch({ bigScreenFlag, searchOpen, setSearchOpen, selectedUser, setSelectedUser, users }) {

    const closeSearch = () => {
        console.log('hi')
        setSearchOpen(false)
    }

    const [open, setOpen] = useState(false)




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


    const bigScreenStyle = {
        left: '200px'
    }
    const medScreenStyle = {
        left: '80px'
    }


    return (
        <Offcanvas show={searchOpen} onHide={closeSearch}
            style={bigScreenFlag ? bigScreenStyle : medScreenStyle}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Search</Offcanvas.Title>
            </Offcanvas.Header>
            
            <Offcanvas.Body>

                <div>
                    <input type='search' placeholder='Search'
                        style={{
                            width: '250px',
                            backgroundColor: 'rgb(220, 220, 220, 0.6)',
                            color: 'black',
                            height: '40px',
                            border: 'none',
                            borderRadius: '8px',
                            width: '100%',
                            marginTop: '15px',
                            
                        }}
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />

                    <div style={{ border: '1px solid rgba(0,0,0,0.15)', marginTop: '30px', marginBottom: '20px'}}/>


                    <div
                        style={{
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
                                    <button data-user={user} onClick={(e) => {
                                        resetSelectedUser(e.target.dataset.user)
                                        closeSearch()}} 
                                        style={{
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
                                        }} />
                                        {user}
                                    </button>
                                </Nav.Link>


                            ))}
                        </div>


                    </div>
                </div>


                

            </Offcanvas.Body>
        </Offcanvas>
    )
}