import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { blogContent } from "./BlogContent.js";

export const BlogDetailsPage = () => {
  const location = useLocation();
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", ""); // remove #
      const blog = blogContent.find((b) => String(b.id) === id);
      setBlogData(blog);
    }
  }, [location]);

  if (!blogData) {
    return <p className="text-center mt-4">Blog not found...</p>;
  }

  return (
    <div className="container my-5">
      {/* <div>
         .....   
        </div> */}
      <h1 className="mb-3">{blogData.title}</h1>
      <p className="text-muted">{blogData.date}</p>
      <p>{blogData.description}</p>
      <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
    </div>
  );
};
