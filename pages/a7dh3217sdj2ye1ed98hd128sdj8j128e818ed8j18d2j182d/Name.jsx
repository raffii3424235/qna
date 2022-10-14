import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { db } from "../../firebase";
import { ref, onValue, set } from "firebase/database";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

let easing = [0.6, -0.05, 0.01, 0.99];

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const staggerLate = {
  animate: {
    transition: {
      delay: 0.4,
      staggerChildren: 0.1,
    },
  },
};

const Name = () => {
  const [showNick, setShowNick] = useState([]);
  const [inputNick, setInputNick] = useState("");

  useEffect(() => {
    onValue(ref(db, `/nick`), (ss) => {
      setShowNick([]);
      const res = ss.val();
      if (res !== null) {
        Object.values(res).map((elm) => {
          setShowNick((oldArray) => [...oldArray, elm]);
        });
      }
    });
  }, []);

  const addNick = () => {
    set(ref(db, `/nick`), {
      name: inputNick,
    });
    setInputNick("");
  };

  return (
    <div>
      <div className="sticky z-50 top-0 bg-[#2c2c2c] text-slate-100 flex  shadow-lg py-6 px-8 items-center">
        <Link href="/a7dh3217sdj2ye1ed98hd128sdj8j128e818ed8j18d2j182d">
          <FaArrowLeft />
        </Link>
        <h2 className="ml-6 font-semibold text-xl">Edit Nama</h2>
      </div>
      {showNick.map((elm, index) => {
        return (
          <div key={index} className="text-center text-slate-100 py-12">
            <h2 className="text-2xl font-bold mb-1">Opsi Merubah Nama</h2>
            <h2 className="text-sm font-semibold mb-2">
              Nama kamu saat ini{" "}
              <span className="text-xl font-bold rgb-text">{elm}</span>
            </h2>
            <input
              className="bg-[#4e4e4e] text-sm rounded-md mb-4 py-4 w-80 text-center focus:outline-0"
              placeholder="Tulis Nama Kamu..."
              type="text"
              onChange={(event) => setInputNick(event.target.value)}
              value={inputNick}
              autoComplete="off"
            />
            <AnimatePresence>
              {inputNick && (
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
                  onClick={() => addNick()}
                >
                  Ganti Nama
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default Name;
