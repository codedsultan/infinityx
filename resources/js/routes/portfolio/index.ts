import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PortfolioController::index
* @see app/Http/Controllers/PortfolioController.php:17
* @route '/'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PortfolioController::index
* @see app/Http/Controllers/PortfolioController.php:17
* @route '/'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortfolioController::index
* @see app/Http/Controllers/PortfolioController.php:17
* @route '/'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortfolioController::index
* @see app/Http/Controllers/PortfolioController.php:17
* @route '/'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PortfolioController::index
* @see app/Http/Controllers/PortfolioController.php:17
* @route '/'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortfolioController::index
* @see app/Http/Controllers/PortfolioController.php:17
* @route '/'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortfolioController::index
* @see app/Http/Controllers/PortfolioController.php:17
* @route '/'
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
* @see \App\Http\Controllers\PortfolioController::downloadCv
* @see app/Http/Controllers/PortfolioController.php:119
* @route '/download-cv'
*/
export const downloadCv = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadCv.url(options),
    method: 'get',
})

downloadCv.definition = {
    methods: ["get","head"],
    url: '/download-cv',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PortfolioController::downloadCv
* @see app/Http/Controllers/PortfolioController.php:119
* @route '/download-cv'
*/
downloadCv.url = (options?: RouteQueryOptions) => {
    return downloadCv.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortfolioController::downloadCv
* @see app/Http/Controllers/PortfolioController.php:119
* @route '/download-cv'
*/
downloadCv.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadCv.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortfolioController::downloadCv
* @see app/Http/Controllers/PortfolioController.php:119
* @route '/download-cv'
*/
downloadCv.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadCv.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PortfolioController::downloadCv
* @see app/Http/Controllers/PortfolioController.php:119
* @route '/download-cv'
*/
const downloadCvForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadCv.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortfolioController::downloadCv
* @see app/Http/Controllers/PortfolioController.php:119
* @route '/download-cv'
*/
downloadCvForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadCv.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortfolioController::downloadCv
* @see app/Http/Controllers/PortfolioController.php:119
* @route '/download-cv'
*/
downloadCvForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadCv.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

downloadCv.form = downloadCvForm

const portfolio = {
    index: Object.assign(index, index),
    downloadCv: Object.assign(downloadCv, downloadCv),
}

export default portfolio