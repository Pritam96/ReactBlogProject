import { useEffect, useState } from "react";
import { databasesService } from "../../../appwrite/databases";
import Container from "../../Container/Container";
import PostCard from "../../PostCard/PostCard";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    databasesService.getPosts([]).then((posts) => {
      if (posts) setPosts(posts.documents);
    });
  }, []);
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts &&
            posts.map((post) => (
              <div key={post.$id}>
                <PostCard {...post} className="p-2 w-1/4" />
              </div>
            ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
