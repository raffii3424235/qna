import { useState, useEffect } from "react";
import { set, ref, onValue, remove } from "firebase/database";
import { db } from "../firebase";
import { motion, AnimatePresence } from "framer-motion";

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

export default function Home() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState([]);
  const [showNick, setShowNick] = useState([]);
  const [random, setRandom] = useState([]);
  const tanggal = new Date().getDate().toString();
  const bulan = new Date().getMonth().toString();
  const tahun = new Date().getFullYear().toString();

  const addMessage = () => {
    const id = new Date().getTime().toString();
    set(ref(db, `/post/${id}`), {
      message: inputData,
      answer: "",
      date: tanggal,
      month: bulan,
      year: tahun,
      id,
    });
    setInputData("");
  };

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

    onValue(ref(db, `/nick`), (ss) => {
      setShowNick([]);
      const res = ss.val();
      if (res !== null) {
        Object.values(res).map((elm) => {
          setShowNick((oldArray) => [...oldArray, elm]);
        });
      }
    });

    onValue(ref(db, `/dadu`), (ss) => {
      setRandom([]);
      const res = ss.val();
      if (res !== null) {
        Object.values(res).map((elm) => {
          setRandom((oldArray) => [...oldArray, elm[0]]);
        });
      }
    });
  }, []);

  console.log(random);

  const removeAll = (id) => {
    remove(ref(db, id));
  };

  var string = "";
  function randomInt(limits) {
    return Math.floor(Math.random() * Math.floor(limits));
  }

  const catchRandom = (choices) => {
    var index = randomInt(choices.length);
    return choices[index];
  };

  const getRandom = () => {
    setInputData((string += catchRandom(random)));
  };

  return (
    <div>
      <motion.div
        initial="initial"
        animate="animate"
        exit={{ opacity: 0 }}
        className="h-full justify-center items-center text-center py-12 text-slate-100"
      >
        <div className="text-slate-100 text-base font-medium">
          <h1 className="uppercase">send a anonymous messages to</h1>
          {showNick.map((elmn, index) => {
            return (
              <div key={index}>
                <h2 className="text-xl font-bold rgb-text">{elmn}</h2>
              </div>
            );
          })}
        </div>
        <div className="py-4">
          <motion.textarea
            placeholder="Tulis Pesan..."
            className="text-slate-100 resize-none bg-[#1f1f1f] font-medium py-2 w-80 h-32 px-3 text-sm rounded-md focus:outline-0 outline-0"
            onChange={(e) => setInputData(e.target.value)}
            name="question"
            value={inputData}
            id="question"
            autoComplete="off"
            cols="30"
            rows="10"
          ></motion.textarea>
          <div className="bg-[#181818] mx-4 xl:mx-[465px] justify-between flex items-center rounded-md">
            {showNick.map((elmns, index) => {
              return (
                <div key={index}>
                  <p className="text-xs font-medium px-3">
                    *{elmns} tidak pernah tahu siapa yang mengirim pesan
                  </p>
                </div>
              );
            })}
            {random == "" ? (
              <motion.button
                whileTap={{ scale: 1.05 }}
                className="text-3xl py-1 bg-[#891ad3] rounded-md px-2"
              >
                🎲
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 1.05 }}
                className="text-3xl py-1 bg-[#891ad3] rounded-md px-2"
                onClick={getRandom}
              >
                🎲
              </motion.button>
            )}
          </div>
        </div>
        <div className="h-32">
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
                onClick={addMessage}
              >
                Kirim Pesan
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        <div>
          <motion.div
            variants={stagger}
            className="mx-8 flex flex-col-reverse xl:mx-[465px] "
          >
            {items.map((elm) => {
              return (
                <motion.div
                  key={elm.id}
                  variants={fadeInUp}
                  className="bg-[#3e3e3e] my-1 rounded-lg"
                >
                  <motion.h1 className="text-sm font-semibold py-3 ">
                    {elm.message}
                  </motion.h1>
                  {elm.answer != "" ? (
                    <motion.h1 className="bg-[#4e4e4e] py-4 text-sm">
                      {elm.answer}
                    </motion.h1>
                  ) : (
                    <motion.h1 className="bg-[#4e4e4e] text-slate-200 py-4 text-sm">
                      Tunggu Jawaban Darinya
                    </motion.h1>
                  )}
                  <motion.p className="bg-[#3e3e3e] rounded-lg text-xs text-right py-1 mx-2 text-slate-200">
                    {elm.date}.{elm.month}.{elm.year}
                  </motion.p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
