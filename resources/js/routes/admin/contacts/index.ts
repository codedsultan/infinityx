import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AdminContactController::index
* @see app/Http/Controllers/Admin/AdminContactController.php:15
* @route '/manage/contacts'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/manage/contacts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminContactController::index
* @see app/Http/Controllers/Admin/AdminContactController.php:15
* @route '/manage/contacts'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminContactController::index
* @see app/Http/Controllers/Admin/AdminContactController.php:15
* @route '/manage/contacts'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\AdminContactController::index
* @see app/Http/Controllers/Admin/AdminContactController.php:15
* @route '/manage/contacts'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\AdminContactController::index
* @see app/Http/Controllers/Admin/AdminContactController.php:15
* @route '/manage/contacts'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\AdminContactController::index
* @see app/Http/Controllers/Admin/AdminContactController.php:15
* @route '/manage/contacts'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\AdminContactController::index
* @see app/Http/Controllers/Admin/AdminContactController.php:15
* @route '/manage/contacts'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\Admin\AdminContactController::show
* @see app/Http/Controllers/Admin/AdminContactController.php:80
* @route '/manage/contacts/{contact}'
*/
export const show = (args: { contact: string | { id: string } } | [contact: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/manage/contacts/{contact}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminContactController::show
* @see app/Http/Controllers/Admin/AdminContactController.php:80
* @route '/manage/contacts/{contact}'
*/
show.url = (args: { contact: string | { id: string } } | [contact: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { contact: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { contact: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            contact: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        contact: typeof args.contact === 'object'
        ? args.contact.id
        : args.contact,
    }

    return show.definition.url
            .replace('{contact}', parsedArgs.contact.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminContactController::show
* @see app/Http/Controllers/Admin/AdminContactController.php:80
* @route '/manage/contacts/{contact}'
*/
show.get = (args: { contact: string | { id: string } } | [contact: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\AdminContactController::show
* @see app/Http/Controllers/Admin/AdminContactController.php:80
* @route '/manage/contacts/{contact}'
*/
show.head = (args: { contact: string | { id: string } } | [contact: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\AdminContactController::show
* @see app/Http/Controllers/Admin/AdminContactController.php:80
* @route '/manage/contacts/{contact}'
*/
const showForm = (args: { contact: string | { id: string } } | [contact: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\AdminContactController::show
* @see app/Http/Controllers/Admin/AdminContactController.php:80
* @route '/manage/contacts/{contact}'
*/
showForm.get = (args: { contact: string | { id: string } } | [contact: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\AdminContactController::show
* @see app/Http/Controllers/Admin/AdminContactController.php:80
* @route '/manage/contacts/{contact}'
*/
showForm.head = (args: { contact: string | { id: string } } | [contact: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\Admin\AdminContactController::markRead
* @see app/Http/Controllers/Admin/AdminContactController.php:107
* @route '/manage/contacts/{contact}/mark-read'
*/
export const markRead = (args: { contact: string | { id: string } } | [contact: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markRead.url(args, options),
    method: 'post',
})

markRead.definition = {
    methods: ["post"],
    url: '/manage/contacts/{contact}/mark-read',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdminContactController::markRead
* @see app/Http/Controllers/Admin/AdminContactController.php:107
* @route '/manage/contacts/{contact}/mark-read'
*/
markRead.url = (args: { contact: string | { id: string } } | [contact: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { contact: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { contact: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            contact: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        contact: typeof args.contact === 'object'
        ? args.contact.id
        : args.contact,
    }

    return markRead.definition.url
            .replace('{contact}', parsedArgs.contact.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminContactController::markRead
* @see app/Http/Controllers/Admin/AdminContactController.php:107
* @route '/manage/contacts/{contact}/mark-read'
*/
markRead.post = (args: { contact: string | { id: string } } | [contact: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markRead.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\AdminContactController::markRead
* @see app/Http/Controllers/Admin/AdminContactController.php:107
* @route '/manage/contacts/{contact}/mark-read'
*/
const markReadForm = (args: { contact: string | { id: string } } | [contact: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markRead.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\AdminContactController::markRead
* @see app/Http/Controllers/Admin/AdminContactController.php:107
* @route '/manage/contacts/{contact}/mark-read'
*/
markReadForm.post = (args: { contact: string | { id: string } } | [contact: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markRead.url(args, options),
    method: 'post',
})

markRead.form = markReadForm

/**
* @see \App\Http\Controllers\Admin\AdminContactController::markReplied
* @see app/Http/Controllers/Admin/AdminContactController.php:117
* @route '/manage/contacts/{contact}/mark-replied'
*/
export const markReplied = (args: { contact: string | { id: string } } | [contact: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markReplied.url(args, options),
    method: 'post',
})

markReplied.definition = {
    methods: ["post"],
    url: '/manage/contacts/{contact}/mark-replied',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdminContactController::markReplied
* @see app/Http/Controllers/Admin/AdminContactController.php:117
* @route '/manage/contacts/{contact}/mark-replied'
*/
markReplied.url = (args: { contact: string | { id: string } } | [contact: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { contact: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { contact: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            contact: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        contact: typeof args.contact === 'object'
        ? args.contact.id
        : args.contact,
    }

    return markReplied.definition.url
            .replace('{contact}', parsedArgs.contact.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminContactController::markReplied
* @see app/Http/Controllers/Admin/AdminContactController.php:117
* @route '/manage/contacts/{contact}/mark-replied'
*/
markReplied.post = (args: { contact: string | { id: string } } | [contact: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markReplied.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\AdminContactController::markReplied
* @see app/Http/Controllers/Admin/AdminContactController.php:117
* @route '/manage/contacts/{contact}/mark-replied'
*/
const markRepliedForm = (args: { contact: string | { id: string } } | [contact: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markReplied.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\AdminContactController::markReplied
* @see app/Http/Controllers/Admin/AdminContactController.php:117
* @route '/manage/contacts/{contact}/mark-replied'
*/
markRepliedForm.post = (args: { contact: string | { id: string } } | [contact: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markReplied.url(args, options),
    method: 'post',
})

markReplied.form = markRepliedForm

/**
* @see \App\Http\Controllers\Admin\AdminContactController::destroy
* @see app/Http/Controllers/Admin/AdminContactController.php:127
* @route '/manage/contacts/{contact}'
*/
export const destroy = (args: { contact: string | { id: string } } | [contact: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/manage/contacts/{contact}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\AdminContactController::destroy
* @see app/Http/Controllers/Admin/AdminContactController.php:127
* @route '/manage/contacts/{contact}'
*/
destroy.url = (args: { contact: string | { id: string } } | [contact: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { contact: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { contact: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            contact: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        contact: typeof args.contact === 'object'
        ? args.contact.id
        : args.contact,
    }

    return destroy.definition.url
            .replace('{contact}', parsedArgs.contact.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminContactController::destroy
* @see app/Http/Controllers/Admin/AdminContactController.php:127
* @route '/manage/contacts/{contact}'
*/
destroy.delete = (args: { contact: string | { id: string } } | [contact: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\AdminContactController::destroy
* @see app/Http/Controllers/Admin/AdminContactController.php:127
* @route '/manage/contacts/{contact}'
*/
const destroyForm = (args: { contact: string | { id: string } } | [contact: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\AdminContactController::destroy
* @see app/Http/Controllers/Admin/AdminContactController.php:127
* @route '/manage/contacts/{contact}'
*/
destroyForm.delete = (args: { contact: string | { id: string } } | [contact: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const contacts = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
    markRead: Object.assign(markRead, markRead),
    markReplied: Object.assign(markReplied, markReplied),
    destroy: Object.assign(destroy, destroy),
}

export default contacts