/*------------------------------------
date: 2019.09
developed by: smartport
developer url: http://www.smartport.kr
------------------------------------*/



$(function () {
  
  
  //* check/radio *//
  $('.chkBox > .ipt').click(function(){
      var $this = $(this).parent('.chkBox');
      // remove check
      if ( $this.hasClass('on') ){
          $this.removeClass('on');
          $this.find('.ipt').attr('checked', false);
          // All
          if( $this.hasClass('all') ){
              var $chk = $this.parents('.chkWrap').find('.chkBox');
              $chk.removeClass('on');
              $chk.find('.ipt').attr('checked', false);
          }
      // add check
      } else {
          $this.addClass('on');
          $this.find('.ipt').attr('checked', true);
          // All
          if( $this.hasClass('all') ){
              var $chk = $this.parents('.chkWrap').find('.chkBox');
              $chk.addClass('on');
              $chk.find('.ipt').attr('checked', true);
          }
      }
      // All check
      var chklen = $this.parents('.chkWrap').find('.chkBox').length - 1;
      var chkOnlen = $this.parents('.chkWrap').find('.chkBox.on').not('.chkBox.all').length;
      var chkAll = $this.parents('.chkWrap').find('.chkBox.all');
      if ( chklen == chkOnlen ){
          chkAll.addClass('on');
          chkAll.find('.ipt').attr('checked', true);
      } else {
          chkAll.removeClass('on');
          chkAll.find('.ipt').attr('checked', false);
      }
  });
  $('.rdoBox > .ipt').click(function(){
      var $this = $(this).parent('.rdoBox');
      var $rdoBox = $this.parents('.rdoWrap').find('.rdoBox').not($this);
      $this.addClass('on');
      $this.find('.ipt').attr('checked', true);
      $rdoBox.removeClass('on');
      $rdoBox.find('.ipt').attr('checked', false);
  });
  

  /* .resizing */
  function rsz(){
    $('.contArea>.btnWrap').parent().addClass('lgH');
      
    var $cmContentsH = $(window).height() - 73;
    $('.cmContents').height( $cmContentsH );
    
    if( $('.contArea').hasClass('mainWrap') ){ //main
        var $contH = $('.contArea').outerHeight(true);
    }else if( $('.contArea').hasClass('lgH') ){ //sub 'has btnWrap'
        var $contH = $('.cttsArea').outerHeight(true) + 238;
    }else{ //sub not'has btnWrap'
        var $contH = $('.cttsArea').outerHeight(true) + 148;
    }
    
    if( $cmContentsH >= $contH ){
      $('.cmCttsIn').height('100%');
    }else{
      $('.cmCttsIn').height('auto');
    }
    $('.cttsArea .lctts').height( $('.cttsArea>.contents.rctts').height() );
  }
  rsz();
  $(window).resize(function(){
    rsz();
  });
  
  

  //* select *//
  // open + close
  $('.slctBox .val').click(function(){
      var $this = $(this).parent('.slctBox');
      // close
      if ( $this.hasClass('on') ){
          $this.removeClass('on tag').children('ul').fadeOut(100);
      //open
      } else {
          $('.slctBox.on').not($this).removeClass('on').children('ul').fadeOut(100);
          $('.smenu.on').removeClass('on').children('ul').fadeOut(100);
          $this.addClass('on tag').children('ul').fadeIn(100);
      }
  });
  // close : select li
  $('.slctBox > ul > li').click(function(){
      var slctTxt = $(this).children('span').text();
      var $slctBox = $(this).parents('.slctBox');
      $slctBox.find('button.val > span').text(slctTxt);
      $slctBox.removeClass('on').children('ul').fadeOut(100);
  });
  
  //* trrWrap *//
    $('.treeWrap').each(function(){
      $(this).find('dd').has('dl.trr').parent('.trr').addClass('prt');
      $(this).find('.trr>dt>.btn').prepend('<i></i>');
    });
    $('.trr>dt>.btn>i').click(function(){
      var $trr = $(this).parent('.btn').parent('dt').parent('.trr');
      if( $trr.hasClass('on') ){
        $trr.removeClass('on');
        if( $(this).parent().hasClass('fs') ){
          $(this).parents('.treeWrap').find('.trr').removeClass('on');
        }
      }else{
        $trr.addClass('on');
      }
    });
  
  
  //* 왼쪽메뉴 *//
  function AsdOpen(){
    $('.cmAsdCont').addClass('on').find('.menuWrap .menu > dd').has('ul').parent('.menu').addClass('ls');
    $('.cmCont').addClass('move');
  }
  AsdOpen();
  
  $('.cmAsd>button').click(function(){
    var $this = $(this);
    var $thisMenu = $('.cmAsdCont .menuWrap .menu').eq($this.index()-1);
    if( !$this.hasClass('on') ){ //열림 
      if( !$this.hasClass('cmAsdFull') ){ //전체메뉴 버튼 제외
        $thisMenu.addClass('on');
        $thisMenu.children('dd').has('ul').slideDown(300).parent('.menu').addClass('dn');
        $thisMenu.siblings().removeClass('on dn').children('dd').slideUp(300);
        $('.cmAsdCont .menuWrap').removeClass('full');
      }else{ //전체메뉴 버튼
        $('.cmAsdCont .menuWrap .menu').removeClass('dn').children('dd').slideUp(300);
        $('.cmAsdCont .ctts .cmAsdFull').addClass('on');
      }
      $('.cmAsdCont .menuWrap .menu').children('dt').removeClass('line');
      $this.addClass('on').siblings().removeClass('on');
      AsdOpen();
    }else{ //닫힘
      $this.removeClass('on');
      $('.cmAsdCont').removeClass('on');
      $('.cmCont').removeClass('move');
      if( $this.hasClass('cmAsdFull') ){
        $('.cmAsdCont .ctts .cmAsdFull').removeClass('on');
      }
      setTimeout(function(){
        $('.cmAsdCont .menuWrap .menu').removeClass('on dn');
      },300);
    }
  });
  $('.cmAsdFull').click(function(){ //전체메뉴 버튼
    var $contFull = $(this).parents('.cmAsdCont');
    var $menu = $('.cmAsdCont .menuWrap .menu');
    $contFull.find('.cmAsdFull').addClass('on');
    $contFull.siblings('.cmAsd').children('.cmAsdFull').addClass('on').siblings().removeClass('on');
    $menu.children('dd').has('ul').parent('.menu').addClass('ls');
    if( $('.cmAsdFull').hasClass('on') ){ //열릴때
      $menu.parent('.menuWrap').addClass('full');
      $menu.addClass('on').removeClass('dn').children('dt').removeClass('line').siblings('dd').slideUp(300);
    }else{ //닫힐때
      setTimeout(function(){
        $menu.parent('.menuWrap').removeClass('full');
        $('.cmAsdCont .menuWrap .menu').children('dd').slideUp(300);
      },300);
    }
  });
  $('.cmAsdCont .ctts .btnCls').click(function(){ //닫기 버튼
    $('.cmAsd>button , .cmAsdFull , .cmAsdCont').removeClass('on');
    $('.cmCont').removeClass('move');
    setTimeout(function(){
      $('.cmAsdCont .menuWrap').removeClass('full').children('.menu').removeClass('on dn').children('dt').removeClass('line').siblings('dd').slideUp(300);
    },300);
  });
  $('.cmAsdCont .menuWrap .menu>dt>button').click(function(){
    var $prtMenu = $(this).parents('.menu');    
    var $prtMenuUl = $prtMenu.children('dd').has('ul').parent('.menu');
    $('.cmAsdCont .menuWrap .menu').children('dt').removeClass('line');
    if( !$prtMenu.hasClass('dn') ){ //열림
      $prtMenuUl.addClass('dn').end().slideDown(300);
      $prtMenu.siblings().removeClass('dn').find('dd').slideUp(300);
      if( $('.cmAsdFull').hasClass('on') ){ //전체메뉴 일때
        $prtMenuUl.next().children('dt').addClass('line');
      }
    }else{ //닫힘
      $prtMenu.removeClass('dn').children('dd').slideUp(300);
      $prtMenu.children('dt').removeClass('line');
    }    
  });

  //* .popDf *//
  $('.popDf .popBtn').click(function(){
      if( $(this).hasClass('close') ) {
          $(this).parents('.popDf').fadeOut(200);
      } else {
          $(this).parents('.popDf').fadeIn(200);
      }
  });

  
  //* close : click body *//
  $(document).mousedown(function(e){
      var container = $('.tag');
      if (!container.is(e.target) && container.has(e.target).length === 0){
          container.removeClass('tag');
          $('.slctBox').removeClass('on').children('ul').fadeOut(100);
      }
  });
});
