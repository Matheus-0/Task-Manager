import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'
import Fastify from 'fastify'
import { z } from 'zod'

const prisma = new PrismaClient({
    log: ['query'],
})

const fastify = Fastify({
    logger: true,
})

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

        const createdTask = await prisma.task.create({
            data: {
                title,
                description,
                time,
                durationMinutes
            }
        })

        return reply.status(201).send(createdTask)
    })

    fastify.get('/tasks', async () => {
        const tasks = await prisma.task.findMany()

        return tasks
    })

    fastify.get('/tasks/:query', async (request, reply) => {
        const { query } = z.object({
            query: z.string()
        }).parse(request.params)

        const tasks = await prisma.task.findMany({
            where: {
                title: {
                    contains: query
                }
            }
        })

        return reply.status(200).send(tasks)
    })

    fastify.put('/tasks/:id', async (request, reply) => {
        const { id } = z.object({
            id: z.string()
        }).parse(request.params)

        const taskBody = z.object({
            title: z.string(),
            description: z.string(),
            time: z.string().transform((t) => new Date(t)),
            durationMinutes: z.number()
        })

        const { title, description, time, durationMinutes } = taskBody.parse(request.body)

        const updatedTask = await prisma.task.update({
            where: {
                id
            },
            data: {
                title, description, time, durationMinutes
            }
        })

        return reply.status(200).send(updatedTask)
    })

    fastify.delete('/tasks/:id', async (request, reply) => {
        const { id } = z.object({
            id: z.string()
        }).parse(request.params)

        const deletedTask = await prisma.task.delete({
            where: {
                id
            }
        })

        return reply.status(200).send(deletedTask)
    })

    try {
        await fastify.listen({ port: 3333 })
    } catch (err) {
        fastify.log.error(err)

        process.exit(1)
    }
}

start()