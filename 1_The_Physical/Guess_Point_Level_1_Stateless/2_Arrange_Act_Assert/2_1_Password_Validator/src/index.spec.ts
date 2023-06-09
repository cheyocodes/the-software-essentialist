import { PasswordValidator } from './index';

describe('password validator', () => {

  describe('password length is between 5 and 15 characters long', () => {
    it.each([
      { password: "Passw4rd8H2vB72", isValid: true, errors: [] },
      { password: "Passw4", isValid: true, errors: [] },
      { password: "asX6", isValid: false, errors: [{ type: 'INVALID_LENGTH_ERROR'}] },
      { password: "asX387484945939383779530376", isValid: false, errors: [{ type: 'INVALID_LENGTH_ERROR'}] },
    ])
    ("should return $isValid for '$password'",
    ({ password, isValid, errors }) => {
      const result = PasswordValidator.validate(password);
      expect(result.isValid).toBe(isValid);
      expect(result.errors).toStrictEqual(errors);
    });
  });

  describe('checks password contains at least one digit', () => {
    it.each([
      { password: "Passw4", isValid: true, errors: [] },
      { password: "Password", isValid: false, errors: [{ type: "NO_DIGIT_ERROR" }] },
      { password: "maxwellTheBe", isValid: false, errors: [{ type: 'NO_DIGIT_ERROR'}] },
    ])
    ("should return $isValid for '$password'",
    ({ password, isValid, errors }) => {
      const result = PasswordValidator.validate(password);
      expect(result.isValid).toBe(isValid);
      expect(result.errors).toStrictEqual(errors);
    });
  });

  describe('checks password contains at least one uppercase letter', () => {
    it('should return false for "as39530376"', () => {
      const result = PasswordValidator.validate("as39530376");
      expect(result.isValid).toBeFalsy();
      expect(result.errors).toStrictEqual([{ type: 'NO_UPPERCASE_LETTER_ERROR' }]);
    });

    it('should return true for "Passw0rd"', () => {
      const result = PasswordValidator.validate("Passw0rd");
      expect(result.isValid).toBeTruthy();
      expect(result.errors).toStrictEqual([]);
    });
  });

  describe('detects multiple errors', () => {
    it('should detect that "password" does not contain an uppercase letter and at least 1 digit', () => {
      const result = PasswordValidator.validate("password");
      expect(result.isValid).toBeFalsy();
      expect(result.errors).toStrictEqual(
        [
          { type: 'NO_DIGIT_ERROR' },
          { type: 'NO_UPPERCASE_LETTER_ERROR' },
        ]
      );
    });

    it('should detect that "pass" does not contain an uppercase letter and at least 1 digit, and a valid length', () => {
      const result = PasswordValidator.validate("pass");
      expect(result.isValid).toBeFalsy();
      expect(result.errors).toStrictEqual(
        [
          { type: 'INVALID_LENGTH_ERROR' },
          { type: 'NO_DIGIT_ERROR' },
          { type: 'NO_UPPERCASE_LETTER_ERROR' },
        ]
      );
    });
  })

});