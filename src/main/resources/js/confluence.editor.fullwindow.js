/*
 * Copyright 2011 Atlassian Software Systems Pty. Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function($) {
    AJS.bind("init.rte", addFullScreenButton);
    function addFullScreenButton() {
        var text = "Toggle Fullwindow";
        
        var toolbar = $('#rte-toolbar .toolbar-split-left');
        var fullwindowGroup = $('<ul></ul>')
        .addClass('toolbar-group')
        .attr('id', 'rte-fullwindow-group')
        .appendTo(toolbar);

        var fullwindowButton = $('<li></li>')
        .addClass('toolbar-item')
        .attr('id', 'rte-button-toggle-fullwindow')
        .appendTo(fullwindowGroup);
        var fullwindowLink = $('<a></a>')
        .addClass('toolbar-trigger')
        .attr('href','#')
        .attr('title', text)
        .appendTo(fullwindowButton);
        var fullwindowSpan = $('<span></span>')
        .text(text)
        .addClass('icon')
        .appendTo(fullwindowLink);
            

        var isComment = fullwindowButton.parents('#comments-section').size() > 0;

        var active = 'active';
        var showHideElements = $('#header-precursor , #header, #editor-precursor, #savebar-container');
        var body = $('body');
        var intervall = null;
        fullwindowLink.click(function(){
            
            if(fullwindowButton.hasClass(active)){
                // hide full window
                
                body.removeClass('fullwindow');
                fullwindowButton.removeClass(active)
               
                showHideElements.show();
                showHideElements.each(function(){
                    var elem = $(this);
                    
                    elem.removeAttr('style');
                    var id = elem.attr('oldid');
                    var style = elem.attr('oldstyle');
                    if(id ){
                        elem.attr('id', id ) ;
                    }
                    if(style ){
                        elem.attr('style', style ) ;
                    }
                    elem.removeAttr('oldid');
                    elem.removeAttr('oldstyle');
                });
                
                if(isComment){
                    body.removeClass('fullwindow-comment');
                    $('#comments-section form').removeAttr("style")  ;
                }
                if(intervall  != null){
                    clearInterval(intervall );
                    jQuery('#wysiwygTextarea_ifr').height(jQuery('#wysiwygTextarea_ifr').contents().find('#tinymce').height());
                }
                
            }else {
                // hide element
                // full window
                body.addClass('fullwindow');
                fullwindowButton.addClass(active)
                showHideElements.each(function(){
                    var elem = $(this);
                    var id = elem.attr('id');
                    var style = elem.attr('style');
                    if(id ){
                        elem.attr('oldid', id ) ;
                    }
                    if(style ){
                        elem.attr('oldstyle', style ) ;
                    }
                    elem.removeAttr('id');
                    elem.removeAttr('style');
                    
                });
                showHideElements.hide().height(0);
                
                if(isComment){
                    body.addClass('fullwindow-comment');
                    var form = $('#comments-section form');
                    intervall = setInterval(function(){
                        var winHeight = $(window).height();
                        var rteheight = jQuery('#rte-toolbar').outerHeight();
                        jQuery('#wysiwygTextarea_ifr').css('height', winHeight-rteheight).contents().find('html').css('overflow', 'auto' );        
                    }, 100);
                }
            }
            $(window).resize();
           
        });


        var loadPref = function(clazz) {
            return (AJS.Cookie.read('fullwindow.' + clazz) === 'true');
        };

        var savePref = function(clazz, state) {
            AJS.Cookie.save('fullwindow.' + clazz, state);
        };

        if(loadPref('show-fullwidth')) {
            fullwindowLink.click();
        }
    
        jQuery(window).resize(function(){
            if(body.hasClass('fullwindow-comment')){
                var form = $('#comments-section form');
                form.css({
                    'top' : -1*(form.offset().top - form.position().top),
                    'left' : -1*(form.offset().left - form.position().left),
                    'height' : $(window).height(),
                    'width' : $(window).width()
                });
            }
        })
    
    }
    
})(AJS.$);
