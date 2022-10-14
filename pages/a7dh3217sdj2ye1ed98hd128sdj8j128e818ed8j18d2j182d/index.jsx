import { useState, useEffect } from "react";
import Link from "next/link";
import { db } from "../../firebase";
import { ref, onValue, update, remove, set } from "firebase/database";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash } from "react-icons/fa";

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

const Dashboard = ({ onClick }) => {
  const [inputAnswer, setInputAnswer] = useState("");
  const [items, setItems] = useState([]);
  const [tempId, settempId] = useState("");
  const [tempIdButton, setTempIdButton] = useState("");
  const [name, setName] = useState([]);

  useEffect(() => {
    onValue(ref(db, `/post`), (snapshot) => {
      setItems([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((elm) => {
          setItems((oldArray) => [...oldArray, elm]);
        });
      }
    });
  }, []);

  const handleAnswer = (items) => {
    settempId(items.id);
    items.answer;
  };

  const handleButton = (items) => {
    setTempIdButton(items.id);
  };

  const handleAnswerChange = () => {
    update(ref(db, `/post/${tempId}`), {
      answer: inputAnswer,
      id: tempId,
    });
    setInputAnswer("");
  };

  const removeAll = (id) => {
    remove(ref(db, `/post/${id}`));
  };
  const handleDelete = (id) => {
    if (confirm("Yakin untuk menghapus?")) {
      removeAll(id);
    } else return;
  };

  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        exit={{ opacity: 0 }}
        className="h-full justify-center items-center text-center text-slate-100"
      >
        <div className="sticky z-50 top-0 bg-[#2c2c2c] shadow-lg py-6 px-8 items-center">
          <h2 className="text-slate-100 text-center font-semibold text-xl">
            Jawab Pertanyaan
          </h2>
        </div>

        <div className="flex justify-center items-center space-x-4 py-12 border-b mx-6">
          <span className="bg-[#891ad3] py-2 px-6 text-sm font-semibold rounded-sm">
            <Link href="/a7dh3217sdj2ye1ed98hd128sdj8j128e818ed8j18d2j182d/Name">
              Edit Nama
            </Link>
          </span>
          <span className="bg-[#891ad3] py-2 px-6 text-sm font-semibold rounded-sm">
            <Link href="/a7dh3217sdj2ye1ed98hd128sdj8j128e818ed8j18d2j182d/Random">
              Edit Dadu
            </Link>
          </span>
        </div>

        <div className="h-full">
          <div className="mx-8 py-6 flex flex-col-reverse xl:mx-[465px]">
            {items.map((elm) => {
              return (
                <div key={elm.id}>
                  <motion.div
                    variants={fadeInUp}
                    className="bg-[#3e3e3e] my-3 rounded-t-lg"
                  >
                    <h1 className="text-sm font-semibold py-3 ">
                      {elm.message}
                    </h1>

                    {elm.answer != "" ? (
                      <h1 className="text-sm bg-[#4e4e4e] py-3 ">
                        {elm.answer}
                      </h1>
                    ) : tempIdButton == elm.id ? (
                      <div
                        onClick={() => handleButton(elm)}
                        className="bg-[#4e4e4e] text-sm"
                      >
                        <input
                          className="bg-transparent py-4 w-80 text-center focus:outline-0"
                          placeholder="Jawab Disini (klik)"
                          type="text"
                          onClick={() => handleAnswer(elm)}
                          onChange={(event) =>
                            setInputAnswer(event.target.value)
                          }
                          value={inputAnswer}
                          autoComplete="off"
                        />
                      </div>
                    ) : (
                      <div
                        onClick={() => handleButton(elm)}
                        className="bg-[#4e4e4e] text-sm"
                      >
                        <input
                          type="text"
                          className="bg-transparent py-4 w-80 text-center focus:outline-0"
                          placeholder="Jawab Disini (klik)"
                          onClick={() => handleAnswer(elm)}
                          onChange={(event) =>
                            setInputAnswer(event.target.value)
                          }
                          autoComplete="off"
                        />
                      </div>
                    )}
                    <div className="flex justify-between items-center py-2">
                      <button
                        className="mx-2 text-red-600"
                        onClick={() => handleDelete(elm.id)}
                      >
                        <FaTrash size={16} />
                      </button>
                      <h1 className="bg-[#3e3e3e] text-xs mx-2 text-slate-200">
                        {elm.date}.{elm.month}.{elm.year}
                      </h1>
                    </div>
                    {elm.answer == "" ? (
                      <div className="bg-red-500 rounded-b-lg py-[1px]"></div>
                    ) : (
                      <div className="bg-green-500 rounded-b-lg py-[1px]"></div>
                    )}
                  </motion.div>
                  <AnimatePresence>
                    {tempIdButton == elm.id ? (
                      inputAnswer && (
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
                          onClick={() => handleAnswerChange()}
                        >
                          Kirim Pesan
                        </motion.button>
                      )
                    ) : (
                      <div></div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Dashboard;
