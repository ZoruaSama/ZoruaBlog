
var zoruapswd="00000";
document.oncopy = function(e)
	{ if (zoruapswd!="zorua"){
	  var selected = window.getSelection();
	  var selectedText = selected.toString().replace(/\n/g, '<br>');  // Solve the line breaks conversion issue
    var copyFooter = '';
	  var copyFooter = '<br>---------------------<br>著作权归作者所有。<br>' 
	                        + '商业转载请联系作者获得授权，非商业转载请注明出处。<br>'
	                        + '作者：Zorua Zhang<br> 源地址：' + document.location.href
	                        + '<br>来源：Zorua\'s Blog<br>© 版权声明：本博客所有文章除特别声明外，均采用 CC BY-NC-SA 4.0 许可协议。';
    console.log(selectedText.length);
	  if (selectedText.length < 300) {
	    copyFooter = '';}
	  if (selectedText.length > 1500) {
	    selectedText = 'emmm';
      copyFooter = '';
      console.log('overflow');}
    var copytext = selectedText + copyFooter;
    var copyHolder = document.createElement('div');
    copyHolder.style.position='absolute';
    copyHolder.style.left='-99999px';
    copyHolder.innerHTML = copytext;
	  // var copyHolder = $('<div>', {id: 'temp', html: selectedText + copyFooter, style: {position: 'absolute', left: '-99999px'}});
  	document.body.append(copyHolder);
    selected.selectAllChildren( copyHolder );
	  // selected.selectAllChildren( copyHolder[0] );
	  window.setTimeout(function() {
	      // copyHolder.remove();
        document.body.removeChild(copyHolder);
        console.log(1234);
	  },0);}
	};



/* eslint-disable */
(function ($) {
    "use strict";
    function setTabs() {
      const $tabs = $(".tabs");
      if ($tabs.length === 0) return;
      let $navs = $tabs.find(".nav-tabs .tab");
      for (var i = 0; i < $navs.length; i++) {
        let $a = $tabs.find($navs[i].children[0]);
        $a.addClass($a.attr("href"));
        $a.removeAttr("href");
      }
      $(".tabs .nav-tabs").on("click", "a", (e) => {
        e.preventDefault();
        e.stopPropagation();
        let $tab = $(e.target.parentElement.parentElement.parentElement);
        $tab.find(".nav-tabs .active").removeClass("active");
        $tab.find(e.target.parentElement).addClass("active");
        $tab.find(".tab-content .active").removeClass("active");
        $tab.find($(e.target).attr("class")).addClass("active");
        return false;
      });
    }
  
    $(function () {
      setTabs();
      // $(".article .video-container").fitVids();
      $(".scroll-down").on("click", function () {
        scrolltoElement(".l_body");
      });
      setTimeout(function () {
        $("#loading-bar-wrapper").fadeOut(500);
      }, 300);
    });
  })(jQuery);


