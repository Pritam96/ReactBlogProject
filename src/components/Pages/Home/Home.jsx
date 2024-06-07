import { useEffect, useState } from "react";
import { databasesService } from "../../../appwrite/databases";
import PostCard from "../../PostCard/PostCard";
import Container from "../../Container/Container";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    databasesService.getPosts([]).then((posts) => {
      if (posts) setPosts(posts.documents);
    });
  }, []);

  if (posts.length > 0) {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          <div className="p-2 w-full">
            <h1 className="text-2xl font-bold hover:text-gray-500">
              Login to read posts
            </h1>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
