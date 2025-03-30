export class CommonHelper {

  public static createQueryString<T extends Record<string, any>>(
    params: T
  ): string {
    return Object.entries(params)
      .filter(
        ([_, value]) => value !== undefined && value !== null && value !== ''
      )
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&');
  }

  public static exceptionHandling(param: any) {
    let errorMessage = 'We encoutered an issue, please try again';

    if (param.error) {
      if (param.resason) {
        errorMessage = param.resason;
      } else if (param.error.message) {
        errorMessage = param.error.message;
      } else {
        errorMessage =
          'An issue occurred while making your request. Please try again';
      }
    }

    return errorMessage;
  }
}
