const cluster = require("cluster")
const http = require("http")
require("dotenv").config()
const numCPUs = require("os").cpus().length
const { setupMaster } = require("@socket.io/sticky")
const PORT = process.env.PORT || 3000

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`)

  const httpServer = http.createServer()
  setupMaster(httpServer, {
    loadBalancingMethod: "least-connection", // either "random", "round-robin" or "least-connection"
  })

  httpServer.listen(PORT, () =>
    console.log(`server listening at http://localhost:${PORT}`)
  )

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`)
    cluster.fork()
  })
} else {
  console.log(`Worker ${process.pid} started`)
  require("./server")
}
