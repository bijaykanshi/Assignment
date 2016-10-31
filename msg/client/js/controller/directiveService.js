app.directive('addHtml', function($compile, $templateRequest, chatBox) {
    return {
        restrict: 'AE',
        link: function(scope, element, attrs) {

            element.on('click', function(event) {
                var id = scope.item.userId < chatBox.myInfo.userId ? ('' + scope.item.userId + chatBox.myInfo.userId) : ('' + chatBox.myInfo.userId + scope.item.userId);
                var index = chatBox.elementsId.indexOf(id);
                if (index != -1 && index <= 2)
                    return;
                var pageElement = angular.element(document.getElementById("chatBox"));
                var children = pageElement[0].children;
                if (children[2])
                    children[2].style.display = "none !important";
                if (children) 
                    for (var i = 0; i < 2; i += 1) 
                        if (children[i])
                            children[i].style.left = (525 + i * 300) + "px";
                if (index > 2) {
                    children[index].style.display = "block";
                    children[index].style.left = 225 + "px";
                    return;
                }
                $templateRequest("template/chatBox.html").then(function(html) {
                    var template = angular.element(html);
                    template[0].id = id;
                    pageElement.prepend(template);
                    $compile(template)(scope);
                    chatBox.elementsId.unshift(id);
                });

            })
        }
    }
});