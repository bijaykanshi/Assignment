app.directive('addHtml', function($compile, $templateRequest, chatBox) {
    return {
        restrict: 'AE',
        link: function(scope, element, attrs) {
            var adjustPos = function (arr) {
                arr.forEach(function(val, index) {
                    $('#' + val)[0].style.left = 225 + (index * 300) + 'px';
                })
            }

            element.on('click', function(event) {
                var id = scope.item.userId < chatBox.myInfo.userId ? (scope.item.userId + '_' + chatBox.myInfo.userId) : (chatBox.myInfo.userId + '_' + scope.item.userId);
                if (chatBox.visibleEl.indexOf(id) != -1)
                    return;
                var index = chatBox.elementsId.indexOf(id);
                if (index != -1) {
                    var idToRemove = chatBox.visibleEl.pop();
                    var idToInsert = chatBox.elementsId[index];
                    chatBox.visibleEl.unshift(idToInsert);
                    adjustPos(chatBox.visibleEl);
                    $('#' + idToRemove).removeClass('popup-box-on');
                    $('#' + idToInsert).addClass('popup-box-on');
                    return;
                }
                var pageElement = angular.element(document.getElementById("chatBox"));
                var children = pageElement[0].children;
                $templateRequest("template/chatBox.html").then(function(html) {
                    html = html.replace(/@id@/g, id);
                    var template = angular.element(html);
                    template[0].id = id;
                    pageElement.prepend(template);
                    $compile(template)(scope);
                    chatBox.elementsId.unshift(id);
                    chatBox.visibleEl.unshift(id);
                    if (chatBox.visibleEl.length > 3) {
                        $('#' + chatBox.visibleEl.pop()).removeClass('popup-box-on');
                    }
                    adjustPos(chatBox.visibleEl);
                });

            })
        }
    }
});