export class RestResource<T> {
  /**
   * Response metadata
   */
  metadata: RestMetadata;

  /**
   * Response data
   */
  response: T;

  constructor(metadata: RestMetadata, response: T) {
    this.metadata = metadata;
    this.response = response;
  }
}

export class RestMetadata {
  code: number;
  message: string;
  type: string;
  total: number;

  constructor(code: number, message: string, type: string, total: number) {
    this.code = code;
    this.message = message;
    this.type = type;
    this.total = total;
  }
}
