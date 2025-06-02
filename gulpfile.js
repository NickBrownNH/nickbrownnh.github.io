const {src, dest, watch, series} = require(`gulp`),
    htmlCompressor = require(`gulp-htmlmin`),
    htmlValidator = require(`gulp-html`),
    cssLinter = require(`gulp-stylelint`),
    cssCompressor = require(`gulp-csso`),
    jsLinter = require(`gulp-eslint`),
    jsCompressor = require(`gulp-uglify`),
    babel = require(`gulp-babel`),
    deleteAsync = require(`del`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;




let compressHTML = () => {
    return src(`app/html/*.html`)
        .pipe(htmlCompressor({ collapseWhitespace: true }))
        .pipe(dest(`./`));
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
};

let compileCSSForProd = () => {
    console.log(`Minifying CSS...`);
    return src(`./app/css/*.css`)
        .pipe(cssCompressor())
        .pipe(dest(`./css`))
        .on(`end`, () => {
            console.log(`CSS minification complete. Files saved to prod/css`);
        });
};

let lintJS = () => {
    return src(`app/js/*.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`));
};

let compressJSForProd = () => {
    console.log(`Compressing JavaScript...`);
    return src(`./temp/js/*.js`)
        .pipe(jsCompressor())
        .pipe(dest(`./js`))
        .on(`end`, () => {
            console.log(`JavaScript compression complete. Files saved to prod/js`);
        });
};

let transpileJS = () => {
    return src(`app/js/*.js`)
        .pipe(babel())
        .on(`error`, (err) => {
            console.error(`Babel error:`, err);
        })
        .pipe(dest(`temp/js`));
};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        browser: `default`,
        server: {
            baseDir: [
                `temp`,
                `./app`,
                `./app/html`,
            ]
        }
    });

    watch(`app/js/*.js`, series(lintJS, transpileJS))
        .on(`change`, reload);

    watch(`app/css/*.css`, lintCSS)
        .on(`change`, reload);

    watch(`app/html/*.html`, validateHTML)
        .on(`change`, reload);
};

async function clean() {
    const foldersToDelete = await deleteAsync([`./temp`, `prod`, `css`, `js`, `index.html`, `about.html`, `projects.html`, `contact.html`]);

    console.log(`The following directories were deleted:`, foldersToDelete);
}


exports.compressHTML = compressHTML;
exports.validateHTML = validateHTML;
exports.lintCSS = lintCSS;
exports.compileCSSForProd = compileCSSForProd;
exports.lintJS = lintJS;
exports.transpileJS = transpileJS;
exports.compressJSForProd = compressJSForProd;
exports.serve = serve;
exports.clean = clean;
exports.build = series(
    compressHTML,
    compileCSSForProd,
    transpileJS,
    compressJSForProd
);
exports.default = serve;
