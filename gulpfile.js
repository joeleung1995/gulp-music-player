const gulp = require("gulp"),	//引入gulp
	  newer = require("gulp-newer"), //检测build是否已经有相同文件，有则不重复操作
	  imagesMin = require("gulp-imagemin"),	//压缩图片
	  htmlClean = require("gulp-htmlclean"), //压缩HTML文件
	  uglify = require("gulp-uglify"),

	  stripDebug = require("gulp-strip-debug"), //去除JS中的调试语句
	  concat = require("gulp-concat"), //拼接多个JS文件为一个文件

	  less = require("gulp-less"), //less转换为css
	  postcss = require("gulp-postcss"), //css的插件处理和调用工具
	  cssnano = require("cssnano"), //css压缩
	  autoPrefixer = require("autoprefixer"), //css3兼容前缀自动添加

	  connect = require("gulp-connect"); //创建本地服务器

var folder = {	//方便后面调用而创建
	src: "./src/",
	build: "./build/"
}

// var devMode = process.env.NODE_ENV == "development"; //判断是否为开发环境

gulp.task("images", function () {	//task创建任务
	gulp.src(folder.src + "images/*")	//src调取文件
		.pipe(newer(folder.build + "images"))	//pipe, gulp内置，即管道
		.pipe(imagesMin())	//许多操作都在管道中处理
		.pipe(gulp.dest(folder.build + "images"));	//设置目标文件夹
})

gulp.task("html", function () {
	gulp.src(folder.src + "html/*")
		.pipe(connect.reload())
		.pipe(htmlClean())	//压缩HTML文件
		.pipe(gulp.dest(folder.build + "html"))
})


gulp.task("js", function () {
	gulp.src(folder.src + "js/*")
		.pipe(connect.reload())
		// .pipe(stripDebug()) //去除JS中的调试语句
		// .pipe(concat("main.js")) //拼接多个JS文件为一个文件,参数为输出文件的名
		// .pipe(uglify())	//压缩JS文件
		.pipe(gulp.dest(folder.build + "js"))
})

gulp.task("css", function () {	
	var plugins = [autoPrefixer(), cssnano()];

	gulp.src(folder.src + "css/*")
		.pipe(connect.reload())
		.pipe(less())
		.pipe(postcss(plugins))
		.pipe(gulp.dest(folder.build + "css"))	
})

gulp.task("audio", function () {	

	gulp.src(folder.src + "source/*")
		.pipe(connect.reload())
		.pipe(gulp.dest(folder.build + "source"))	
})

gulp.task("watch", function () {
	gulp.watch(folder.src + "html/*", ["html"]);
	gulp.watch(folder.src + "css/*", ["css"]);
	gulp.watch(folder.src + "js/*", ["js"]);
	gulp.watch(folder.src + "images/*", ["images"]);
})

gulp.task("server", function () {
	connect.server({
		port: "1178",
		livereload: true
	});
})

 //优先调用依赖，task名称为default即只需在命令行中		gulp	即可
gulp.task("default", ["images", "html", "js", "css", "watch", "server", "audio"]);