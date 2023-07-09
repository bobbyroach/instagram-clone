import { auth } from "../firebase/FirebaseInit"
import { NavLink } from 'react-router-dom'
import { Container, Nav, Navbar as NavbarBs} from 'react-bootstrap'
import { Col, Row } from 'react-bootstrap'



export function Profile({ selectedUser, posts, screenWidthFlag, bigScreenFlag, setSelectedUser }) {


    const bigStyle = {
        marginLeft: '230px',
        marginRight: '10px',
        display: 'flex',
        justifyContent: 'center',

    }

    const medStyle = {
        marginLeft: '90px',
        marginRight: '10px'
    }

    const smallStyle = {
        // No styling 
    }




    function resetSelectedUser() {
        setSelectedUser('')
    }

    const postNumber = posts.filter(({id, post}) => 
        post.username === selectedUser).length
    



    return (

        <div style={bigScreenFlag ? bigStyle : screenWidthFlag ? medStyle : smallStyle}>
            

            <div 
                style={{
                    width: '100%',
                    maxWidth: '1050px',
                    // display: 'flex',
                    // flexDirection: 'column',
                    // justifyContent: 'center'
                }}
            >

                {screenWidthFlag ? (


                    <Container style={{ paddingTop: '50px', marginBottom: '30px', borderBottom: '1px solid rgba(0,0,0,0.2)', width: '100%'}}>
                        <div
                            style={{
                                display: 'flex', justifyContent: 'left',
                                height: '230px', gap: '55px'
                            }}
                        >
                            <img src='src/images/avatar.jpg' style={{
                                borderRadius: '50%', height: '150px'
                            }} />


                            <div style={{
                                display: 'flex', 
                                flexDirection: 'column'
                            }}>


                                <div
                                    style={{ display: 'flex', width: '100%', fontSize: '24px', gap: '40px', }}
                                >
                                    {selectedUser}

                                    {/* Edit Profile button */}
                                    <button style={{ width: '120px', backgroundColor: 'rgba(0,0,0,0.08)', borderRadius: '7px', fontSize: '13px', fontWeight: 'bold', height: '35px' }}>
                                        Edit Profile
                                    </button>

                                </div>




                                {/* Profile counts */}
                                <div style={{
                                    display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '18px', 
                                    marginBottom: '18px', width: '300px'
                                }}>

                                    <div style={{ fontSize: '15px'}}><bold style={{ fontWeight: 'bold', fontSize: '17px'}}>{postNumber} </bold>Posts</div>

                                    <div style={{ fontSize: '15px'}}><bold style={{ fontWeight: 'bold', fontSize: '17px'}}>0</bold> Followers</div>

                                    <div style={{ fontSize: '15px'}}><bold style={{ fontWeight: 'bold', fontSize: '17px'}}>0</bold> Following</div>
                                </div>




                                {/* Username, bio, unfollow button */}
                                <div style={{ height: '70px', display: 'flex', flexDirection: 'column', justifyContent: 'left' }}>
                                    <div style={{ fontWeight: 'bold' }}>{selectedUser}</div>
                                    <div>This is an instagram bio.</div>

                                    <div>
                                        <Nav.Link to='/?' as={NavLink}>
                                            <button onClick={[() => auth.signOut(), resetSelectedUser]}
                                                style={{
                                                    color: '#0095f6',
                                                    fontWeight: '600',
                                                    lineHeight: '28px',
                                                    paddingLeft: '0px',
                                                    fontSize: '15px'
                                                }}
                                            >
                                                Logout
                                            </button>
                                        </Nav.Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Container>



                ) : (
                    <>

                        {/* Header with username */}
                        <div className='profile_header fixed-top'
                            style={{
                                borderBottom: '1px solid rgba(0, 0, 0, 0.13)',
                                display: 'flex', justifyContent: 'center',
                                fontFamily: 'helvetica', fontSize: '16px',
                                fontWeight: 'bold', backgroundColor: 'white',
                                height: '45px', alignItems: 'center', zIndex: '10'
                            }}
                        >
                            {selectedUser}
                        </div>


                        {/* Profile pic, username, edit profile button, bio */}
                        <Container style={{ paddingTop: '80px' }}>
                            <div
                                style={{
                                    display: 'flex', justifyContent: 'left',
                                    height: '100px', gap: '35px'
                                }}
                            >
                                <img src='src/images/avatar.jpg' style={{
                                    borderRadius: '50%', height: '80px'
                                }} />

                                <div
                                    style={{ display: 'flex', flexDirection: 'column', width: '100%', fontSize: '21px', gap: '12px' }}
                                >
                                    {selectedUser}

                                    <button style={{ width: '50%', backgroundColor: 'rgba(0,0,0,0.08)', borderRadius: '7px', fontSize: '13px', fontWeight: 'bold', height: '35px' }}>
                                        Edit Profile
                                    </button>

                                </div>
                            </div>

                            <div style={{ height: '70px', display: 'flex', flexDirection: 'column', justifyContent: 'left' }}>
                                <div style={{ fontWeight: 'bold' }}>{selectedUser}</div>
                                <div>This is an instagram bio.</div>

                                <div>
                                    <Nav.Link to='/?' as={NavLink}>
                                        <button onClick={() => auth.signOut()}
                                            style={{
                                                color: '#0095f6',
                                                fontWeight: '600',
                                                lineHeight: '28px',
                                                paddingLeft: '0px',
                                                fontSize: '15px'
                                            }}
                                        >
                                            Logout
                                        </button>
                                    </Nav.Link>
                                </div>
                            </div>







                        </Container>


                        {/* Posts, Follower, following counts */}
                        <div
                            style={{
                                borderTop: '1px solid rgba(0,0,0,0.13)', marginTop: '20px', borderBottom: '1px solid rgba(0,0,0,0.13)', height: '60px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '5px 100px'
                            }}>

                            {/* Post count */}
                            <div key={'posts'} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div>{postNumber}</div>
                                <div>Posts</div>
                            </div>

                            {/* Follower count */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div>0</div>
                                <div>Followers</div>
                            </div>

                            {/* Following count */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div>0</div>
                                <div>Following</div>
                            </div>

                        </div>
                    </>
                )}



                {/* <-- Posts --> */}
                <Row xs={1} md={3} lg={3} className='g-3'>
                    {posts.map(({ id, post }) => (

                        <>
                            {post.username === selectedUser ? (
                                <Col >
                                    
                                    {window.innerWidth < 768 ?
                                    (
                                    <div
                                        style={{
                                            minHeight: '150px',
                                            overflow: 'hidden',
                                            maxHeight: '500px'
                                        }}
                                    >
                                         
                                        <img src={post.imageUrl}
                                        style={{
                                            zoom: '0.6',
                                            width: '100%'
                                        }} />
                                    </div>

                                    ) : (
                                        <div
                                            style={{
                                                overflow: 'hidden',
                                                maxHeight: '225px',
                                                minHeight: '225px',
                                            }}
                                        >

                                        
                                            <img src={post.imageUrl}
                                            style={{
                                                height: '100%',
                                                zoom: '0.7'
                                            }} />
                                        </div>
                                    )
                                    }
                                        
                        
                                        
                                    
                                </Col>
                            ) : (
                                <div></div>
                            )}
                        </>
                    ))}
                </Row>


            </div>

            

        </div>
        
    )
}