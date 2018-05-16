(function ($, root) {

		// 依赖于渲染模块
		var randerControler = new root.randerControler;

		root.pageControler = function PageControler () {
			this.prevOrNext = function (val, currentIndex, dataList) {
				currentIndex = (currentIndex + val + dataList.length) % dataList.length;
				randerControler.rander(dataList, currentIndex);
				return currentIndex; //返回修改后的index
			}
			this.toPage = function (dataList, currentIndex) {
				randerControler.rander(dataList, currentIndex);
				return currentIndex; //返回修改后的index
			}
		}

})(window.Zepto, window.player)
