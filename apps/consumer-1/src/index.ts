import { Hono } from 'hono'
import * as amqplib from "amqplib"

const app = new Hono();

(
  async () => {
    try {
      const connection = await amqplib.connect('amqp://localhost')
      const channel = await connection.createChannel()
      const queue = "task_queue"

      await channel.assertQueue(queue, {
        durable: true
      })

      console.log("connected to rabbitMQ");

      channel.consume(queue, (msg) => {
        if(msg !== null) {
          const messageContent = msg.content.toString()

          console.log(`Got from: ${queue} msg: ${messageContent}`);
          channel.ack(msg)
        }
      })

    } catch (err) {

    }
  }
)()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})


export default {
  fetch: app.fetch,
  port:3001
}

