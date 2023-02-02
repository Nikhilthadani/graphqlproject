import React from "react";
import { Route, Routes } from "react-router-dom";
import BlogPage from "./BlogPage";
import Blogs from "./Blogs";
import AddBlog from "./components/add/AddBlog";
import AddButton from "./components/AddButton";
import LoginForm from "./components/auth/LoginForm";
import Header from "./Header";
import Home from "./Home";

function App() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<LoginForm />} />
          <Route path="/add" element={<AddBlog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogPage />} />
        </Routes>
      </section>
      <AddButton />
    </div>
  );
}

export default App;
