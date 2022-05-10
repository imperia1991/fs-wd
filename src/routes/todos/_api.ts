import type {RequestEvent} from '@sveltejs/kit/types/private';
import PrismaClient from '$lib/prisma';

const prisma = new PrismaClient();

export const api = async (requestEvent: RequestEvent, data?: Record<string, unknown>) => {
    const method = requestEvent.request.method.toUpperCase();
    let body = {};
    let status = 500;

    switch (method) {
        case 'GET':
            body = await prisma.todo.findMany();
            status = 200;
            break;
        case 'POST':
            body = await prisma.todo.create({
                data: {
                    ...data! as Todo
                }
            });
            status = 201;
            break;
        case 'DELETE': {
            body = await prisma.todo.delete({
                where: {
                    uid: requestEvent.params.uid
                }
            });
            status = 200;
            break;
        }
        case 'PATCH': {
            const oldTodo = await prisma.todo.findFirst({
                where: {
                    uid: requestEvent.params.uid
                }
            });

            body = await prisma.todo.update({
                where: {
                    uid: requestEvent.params.uid
                },
                data: {
                    done: data!.done ? !!data!.done as boolean : oldTodo!.done,
                    text: data!.text ? data!.text as string : oldTodo!.text
                }
            })

            status = 200;
            break;
        }
        default:
            break;
    }

    if (method !== 'GET' && requestEvent.request.headers.get('accept') !== 'application/json') {
        return {
            status: 303,
            headers: {
                location: '/'
            }
        }
    }

    return {
        status,
        body
    };
}
