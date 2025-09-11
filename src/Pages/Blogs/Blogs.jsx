// import React from "react";
// import "./Blogs.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import blog1 from "../../assets/mission.jpg";
// import { IoPersonSharp } from "react-icons/io5";
// import { RiMenu2Fill } from "react-icons/ri";
// import { Link, useNavigate } from "react-router-dom";

// const Blogs = () => {
//   const navigate = useNavigate();
//   const redirectBlogDetailsPage = (id) => {
//     navigate(`blog/blog-details#${id}`);
//   };
//   return (
//     <div className="container my-4">
//       <h2 className="text-center mb-4">Blogs</h2>
//       <div className="row">
//         <div className="col-md-4 mb-4">
//           <div className="card h-100">
//             <img
//               src={blog1}
//               className="card-img-top"
//               alt="Blog 1"
//               height={180}
//             />
//             <div className="card-body">
//               <h5 className="card-title">Size Of Pad</h5>
//               <p className="text-muted small mb-2">
//                 <IoPersonSharp /> netkoshweb · September 2, 2023 · <br />
//                 <RiMenu2Fill /> Blog · No Comments
//               </p>
//               <p className="card-text">
//                 It is a long established fact that a reader will be distracted
//                 by the content...
//               </p>
//               <a href="#1" className="card-link">
//                 Read More
//               </a>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-4 mb-4">
//           <div className="card h-100">
//             <img
//               src={blog1}
//               className="card-img-top"
//               alt="Blog 2"
//               height={180}
//             />
//             <div className="card-body">
//               <h5 className="card-title">Types Of Pads</h5>
//               <p className="text-muted small mb-2">
//                 <IoPersonSharp /> netkoshweb · September 2, 2023 · <br />
//                 <RiMenu2Fill /> Blog · No Comments
//               </p>
//               <p className="card-text">
//                 Types of Pads – It is a long established fact that a reader will
//                 be distracted...
//               </p>
//               <a
//                 // as={Link}
//                 onClick={() => redirectBlogDetailsPage(1)}
//                 // href="#2"
//                 className="card-link"
//               >
//                 Read More
//               </a>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-4 mb-4">
//           <div className="card h-100">
//             <img
//               src={blog1}
//               className="card-img-top"
//               alt="Blog 2"
//               height={180}
//             />
//             <div className="card-body">
//               <h5 className="card-title">Types Of Pads</h5>
//               <p className="text-muted small mb-2">
//                 <IoPersonSharp /> netkoshweb · September 2, 2023 · <br />
//                 <RiMenu2Fill /> Blog · No Comments
//               </p>
//               <p className="card-text">
//                 Types of Pads – It is a long established fact that a reader will
//                 be distracted...
//               </p>
//               <a href="#" className="card-link">
//                 Read More
//               </a>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-4 mb-4">
//           <div className="card h-100">
//             <img
//               src={blog1}
//               className="card-img-top"
//               alt="Blog 2"
//               height={180}
//             />
//             <div className="card-body">
//               <h5 className="card-title">Types Of Pads</h5>
//               <p className="text-muted small mb-2">
//                 <IoPersonSharp /> netkoshweb · September 2, 2023 · <br />
//                 <RiMenu2Fill /> Blog · No Comments
//               </p>
//               <p className="card-text">
//                 Types of Pads – It is a long established fact that a reader will
//                 be distracted...
//               </p>
//               <a href="#" className="card-link">
//                 Read More
//               </a>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-4 mb-4">
//           <div className="card h-100">
//             <img
//               src={blog1}
//               className="card-img-top"
//               alt="Blog 2"
//               height={180}
//             />
//             <div className="card-body">
//               <h5 className="card-title">Types Of Pads</h5>
//               <p className="text-muted small mb-2">
//                 <IoPersonSharp /> netkoshweb · September 2, 2023 · <br />
//                 <RiMenu2Fill /> Blog · No Comments
//               </p>
//               <p className="card-text">
//                 Types of Pads – It is a long established fact that a reader will
//                 be distracted...
//               </p>
//               <a href="#" className="card-link">
//                 Read More
//               </a>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-4 mb-4">
//           <div className="card h-100">
//             <img
//               src={blog1}
//               className="card-img-top"
//               alt="Blog 3"
//               height={180}
//             />
//             <div className="card-body">
//               <h5 className="card-title">Another Blog</h5>
//               <p className="text-muted small mb-2">
//                 <IoPersonSharp /> netkoshweb · September 2, 2023 · <br />
//                 <RiMenu2Fill /> Blog · No Comments
//               </p>
//               <p className="card-text">
//                 Another sample text for the blog card content goes here...
//               </p>
//               <a href="#" className="card-link">
//                 Read More
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Blogs;

import React from "react";
import "./Blogs.css";
import "bootstrap/dist/css/bootstrap.min.css";
import blog1 from "../../assets/mission.jpg";
import { IoPersonSharp } from "react-icons/io5";
import { RiMenu2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

// Dummy blog data
const blogContent = [
  {
    id: 1,
    title: "Size Of Pad",
    description:
      "It is a long established fact that a reader will be distracted by the content...",
    image: blog1,
    author: "netkoshweb",
    date: "September 2, 2023",
    comments: "No Comments",
  },
  {
    id: 2,
    title: "Types Of Pads",
    description:
      "Types of Pads – It is a long established fact that a reader will be distracted...",
    image: blog1,
    author: "netkoshweb",
    date: "September 2, 2023",
    comments: "No Comments",
  },
  {
    id: 3,
    title: "Another Blog",
    description: "Another sample text for the blog card content goes here...",
    image: blog1,
    author: "netkoshweb",
    date: "September 2, 2023",
    comments: "No Comments",
  },
];

const Blogs = () => {
  const navigate = useNavigate();

  const redirectBlogDetailsPage = (id) => {
    navigate(`blog-details#${id}`);
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Blogs</h2>
      <div className="row">
        {blogContent.map((blog) => (
          <div key={blog.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={blog.image}
                className="card-img-top"
                alt={blog.title}
                height={180}
              />
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <p className="text-muted small mb-2">
                  <IoPersonSharp /> {blog.author} · {blog.date} <br />
                  <RiMenu2Fill /> Blog · {blog.comments}
                </p>
                <p className="card-text">{blog.description}</p>
                <button
                  onClick={() => redirectBlogDetailsPage(blog.id)}
                  className="btn btn-link card-link p-0"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
