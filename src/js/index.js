(function ($, root) {

	// 引入模块
	var audioControler = new root.audioControler,
		pageControler = new root.pageControler,
		likeControler = new root.likeControler,
		randerControler = new root.randerControler,
		timeControler = new root.timeControler(audioControler);

	// 用于储存请求成功后的数据
	var dataList = null,
		currentIndex = null

	// 数据请求
	$.ajax({
		method: "GET",
		url: "http://localhost:1178/build/js/api.js",
		success: function (data) {
			data =  JSON.parse(data)

			dataList = data;
			currentIndex = 0

			// 引入渲染模块，音频模块
			init()
		},
		error: function () {
			console.log("error");
		}
	})

	function init () {
		
		timeControler.drag();

		// 事件绑定
		(function bindEvent () {
			// 上一首
			$(".btn-prev").on("click", function () {
				currentIndex = pageControler.prevOrNext(-1, currentIndex, dataList);
				$(".btn-play").trigger("playchange", currentIndex);
			})
			// 下一首
			$(".btn-next").on("click", function () {
				currentIndex = pageControler.prevOrNext(+1, currentIndex, dataList);
				$(".btn-play").trigger("playchange", currentIndex);
			})
			//换歌
			$(".btn-play").on("playchange", function (e, index) {
				audioControler.setAudio(dataList[index].audio);
				timeControler.reset(index, dataList);
				randerControler.playChange(index);
				if (audioControler.status == "play") {
					timeControler.start();
				}
			})
			// 开始暂停
			$(".btn-play").on("click", function () {
				if (audioControler.status == "play") {
					timeControler.stop();
				} else {
					timeControler.start();		
				}
			})
			// 喜欢或取消喜欢
			$(".btn-like").on("click", function () {
				likeControler.change(dataList[currentIndex]);
			})
			// 播放列表显示或隐藏
			$(".btn-list").on("click", function () {
				randerControler.listShow();
			})
			// 播放列表点击切歌
			$(".play-list ul").on("click", function (e) {
				var srcIndex = e.srcElement.attributes.data.value;
				currentIndex = pageControler.toPage(dataList, srcIndex);
				$(".btn-play").trigger("playchange", srcIndex);		
			});

			randerControler.init(dataList, currentIndex);
			$(".btn-play").trigger("playchange", 0);
		})()
	}


})(window.Zepto, window.player)
