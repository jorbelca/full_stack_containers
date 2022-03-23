import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import Todo from "../Todos/Todo"

test("renders content", () => {
  const todo = {
    _id: "623a20e6eda54bd637c1c7e5",
    text: "Write code",
    done: true,
  }

  const element = render(<Todo id="todo" todo={todo}></Todo>)

  expect(element).toBeDefined()
  const text = screen.getByText("Write code")
  expect(text).toBeDefined()
})
