export interface NormalizedException {
  message: string;
  code: string;
  correlationId: string;
  stack?: string;
  cause?: string;
  /**
   * ^ Consider adding optional `metadata` object to
   * exceptions (if language doesn't support anything
   * similar by default) and pass some useful technical
   * information about the exception when throwing.
   * This will make debugging easier.
   */
  metadata?: Record<string, any>;
}

export abstract class ExceptionBase extends Error {
  abstract code: string;
  readonly correlationId: string;

  /**
   * @param {string} exMessage
   * @param {ObjectLiteral} [metadata={}]
   * **BE CAREFUL** not to include sensitive info in 'metadata'
   * to prevent leaks since all exception's data will end up
   * in application's log files. Only include non-sensitive
   * info that may help with debugging.
   */
  constructor(
    readonly exMessage: string,
    readonly metadata?: Record<string, any>,
  ) {
    super(exMessage);
    this.correlationId = metadata?.requestId;
  }

  toJSON(): NormalizedException {
    return {
      message: this.exMessage,
      code: this.code,
      stack: this.stack,
      correlationId: this.correlationId,
      cause: JSON.stringify(this.cause),
      metadata: this.metadata,
    };
  }
}