(function () {
  function Slider(option) {
    this.wrap = option.wrap;
    this.imgList = option.imgList;
    this.imgNum = this.imgList.length;
    this.width = option.width || $(this.wrap).width();
    this.height = option.height || $(this.wrap).height();
    this.isAuto = option.isAuto || true;
    this.moveTime = option.moveTime;
    this.direction = option.direction || "right";
    this.btnHide = option.btnHide || true;
    this.btnWidth = option.btnWidth;
    this.btnHeight = option.btnHeight;
    this.spanWidth = option.spanWidth;
    this.spanHeight = option.spanHeight;
    this.spanColor = option.spanColor;
    this.activeSpanColor = option.activeSpanColor;
    this.btnBackgroundColor = option.btnBackgroundColor;
    this.spanRadius = option.spanRadius;
    this.spanMargin = option.spanMargin;
    this.flag = false;
    this.nowIndex = 0;
    this.createDom();
    this.initStyle();
    this.bindEvent();
    if (this.isAuto === true) {
      this.autoMove();
    }
  }

  Slider.prototype.createDom = function () {
    var oUl = $('<ul class="imgList"></ul>');
    var Spot = $('<div class="spot"></div>');
    this.imgList.forEach(function (item) {
      var oLi =
        '<li><a  href=" ' +
        item.a +
        'target="_blank" "><img src=" ' +
        item.img +
        ' "></a></li>';
      oUl.append(oLi);
      var span = "<span></span>";
      Spot.append(span);
    });
    if(this.btnHide == false){
    var leftBtn = $(
      '<div class="left-btn"><i class="fas fa-angle-left"></i></div>'
    );
    var rightBtn = $(
      '<div class="right-btn"><i class="fas fa-angle-right"></i></div>'
    );
}
   else{
   var leftBtn = $(
      '<div class="left-btn"></div>'
    );
    var rightBtn = $(
      '<div class="right-btn"></div>'
    );
}
    this.wrap.append(oUl).append(leftBtn).append(rightBtn).append(Spot);
  };
  Slider.prototype.initStyle = function () {
    $("*", this.wrap).css({ margin: 0, padding: 0, listStyle: "none" });
    $(this.wrap).css({ overflow: "hidden", position: "relative" });
    $(".imgList", this.wrap).css({
      width: this.width,
      height: this.height,
      position: "relative",
    });
    $(".imgList li", this.wrap)
      .css({
        width: this.width,
        height: this.height,
        position: "absolute",
        left: 0,
        top: 0,
        display: "none",
      })
      .eq(this.nowIndex)
      .css({ display: "block" });
    $(".imgList li a, .imgList li a img", this.wrap).css({
      display: "inline-block",
      width: this.width,
      height: this.height,
    });
    $(".left-btn, .right-btn", this.wrap).css({
      width: this.btnWidth,
      height: this.btnHeight,
      backgroundColor: this.btnBackgroundColor,
      color: "#fff",
      textAlign: "center",
      lineHeight: this.btnHeight + "px",
      position: "absolute",
      top: "50%",
      marginTop: -this.btnHeight / 2,
      cursor: "pointer",
    });
    $(".right-btn", this.wrap).css({ right: 0 });
    $(".spot", this.wrap).css({
      height: this.spanHeight + this.spanMargin * 2,
      position: "absolute",
      left: "50%",
      marginLeft: (-this.imgNum * (this.spanWidth + this.spanMargin * 2)) / 2,
      bottom: 10,
    });
    $(".spot span", this.wrap)
      .css({
        display: "inline-block",
        width: this.spanWidth,
        height: this.spanHeight,
        margin: this.spanMargin,
        backgroundColor: this.spanColor,
        borderRadius: this.spanRadius,
        cursor: "pointer",
      })
      .eq(this.nowIndex)
      .css({ backgroundColor: this.activeSpanColor });
  };
  Slider.prototype.bindEvent = function () {
    var self = this;
    $(".left-btn", this.wrap).click(function () {
      self.move("prev");
    });
    $(".right-btn", this.wrap).click(function () {
      self.move("next");
    });
    $(".spot span").click(function (e) {
      self.move($(this).index());
    });
    $(this.wrap).mouseenter(function () {
      clearInterval(self.time);
    });
  };
  Slider.prototype.move = function (dir) {
    if (this.flag) {
      return false;
    }
    this.flag = true;
    switch (dir) {
      case "prev":
        if (this.nowIndex === 0) {
          this.nowIndex = this.imgNum - 1;
        } else {
          this.nowIndex--;
        }
        break;
      case "next":
        if (this.nowIndex === this.imgNum - 1) {
          this.nowIndex = 0;
        } else {
          this.nowIndex++;
        }
        break;
      default:
        this.nowIndex = dir;
        break;
    }
    var self = this;
    $(".imgList li", this.wrap)
      .fadeOut()
      .eq(this.nowIndex)
      .fadeIn(function () {
        self.flag = false;
      });
    $(".spot  span", this.wrap)
      .css({ backgroundColor: this.spanColor })
      .eq(this.nowIndex % this.imgNum)
      .css({ backgroundColor: this.activeSpanColor });
  };
  Slider.prototype.autoMove = function () {
    var self = this;
    this.time = setInterval(function () {
      if (this.direction == "left") {
        $(".left-btn", this.wrap).trigger("click");
      } else {
        $(".right-btn", this.wrap).trigger("click");
      }
    }, self.moveTime);
  };
  $.fn.extend({
    slider: function (option) {
      option.wrap = this;
      new Slider(option);
    },
  });
})();