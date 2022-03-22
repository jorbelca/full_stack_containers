const express = require("express")
const router = express.Router()
const redis = require("../redis")
const configs = require("../util/config")

let visits = 0

/* GET index data. */
router.get("/", async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits,
  })
})

router.get("/statistics", async (req, res) => {
  const resp = await redis.getAsync("statistics")
  if (!resp) {
    redis.setAsync([
      "statistics",
      JSON.stringify({
        added_todos: 0,
      }),
    ])
  }
  res.send(resp)
})
module.exports = router
