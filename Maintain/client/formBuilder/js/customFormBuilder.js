app.factory('formFactory', function($http, $modal, $state, $location, $rootScope){
     
    var formFactory = {};
    $rootScope.formFactory = formFactory;
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
    formFactory.formFieldEditDelete = [];
    formFactory.getData = function() {
        return JSON.stringify(formFactory.formFieldEditDelete);
    }
    formFactory.addField = function () {
        var obj;
        obj = angular.copy(formFactory.inputAttr[formFactory.handleDiff.indexOf(formFactory.selectedType) === -1 ? 'defaultAttr' : formFactory.selectedType])
        obj['type'] =  formFactory.selectedType;
        obj['position'] = formFactory.formFieldEditDelete.length;
        obj.helpText = 'pleas provide some help to user';
        formFactory.formFieldEditDelete.push(obj);
    };
    var numberType = ['text', 'number', 'range'];
    formFactory.getType = function(key, type) {
        if (key === 'required')
            return 'checkbox';
        return numberType.indexOf(type) === -1 ? type : 'number';
    }
    formFactory.editFieldFun = function (objRef) {
       formFactory.editField = objRef;
    }
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
    $scope.header = parameter.header || 'Alert Message';
    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };
    $scope.saveForm = function () {
        global.sendRequest('saveJSON', {data: formFactory.formFieldEditDelete, name: 'formJSON'}, 'post', function(data, status, headers, config) {
            $scope.close();
            global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: constant.msg.formSaved});

        });
    }
});

