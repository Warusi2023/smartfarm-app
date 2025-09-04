
module.exports = function(config) {

config.set({
  "singleRun": true,
  "autoWatch": false,
  "basePath": "E:\\Document\\SmartFarm\\build\\js\\packages\\SmartFarm-shared-test",
  "files": [
    "E:\\Document\\SmartFarm\\build\\js\\node_modules\\kotlin-test-js-runner\\kotlin-test-karma-runner.js",
    "E:\\Document\\SmartFarm\\build\\js\\packages\\SmartFarm-shared-test\\kotlin\\SmartFarm-shared-test.js"
  ],
  "frameworks": [
    "mocha",
    "webpack"
  ],
  "client": {
    "args": []
  },
  "browsers": [
    "ChromeHeadless"
  ],
  "customLaunchers": {},
  "failOnFailingTestSuite": false,
  "failOnEmptyTestSuite": false,
  "reporters": [
    "karma-kotlin-reporter"
  ],
  "preprocessors": {
    "E:\\Document\\SmartFarm\\build\\js\\node_modules\\kotlin-test-js-runner\\kotlin-test-karma-runner.js": [
      "webpack",
      "sourcemap"
    ],
    "E:\\Document\\SmartFarm\\build\\js\\packages\\SmartFarm-shared-test\\kotlin\\SmartFarm-shared-test.js": [
      "webpack",
      "sourcemap"
    ]
  },
  "proxies": {}
});
config.plugins = config.plugins || [];
config.plugins.push('kotlin-test-js-runner/karma-kotlin-reporter.js');

config.loggers = [
    {
        type: 'kotlin-test-js-runner/tc-log-appender.js',
        //default layout
        layout: { type: 'pattern', pattern: '%[%d{DATETIME}:%p [%c]: %]%m' }
    }
]

// webpack config
function createWebpackConfig() {
let config = {
  mode: 'development',
  resolve: {
    modules: [
      "node_modules"
    ]
  },
  plugins: [],
  module: {
    rules: []
  }
};

    // source maps
    config.module.rules.push({
            test: /\.js$/,
            use: ["source-map-loader"],
            enforce: "pre"
    });
    config.devtool = false;
config.ignoreWarnings = [/Failed to parse source map/]
    
                // optimization
                config.optimization = config.optimization || {
  "splitChunks": false
};
// Report progress to console
// noinspection JSUnnecessarySemicolon
;(function(config) {
    const webpack = require('webpack');
    const handler = (percentage, message, ...args) => {
        const p = percentage * 100;
        let msg = `${Math.trunc(p / 10)}${Math.trunc(p % 10)}% ${message} ${args.join(' ')}`;
        ;
        console.log(msg);
    };

    config.plugins.push(new webpack.ProgressPlugin(handler))
})(config);

// KotlinWebpackCssRule[css]
;(function(config) {
            const use = [{
    loader: 'style-loader',
    options: {}
},{
    loader: 'css-loader',
    options: {}
}]
config.module.rules.push({
    test: /\.css$/,
    use: use,
    exclude: undefined,
    include: undefined,
})
})(config);

// noinspection JSUnnecessarySemicolon
;(function(config) {
    const tcErrorPlugin = require('kotlin-test-js-runner/tc-log-error-webpack');
    config.plugins.push(new tcErrorPlugin())
    config.stats = config.stats || {}
    Object.assign(config.stats, config.stats, {
        warnings: false,
        errors: false
    })
})(config);
config.experiments = {
    topLevelAwait: true,
}
// noinspection JSUnnecessarySemicolon
;(function(config) {
    const webpack = require('webpack');

    // https://github.com/webpack/webpack/issues/12951
    const PatchSourceMapSource = require('kotlin-test-js-runner/webpack-5-debug');
    config.plugins.push(new PatchSourceMapSource())
    
    config.plugins.push(new webpack.SourceMapDevToolPlugin({
        moduleFilenameTemplate: "[absolute-resource-path]"
    }))
})(config);
   return config;
}

config.set({webpack: createWebpackConfig()});


}
