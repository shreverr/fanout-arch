import * as amqplib from "amqplib"

export const connectQueue = async () => {
  try {
    const connection =  await amqplib.connect('amqp://localhost')
    const channel = await connection.createChannel()
    const queue = "task_queue"
    
    await channel.assertExchange(queue,'fanout', {
      durable: true
    })

    console.log("connected to rabbitMQ");

    return {connection, channel, queue}
    
  } catch (err) {

  }
}