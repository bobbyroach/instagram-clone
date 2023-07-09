import React, { useState, useEffect } from "react"
import { db, fb } from "../firebase/FirebaseInit"
import '../componentcss/Post.css'



export function Post({ postId, user, username, caption, imageUrl, postSet, setPostSet }) {


  const [comments, setComments] = useState([])
  const [comment, setComment] = useState("")
  const [addComment, setAddComment] = useState(false)

  const [likes, setLikes] = useState([])
  const [like, setLike] = useState("")


  /** 
   * Retrieves all comments for each post from the database and 
   * sets them.
   */
  useEffect(() => {
    let unsubscribe
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()))
        })
    }
    return () => {
      unsubscribe()
    }
  }, [postId])



  /**
   * Adds a comment to a post and stores the comment with the post
   * in the database
   * @param {*} e 
   */
  const postComment = (e) => {
    e.preventDefault()
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: fb.firestore.FieldValue.serverTimestamp(),
    })
    setComment("")
    handleStopComment()

  }



  /**
   * Deletes a post and removes it from the database.
   * @param {*} projectId 
   */
  function removeProject(projectId) {
    db.collection("posts")
      .doc(projectId)
      .delete();

    setPostSet(prev => !prev)
  }



  function handleAddComment() {
    setAddComment(true)
  }

  function handleStopComment() {
    setAddComment(false)
    setComment('')
  }



  return (
    <div className='post' 
      style={{ width: '475px', marginBottom: '50px'}}>
      

      {/* Post Header */}
      <div className='post_header'>
        
        {/* Profile Pic and username */}
        <div className='username_display'>
          <img src='src\images\avatar.jpg' className='img' />

          <div className='username'>{username}</div>
        </div>

        {/* Delete button */}
        <button onClick={() => removeProject(postId)} className='delete_post'> 
          Delete
        </button>

      </div>



      {/* Image */}
      <img className="post_image" src={imageUrl} alt="" />




      {/* Like, Comment, or Share row */}
      <div >

        <button className='heart_emblem'>
          <img
            src='src/images/heart.jpg' style={{ height: '100%' }}
          />
        </button>

        <button className='comment_emblem' onClick={ handleAddComment }>
          <img
            src='src/images/comment.jpg' style={{ height: '100%' }}
          />
        </button>
        <button className='share_emblem'>
          <img
            src='src/images/share.jpg' style={{ height: '100%' }}
          />
        </button>
        <button className='save_emblem'>
          <img
            src='src/images/save.jpg' style={{ height: '100%' }}
          />
        </button>

      </div>


      <div className='like_count'>
        0 likes
      </div>



      {/* Renders username and caption if there is a caption */}
      {caption !== '' ?
        (
          <div className="post_text">
            <strong>{username}</strong> {caption}
          </div>
        ) : (
          <div></div>
        )}


      {/* Renders out comment section */}
      <div className={comments.length > 0 ? "post_comments" : ""}>
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>
          


      



      {/* Adding a comment after hitting the comment button */}
      {user && addComment && (
        <form>
          <div className='comment_wrapper'>
            <input
              className="comment_input"
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button onClick={handleStopComment} className='x-out_button'>
              
              <div className='x-out'></div>

            </button>

            
            <button
              disabled={!comment}
              onClick={postComment}
              type="submit"
              className='post_button'
              style={{  
                width: '90px',
                borderRadius: '2px',
                backgroundColor: 'rgb(50, 160, 233, 0.5)',
                padding: '3.1px 4px 4.5px 0px',
                marginLeft: '5px'
              }}
            >
              Post
            </button>


          </div>
        </form>
      )}

      <div className='separater mt-5'></div>
    </div>
  )
}

