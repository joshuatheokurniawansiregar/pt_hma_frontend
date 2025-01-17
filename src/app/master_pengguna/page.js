"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";

export default function MasterPengguna() {
  const [allUsers, setAllUsers] = useState([]);
  const router = useRouter();

  const redirectToTambahUser = (e) => {
    e.preventDefault();
    router.push("/master_pengguna/tambah_user");
  };

  const deleteUser = async (id) => {
    const formData = new FormData();
    formData.append("id", id);
    await axios
      .post("http://127.0.0.1:8000/api/user/delete", formData)
      .then((response) => {
        fetchAllUsers();
      });
  };

  const fetchAllUsers = async () => {
    await axios.get("http://127.0.0.1:8000/api/user/all").then((response) => {
      setAllUsers(response.data.data);
    });
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <>
      <div className="">
        <button className="btn btn-dark my-5" onClick={redirectToTambahUser}>
          Tambah
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama Pengguna</th>
              <th>Email</th>
              <th>User Role</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((data, index) => {
              const { id, user_email, user_fullname, user_role } = data;
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{user_fullname}</td>
                  <td>{user_email}</td>
                  <td>{user_role}</td>
                  <td className="d-flex flex-row">
                    <button
                      className="btn btn-primary mx-2"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(`master_pengguna/edit_user?id=${id}`);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteUser(id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
