import cors from '@fastify/cors'
import Fastify from 'fastify'

import { taskRoutes } from './routes/task'

const fastify = Fastify({
    logger: true,
})

const start = async () => {
    await fastify.register(cors, {
        origin: true,
    })

    await fastify.register(taskRoutes)

    try {
        await fastify.listen({ port: 3333 })
    } catch (err) {
        fastify.log.error(err)

        process.exit(1)
    }
}

start()