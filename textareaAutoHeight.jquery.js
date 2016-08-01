/**
 * jQuery插件
 * textarea 高度自适应，控制最大高度
 * @author Xiaochun
 */
(function($) {
	$.fn.tah = function(options) {
		var div = null;
		var styles = null;
		var config = {
			maxHeight: 200
		};

		if (!this.length) {
			return false;
		}

		$.extend(config, (options || {}));
		div = $('<div contenteditable="true"></div>');
		styles = 'width,fontSize,fontWeight,fontStyle,fontFamily,lineHeight,padding,wordWrap,wordBreak,whiteSpace,letterSpacing'.split(',');
		div.css({
			left: -(9e5),
			position: 'absolute',
			zIndex: '-1'
		});
		div.appendTo($('body'));

		this.each(function(i, t) {
			t = $(t).css({
				resize: 'none'
			});
			t.on('focus', function() {
				$.each(styles, function(i, p) {
					div.css(p, t.css(p));
				});
			});
			t.on('focus blur input propertychange', function() {
				var val = t.val().replace(/\r?\n/g, '<br/>&#8203;');
				div.html(val);
				if (div.height() > config.maxHeight) {
					t.css({
						height: config.maxHeight,
						overflowY: 'scroll'
					});
					return;
				}

				if (div.height()) {
					t.css({
						height: div.height(),
						overflowY: 'hidden'
					});
				}
			});
		});
	};
})(jQuery);