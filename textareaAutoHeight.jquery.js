/**
 * jQuery插件
 * textarea 高度自适应，控制最大高度
 * @author Xiaochun
 */
(function($) {
	$.fn.tah = function(options) {
		var maxHeight = options.maxHeight;
		if (!this.length) {
			return false;
		}
		this.each(function(i, t) {
			var divP = $('<div><div contenteditable="true"></div></div>');
			var div = divP.children('div');
			var styles = 'width,fontSize,fontFamily,lineHeight,padding,wordWrap,wordBreak,whiteSpace,letterSpacing'.split(',');
			divP.css({
				height: 0,
				overflow: 'hidden',
				position: 'relative',
				zIndex: '-1'
			});
			t = $(t).css({
				resize: 'none'
			});
			t.after(divP);
			$.each(styles, function(i, p) {
				div.css(p, t.css(p));
			});
			t.on('blur focus input change propertychange keydown', function() {
				var val = t.val().replace(/\r?\n/g, '<br/>&#8203;');
				div.html(val);
				if (div.height() > maxHeight) {
					t.scrollTop(div.innerHeight());
					return;
				}
				t.height(div.height());
			});
		});
	};
})(jQuery);