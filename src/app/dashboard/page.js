"use client";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
export default function Dashboard() {
  const [allUser, setAllUser] = useState([]);
  const [allActiveUsers, setAllActiveUsers] = useState([]);

  const fetchAllUser = async () => {
    await axios.get("http://127.0.0.1:8000/api/user/all").then((response) => {
      setAllUser(response.data.data);
    });
  };

  const fetchUsersWhoActive = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/user/active")
      .then((response) => {
        setAllActiveUsers(response.data.data);
      });
  };
  useEffect(() => {
    fetchAllUser();
    fetchUsersWhoActive();
  }, []);
  return (
    <div className="d-flex flex-row h-75">
      <div className="card">
        <div className="card-body">
          <div className="card-title">Pengguna Terdaftar</div>
          <div className="card-text">{allUser.length}</div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="card-title">Pengguna Aktif</div>
          <div className="card-text">{allActiveUsers.length}</div>
        </div>
      </div>
    </div>
  );
}
