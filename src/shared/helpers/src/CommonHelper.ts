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
}
