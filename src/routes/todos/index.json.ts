import type {RequestHandler} from '@sveltejs/kit';
import type {RequestEvent} from '@sveltejs/kit/types/private';
import {api} from './_api';

export const get: RequestHandler = (requestEvent: RequestEvent) => {
    return api(requestEvent);
}

export const post = async (requestEvent: RequestEvent): Promise<Partial<RequestHandler>> => {
    const data = await requestEvent.request.formData();

    return api(requestEvent, {
        text: data.get('text'),
        createdAt: new Date(),
        done: false
    });
}
