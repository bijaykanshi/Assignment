app.factory('constant', function($http, $modal, $state, $location, $rootScope){
     
    var constant = {};
    
    constant.msg = {
        error_required: 'This field is required',
        alert_user_not_registered: 'Invalid Username and password',
        alert_siginUp_success: 'You have successfully registered ..please continue with login',
        error_length_greater_50: 'Length can not be greater than 50',
        error_server: 'there is some internal server error',
        addLink: 'Add Link and Template here thats match your requirement',
        AddedSucessfully: 'Whatever you have written added successfully',
        AddBothQD: 'please Add both Question and Answer',
        NotAdded: 'You havent added any Question and Answer yet',
        allAdded: 'Your template has been saved successfully on server',
        mustPresent: 'Username and password must be present',
        addEditTemplate: 'Add Your Template Here',
        editPanelTab: 'Edit your Panel or Tab Here',
        editTab: 'Edit your tab body and header here',
        unsavedData: 'You have unsaved data that may destroy on clicking this button',
        plzInsertLinkName: 'Please insert Link Name',
        tempSelected: 'Your Template has been selected, click here to edit your template',
        deleteTemp: 'Click here to delete this template',
        saveTemp: 'Click here to save your template on server',
        mustSelectTemp: 'You must have to select template',
        positionOp: 'Plz enter the position where you want to insert this link (Its optional, if its blank we will insert at end)',
        editTemp: 'Click Here to edit your link and template',
        deleteTemp: 'Click Here to delete Link completely',
        buildForm: 'Customize your form Here, Add Whatever you want',
        addOption: 'Click Here to add more option',
        selectField: 'Select desired Input field here to add',
        formSaved: 'your form has been saved successfully',
        uniqueKey: 'Please enter unique label, because this field is going to be key in database. Following is the label that need to be taken care of',
        successRegister: 'you have successfully registered',
        BuidYour: 'Made your query to extract particular record from selected collection',
        selectColl: 'Select collection from where you want to see record',
        rowSel: 'Click here to select particular row from selected collection',
        projection: 'click here to select particular column you want to see (default value is all column)',
        rowSelTemp: 'Put condition on column',
        addMoreCond: 'Click here to add more condition',
        deleteCond: 'Click here to delete this condition',
        deleteCond: 'Are you sure you want to delete this condition',
        plzPutCond: 'Please select condition from select field',
        plzEnterValidJSON: 'Please write query in valid json format',
        editRowData: 'Edit row data here',
        noDataOnDb: 'No data found in data base',
        notChangeAnyThing: 'You Have not change any thing till now',
        changSavedSucces: 'Your change has been saved successfully',
        confirm_delete: 'Are you sure you want to delete this collection',
        notAdded: 'Your Collection has not been inserted into database because of the Following reason',
        notEdited: 'Edit operation has not been completed because of the Following reason',
        alreadyAdded: 'You have already added this collection',
        formLink: 'Select this option to take data from your users..',
        dispContLink: 'Select to displpay content only',
        mustSelectColl: "You need to select at least one collection",
        successTakeData: "Your data has been saved successfully"

    };
    constant.loginForm = [
        {
            "type": "email",
            "placeholder": "Email",
            "label": "Email",
            "key": "email"
        },
        {
            "type": "password",
            "placeholder": "Password",
            "label": "Password",
            "key": "pass"
        },
        {
            "type": "select",
            "label": "User Category",
            "key": "ucat"
        }
    ];
    constant.newsFeed = [
        {
            "type": "Text",
            "placeholder": "Insert Url here",
            "label": "Url",
            "key": "url"
        },
        {
            "type": "text",
            "placeholder": "Insert News Title",
            "label": "News Title",
            "key": "news_title"
        },
        {
            "type": "text",
            "placeholder": "Insert Hacker News Url",
            "label": "Hacker News Url",
            "key": "hacker_news_url"
        },
        {
            "type": "text",
            "placeholder": "Insert News Discription",
            "label": "News Discription",
            "key": "news_desc"
        }
    ];
    constant.signUpForm = [
    	{
    		"placeholder": "Name",
    		"label": "Name",
    		"key": "name"
    	},
    	{
    		"type": "email",
    		"placeholder": "Email",
    		"label": "Email",
    		"key": "email"
    	},
    	{
    		"type": "password",
    		"placeholder": "Password",
    		"label": "Password",
    		"key": "password"
    	},
    	{
    		"type": "date",
    		"placeholder": "Date Of Birth",
    		"label": "Date Of Birth",
    		"key": "dob"
    	},
        {
            "type": "select",
            "label": "User Category",
            "key": "ucat"
        },
    	{
    		"type": "number",
    		"placeholder": "Contact No",
    		"label": "Contact No",
    		"key": "contact_No"
    	},
    	{
    		"placeholder": "City",
    		"label": "City",
    		"key": "city"
    	},
    	{
    		"placeholder": "State",
    		"label": "State",
    		"key": "state"
    	},
    	{
    		"placeholder": "Country",
    		"label": "Country",
    		"key": "country"
    	},
    	{
    		"type": "number",
    		"placeholder": "Pin Code",
    		"label": "Pin Code",
    		"key": "pin_code"
    	}
    ]

    return constant;
});
