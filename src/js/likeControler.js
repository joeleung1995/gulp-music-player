// like模块
(function ($, root) {

		root.likeControler = function likeControler () {
			this.change = function (item) {
				if (item.like) {
					item.like = false;
					$(".btn-like img").attr("src", "../images/icon-like.png");
				} else {
					item.like = true;
					$(".btn-like img").attr("src", "../images/icon-like-checked.png");
				}
			}
		}	

})(window.Zepto, window.player)
