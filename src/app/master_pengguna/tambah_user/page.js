"use client";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function TambahUser() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [userRole, setUserRole] = useState("user");

  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_fullname", fullName);
    formData.append("user_email", email);
    formData.append("user_password", password);
    formData.append("password_confirmation", passwordConfirmation);
    formData.append("user_role", userRole);
    await axios
      .post("http://127.0.0.1:8000/api/user/create", formData)
      .then((response) => {
        router.push("/master_pengguna");
      })
      .catch((err) => {
        console.log(err.response.data.messages);
      });
  };

  return (
    <div className="">
      <h1>Tambah Pengguna</h1>

      <div className="mb-3 row w-50 mx-5 my-5">
        <label htmlFor="inputNamaLengkap" className="col-sm-2 col-form-label">
          Nama Lengkap:
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="inputNamaLengkap"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-3 row w-50 mx-5 my-5">
        <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
          Email:
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="inputEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-3 row w-50 mx-5 my-5">
        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
          Password:
        </label>
        <div className="col-sm-10">
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-3 row w-50 mx-5 my-5">
        <label
          htmlFor="inputPasswordConfirmation"
          className="col-sm-2 col-form-label"
        >
          Konfirmasi Password:
        </label>
        <div className="col-sm-10">
          <input
            type="password"
            className="form-control"
            id="inputPasswordConfirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-3 row w-50 mx-5 my-5">
        <label htmlFor="inputRole" className="col-sm-2 col-form-label">
          Role:
        </label>
        <div className="col-sm-10">
          <select
            type="password"
            className="form-select"
            id="inputRole"
            value={userRole}
            onChange={(e) => {
              setUserRole(e.target.value);
            }}
          >
            <option value="master_user">Master User</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>

      <button className="btn btn-primary" onClick={submit}>
        Submit
      </button>
    </div>
  );
}
