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
    
    $(document).ready(function() {
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
            

        var active = 'active';
        var showHideElements = $('#header-precursor , #header, #editor-precursor, #savebar-container');
        fullwindowLink.click(function(){
            
            if(fullwindowButton.hasClass(active)){
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
                
            }else {
                // hide element
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
    
    });
})(AJS.$);
