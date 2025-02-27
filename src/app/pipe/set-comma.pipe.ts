
import { Pipe, PipeTransform } from '@angular/core';
import { ValidationUtil } from '../common/util/validation.util';

@Pipe({ name: "setComma" })
export class SetCommaPipe implements PipeTransform {

	constructor() { }

	transform(value: String | Number | string | number | undefined, type: String | string | undefined): String {

		if (!value) {
			return "0";
		} else {
			if (type == 'price') {
				return this.setComma(value);
			} else {
				return this.setComma(value);
			}
		}
	}

  setComma(value: String | Number): string {
		if (ValidationUtil.isNotNullAndNotEmpty(value)) {
			if (typeof value !== "string") {
				value = value.toString();
			}

			let result = value + "";
			let regex = /(^[+-]?\d+)(\d{3})/;
			while (regex.test(result)) {
				result = result.replace(regex, '$1' + ',' + '$2');
			}

			return result;
		}

		return "0";
	}
}
