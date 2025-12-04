import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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
* @see \App\Http\Controllers\Admin\AdminContactController::markAsRead
* @see app/Http/Controllers/Admin/AdminContactController.php:107
* @route '/manage/contacts/{contact}/mark-read'
*/
export const markAsRead = (args: { contact: string | { id: string } } | [contact: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markAsRead.url(args, options),
    method: 'post',
})

markAsRead.definition = {
    methods: ["post"],
    url: '/manage/contacts/{contact}/mark-read',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdminContactController::markAsRead
* @see app/Http/Controllers/Admin/AdminContactController.php:107
* @route '/manage/contacts/{contact}/mark-read'
*/
markAsRead.url = (args: { contact: string | { id: string } } | [contact: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return markAsRead.definition.url
            .replace('{contact}', parsedArgs.contact.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminContactController::markAsRead
* @see app/Http/Controllers/Admin/AdminContactController.php:107
* @route '/manage/contacts/{contact}/mark-read'
*/
markAsRead.post = (args: { contact: string | { id: string } } | [contact: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markAsRead.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\AdminContactController::markAsRead
* @see app/Http/Controllers/Admin/AdminContactController.php:107
* @route '/manage/contacts/{contact}/mark-read'
*/
const markAsReadForm = (args: { contact: string | { id: string } } | [contact: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markAsRead.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\AdminContactController::markAsRead
* @see app/Http/Controllers/Admin/AdminContactController.php:107
* @route '/manage/contacts/{contact}/mark-read'
*/
markAsReadForm.post = (args: { contact: string | { id: string } } | [contact: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markAsRead.url(args, options),
    method: 'post',
})

markAsRead.form = markAsReadForm

/**
* @see \App\Http\Controllers\Admin\AdminContactController::markAsReplied
* @see app/Http/Controllers/Admin/AdminContactController.php:117
* @route '/manage/contacts/{contact}/mark-replied'
*/
export const markAsReplied = (args: { contact: string | { id: string } } | [contact: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markAsReplied.url(args, options),
    method: 'post',
})

markAsReplied.definition = {
    methods: ["post"],
    url: '/manage/contacts/{contact}/mark-replied',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdminContactController::markAsReplied
* @see app/Http/Controllers/Admin/AdminContactController.php:117
* @route '/manage/contacts/{contact}/mark-replied'
*/
markAsReplied.url = (args: { contact: string | { id: string } } | [contact: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return markAsReplied.definition.url
            .replace('{contact}', parsedArgs.contact.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminContactController::markAsReplied
* @see app/Http/Controllers/Admin/AdminContactController.php:117
* @route '/manage/contacts/{contact}/mark-replied'
*/
markAsReplied.post = (args: { contact: string | { id: string } } | [contact: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markAsReplied.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\AdminContactController::markAsReplied
* @see app/Http/Controllers/Admin/AdminContactController.php:117
* @route '/manage/contacts/{contact}/mark-replied'
*/
const markAsRepliedForm = (args: { contact: string | { id: string } } | [contact: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markAsReplied.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\AdminContactController::markAsReplied
* @see app/Http/Controllers/Admin/AdminContactController.php:117
* @route '/manage/contacts/{contact}/mark-replied'
*/
markAsRepliedForm.post = (args: { contact: string | { id: string } } | [contact: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markAsReplied.url(args, options),
    method: 'post',
})

markAsReplied.form = markAsRepliedForm

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

const AdminContactController = { index, show, markAsRead, markAsReplied, destroy }

export default AdminContactController