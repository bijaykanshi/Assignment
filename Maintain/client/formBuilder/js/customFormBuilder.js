app.factory('formFactory', function($http, $modal, $state, $location, $rootScope){
     
    var formFactory = {};
   
    formFactory.inputAttr = {
        defaultAttr: {
            label: 'label',
            placeholder: 'placeholder',
            error_msg_required: 'This field is required',
          /*  min: undefined,
            error_msg_min_length: 'Length can not be less than',
            max: undefined,
            error_msg_max_length: 'Length can not be greater than',*/
            position: 0,
            required: false
        },
        radio: {
            label: 'Radio Button',
            options:[
                {
                    label: 'first Label',
                    value: true
                },
                {
                    label: 'second Label',
                    feedValue: '',
                    value: true
                }
            ]
        },
        checkbox: {
            label: 'checkBox',
            options:[
                {
                    label: 'first Label',
                    value: true
                },
                {
                    label: 'second Label',
                    value: true
                }
            ]
        },
        select: {
            label: 'Select Field',
            options: [
                {
                    label: 'options1',
                    value: 'options1'
                },
                {
                    label: 'options2',
                    value: 'options2'
                }
            ]
        }
        
    };
    formFactory.handleDiff = ['select', 'radio', 'checkbox'];
    formFactory.getData = function() {
        return JSON.stringify(formFactory.formFieldEditDelete);
    }
    formFactory.addField = function (currentCol) {
        var obj;
        obj = angular.copy(formFactory.inputAttr[formFactory.handleDiff.indexOf(formFactory.selectedType) === -1 ? 'defaultAttr' : formFactory.selectedType])
        obj['type'] =  formFactory.selectedType;
        obj['position'] = formFactory.formFieldEditDelete[currentCol].length;
        obj.helpText = 'pleas provide some help to user';
        formFactory.formFieldEditDelete[currentCol].push(obj);
    };
    var numberType = ['text', 'number', 'range'];
    formFactory.getType = function(key, type) {
        if (key === 'required')
            return 'checkbox';
        return numberType.indexOf(type) === -1 ? type : 'number';
    }
    /*formFactory.editFieldFun = function (objRef) {
        formFactory.editField = objRef;
    }*/
    formFactory.addOptions = function (objRef) {
       objRef.options.push(angular.copy(formFactory.inputAttr[objRef.type].options[0]));
    }
    formFactory.selectType = [
        {
            displayName: 'Text',
            value: 'text'
        },
        {
            displayName: 'Radio',
            value: 'radio'
        },
        {
            displayName: 'Checkbox',
            value: 'checkbox'
        },
        {
            displayName: 'Select Field',
            value: 'select'
        },
        {
            displayName: 'Number',
            value: 'number'
        },
        {
            displayName: 'Email',
            value: 'email'
        },
        {
            displayName: 'Date',
            value: 'date'
        },
        {
            displayName: 'Range',
            value: 'range'
        },
        {
            displayName: 'Month',
            value: 'month'
        },
        {
            displayName: 'Week',
            value: 'week'
        },
        {
            displayName: 'Time',
            value: 'time'
        },
        {
            displayName: 'Date Time',
            value: 'datetime'
        },
        {
            displayName: 'Date Time Local',
            value: 'datetime-local'
        },
        {
            displayName: 'Color',
            value: 'color'
        }
    ]
    return formFactory;
});
app.controller('formBuilderCtrl', function ($scope, $modalInstance, global, parameter, formFactory, constant) {
    formFactory.popoverObj = {};
    $scope.header = parameter.header || 'Alert Message';
    $scope.anotherCol = "";
    //formFactory.formFieldEditDelete = {};
    /*global.sendRequest('getFormData', {}, 'get', function(data, status, headers, config) {
        console.log("get data");
    });*/
    $scope.selectCollObj = {};
    $scope.addedCollection = [];
    $scope.editedCollection = [];
    $scope.deletedCollection = [];
    var previousKey;
    $scope.doSelection = function (key) {
        if (previousKey)
            $scope.selectCollObj[previousKey] = false;
        previousKey = key;
    }
    var backUpData = {delete: {}, edit: {}};
    $scope.deleteCollection = function (key) {
        if (key == previousKey)
            previousKey = '';
        if (key == $scope.currentCol) {
            var index = $scope.editedCollection.indexOf(key);
            if (index >= 0) {
                delete backUpData.edit[key];
                $scope.editedCollection.splice(index, 1);
            }
            $scope.currentCol = '';
        }
        $scope.deletedCollection.push(key);
        backUpData.delete[key] = angular.copy(formFactory.formFieldEditDelete[key]);
        delete formFactory.formFieldEditDelete[key];
    }
    $scope.editCollectionNow = function () {
        $scope.editColShow = false;
        if (previousKey) {
            $scope.currentCol = previousKey;
            $scope.editedCollection.push(previousKey);
            backUpData.edit[key] = angular.copy(formFactory.formFieldEditDelete[previousKey])
        }
    }
    $scope.closeEditClosePop = function () {
        $scope.editColShow = false;
    }
    $scope.addColl = function () {
        $scope.anotherCol = "Another";
        $scope.showBtn = "";
        $scope.addedCollection.push($scope.newColl);
        formFactory.formFieldEditDelete[$scope.newColl] = [];
        $scope.currentCol = $scope.newColl;
    }
    $scope.close = function () {
        delete formFactory.currentIndex;
        delete formFactory.editField;
        //delete formFactory.formFieldEditDelete;
        $modalInstance.dismiss('cancel');
    };
    $scope.checkboxObj = {};
    $scope.closePopOver = function () {
        formFactory.popoverObj[formFactory.popoverObj.currentIndex] = false;
    }
    var isDuplicateLabel = function(collectionName, msg) {
        var str = "";
        var obj = {};
        
        for (var i = 0; i < $scope[collectionName]length; i += 1) {
            var key = $scope[collectionName][i];
            var arr = formFactory.formFieldEditDelete[key];
            obj[key] = {};
            for (var i = 0; i < arr.length; i += 1) {
                var keyToStore = arr[i].label.replace(/\s/g, '');
                if (obj[key][keyToStore]) {
                    obj[key][keyToStore] += 1;
                    str = " ";
                    //str += "\n" + keyToStore + " label of collection " + key;
                    continue;
                }
                arr[i].key = keyToStore
                obj[key][keyToStore] = 1;
            }

        }
        if (str) {
            str = "<h4>" + msg + "</h4><br/>";
            for (var key in obj) {
                for (var inKey in obj[key]) {
                    str += "<br/><br/>" + inKey + " 'label' of collection " + key + " repeated " + obj[key][inKey] + " times";
                }
            }
            /*global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: str, timeToShow: 5000});
            return;*/
        }
        return str;
    }
    var buildUpdateQuery = function () {
        var arr = [];
        $scope.editedCollection.forEach(function(key) {
            var currentObj = formFactory.formFieldEditDelete[key];
            var obj = {where: {formName: key}, updateWith: formFactory.formFieldEditDelete[key]};
            arr.push(obj);
        });
        return arr;
    }
    $scope.saveForm = function () {
        
        var dataToSend = {};
        var arr = [];
        var str = "";
        if ($scope.addedCollection.length) {
            str += isDuplicateLabel('addedCollection', constant.msg.notAdded);
            if (!str) {
                $scope.addedCollection.forEach(function(key) {
                    var tempObj = {data: formFactory.formFieldEditDelete[key], formName: key};
                    arr.push(tempObj);
                });
                if (arr.length)
                    dataToSend.insertMany = arr;
            }
        }
        if ($scope.editedCollection.length) {
            str += isDuplicateLabel('editedCollection', constant.msg.notEdited);
            if (!str) {
                arr = buildUpdateQuery();
                if (arr.length)
                    dataToSend.save = arr;
            }
        }
        if ($scope.deletedCollection.length)
            dataToSend.remove = $scope.deletedCollection;
        var keyArr = Object.keys(dataToSend);
       /* if (!keyArr.length || str) {
            var msg = ""

        }*/
        /*
        $scope.editedCollection.forEach(function(key) {

        });
        dataToSend.save = */
        /*for (var key in formFactory.formFieldEditDelete) {
            var tempObj = {data: formFactory.formFieldEditDelete[key], formName: key};
            dataToSend.push(tempObj);
        }*/
        global.sendRequest('saveFormJSON', {data: dataToSend}, 'post', function(data, status, headers, config) {
            $scope.close();
            global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: constant.msg.formSaved});

        });
    }
    $scope.formObj = {};
    $scope.editFieldFun = function (objRef, index) {
        formFactory.editField = objRef;
        formFactory.popoverObj[index] = true;
        formFactory.popoverObj[formFactory.popoverObj.currentIndex] = false;
        formFactory.popoverObj.currentIndex = index;
    }
    $scope.save = function () {
        global.sendRequest('register', {data: $scope.formObj}, 'post', function(data, status, headers, config) {
            $scope.close();
            global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: constant.msg.successRegister});

        });
    }
});

