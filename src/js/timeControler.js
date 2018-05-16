(function ($, root) {

	// 依赖页面跳转模块
	// 依赖音频
	var pageControler = new root.pageControler,
		audioControler = null;

	var prevListenTime = 0,
		listenTime = 0,
		duration = 0,
		frameId = null,
		interval = null,
		currentIndex = null,
		dataList = null;

	root.timeControler = function (audioControl) {

		audioControler = audioControl;

		this.start = function (time) {

			if (time) {
				audioControler.playTo(time);
				audioControler.play();
			} else {
				audioControler.play();
			}

			var startTime = new Date().getTime();

			interval = function () {
				var currentTime = new Date().getTime();

				listenTime = prevListenTime ? prevListenTime +  currentTime - startTime : currentTime - startTime;	

				if (listenTime >= duration) {
					toEnd();
				} else {
					update(listenTime);
					frameId = requestAnimationFrame(interval)
				}
			}

			frameId = requestAnimationFrame(interval)
		}

		this.stop = function () {
			audioControler.pause();
			cancelAnimationFrame(frameId);
			prevListenTime = listenTime;
			listenTime = 0;
		}

		this.reset = function (index, data) {
			cancelAnimationFrame(frameId);
			currentIndex = index;
			dataList = data;
			duration = data[index]["duration"] * 1000;
			prevListenTime = 0;
			listenTime = 0;
			update(0);
		}
		// 拖动进度条
		this.drag = function  () {

			var startPosition = null,	//开始位置
				dist = null,			//拖动距离
				percent = null,			//拖动距离所占百分比
				width = $(".line-wrapper").width(),		//拖动条长度
				totalListenTime = null;					//拖动点所在位置表示的时间


			$(".circle").on("touchstart", function (e) {
				cancelAnimationFrame(frameId);
				startPosition = e.changedTouches[0].clientX;
			})
			.on("touchmove", function (e) {
				dist = e.changedTouches[0].clientX - startPosition;
				percent = dist / width;
				//因为先播放再暂停后listenTime会被暂停函数清零，因此下面做了一个容错
				totalListenTime = duration * percent + (listenTime ? listenTime : prevListenTime);
				if (totalListenTime <= 0) {
					totalListenTime = 0;
				} else if (totalListenTime >= duration) {
					totalListenTime = duration;
				}
				update(totalListenTime);
			})
			.on("touchend", () => {
				prevListenTime = totalListenTime;
				listenTime = 0;
				this.start(prevListenTime);
			})
		}
	}

	function update (time) {
		var percent = 100 - time / duration * 100;
		time = getTime(Math.round(time / 1000));
		$(".current-time").html(time);
		$(".line-top").css("transform", `translateX(-${percent}%)`)
	}

	function getTime (time) {
		var seconds = null,
		minutes = null;

		seconds = time % 60;
		seconds = seconds < 10 ? "0" + seconds : seconds;
		minutes = (time - seconds) / 60;
		minutes = minutes < 10 ? "0" + minutes : minutes;
		return minutes + " : " + seconds;
	}

	function toEnd () {
		cancelAnimationFrame(frameId);
		currentIndex = pageControler.prevOrNext(+1, currentIndex, dataList);
		$(".btn-play").trigger("playchange", currentIndex);
	}

})(window.Zepto, window.player)
