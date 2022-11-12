import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
    const task = await prisma.task.create({
        data: {
            title: 'Teste',
            description: 'Esta é uma tarefa teste.',
            time: '2022-11-13T19:30:00Z',
            durationMinutes: 30
        }
    })
}

main()