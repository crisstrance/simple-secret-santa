// craco.config.js
module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            module.exports = {
                devServer: {
                    hot: false, // Deshabilita HMR
                },
            };
            // Aquí puedes modificar la configuración de Webpack
            return webpackConfig;
        },
    },
};
