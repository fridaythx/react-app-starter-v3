/* eslint-disable no-param-reassign */
/**
 * Form validation
 * v1
 */

function Validator(rules, options) {
  this.rules = rules || [];

  this.options = {
    ...Validator.globalOptions,
    // overwrite default global option
    ...options
  };
}

Validator.globalOptions = {
  defaultInvalidMessageTemplate: '$fname不正确',
  checkThroughAllFields: false,
  verbose: false,
  // rule name <==> validation name
  rulesNameMap: {
    required: 'isNotEmpt',
    phone: 'isValidPhone',
    phoneIgnoreWS: 'isValidPhoneIgnoreWS',
    email: 'isValidEmail',
    idcard: 'isValidIdCard',
    passport: 'isValidPassport',
    regex: 'isRegexMatched',
    repeat: 'isEqualTo',
    len: 'isLenInRange',
    notSame: 'isNotSame'
  }
};

Validator.prototype = {
  /* helper */
  options: {},
  curFieldCtx: {},
  messages: [],
  log(t, noPrefix) {
    if (!noPrefix) {
      console.warn(`Validation error : ${t}`);
    } else {
      console.info(t);
    }
  },
  // For debugging
  verbose(fname, rule, val, isValid) {
    if (this.options.verbose) {
      this.log(
        `Verbose : [Rule: ${rule} ,FieldName: ${fname} ,Value: ${val} ,isValid: ${isValid} ]`,
        true
      );
    }
  },

  /* helper */

  /* validations */
  isNotEmpt(value) {
    return !!value;
  },
  isValidPhone(value) {
    return this.isRegexMatched(value, {
      regex: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
      includeEmptyCheck: true
    });
  },
  isValidPhoneIgnoreWS(value) {
    const escaped = (value || '').replace(/\s/g, '');

    return this.isValidPhone(escaped);
  },
  isValidEmail(value) {
    return this.isRegexMatched(value, {
      regex: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
      includeEmptyCheck: true
    });
  },
  isValidPassport(value) {
    return this.isRegexMatched(value, {
      regex: /^[a-zA-Z]{5,17}$/,
      includeEmptyCheck: true
    });
  },
  isValidIdCard(value) {
    return this.isRegexMatched(value, {
      regex: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/,
      includeEmptyCheck: true
    });
  },
  isRegexMatched(value, { regex, includeEmptyCheck }) {
    return includeEmptyCheck
      ? this.isNotEmpt(value) && regex.test(value)
      : regex.test(value);
  },
  isEqualTo(value, { field, value: v }) {
    if (field) {
      return value === this.values[field];
    } else if (v) {
      return value === v;
    }
    this.log(
      'need `field` or `value` to check field, check the rules you passed in.'
    );

    return false;
  },
  isLenInRange(value, { max, min }) {
    value = value || '';

    if (typeof max === 'number' || typeof min === 'number') {
      let valid;

      if (typeof min === 'number') {
        valid = value.length >= min;
      }

      if (typeof max === 'number') {
        valid = value.length <= max && valid;
      }

      return valid;
    }

    this.log(
      'need `max` or `min` to check field, check the rules you passed in.'
    );

    return false;
  },
  isNotSame(value, { field, value: v }) {
    if (field) {
      return value !== this.values[field];
    } else if (v) {
      return value !== v;
    }

    this.log(
      'need `field` or `value` to check field, check the rules you passed in.'
    );

    return false;
  },
  /* validations */
  validate(values = {}, fieldsNeedCheck, checkThroughAllFields) {
    if (typeof fieldsNeedCheck === 'boolean') {
      checkThroughAllFields = fieldsNeedCheck;

      fieldsNeedCheck = Object.keys(values);
    }

    // overwrite default global option
    if (typeof checkThroughAllFields === 'boolean') {
      this.options.checkThroughAllFields = checkThroughAllFields;
    }

    // save values for checking method
    this.values = values;

    // clear messages array
    this.messages = [];

    // validate each field that is in the fields list to be validate.
    fieldsNeedCheck.forEach(fname => {
      // pick up the rule for the field
      const rule = this.rules[fname];

      // pick up the value for the field
      const val = values[fname];

      if (!rule) {
        this.log(`Missing validation rule for field [${fname}]`);
      } else if (
        /* IF NEED VALIDATING THROUGH ALL FIELDS */ this.checkMoveOnValidating()
      ) {
        this.validateField(fname, val, rule);
      }
    });

    return this.messages;
  },
  /* validating single field */
  validateField(fname, val, rule) {
    let rules = [];

    const rulesParams = [];

    let messageTemplates = [];

    if (rule instanceof String) {
      messageTemplates = [
        this.options.defaultInvalidMessageTemplate.replace(/\$fname/g, fname)
      ];

      rules = [rule];
    } else if (rule instanceof Array) {
      messageTemplates = rule.map(() =>
        this.options.defaultInvalidMessageTemplate.replace(/\$fname/g, fname)
      );

      rules = [...rule];
    } else {
      messageTemplates = Object.values(rule).map(e => {
        let tmpl = e;

        let params = {};

        if (typeof e !== 'string') {
          const { msg, ...other } = e;

          tmpl = e.msg;

          params = other;
        }

        rulesParams.push(params);

        return tmpl.replace(/\$fname/g, fname);
      });

      rules = Object.keys(rule);
    }
    // check each rule for each field
    rules.forEach((r, i) => {
      const invalidFieldMessage = messageTemplates[i];

      this.curFieldCtx = {
        invalidFieldMessage
      };

      if (this.checkMoveOnValidating()) {
        // save validation error message if it exists.
        const message = this.validateFieldForRule(val, r, rulesParams[i]);

        this.verbose(fname, r, val, !message);

        if (message) {
          this.messages.push(message);
        }
      }
    });
  },
  /* validating single field for specified rule */
  validateFieldForRule(val, rule, params) {
    let message = null;

    const checkFnName = this.options.rulesNameMap[rule];

    if (!checkFnName) {
      this.log(`Rule named [${rule}] dosen't exist.`);

      return message;
    }

    const checkFn = this[checkFnName];

    if (!checkFn || typeof checkFn !== 'function') {
      this.log(`CheckFn named [${checkFnName}] dosen't exist.`);

      return message;
    }

    message = checkFn.apply(this, [val, params])
      ? null
      : this.curFieldCtx.invalidFieldMessage;

    return message;
  },
  checkMoveOnValidating() {
    // any invalid messages & checkThroughAllFields equal to true
    if (!this.options.checkThroughAllFields && this.messages.length) {
      return false;
    }
    return true;
  }
};

export default Validator;
