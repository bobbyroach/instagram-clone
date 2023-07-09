import React, { useState } from "react"
import { storage, db, fb } from "../firebase/FirebaseInit"



export function UploadImage({ user, setPostSet, handleClose }) {


    const [image, setImage] = useState(null)
    const [caption, setCaption] = useState("")


    /**
     * Handles the choosing of an image file.
     * @param {*} e : event
     */
    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }


    /**
     * Handles the uploading of the selected image to Firebase.
     */
    const handleUpload = () => {
        // Stores selected image in Firebase storage in images folder
        const uploadTask = storage.ref(`images/${image.name}`).put(image)

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

        handleClose()
    }

    // Retrieve URL of image just uploaded and add it to database
    function updateDatabase() {
        storage
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        .then((url) => {
            // Post image inside db
            const allPosts = db.collection('posts')

            allPosts.doc().set({
                timestamp: fb.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                imageUrl: url,
                username: user.displayName,
            })
            setPostSet(prev => !prev)

            setCaption("");
            setImage(null);
        })
    }



    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '10px',
                marginBottom: '25px',
            }}
        >
            <input
                type="text"
                placeholder="Enter a caption..."
                onChange={(e) => setCaption(e.target.value)}
                value={caption}
            />
  
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    columnGap: '10px'
                }}
            >
                <input style={{ width: '70%'}} type="file" onChange={handleChange} />

                <button style={{ width: '30%', backgroundColor: '#0095f6', color: 'white', borderRadius: '3px'}} onClick={handleUpload}>
                    Post
                </button>
            </div>
        </div>
    )
}
