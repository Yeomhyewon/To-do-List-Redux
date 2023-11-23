import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import shortid from "shortid";
import { addTodo, deleteTodo, switchTodo } from "../redux/modules/todos";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  const todos = useSelector((state) => state.todos);

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const titleOnChange = (e) => setTitle(e.target.value);
  const bodyOnChange = (e) => setBody(e.target.value);

  const clickAddList = () => {
    const newList = {
      id: shortid.generate(),
      title,
      body,
      isDone: false,
    };
    dispatch(addTodo(newList));
    setBody("");
    setTitle("");
  };

  const clickDeleteList = (index) => {
    const deletedList = todos.filter((t) => t !== todos[index]);

    dispatch(deleteTodo(deletedList));
  };

  const clickSwitchList = (index) => {
    todos[index].isDone = !todos[index].isDone;

    dispatch(switchTodo([...todos]));
  };

  return (
    <>
      <div>
        <div>
          제목
          <input value={title} onChange={titleOnChange} />
          내용
          <input value={body} onChange={bodyOnChange} />
          <button onClick={clickAddList}>등록</button>
        </div>
        <div>
          할일목록
          <div>
            {todos
              .filter((t) => t.isDone === false)
              .map((t, index) => {
                return (
                  <Stdiv key={t.id}>
                    <div>
                      <Link to={`/${t.id}`}>
                        <div>{t.title}</div>
                        <div>{t.body}</div>
                      </Link>
                      <button
                        onClick={() => {
                          clickDeleteList(index);
                        }}
                      >
                        삭제
                      </button>
                      <button
                        onClick={() => {
                          clickSwitchList(index);
                        }}
                      >
                        완료
                      </button>
                    </div>
                  </Stdiv>
                );
              })}
          </div>
        </div>
      </div>
      <div>
        완료 목록
        <div>
          {todos
            .filter((t) => t.isDone === true)
            .map((t, index) => {
              return (
                <Stdiv key={t.id}>
                  <Link to={`/${t.id}`}>
                    <div>{t.title}</div>
                    <div>{t.body}</div>
                  </Link>
                  <button
                    onClick={() => {
                      clickDeleteList(index);
                    }}
                  >
                    삭제
                  </button>
                  <button
                    onClick={() => {
                      clickSwitchList(index);
                    }}
                  >
                    취소
                  </button>
                </Stdiv>
              );
            })}
        </div>
      </div>
    </>
  );
};

const Stdiv = styled.div`
  background-color: black;
  width: 200px;
  height: 200px;

  div {
    background-color: palegoldenrod;
  }
`;

export default Home;
