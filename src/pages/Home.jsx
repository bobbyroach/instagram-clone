import { db, auth } from "../firebase/FirebaseInit"
import { useEffect, useState } from 'react'
import '../App.css'
import { Container } from "react-bootstrap"
import { Routes, Route } from 'react-router-dom'
import { Timeline } from '../components/Timeline.jsx'
import { UploadImage } from '../components/UploadImage'
import { Navbar } from '../components/Navbar'




export function Home({ user, posts, setPosts, postSet, setPostSet, screenWidthFlag, selectedUser, setSelectedUser, users}) {


    return (
        <>
            {screenWidthFlag ? (
            /** 
            * Displayed when screen width is over 850 pixels.
            */

                <>
                    <Container className='medium_screen'>

                        <Timeline user={user} posts={posts} setPosts={setPosts} postSet={postSet} setPostSet={setPostSet} />

                    </Container>
                </>

            ) : (

            /** 
             * Displayed when screen width is under 850 pixels.
             */
                <>
                <Navbar selectedUser={selectedUser} setSelectedUser={setSelectedUser} users={users}/>
                <Container className='small_screen'>

                    <Timeline user={user} posts={posts} setPosts={setPosts} postSet={postSet} setPostSet={setPostSet} />

                </Container>
                </>
            )}
        </>
    )

}