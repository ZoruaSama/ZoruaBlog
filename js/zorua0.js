jQuery(document).on('copy', function(e)
	{
	  var selected = window.getSelection();
	  var selectedText = selected.toString().replace(/\n/g, '<br>');  // Solve the line breaks conversion issue
	  var copyFooter = '<br>---------------------<br>著作权归作者所有。<br>' 
	                        + '商业转载请联系作者获得授权，非商业转载请注明出处。<br>'
	                        + '作者：Zorua Zhang<br> 源地址：' + document.location.href
	                        + '<br>来源：Zorua\'s Blog<br>© 版权声明：本博客所有文章除特别声明外，均采用 CC BY-NC-SA 4.0 许可协议。';
	  var copyHolder = $('<div>', {id: 'temp', html: selectedText + copyFooter, style: {position: 'absolute', left: '-99999px'}});
	  
  	  $('body').append(copyHolder);
	  selected.selectAllChildren( copyHolder[0] );
	  window.setTimeout(function() {
	      copyHolder.remove();
	  },0);
	});