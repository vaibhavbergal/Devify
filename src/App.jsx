import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import LoadingBar from "react-top-loading-bar";
import Product from "./pages/Product";
import Category from "./pages/Category";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthLayout from "./components/AuthLayout";

function App() {
  const [progress, setProgress] = useState(0);

  return (
    <>
      <div className="min-h-screen font-pops">
        <BrowserRouter>
          <LoadingBar
            color="#f11946"
            height={3}
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
          <Header />
          <Routes>
            <Route path="/" element={<Home setProgress={setProgress} />} />
            <Route
              path="/cart"
              element={
                <AuthLayout authentication>
                  <Cart setProgress={setProgress} />
                </AuthLayout>
              }
            />
            <Route
              path="/product/:id"
              element={<Product setProgress={setProgress} />}
            />
            <Route
              path="/products/:category"
              element={<Category setProgress={setProgress} />}
            />
            <Route
              path="/login"
              element={
                <AuthLayout authentication={false}>
                  <Login setProgress={setProgress} />
                </AuthLayout>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthLayout authentication={false}>
                  <Signup setProgress={setProgress} />
                </AuthLayout>
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
