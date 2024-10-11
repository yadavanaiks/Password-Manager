import React from "react";
import { useRef, useState, useEffect } from "react";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const copyText = (text) => {
    toast("Copied to Clipboard!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("icons/hidden.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/hidden.png";
      passwordRef.current.type = "text";
    }
  };

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      // If any such id exists in the db, delete it
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: form.id }),
      });

      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });

      // Otherwise clear the form and show toast
      setform({ site: "", username: "", password: "" });
      toast("Password saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("Error: Password not saved!");
    }
  };

  const deletePassword = async (id) => {
    console.log("Deleting password with id ", id)
    let c = confirm("Do you really want to delete this password?")
    if (c) {
        setPasswordArray(passwordArray.filter(item => item.id !== id))
        
        await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

        toast('Password Deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true, 
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

}


const editPassword = (id) => {
  setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
  setPasswordArray(passwordArray.filter(item => item.id !== id))
}


  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <div className="absolute top-0 z-[-2] h-screen w-screen bg-gray-50 hover:bg-gray-300 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] "></div>

      <div className="p-3   md:mycontainer min-h-screen">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-blue-500">&lt;</span>
          Pass
          <span className="text-blue-500">MAN/ &gt;</span>
        </h1>
        <p className="text-blue-600 text-lg text-center">
          Your Own Password Manager{" "}
        </p>

        <div className=" flex flex-col p-4 text-black gap-5 items-center ">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-blue-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter  username"
              className="rounded-full border border-blue-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="rounded-full border border-blue-500 w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-[4px] top-[3px] cursor-pointer "
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className=" flex justify-center items-center gap-2 bg-blue-400 hover:bg-blue-300 hover:font-bold rounded-full px-4 py-2 w-fit border border-blue-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              stroke="bold"
              state="hover-swirl"
              colors="primary:#b4b4b4,secondary:#545454"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="password">
          <h2 className="font-bold text-2xl  py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>NO password to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="  py-2 border border-gray-100 text-gray-700 text-center ">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="lordiconcopy cursor-pointer size-7 "
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                              colors="primary:#3080e8"
                              style={{
                                width: "20px",
                                height: "20px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" py-2 border border-gray-100 text-gray-700 text-center ">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                          <div
                            className="lordiconcopy cursor-pointer size-7"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                              colors="primary:#3080e8"
                              style={{
                                width: "20px",
                                height: "20px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" py-2 border border-gray-100 text-gray-700 text-center ">
                        <div className="flex items-center justify-center">
                          <span>{item.password}</span>
                          <div
                            className="lordiconcopy cursor-pointer size-7"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                              colors="primary:#3080e8"
                              style={{
                                width: "20px",
                                height: "20px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" py-2 border border-gray-100 text-gray-700 text-center ">
                        <span
                          className="cursor-pointer mx-2"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="hover"
                            stroke="bold"
                            state="hover-line"
                            colors="primary:#1663c7,secondary:#1663c7"
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-2"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/hwjcdycb.json"
                            trigger="morph"
                            stroke="bold"
                            state="morph-trash-in"
                            colors="primary:#1663c7,secondary:#1663c7"
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
