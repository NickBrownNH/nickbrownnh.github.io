const {src, dest, watch, series} = require(`gulp`),
    htmlCompressor = require(`gulp-htmlmin`),
    htmlValidator = require(`gulp-html`),
    cssLinter = require(`gulp-stylelint`),
    cssCompressor = require(`gulp-csso`);




let compressHTML = () => {
    return src(`app/html/*.html`)
        .pipe(htmlCompressor({ collapseWhitespace: true }))
        .pipe(dest(`prod`));
};

let validateHTML = () => {
    return src([`app/html/*.html`])
        .pipe(htmlValidator(undefined));
};

let lintCSS = () => {
    return src(`app/css/*.css`)
        .pipe(cssLinter({
            failAfterError: false,
            reporters: [
                { formatter: `string`, console: true }
            ]
        }));
}

let compileCSSForProd = () => {
    console.log(`Minifying CSS...`);
    return src(`./app/css/*.css`)
        .pipe(cssCompressor())
        .pipe(dest(`prod/css`))
        .on(`end`, () => {
            console.log(`CSS minification complete. Files saved to prod/css`);
        });
};


exports.compressHTML = compressHTML;
exports.validateHTML = validateHTML;
exports.lintCSS = lintCSS;
exports.compileCSSForProd = compileCSSForProd;
