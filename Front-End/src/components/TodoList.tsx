import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import {
  addTodoItem,
  deleteTodoItem,
  editTodoItem,
  fetchTodo,
  setEditItem,
} from "../store/slices/todoItemSlice";

export const TodoList = () => {
  const dispatch = useAppDispatch();
  const { data, editItem } = useAppSelector((state) => state.todoList);
  const [newTodo, setNewTodo] = useState("");
  const [completedTodos, setCompletedTodos] = useState<any>([]);

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteTodoItem(id));
  };

  const handleEdit = (todoItem: any) => {
    setNewTodo(todoItem.item);
    dispatch(setEditItem(todoItem));
    console.log(todoItem);
  };

  const handleAddEditTodo = useCallback(async () => {
    if (editItem._id) {
      await dispatch(
        editTodoItem({ id: editItem._id, item: { item: newTodo } })
      );
    } else {
      await dispatch(addTodoItem({ item: newTodo }));
    }
    setNewTodo("");
    dispatch(setEditItem([]));
  }, [dispatch, editItem._id, newTodo]);

  const toggleCompleted = (id: string) => {
    if (completedTodos.includes(id)) {
      setCompletedTodos(
        completedTodos.filter((todoId: string) => todoId !== id)
      );
    } else {
      setCompletedTodos([...completedTodos, id]);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          width: "30%",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Todo List</h1>
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder={editItem?._id ? "Edit Todo" : "Add Todo"}
            style={{
              marginRight: "10px",
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={handleAddEditTodo}
            style={{
              padding: "5px 10px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {editItem?._id ? "Update" : "Add"}
          </button>
          {editItem?._id && (
            <button
              onClick={() => {
                dispatch(setEditItem([]));
                setNewTodo("");
              }}
              style={{
                padding: "5px 10px",
                backgroundColor: "#28a745",
                color: "#fff",
                marginLeft: "2px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          )}
        </div>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {data.map((todo) => (
            <li
              key={todo._id}
              style={{
                marginBottom: "10px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "5px",
                overflow: "hidden",
                textDecoration: completedTodos.includes(todo._id)
                  ? "line-through"
                  : "none",
              }}
            >
              <div
                style={{
                  padding: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <input
                  type="checkbox"
                  checked={completedTodos.includes(todo._id)}
                  onChange={() => toggleCompleted(todo._id)}
                  style={{ marginRight: "10px" }}
                />
                <span>{todo.item}</span>
                <div>
                  <button
                    style={{
                      marginRight: "10px",
                      padding: "5px 10px",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleEdit(todo)}
                  >
                    Edit
                  </button>
                  <button
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDelete(todo._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
