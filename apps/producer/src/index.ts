import { Hono } from 'hono'
import { connectQueue } from './config/queue'

const app = new Hono()

connectQueue().then((queue) => {
  console.log("connected");

  app.post("/send", async (c) => {
    const message = await c.req.json()
    if (!queue) throw new Error("queue not defined");

    queue.channel.publish(queue.queue, Buffer.from(message.toString()), {
      persistent: true
    })

    console.log(`Message: ${message.toString()} send to queue: ${queue.queue}`);
    return c.json({
      success: true
    }, 200)
  })
})

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
