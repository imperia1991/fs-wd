import type {RequestHandler} from '@sveltejs/kit';
import type {RequestEvent} from '@sveltejs/kit/types/private';
import {api} from './_api';

export const del: RequestHandler = (request) => {
    return api(request);
}

export const patch = async (requestEvent: RequestEvent): Promise<Partial<RequestHandler>> => {
    const data = await requestEvent.request.formData();

    return api(requestEvent, {
        text: data.get('text'),
        done: data.get('done')
    });
}
