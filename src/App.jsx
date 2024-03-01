import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header, Footer, Bredcrumbs } from "./components/index";
import LoadingBar from "react-top-loading-bar";
import { ThreeDots } from "react-loader-spinner";
import AuthLayout from "./components/AuthLayout";

const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./pages/Product"));
const Category = lazy(() => import("./pages/Category"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));

function App() {
  const [progress, setProgress] = useState(0);

  return (
    <>
      <div className="min-h-screen font-pops">
        <LoadingBar
          color="#f11946"
          height={3}
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <BrowserRouter>
          <Header />
          <Bredcrumbs />
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-[80vh]">
                <ThreeDots
                  visible={true}
                  height="50"
                  width="70"
                  color="#f97316"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            }
          >
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
          </Suspense>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
