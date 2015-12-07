"use strict";

var sendRequest = function(addr, data) {
	var request = new XMLHttpRequest();
	request.open('POST', encodeURI(addr));
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	
	request.onload = function() {
		var res = JSON.parse(this.responseText);
		
		if (res.error) {
			document.getElementById('error').innerHTML = res.error;
		} else if (res.redirect) {
			window.location = res.redirect;
		}
	}
	
	request.send(data);
}

window.onload = function() {
	var signupButton = document.getElementById('signupButton');
	if (signupButton != null) {
		signupButton.addEventListener('click', function(e) {
			e.preventDefault();
			
			var form = document.forms['signupForm'];
			
			// send request
			var data = '_csrf='+form['csrfToken'].value+'&username='+form['username'].value+'&pass1='+form['pass1'].value+'&pass2='+form['pass2'].value;
			sendRequest('/signup', data);
		});
	}
	
	var loginButton = document.getElementById('loginButton');
	if (loginButton != null) {
		loginButton.addEventListener('click', function(e) {
			e.preventDefault();
			
			var form = document.forms['loginForm'];
			
			// send request
			var data = '_csrf='+form['csrfToken'].value+'&username='+form['username'].value+'&pass='+form['pass'].value;
			sendRequest('/login', data);
		});
	}
}