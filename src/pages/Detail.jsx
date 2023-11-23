import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTodo } from "../redux/modules/todos";

const Detail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const todo = useSelector((state) => state.todos);

  const todos = todo.filter((t) => t.id === id);

  const clickDeleteList = (index) => {
    const deletedList = todos.filter((t) => t !== todos[index]);

    dispatch(deleteTodo(deletedList));
    navigate(-1);
  };

  const clickHome = () => {
    return navigate(-1);
  };
  return (
    <div>
      {todos.map((t, index) => {
        console.log(t.isDone);
        return (
          <>
            <button onClick={clickHome}>이전 화면으로</button>
            <div key={t.id}>
              <div>제목 : {t.title}</div>
              <div>내용 : {t.body}</div>
              <div>완료 여부 : {String(t.isDone)}</div>
            </div>
            <button
              onClick={() => {
                clickDeleteList(index);
              }}
            >
              삭제
            </button>
          </>
        );
      })}
    </div>
  );
};

export default Detail;
