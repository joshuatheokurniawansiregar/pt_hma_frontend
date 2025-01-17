"use client";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditUser() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [userID, setUserID] = useState(0);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    fecthUserById();
  }, []);

  const fecthUserById = async () => {
    const id = parseInt(searchParams.get("id"));
    await axios
      .get(`http://127.0.0.1:8000/api/user?id=${id}`)
      .then((response) => {
        const {
          id,
          user_fullname,
          user_email,
          user_password,
          user_role,
          user_status,
        } = response.data.data;
        setUserID(id);
        setFullName(user_fullname);
        setEmail(user_email);
        setPassword(user_password);
        setUserRole(user_role);
        setUserStatus(user_status.toString());
      });
  };

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", userID);
    formData.append("user_fullname", fullName);
    formData.append("user_email", email);
    formData.append("user_password", password);
    formData.append("password_confirmation", passwordConfirmation);
    formData.append("user_role", userRole);
    formData.append("user_status", userStatus);
    await axios
      .post("http://127.0.0.1:8000/api/user/update", formData)
      .then((response) => {
        router.push("/master_pengguna");
      })
      .catch((err) => {
        console.log(err.response.data.messages);
      });
  };

  return (
    <div className="">
      <h1>Edit Pengguna</h1>

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

      <div className="mb-3 row w-50 mx-5 my-5">
        <label htmlFor="inputUserStatus" className="col-sm-2 col-form-label">
          User Status:
        </label>
        <div className="col-sm-10">
          <select
            type="password"
            className="form-select"
            id="inputUserStatus"
            value={userStatus}
            onChange={(e) => {
              setUserStatus(e.target.value);
              console.log(e.target.value);
            }}
          >
            <option value="1">Aktif</option>
            <option value="0">Tidak Aktif</option>
          </select>
        </div>
      </div>

      <button className="btn btn-primary" onClick={submit}>
        Submit Update
      </button>
    </div>
  );
}
