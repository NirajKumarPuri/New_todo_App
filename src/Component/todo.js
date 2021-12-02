import React from "react";
import styles from "./todo.module.css";
import { useState, useEffect } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const getLocalData = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};
const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [item, setItem] = useState(getLocalData());
  const [toggle, setToggle] = useState(true);
  const [isEditData, setEditData] = useState(null);

  const addItem = () => {
    if (!inputData) {
      alert("plzz fill data");
    } else if (inputData && !toggle) {
      setItem(
        item.map((elm) => {
          if (elm.id === isEditData) {
            return { ...elm, name: inputData };
          }
          return elm;
        })
      );
      setInputData("");
      setToggle(true);
      setEditData(null);
    } else {
      const allINputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItem([...item, allINputData]);
      setInputData("");
    }
  };
  const deleteItem = (id) => {
    const updatedItem = item.filter((ele) => {
      return ele.id != id;
    });
    setItem(updatedItem);
  };
  const removeAll = () => {
    setItem([]);
  };
  const editItem = (id) => {
    const edititem = item.find((elm) => {
      return id === elm.id;
    });
    setInputData(edititem.name);
    setToggle(false);
    setEditData(id);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(item));
  }, [item]);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.header}>Add Your List Hear✌ </h1>
          <div className={styles.inputbox}>
            <input
              type="text"
              className={styles.input}
              placeholder="✍ Add Items ..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggle ? (
              <i
                className="fa fa-plus add-btn"
                style={{
                  color: "green",
                  position: "absolute",
                  top: "6px",
                  left: "440px",
                }}
                title="add Item"
                onClick={() => addItem()}
              ></i>
            ) : (
              <EditOutlined
                style={{
                  color: "green",
                  position: "absolute",
                  top: "6px",
                  left: "440px",
                }}
                onClick={() => addItem()}
              />
            )}
          </div>
          {item
            ? item.map((elm) => {
                return (
                  <div className={styles.listbox} key={elm.id}>
                    <h1 className={styles.headertext}>{elm.name}</h1>
                    <div className={styles.iconbox}>
                      <EditOutlined onClick={() => editItem(elm.id)} />
                      <DeleteOutlined onClick={() => deleteItem(elm.id)} />
                    </div>
                  </div>
                );
              })
            : ""}
          {item.length > 0 ? (
            <div className={styles.buttonbox}>
              <button className={styles.button} onClick={() => removeAll()}>
                <span>Remove All</span>
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
export default Todo;
