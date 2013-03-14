/* http://plugins.jquery.com/validate */
;(function(defaults, $, undefined) {
	'use strict';
	var
		name = 'validate',
		// CSS Selector for all field types
		type = ['input:not([type]),input[type=color],input[type=date],input[type=datetime],input[type=datetime-local],input[type=email],input[type=file],input[type=hidden],input[type=month],input[type=number],input[type=password],input[type=range],input[type=search],input[type=tel],input[type=text],input[type=time],input[type=url],input[type=week],textarea', 'select', 'input[type=checkbox],input[type=radio]'],
		allTypes = type.join(','),

		extend = {},

		validateField = function(event, options) {
			var
				status = {
					pattern     : true,
					conditional : true,
					required    : true,
					confirm     : true,
					minlength   : true,
					maxlength   : true
				},
				field = $(this),
				data = field.data(),
				fieldValue = field.val() || '',
				fieldValidate = data.validate,

				// A validation object (jQuery.fn.validateExtend)
				validation = fieldValidate !== undefined ? extend[fieldValidate] : {},

				fieldPrepare     = data.prepare || validation.prepare,
				fieldPattern     = (data.pattern || ($.type(validation.pattern) === 'regexp' ?
				                                     validation.pattern : /(?:)/)),
				fieldIgnoreCase  = field.prop('data-ignore-case') || data.ignoreCase || validation.ignoreCase,
				fieldMask        = data.mask || validation.mask,
				fieldConditional = data.conditional || validation.conditional,
				fieldRequired    = data.required,
				fieldConfirm     = data.confirm || validation.confirm,
				minlength        = Number(data.minlength || validation.minlength || 0),
				maxlength              = Number(data.maxlength || validation.maxlength || Infinity),
				descriptionValid       = data.descriptionValid,
				descriptionRequired    = data.descriptionRequired,
				descriptionPattern     = data.descriptionPattern,
				descriptionConfirm     = data.descriptionConfirm,
				descriptionConditional = data.descriptionConditional,
				descriptionMinlength   = data.descriptionMinlength,
				descriptionMaxlength   = data.descriptionMaxlength,

				fieldDescribedby = data.describedby || validation.describedby,
				fieldDescription = data.description || validation.description,

				fieldTrim = data.trim,

				reTrue = /^(true|)$/i,
				reFalse = /^false$/i;

			$(this).describedby = fieldDescribedby;
			// Initialize the field description object.
			fieldDescription = $.isPlainObject(fieldDescription) ?
			                   fieldDescription : (options.description[fieldDescription] || {});

			// Override any Description properties with inline values
			fieldDescription.valid       = descriptionValid       ? descriptionValid       : fieldDescription.valid;
			fieldDescription.required    = descriptionRequired    ? descriptionRequired    : fieldDescription.required;
			fieldDescription.pattern     = descriptionPattern     ? descriptionPattern     : fieldDescription.pattern;
			fieldDescription.conditional = descriptionConditional ? descriptionConditional : fieldDescription.conditional;
			fieldDescription.confirm     = descriptionConfirm     ? descriptionConfirm     : fieldDescription.confirm;
			fieldDescription.minlength   = descriptionMinlength   ? descriptionMinlength   : fieldDescription.minlength;
			fieldDescription.maxlength   = descriptionMaxlength   ? descriptionMaxlength   : fieldDescription.maxlength;

			fieldRequired    = fieldRequired !== '' ? (fieldRequired || !!validation.required) : true;
			fieldTrim        = fieldTrim !== '' ? (fieldTrim || !!validation.trim) : true;
			fieldConfirm     = $('#' + fieldConfirm).length > 0 ? $('#' + fieldConfirm) : $(fieldConfirm);
			minlength        = typeof minlength === 'number' ? minlength : 0;
			maxlength        = typeof maxlength === 'number' ? maxlength : Infinity;

			if ($.type(fieldPattern) !== 'regexp') {
				fieldIgnoreCase = !reFalse.test(fieldIgnoreCase);
				// Convert to RegExp
				fieldPattern = fieldIgnoreCase ? new RegExp(fieldPattern, 'i') : new RegExp(fieldPattern);
			}

			if(reTrue.test(fieldTrim)) {
				fieldValue = $.trim(fieldValue);
			}

			// Call the value pre-processing 'prepare' function, if it exists
			if($.isFunction(fieldPrepare)) {
				fieldValue = String(fieldPrepare.call(field, fieldValue));
			} else {
				if($.isFunction(options.prepare[fieldPrepare])) {
					fieldValue = String(options.prepare[fieldPrepare].call(field, fieldValue));
				}
			}

			// Run 'conditional' validation on this field, if it exists
			if(fieldConditional !== undefined) {
				if($.isFunction(fieldConditional)) {
					status.conditional = !!fieldConditional.call(field, fieldValue, options);
				} else {
					var
						conditionals = fieldConditional.split(/\s+/);
					for(var counter = 0, len = conditionals.length; counter < len; counter++) {
						if(options.conditional.hasOwnProperty(conditionals[counter])
								&& !options.conditional[conditionals[counter]].call(field, fieldValue, options)) {
							status.conditional = false;
						}
					}
				}
			}

			// Run 'required' validation on this field, if necessary
			fieldRequired = reTrue.test(fieldRequired);
			if(fieldRequired) {
				if(field.is(type[0] + ',' + type[1])) {
					if(fieldValue.length === 0) {
						status.required = false;
					}
				} else if(field.is(type[2])) {
					if(field.is('[name]')) {
						if($('[name="' + field.prop('name') + '"]:checked').length === 0) {
							status.required = false;
						}
					} else {
						status.required = field.is(':checked');
					}
				}
			}

			// Run 'pattern' validation on this field, if necessary
			if(field.is(type[0])) {
				if(fieldPattern.test(fieldValue)) {
					if(event.type !== 'keyup' && fieldMask !== undefined) {
						var matches = fieldValue.match(fieldPattern);
						for(var i = 0; i < matches.length; i++) {
							fieldMask = fieldMask.replace(
									new RegExp('\\$\\{' + i + '(?::`([^`]*)`)?\\}', 'g'),
									(matches[i] !== undefined ? matches[i] : '$1'));
						}
						fieldMask = fieldMask.replace(/\$\{\d+(?::`([^`]*)`)?\}/g, '$1');
						if(fieldPattern.test(fieldMask)) {
							field.val(fieldMask);
						}
					}
				} else {
					// Pattern match failed.
					if(fieldValue.length == 0) {
						// Don't fail; let 'required' validation handle the empty case
					} else {
						status.pattern = false;
					}
				}
			}

			// Run 'confirm' validation on this field, if necessary
			if(fieldConfirm.length > 0) {
				status.confirm = fieldValue === fieldConfirm.val();
			}

			if(field.is('input[type=checkbox]')) {
				status.minlength = $('[name="' + field.prop('name') + '"]:checked').length >= minlength;
				status.maxlength = $('[name="' + field.prop('name') + '"]:checked').length <= maxlength;
			} else {
				if(field.is('[name]')) {
					status.minlength = fieldValue.length >= minlength;
					status.maxlength = fieldValue.length <= maxlength;
				}
			}

			var
				describedby = $('#' + fieldDescribedby),
				message = "";

			// Create the failure/success description HTML
			if (describedby.length > 0) {
				if (event.type == 'keyup') {
					if ($.inArray(event.keyCode, [9,16,17,18,20]) < 0 ) {
						// Ignore some keys key; for all others, clear the description while editing.
						//   9:tab; 16:shift; 17:ctrl; 18:alt; 20:caps-lock
						describedby.html("");
					}
				} else {
					if (!status.required) {
						message += fieldDescription.required;
					}
					if (!status.minlength) {
						message += fieldDescription.minlength;
					}
					if (!status.maxlength) {
						message += fieldDescription.maxlength;
					}
					if (!status.pattern) {
						message += fieldDescription.pattern;
					}
					if (!status.conditional) {
						message += fieldDescription.conditional;
					}
					if (!status.confirm) {
						message += fieldDescription.confirm;
					}
					if (message.length == 0) {
						message = fieldDescription.valid;
					}
					describedby.html(message);
				}
				if (describedby.html().length == 0) {
					describedby.hide();
				} else {
					describedby.show();
				}
			}

			if(typeof(validation.each) === 'function') {
				validation.each.call(field, event, status, options);
			}

			options.eachField.call(field, event, status, options);

			// If the field is valid
			if(    status.required
					&& status.pattern
					&& status.conditional
					&& status.confirm
					&& status.maxlength
					&& status.minlength) {
				if(!!options.waiAria) {
					field.prop('aria-invalid', false);
				}
				if(typeof(validation.valid) === 'function') {
					validation.valid.call(field, event, status, options);
				}
				options.eachValidField.call(field, event, status, options);
			} else {
				if(!!options.waiAria) {
					field.prop('aria-invalid', true);
				}
				if(typeof(validation.invalid) === 'function') {
					validation.invalid.call(field, event, status, options);
				}
				// Call the eachInvalidField callback
				options.eachInvalidField.call(field, event, status, options);
			}
			return status;
		};

	$.extend({
		validateExtend : function(options) {
			return $.extend(extend, options);
		},
		validateSetup : function(options) {
			return $.extend(defaults, options);
		}
	}).fn.extend({
		validate : function(options) {
			options = $.extend({}, defaults, options);
			return $(this).validateDestroy().each(function() {
				var form = $(this);
				if(form.is('form')) {
					form.data(name, {
						options : options
					});
					var
						fields = form.find(allTypes),
						namespace = '.' + options.namespace;

					if(form.is('[id]')) {
						fields = fields.add('[form="' + form.prop('id') + '"]').filter(allTypes);
					}

					fields = fields.filter(options.filter).off(namespace);

					if(!!options.onKeyup) {
						fields.filter(type[0]).on('keyup' + namespace, function(event) {
							validateField.call(this, event, options, form);
						});
					}

					if(!!options.onBlur) {
						fields.on('blur' + namespace, function(event) {
							validateField.call(this, event, options, form);
						});
					}

					if(!!options.onChange) {
						fields.on('change' + namespace, function(event) {
							validateField.call(this, event, options, form);
						});
					}

					if(!!options.onSubmit) {
						form.on('submit' + namespace, function(event) {
							var formValid = true;

							fields.each(function() {
								var status = validateField.call(this, event, options, form);
								if(!status.pattern || !status.conditional || !status.required) {
									formValid = false;
								}
							});
							if(formValid) {
								if(!options.sendForm) {
									event.preventDefault();
								}
								if($.isFunction(options.valid)) {
									options.valid.call(form, event, options);
								}
								form.trigger('valid');
							} else {
								if(!options.sendInvalidForm) {
									event.preventDefault();
								}
								if($.isFunction(options.invalid)) {
									options.invalid.call(form, event, options);
								}
								form.trigger('invalid');
							}
						});
					}
				}
			});
		},

		validateDestroy : function() {
			var
				form = $(this),
				dataValidate = form.data(name);

			if(form.is('form')
					&& $.isPlainObject(dataValidate)
					&& typeof(dataValidate.options.namespace) === 'string') {
				var fields = form.removeData(name).find(allTypes).add(form);
				if(form.is('[id]')) {
					fields = fields.add($('[form="' + form.prop('id') + '"]').filter(allTypes));
				}
				fields.off('.' + dataValidate.options.namespace);
			}
			return form;
		}
	});
})({
	sendForm         : true,
	sendInvalidForm  : false,
	waiAria          : true,
	onSubmit         : true,
	onKeyup          : false,
	onBlur           : false,
	onChange         : false,
	namespace        : 'validate',
	conditional      : {},
	prepare          : {},
	description      : {},
	eachField        : $.noop,
	eachInvalidField : $.noop,
	eachValidField   : $.noop,
	invalid          : $.noop,
	valid            : $.noop,
	filter           : '*'
}, jQuery);