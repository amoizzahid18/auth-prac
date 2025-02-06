import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleLogout } from "../utilities";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [result, setResult] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("Logged in User"));
    fetchProducts();
  }, []);

  const fetchProducts = async () => { 
    try {
      const url = "http://localhost:8080/products";
      const response = await fetch(url, {
        headers: {
          'Authorization': localStorage.getItem('Token')
        }
      }
      );
      const prod = await response.json();
      setResult(prod);
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = async () => {
    handleLogout("Logging out");
    localStorage.removeItem("Token");
    localStorage.removeItem("Logged in User");

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-6 w-80 text-center">
          <h2 className="text-lg font-semibold text-gray-800 hover:scale-105 duration-120">
            Welcome, {loggedInUser.toUpperCase()}!
          </h2>
          <button
            onClick={handleLogOut}
            className="cursor-pointer hover:translate-x-1 hover:bg-indigo-600 duration-100 mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg transition"
          >
            Logout
          </button>
          <div className="flex flex-col items-center mt-8 space-y-6">
          {result?.map((product, index) => (
            <div key={index} className="bg-gray-50  rounded-lg p-6 w-80 text-center">
              <h3 className="hover:scale-105 duration-100 text-xl font-semibold text-gray-800">{product.name}</h3>
              <p className=" hover:scale-105 duration-100 text-gray-600">Price: ${product.price}</p>
            </div>
          ))}
        </div>
        </div>

        

        <ToastContainer />
      </div>
    </>
  );
};

export default Home;
