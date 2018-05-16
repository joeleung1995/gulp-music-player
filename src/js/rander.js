(function ($, root) {

	root.randerControler = function RanderControler () {

		this.listStatus = true;

		this.init = function (dataList, index) {
			this.rander(dataList, index);
			this.playListRander(dataList, index);
			this.playChange(index);
			this.listShow();
		}

		this.rander = function (dataList, index) {

			var data = dataList[index];

			var endTime = null,
			gaussPic = null,
			likePicUrl = data.like ? "../images/icon-like-checked.png" : "../images/icon-like.png"

			$(".img-wrapper img").attr("src", data.image);
			$(".song-name").html(data["song-name"]);
			$(".singer-name").html(data["singer"]);
			$(".album-name").html(data["album"]);
			$(".btn-like img").attr("src", likePicUrl);

			endTime = getTime(data.duration);
			$(".end-time").html(endTime);

			gaussPic = new Image();
			gaussPic.src = data.image;
			gaussPic.onload = function () {
				root.blurImg(this, $("body"));
			}

		}

		// 创建播放列表
		this.playListRander = function (dataList, index) {
			var frag = document.createDocumentFragment();
			dataList.forEach(function (elem, index) {
				var li = document.createElement("li");
				li.innerHTML = elem["song-name"] + " - " + elem["singer"];
				li.setAttribute("data", index);
				frag.appendChild(li);
			})
			$(".play-list ul").append(frag);
		}

		this.playChange = function (index) {
			if ( $(".playing") ) {
				$(".playing").removeClass("playing");
			}
			$(".play-list li").eq(index).addClass('playing');
		}

		this.listShow = function () {
			if (this.listStatus) {
				$(".play-list").css("display", "none");
				this.listStatus = false;
			} else {
				$(".play-list").css("display", "block");
				this.listStatus = true;
			}
		}
	}

	function getTime (duration) {
		var seconds = null,
		minutes = null;

		seconds = duration % 60;
		minutes = (duration - seconds) / 60;
		return minutes + " : " + seconds;
	}

}(window.Zepto, window.player))
