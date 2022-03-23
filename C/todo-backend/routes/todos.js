const express = require("express")
const { Todo } = require("../mongo")
const router = express.Router()
const redis = require("../redis")

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos)
})

/* POST todo to listing. */
router.post("/", async (req, res) => {
  let t
  let todos
  try {
    t = await redis.getAsync("statistics")
    if (t == null || t == undefined || !t)
      return {
        added_todos: 0,
      }
    let tod
    if (t) tod = JSON.parse(t)

    if (tod.added_todos !== undefined || tod.added_todos !== null) {
      todos = tod.added_todos + 1
    }
  } catch (e) {
    console.error(e)
    todos = 0
  }

  redis.setAsync([
    "statistics",
    JSON.stringify({
      added_todos: todos,
    }),
  ])
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  })
  res.send(todo)
})

const singleRouter = express.Router()

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200)
})

/* GET todo. */
singleRouter.get("/:id?", async (req, res) => {
  const todo = await req.todo

  res.send(todo)
})

/* PUT todo. */
singleRouter.put("/:id?", async (req, res) => {
  try {
    const resp = await Todo.updateOne(
      { _id: req.todo._id },
      {
        $set: {
          text: req.body.text,
          done: req.body.done,
        },
      }
    )
    res.status(201).json({
      message: "Todo updated",
      resp,
    })
  } catch (e) {
    res.status(400).json({ error: e })
  }
})

router.use("/:id", findByIdMiddleware, singleRouter)

module.exports = router
