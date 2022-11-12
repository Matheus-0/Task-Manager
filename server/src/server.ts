import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'
import Fastify, { FastifyRequest } from 'fastify'
import { z } from 'zod'

const prisma = new PrismaClient({
    log: ['query'],
})

const fastify = Fastify({
    logger: true,
})

type MyRequest = FastifyRequest<{
    Params: {
        id: string
    }
}>

const start = async () => {
    await fastify.register(cors, {
        origin: true,
    })

    fastify.post('/tasks', async (request, reply) => {
        const taskBody = z.object({
            title: z.string(),
            description: z.string(),
            time: z.string().transform((t) => new Date(t)),
            durationMinutes: z.number()
        })

        const { title, description, time, durationMinutes } = taskBody.parse(request.body)

        await prisma.task.create({
            data: {
                title,
                description,
                time,
                durationMinutes
            }
        })

        return reply.status(201)
    })

    fastify.get('/tasks', async () => {
        const tasks = await prisma.task.findMany()

        return tasks
    })

    fastify.delete('/tasks/:id', async (request: MyRequest, reply) => {
        const id = z.string().parse(request.params.id)

        await prisma.task.delete({
            where: {
                id
            }
        })

        return reply.status(200)
    })

    try {
        await fastify.listen({ port: 3333 })
    } catch (err) {
        fastify.log.error(err)

        process.exit(1)
    }
}

start()