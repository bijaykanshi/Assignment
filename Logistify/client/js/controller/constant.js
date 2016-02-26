app.factory('constant', function($htt $state, $location, $rootScope){
     
    var constant = {};
    $rootScope.constant = constant;
    console.log(type);;
    constant.msg = {
        error_required: 'This field is required',
        alert_user_not_registered: 'Invalid Username and password',
        alert_siginUp_success: 'You have successfully registered ..please continue with login',
        error_length_greater_50: 'Length can not be greater than 50',
        error_server: 'there is some internal server error'
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
            "placeholder": "Password"
            "label": "Password",
            "key": "password"
        },
        {
            "type": "select",
            "label": "User Category",
            "key": "ucat"
        }
    ];
    constant.signUpForm = [
    	{
    		"placeholder": "Name"
    		"label": "Name",
    		"key": "name"
    	},
    	{
    		"type": "email",
    		"placeholder": "Email"
    		"label": "Email",
    		"key": "email"
    	},
    	{
    		"type": "password"
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
