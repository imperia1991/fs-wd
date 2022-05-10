<script lang="ts">
    import './todo-item.css';
    import {enhance} from '$lib/actions/form';

    export let todo: Todo;
    export let processDeletedTodoResult: (res: Response) => void;
    export let processUpdatedTodoResult: (res: Response) => void;
</script>

<div class="todo" class:done={todo.done}>
    <form action="/todos/{todo.uid}.json?_method=PATCH" method="post" use:enhance={{
        result: processUpdatedTodoResult
    }}>
        <input type="hidden" name="done" value="{todo.done ? '' : 'true'}" />
        <button class="toggle" aria-label="Mark todo as {todo.done ? 'not done' : 'done'}"></button>
    </form>

    <form class="text" action="/todos/{todo.uid}.json?_method=PATCH" method="post" use:enhance={{
        result: processUpdatedTodoResult
    }}>
        <input type="text" name="text" value="{todo.text}" />
        <button class="save" aria-label="Save todo"></button>
    </form>

    <form action="/todos/{todo.uid}.json?_method=DELETE" method="post" use:enhance={{
        result: processDeletedTodoResult
    }}>
        <button class="delete" aria-label="Delete todo"></button>
    </form>
</div>
