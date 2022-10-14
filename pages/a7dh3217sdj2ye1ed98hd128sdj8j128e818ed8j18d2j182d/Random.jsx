import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { db } from "../../firebase";
import { FaArrowLeft } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { ref, onValue, remove, set } from "firebase/database";
import { FaTrash } from "react-icons/fa";

const Random = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState([]);

  const addRandom = () => {
    const id = new Date().getTime().toString();
    set(ref(db, `/dadu/${id}`), [inputData, { id }]);
    setInputData("");
  };

  useEffect(() => {
    onValue(ref(db, `/dadu`), (snapshot) => {
      setItems([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((elm) => {
          setItems((oldArray) => [...oldArray, elm]);
        });
      }
    });
  }, []);

  const removeAll = (id) => {
    remove(ref(db, `/dadu/${id}`));
  };
  const handleDelete = (id) => {
    if (confirm("Yakin untuk menghapus?")) {
      removeAll(id);
    } else return;
  };

  return (
    <div>
      <div className="sticky z-50 top-0 bg-[#2c2c2c] text-slate-100 flex  shadow-lg py-6 px-8 items-center">
        <Link href="/a7dh3217sdj2ye1ed98hd128sdj8j128e818ed8j18d2j182d">
          <FaArrowLeft />
        </Link>
        <h2 className="ml-6 font-semibold text-xl">Edit Dadu</h2>
      </div>
      <div className="text-slate-100 py-4">
        <h2 className="text-center text-base py-2 font-semibold">
          Teks yang ada didadu saat ini
        </h2>
        <div className="space-y-2">
          {items.map((elm, i) => {
            return (
              <div
                className="bg-[#3e3e3e] w-80 justify-between flex mx-auto items-center py-2 rounded-md"
                key={i}
              >
                <p className="text-sm mx-4">{elm[0]}</p>
                <button
                  className="mx-2 text-red-600"
                  onClick={() => handleDelete(elm[1].id)}
                >
                  <FaTrash size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="text-center py-4 text-slate-100">
        <input
          className="bg-[#4e4e4e] text-sm rounded-md mb-4 py-4 w-80 text-center focus:outline-0"
          placeholder="Tambah Teks..."
          type="text"
          onChange={(event) => setInputData(event.target.value)}
          value={inputData}
          autoComplete="off"
        />
        <AnimatePresence>
          {inputData && (
            <motion.button
              whileTap={{ scale: 1.2 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              exit={{ scale: 0, opacity: 0 }}
              className="text-slate-100 text-sm font-semibold border-2 border-white py-2 px-6 rounded-md"
              onClick={() => addRandom()}
            >
              Buat Teks
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Random;
