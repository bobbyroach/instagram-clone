import { Post } from './Post'


export function Timeline({ user, posts, postSet, setPostSet }) {
    return (
        <div style={{ marginTop: '15px'}}>
            {posts.map(({ id, post }) => (
                <Post
                    key={id}
                    postId={id}
                    user={user} 
                    username={post.username}
                    caption={post.caption}
                    imageUrl={post.imageUrl}
                    postSet={postSet} 
                    setPostSet={setPostSet}
                />
            ))}
      </div>
    )
}