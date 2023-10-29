import React, { useEffect, useRef, useState } from "react";
import "../Components/Todo.css";

function Todo() {
  const [inputstate, setInputState] = useState("");//used to set the value in input field
  const [inputsubmit, setInputSubmit] = useState([]);//used to store the value
  const [inputedit, setInputEdit] = useState(null);//used to store the index of edited one
  const [editinputvalue, setEditInputValue] = useState("");//used to store the value of edited one

  const handleInput = (e) => {
    setInputState(e.target.value);
  };

  const handleEdit = (index) => {
    setInputEdit(index);
    setEditInputValue(inputsubmit[index]);
  };

  const handleSave = (index) => {
    const updatedItems = inputsubmit.map((item, i) =>
      i === index ? editinputvalue : item
    );
    setInputSubmit(updatedItems);
    setInputEdit(null);
    setEditInputValue("");
  };

  const handleDelete = (index) => {
    const updatedItems = inputsubmit.filter((_, i) => i !== index);
    setInputSubmit(updatedItems);
  };

  const handleAllDelete = () => {
    setInputSubmit([]);
  };

  const iref = useRef();
  const editref = useRef();

  useEffect(() => {
    iref.current.focus();
  }, []);

  useEffect(() => {
    if (editref.current && inputedit !== null) {
      editref.current.focus();
    }
  }, [inputedit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputstate.trim() !== "") {
      // if (inputedit !== null) {
      //   const updatedList = inputsubmit.map((item, index) =>
      //     index === inputedit ? inputstate : item
      //   );
      //   setInputSubmit(updatedList);
      //   setInputEdit(null);
      //   setInputState("");
      // } else {
        setInputSubmit([...inputsubmit, inputstate]);
        setInputState("");
      // }
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="heading border rounded-pill mb-3 p-2">
        <h1>Todo List</h1>
      </div>
      <form className="form-class border rounded-pill d-flex justify-content-center align-items-center">
        <div
          className="textBox border bg-white rounded-pill d-flex justify-content-between align-items-center p-2"
          style={{ width: "800px" }}
        >
          <input
            className="p-2 rounded-pill border-0"
            style={{ width: "900px" }}
            type="text"
            ref={iref}
            placeholder="Enter todo here...!"
            value={inputstate}
            onChange={(e) => handleInput(e)}
          />
          <button
            onClick={handleSubmit}
            className="btn btn-primary rounded-pill ml-2"
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </form>
      <div>
        <ul className="list-unstyled">
          {inputsubmit.length > 0 ? (
            <>
              <div
                className="d-flex justify-content-between align-items-center mt-3 rounded-pill"
                style={{
                  padding: "5px",
                  backgroundColor: "#ffc107",
                  width: "400px",
                  height: "70px",
                }}
              >
                <p
                  className="fw-bolder mt-4 rounded-pill p-1  "
                  style={{
                    color: "black",
                    marginRight: "20px",
                    borderRadius: "4px",
                    backgroundColor: "#ffc107",
                    width: "300px",
                    textAlign: "center",
                  }}
                >
  Your Task List
                </p>
                <i
                  onClick={handleAllDelete}
                  className="fa-solid fa-trash fa-2xl me-5"
                  style={{ color: "#dc3545", cursor: "pointer" }}
                ></i>
              </div>

              {inputsubmit.map((item, index) => (
                <li
                  className="rounded-pill p-2 d-flex justify-content-between align-items-center"
                  key={index}
                  style={{
                    padding: "10px",
                    marginRight: "490px",
                    marginTop: "30px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "5px",
                    minWidth: "300px",
                    height: "60px",
                  }}
                >
                  {inputedit !== index ? (
                    item
                  ) : (
                    <input
                      type="text"
                      ref={editref}
                      onChange={(e) => setEditInputValue(e.target.value)}
                      value={editinputvalue}
                      className="p-2 rounded-pill border-0"
                    />
                  )}
                  <div className="d-flex justify-content-center align-items-center">
                    <i
                      onClick={() => handleDelete(index)}
                      className="fa-solid fa-trash fa-beat me-2 ms-4"
                      style={{ color: "red",cursor:"pointer" }}
                    ></i>
                    <i
                      onClick={() =>
                        inputedit === index
                          ? handleSave(index)
                          : handleEdit(index)
                      }
                      className={`fa-solid ${
                        inputedit === index ? "fa-save" : "fa-pen-to-square"
                      } fa-beat ms-3`}
                      style={{ color: "green" ,cursor:"pointer"}}
                    ></i>
                  </div>
                </li>
              ))}
            </>
          ) : (
            <p
              className="fw-bolder mt-4 rounded-pill p-1 "
              style={{
                color: "black",
                marginRight: "50px",
                borderRadius: "4px",
                backgroundColor: "white",
              }}
            >
  No tasks have been added. Feel free to start adding tasks above!
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
