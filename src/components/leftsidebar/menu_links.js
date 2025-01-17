"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

export default function MenuLinks() {
  const [menuLinks, setMenuLinks] = useState([]);
  const fetchMenuLinks = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/navigations")
      .then((response) => {
        setMenuLinks(response.data.data);
      });
  };
  useEffect(() => {
    fetchMenuLinks();
  }, []);

  return (
    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start">
      {
        menuLinks.map((data, index)=>{
            const {icon_file_link, icon_file_name, icon_file_path, page_link, page_name} = data;
            return <li key={index} className="nav-item d-flex">
                <Image src={icon_file_link} width={20} height={20} alt=""/>
                <Link href={page_link} className="nav-link text-white">
                    {page_name}
                </Link>
            </li>
        })
      }
    </ul>
  );
}
