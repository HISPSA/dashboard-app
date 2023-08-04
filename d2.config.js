const config = {
    type: 'app',
    name: 'afcdcdashboard',
    title: 'Africa Dashboard 2.38',
    coreApp: false,

    pwa: {
        enabled: true,
        caching: {
            patternsToOmit: [
                'dashboards/[a-zA-Z0-9]*',
                'visualizations',
                'analytics',
                'geoFeatures',
                'cartodb-basemaps-a.global.ssl.fastly.net',
            ],
        },
    },

    entryPoints: {
        app: './src/AppWrapper.js',
    },
}

module.exports = config
