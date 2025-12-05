import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PortfolioController::downloadCv
* @see app/Http/Controllers/PortfolioController.php:120
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
* @see app/Http/Controllers/PortfolioController.php:120
* @route '/download-cv'
*/
downloadCv.url = (options?: RouteQueryOptions) => {
    return downloadCv.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortfolioController::downloadCv
* @see app/Http/Controllers/PortfolioController.php:120
* @route '/download-cv'
*/
downloadCv.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadCv.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortfolioController::downloadCv
* @see app/Http/Controllers/PortfolioController.php:120
* @route '/download-cv'
*/
downloadCv.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadCv.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PortfolioController::downloadCv
* @see app/Http/Controllers/PortfolioController.php:120
* @route '/download-cv'
*/
const downloadCvForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadCv.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortfolioController::downloadCv
* @see app/Http/Controllers/PortfolioController.php:120
* @route '/download-cv'
*/
downloadCvForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadCv.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortfolioController::downloadCv
* @see app/Http/Controllers/PortfolioController.php:120
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
    downloadCv: Object.assign(downloadCv, downloadCv),
}

export default portfolio