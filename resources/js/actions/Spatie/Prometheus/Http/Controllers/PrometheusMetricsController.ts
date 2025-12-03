import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \Spatie\Prometheus\Http\Controllers\PrometheusMetricsController::__invoke
* @see vendor/spatie/laravel-prometheus/src/Http/Controllers/PrometheusMetricsController.php:12
* @route '/prometheus'
*/
const PrometheusMetricsController0cb1034b70508e9f6388a86272b21f07 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: PrometheusMetricsController0cb1034b70508e9f6388a86272b21f07.url(options),
    method: 'get',
})

PrometheusMetricsController0cb1034b70508e9f6388a86272b21f07.definition = {
    methods: ["get","head"],
    url: '/prometheus',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Spatie\Prometheus\Http\Controllers\PrometheusMetricsController::__invoke
* @see vendor/spatie/laravel-prometheus/src/Http/Controllers/PrometheusMetricsController.php:12
* @route '/prometheus'
*/
PrometheusMetricsController0cb1034b70508e9f6388a86272b21f07.url = (options?: RouteQueryOptions) => {
    return PrometheusMetricsController0cb1034b70508e9f6388a86272b21f07.definition.url + queryParams(options)
}

/**
* @see \Spatie\Prometheus\Http\Controllers\PrometheusMetricsController::__invoke
* @see vendor/spatie/laravel-prometheus/src/Http/Controllers/PrometheusMetricsController.php:12
* @route '/prometheus'
*/
PrometheusMetricsController0cb1034b70508e9f6388a86272b21f07.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: PrometheusMetricsController0cb1034b70508e9f6388a86272b21f07.url(options),
    method: 'get',
})

/**
* @see \Spatie\Prometheus\Http\Controllers\PrometheusMetricsController::__invoke
* @see vendor/spatie/laravel-prometheus/src/Http/Controllers/PrometheusMetricsController.php:12
* @route '/prometheus'
*/
PrometheusMetricsController0cb1034b70508e9f6388a86272b21f07.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: PrometheusMetricsController0cb1034b70508e9f6388a86272b21f07.url(options),
    method: 'head',
})

/**
* @see \Spatie\Prometheus\Http\Controllers\PrometheusMetricsController::__invoke
* @see vendor/spatie/laravel-prometheus/src/Http/Controllers/PrometheusMetricsController.php:12
* @route '/prometheus'
*/
const PrometheusMetricsController0cb1034b70508e9f6388a86272b21f07Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: PrometheusMetricsController0cb1034b70508e9f6388a86272b21f07.url(options),
    method: 'get',
})

/**
* @see \Spatie\Prometheus\Http\Controllers\PrometheusMetricsController::__invoke
* @see vendor/spatie/laravel-prometheus/src/Http/Controllers/PrometheusMetricsController.php:12
* @route '/prometheus'
*/
PrometheusMetricsController0cb1034b70508e9f6388a86272b21f07Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: PrometheusMetricsController0cb1034b70508e9f6388a86272b21f07.url(options),
    method: 'get',
})

/**
* @see \Spatie\Prometheus\Http\Controllers\PrometheusMetricsController::__invoke
* @see vendor/spatie/laravel-prometheus/src/Http/Controllers/PrometheusMetricsController.php:12
* @route '/prometheus'
*/
PrometheusMetricsController0cb1034b70508e9f6388a86272b21f07Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: PrometheusMetricsController0cb1034b70508e9f6388a86272b21f07.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

PrometheusMetricsController0cb1034b70508e9f6388a86272b21f07.form = PrometheusMetricsController0cb1034b70508e9f6388a86272b21f07Form
/**
* @see \Spatie\Prometheus\Http\Controllers\PrometheusMetricsController::__invoke
* @see vendor/spatie/laravel-prometheus/src/Http/Controllers/PrometheusMetricsController.php:12
* @route '/metrics'
*/
const PrometheusMetricsController0b934498bbeb566d87c730ed47177b52 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: PrometheusMetricsController0b934498bbeb566d87c730ed47177b52.url(options),
    method: 'get',
})

PrometheusMetricsController0b934498bbeb566d87c730ed47177b52.definition = {
    methods: ["get","head"],
    url: '/metrics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Spatie\Prometheus\Http\Controllers\PrometheusMetricsController::__invoke
* @see vendor/spatie/laravel-prometheus/src/Http/Controllers/PrometheusMetricsController.php:12
* @route '/metrics'
*/
PrometheusMetricsController0b934498bbeb566d87c730ed47177b52.url = (options?: RouteQueryOptions) => {
    return PrometheusMetricsController0b934498bbeb566d87c730ed47177b52.definition.url + queryParams(options)
}

/**
* @see \Spatie\Prometheus\Http\Controllers\PrometheusMetricsController::__invoke
* @see vendor/spatie/laravel-prometheus/src/Http/Controllers/PrometheusMetricsController.php:12
* @route '/metrics'
*/
PrometheusMetricsController0b934498bbeb566d87c730ed47177b52.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: PrometheusMetricsController0b934498bbeb566d87c730ed47177b52.url(options),
    method: 'get',
})

/**
* @see \Spatie\Prometheus\Http\Controllers\PrometheusMetricsController::__invoke
* @see vendor/spatie/laravel-prometheus/src/Http/Controllers/PrometheusMetricsController.php:12
* @route '/metrics'
*/
PrometheusMetricsController0b934498bbeb566d87c730ed47177b52.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: PrometheusMetricsController0b934498bbeb566d87c730ed47177b52.url(options),
    method: 'head',
})

/**
* @see \Spatie\Prometheus\Http\Controllers\PrometheusMetricsController::__invoke
* @see vendor/spatie/laravel-prometheus/src/Http/Controllers/PrometheusMetricsController.php:12
* @route '/metrics'
*/
const PrometheusMetricsController0b934498bbeb566d87c730ed47177b52Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: PrometheusMetricsController0b934498bbeb566d87c730ed47177b52.url(options),
    method: 'get',
})

/**
* @see \Spatie\Prometheus\Http\Controllers\PrometheusMetricsController::__invoke
* @see vendor/spatie/laravel-prometheus/src/Http/Controllers/PrometheusMetricsController.php:12
* @route '/metrics'
*/
PrometheusMetricsController0b934498bbeb566d87c730ed47177b52Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: PrometheusMetricsController0b934498bbeb566d87c730ed47177b52.url(options),
    method: 'get',
})

/**
* @see \Spatie\Prometheus\Http\Controllers\PrometheusMetricsController::__invoke
* @see vendor/spatie/laravel-prometheus/src/Http/Controllers/PrometheusMetricsController.php:12
* @route '/metrics'
*/
PrometheusMetricsController0b934498bbeb566d87c730ed47177b52Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: PrometheusMetricsController0b934498bbeb566d87c730ed47177b52.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

PrometheusMetricsController0b934498bbeb566d87c730ed47177b52.form = PrometheusMetricsController0b934498bbeb566d87c730ed47177b52Form

const PrometheusMetricsController = {
    '/prometheus': PrometheusMetricsController0cb1034b70508e9f6388a86272b21f07,
    '/metrics': PrometheusMetricsController0b934498bbeb566d87c730ed47177b52,
}

export default PrometheusMetricsController