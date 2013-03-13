# jQuery Validate #

> License: <a href="http://www.opensource.org/licenses/mit-license.php" target="_blank">_MIT_</a>.

> Version: _1.1.2_.

> Requires: _jQuery 1.7+_.

##Setup
###1. Include the Libraries
To use _jQuery Validate_, your JavaScript needs to include references to
* The <a href="http://jquery.com/" target="_blank">jQuery</a> library (v1.7+)
* The jQuery Validate library (<a href="https://www.dropbox.com/s/p5xhpb52572xy5b/jQuery%20Validate%201.1.2.zip" target="_blank">Click here to download the plugin</a>)

###2. Validate Your Form(s)
Use jQuery to select your form and call the `jQuery.fn.validate` method on it.

**Example**:
```javascript
jQuery('form').validate();
```

###3. Update Form Fields
Calling `jQuery.fn.validate` on your form element will turn on validation for that form. But none of form's field elements have any validation rules associated with them yet. _jQuery Validate_ uses <a href="http://www.w3.org/TR/2011/WD-html5-20110525/elements.html#embedding-custom-non-visible-data-with-the-data-attributes" target="_blank">`data-*`</a> attributes to wire up your validation rules.

**Example**:
```html
<form>
	<input type="text" data-required />
</form>
```

_jQuery Validate_ supports all fields of the HTML5 and uses <a href="http://www.w3.org/WAI/PF/aria/" target="_blank">WAI-ARIA</a> for accessibility. You can use several attributes to your validations.


## data-* Attributes

