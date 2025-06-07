/**
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2025 Adobe All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains the property of Adobe and its suppliers, if any. The
 * intellectual and technical concepts contained herein are proprietary to Adobe and its suppliers and are protected by
 * all applicable intellectual property laws, including trade secret and copyright laws. Dissemination of this
 * information or reproduction of this material is strictly forbidden unless prior written permission is obtained from
 * Adobe.
 */

import { Logger } from './types';

/** Console implementation of the Logger interface */
export const consoleLogger: Logger = {
  // eslint-disable-next-line no-console
  debug: console.debug,
  // eslint-disable-next-line no-console
  info: console.info,
  // eslint-disable-next-line no-console
  warn: console.warn,
  // eslint-disable-next-line no-console
  error: console.error,
};
