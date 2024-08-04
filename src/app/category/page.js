"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import SelectGame from "../component/selectgame";
import LoadingPage from "../component/loading";
import DeactivePos from "../component/deactivePos";

export default function Category() {
  const [categories, setCategories] = useState(null);
  const [deactiveBtn, setDeactiveBtn] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/category");

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      var data = await res.json();
      if (data.list) {
        let plaied = [];
        if (localStorage.getItem("playedCategory") != null) {
          plaied = JSON.parse(localStorage.getItem("playedCategory")).map(
            (x) => {
              return x.id;
            }
          );
        }

        var list = data.list.map((category) => {
          return { ...category, isplaied: plaied.indexOf(category.id) >= 0 };
        });
        var plaiedList = list.filter((x) => x.isplaied == true);

        if (plaiedList.length == list.length) {
          setDeactiveBtn(true);
        }
        setCategories(list);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center bg-indigo-400 h-screen">
      {categories == null && <LoadingPage />}

      <div>
        {categories != null && categories.length > 0 && (
          <SelectGame categories={categories} />
        )}

        {deactiveBtn == true && <DeactivePos />}
      </div>
    </div>
  );
}
