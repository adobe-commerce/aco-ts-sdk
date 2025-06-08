/**
 * Copyright 2025 Adobe. All Rights Reserved.
 *
 * This file is licensed to you under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS OF ANY KIND, either express or implied. See the License for
 * the specific language governing permissions and limitations under the License.
 */

import { Logger, LogLevel } from './types';

/**
 * Console implementation of the Logger interface that supports log level filtering.
 *
 * @example
 *   // Show info and above (default behavior)
 *   const logger = consoleLogger();
 *
 *   // Show all logs including debug
 *   const logger = consoleLogger(LogLevel.DEBUG);
 *
 *   // Show only errors
 *   const logger = consoleLogger(LogLevel.ERROR);
 *
 * @param level - The minimum log level to display. Defaults to LogLevel.INFO.
 */
export function consoleLogger(level: LogLevel = LogLevel.INFO): Logger {
  return {
    debug: (message: string, ...args: unknown[]): void => {
      if (level <= LogLevel.DEBUG) {
        // eslint-disable-next-line no-console
        console.debug(message, ...args);
      }
    },
    info: (message: string, ...args: unknown[]): void => {
      if (level <= LogLevel.INFO) {
        // eslint-disable-next-line no-console
        console.info(message, ...args);
      }
    },
    warn: (message: string, ...args: unknown[]): void => {
      if (level <= LogLevel.WARN) {
        // eslint-disable-next-line no-console
        console.warn(message, ...args);
      }
    },
    error: (message: string, ...args: unknown[]): void => {
      if (level <= LogLevel.ERROR) {
        // eslint-disable-next-line no-console
        console.error(message, ...args);
      }
    },
  };
}
