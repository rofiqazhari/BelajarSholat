export class RestResource<T> {
  /**
   * Response metadata
   */
  metadata: RestMetadata;

  /**
   * Response data
   */
  response: T;

  /**
   * Check if response is successfull
   */
  get isSuccess(): boolean {
    return this.metadata.type === "success";
  }

  constructor(metadata: RestMetadata, response: T) {
    this.metadata = metadata;
    this.response = response;
  }
}

export class RestMetadata {
  /**
   * Response HTTP Code
   */
  code: number;

  /**
   * Response message
   */
  message: string;

  /**
   * Vuetify color code [success, info, warning, error]
   */
  type: string;

  /**
   * Unix timestamp in UTC
   */
  timestamp: number;

  /**
   * Total data count, used in pagination response, otherwise undefined
   */
  total?: number;

  constructor(code: number, message: string, type: string, timestamp: number, total?: number) {
    this.code = code;
    this.message = message;
    this.type = type;
    this.timestamp = timestamp;
    this.total = total;
  }
}

export class RestException extends Error {
  /**
   * Response metadata
   */
  metadata: RestMetadata;

  constructor(metadata: RestMetadata) {
    super(metadata.message);
    this.metadata = metadata;
  }
}
