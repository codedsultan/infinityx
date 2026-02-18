import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \Spatie\Prometheus\Http\Controllers\PrometheusMetricsController::__invoke
* @see vendor/spatie/laravel-prometheus/src/Http/Controllers/PrometheusMetricsController.php:12
* @route '/prometheus'
*/
export const defaultMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: defaultMethod.url(options),
    method: 'get',
})

defaultMethod.definition = {
    methods: ["get","head"],
    url: '/prometheus',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Spatie\Prometheus\Http\Controllers\PrometheusMetricsController::__invoke
* @see vendor/spatie/laravel-prometheus/src/Http/Controllers/PrometheusMetricsController.php:12
* @route '/prometheus'
*/
defaultMethod.url = (options?: RouteQueryOptions) => {
    return defaultMethod.definition.url + queryParams(options)
}

/**
* @see \Spatie\Prometheus\Http\Controllers\PrometheusMetricsController::__invoke
* @see vendor/spatie/laravel-prometheus/src/Http/Controllers/PrometheusMetricsController.php:12
* @route '/prometheus'
*/
defaultMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: defaultMethod.url(options),
    method: 'get',
})

/**
* @see \Spatie\Prometheus\Http\Controllers\PrometheusMetricsController::__invoke
* @see vendor/spatie/laravel-prometheus/src/Http/Controllers/PrometheusMetricsController.php:12
* @route '/prometheus'
*/
defaultMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: defaultMethod.url(options),
    method: 'head',
})

/**
* @see \Spatie\Prometheus\Http\Controllers\PrometheusMetricsController::__invoke
* @see vendor/spatie/laravel-prometheus/src/Http/Controllers/PrometheusMetricsController.php:12
* @route '/prometheus'
*/
const defaultMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: defaultMethod.url(options),
    method: 'get',
})

/**
* @see \Spatie\Prometheus\Http\Controllers\PrometheusMetricsController::__invoke
* @see vendor/spatie/laravel-prometheus/src/Http/Controllers/PrometheusMetricsController.php:12
* @route '/prometheus'
*/
defaultMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: defaultMethod.url(options),
    method: 'get',
})

/**
* @see \Spatie\Prometheus\Http\Controllers\PrometheusMetricsController::__invoke
* @see vendor/spatie/laravel-prometheus/src/Http/Controllers/PrometheusMetricsController.php:12
* @route '/prometheus'
*/
defaultMethodForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: defaultMethod.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

defaultMethod.form = defaultMethodForm

/**
* @see \Spatie\Prometheus\Http\Controllers\PrometheusMetricsController::__invoke
* @see vendor/spatie/laravel-prometheus/src/Http/Controllers/PrometheusMetricsController.php:12
* @route '/metrics'
*/
export const metrics = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: metrics.url(options),
    method: 'get',
})

metrics.definition = {
    methods: ["get","head"],
    url: '/metrics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Spatie\Prometheus\Http\Controllers\PrometheusMetricsController::__invoke
* @see vendor/spatie/laravel-prometheus/src/Http/Controllers/PrometheusMetricsController.php:12
* @route '/metrics'
*/
metrics.url = (options?: RouteQueryOptions) => {
    return metrics.definition.url + queryParams(options)
}

/**
* @see \Spatie\Prometheus\Http\Controllers\PrometheusMetricsController::__invoke
* @see vendor/spatie/laravel-prometheus/src/Http/Controllers/PrometheusMetricsController.php:12
* @route '/metrics'
*/
metrics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: metrics.url(options),
    method: 'get',
})

/**
* @see \Spatie\Prometheus\Http\Controllers\PrometheusMetricsController::__invoke
* @see vendor/spatie/laravel-prometheus/src/Http/Controllers/PrometheusMetricsController.php:12
* @route '/metrics'
*/
metrics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: metrics.url(options),
    method: 'head',
})

/**
* @see \Spatie\Prometheus\Http\Controllers\PrometheusMetricsController::__invoke
* @see vendor/spatie/laravel-prometheus/src/Http/Controllers/PrometheusMetricsController.php:12
* @route '/metrics'
*/
const metricsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: metrics.url(options),
    method: 'get',
})

/**
* @see \Spatie\Prometheus\Http\Controllers\PrometheusMetricsController::__invoke
* @see vendor/spatie/laravel-prometheus/src/Http/Controllers/PrometheusMetricsController.php:12
* @route '/metrics'
*/
metricsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: metrics.url(options),
    method: 'get',
})

/**
* @see \Spatie\Prometheus\Http\Controllers\PrometheusMetricsController::__invoke
* @see vendor/spatie/laravel-prometheus/src/Http/Controllers/PrometheusMetricsController.php:12
* @route '/metrics'
*/
metricsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: metrics.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

metrics.form = metricsForm

const prometheus = {
    default: Object.assign(defaultMethod, defaultMethod),
    metrics: Object.assign(metrics, metrics),
}

export default prometheus