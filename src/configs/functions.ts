import dayjs, { Dayjs } from "dayjs";

export class $$ {
  public static appendPagination(path: string, page = 1, limit = 10) {
    return `${path}?page=${page}&limit=${limit}`;
  }

  static isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
  }

  public static isValidArray(value: any): boolean {
    return Array.isArray(value) && value.length > 0;
  }

  public static isValidObject(value: any): boolean {
    return typeof value === "object" && value !== null;
  }

  public static toSafeValue(value: any): any {
    if (this.isNotEmpty(value)) {
      return value;
    }
    return "";
  }

  public static queryNormalizer = (options: any) => {
    const pureOption = this.toCleanObject(options);

    if (pureOption?.query) {
      return options.query;
    }
    const queries: any = [];
    Object.entries(pureOption).map(([key, value]: any) => {
      const valueType = Array.isArray(value) ? "array" : typeof value;
      if (valueType === "array") {
        return queries.push(`${key}=${JSON.stringify(value)}`);
      }
      //  else if (valueType === 'array' && key === 'filter') {
      //   return value.map((fOption) => {
      //     return queries.push(`${key}=${fOption}`);
      //   });
      // } else if (valueType === 'array') {
      //   return queries.push(`${key}=${JSON.stringify(value)}`);
      // }
      else if (valueType === "object") {
        return queries.push(`${key}=${JSON.stringify(value)}`);
      } else {
        return queries.push(`${key}=${value}`);
      }
    });
    return queries.join("&");

    //   if (options?.query) {
    //     return options.query;
    //   }
    //   if (options) {
    //     const items = {};
    //     Object.keys(options).map((x) => {
    //       if (Boolean(options[x])) {
    //         items[x] = options[x];
    //       }
    //     });
    //     return Object.keys(items)
    //       .map((x) => {
    //         const propertyName = x;
    //         const propertyValue = items[x];
    //         const propertyValueType = typeof items[x];
    //         if (propertyValueType === 'object') {
    //           return `${propertyName}=${JSON.stringify(propertyValue)}`;
    //         } else {
    //           return `${propertyName}=${propertyValue}`;
    //         }
    //       })
    //       .join('&');
    //   }

    //   return '';
    // };
  };

  public static randomString(
    length: number,
    type: "lower" | "upper" | "numeric",
  ): string {
    let result = "";
    const characters =
      type === "lower"
        ? "abcdefghijklmnopqrstuvwxyz"
        : type === "upper"
          ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
          : type === "numeric"
            ? "0123456789"
            : "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public static isValidString(value: any): boolean {
    return typeof value === "string" && value.length > 0;
  }

  public static isValidNumber(value: any): boolean {
    return typeof value === "number" && !isNaN(value);
  }

  public static isValidBoolean(value: any): boolean {
    return typeof value === "boolean";
  }

  //is not empty
  public static isNotEmpty(value: any): boolean {
    return (
      value !== null &&
      value !== undefined &&
      value !== "" &&
      !(Array.isArray(value) && value.length === 0) &&
      !(typeof value === "object" && Object.keys(value).length === 0)
    );
  }

  public static toNumber(value: any): number {
    return Number(value);
  }

  //safety convert to number
  public static toSafeNumber(value: any): number {
    if (this.isNotEmpty(value)) {
      return Number(value);
    }
    return 0;
  }

  //safety convert to string
  public static toSafeString(value: any): string {
    if (this.isNotEmpty(value)) {
      return value.toString();
    }
    return "";
  }

  public static toSafeObject(value: any): any {
    if (this.isNotEmpty(value)) {
      return value;
    }
    return {};
  }

  //safety convert to boolean
  public static toBooleanSafe(value: any): boolean {
    if (this.isNotEmpty(value)) {
      return value.toString() === "true";
    }
    return false;
  }

  public static findMax(array: number[]): number {
    return Math.max.apply(null, array);
  }

  public static findMin(array: number[]): number {
    return Math.min.apply(null, array);
  }

  public static findAverage(array: number[]): number {
    let sum = 0;
    for (const value of array) {
      sum += value;
    }
    return sum / array.length;
  }

  public static findMedian(array: number[]): number {
    const sorted = array.sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0
      ? sorted[mid]
      : (sorted[mid - 1] + sorted[mid]) / 2;
  }

  public static isEmpty(value: any): boolean {
    return (
      value === null ||
      value === "null" ||
      value === undefined ||
      value === "undefined" ||
      value === "" ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === "object" && Object.keys(value).length === 0)
    );
  }

  //to safe array
  public static toSafeArray(value: any): any[] {
    if (this.isNotEmpty(value)) {
      return value;
    }
    return [];
  }

  public static toCleanArray<T = any>(array: T[]): T[] {
    return array.filter((x) => this.isNotEmpty(x));
  }

  public static clearObjectValues(obj: { [key: string]: any }): any {
    if (this.isValidObject(obj)) {
      Object.keys(obj).forEach((key) => {
        obj[key] = null;
      });
    }
    return obj;
  }

  public static toCleanObject<T extends Record<string, any>>(obj: T): T {
    if (this.isValidObject(obj)) {
      Object.keys(obj).forEach((key) => {
        if (this.isEmpty(obj[key])) {
          delete obj[key];
        }
      });
    }
    return this.toSafeObject(obj);
  }

  public static toQueryString(params: any): string {
    if (this.isValidObject(params)) {
      return Object.keys(params)
        .map((key) => {
          return key + "=" + params[key];
        })
        .join("&");
    }
    return "";
  }

  // get month end date from date
  public static getMonthEndDate = (date: Date | Dayjs = new Date()): Date => {
    return dayjs(date).endOf("month").toDate();
  };
}
