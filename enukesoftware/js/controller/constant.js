app.factory('constant', function($http, $modal, $state, $location, $rootScope){
     
    var constant = {};
    $rootScope.constant = constant;
    constant.msg = {
        error_required: 'This field is required',
        alert_success: 'You have successfully submitted the form',
        error_length_greater_50: 'Length can not be greater than 50',
        error_server: 'there is some internal server error'
    };
    
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
