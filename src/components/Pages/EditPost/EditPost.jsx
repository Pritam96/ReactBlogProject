import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { databasesService } from "../../../appwrite/databases";
import Container from "../../Container/Container";
import PostForm from "../../PostForm/PostForm";

const EditPost = () => {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    if (postId) {
      databasesService.getPost(postId).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [navigate, postId]);
  return post ? (
    <div className="w-full py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
};

export default EditPost;
