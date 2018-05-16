// 音频模块
(function ($, root) {

	root.audioControler = function AudioControler () {
		// 储存音频信息
		this.audio = new Audio();
		this.status = "pause";


		// 控制音频
		this.play = function () {
			this.audio.play();
			this.status = "play";
			$(".btn-play img").attr("src", "../images/icon-pause.png")
		},
		this.pause = function () {
			this.audio.pause();
			this.status = "pause";
			$(".btn-play img").attr("src", "../images/icon-play.png")

		},
		this.setAudio = function (src) {
			this.audio.src = src;
			this.audio.load()
		}
		this.playTo = function (time) {
			this.audio.currentTime = time / 1000;
		}
	}

})(window.Zepto, window.player)
