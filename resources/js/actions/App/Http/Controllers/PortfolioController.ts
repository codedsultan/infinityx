import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
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
* @see \App\Http\Controllers\PortfolioController::downloadCV
* @see app/Http/Controllers/PortfolioController.php:120
* @route '/download-cv'
*/
export const downloadCV = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadCV.url(options),
    method: 'get',
})

downloadCV.definition = {
    methods: ["get","head"],
    url: '/download-cv',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PortfolioController::downloadCV
* @see app/Http/Controllers/PortfolioController.php:120
* @route '/download-cv'
*/
downloadCV.url = (options?: RouteQueryOptions) => {
    return downloadCV.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortfolioController::downloadCV
* @see app/Http/Controllers/PortfolioController.php:120
* @route '/download-cv'
*/
downloadCV.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadCV.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortfolioController::downloadCV
* @see app/Http/Controllers/PortfolioController.php:120
* @route '/download-cv'
*/
downloadCV.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadCV.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PortfolioController::downloadCV
* @see app/Http/Controllers/PortfolioController.php:120
* @route '/download-cv'
*/
const downloadCVForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadCV.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortfolioController::downloadCV
* @see app/Http/Controllers/PortfolioController.php:120
* @route '/download-cv'
*/
downloadCVForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadCV.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortfolioController::downloadCV
* @see app/Http/Controllers/PortfolioController.php:120
* @route '/download-cv'
*/
downloadCVForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadCV.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

downloadCV.form = downloadCVForm

const PortfolioController = { index, downloadCV }

export default PortfolioController