<table>
	<tr>
		<th width="130px">Attribute</th>
		<th>Description</th>
		<th width="70px">Default</th>
	</tr>
	<tr>
		<td><code>data-conditional</code></td>
		<td>A function name. The function must: 
			<ul>
			<li>Return a boolean value describing whether the validation passed (true) or failed (false)</li>
			<li>Be methods of a JavaScript object named <code>conditional</code>.</li>
			</ul>
		</td>
		<td></td>
	</tr>
	<tr>
		<td><code>data-confirm</code></td>
		<td>A string specifying the HTML `id` of another element. The value of this field will be compared to the value of the element with the specified `id`.
		</td>
		<td></td>
	</tr>
	<tr>
		<td><code>data-ignore-case</code></td>
		<td>Accepts a boolean value to specify if the field is case-insensitive.</td>
		<td><code>true</code></td>
	</tr>
	<tr>
		<td><code>data-mask</code></td>
		<td>Accepts a mask to change the field value to the specified format. This mask uses the matched groups from the regular expression passed to the <a href="#data-pattern"><code>data-pattern</code></a> attribute.</td>
		<td><code>${0}</code></td>
	</tr>
	<tr>
		<td><code>data-maxlength</code></td>
		<td>An integer describing the maximum length of the value. When applied to a checkbox, this will count the total number of checked checkboxes with the same name as the current checkbox element.</td>
		<td></td>
	</tr>
	<tr>
		<td><code>data-minlength</code></td>
		<td>An integer describing the minimum length of the value. When applied to a checkbox, this will count the total number of checked checkboxes with the same name as the current checkbox element.</td>
		<td></td>
	</tr>
	<tr>
		<td><code>data-pattern</code></td>
		<td>Accepts a regular expression to test the field value. <i>Note: regular expression delimiters (usually '/') are not needed.</i></td>
		<td><code>(?:)</code></td>
	</tr>
	<tr>
		<td><code>data-prepare</code></td>
		<td>Accepts a function name. The function must exist on an object named <code>prepare</code>. The function can manipulate the value before validation is run on it. It returns the updated value. <i>Note: this does not change the actual field value in the HTML.</i></td>
		<td></td>
	</tr>
	<tr>
		<td><code>data-required</code></td>
		<td>Accepts a boolean value to specify if field is required.</td>
		<td><code>false</code></td>
	</tr>
	<tr>
		<td><code>data-trim</code></td>
		<td>Accepts a boolean value. If true, trims whitespace from the beginning and end of the value before validation. <i>Note: this does not change the actual field value in the HTML.</i></td>
		<td><code>false</code></td>
	</tr>
	<tr>
		<td><code>data-validate</code></td>
		<td>Accepts the name of an object that extends the validator (via <code>jQuery.fn.validateExtension</code>. More information about these extensions below.</td>
		<td></td>
	</tr>
</table>

## Parameters ##
You can override the default _jQuery Validate_ behavior by setting the following properties with `jQuery.validateSetup`
<table>
	<tr>
		<th width="110px">Parameter</th>
		<th>Description</th>
		<th width="70px">Default</th>
	</tr>
	<tr>
		<td><code>conditional</code></td>
		<td>An object with custom validation methods.</td>
		<td></td>
	</tr>
	<tr>
		<td><code>filter</code></td>
		<td>Accepts a selector string or function to filter the validated fields.</td>
		<td><code>*</code></td>
	</tr>

	<tr>
		<td><code>namespace</code></td>
		<td>A namespace used for all delegated events.</td>
		<td><code>validate</code></td>
	</tr>
	<tr>
		<td><code>onBlur</code></td>
		<td>Accepts a boolean value. If true, validation will be triggered when focus leaves the field.</td>
		<td><code>false</code></td>
	</tr>
	<tr>
		<td><code>onChange</code></td>
		<td>Accepts a boolean value. If true, validation will be triggered when the field's selection, checked state, or value changes.</td>
		<td><code>false</code></td>
	</tr>
	<tr>
		<td><code>onKeyup</code></td>
		<td>Accepts a boolean value. If true, validation will be triggered after any key is pressed.</td>
		<td><code>false</code></td>
	</tr>

	<tr>
		<td><code>onSubmit</code></td>
		<td>Accepts a boolean value. If true, validation will be triggered when the form is submitted.</td>
		<td><code>true</code></td>
	</tr>
	<tr>
		<td><code>prepare</code></td>
		<td>An object with functions that can create or alter field values before they are validated. Select which of the object's functions to run on each field with the <code>data-prepare</code> attribute.</td>
		<td></td>
	</tr>
	<tr>
		<td><code>sendForm</code></td>
		<td>Accepts a boolean value. If false, prevents the default submit action of the form. (Useful to submit forms via <a href="http://api.jquery.com/jQuery.ajax/" target="_blank">AJAX</a>).</td>
		<td><code>true</code></td>
	</tr>
	<tr>
		<td><code>waiAria</code></td>
		<td>Accepts a boolean value. If false, disables <a href="http://www.w3.org/WAI/PF/aria/" target="_blank">WAI-ARIA</a>.</td>
		<td><code>true</code></td>
	</tr>
	<tr>
		<td><code>sendInvalidForm</code></td>
		<td>If true, the form will activate the default submit action even if some form fields fail validation.</td>
		<td><code>false</code></td>
	</tr>
</table>

## Callbacks ##
Callbacks are run after each field is validated or after the entire form has been validated, depending on the success or failure state. 
<table>
	<tr>
		<th width="110px">Callback</th>
		<th>Description</th>
	</tr>
	<tr>
		<td><code>valid</code></td>

		<td>Function called when the form is valid. The context (<code>this</code>) is the current form. The method should take two parameters: <code>event</code> and <code>options</code>.</td>
	</tr>
	<tr>
		<td><code>invalid</code></td>
		<td>Function called when the form is invalid. The context (<code>this</code>) is the current form. The method should take two parameters: <code>event</code> and <code>options</code>.</td>
	</tr>
	<tr>
		<td><code>eachField</code></td>
		<td>Function called after validation of each field, whether it passes validation or not. The context (<code>this</code>) is the current field. The method should take three parameters: <code>event</code>, <code>status</code> and <code>options</code>.</td>
	</tr>
	<tr>
		<td><code>eachInvalidField</code></td>
		<td>Function called after validation fails on a field. The context (<code>this</code>) is the current field. The method should take three parameters: <code>event</code>, <code>status</code> and <code>options</code>.</td>
	</tr>
	<tr>
		<td><code>eachValidField</code></td>
		<td>Function called after validation succeeds on a field. The context (<code>this</code>) is the current field. The method should take three parameters: <code>event</code>, <code>status</code> and <code>options</code>.</td>
	</tr>
</table>

## Removing Validation ##
You can remove validation of a form using the `jQuery.fn.validateDestroy` method.

**Example**:
```javascript
jQuery('form').validateDestroy();
```

## Setting Validation Options
You can change the default values of `jQuery.fn.validate` using the `jQuery.validateSetup` method.

**Example**:
```javascript
jQuery.validateSetup({
	sendForm : false,
	onKeyup : true
});
```

## Creating Descriptions ##
Descriptions are information describing failures. Using the following `data-*` properties, you can specify which containers describe the failures for a specific field. 
* `data-describedby`: Set the value of this attribute to the HTML ID of the element that describes the state of this field.
* `data-description`: Set the value of this attribute to the name of an object inside the `description` object passed to `jQuery.fn.validate`. The object should contain one or more of the the following fields:
   * `required`: a string containing the content to display inside the describedby element when the field fails validation due to the `data-required` validation.
   * `pattern`: a string containing the content to display inside the describedby element when the field fails validation due to the `data-pattern` validation.
   * `conditional`: a string containing the content to display inside the describedby element when the field fails validation due to the `data-conditional` validation.
   * `valid`: a string containing the content to display inside the describedby element when the field is successfully validated.

**Example**:
```html
<form>
    <input type="text" 
	       data-describedby="messages" 
	       data-description="test" />
	<div id="messages"></div>
</form>
```

```javascript
$('form').validate({
	description : {
		test : {
			required    : '<div class="error">Required</div>',
			pattern     : '<div class="error">Pattern</div>',
			conditional : '<div class="error">Conditional</div>',
			valid       : '<div class="success">Valid</div>'
		}
	}
});
```

## Creating Validation Extensions ##
You can create your own validation rules by calling the  `jQuery.validateExtend` and passing an object containing validation rules. Invoke the custom validations on fields with the `data-validate` attribute.

**Example**:
```html
<form>
	<input type="text" name="age" data-validate="age" />
</form>
```

```javascript
jQuery('form').validate();
jQuery.validateExtend({
	age : {
		required : true,
		pattern : /^[0-9]+$/,
		conditional : function(value) {
			return Number(value) > 17;
		}
	}
});
```