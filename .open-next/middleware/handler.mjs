
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "4.0.1";globalThis.nextVersion = "16.2.6";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseCookie = parseCookie;
    exports.parse = parseCookie;
    exports.stringifyCookie = stringifyCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    exports.parseSetCookie = parseSetCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var maxAgeRegExp = /^-?\d+$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parseCookie(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = eqIndex(str, index, len);
        if (eqIdx === -1)
          break;
        const endIdx = endIndex(str, index, len);
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const key = valueSlice(str, index, eqIdx);
        if (obj[key] === void 0) {
          obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function stringifyCookie(cookie, options) {
      const enc = options?.encode || encodeURIComponent;
      const cookieStrings = [];
      for (const name of Object.keys(cookie)) {
        const val = cookie[name];
        if (val === void 0)
          continue;
        if (!cookieNameRegExp.test(name)) {
          throw new TypeError(`cookie name is invalid: ${name}`);
        }
        const value = enc(val);
        if (!cookieValueRegExp.test(value)) {
          throw new TypeError(`cookie val is invalid: ${val}`);
        }
        cookieStrings.push(`${name}=${value}`);
      }
      return cookieStrings.join("; ");
    }
    function stringifySetCookie(_name, _val, _opts) {
      const cookie = typeof _name === "object" ? _name : { ..._opts, name: _name, value: String(_val) };
      const options = typeof _val === "object" ? _val : _opts;
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(cookie.name)) {
        throw new TypeError(`argument name is invalid: ${cookie.name}`);
      }
      const value = cookie.value ? enc(cookie.value) : "";
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${cookie.value}`);
      }
      let str = cookie.name + "=" + value;
      if (cookie.maxAge !== void 0) {
        if (!Number.isInteger(cookie.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
        }
        str += "; Max-Age=" + cookie.maxAge;
      }
      if (cookie.domain) {
        if (!domainValueRegExp.test(cookie.domain)) {
          throw new TypeError(`option domain is invalid: ${cookie.domain}`);
        }
        str += "; Domain=" + cookie.domain;
      }
      if (cookie.path) {
        if (!pathValueRegExp.test(cookie.path)) {
          throw new TypeError(`option path is invalid: ${cookie.path}`);
        }
        str += "; Path=" + cookie.path;
      }
      if (cookie.expires) {
        if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${cookie.expires}`);
        }
        str += "; Expires=" + cookie.expires.toUTCString();
      }
      if (cookie.httpOnly) {
        str += "; HttpOnly";
      }
      if (cookie.secure) {
        str += "; Secure";
      }
      if (cookie.partitioned) {
        str += "; Partitioned";
      }
      if (cookie.priority) {
        const priority = typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${cookie.priority}`);
        }
      }
      if (cookie.sameSite) {
        const sameSite = typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
        }
      }
      return str;
    }
    function parseSetCookie(str, options) {
      const dec = options?.decode || decode;
      const len = str.length;
      const endIdx = endIndex(str, 0, len);
      const eqIdx = eqIndex(str, 0, endIdx);
      const setCookie = eqIdx === -1 ? { name: "", value: dec(valueSlice(str, 0, endIdx)) } : {
        name: valueSlice(str, 0, eqIdx),
        value: dec(valueSlice(str, eqIdx + 1, endIdx))
      };
      let index = endIdx + 1;
      while (index < len) {
        const endIdx2 = endIndex(str, index, len);
        const eqIdx2 = eqIndex(str, index, endIdx2);
        const attr = eqIdx2 === -1 ? valueSlice(str, index, endIdx2) : valueSlice(str, index, eqIdx2);
        const val = eqIdx2 === -1 ? void 0 : valueSlice(str, eqIdx2 + 1, endIdx2);
        switch (attr.toLowerCase()) {
          case "httponly":
            setCookie.httpOnly = true;
            break;
          case "secure":
            setCookie.secure = true;
            break;
          case "partitioned":
            setCookie.partitioned = true;
            break;
          case "domain":
            setCookie.domain = val;
            break;
          case "path":
            setCookie.path = val;
            break;
          case "max-age":
            if (val && maxAgeRegExp.test(val))
              setCookie.maxAge = Number(val);
            break;
          case "expires":
            if (!val)
              break;
            const date = new Date(val);
            if (Number.isFinite(date.valueOf()))
              setCookie.expires = date;
            break;
          case "priority":
            if (!val)
              break;
            const priority = val.toLowerCase();
            if (priority === "low" || priority === "medium" || priority === "high") {
              setCookie.priority = priority;
            }
            break;
          case "samesite":
            if (!val)
              break;
            const sameSite = val.toLowerCase();
            if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
              setCookie.sameSite = sameSite;
            }
            break;
        }
        index = endIdx2 + 1;
      }
      return setCookie;
    }
    function endIndex(str, min, len) {
      const index = str.indexOf(";", min);
      return index === -1 ? len : index;
    }
    function eqIndex(str, min, max) {
      const index = str.indexOf("=", min);
      return index < max ? index : -1;
    }
    function valueSlice(str, min, max) {
      let start = min;
      let end = max;
      do {
        const code = str.charCodeAt(start);
        if (code !== 32 && code !== 9)
          break;
      } while (++start < end);
      while (end > start) {
        const code = str.charCodeAt(end - 1);
        if (code !== 32 && code !== 9)
          break;
        end--;
      }
      return str.slice(start, end);
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
    init_logger();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const body = shouldHaveBody ? Buffer2.from(await event.arrayBuffer()) : void 0;
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
function initializeOnce() {
  if (initialized)
    return;
  cachedOrigins = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
  const functions = globalThis.openNextConfig.functions ?? {};
  for (const key in functions) {
    if (key !== "default") {
      const value = functions[key];
      const regexes = [];
      for (const pattern of value.patterns) {
        const regexPattern = `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`;
        regexes.push(new RegExp(regexPattern));
      }
      cachedPatterns.push({
        key,
        patterns: value.patterns,
        regexes
      });
    }
  }
  initialized = true;
}
var cachedOrigins, cachedPatterns, initialized, envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    cachedPatterns = [];
    initialized = false;
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          initializeOnce();
          for (const { key, patterns, regexes } of cachedPatterns) {
            for (const regex of regexes) {
              if (regex.test(_path)) {
                debug("Using origin", key, patterns);
                return cachedOrigins[key];
              }
            }
          }
          if (_path.startsWith("/_next/image") && cachedOrigins.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return cachedOrigins.imageOptimizer;
          }
          if (cachedOrigins.default) {
            debug("Using default origin", cachedOrigins.default, _path);
            return cachedOrigins.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { ReadableStream as ReadableStream2 } from "node:stream/web";
function toReadableStream(value, isBase64) {
  return new ReadableStream2({
    pull(controller) {
      controller.enqueue(Buffer.from(value, isBase64 ? "base64" : "utf8"));
      controller.close();
    }
  }, { highWaterMark: 0 });
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return new ReadableStream2({
      pull(controller) {
        maybeSomethingBuffer ??= Buffer.from("SOMETHING");
        controller.enqueue(maybeSomethingBuffer);
        controller.close();
      }
    }, { highWaterMark: 0 });
  }
  return new ReadableStream2({
    start(controller) {
      controller.close();
    }
  });
}
var maybeSomethingBuffer;
var init_stream = __esm({
  "node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          const cur = responseHeaders[key];
          if (cur === void 0) {
            responseHeaders[key] = value;
          } else if (Array.isArray(cur)) {
            cur.push(value);
          } else {
            responseHeaders[key] = [cur, value];
          }
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// .next/server/edge/chunks/node_modules_0ch0kgf._.js
var require_node_modules_0ch0kgf = __commonJS({
  ".next/server/edge/chunks/node_modules_0ch0kgf._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/node_modules_0ch0kgf._.js", 6124, (e) => {
      "use strict";
      let t = Promise.resolve().then(() => e.i(25086));
      e.s(["default", 0, t]);
    }, 78965, (e) => {
      e.q("chunks/node_modules__prisma_client_query_compiler_fast_bg_0656eb_.wasm");
    }, 25086, (e) => e.a(async (t, s) => {
      try {
        e.s(["default", () => t2]);
        var a = e.i(78965);
        let t2 = await e.u(a.default, () => wasm_aab3702b0d04903290f192f33b07094a);
        s();
      } catch (e2) {
        s(e2);
      }
    }, true), 38022, (e, t, s) => {
      self._ENTRIES ||= {};
      let a = Promise.resolve().then(() => e.i(42738));
      a.catch(() => {
      }), self._ENTRIES.middleware_middleware = new Proxy(a, { get(e2, t2) {
        if ("then" === t2) return (t3, s3) => e2.then(t3, s3);
        let s2 = (...s3) => e2.then((e3) => (0, e3[t2])(...s3));
        return s2.then = (s3, a2) => e2.then((e3) => e3[t2]).then(s3, a2), s2;
      } });
    }]);
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// node-built-in-modules:node:util
var node_util_exports = {};
import * as node_util_star from "node:util";
var init_node_util = __esm({
  "node-built-in-modules:node:util"() {
    __reExport(node_util_exports, node_util_star);
  }
});

// node-built-in-modules:node:crypto
var node_crypto_exports = {};
import * as node_crypto_star from "node:crypto";
var init_node_crypto = __esm({
  "node-built-in-modules:node:crypto"() {
    __reExport(node_crypto_exports, node_crypto_star);
  }
});

// .next/server/edge/chunks/[root-of-the-server]__0bqxa8m._.js
var require_root_of_the_server_0bqxa8m = __commonJS({
  ".next/server/edge/chunks/[root-of-the-server]__0bqxa8m._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__0bqxa8m._.js", 74398, (e, t, r) => {
    }, 28042, (e, t, r) => {
      "use strict";
      var n = Object.defineProperty, i = Object.getOwnPropertyDescriptor, a = Object.getOwnPropertyNames, o = Object.prototype.hasOwnProperty, s = {}, l = { RequestCookies: () => g, ResponseCookies: () => A, parseCookie: () => d, parseSetCookie: () => h, stringifyCookie: () => c };
      for (var u in l) n(s, u, { get: l[u], enumerable: true });
      function c(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), n2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? n2 : `${n2}; ${r2.join("; ")}`;
      }
      function d(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2) continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [n2, i2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(n2, decodeURIComponent(null != i2 ? i2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function h(e2) {
        if (!e2) return;
        let [[t2, r2], ...n2] = d(e2), { domain: i2, expires: a2, httponly: o2, maxage: s2, path: l2, samesite: u2, secure: c2, partitioned: h2, priority: g2 } = Object.fromEntries(n2.map(([e3, t3]) => [e3.toLowerCase().replace(/-/g, ""), t3]));
        {
          var A2, m, y = { name: t2, value: decodeURIComponent(r2), domain: i2, ...a2 && { expires: new Date(a2) }, ...o2 && { httpOnly: true }, ..."string" == typeof s2 && { maxAge: Number(s2) }, path: l2, ...u2 && { sameSite: f.includes(A2 = (A2 = u2).toLowerCase()) ? A2 : void 0 }, ...c2 && { secure: true }, ...g2 && { priority: p.includes(m = (m = g2).toLowerCase()) ? m : void 0 }, ...h2 && { partitioned: true } };
          let e3 = {};
          for (let t3 in y) y[t3] && (e3[t3] = y[t3]);
          return e3;
        }
      }
      t.exports = ((e2, t2, r2, s2) => {
        if (t2 && "object" == typeof t2 || "function" == typeof t2) for (let l2 of a(t2)) o.call(e2, l2) || l2 === r2 || n(e2, l2, { get: () => t2[l2], enumerable: !(s2 = i(t2, l2)) || s2.enumerable });
        return e2;
      })(n({}, "__esModule", { value: true }), s);
      var f = ["strict", "lax", "none"], p = ["low", "medium", "high"], g = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          const t2 = e2.get("cookie");
          if (t2) for (const [e3, r2] of d(t2)) this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length) return r2.map(([e3, t3]) => t3);
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === n2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, n2 = this._parsed;
          return n2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(n2).map(([e3, t3]) => c(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => c(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, A = class {
        constructor(e2) {
          var t2, r2, n2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          const i2 = null != (n2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? n2 : [];
          for (const e3 of Array.isArray(i2) ? i2 : function(e4) {
            if (!e4) return [];
            var t3, r3, n3, i3, a2, o2 = [], s2 = 0;
            function l2() {
              for (; s2 < e4.length && /\s/.test(e4.charAt(s2)); ) s2 += 1;
              return s2 < e4.length;
            }
            for (; s2 < e4.length; ) {
              for (t3 = s2, a2 = false; l2(); ) if ("," === (r3 = e4.charAt(s2))) {
                for (n3 = s2, s2 += 1, l2(), i3 = s2; s2 < e4.length && "=" !== (r3 = e4.charAt(s2)) && ";" !== r3 && "," !== r3; ) s2 += 1;
                s2 < e4.length && "=" === e4.charAt(s2) ? (a2 = true, s2 = i3, o2.push(e4.substring(t3, n3)), t3 = s2) : s2 = n3 + 1;
              } else s2 += 1;
              (!a2 || s2 >= e4.length) && o2.push(e4.substring(t3, e4.length));
            }
            return o2;
          }(i2)) {
            const t3 = h(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length) return r2;
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === n2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, n2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, i2 = this._parsed;
          return i2.set(t2, function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          }({ name: t2, value: r2, ...n2 })), function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = c(r3);
              t3.append("set-cookie", e4);
            }
          }(i2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0]];
          return this.set({ ...r2, name: t2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(c).join("; ");
        }
      };
    }, 90044, (e) => {
      "use strict";
      let t = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", { value: "E504", enumerable: false, configurable: true });
      class r {
        disable() {
          throw t;
        }
        getStore() {
        }
        run() {
          throw t;
        }
        exit() {
          throw t;
        }
        enterWith() {
          throw t;
        }
        static bind(e2) {
          return e2;
        }
      }
      let n = "u" > typeof globalThis && globalThis.AsyncLocalStorage;
      e.s(["bindSnapshot", 0, function(e2) {
        return n ? n.bind(e2) : r.bind(e2);
      }, "createAsyncLocalStorage", 0, function() {
        return n ? new n() : new r();
      }, "createSnapshot", 0, function() {
        return n ? n.snapshot() : function(e2, ...t2) {
          return e2(...t2);
        };
      }]);
    }, 59110, (e, t, r) => {
      (() => {
        "use strict";
        let r2, n, i, a, o;
        var s, l, u, c, d, h, f, p, g, A, m, y, w, b, v, E, _ = { 491: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ContextAPI = void 0;
          let n2 = r3(223), i2 = r3(172), a2 = r3(930), o2 = "context", s2 = new n2.NoopContextManager();
          class l2 {
            static getInstance() {
              return this._instance || (this._instance = new l2()), this._instance;
            }
            setGlobalContextManager(e3) {
              return (0, i2.registerGlobal)(o2, e3, a2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(e3, t3, r4, ...n3) {
              return this._getContextManager().with(e3, t3, r4, ...n3);
            }
            bind(e3, t3) {
              return this._getContextManager().bind(e3, t3);
            }
            _getContextManager() {
              return (0, i2.getGlobal)(o2) || s2;
            }
            disable() {
              this._getContextManager().disable(), (0, i2.unregisterGlobal)(o2, a2.DiagAPI.instance());
            }
          }
          t2.ContextAPI = l2;
        }, 930: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagAPI = void 0;
          let n2 = r3(56), i2 = r3(912), a2 = r3(957), o2 = r3(172);
          class s2 {
            constructor() {
              function e3(e4) {
                return function(...t4) {
                  let r4 = (0, o2.getGlobal)("diag");
                  if (r4) return r4[e4](...t4);
                };
              }
              const t3 = this;
              t3.setLogger = (e4, r4 = { logLevel: a2.DiagLogLevel.INFO }) => {
                var n3, s3, l2;
                if (e4 === t3) {
                  let e5 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t3.error(null != (n3 = e5.stack) ? n3 : e5.message), false;
                }
                "number" == typeof r4 && (r4 = { logLevel: r4 });
                let u2 = (0, o2.getGlobal)("diag"), c2 = (0, i2.createLogLevelDiagLogger)(null != (s3 = r4.logLevel) ? s3 : a2.DiagLogLevel.INFO, e4);
                if (u2 && !r4.suppressOverrideMessage) {
                  let e5 = null != (l2 = Error().stack) ? l2 : "<failed to generate stacktrace>";
                  u2.warn(`Current logger will be overwritten from ${e5}`), c2.warn(`Current logger will overwrite one already registered from ${e5}`);
                }
                return (0, o2.registerGlobal)("diag", c2, t3, true);
              }, t3.disable = () => {
                (0, o2.unregisterGlobal)("diag", t3);
              }, t3.createComponentLogger = (e4) => new n2.DiagComponentLogger(e4), t3.verbose = e3("verbose"), t3.debug = e3("debug"), t3.info = e3("info"), t3.warn = e3("warn"), t3.error = e3("error");
            }
            static instance() {
              return this._instance || (this._instance = new s2()), this._instance;
            }
          }
          t2.DiagAPI = s2;
        }, 653: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.MetricsAPI = void 0;
          let n2 = r3(660), i2 = r3(172), a2 = r3(930), o2 = "metrics";
          class s2 {
            static getInstance() {
              return this._instance || (this._instance = new s2()), this._instance;
            }
            setGlobalMeterProvider(e3) {
              return (0, i2.registerGlobal)(o2, e3, a2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, i2.getGlobal)(o2) || n2.NOOP_METER_PROVIDER;
            }
            getMeter(e3, t3, r4) {
              return this.getMeterProvider().getMeter(e3, t3, r4);
            }
            disable() {
              (0, i2.unregisterGlobal)(o2, a2.DiagAPI.instance());
            }
          }
          t2.MetricsAPI = s2;
        }, 181: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.PropagationAPI = void 0;
          let n2 = r3(172), i2 = r3(874), a2 = r3(194), o2 = r3(277), s2 = r3(369), l2 = r3(930), u2 = "propagation", c2 = new i2.NoopTextMapPropagator();
          class d2 {
            constructor() {
              this.createBaggage = s2.createBaggage, this.getBaggage = o2.getBaggage, this.getActiveBaggage = o2.getActiveBaggage, this.setBaggage = o2.setBaggage, this.deleteBaggage = o2.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new d2()), this._instance;
            }
            setGlobalPropagator(e3) {
              return (0, n2.registerGlobal)(u2, e3, l2.DiagAPI.instance());
            }
            inject(e3, t3, r4 = a2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e3, t3, r4);
            }
            extract(e3, t3, r4 = a2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(e3, t3, r4);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, n2.unregisterGlobal)(u2, l2.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, n2.getGlobal)(u2) || c2;
            }
          }
          t2.PropagationAPI = d2;
        }, 997: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceAPI = void 0;
          let n2 = r3(172), i2 = r3(846), a2 = r3(139), o2 = r3(607), s2 = r3(930), l2 = "trace";
          class u2 {
            constructor() {
              this._proxyTracerProvider = new i2.ProxyTracerProvider(), this.wrapSpanContext = a2.wrapSpanContext, this.isSpanContextValid = a2.isSpanContextValid, this.deleteSpan = o2.deleteSpan, this.getSpan = o2.getSpan, this.getActiveSpan = o2.getActiveSpan, this.getSpanContext = o2.getSpanContext, this.setSpan = o2.setSpan, this.setSpanContext = o2.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new u2()), this._instance;
            }
            setGlobalTracerProvider(e3) {
              let t3 = (0, n2.registerGlobal)(l2, this._proxyTracerProvider, s2.DiagAPI.instance());
              return t3 && this._proxyTracerProvider.setDelegate(e3), t3;
            }
            getTracerProvider() {
              return (0, n2.getGlobal)(l2) || this._proxyTracerProvider;
            }
            getTracer(e3, t3) {
              return this.getTracerProvider().getTracer(e3, t3);
            }
            disable() {
              (0, n2.unregisterGlobal)(l2, s2.DiagAPI.instance()), this._proxyTracerProvider = new i2.ProxyTracerProvider();
            }
          }
          t2.TraceAPI = u2;
        }, 277: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.deleteBaggage = t2.setBaggage = t2.getActiveBaggage = t2.getBaggage = void 0;
          let n2 = r3(491), i2 = (0, r3(780).createContextKey)("OpenTelemetry Baggage Key");
          function a2(e3) {
            return e3.getValue(i2) || void 0;
          }
          t2.getBaggage = a2, t2.getActiveBaggage = function() {
            return a2(n2.ContextAPI.getInstance().active());
          }, t2.setBaggage = function(e3, t3) {
            return e3.setValue(i2, t3);
          }, t2.deleteBaggage = function(e3) {
            return e3.deleteValue(i2);
          };
        }, 993: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.BaggageImpl = void 0;
          class r3 {
            constructor(e3) {
              this._entries = e3 ? new Map(e3) : /* @__PURE__ */ new Map();
            }
            getEntry(e3) {
              let t3 = this._entries.get(e3);
              if (t3) return Object.assign({}, t3);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([e3, t3]) => [e3, t3]);
            }
            setEntry(e3, t3) {
              let n2 = new r3(this._entries);
              return n2._entries.set(e3, t3), n2;
            }
            removeEntry(e3) {
              let t3 = new r3(this._entries);
              return t3._entries.delete(e3), t3;
            }
            removeEntries(...e3) {
              let t3 = new r3(this._entries);
              for (let r4 of e3) t3._entries.delete(r4);
              return t3;
            }
            clear() {
              return new r3();
            }
          }
          t2.BaggageImpl = r3;
        }, 830: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataSymbol = void 0, t2.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        }, 369: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataFromString = t2.createBaggage = void 0;
          let n2 = r3(930), i2 = r3(993), a2 = r3(830), o2 = n2.DiagAPI.instance();
          t2.createBaggage = function(e3 = {}) {
            return new i2.BaggageImpl(new Map(Object.entries(e3)));
          }, t2.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (o2.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: a2.baggageEntryMetadataSymbol, toString: () => e3 };
          };
        }, 67: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.context = void 0, t2.context = r3(491).ContextAPI.getInstance();
        }, 223: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopContextManager = void 0;
          let n2 = r3(780);
          t2.NoopContextManager = class {
            active() {
              return n2.ROOT_CONTEXT;
            }
            with(e3, t3, r4, ...n3) {
              return t3.call(r4, ...n3);
            }
            bind(e3, t3) {
              return t3;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          };
        }, 780: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ROOT_CONTEXT = t2.createContextKey = void 0, t2.createContextKey = function(e3) {
            return Symbol.for(e3);
          };
          class r3 {
            constructor(e3) {
              const t3 = this;
              t3._currentContext = e3 ? new Map(e3) : /* @__PURE__ */ new Map(), t3.getValue = (e4) => t3._currentContext.get(e4), t3.setValue = (e4, n2) => {
                let i2 = new r3(t3._currentContext);
                return i2._currentContext.set(e4, n2), i2;
              }, t3.deleteValue = (e4) => {
                let n2 = new r3(t3._currentContext);
                return n2._currentContext.delete(e4), n2;
              };
            }
          }
          t2.ROOT_CONTEXT = new r3();
        }, 506: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.diag = void 0, t2.diag = r3(930).DiagAPI.instance();
        }, 56: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagComponentLogger = void 0;
          let n2 = r3(172);
          function i2(e3, t3, r4) {
            let i3 = (0, n2.getGlobal)("diag");
            if (i3) return r4.unshift(t3), i3[e3](...r4);
          }
          t2.DiagComponentLogger = class {
            constructor(e3) {
              this._namespace = e3.namespace || "DiagComponentLogger";
            }
            debug(...e3) {
              return i2("debug", this._namespace, e3);
            }
            error(...e3) {
              return i2("error", this._namespace, e3);
            }
            info(...e3) {
              return i2("info", this._namespace, e3);
            }
            warn(...e3) {
              return i2("warn", this._namespace, e3);
            }
            verbose(...e3) {
              return i2("verbose", this._namespace, e3);
            }
          };
        }, 972: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagConsoleLogger = void 0;
          let r3 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          t2.DiagConsoleLogger = class {
            constructor() {
              for (let e3 = 0; e3 < r3.length; e3++) this[r3[e3].n] = /* @__PURE__ */ function(e4) {
                return function(...t3) {
                  if (console) {
                    let r4 = console[e4];
                    if ("function" != typeof r4 && (r4 = console.log), "function" == typeof r4) return r4.apply(console, t3);
                  }
                };
              }(r3[e3].c);
            }
          };
        }, 912: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createLogLevelDiagLogger = void 0;
          let n2 = r3(957);
          t2.createLogLevelDiagLogger = function(e3, t3) {
            function r4(r5, n3) {
              let i2 = t3[r5];
              return "function" == typeof i2 && e3 >= n3 ? i2.bind(t3) : function() {
              };
            }
            return e3 < n2.DiagLogLevel.NONE ? e3 = n2.DiagLogLevel.NONE : e3 > n2.DiagLogLevel.ALL && (e3 = n2.DiagLogLevel.ALL), t3 = t3 || {}, { error: r4("error", n2.DiagLogLevel.ERROR), warn: r4("warn", n2.DiagLogLevel.WARN), info: r4("info", n2.DiagLogLevel.INFO), debug: r4("debug", n2.DiagLogLevel.DEBUG), verbose: r4("verbose", n2.DiagLogLevel.VERBOSE) };
          };
        }, 957: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagLogLevel = void 0, (r3 = t2.DiagLogLevel || (t2.DiagLogLevel = {}))[r3.NONE = 0] = "NONE", r3[r3.ERROR = 30] = "ERROR", r3[r3.WARN = 50] = "WARN", r3[r3.INFO = 60] = "INFO", r3[r3.DEBUG = 70] = "DEBUG", r3[r3.VERBOSE = 80] = "VERBOSE", r3[r3.ALL = 9999] = "ALL";
        }, 172: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.unregisterGlobal = t2.getGlobal = t2.registerGlobal = void 0;
          let n2 = r3(200), i2 = r3(521), a2 = r3(130), o2 = i2.VERSION.split(".")[0], s2 = Symbol.for(`opentelemetry.js.api.${o2}`), l2 = n2._globalThis;
          t2.registerGlobal = function(e3, t3, r4, n3 = false) {
            var a3;
            let o3 = l2[s2] = null != (a3 = l2[s2]) ? a3 : { version: i2.VERSION };
            if (!n3 && o3[e3]) {
              let t4 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r4.error(t4.stack || t4.message), false;
            }
            if (o3.version !== i2.VERSION) {
              let t4 = Error(`@opentelemetry/api: Registration of version v${o3.version} for ${e3} does not match previously registered API v${i2.VERSION}`);
              return r4.error(t4.stack || t4.message), false;
            }
            return o3[e3] = t3, r4.debug(`@opentelemetry/api: Registered a global for ${e3} v${i2.VERSION}.`), true;
          }, t2.getGlobal = function(e3) {
            var t3, r4;
            let n3 = null == (t3 = l2[s2]) ? void 0 : t3.version;
            if (n3 && (0, a2.isCompatible)(n3)) return null == (r4 = l2[s2]) ? void 0 : r4[e3];
          }, t2.unregisterGlobal = function(e3, t3) {
            t3.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${i2.VERSION}.`);
            let r4 = l2[s2];
            r4 && delete r4[e3];
          };
        }, 130: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.isCompatible = t2._makeCompatibilityCheck = void 0;
          let n2 = r3(521), i2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function a2(e3) {
            let t3 = /* @__PURE__ */ new Set([e3]), r4 = /* @__PURE__ */ new Set(), n3 = e3.match(i2);
            if (!n3) return () => false;
            let a3 = { major: +n3[1], minor: +n3[2], patch: +n3[3], prerelease: n3[4] };
            if (null != a3.prerelease) return function(t4) {
              return t4 === e3;
            };
            function o2(e4) {
              return r4.add(e4), false;
            }
            return function(e4) {
              if (t3.has(e4)) return true;
              if (r4.has(e4)) return false;
              let n4 = e4.match(i2);
              if (!n4) return o2(e4);
              let s2 = { major: +n4[1], minor: +n4[2], patch: +n4[3], prerelease: n4[4] };
              if (null != s2.prerelease || a3.major !== s2.major) return o2(e4);
              if (0 === a3.major) return a3.minor === s2.minor && a3.patch <= s2.patch ? (t3.add(e4), true) : o2(e4);
              return a3.minor <= s2.minor ? (t3.add(e4), true) : o2(e4);
            };
          }
          t2._makeCompatibilityCheck = a2, t2.isCompatible = a2(n2.VERSION);
        }, 886: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.metrics = void 0, t2.metrics = r3(653).MetricsAPI.getInstance();
        }, 901: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ValueType = void 0, (r3 = t2.ValueType || (t2.ValueType = {}))[r3.INT = 0] = "INT", r3[r3.DOUBLE = 1] = "DOUBLE";
        }, 102: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createNoopMeter = t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t2.NOOP_OBSERVABLE_GAUGE_METRIC = t2.NOOP_OBSERVABLE_COUNTER_METRIC = t2.NOOP_UP_DOWN_COUNTER_METRIC = t2.NOOP_HISTOGRAM_METRIC = t2.NOOP_COUNTER_METRIC = t2.NOOP_METER = t2.NoopObservableUpDownCounterMetric = t2.NoopObservableGaugeMetric = t2.NoopObservableCounterMetric = t2.NoopObservableMetric = t2.NoopHistogramMetric = t2.NoopUpDownCounterMetric = t2.NoopCounterMetric = t2.NoopMetric = t2.NoopMeter = void 0;
          class r3 {
            createHistogram(e3, r4) {
              return t2.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(e3, r4) {
              return t2.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(e3, r4) {
              return t2.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(e3, r4) {
              return t2.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(e3, t3) {
            }
            removeBatchObservableCallback(e3) {
            }
          }
          t2.NoopMeter = r3;
          class n2 {
          }
          t2.NoopMetric = n2;
          class i2 extends n2 {
            add(e3, t3) {
            }
          }
          t2.NoopCounterMetric = i2;
          class a2 extends n2 {
            add(e3, t3) {
            }
          }
          t2.NoopUpDownCounterMetric = a2;
          class o2 extends n2 {
            record(e3, t3) {
            }
          }
          t2.NoopHistogramMetric = o2;
          class s2 {
            addCallback(e3) {
            }
            removeCallback(e3) {
            }
          }
          t2.NoopObservableMetric = s2;
          class l2 extends s2 {
          }
          t2.NoopObservableCounterMetric = l2;
          class u2 extends s2 {
          }
          t2.NoopObservableGaugeMetric = u2;
          class c2 extends s2 {
          }
          t2.NoopObservableUpDownCounterMetric = c2, t2.NOOP_METER = new r3(), t2.NOOP_COUNTER_METRIC = new i2(), t2.NOOP_HISTOGRAM_METRIC = new o2(), t2.NOOP_UP_DOWN_COUNTER_METRIC = new a2(), t2.NOOP_OBSERVABLE_COUNTER_METRIC = new l2(), t2.NOOP_OBSERVABLE_GAUGE_METRIC = new u2(), t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new c2(), t2.createNoopMeter = function() {
            return t2.NOOP_METER;
          };
        }, 660: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NOOP_METER_PROVIDER = t2.NoopMeterProvider = void 0;
          let n2 = r3(102);
          class i2 {
            getMeter(e3, t3, r4) {
              return n2.NOOP_METER;
            }
          }
          t2.NoopMeterProvider = i2, t2.NOOP_METER_PROVIDER = new i2();
        }, 200: function(e2, t2, r3) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), e3[n3] = t3[r4];
          }), i2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || n2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), i2(r3(46), t2);
        }, 651: (t2, r3) => {
          Object.defineProperty(r3, "__esModule", { value: true }), r3._globalThis = void 0, r3._globalThis = "object" == typeof globalThis ? globalThis : e.g;
        }, 46: function(e2, t2, r3) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), e3[n3] = t3[r4];
          }), i2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || n2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), i2(r3(651), t2);
        }, 939: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.propagation = void 0, t2.propagation = r3(181).PropagationAPI.getInstance();
        }, 874: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTextMapPropagator = void 0, t2.NoopTextMapPropagator = class {
            inject(e3, t3) {
            }
            extract(e3, t3) {
              return e3;
            }
            fields() {
              return [];
            }
          };
        }, 194: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.defaultTextMapSetter = t2.defaultTextMapGetter = void 0, t2.defaultTextMapGetter = { get(e3, t3) {
            if (null != e3) return e3[t3];
          }, keys: (e3) => null == e3 ? [] : Object.keys(e3) }, t2.defaultTextMapSetter = { set(e3, t3, r3) {
            null != e3 && (e3[t3] = r3);
          } };
        }, 845: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.trace = void 0, t2.trace = r3(997).TraceAPI.getInstance();
        }, 403: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NonRecordingSpan = void 0;
          let n2 = r3(476);
          t2.NonRecordingSpan = class {
            constructor(e3 = n2.INVALID_SPAN_CONTEXT) {
              this._spanContext = e3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(e3, t3) {
              return this;
            }
            setAttributes(e3) {
              return this;
            }
            addEvent(e3, t3) {
              return this;
            }
            setStatus(e3) {
              return this;
            }
            updateName(e3) {
              return this;
            }
            end(e3) {
            }
            isRecording() {
              return false;
            }
            recordException(e3, t3) {
            }
          };
        }, 614: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracer = void 0;
          let n2 = r3(491), i2 = r3(607), a2 = r3(403), o2 = r3(139), s2 = n2.ContextAPI.getInstance();
          t2.NoopTracer = class {
            startSpan(e3, t3, r4 = s2.active()) {
              var n3;
              if (null == t3 ? void 0 : t3.root) return new a2.NonRecordingSpan();
              let l2 = r4 && (0, i2.getSpanContext)(r4);
              return "object" == typeof (n3 = l2) && "string" == typeof n3.spanId && "string" == typeof n3.traceId && "number" == typeof n3.traceFlags && (0, o2.isSpanContextValid)(l2) ? new a2.NonRecordingSpan(l2) : new a2.NonRecordingSpan();
            }
            startActiveSpan(e3, t3, r4, n3) {
              let a3, o3, l2;
              if (arguments.length < 2) return;
              2 == arguments.length ? l2 = t3 : 3 == arguments.length ? (a3 = t3, l2 = r4) : (a3 = t3, o3 = r4, l2 = n3);
              let u2 = null != o3 ? o3 : s2.active(), c2 = this.startSpan(e3, a3, u2), d2 = (0, i2.setSpan)(u2, c2);
              return s2.with(d2, l2, void 0, c2);
            }
          };
        }, 124: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracerProvider = void 0;
          let n2 = r3(614);
          t2.NoopTracerProvider = class {
            getTracer(e3, t3, r4) {
              return new n2.NoopTracer();
            }
          };
        }, 125: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracer = void 0;
          let n2 = new (r3(614)).NoopTracer();
          t2.ProxyTracer = class {
            constructor(e3, t3, r4, n3) {
              this._provider = e3, this.name = t3, this.version = r4, this.options = n3;
            }
            startSpan(e3, t3, r4) {
              return this._getTracer().startSpan(e3, t3, r4);
            }
            startActiveSpan(e3, t3, r4, n3) {
              let i2 = this._getTracer();
              return Reflect.apply(i2.startActiveSpan, i2, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return e3 ? (this._delegate = e3, this._delegate) : n2;
            }
          };
        }, 846: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracerProvider = void 0;
          let n2 = r3(125), i2 = new (r3(124)).NoopTracerProvider();
          t2.ProxyTracerProvider = class {
            getTracer(e3, t3, r4) {
              var i3;
              return null != (i3 = this.getDelegateTracer(e3, t3, r4)) ? i3 : new n2.ProxyTracer(this, e3, t3, r4);
            }
            getDelegate() {
              var e3;
              return null != (e3 = this._delegate) ? e3 : i2;
            }
            setDelegate(e3) {
              this._delegate = e3;
            }
            getDelegateTracer(e3, t3, r4) {
              var n3;
              return null == (n3 = this._delegate) ? void 0 : n3.getTracer(e3, t3, r4);
            }
          };
        }, 996: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SamplingDecision = void 0, (r3 = t2.SamplingDecision || (t2.SamplingDecision = {}))[r3.NOT_RECORD = 0] = "NOT_RECORD", r3[r3.RECORD = 1] = "RECORD", r3[r3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
        }, 607: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.getSpanContext = t2.setSpanContext = t2.deleteSpan = t2.setSpan = t2.getActiveSpan = t2.getSpan = void 0;
          let n2 = r3(780), i2 = r3(403), a2 = r3(491), o2 = (0, n2.createContextKey)("OpenTelemetry Context Key SPAN");
          function s2(e3) {
            return e3.getValue(o2) || void 0;
          }
          function l2(e3, t3) {
            return e3.setValue(o2, t3);
          }
          t2.getSpan = s2, t2.getActiveSpan = function() {
            return s2(a2.ContextAPI.getInstance().active());
          }, t2.setSpan = l2, t2.deleteSpan = function(e3) {
            return e3.deleteValue(o2);
          }, t2.setSpanContext = function(e3, t3) {
            return l2(e3, new i2.NonRecordingSpan(t3));
          }, t2.getSpanContext = function(e3) {
            var t3;
            return null == (t3 = s2(e3)) ? void 0 : t3.spanContext();
          };
        }, 325: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceStateImpl = void 0;
          let n2 = r3(564);
          class i2 {
            constructor(e3) {
              this._internalState = /* @__PURE__ */ new Map(), e3 && this._parse(e3);
            }
            set(e3, t3) {
              let r4 = this._clone();
              return r4._internalState.has(e3) && r4._internalState.delete(e3), r4._internalState.set(e3, t3), r4;
            }
            unset(e3) {
              let t3 = this._clone();
              return t3._internalState.delete(e3), t3;
            }
            get(e3) {
              return this._internalState.get(e3);
            }
            serialize() {
              return this._keys().reduce((e3, t3) => (e3.push(t3 + "=" + this.get(t3)), e3), []).join(",");
            }
            _parse(e3) {
              !(e3.length > 512) && (this._internalState = e3.split(",").reverse().reduce((e4, t3) => {
                let r4 = t3.trim(), i3 = r4.indexOf("=");
                if (-1 !== i3) {
                  let a2 = r4.slice(0, i3), o2 = r4.slice(i3 + 1, t3.length);
                  (0, n2.validateKey)(a2) && (0, n2.validateValue)(o2) && e4.set(a2, o2);
                }
                return e4;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let e3 = new i2();
              return e3._internalState = new Map(this._internalState), e3;
            }
          }
          t2.TraceStateImpl = i2;
        }, 564: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.validateValue = t2.validateKey = void 0;
          let r3 = "[_0-9a-z-*/]", n2 = `[a-z]${r3}{0,255}`, i2 = `[a-z0-9]${r3}{0,240}@[a-z]${r3}{0,13}`, a2 = RegExp(`^(?:${n2}|${i2})$`), o2 = /^[ -~]{0,255}[!-~]$/, s2 = /,|=/;
          t2.validateKey = function(e3) {
            return a2.test(e3);
          }, t2.validateValue = function(e3) {
            return o2.test(e3) && !s2.test(e3);
          };
        }, 98: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createTraceState = void 0;
          let n2 = r3(325);
          t2.createTraceState = function(e3) {
            return new n2.TraceStateImpl(e3);
          };
        }, 476: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.INVALID_SPAN_CONTEXT = t2.INVALID_TRACEID = t2.INVALID_SPANID = void 0;
          let n2 = r3(475);
          t2.INVALID_SPANID = "0000000000000000", t2.INVALID_TRACEID = "00000000000000000000000000000000", t2.INVALID_SPAN_CONTEXT = { traceId: t2.INVALID_TRACEID, spanId: t2.INVALID_SPANID, traceFlags: n2.TraceFlags.NONE };
        }, 357: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanKind = void 0, (r3 = t2.SpanKind || (t2.SpanKind = {}))[r3.INTERNAL = 0] = "INTERNAL", r3[r3.SERVER = 1] = "SERVER", r3[r3.CLIENT = 2] = "CLIENT", r3[r3.PRODUCER = 3] = "PRODUCER", r3[r3.CONSUMER = 4] = "CONSUMER";
        }, 139: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.wrapSpanContext = t2.isSpanContextValid = t2.isValidSpanId = t2.isValidTraceId = void 0;
          let n2 = r3(476), i2 = r3(403), a2 = /^([0-9a-f]{32})$/i, o2 = /^[0-9a-f]{16}$/i;
          function s2(e3) {
            return a2.test(e3) && e3 !== n2.INVALID_TRACEID;
          }
          function l2(e3) {
            return o2.test(e3) && e3 !== n2.INVALID_SPANID;
          }
          t2.isValidTraceId = s2, t2.isValidSpanId = l2, t2.isSpanContextValid = function(e3) {
            return s2(e3.traceId) && l2(e3.spanId);
          }, t2.wrapSpanContext = function(e3) {
            return new i2.NonRecordingSpan(e3);
          };
        }, 847: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanStatusCode = void 0, (r3 = t2.SpanStatusCode || (t2.SpanStatusCode = {}))[r3.UNSET = 0] = "UNSET", r3[r3.OK = 1] = "OK", r3[r3.ERROR = 2] = "ERROR";
        }, 475: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceFlags = void 0, (r3 = t2.TraceFlags || (t2.TraceFlags = {}))[r3.NONE = 0] = "NONE", r3[r3.SAMPLED = 1] = "SAMPLED";
        }, 521: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.VERSION = void 0, t2.VERSION = "1.6.0";
        } }, C = {};
        function x(e2) {
          var t2 = C[e2];
          if (void 0 !== t2) return t2.exports;
          var r3 = C[e2] = { exports: {} }, n2 = true;
          try {
            _[e2].call(r3.exports, r3, r3.exports, x), n2 = false;
          } finally {
            n2 && delete C[e2];
          }
          return r3.exports;
        }
        x.ab = "/ROOT/node_modules/next/dist/compiled/@opentelemetry/api/";
        var I = {};
        Object.defineProperty(I, "__esModule", { value: true }), I.trace = I.propagation = I.metrics = I.diag = I.context = I.INVALID_SPAN_CONTEXT = I.INVALID_TRACEID = I.INVALID_SPANID = I.isValidSpanId = I.isValidTraceId = I.isSpanContextValid = I.createTraceState = I.TraceFlags = I.SpanStatusCode = I.SpanKind = I.SamplingDecision = I.ProxyTracerProvider = I.ProxyTracer = I.defaultTextMapSetter = I.defaultTextMapGetter = I.ValueType = I.createNoopMeter = I.DiagLogLevel = I.DiagConsoleLogger = I.ROOT_CONTEXT = I.createContextKey = I.baggageEntryMetadataFromString = void 0, s = x(369), Object.defineProperty(I, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
          return s.baggageEntryMetadataFromString;
        } }), l = x(780), Object.defineProperty(I, "createContextKey", { enumerable: true, get: function() {
          return l.createContextKey;
        } }), Object.defineProperty(I, "ROOT_CONTEXT", { enumerable: true, get: function() {
          return l.ROOT_CONTEXT;
        } }), u = x(972), Object.defineProperty(I, "DiagConsoleLogger", { enumerable: true, get: function() {
          return u.DiagConsoleLogger;
        } }), c = x(957), Object.defineProperty(I, "DiagLogLevel", { enumerable: true, get: function() {
          return c.DiagLogLevel;
        } }), d = x(102), Object.defineProperty(I, "createNoopMeter", { enumerable: true, get: function() {
          return d.createNoopMeter;
        } }), h = x(901), Object.defineProperty(I, "ValueType", { enumerable: true, get: function() {
          return h.ValueType;
        } }), f = x(194), Object.defineProperty(I, "defaultTextMapGetter", { enumerable: true, get: function() {
          return f.defaultTextMapGetter;
        } }), Object.defineProperty(I, "defaultTextMapSetter", { enumerable: true, get: function() {
          return f.defaultTextMapSetter;
        } }), p = x(125), Object.defineProperty(I, "ProxyTracer", { enumerable: true, get: function() {
          return p.ProxyTracer;
        } }), g = x(846), Object.defineProperty(I, "ProxyTracerProvider", { enumerable: true, get: function() {
          return g.ProxyTracerProvider;
        } }), A = x(996), Object.defineProperty(I, "SamplingDecision", { enumerable: true, get: function() {
          return A.SamplingDecision;
        } }), m = x(357), Object.defineProperty(I, "SpanKind", { enumerable: true, get: function() {
          return m.SpanKind;
        } }), y = x(847), Object.defineProperty(I, "SpanStatusCode", { enumerable: true, get: function() {
          return y.SpanStatusCode;
        } }), w = x(475), Object.defineProperty(I, "TraceFlags", { enumerable: true, get: function() {
          return w.TraceFlags;
        } }), b = x(98), Object.defineProperty(I, "createTraceState", { enumerable: true, get: function() {
          return b.createTraceState;
        } }), v = x(139), Object.defineProperty(I, "isSpanContextValid", { enumerable: true, get: function() {
          return v.isSpanContextValid;
        } }), Object.defineProperty(I, "isValidTraceId", { enumerable: true, get: function() {
          return v.isValidTraceId;
        } }), Object.defineProperty(I, "isValidSpanId", { enumerable: true, get: function() {
          return v.isValidSpanId;
        } }), E = x(476), Object.defineProperty(I, "INVALID_SPANID", { enumerable: true, get: function() {
          return E.INVALID_SPANID;
        } }), Object.defineProperty(I, "INVALID_TRACEID", { enumerable: true, get: function() {
          return E.INVALID_TRACEID;
        } }), Object.defineProperty(I, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
          return E.INVALID_SPAN_CONTEXT;
        } }), r2 = x(67), Object.defineProperty(I, "context", { enumerable: true, get: function() {
          return r2.context;
        } }), n = x(506), Object.defineProperty(I, "diag", { enumerable: true, get: function() {
          return n.diag;
        } }), i = x(886), Object.defineProperty(I, "metrics", { enumerable: true, get: function() {
          return i.metrics;
        } }), a = x(939), Object.defineProperty(I, "propagation", { enumerable: true, get: function() {
          return a.propagation;
        } }), o = x(845), Object.defineProperty(I, "trace", { enumerable: true, get: function() {
          return o.trace;
        } }), I.default = { context: r2.context, diag: n.diag, metrics: i.metrics, propagation: a.propagation, trace: o.trace }, t.exports = I;
      })();
    }, 71498, (e, t, r) => {
      (() => {
        "use strict";
        "u" > typeof __nccwpck_require__ && (__nccwpck_require__.ab = "/ROOT/node_modules/next/dist/compiled/cookie/");
        var e2, r2, n, i, a = {};
        a.parse = function(t2, r3) {
          if ("string" != typeof t2) throw TypeError("argument str must be a string");
          for (var i2 = {}, a2 = t2.split(n), o = (r3 || {}).decode || e2, s = 0; s < a2.length; s++) {
            var l = a2[s], u = l.indexOf("=");
            if (!(u < 0)) {
              var c = l.substr(0, u).trim(), d = l.substr(++u, l.length).trim();
              '"' == d[0] && (d = d.slice(1, -1)), void 0 == i2[c] && (i2[c] = function(e3, t3) {
                try {
                  return t3(e3);
                } catch (t4) {
                  return e3;
                }
              }(d, o));
            }
          }
          return i2;
        }, a.serialize = function(e3, t2, n2) {
          var a2 = n2 || {}, o = a2.encode || r2;
          if ("function" != typeof o) throw TypeError("option encode is invalid");
          if (!i.test(e3)) throw TypeError("argument name is invalid");
          var s = o(t2);
          if (s && !i.test(s)) throw TypeError("argument val is invalid");
          var l = e3 + "=" + s;
          if (null != a2.maxAge) {
            var u = a2.maxAge - 0;
            if (isNaN(u) || !isFinite(u)) throw TypeError("option maxAge is invalid");
            l += "; Max-Age=" + Math.floor(u);
          }
          if (a2.domain) {
            if (!i.test(a2.domain)) throw TypeError("option domain is invalid");
            l += "; Domain=" + a2.domain;
          }
          if (a2.path) {
            if (!i.test(a2.path)) throw TypeError("option path is invalid");
            l += "; Path=" + a2.path;
          }
          if (a2.expires) {
            if ("function" != typeof a2.expires.toUTCString) throw TypeError("option expires is invalid");
            l += "; Expires=" + a2.expires.toUTCString();
          }
          if (a2.httpOnly && (l += "; HttpOnly"), a2.secure && (l += "; Secure"), a2.sameSite) switch ("string" == typeof a2.sameSite ? a2.sameSite.toLowerCase() : a2.sameSite) {
            case true:
            case "strict":
              l += "; SameSite=Strict";
              break;
            case "lax":
              l += "; SameSite=Lax";
              break;
            case "none":
              l += "; SameSite=None";
              break;
            default:
              throw TypeError("option sameSite is invalid");
          }
          return l;
        }, e2 = decodeURIComponent, r2 = encodeURIComponent, n = /; */, i = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/, t.exports = a;
      })();
    }, 99734, (e, t, r) => {
      (() => {
        "use strict";
        let e2, r2, n, i, a;
        var o = { 993: (e3) => {
          var t2 = Object.prototype.hasOwnProperty, r3 = "~";
          function n2() {
          }
          function i2(e4, t3, r4) {
            this.fn = e4, this.context = t3, this.once = r4 || false;
          }
          function a2(e4, t3, n3, a3, o3) {
            if ("function" != typeof n3) throw TypeError("The listener must be a function");
            var s3 = new i2(n3, a3 || e4, o3), l2 = r3 ? r3 + t3 : t3;
            return e4._events[l2] ? e4._events[l2].fn ? e4._events[l2] = [e4._events[l2], s3] : e4._events[l2].push(s3) : (e4._events[l2] = s3, e4._eventsCount++), e4;
          }
          function o2(e4, t3) {
            0 == --e4._eventsCount ? e4._events = new n2() : delete e4._events[t3];
          }
          function s2() {
            this._events = new n2(), this._eventsCount = 0;
          }
          Object.create && (n2.prototype = /* @__PURE__ */ Object.create(null), new n2().__proto__ || (r3 = false)), s2.prototype.eventNames = function() {
            var e4, n3, i3 = [];
            if (0 === this._eventsCount) return i3;
            for (n3 in e4 = this._events) t2.call(e4, n3) && i3.push(r3 ? n3.slice(1) : n3);
            return Object.getOwnPropertySymbols ? i3.concat(Object.getOwnPropertySymbols(e4)) : i3;
          }, s2.prototype.listeners = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, n3 = this._events[t3];
            if (!n3) return [];
            if (n3.fn) return [n3.fn];
            for (var i3 = 0, a3 = n3.length, o3 = Array(a3); i3 < a3; i3++) o3[i3] = n3[i3].fn;
            return o3;
          }, s2.prototype.listenerCount = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, n3 = this._events[t3];
            return n3 ? n3.fn ? 1 : n3.length : 0;
          }, s2.prototype.emit = function(e4, t3, n3, i3, a3, o3) {
            var s3 = r3 ? r3 + e4 : e4;
            if (!this._events[s3]) return false;
            var l2, u2, c = this._events[s3], d = arguments.length;
            if (c.fn) {
              switch (c.once && this.removeListener(e4, c.fn, void 0, true), d) {
                case 1:
                  return c.fn.call(c.context), true;
                case 2:
                  return c.fn.call(c.context, t3), true;
                case 3:
                  return c.fn.call(c.context, t3, n3), true;
                case 4:
                  return c.fn.call(c.context, t3, n3, i3), true;
                case 5:
                  return c.fn.call(c.context, t3, n3, i3, a3), true;
                case 6:
                  return c.fn.call(c.context, t3, n3, i3, a3, o3), true;
              }
              for (u2 = 1, l2 = Array(d - 1); u2 < d; u2++) l2[u2 - 1] = arguments[u2];
              c.fn.apply(c.context, l2);
            } else {
              var h, f = c.length;
              for (u2 = 0; u2 < f; u2++) switch (c[u2].once && this.removeListener(e4, c[u2].fn, void 0, true), d) {
                case 1:
                  c[u2].fn.call(c[u2].context);
                  break;
                case 2:
                  c[u2].fn.call(c[u2].context, t3);
                  break;
                case 3:
                  c[u2].fn.call(c[u2].context, t3, n3);
                  break;
                case 4:
                  c[u2].fn.call(c[u2].context, t3, n3, i3);
                  break;
                default:
                  if (!l2) for (h = 1, l2 = Array(d - 1); h < d; h++) l2[h - 1] = arguments[h];
                  c[u2].fn.apply(c[u2].context, l2);
              }
            }
            return true;
          }, s2.prototype.on = function(e4, t3, r4) {
            return a2(this, e4, t3, r4, false);
          }, s2.prototype.once = function(e4, t3, r4) {
            return a2(this, e4, t3, r4, true);
          }, s2.prototype.removeListener = function(e4, t3, n3, i3) {
            var a3 = r3 ? r3 + e4 : e4;
            if (!this._events[a3]) return this;
            if (!t3) return o2(this, a3), this;
            var s3 = this._events[a3];
            if (s3.fn) s3.fn !== t3 || i3 && !s3.once || n3 && s3.context !== n3 || o2(this, a3);
            else {
              for (var l2 = 0, u2 = [], c = s3.length; l2 < c; l2++) (s3[l2].fn !== t3 || i3 && !s3[l2].once || n3 && s3[l2].context !== n3) && u2.push(s3[l2]);
              u2.length ? this._events[a3] = 1 === u2.length ? u2[0] : u2 : o2(this, a3);
            }
            return this;
          }, s2.prototype.removeAllListeners = function(e4) {
            var t3;
            return e4 ? (t3 = r3 ? r3 + e4 : e4, this._events[t3] && o2(this, t3)) : (this._events = new n2(), this._eventsCount = 0), this;
          }, s2.prototype.off = s2.prototype.removeListener, s2.prototype.addListener = s2.prototype.on, s2.prefixed = r3, s2.EventEmitter = s2, e3.exports = s2;
        }, 213: (e3) => {
          e3.exports = (e4, t2) => (t2 = t2 || (() => {
          }), e4.then((e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => e5), (e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => {
            throw e5;
          })));
        }, 574: (e3, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = function(e4, t3, r3) {
            let n2 = 0, i2 = e4.length;
            for (; i2 > 0; ) {
              let a2 = i2 / 2 | 0, o2 = n2 + a2;
              0 >= r3(e4[o2], t3) ? (n2 = ++o2, i2 -= a2 + 1) : i2 = a2;
            }
            return n2;
          };
        }, 821: (e3, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true });
          let n2 = r3(574);
          t2.default = class {
            constructor() {
              this._queue = [];
            }
            enqueue(e4, t3) {
              let r4 = { priority: (t3 = Object.assign({ priority: 0 }, t3)).priority, run: e4 };
              if (this.size && this._queue[this.size - 1].priority >= t3.priority) return void this._queue.push(r4);
              let i2 = n2.default(this._queue, r4, (e5, t4) => t4.priority - e5.priority);
              this._queue.splice(i2, 0, r4);
            }
            dequeue() {
              let e4 = this._queue.shift();
              return null == e4 ? void 0 : e4.run;
            }
            filter(e4) {
              return this._queue.filter((t3) => t3.priority === e4.priority).map((e5) => e5.run);
            }
            get size() {
              return this._queue.length;
            }
          };
        }, 816: (e3, t2, r3) => {
          let n2 = r3(213);
          class i2 extends Error {
            constructor(e4) {
              super(e4), this.name = "TimeoutError";
            }
          }
          let a2 = (e4, t3, r4) => new Promise((a3, o2) => {
            if ("number" != typeof t3 || t3 < 0) throw TypeError("Expected `milliseconds` to be a positive number");
            if (t3 === 1 / 0) return void a3(e4);
            let s2 = setTimeout(() => {
              if ("function" == typeof r4) {
                try {
                  a3(r4());
                } catch (e5) {
                  o2(e5);
                }
                return;
              }
              let n3 = "string" == typeof r4 ? r4 : `Promise timed out after ${t3} milliseconds`, s3 = r4 instanceof Error ? r4 : new i2(n3);
              "function" == typeof e4.cancel && e4.cancel(), o2(s3);
            }, t3);
            n2(e4.then(a3, o2), () => {
              clearTimeout(s2);
            });
          });
          e3.exports = a2, e3.exports.default = a2, e3.exports.TimeoutError = i2;
        } }, s = {};
        function l(e3) {
          var t2 = s[e3];
          if (void 0 !== t2) return t2.exports;
          var r3 = s[e3] = { exports: {} }, n2 = true;
          try {
            o[e3](r3, r3.exports, l), n2 = false;
          } finally {
            n2 && delete s[e3];
          }
          return r3.exports;
        }
        l.ab = "/ROOT/node_modules/next/dist/compiled/p-queue/";
        var u = {};
        Object.defineProperty(u, "__esModule", { value: true }), e2 = l(993), r2 = l(816), n = l(821), i = () => {
        }, a = new r2.TimeoutError(), u.default = class extends e2 {
          constructor(e3) {
            var t2, r3, a2, o2;
            if (super(), this._intervalCount = 0, this._intervalEnd = 0, this._pendingCount = 0, this._resolveEmpty = i, this._resolveIdle = i, !("number" == typeof (e3 = Object.assign({ carryoverConcurrencyCount: false, intervalCap: 1 / 0, interval: 0, concurrency: 1 / 0, autoStart: true, queueClass: n.default }, e3)).intervalCap && e3.intervalCap >= 1)) throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${null != (r3 = null == (t2 = e3.intervalCap) ? void 0 : t2.toString()) ? r3 : ""}\` (${typeof e3.intervalCap})`);
            if (void 0 === e3.interval || !(Number.isFinite(e3.interval) && e3.interval >= 0)) throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${null != (o2 = null == (a2 = e3.interval) ? void 0 : a2.toString()) ? o2 : ""}\` (${typeof e3.interval})`);
            this._carryoverConcurrencyCount = e3.carryoverConcurrencyCount, this._isIntervalIgnored = e3.intervalCap === 1 / 0 || 0 === e3.interval, this._intervalCap = e3.intervalCap, this._interval = e3.interval, this._queue = new e3.queueClass(), this._queueClass = e3.queueClass, this.concurrency = e3.concurrency, this._timeout = e3.timeout, this._throwOnTimeout = true === e3.throwOnTimeout, this._isPaused = false === e3.autoStart;
          }
          get _doesIntervalAllowAnother() {
            return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
          }
          get _doesConcurrentAllowAnother() {
            return this._pendingCount < this._concurrency;
          }
          _next() {
            this._pendingCount--, this._tryToStartAnother(), this.emit("next");
          }
          _resolvePromises() {
            this._resolveEmpty(), this._resolveEmpty = i, 0 === this._pendingCount && (this._resolveIdle(), this._resolveIdle = i, this.emit("idle"));
          }
          _onResumeInterval() {
            this._onInterval(), this._initializeIntervalIfNeeded(), this._timeoutId = void 0;
          }
          _isIntervalPaused() {
            let e3 = Date.now();
            if (void 0 === this._intervalId) {
              let t2 = this._intervalEnd - e3;
              if (!(t2 < 0)) return void 0 === this._timeoutId && (this._timeoutId = setTimeout(() => {
                this._onResumeInterval();
              }, t2)), true;
              this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
            }
            return false;
          }
          _tryToStartAnother() {
            if (0 === this._queue.size) return this._intervalId && clearInterval(this._intervalId), this._intervalId = void 0, this._resolvePromises(), false;
            if (!this._isPaused) {
              let e3 = !this._isIntervalPaused();
              if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                let t2 = this._queue.dequeue();
                return !!t2 && (this.emit("active"), t2(), e3 && this._initializeIntervalIfNeeded(), true);
              }
            }
            return false;
          }
          _initializeIntervalIfNeeded() {
            this._isIntervalIgnored || void 0 !== this._intervalId || (this._intervalId = setInterval(() => {
              this._onInterval();
            }, this._interval), this._intervalEnd = Date.now() + this._interval);
          }
          _onInterval() {
            0 === this._intervalCount && 0 === this._pendingCount && this._intervalId && (clearInterval(this._intervalId), this._intervalId = void 0), this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0, this._processQueue();
          }
          _processQueue() {
            for (; this._tryToStartAnother(); ) ;
          }
          get concurrency() {
            return this._concurrency;
          }
          set concurrency(e3) {
            if (!("number" == typeof e3 && e3 >= 1)) throw TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e3}\` (${typeof e3})`);
            this._concurrency = e3, this._processQueue();
          }
          async add(e3, t2 = {}) {
            return new Promise((n2, i2) => {
              let o2 = async () => {
                this._pendingCount++, this._intervalCount++;
                try {
                  let o3 = void 0 === this._timeout && void 0 === t2.timeout ? e3() : r2.default(Promise.resolve(e3()), void 0 === t2.timeout ? this._timeout : t2.timeout, () => {
                    (void 0 === t2.throwOnTimeout ? this._throwOnTimeout : t2.throwOnTimeout) && i2(a);
                  });
                  n2(await o3);
                } catch (e4) {
                  i2(e4);
                }
                this._next();
              };
              this._queue.enqueue(o2, t2), this._tryToStartAnother(), this.emit("add");
            });
          }
          async addAll(e3, t2) {
            return Promise.all(e3.map(async (e4) => this.add(e4, t2)));
          }
          start() {
            return this._isPaused && (this._isPaused = false, this._processQueue()), this;
          }
          pause() {
            this._isPaused = true;
          }
          clear() {
            this._queue = new this._queueClass();
          }
          async onEmpty() {
            if (0 !== this._queue.size) return new Promise((e3) => {
              let t2 = this._resolveEmpty;
              this._resolveEmpty = () => {
                t2(), e3();
              };
            });
          }
          async onIdle() {
            if (0 !== this._pendingCount || 0 !== this._queue.size) return new Promise((e3) => {
              let t2 = this._resolveIdle;
              this._resolveIdle = () => {
                t2(), e3();
              };
            });
          }
          get size() {
            return this._queue.size;
          }
          sizeBy(e3) {
            return this._queue.filter(e3).length;
          }
          get pending() {
            return this._pendingCount;
          }
          get isPaused() {
            return this._isPaused;
          }
          get timeout() {
            return this._timeout;
          }
          set timeout(e3) {
            this._timeout = e3;
          }
        }, t.exports = u;
      })();
    }, 51615, (e, t, r) => {
      t.exports = e.x("node:buffer", () => (init_node_buffer(), __toCommonJS(node_buffer_exports)));
    }, 78500, (e, t, r) => {
      t.exports = e.x("node:async_hooks", () => (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports)));
    }, 25085, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { getTestReqInfo: function() {
        return l;
      }, withRequest: function() {
        return s;
      } };
      for (var i in n) Object.defineProperty(r, i, { enumerable: true, get: n[i] });
      let a = new (e.r(78500)).AsyncLocalStorage();
      function o(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (!r2) return;
        let n2 = t2.url(e2);
        return { url: n2, proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function s(e2, t2, r2) {
        let n2 = o(e2, t2);
        return n2 ? a.run(n2, r2) : r2();
      }
      function l(e2, t2) {
        let r2 = a.getStore();
        return r2 || (e2 && t2 ? o(e2, t2) : void 0);
      }
    }, 28325, (e, t, r) => {
      "use strict";
      var n = e.i(51615);
      Object.defineProperty(r, "__esModule", { value: true });
      var i = { handleFetch: function() {
        return u;
      }, interceptFetch: function() {
        return c;
      }, reader: function() {
        return s;
      } };
      for (var a in i) Object.defineProperty(r, a, { enumerable: true, get: i[a] });
      let o = e.r(25085), s = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function l(e2, t2) {
        let { url: r2, method: i2, headers: a2, body: o2, cache: s2, credentials: l2, integrity: u2, mode: c2, redirect: d, referrer: h, referrerPolicy: f } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: i2, headers: [...Array.from(a2), ["next-test-stack", function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: o2 ? n.Buffer.from(await t2.arrayBuffer()).toString("base64") : null, cache: s2, credentials: l2, integrity: u2, mode: c2, redirect: d, referrer: h, referrerPolicy: f } };
      }
      async function u(e2, t2) {
        let r2 = (0, o.getTestReqInfo)(t2, s);
        if (!r2) return e2(t2);
        let { testData: i2, proxyPort: a2 } = r2, u2 = await l(i2, t2), c2 = await e2(`http://localhost:${a2}`, { method: "POST", body: JSON.stringify(u2), next: { internal: true } });
        if (!c2.ok) throw Object.defineProperty(Error(`Proxy request failed: ${c2.status}`), "__NEXT_ERROR_CODE", { value: "E146", enumerable: false, configurable: true });
        let d = await c2.json(), { api: h } = d;
        switch (h) {
          case "continue":
            return e2(t2);
          case "abort":
          case "unhandled":
            throw Object.defineProperty(Error(`Proxy request aborted [${t2.method} ${t2.url}]`), "__NEXT_ERROR_CODE", { value: "E145", enumerable: false, configurable: true });
          case "fetch":
            return function(e3) {
              let { status: t3, headers: r3, body: i3 } = e3.response;
              return new Response(i3 ? n.Buffer.from(i3, "base64") : null, { status: t3, headers: new Headers(r3) });
            }(d);
          default:
            return h;
        }
      }
      function c(t2) {
        return e.g.fetch = function(e2, r2) {
          var n2;
          return (null == r2 || null == (n2 = r2.next) ? void 0 : n2.internal) ? t2(e2, r2) : u(t2, new Request(e2, r2));
        }, () => {
          e.g.fetch = t2;
        };
      }
    }, 94165, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { interceptTestApis: function() {
        return s;
      }, wrapRequestHandler: function() {
        return l;
      } };
      for (var i in n) Object.defineProperty(r, i, { enumerable: true, get: n[i] });
      let a = e.r(25085), o = e.r(28325);
      function s() {
        return (0, o.interceptFetch)(e.g.fetch);
      }
      function l(e2) {
        return (t2, r2) => (0, a.withRequest)(t2, o.reader, () => e2(t2, r2));
      }
    }, 54846, (e, t, r) => {
      !function() {
        "use strict";
        var e2 = { 114: function(e3) {
          function t2(e4) {
            if ("string" != typeof e4) throw TypeError("Path must be a string. Received " + JSON.stringify(e4));
          }
          function r3(e4, t3) {
            for (var r4, n3 = "", i = 0, a = -1, o = 0, s = 0; s <= e4.length; ++s) {
              if (s < e4.length) r4 = e4.charCodeAt(s);
              else if (47 === r4) break;
              else r4 = 47;
              if (47 === r4) {
                if (a === s - 1 || 1 === o) ;
                else if (a !== s - 1 && 2 === o) {
                  if (n3.length < 2 || 2 !== i || 46 !== n3.charCodeAt(n3.length - 1) || 46 !== n3.charCodeAt(n3.length - 2)) {
                    if (n3.length > 2) {
                      var l = n3.lastIndexOf("/");
                      if (l !== n3.length - 1) {
                        -1 === l ? (n3 = "", i = 0) : i = (n3 = n3.slice(0, l)).length - 1 - n3.lastIndexOf("/"), a = s, o = 0;
                        continue;
                      }
                    } else if (2 === n3.length || 1 === n3.length) {
                      n3 = "", i = 0, a = s, o = 0;
                      continue;
                    }
                  }
                  t3 && (n3.length > 0 ? n3 += "/.." : n3 = "..", i = 2);
                } else n3.length > 0 ? n3 += "/" + e4.slice(a + 1, s) : n3 = e4.slice(a + 1, s), i = s - a - 1;
                a = s, o = 0;
              } else 46 === r4 && -1 !== o ? ++o : o = -1;
            }
            return n3;
          }
          var n2 = { resolve: function() {
            for (var e4, n3, i = "", a = false, o = arguments.length - 1; o >= -1 && !a; o--) o >= 0 ? n3 = arguments[o] : (void 0 === e4 && (e4 = ""), n3 = e4), t2(n3), 0 !== n3.length && (i = n3 + "/" + i, a = 47 === n3.charCodeAt(0));
            if (i = r3(i, !a), a) if (i.length > 0) return "/" + i;
            else return "/";
            return i.length > 0 ? i : ".";
          }, normalize: function(e4) {
            if (t2(e4), 0 === e4.length) return ".";
            var n3 = 47 === e4.charCodeAt(0), i = 47 === e4.charCodeAt(e4.length - 1);
            return (0 !== (e4 = r3(e4, !n3)).length || n3 || (e4 = "."), e4.length > 0 && i && (e4 += "/"), n3) ? "/" + e4 : e4;
          }, isAbsolute: function(e4) {
            return t2(e4), e4.length > 0 && 47 === e4.charCodeAt(0);
          }, join: function() {
            if (0 == arguments.length) return ".";
            for (var e4, r4 = 0; r4 < arguments.length; ++r4) {
              var i = arguments[r4];
              t2(i), i.length > 0 && (void 0 === e4 ? e4 = i : e4 += "/" + i);
            }
            return void 0 === e4 ? "." : n2.normalize(e4);
          }, relative: function(e4, r4) {
            if (t2(e4), t2(r4), e4 === r4 || (e4 = n2.resolve(e4)) === (r4 = n2.resolve(r4))) return "";
            for (var i = 1; i < e4.length && 47 === e4.charCodeAt(i); ++i) ;
            for (var a = e4.length, o = a - i, s = 1; s < r4.length && 47 === r4.charCodeAt(s); ++s) ;
            for (var l = r4.length - s, u = o < l ? o : l, c = -1, d = 0; d <= u; ++d) {
              if (d === u) {
                if (l > u) {
                  if (47 === r4.charCodeAt(s + d)) return r4.slice(s + d + 1);
                  else if (0 === d) return r4.slice(s + d);
                } else o > u && (47 === e4.charCodeAt(i + d) ? c = d : 0 === d && (c = 0));
                break;
              }
              var h = e4.charCodeAt(i + d);
              if (h !== r4.charCodeAt(s + d)) break;
              47 === h && (c = d);
            }
            var f = "";
            for (d = i + c + 1; d <= a; ++d) (d === a || 47 === e4.charCodeAt(d)) && (0 === f.length ? f += ".." : f += "/..");
            return f.length > 0 ? f + r4.slice(s + c) : (s += c, 47 === r4.charCodeAt(s) && ++s, r4.slice(s));
          }, _makeLong: function(e4) {
            return e4;
          }, dirname: function(e4) {
            if (t2(e4), 0 === e4.length) return ".";
            for (var r4 = e4.charCodeAt(0), n3 = 47 === r4, i = -1, a = true, o = e4.length - 1; o >= 1; --o) if (47 === (r4 = e4.charCodeAt(o))) {
              if (!a) {
                i = o;
                break;
              }
            } else a = false;
            return -1 === i ? n3 ? "/" : "." : n3 && 1 === i ? "//" : e4.slice(0, i);
          }, basename: function(e4, r4) {
            if (void 0 !== r4 && "string" != typeof r4) throw TypeError('"ext" argument must be a string');
            t2(e4);
            var n3, i = 0, a = -1, o = true;
            if (void 0 !== r4 && r4.length > 0 && r4.length <= e4.length) {
              if (r4.length === e4.length && r4 === e4) return "";
              var s = r4.length - 1, l = -1;
              for (n3 = e4.length - 1; n3 >= 0; --n3) {
                var u = e4.charCodeAt(n3);
                if (47 === u) {
                  if (!o) {
                    i = n3 + 1;
                    break;
                  }
                } else -1 === l && (o = false, l = n3 + 1), s >= 0 && (u === r4.charCodeAt(s) ? -1 == --s && (a = n3) : (s = -1, a = l));
              }
              return i === a ? a = l : -1 === a && (a = e4.length), e4.slice(i, a);
            }
            for (n3 = e4.length - 1; n3 >= 0; --n3) if (47 === e4.charCodeAt(n3)) {
              if (!o) {
                i = n3 + 1;
                break;
              }
            } else -1 === a && (o = false, a = n3 + 1);
            return -1 === a ? "" : e4.slice(i, a);
          }, extname: function(e4) {
            t2(e4);
            for (var r4 = -1, n3 = 0, i = -1, a = true, o = 0, s = e4.length - 1; s >= 0; --s) {
              var l = e4.charCodeAt(s);
              if (47 === l) {
                if (!a) {
                  n3 = s + 1;
                  break;
                }
                continue;
              }
              -1 === i && (a = false, i = s + 1), 46 === l ? -1 === r4 ? r4 = s : 1 !== o && (o = 1) : -1 !== r4 && (o = -1);
            }
            return -1 === r4 || -1 === i || 0 === o || 1 === o && r4 === i - 1 && r4 === n3 + 1 ? "" : e4.slice(r4, i);
          }, format: function(e4) {
            var t3, r4;
            if (null === e4 || "object" != typeof e4) throw TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e4);
            return t3 = e4.dir || e4.root, r4 = e4.base || (e4.name || "") + (e4.ext || ""), t3 ? t3 === e4.root ? t3 + r4 : t3 + "/" + r4 : r4;
          }, parse: function(e4) {
            t2(e4);
            var r4, n3 = { root: "", dir: "", base: "", ext: "", name: "" };
            if (0 === e4.length) return n3;
            var i = e4.charCodeAt(0), a = 47 === i;
            a ? (n3.root = "/", r4 = 1) : r4 = 0;
            for (var o = -1, s = 0, l = -1, u = true, c = e4.length - 1, d = 0; c >= r4; --c) {
              if (47 === (i = e4.charCodeAt(c))) {
                if (!u) {
                  s = c + 1;
                  break;
                }
                continue;
              }
              -1 === l && (u = false, l = c + 1), 46 === i ? -1 === o ? o = c : 1 !== d && (d = 1) : -1 !== o && (d = -1);
            }
            return -1 === o || -1 === l || 0 === d || 1 === d && o === l - 1 && o === s + 1 ? -1 !== l && (0 === s && a ? n3.base = n3.name = e4.slice(1, l) : n3.base = n3.name = e4.slice(s, l)) : (0 === s && a ? (n3.name = e4.slice(1, o), n3.base = e4.slice(1, l)) : (n3.name = e4.slice(s, o), n3.base = e4.slice(s, l)), n3.ext = e4.slice(o, l)), s > 0 ? n3.dir = e4.slice(0, s - 1) : a && (n3.dir = "/"), n3;
          }, sep: "/", delimiter: ":", win32: null, posix: null };
          n2.posix = n2, e3.exports = n2;
        } }, r2 = {};
        function n(t2) {
          var i = r2[t2];
          if (void 0 !== i) return i.exports;
          var a = r2[t2] = { exports: {} }, o = true;
          try {
            e2[t2](a, a.exports, n), o = false;
          } finally {
            o && delete r2[t2];
          }
          return a.exports;
        }
        n.ab = "/ROOT/node_modules/next/dist/compiled/path-browserify/", t.exports = n(114);
      }();
    }, 68886, (e, t, r) => {
      t.exports = e.r(54846);
    }, 67914, (e, t, r) => {
      (() => {
        "use strict";
        "u" > typeof __nccwpck_require__ && (__nccwpck_require__.ab = "/ROOT/node_modules/next/dist/compiled/path-to-regexp/");
        var e2 = {};
        (() => {
          function t2(e3, t3) {
            void 0 === t3 && (t3 = {});
            for (var r3 = function(e4) {
              for (var t4 = [], r4 = 0; r4 < e4.length; ) {
                var n3 = e4[r4];
                if ("*" === n3 || "+" === n3 || "?" === n3) {
                  t4.push({ type: "MODIFIER", index: r4, value: e4[r4++] });
                  continue;
                }
                if ("\\" === n3) {
                  t4.push({ type: "ESCAPED_CHAR", index: r4++, value: e4[r4++] });
                  continue;
                }
                if ("{" === n3) {
                  t4.push({ type: "OPEN", index: r4, value: e4[r4++] });
                  continue;
                }
                if ("}" === n3) {
                  t4.push({ type: "CLOSE", index: r4, value: e4[r4++] });
                  continue;
                }
                if (":" === n3) {
                  for (var i2 = "", a3 = r4 + 1; a3 < e4.length; ) {
                    var o3 = e4.charCodeAt(a3);
                    if (o3 >= 48 && o3 <= 57 || o3 >= 65 && o3 <= 90 || o3 >= 97 && o3 <= 122 || 95 === o3) {
                      i2 += e4[a3++];
                      continue;
                    }
                    break;
                  }
                  if (!i2) throw TypeError("Missing parameter name at ".concat(r4));
                  t4.push({ type: "NAME", index: r4, value: i2 }), r4 = a3;
                  continue;
                }
                if ("(" === n3) {
                  var s3 = 1, l2 = "", a3 = r4 + 1;
                  if ("?" === e4[a3]) throw TypeError('Pattern cannot start with "?" at '.concat(a3));
                  for (; a3 < e4.length; ) {
                    if ("\\" === e4[a3]) {
                      l2 += e4[a3++] + e4[a3++];
                      continue;
                    }
                    if (")" === e4[a3]) {
                      if (0 == --s3) {
                        a3++;
                        break;
                      }
                    } else if ("(" === e4[a3] && (s3++, "?" !== e4[a3 + 1])) throw TypeError("Capturing groups are not allowed at ".concat(a3));
                    l2 += e4[a3++];
                  }
                  if (s3) throw TypeError("Unbalanced pattern at ".concat(r4));
                  if (!l2) throw TypeError("Missing pattern at ".concat(r4));
                  t4.push({ type: "PATTERN", index: r4, value: l2 }), r4 = a3;
                  continue;
                }
                t4.push({ type: "CHAR", index: r4, value: e4[r4++] });
              }
              return t4.push({ type: "END", index: r4, value: "" }), t4;
            }(e3), n2 = t3.prefixes, a2 = void 0 === n2 ? "./" : n2, o2 = t3.delimiter, s2 = void 0 === o2 ? "/#?" : o2, l = [], u = 0, c = 0, d = "", h = function(e4) {
              if (c < r3.length && r3[c].type === e4) return r3[c++].value;
            }, f = function(e4) {
              var t4 = h(e4);
              if (void 0 !== t4) return t4;
              var n3 = r3[c], i2 = n3.type, a3 = n3.index;
              throw TypeError("Unexpected ".concat(i2, " at ").concat(a3, ", expected ").concat(e4));
            }, p = function() {
              for (var e4, t4 = ""; e4 = h("CHAR") || h("ESCAPED_CHAR"); ) t4 += e4;
              return t4;
            }, g = function(e4) {
              for (var t4 = 0; t4 < s2.length; t4++) {
                var r4 = s2[t4];
                if (e4.indexOf(r4) > -1) return true;
              }
              return false;
            }, A = function(e4) {
              var t4 = l[l.length - 1], r4 = e4 || (t4 && "string" == typeof t4 ? t4 : "");
              if (t4 && !r4) throw TypeError('Must have text between two parameters, missing text after "'.concat(t4.name, '"'));
              return !r4 || g(r4) ? "[^".concat(i(s2), "]+?") : "(?:(?!".concat(i(r4), ")[^").concat(i(s2), "])+?");
            }; c < r3.length; ) {
              var m = h("CHAR"), y = h("NAME"), w = h("PATTERN");
              if (y || w) {
                var b = m || "";
                -1 === a2.indexOf(b) && (d += b, b = ""), d && (l.push(d), d = ""), l.push({ name: y || u++, prefix: b, suffix: "", pattern: w || A(b), modifier: h("MODIFIER") || "" });
                continue;
              }
              var v = m || h("ESCAPED_CHAR");
              if (v) {
                d += v;
                continue;
              }
              if (d && (l.push(d), d = ""), h("OPEN")) {
                var b = p(), E = h("NAME") || "", _ = h("PATTERN") || "", C = p();
                f("CLOSE"), l.push({ name: E || (_ ? u++ : ""), pattern: E && !_ ? A(b) : _, prefix: b, suffix: C, modifier: h("MODIFIER") || "" });
                continue;
              }
              f("END");
            }
            return l;
          }
          function r2(e3, t3) {
            void 0 === t3 && (t3 = {});
            var r3 = a(t3), n2 = t3.encode, i2 = void 0 === n2 ? function(e4) {
              return e4;
            } : n2, o2 = t3.validate, s2 = void 0 === o2 || o2, l = e3.map(function(e4) {
              if ("object" == typeof e4) return new RegExp("^(?:".concat(e4.pattern, ")$"), r3);
            });
            return function(t4) {
              for (var r4 = "", n3 = 0; n3 < e3.length; n3++) {
                var a2 = e3[n3];
                if ("string" == typeof a2) {
                  r4 += a2;
                  continue;
                }
                var o3 = t4 ? t4[a2.name] : void 0, u = "?" === a2.modifier || "*" === a2.modifier, c = "*" === a2.modifier || "+" === a2.modifier;
                if (Array.isArray(o3)) {
                  if (!c) throw TypeError('Expected "'.concat(a2.name, '" to not repeat, but got an array'));
                  if (0 === o3.length) {
                    if (u) continue;
                    throw TypeError('Expected "'.concat(a2.name, '" to not be empty'));
                  }
                  for (var d = 0; d < o3.length; d++) {
                    var h = i2(o3[d], a2);
                    if (s2 && !l[n3].test(h)) throw TypeError('Expected all "'.concat(a2.name, '" to match "').concat(a2.pattern, '", but got "').concat(h, '"'));
                    r4 += a2.prefix + h + a2.suffix;
                  }
                  continue;
                }
                if ("string" == typeof o3 || "number" == typeof o3) {
                  var h = i2(String(o3), a2);
                  if (s2 && !l[n3].test(h)) throw TypeError('Expected "'.concat(a2.name, '" to match "').concat(a2.pattern, '", but got "').concat(h, '"'));
                  r4 += a2.prefix + h + a2.suffix;
                  continue;
                }
                if (!u) {
                  var f = c ? "an array" : "a string";
                  throw TypeError('Expected "'.concat(a2.name, '" to be ').concat(f));
                }
              }
              return r4;
            };
          }
          function n(e3, t3, r3) {
            void 0 === r3 && (r3 = {});
            var n2 = r3.decode, i2 = void 0 === n2 ? function(e4) {
              return e4;
            } : n2;
            return function(r4) {
              var n3 = e3.exec(r4);
              if (!n3) return false;
              for (var a2 = n3[0], o2 = n3.index, s2 = /* @__PURE__ */ Object.create(null), l = 1; l < n3.length; l++) !function(e4) {
                if (void 0 !== n3[e4]) {
                  var r5 = t3[e4 - 1];
                  "*" === r5.modifier || "+" === r5.modifier ? s2[r5.name] = n3[e4].split(r5.prefix + r5.suffix).map(function(e5) {
                    return i2(e5, r5);
                  }) : s2[r5.name] = i2(n3[e4], r5);
                }
              }(l);
              return { path: a2, index: o2, params: s2 };
            };
          }
          function i(e3) {
            return e3.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
          }
          function a(e3) {
            return e3 && e3.sensitive ? "" : "i";
          }
          function o(e3, t3, r3) {
            void 0 === r3 && (r3 = {});
            for (var n2 = r3.strict, o2 = void 0 !== n2 && n2, s2 = r3.start, l = r3.end, u = r3.encode, c = void 0 === u ? function(e4) {
              return e4;
            } : u, d = r3.delimiter, h = r3.endsWith, f = "[".concat(i(void 0 === h ? "" : h), "]|$"), p = "[".concat(i(void 0 === d ? "/#?" : d), "]"), g = void 0 === s2 || s2 ? "^" : "", A = 0; A < e3.length; A++) {
              var m = e3[A];
              if ("string" == typeof m) g += i(c(m));
              else {
                var y = i(c(m.prefix)), w = i(c(m.suffix));
                if (m.pattern) if (t3 && t3.push(m), y || w) if ("+" === m.modifier || "*" === m.modifier) {
                  var b = "*" === m.modifier ? "?" : "";
                  g += "(?:".concat(y, "((?:").concat(m.pattern, ")(?:").concat(w).concat(y, "(?:").concat(m.pattern, "))*)").concat(w, ")").concat(b);
                } else g += "(?:".concat(y, "(").concat(m.pattern, ")").concat(w, ")").concat(m.modifier);
                else {
                  if ("+" === m.modifier || "*" === m.modifier) throw TypeError('Can not repeat "'.concat(m.name, '" without a prefix and suffix'));
                  g += "(".concat(m.pattern, ")").concat(m.modifier);
                }
                else g += "(?:".concat(y).concat(w, ")").concat(m.modifier);
              }
            }
            if (void 0 === l || l) o2 || (g += "".concat(p, "?")), g += r3.endsWith ? "(?=".concat(f, ")") : "$";
            else {
              var v = e3[e3.length - 1], E = "string" == typeof v ? p.indexOf(v[v.length - 1]) > -1 : void 0 === v;
              o2 || (g += "(?:".concat(p, "(?=").concat(f, "))?")), E || (g += "(?=".concat(p, "|").concat(f, ")"));
            }
            return new RegExp(g, a(r3));
          }
          function s(e3, r3, n2) {
            if (e3 instanceof RegExp) {
              var i2;
              if (!r3) return e3;
              for (var l = /\((?:\?<(.*?)>)?(?!\?)/g, u = 0, c = l.exec(e3.source); c; ) r3.push({ name: c[1] || u++, prefix: "", suffix: "", modifier: "", pattern: "" }), c = l.exec(e3.source);
              return e3;
            }
            return Array.isArray(e3) ? (i2 = e3.map(function(e4) {
              return s(e4, r3, n2).source;
            }), new RegExp("(?:".concat(i2.join("|"), ")"), a(n2))) : o(t2(e3, n2), r3, n2);
          }
          Object.defineProperty(e2, "__esModule", { value: true }), e2.pathToRegexp = e2.tokensToRegexp = e2.regexpToFunction = e2.match = e2.tokensToFunction = e2.compile = e2.parse = void 0, e2.parse = t2, e2.compile = function(e3, n2) {
            return r2(t2(e3, n2), n2);
          }, e2.tokensToFunction = r2, e2.match = function(e3, t3) {
            var r3 = [];
            return n(s(e3, r3, t3), r3, t3);
          }, e2.regexpToFunction = n, e2.tokensToRegexp = o, e2.pathToRegexp = s;
        })(), t.exports = e2;
      })();
    }, 64445, (e, t, r) => {
      var n = { 226: function(t2, r2) {
        !function(n2) {
          "use strict";
          var i2 = "function", a2 = "undefined", o = "object", s = "string", l = "major", u = "model", c = "name", d = "type", h = "vendor", f = "version", p = "architecture", g = "console", A = "mobile", m = "tablet", y = "smarttv", w = "wearable", b = "embedded", v = "Amazon", E = "Apple", _ = "ASUS", C = "BlackBerry", x = "Browser", I = "Chrome", S = "Firefox", T = "Google", O = "Huawei", P = "Microsoft", R = "Motorola", N = "Opera", k = "Samsung", B = "Sharp", D = "Sony", M = "Xiaomi", $ = "Zebra", j = "Facebook", L = "Chromium OS", q = "Mac OS", F = function(e2, t3) {
            var r3 = {};
            for (var n3 in e2) t3[n3] && t3[n3].length % 2 == 0 ? r3[n3] = t3[n3].concat(e2[n3]) : r3[n3] = e2[n3];
            return r3;
          }, Q = function(e2) {
            for (var t3 = {}, r3 = 0; r3 < e2.length; r3++) t3[e2[r3].toUpperCase()] = e2[r3];
            return t3;
          }, U = function(e2, t3) {
            return typeof e2 === s && -1 !== V(t3).indexOf(V(e2));
          }, V = function(e2) {
            return e2.toLowerCase();
          }, H = function(e2, t3) {
            if (typeof e2 === s) return e2 = e2.replace(/^\s\s*/, ""), typeof t3 === a2 ? e2 : e2.substring(0, 350);
          }, W = function(e2, t3) {
            for (var r3, n3, a3, s2, l2, u2, c2 = 0; c2 < t3.length && !l2; ) {
              var d2 = t3[c2], h2 = t3[c2 + 1];
              for (r3 = n3 = 0; r3 < d2.length && !l2 && d2[r3]; ) if (l2 = d2[r3++].exec(e2)) for (a3 = 0; a3 < h2.length; a3++) u2 = l2[++n3], typeof (s2 = h2[a3]) === o && s2.length > 0 ? 2 === s2.length ? typeof s2[1] == i2 ? this[s2[0]] = s2[1].call(this, u2) : this[s2[0]] = s2[1] : 3 === s2.length ? typeof s2[1] !== i2 || s2[1].exec && s2[1].test ? this[s2[0]] = u2 ? u2.replace(s2[1], s2[2]) : void 0 : this[s2[0]] = u2 ? s2[1].call(this, u2, s2[2]) : void 0 : 4 === s2.length && (this[s2[0]] = u2 ? s2[3].call(this, u2.replace(s2[1], s2[2])) : void 0) : this[s2] = u2 || void 0;
              c2 += 2;
            }
          }, G = function(e2, t3) {
            for (var r3 in t3) if (typeof t3[r3] === o && t3[r3].length > 0) {
              for (var n3 = 0; n3 < t3[r3].length; n3++) if (U(t3[r3][n3], e2)) return "?" === r3 ? void 0 : r3;
            } else if (U(t3[r3], e2)) return "?" === r3 ? void 0 : r3;
            return e2;
          }, X = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, J = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [f, [c, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [f, [c, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [c, f], [/opios[\/ ]+([\w\.]+)/i], [f, [c, N + " Mini"]], [/\bopr\/([\w\.]+)/i], [f, [c, N]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [c, f], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [f, [c, "UC" + x]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [f, [c, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [f, [c, "WeChat"]], [/konqueror\/([\w\.]+)/i], [f, [c, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [f, [c, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [f, [c, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[c, /(.+)/, "$1 Secure " + x], f], [/\bfocus\/([\w\.]+)/i], [f, [c, S + " Focus"]], [/\bopt\/([\w\.]+)/i], [f, [c, N + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [f, [c, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [f, [c, "Dolphin"]], [/coast\/([\w\.]+)/i], [f, [c, N + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [f, [c, "MIUI " + x]], [/fxios\/([-\w\.]+)/i], [f, [c, S]], [/\bqihu|(qi?ho?o?|360)browser/i], [[c, "360 " + x]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[c, /(.+)/, "$1 " + x], f], [/(comodo_dragon)\/([\w\.]+)/i], [[c, /_/g, " "], f], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [c, f], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [c], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[c, j], f], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [c, f], [/\bgsa\/([\w\.]+) .*safari\//i], [f, [c, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [f, [c, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [f, [c, I + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[c, I + " WebView"], f], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [f, [c, "Android " + x]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [c, f], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [f, [c, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [f, c], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [c, [f, G, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [c, f], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[c, "Netscape"], f], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [f, [c, S + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [c, f], [/(cobalt)\/([\w\.]+)/i], [c, [f, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[p, "amd64"]], [/(ia32(?=;))/i], [[p, V]], [/((?:i[346]|x)86)[;\)]/i], [[p, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[p, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[p, "armhf"]], [/windows (ce|mobile); ppc;/i], [[p, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[p, /ower/, "", V]], [/(sun4\w)[;\)]/i], [[p, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[p, V]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [u, [h, k], [d, m]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [u, [h, k], [d, A]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [u, [h, E], [d, A]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [u, [h, E], [d, m]], [/(macintosh);/i], [u, [h, E]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [u, [h, B], [d, A]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [u, [h, O], [d, m]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [u, [h, O], [d, A]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[u, /_/g, " "], [h, M], [d, A]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[u, /_/g, " "], [h, M], [d, m]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [u, [h, "OPPO"], [d, A]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [u, [h, "Vivo"], [d, A]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [u, [h, "Realme"], [d, A]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [u, [h, R], [d, A]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [u, [h, R], [d, m]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [u, [h, "LG"], [d, m]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [u, [h, "LG"], [d, A]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [u, [h, "Lenovo"], [d, m]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[u, /_/g, " "], [h, "Nokia"], [d, A]], [/(pixel c)\b/i], [u, [h, T], [d, m]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [u, [h, T], [d, A]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [u, [h, D], [d, A]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[u, "Xperia Tablet"], [h, D], [d, m]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [u, [h, "OnePlus"], [d, A]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [u, [h, v], [d, m]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[u, /(.+)/g, "Fire Phone $1"], [h, v], [d, A]], [/(playbook);[-\w\),; ]+(rim)/i], [u, h, [d, m]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [u, [h, C], [d, A]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [u, [h, _], [d, m]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [u, [h, _], [d, A]], [/(nexus 9)/i], [u, [h, "HTC"], [d, m]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [h, [u, /_/g, " "], [d, A]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [u, [h, "Acer"], [d, m]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [u, [h, "Meizu"], [d, A]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [h, u, [d, A]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [h, u, [d, m]], [/(surface duo)/i], [u, [h, P], [d, m]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [u, [h, "Fairphone"], [d, A]], [/(u304aa)/i], [u, [h, "AT&T"], [d, A]], [/\bsie-(\w*)/i], [u, [h, "Siemens"], [d, A]], [/\b(rct\w+) b/i], [u, [h, "RCA"], [d, m]], [/\b(venue[\d ]{2,7}) b/i], [u, [h, "Dell"], [d, m]], [/\b(q(?:mv|ta)\w+) b/i], [u, [h, "Verizon"], [d, m]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [u, [h, "Barnes & Noble"], [d, m]], [/\b(tm\d{3}\w+) b/i], [u, [h, "NuVision"], [d, m]], [/\b(k88) b/i], [u, [h, "ZTE"], [d, m]], [/\b(nx\d{3}j) b/i], [u, [h, "ZTE"], [d, A]], [/\b(gen\d{3}) b.+49h/i], [u, [h, "Swiss"], [d, A]], [/\b(zur\d{3}) b/i], [u, [h, "Swiss"], [d, m]], [/\b((zeki)?tb.*\b) b/i], [u, [h, "Zeki"], [d, m]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[h, "Dragon Touch"], u, [d, m]], [/\b(ns-?\w{0,9}) b/i], [u, [h, "Insignia"], [d, m]], [/\b((nxa|next)-?\w{0,9}) b/i], [u, [h, "NextBook"], [d, m]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[h, "Voice"], u, [d, A]], [/\b(lvtel\-)?(v1[12]) b/i], [[h, "LvTel"], u, [d, A]], [/\b(ph-1) /i], [u, [h, "Essential"], [d, A]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [u, [h, "Envizen"], [d, m]], [/\b(trio[-\w\. ]+) b/i], [u, [h, "MachSpeed"], [d, m]], [/\btu_(1491) b/i], [u, [h, "Rotor"], [d, m]], [/(shield[\w ]+) b/i], [u, [h, "Nvidia"], [d, m]], [/(sprint) (\w+)/i], [h, u, [d, A]], [/(kin\.[onetw]{3})/i], [[u, /\./g, " "], [h, P], [d, A]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [u, [h, $], [d, m]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [u, [h, $], [d, A]], [/smart-tv.+(samsung)/i], [h, [d, y]], [/hbbtv.+maple;(\d+)/i], [[u, /^/, "SmartTV"], [h, k], [d, y]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[h, "LG"], [d, y]], [/(apple) ?tv/i], [h, [u, E + " TV"], [d, y]], [/crkey/i], [[u, I + "cast"], [h, T], [d, y]], [/droid.+aft(\w)( bui|\))/i], [u, [h, v], [d, y]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [u, [h, B], [d, y]], [/(bravia[\w ]+)( bui|\))/i], [u, [h, D], [d, y]], [/(mitv-\w{5}) bui/i], [u, [h, M], [d, y]], [/Hbbtv.*(technisat) (.*);/i], [h, u, [d, y]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[h, H], [u, H], [d, y]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[d, y]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [h, u, [d, g]], [/droid.+; (shield) bui/i], [u, [h, "Nvidia"], [d, g]], [/(playstation [345portablevi]+)/i], [u, [h, D], [d, g]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [u, [h, P], [d, g]], [/((pebble))app/i], [h, u, [d, w]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [u, [h, E], [d, w]], [/droid.+; (glass) \d/i], [u, [h, T], [d, w]], [/droid.+; (wt63?0{2,3})\)/i], [u, [h, $], [d, w]], [/(quest( 2| pro)?)/i], [u, [h, j], [d, w]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [h, [d, b]], [/(aeobc)\b/i], [u, [h, v], [d, b]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [u, [d, A]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [u, [d, m]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[d, m]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[d, A]], [/(android[-\w\. ]{0,9});.+buil/i], [u, [h, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [f, [c, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [f, [c, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [c, f], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [f, c]], os: [[/microsoft (windows) (vista|xp)/i], [c, f], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [c, [f, G, X]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[c, "Windows"], [f, G, X]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[f, /_/g, "."], [c, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[c, q], [f, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [f, c], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [c, f], [/\(bb(10);/i], [f, [c, C]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [f, [c, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [f, [c, S + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [f, [c, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [f, [c, "watchOS"]], [/crkey\/([\d\.]+)/i], [f, [c, I + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[c, L], f], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [c, f], [/(sunos) ?([\w\.\d]*)/i], [[c, "Solaris"], f], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [c, f]] }, z = function(e2, t3) {
            if (typeof e2 === o && (t3 = e2, e2 = void 0), !(this instanceof z)) return new z(e2, t3).getResult();
            var r3 = typeof n2 !== a2 && n2.navigator ? n2.navigator : void 0, g2 = e2 || (r3 && r3.userAgent ? r3.userAgent : ""), y2 = r3 && r3.userAgentData ? r3.userAgentData : void 0, w2 = t3 ? F(J, t3) : J, b2 = r3 && r3.userAgent == g2;
            return this.getBrowser = function() {
              var e3, t4 = {};
              return t4[c] = void 0, t4[f] = void 0, W.call(t4, g2, w2.browser), t4[l] = typeof (e3 = t4[f]) === s ? e3.replace(/[^\d\.]/g, "").split(".")[0] : void 0, b2 && r3 && r3.brave && typeof r3.brave.isBrave == i2 && (t4[c] = "Brave"), t4;
            }, this.getCPU = function() {
              var e3 = {};
              return e3[p] = void 0, W.call(e3, g2, w2.cpu), e3;
            }, this.getDevice = function() {
              var e3 = {};
              return e3[h] = void 0, e3[u] = void 0, e3[d] = void 0, W.call(e3, g2, w2.device), b2 && !e3[d] && y2 && y2.mobile && (e3[d] = A), b2 && "Macintosh" == e3[u] && r3 && typeof r3.standalone !== a2 && r3.maxTouchPoints && r3.maxTouchPoints > 2 && (e3[u] = "iPad", e3[d] = m), e3;
            }, this.getEngine = function() {
              var e3 = {};
              return e3[c] = void 0, e3[f] = void 0, W.call(e3, g2, w2.engine), e3;
            }, this.getOS = function() {
              var e3 = {};
              return e3[c] = void 0, e3[f] = void 0, W.call(e3, g2, w2.os), b2 && !e3[c] && y2 && "Unknown" != y2.platform && (e3[c] = y2.platform.replace(/chrome os/i, L).replace(/macos/i, q)), e3;
            }, this.getResult = function() {
              return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
            }, this.getUA = function() {
              return g2;
            }, this.setUA = function(e3) {
              return g2 = typeof e3 === s && e3.length > 350 ? H(e3, 350) : e3, this;
            }, this.setUA(g2), this;
          };
          if (z.VERSION = "1.0.35", z.BROWSER = Q([c, f, l]), z.CPU = Q([p]), z.DEVICE = Q([u, h, d, g, A, y, m, w, b]), z.ENGINE = z.OS = Q([c, f]), typeof r2 !== a2) t2.exports && (r2 = t2.exports = z), r2.UAParser = z;
          else if (typeof define === i2 && define.amd) e.r, void 0 !== z && e.v(z);
          else typeof n2 !== a2 && (n2.UAParser = z);
          var K = typeof n2 !== a2 && (n2.jQuery || n2.Zepto);
          if (K && !K.ua) {
            var Y = new z();
            K.ua = Y.getResult(), K.ua.get = function() {
              return Y.getUA();
            }, K.ua.set = function(e2) {
              Y.setUA(e2);
              var t3 = Y.getResult();
              for (var r3 in t3) K.ua[r3] = t3[r3];
            };
          }
        }(this);
      } }, i = {};
      function a(e2) {
        var t2 = i[e2];
        if (void 0 !== t2) return t2.exports;
        var r2 = i[e2] = { exports: {} }, o = true;
        try {
          n[e2].call(r2.exports, r2, r2.exports, a), o = false;
        } finally {
          o && delete i[e2];
        }
        return r2.exports;
      }
      a.ab = "/ROOT/node_modules/next/dist/compiled/ua-parser-js/", t.exports = a(226);
    }, 8946, (e, t, r) => {
      "use strict";
      var n = { H: null, A: null };
      function i(e2) {
        var t2 = "https://react.dev/errors/" + e2;
        if (1 < arguments.length) {
          t2 += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var r2 = 2; r2 < arguments.length; r2++) t2 += "&args[]=" + encodeURIComponent(arguments[r2]);
        }
        return "Minified React error #" + e2 + "; visit " + t2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var a = Array.isArray;
      function o() {
      }
      var s = Symbol.for("react.transitional.element"), l = Symbol.for("react.portal"), u = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), d = Symbol.for("react.profiler"), h = Symbol.for("react.forward_ref"), f = Symbol.for("react.suspense"), p = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), A = Symbol.for("react.activity"), m = Symbol.for("react.view_transition"), y = Symbol.iterator, w = Object.prototype.hasOwnProperty, b = Object.assign;
      function v(e2, t2, r2) {
        var n2 = r2.ref;
        return { $$typeof: s, type: e2, key: t2, ref: void 0 !== n2 ? n2 : null, props: r2 };
      }
      function E(e2) {
        return "object" == typeof e2 && null !== e2 && e2.$$typeof === s;
      }
      var _ = /\/+/g;
      function C(e2, t2) {
        var r2, n2;
        return "object" == typeof e2 && null !== e2 && null != e2.key ? (r2 = "" + e2.key, n2 = { "=": "=0", ":": "=2" }, "$" + r2.replace(/[=:]/g, function(e3) {
          return n2[e3];
        })) : t2.toString(36);
      }
      function x(e2, t2, r2) {
        if (null == e2) return e2;
        var n2 = [], u2 = 0;
        return !function e3(t3, r3, n3, u3, c2) {
          var d2, h2, f2, p2 = typeof t3;
          ("undefined" === p2 || "boolean" === p2) && (t3 = null);
          var A2 = false;
          if (null === t3) A2 = true;
          else switch (p2) {
            case "bigint":
            case "string":
            case "number":
              A2 = true;
              break;
            case "object":
              switch (t3.$$typeof) {
                case s:
                case l:
                  A2 = true;
                  break;
                case g:
                  return e3((A2 = t3._init)(t3._payload), r3, n3, u3, c2);
              }
          }
          if (A2) return c2 = c2(t3), A2 = "" === u3 ? "." + C(t3, 0) : u3, a(c2) ? (n3 = "", null != A2 && (n3 = A2.replace(_, "$&/") + "/"), e3(c2, r3, n3, "", function(e4) {
            return e4;
          })) : null != c2 && (E(c2) && (d2 = c2, h2 = n3 + (null == c2.key || t3 && t3.key === c2.key ? "" : ("" + c2.key).replace(_, "$&/") + "/") + A2, c2 = v(d2.type, h2, d2.props)), r3.push(c2)), 1;
          A2 = 0;
          var m2 = "" === u3 ? "." : u3 + ":";
          if (a(t3)) for (var w2 = 0; w2 < t3.length; w2++) p2 = m2 + C(u3 = t3[w2], w2), A2 += e3(u3, r3, n3, p2, c2);
          else if ("function" == typeof (w2 = null === (f2 = t3) || "object" != typeof f2 ? null : "function" == typeof (f2 = y && f2[y] || f2["@@iterator"]) ? f2 : null)) for (t3 = w2.call(t3), w2 = 0; !(u3 = t3.next()).done; ) p2 = m2 + C(u3 = u3.value, w2++), A2 += e3(u3, r3, n3, p2, c2);
          else if ("object" === p2) {
            if ("function" == typeof t3.then) return e3(function(e4) {
              switch (e4.status) {
                case "fulfilled":
                  return e4.value;
                case "rejected":
                  throw e4.reason;
                default:
                  switch ("string" == typeof e4.status ? e4.then(o, o) : (e4.status = "pending", e4.then(function(t4) {
                    "pending" === e4.status && (e4.status = "fulfilled", e4.value = t4);
                  }, function(t4) {
                    "pending" === e4.status && (e4.status = "rejected", e4.reason = t4);
                  })), e4.status) {
                    case "fulfilled":
                      return e4.value;
                    case "rejected":
                      throw e4.reason;
                  }
              }
              throw e4;
            }(t3), r3, n3, u3, c2);
            throw Error(i(31, "[object Object]" === (r3 = String(t3)) ? "object with keys {" + Object.keys(t3).join(", ") + "}" : r3));
          }
          return A2;
        }(e2, n2, "", "", function(e3) {
          return t2.call(r2, e3, u2++);
        }), n2;
      }
      function I(e2) {
        if (-1 === e2._status) {
          var t2 = (0, e2._result)();
          t2.then(function(r2) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 1, e2._result = r2, void 0 === t2.status && (t2.status = "fulfilled", t2.value = r2));
          }, function(r2) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 2, e2._result = r2, void 0 === t2.status && (t2.status = "rejected", t2.reason = r2));
          }), -1 === e2._status && (e2._status = 0, e2._result = t2);
        }
        if (1 === e2._status) return e2._result.default;
        throw e2._result;
      }
      function S() {
        return /* @__PURE__ */ new WeakMap();
      }
      function T() {
        return { s: 0, v: void 0, o: null, p: null };
      }
      r.Activity = A, r.Children = { map: x, forEach: function(e2, t2, r2) {
        x(e2, function() {
          t2.apply(this, arguments);
        }, r2);
      }, count: function(e2) {
        var t2 = 0;
        return x(e2, function() {
          t2++;
        }), t2;
      }, toArray: function(e2) {
        return x(e2, function(e3) {
          return e3;
        }) || [];
      }, only: function(e2) {
        if (!E(e2)) throw Error(i(143));
        return e2;
      } }, r.Fragment = u, r.Profiler = d, r.StrictMode = c, r.Suspense = f, r.ViewTransition = m, r.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = n, r.cache = function(e2) {
        return function() {
          var t2 = n.A;
          if (!t2) return e2.apply(null, arguments);
          var r2 = t2.getCacheForType(S);
          void 0 === (t2 = r2.get(e2)) && (t2 = T(), r2.set(e2, t2)), r2 = 0;
          for (var i2 = arguments.length; r2 < i2; r2++) {
            var a2 = arguments[r2];
            if ("function" == typeof a2 || "object" == typeof a2 && null !== a2) {
              var o2 = t2.o;
              null === o2 && (t2.o = o2 = /* @__PURE__ */ new WeakMap()), void 0 === (t2 = o2.get(a2)) && (t2 = T(), o2.set(a2, t2));
            } else null === (o2 = t2.p) && (t2.p = o2 = /* @__PURE__ */ new Map()), void 0 === (t2 = o2.get(a2)) && (t2 = T(), o2.set(a2, t2));
          }
          if (1 === t2.s) return t2.v;
          if (2 === t2.s) throw t2.v;
          try {
            var s2 = e2.apply(null, arguments);
            return (r2 = t2).s = 1, r2.v = s2;
          } catch (e3) {
            throw (s2 = t2).s = 2, s2.v = e3, e3;
          }
        };
      }, r.cacheSignal = function() {
        var e2 = n.A;
        return e2 ? e2.cacheSignal() : null;
      }, r.captureOwnerStack = function() {
        return null;
      }, r.cloneElement = function(e2, t2, r2) {
        if (null == e2) throw Error(i(267, e2));
        var n2 = b({}, e2.props), a2 = e2.key;
        if (null != t2) for (o2 in void 0 !== t2.key && (a2 = "" + t2.key), t2) w.call(t2, o2) && "key" !== o2 && "__self" !== o2 && "__source" !== o2 && ("ref" !== o2 || void 0 !== t2.ref) && (n2[o2] = t2[o2]);
        var o2 = arguments.length - 2;
        if (1 === o2) n2.children = r2;
        else if (1 < o2) {
          for (var s2 = Array(o2), l2 = 0; l2 < o2; l2++) s2[l2] = arguments[l2 + 2];
          n2.children = s2;
        }
        return v(e2.type, a2, n2);
      }, r.createElement = function(e2, t2, r2) {
        var n2, i2 = {}, a2 = null;
        if (null != t2) for (n2 in void 0 !== t2.key && (a2 = "" + t2.key), t2) w.call(t2, n2) && "key" !== n2 && "__self" !== n2 && "__source" !== n2 && (i2[n2] = t2[n2]);
        var o2 = arguments.length - 2;
        if (1 === o2) i2.children = r2;
        else if (1 < o2) {
          for (var s2 = Array(o2), l2 = 0; l2 < o2; l2++) s2[l2] = arguments[l2 + 2];
          i2.children = s2;
        }
        if (e2 && e2.defaultProps) for (n2 in o2 = e2.defaultProps) void 0 === i2[n2] && (i2[n2] = o2[n2]);
        return v(e2, a2, i2);
      }, r.createRef = function() {
        return { current: null };
      }, r.forwardRef = function(e2) {
        return { $$typeof: h, render: e2 };
      }, r.isValidElement = E, r.lazy = function(e2) {
        return { $$typeof: g, _payload: { _status: -1, _result: e2 }, _init: I };
      }, r.memo = function(e2, t2) {
        return { $$typeof: p, type: e2, compare: void 0 === t2 ? null : t2 };
      }, r.use = function(e2) {
        return n.H.use(e2);
      }, r.useCallback = function(e2, t2) {
        return n.H.useCallback(e2, t2);
      }, r.useDebugValue = function() {
      }, r.useId = function() {
        return n.H.useId();
      }, r.useMemo = function(e2, t2) {
        return n.H.useMemo(e2, t2);
      }, r.version = "19.3.0-canary-3f0b9e61-20260317";
    }, 40049, (e, t, r) => {
      "use strict";
      t.exports = e.r(8946);
    }, 7754, 46478, 9939, 53835, 63072, 18368, (e) => {
      "use strict";
      var t = e.i(90044);
      let r = (0, t.createAsyncLocalStorage)();
      e.s(["workAsyncStorageInstance", 0, r], 46478), e.s([], 7754);
      let n = (0, t.createAsyncLocalStorage)();
      e.s(["workUnitAsyncStorageInstance", 0, n], 9939), e.s(["getPrerenderResumeDataCache", 0, function(e2) {
        switch (e2.type) {
          case "prerender":
          case "prerender-runtime":
          case "prerender-ppr":
          case "prerender-client":
          case "validation-client":
            return e2.prerenderResumeDataCache;
          case "request":
            if (e2.prerenderResumeDataCache) return e2.prerenderResumeDataCache;
          case "prerender-legacy":
          case "cache":
          case "private-cache":
          case "unstable-cache":
          case "generate-static-params":
            return null;
          default:
            return e2;
        }
      }, "getRenderResumeDataCache", 0, function(e2) {
        switch (e2.type) {
          case "request":
          case "prerender":
          case "prerender-runtime":
          case "prerender-client":
          case "validation-client":
            if (e2.renderResumeDataCache) return e2.renderResumeDataCache;
          case "prerender-ppr":
            return e2.prerenderResumeDataCache ?? null;
          case "cache":
          case "private-cache":
          case "unstable-cache":
          case "prerender-legacy":
          case "generate-static-params":
            return null;
          default:
            return e2;
        }
      }], 53835);
      var i = e.i(40049);
      let a = "function" == typeof i.default.unstable_postpone;
      function o(e2, t2) {
        return `Route ${e2} needs to bail out of prerendering at this point because it used ${t2}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
      }
      function s(e2) {
        return e2.includes("needs to bail out of prerendering at this point because it used") && e2.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error");
      }
      if (false === s(o("%%%", "^^^"))) throw Object.defineProperty(Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E296", enumerable: false, configurable: true });
      let l = "NEXT_PRERENDER_INTERRUPTED";
      function u(e2) {
        let t2 = Object.defineProperty(Error(e2), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        return t2.digest = l, t2;
      }
      RegExp("\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at __next_root_layout_boundary__ \\([^\\n]*\\)"), RegExp("\\n\\s+at __next_metadata_boundary__[\\n\\s]"), RegExp("\\n\\s+at __next_viewport_boundary__[\\n\\s]"), RegExp("\\n\\s+at __next_outlet_boundary__[\\n\\s]"), RegExp("\\n\\s+at __next_instant_validation_boundary__[\\n\\s]"), e.s(["abortAndThrowOnSynchronousRequestDataAccess", 0, function(e2, t2, r2, n2) {
        if (false === n2.controller.signal.aborted) {
          let i2, a2;
          i2 = u(`Route ${e2} needs to bail out of prerendering at this point because it used ${t2}.`), n2.controller.abort(i2), (a2 = n2.dynamicTracking) && a2.dynamicAccesses.push({ stack: a2.isDebugDynamicAccesses ? Error().stack : void 0, expression: t2 });
          let o2 = n2.dynamicTracking;
          o2 && null === o2.syncDynamicErrorWithStack && (o2.syncDynamicErrorWithStack = r2);
        }
        throw u(`Route ${e2} needs to bail out of prerendering at this point because it used ${t2}.`);
      }, "isDynamicPostpone", 0, function(e2) {
        return "object" == typeof e2 && null !== e2 && "string" == typeof e2.message && s(e2.message);
      }, "isPrerenderInterruptedError", 0, function(e2) {
        return "object" == typeof e2 && null !== e2 && e2.digest === l && "name" in e2 && "message" in e2 && e2 instanceof Error;
      }, "postponeWithTracking", 0, function(e2, t2, r2) {
        (function() {
          if (!a) throw Object.defineProperty(Error("Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E224", enumerable: false, configurable: true });
        })(), r2 && r2.dynamicAccesses.push({ stack: r2.isDebugDynamicAccesses ? Error().stack : void 0, expression: t2 }), i.default.unstable_postpone(o(e2, t2));
      }, "trackDynamicDataInDynamicRender", 0, function(e2) {
        switch (e2.type) {
          case "cache":
          case "unstable-cache":
          case "private-cache":
            return;
        }
      }], 63072);
      let c = "DYNAMIC_SERVER_USAGE";
      e.s(["DynamicServerError", 0, class extends Error {
        constructor(e2) {
          super(`Dynamic server usage: ${e2}`), this.description = e2, this.digest = c;
        }
      }, "isDynamicServerError", 0, function(e2) {
        return "object" == typeof e2 && null !== e2 && "digest" in e2 && "string" == typeof e2.digest && e2.digest === c;
      }], 18368);
    }, 91375, (e) => {
      "use strict";
      let t = (0, e.i(90044).createAsyncLocalStorage)();
      e.s([], 92999), e.i(92999), e.s(["actionAsyncStorage", 0, t], 91375);
    }, 82748, (e) => {
      "use strict";
      /* @__PURE__ */ new WeakMap();
      let t = Symbol.for("react.postpone"), r = new Set(Object.values({ NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 }));
      var n, i = ((n = {})[n.SeeOther = 303] = "SeeOther", n[n.TemporaryRedirect = 307] = "TemporaryRedirect", n[n.PermanentRedirect = 308] = "PermanentRedirect", n), a = e.i(63072), o = e.i(18368);
      e.s(["unstable_rethrow", 0, function e2(n2) {
        if (function(e3) {
          if ("object" != typeof e3 || null === e3 || !("digest" in e3) || "string" != typeof e3.digest) return false;
          let t2 = e3.digest.split(";"), [r2, n3] = t2, a2 = t2.slice(2, -2).join(";"), o2 = Number(t2.at(-2));
          return "NEXT_REDIRECT" === r2 && ("replace" === n3 || "push" === n3) && "string" == typeof a2 && !isNaN(o2) && o2 in i;
        }(n2) || function(e3) {
          if ("object" != typeof e3 || null === e3 || !("digest" in e3) || "string" != typeof e3.digest) return false;
          let [t2, n3] = e3.digest.split(";");
          return "NEXT_HTTP_ERROR_FALLBACK" === t2 && r.has(Number(n3));
        }(n2) || "object" == typeof n2 && null !== n2 && "digest" in n2 && "BAILOUT_TO_CLIENT_SIDE_RENDERING" === n2.digest || (0, o.isDynamicServerError)(n2) || (0, a.isDynamicPostpone)(n2) || "object" == typeof n2 && null !== n2 && n2.$$typeof === t || "object" == typeof n2 && null !== n2 && "digest" in n2 && "HANGING_PROMISE_REJECTION" === n2.digest || (0, a.isPrerenderInterruptedError)(n2)) throw n2;
        n2 instanceof Error && "cause" in n2 && e2(n2.cause);
      }], 82748);
    }, 84898, (e, t, r) => {
      "use strict";
      var n, i, a = Object.defineProperty, o = Object.getOwnPropertyDescriptor, s = Object.getOwnPropertyNames, l = Object.prototype.hasOwnProperty, u = {}, c = { AnyNull: () => R, AnyNullClass: () => S, DbNull: () => O, DbNullClass: () => x, Decimal: () => tt, JsonNull: () => P, JsonNullClass: () => I, NullTypes: () => T, ObjectEnumValue: () => E, PrismaClientInitializationError: () => p, PrismaClientKnownRequestError: () => g, PrismaClientRustError: () => A, PrismaClientRustPanicError: () => m, PrismaClientUnknownRequestError: () => y, PrismaClientValidationError: () => w, Sql: () => tr, empty: () => ta, hasBatchIndex: () => h, isAnyNull: () => D, isDbNull: () => k, isJsonNull: () => B, isObjectEnumValue: () => N, join: () => tn, raw: () => ti, sql: () => to };
      for (var d in c) a(u, d, { get: c[d], enumerable: true });
      function h(e10) {
        return "number" == typeof e10.batchRequestIdx;
      }
      function f(e10, t2) {
        Object.defineProperty(e10, "name", { value: t2, configurable: true });
      }
      t.exports = ((e10, t2, r2, n2) => {
        if (t2 && "object" == typeof t2 || "function" == typeof t2) for (let i2 of s(t2)) l.call(e10, i2) || i2 === r2 || a(e10, i2, { get: () => t2[i2], enumerable: !(n2 = o(t2, i2)) || n2.enumerable });
        return e10;
      })(a({}, "__esModule", { value: true }), u);
      var p = class e10 extends Error {
        clientVersion;
        errorCode;
        retryable;
        constructor(t2, r2, n2) {
          super(t2), this.name = "PrismaClientInitializationError", this.clientVersion = r2, this.errorCode = n2, Error.captureStackTrace(e10);
        }
        get [Symbol.toStringTag]() {
          return "PrismaClientInitializationError";
        }
      };
      f(p, "PrismaClientInitializationError");
      var g = class extends Error {
        code;
        meta;
        clientVersion;
        batchRequestIdx;
        constructor(e10, { code: t2, clientVersion: r2, meta: n2, batchRequestIdx: i2 }) {
          super(e10), this.name = "PrismaClientKnownRequestError", this.code = t2, this.clientVersion = r2, this.meta = n2, Object.defineProperty(this, "batchRequestIdx", { value: i2, enumerable: false, writable: true });
        }
        get [Symbol.toStringTag]() {
          return "PrismaClientKnownRequestError";
        }
      };
      f(g, "PrismaClientKnownRequestError");
      var A = class extends Error {
        clientVersion;
        _isPanic;
        constructor({ clientVersion: e10, error: t2 }) {
          super(function(e11) {
            if (e11.fields?.message) {
              let t3 = e11.fields?.message;
              return e11.fields?.file && (t3 += ` in ${e11.fields.file}`, e11.fields?.line && (t3 += `:${e11.fields.line}`), e11.fields?.column && (t3 += `:${e11.fields.column}`)), e11.fields?.reason && (t3 += `
${e11.fields?.reason}`), t3;
            }
            return "Unknown error";
          }(t2) ?? "Unknown error"), this._isPanic = function(e11) {
            return e11.fields?.message === "PANIC";
          }(t2), this.clientVersion = e10;
        }
        get [Symbol.toStringTag]() {
          return "PrismaClientRustError";
        }
        isPanic() {
          return this._isPanic;
        }
      };
      f(A, "PrismaClientRustError");
      var m = class extends Error {
        clientVersion;
        constructor(e10, t2) {
          super(e10), this.name = "PrismaClientRustPanicError", this.clientVersion = t2;
        }
        get [Symbol.toStringTag]() {
          return "PrismaClientRustPanicError";
        }
      };
      f(m, "PrismaClientRustPanicError");
      var y = class extends Error {
        clientVersion;
        batchRequestIdx;
        constructor(e10, { clientVersion: t2, batchRequestIdx: r2 }) {
          super(e10), this.name = "PrismaClientUnknownRequestError", this.clientVersion = t2, Object.defineProperty(this, "batchRequestIdx", { value: r2, writable: true, enumerable: false });
        }
        get [Symbol.toStringTag]() {
          return "PrismaClientUnknownRequestError";
        }
      };
      f(y, "PrismaClientUnknownRequestError");
      var w = class extends Error {
        name = "PrismaClientValidationError";
        clientVersion;
        constructor(e10, { clientVersion: t2 }) {
          super(e10), this.clientVersion = t2;
        }
        get [Symbol.toStringTag]() {
          return "PrismaClientValidationError";
        }
      };
      f(w, "PrismaClientValidationError");
      var b = Symbol(), v = Symbol.for("prisma.objectEnumValue"), E = class {
        [v] = true;
        #e;
        constructor(e10) {
          e10 === b ? this.#e = `Prisma.${this._getName()}` : this.#e = `new Prisma.${this._getNamespace()}.${this._getName()}()`;
        }
        _getName() {
          return this.constructor.name;
        }
        toString() {
          return this.#e;
        }
      };
      function _(e10, t2) {
        Object.defineProperty(e10, "name", { value: t2, configurable: true });
      }
      var C = class extends E {
        _getNamespace() {
          return "NullTypes";
        }
      }, x = class extends C {
        #t;
      };
      _(x, "DbNull");
      var I = class extends C {
        #r;
      };
      _(I, "JsonNull");
      var S = class extends C {
        #n;
      };
      _(S, "AnyNull");
      var T = { DbNull: x, JsonNull: I, AnyNull: S }, O = new x(b), P = new I(b), R = new S(b);
      function N(e10) {
        return "object" == typeof e10 && null !== e10 && true === e10[v];
      }
      function k(e10) {
        return e10 === O;
      }
      function B(e10) {
        return e10 === P;
      }
      function D(e10) {
        return e10 === R;
      }
      var M = "0123456789abcdef", $ = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058", j = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789", L = { precision: 20, rounding: 4, modulo: 1, toExpNeg: -7, toExpPos: 21, minE: -9e15, maxE: 9e15, crypto: false }, q = true, F = "[DecimalError] ", Q = F + "Invalid argument: ", U = F + "Precision limit exceeded", V = F + "crypto unavailable", H = "[object Decimal]", W = Math.floor, G = Math.pow, X = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i, J = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i, z = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i, K = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, Y = $.length - 1, Z = j.length - 1, ee = { toStringTag: H };
      function et(e10) {
        var t2, r2, n2, i2 = e10.length - 1, a2 = "", o2 = e10[0];
        if (i2 > 0) {
          for (a2 += o2, t2 = 1; t2 < i2; t2++) (r2 = 7 - (n2 = e10[t2] + "").length) && (a2 += eh(r2)), a2 += n2;
          (r2 = 7 - (n2 = (o2 = e10[t2]) + "").length) && (a2 += eh(r2));
        } else if (0 === o2) return "0";
        for (; o2 % 10 == 0; ) o2 /= 10;
        return a2 + o2;
      }
      function er(e10, t2, r2) {
        if (e10 !== ~~e10 || e10 < t2 || e10 > r2) throw Error(Q + e10);
      }
      function en(e10, t2, r2, n2) {
        var i2, a2, o2, s2;
        for (a2 = e10[0]; a2 >= 10; a2 /= 10) --t2;
        return --t2 < 0 ? (t2 += 7, i2 = 0) : (i2 = Math.ceil((t2 + 1) / 7), t2 %= 7), a2 = G(10, 7 - t2), s2 = e10[i2] % a2 | 0, null == n2 ? t2 < 3 ? (0 == t2 ? s2 = s2 / 100 | 0 : 1 == t2 && (s2 = s2 / 10 | 0), o2 = r2 < 4 && 99999 == s2 || r2 > 3 && 49999 == s2 || 5e4 == s2 || 0 == s2) : o2 = (r2 < 4 && s2 + 1 == a2 || r2 > 3 && s2 + 1 == a2 / 2) && (e10[i2 + 1] / a2 / 100 | 0) == G(10, t2 - 2) - 1 || (s2 == a2 / 2 || 0 == s2) && (e10[i2 + 1] / a2 / 100 | 0) == 0 : t2 < 4 ? (0 == t2 ? s2 = s2 / 1e3 | 0 : 1 == t2 ? s2 = s2 / 100 | 0 : 2 == t2 && (s2 = s2 / 10 | 0), o2 = (n2 || r2 < 4) && 9999 == s2 || !n2 && r2 > 3 && 4999 == s2) : o2 = ((n2 || r2 < 4) && s2 + 1 == a2 || !n2 && r2 > 3 && s2 + 1 == a2 / 2) && (e10[i2 + 1] / a2 / 1e3 | 0) == G(10, t2 - 3) - 1, o2;
      }
      function ei(e10, t2, r2) {
        for (var n2, i2, a2 = [0], o2 = 0, s2 = e10.length; o2 < s2; ) {
          for (i2 = a2.length; i2--; ) a2[i2] *= t2;
          for (a2[0] += M.indexOf(e10.charAt(o2++)), n2 = 0; n2 < a2.length; n2++) a2[n2] > r2 - 1 && (void 0 === a2[n2 + 1] && (a2[n2 + 1] = 0), a2[n2 + 1] += a2[n2] / r2 | 0, a2[n2] %= r2);
        }
        return a2.reverse();
      }
      ee.absoluteValue = ee.abs = function() {
        var e10 = new this.constructor(this);
        return e10.s < 0 && (e10.s = 1), eo(e10);
      }, ee.ceil = function() {
        return eo(new this.constructor(this), this.e + 1, 2);
      }, ee.clampedTo = ee.clamp = function(e10, t2) {
        var r2 = this.constructor;
        if (e10 = new r2(e10), t2 = new r2(t2), !e10.s || !t2.s) return new r2(NaN);
        if (e10.gt(t2)) throw Error(Q + t2);
        return 0 > this.cmp(e10) ? e10 : this.cmp(t2) > 0 ? t2 : new r2(this);
      }, ee.comparedTo = ee.cmp = function(e10) {
        var t2, r2, n2, i2, a2 = this.d, o2 = (e10 = new this.constructor(e10)).d, s2 = this.s, l2 = e10.s;
        if (!a2 || !o2) return s2 && l2 ? s2 !== l2 ? s2 : a2 === o2 ? 0 : !a2 ^ s2 < 0 ? 1 : -1 : NaN;
        if (!a2[0] || !o2[0]) return a2[0] ? s2 : o2[0] ? -l2 : 0;
        if (s2 !== l2) return s2;
        if (this.e !== e10.e) return this.e > e10.e ^ s2 < 0 ? 1 : -1;
        for (t2 = 0, r2 = (n2 = a2.length) < (i2 = o2.length) ? n2 : i2; t2 < r2; ++t2) if (a2[t2] !== o2[t2]) return a2[t2] > o2[t2] ^ s2 < 0 ? 1 : -1;
        return n2 === i2 ? 0 : n2 > i2 ^ s2 < 0 ? 1 : -1;
      }, ee.cosine = ee.cos = function() {
        var e10, t2, r2 = this, n2 = r2.constructor;
        return r2.d ? r2.d[0] ? (e10 = n2.precision, t2 = n2.rounding, n2.precision = e10 + Math.max(r2.e, r2.sd()) + 7, n2.rounding = 1, r2 = function(e11, t3) {
          var r3, n3, i2;
          if (t3.isZero()) return t3;
          (n3 = t3.d.length) < 32 ? i2 = (1 / ev(4, r3 = Math.ceil(n3 / 3))).toString() : (r3 = 16, i2 = "2.3283064365386962890625e-10"), e11.precision += r3, t3 = eb(e11, 1, t3.times(i2), new e11(1));
          for (var a2 = r3; a2--; ) {
            var o2 = t3.times(t3);
            t3 = o2.times(o2).minus(o2).times(8).plus(1);
          }
          return e11.precision -= r3, t3;
        }(n2, eE(n2, r2)), n2.precision = e10, n2.rounding = t2, eo(2 == i || 3 == i ? r2.neg() : r2, e10, t2, true)) : new n2(1) : new n2(NaN);
      }, ee.cubeRoot = ee.cbrt = function() {
        var e10, t2, r2, n2, i2, a2, o2, s2, l2, u2, c2 = this.constructor;
        if (!this.isFinite() || this.isZero()) return new c2(this);
        for (q = false, (a2 = this.s * G(this.s * this, 1 / 3)) && Math.abs(a2) != 1 / 0 ? n2 = new c2(a2.toString()) : (r2 = et(this.d), (a2 = ((e10 = this.e) - r2.length + 1) % 3) && (r2 += 1 == a2 || -2 == a2 ? "0" : "00"), a2 = G(r2, 1 / 3), e10 = W((e10 + 1) / 3) - (e10 % 3 == (e10 < 0 ? -1 : 2)), (n2 = new c2(r2 = a2 == 1 / 0 ? "5e" + e10 : (r2 = a2.toExponential()).slice(0, r2.indexOf("e") + 1) + e10)).s = this.s), o2 = (e10 = c2.precision) + 3; ; ) if (n2 = ea((u2 = (l2 = (s2 = n2).times(s2).times(s2)).plus(this)).plus(this).times(s2), u2.plus(l2), o2 + 2, 1), et(s2.d).slice(0, o2) === (r2 = et(n2.d)).slice(0, o2)) {
          if ("9999" != (r2 = r2.slice(o2 - 3, o2 + 1)) && (i2 || "4999" != r2)) {
            +r2 && (+r2.slice(1) || "5" != r2.charAt(0)) || (eo(n2, e10 + 1, 1), t2 = !n2.times(n2).times(n2).eq(this));
            break;
          }
          if (!i2 && (eo(s2, e10 + 1, 0), s2.times(s2).times(s2).eq(this))) {
            n2 = s2;
            break;
          }
          o2 += 4, i2 = 1;
        }
        return q = true, eo(n2, e10, c2.rounding, t2);
      }, ee.decimalPlaces = ee.dp = function() {
        var e10, t2 = this.d, r2 = NaN;
        if (t2) {
          if (r2 = ((e10 = t2.length - 1) - W(this.e / 7)) * 7, e10 = t2[e10]) for (; e10 % 10 == 0; e10 /= 10) r2--;
          r2 < 0 && (r2 = 0);
        }
        return r2;
      }, ee.dividedBy = ee.div = function(e10) {
        return ea(this, new this.constructor(e10));
      }, ee.dividedToIntegerBy = ee.divToInt = function(e10) {
        var t2 = this.constructor;
        return eo(ea(this, new t2(e10), 0, 1, 1), t2.precision, t2.rounding);
      }, ee.equals = ee.eq = function(e10) {
        return 0 === this.cmp(e10);
      }, ee.floor = function() {
        return eo(new this.constructor(this), this.e + 1, 3);
      }, ee.greaterThan = ee.gt = function(e10) {
        return this.cmp(e10) > 0;
      }, ee.greaterThanOrEqualTo = ee.gte = function(e10) {
        var t2 = this.cmp(e10);
        return 1 == t2 || 0 === t2;
      }, ee.hyperbolicCosine = ee.cosh = function() {
        var e10, t2, r2, n2, i2, a2 = this, o2 = a2.constructor, s2 = new o2(1);
        if (!a2.isFinite()) return new o2(a2.s ? 1 / 0 : NaN);
        if (a2.isZero()) return s2;
        r2 = o2.precision, n2 = o2.rounding, o2.precision = r2 + Math.max(a2.e, a2.sd()) + 4, o2.rounding = 1, (i2 = a2.d.length) < 32 ? t2 = (1 / ev(4, e10 = Math.ceil(i2 / 3))).toString() : (e10 = 16, t2 = "2.3283064365386962890625e-10"), a2 = eb(o2, 1, a2.times(t2), new o2(1), true);
        for (var l2, u2 = e10, c2 = new o2(8); u2--; ) l2 = a2.times(a2), a2 = s2.minus(l2.times(c2.minus(l2.times(c2))));
        return eo(a2, o2.precision = r2, o2.rounding = n2, true);
      }, ee.hyperbolicSine = ee.sinh = function() {
        var e10, t2, r2, n2, i2 = this, a2 = i2.constructor;
        if (!i2.isFinite() || i2.isZero()) return new a2(i2);
        if (t2 = a2.precision, r2 = a2.rounding, a2.precision = t2 + Math.max(i2.e, i2.sd()) + 4, a2.rounding = 1, (n2 = i2.d.length) < 3) i2 = eb(a2, 2, i2, i2, true);
        else {
          e10 = (e10 = 1.4 * Math.sqrt(n2)) > 16 ? 16 : 0 | e10, i2 = eb(a2, 2, i2 = i2.times(1 / ev(5, e10)), i2, true);
          for (var o2, s2 = new a2(5), l2 = new a2(16), u2 = new a2(20); e10--; ) o2 = i2.times(i2), i2 = i2.times(s2.plus(o2.times(l2.times(o2).plus(u2))));
        }
        return a2.precision = t2, a2.rounding = r2, eo(i2, t2, r2, true);
      }, ee.hyperbolicTangent = ee.tanh = function() {
        var e10, t2, r2 = this.constructor;
        return this.isFinite() ? this.isZero() ? new r2(this) : (e10 = r2.precision, t2 = r2.rounding, r2.precision = e10 + 7, r2.rounding = 1, ea(this.sinh(), this.cosh(), r2.precision = e10, r2.rounding = t2)) : new r2(this.s);
      }, ee.inverseCosine = ee.acos = function() {
        var e10 = this, t2 = e10.constructor, r2 = e10.abs().cmp(1), n2 = t2.precision, i2 = t2.rounding;
        return -1 !== r2 ? 0 === r2 ? e10.isNeg() ? ec(t2, n2, i2) : new t2(0) : new t2(NaN) : e10.isZero() ? ec(t2, n2 + 4, i2).times(0.5) : (t2.precision = n2 + 6, t2.rounding = 1, e10 = new t2(1).minus(e10).div(e10.plus(1)).sqrt().atan(), t2.precision = n2, t2.rounding = i2, e10.times(2));
      }, ee.inverseHyperbolicCosine = ee.acosh = function() {
        var e10, t2, r2 = this, n2 = r2.constructor;
        return r2.lte(1) ? new n2(r2.eq(1) ? 0 : NaN) : r2.isFinite() ? (e10 = n2.precision, t2 = n2.rounding, n2.precision = e10 + Math.max(Math.abs(r2.e), r2.sd()) + 4, n2.rounding = 1, q = false, r2 = r2.times(r2).minus(1).sqrt().plus(r2), q = true, n2.precision = e10, n2.rounding = t2, r2.ln()) : new n2(r2);
      }, ee.inverseHyperbolicSine = ee.asinh = function() {
        var e10, t2, r2 = this, n2 = r2.constructor;
        return !r2.isFinite() || r2.isZero() ? new n2(r2) : (e10 = n2.precision, t2 = n2.rounding, n2.precision = e10 + 2 * Math.max(Math.abs(r2.e), r2.sd()) + 6, n2.rounding = 1, q = false, r2 = r2.times(r2).plus(1).sqrt().plus(r2), q = true, n2.precision = e10, n2.rounding = t2, r2.ln());
      }, ee.inverseHyperbolicTangent = ee.atanh = function() {
        var e10, t2, r2, n2, i2 = this, a2 = i2.constructor;
        return i2.isFinite() ? i2.e >= 0 ? new a2(i2.abs().eq(1) ? i2.s / 0 : i2.isZero() ? i2 : NaN) : (e10 = a2.precision, t2 = a2.rounding, Math.max(n2 = i2.sd(), e10) < -(2 * i2.e) - 1) ? eo(new a2(i2), e10, t2, true) : (a2.precision = r2 = n2 - i2.e, i2 = ea(i2.plus(1), new a2(1).minus(i2), r2 + e10, 1), a2.precision = e10 + 4, a2.rounding = 1, i2 = i2.ln(), a2.precision = e10, a2.rounding = t2, i2.times(0.5)) : new a2(NaN);
      }, ee.inverseSine = ee.asin = function() {
        var e10, t2, r2, n2, i2 = this, a2 = i2.constructor;
        return i2.isZero() ? new a2(i2) : (t2 = i2.abs().cmp(1), r2 = a2.precision, n2 = a2.rounding, -1 !== t2) ? 0 === t2 ? ((e10 = ec(a2, r2 + 4, n2).times(0.5)).s = i2.s, e10) : new a2(NaN) : (a2.precision = r2 + 6, a2.rounding = 1, i2 = i2.div(new a2(1).minus(i2.times(i2)).sqrt().plus(1)).atan(), a2.precision = r2, a2.rounding = n2, i2.times(2));
      }, ee.inverseTangent = ee.atan = function() {
        var e10, t2, r2, n2, i2, a2, o2, s2, l2, u2 = this, c2 = u2.constructor, d2 = c2.precision, h2 = c2.rounding;
        if (u2.isFinite()) {
          if (u2.isZero()) return new c2(u2);
          else if (u2.abs().eq(1) && d2 + 4 <= Z) return (o2 = ec(c2, d2 + 4, h2).times(0.25)).s = u2.s, o2;
        } else {
          if (!u2.s) return new c2(NaN);
          if (d2 + 4 <= Z) return (o2 = ec(c2, d2 + 4, h2).times(0.5)).s = u2.s, o2;
        }
        for (c2.precision = s2 = d2 + 10, c2.rounding = 1, e10 = r2 = Math.min(28, s2 / 7 + 2 | 0); e10; --e10) u2 = u2.div(u2.times(u2).plus(1).sqrt().plus(1));
        for (q = false, t2 = Math.ceil(s2 / 7), n2 = 1, l2 = u2.times(u2), o2 = new c2(u2), i2 = u2; -1 !== e10; ) if (i2 = i2.times(l2), a2 = o2.minus(i2.div(n2 += 2)), i2 = i2.times(l2), void 0 !== (o2 = a2.plus(i2.div(n2 += 2))).d[t2]) for (e10 = t2; o2.d[e10] === a2.d[e10] && e10--; ) ;
        return r2 && (o2 = o2.times(2 << r2 - 1)), q = true, eo(o2, c2.precision = d2, c2.rounding = h2, true);
      }, ee.isFinite = function() {
        return !!this.d;
      }, ee.isInteger = ee.isInt = function() {
        return !!this.d && W(this.e / 7) > this.d.length - 2;
      }, ee.isNaN = function() {
        return !this.s;
      }, ee.isNegative = ee.isNeg = function() {
        return this.s < 0;
      }, ee.isPositive = ee.isPos = function() {
        return this.s > 0;
      }, ee.isZero = function() {
        return !!this.d && 0 === this.d[0];
      }, ee.lessThan = ee.lt = function(e10) {
        return 0 > this.cmp(e10);
      }, ee.lessThanOrEqualTo = ee.lte = function(e10) {
        return 1 > this.cmp(e10);
      }, ee.logarithm = ee.log = function(e10) {
        var t2, r2, n2, i2, a2, o2, s2, l2 = this.constructor, u2 = l2.precision, c2 = l2.rounding;
        if (null == e10) e10 = new l2(10), t2 = true;
        else {
          if (r2 = (e10 = new l2(e10)).d, e10.s < 0 || !r2 || !r2[0] || e10.eq(1)) return new l2(NaN);
          t2 = e10.eq(10);
        }
        if (r2 = this.d, this.s < 0 || !r2 || !r2[0] || this.eq(1)) return new l2(r2 && !r2[0] ? -1 / 0 : 1 != this.s ? NaN : r2 ? 0 : 1 / 0);
        if (t2) if (r2.length > 1) i2 = true;
        else {
          for (n2 = r2[0]; n2 % 10 == 0; ) n2 /= 10;
          i2 = 1 !== n2;
        }
        if (q = false, en((s2 = ea(a2 = em(this, o2 = u2 + 5), t2 ? eu(l2, o2 + 10) : em(e10, o2), o2, 1)).d, n2 = u2, c2)) do
          if (o2 += 10, s2 = ea(a2 = em(this, o2), t2 ? eu(l2, o2 + 10) : em(e10, o2), o2, 1), !i2) {
            +et(s2.d).slice(n2 + 1, n2 + 15) + 1 == 1e14 && (s2 = eo(s2, u2 + 1, 0));
            break;
          }
        while (en(s2.d, n2 += 10, c2));
        return q = true, eo(s2, u2, c2);
      }, ee.minus = ee.sub = function(e10) {
        var t2, r2, n2, i2, a2, o2, s2, l2, u2, c2, d2, h2, f2 = this.constructor;
        if (e10 = new f2(e10), !this.d || !e10.d) return this.s && e10.s ? this.d ? e10.s = -e10.s : e10 = new f2(e10.d || this.s !== e10.s ? this : NaN) : e10 = new f2(NaN), e10;
        if (this.s != e10.s) return e10.s = -e10.s, this.plus(e10);
        if (u2 = this.d, h2 = e10.d, s2 = f2.precision, l2 = f2.rounding, !u2[0] || !h2[0]) {
          if (h2[0]) e10.s = -e10.s;
          else {
            if (!u2[0]) return new f2(3 === l2 ? -0 : 0);
            e10 = new f2(this);
          }
          return q ? eo(e10, s2, l2) : e10;
        }
        if (r2 = W(e10.e / 7), c2 = W(this.e / 7), u2 = u2.slice(), a2 = c2 - r2) {
          for ((d2 = a2 < 0) ? (t2 = u2, a2 = -a2, o2 = h2.length) : (t2 = h2, r2 = c2, o2 = u2.length), a2 > (n2 = Math.max(Math.ceil(s2 / 7), o2) + 2) && (a2 = n2, t2.length = 1), t2.reverse(), n2 = a2; n2--; ) t2.push(0);
          t2.reverse();
        } else {
          for ((d2 = (n2 = u2.length) < (o2 = h2.length)) && (o2 = n2), n2 = 0; n2 < o2; n2++) if (u2[n2] != h2[n2]) {
            d2 = u2[n2] < h2[n2];
            break;
          }
          a2 = 0;
        }
        for (d2 && (t2 = u2, u2 = h2, h2 = t2, e10.s = -e10.s), o2 = u2.length, n2 = h2.length - o2; n2 > 0; --n2) u2[o2++] = 0;
        for (n2 = h2.length; n2 > a2; ) {
          if (u2[--n2] < h2[n2]) {
            for (i2 = n2; i2 && 0 === u2[--i2]; ) u2[i2] = 1e7 - 1;
            --u2[i2], u2[n2] += 1e7;
          }
          u2[n2] -= h2[n2];
        }
        for (; 0 === u2[--o2]; ) u2.pop();
        for (; 0 === u2[0]; u2.shift()) --r2;
        return u2[0] ? (e10.d = u2, e10.e = el(u2, r2), q ? eo(e10, s2, l2) : e10) : new f2(3 === l2 ? -0 : 0);
      }, ee.modulo = ee.mod = function(e10) {
        var t2, r2 = this.constructor;
        return (e10 = new r2(e10), this.d && e10.s && (!e10.d || e10.d[0])) ? e10.d && (!this.d || this.d[0]) ? (q = false, 9 == r2.modulo ? (t2 = ea(this, e10.abs(), 0, 3, 1), t2.s *= e10.s) : t2 = ea(this, e10, 0, r2.modulo, 1), t2 = t2.times(e10), q = true, this.minus(t2)) : eo(new r2(this), r2.precision, r2.rounding) : new r2(NaN);
      }, ee.naturalExponential = ee.exp = function() {
        return eA(this);
      }, ee.naturalLogarithm = ee.ln = function() {
        return em(this);
      }, ee.negated = ee.neg = function() {
        var e10 = new this.constructor(this);
        return e10.s = -e10.s, eo(e10);
      }, ee.plus = ee.add = function(e10) {
        var t2, r2, n2, i2, a2, o2, s2, l2, u2, c2, d2 = this.constructor;
        if (e10 = new d2(e10), !this.d || !e10.d) return this.s && e10.s ? this.d || (e10 = new d2(e10.d || this.s === e10.s ? this : NaN)) : e10 = new d2(NaN), e10;
        if (this.s != e10.s) return e10.s = -e10.s, this.minus(e10);
        if (u2 = this.d, c2 = e10.d, s2 = d2.precision, l2 = d2.rounding, !u2[0] || !c2[0]) return c2[0] || (e10 = new d2(this)), q ? eo(e10, s2, l2) : e10;
        if (a2 = W(this.e / 7), n2 = W(e10.e / 7), u2 = u2.slice(), i2 = a2 - n2) {
          for (i2 < 0 ? (r2 = u2, i2 = -i2, o2 = c2.length) : (r2 = c2, n2 = a2, o2 = u2.length), i2 > (o2 = (a2 = Math.ceil(s2 / 7)) > o2 ? a2 + 1 : o2 + 1) && (i2 = o2, r2.length = 1), r2.reverse(); i2--; ) r2.push(0);
          r2.reverse();
        }
        for ((o2 = u2.length) - (i2 = c2.length) < 0 && (i2 = o2, r2 = c2, c2 = u2, u2 = r2), t2 = 0; i2; ) t2 = (u2[--i2] = u2[i2] + c2[i2] + t2) / 1e7 | 0, u2[i2] %= 1e7;
        for (t2 && (u2.unshift(t2), ++n2), o2 = u2.length; 0 == u2[--o2]; ) u2.pop();
        return e10.d = u2, e10.e = el(u2, n2), q ? eo(e10, s2, l2) : e10;
      }, ee.precision = ee.sd = function(e10) {
        var t2;
        if (void 0 !== e10 && !!e10 !== e10 && 1 !== e10 && 0 !== e10) throw Error(Q + e10);
        return this.d ? (t2 = ed(this.d), e10 && this.e + 1 > t2 && (t2 = this.e + 1)) : t2 = NaN, t2;
      }, ee.round = function() {
        var e10 = this.constructor;
        return eo(new e10(this), this.e + 1, e10.rounding);
      }, ee.sine = ee.sin = function() {
        var e10, t2, r2 = this, n2 = r2.constructor;
        return r2.isFinite() ? r2.isZero() ? new n2(r2) : (e10 = n2.precision, t2 = n2.rounding, n2.precision = e10 + Math.max(r2.e, r2.sd()) + 7, n2.rounding = 1, r2 = function(e11, t3) {
          var r3, n3 = t3.d.length;
          if (n3 < 3) return t3.isZero() ? t3 : eb(e11, 2, t3, t3);
          r3 = (r3 = 1.4 * Math.sqrt(n3)) > 16 ? 16 : 0 | r3, t3 = eb(e11, 2, t3 = t3.times(1 / ev(5, r3)), t3);
          for (var i2, a2 = new e11(5), o2 = new e11(16), s2 = new e11(20); r3--; ) i2 = t3.times(t3), t3 = t3.times(a2.plus(i2.times(o2.times(i2).minus(s2))));
          return t3;
        }(n2, eE(n2, r2)), n2.precision = e10, n2.rounding = t2, eo(i > 2 ? r2.neg() : r2, e10, t2, true)) : new n2(NaN);
      }, ee.squareRoot = ee.sqrt = function() {
        var e10, t2, r2, n2, i2, a2, o2 = this.d, s2 = this.e, l2 = this.s, u2 = this.constructor;
        if (1 !== l2 || !o2 || !o2[0]) return new u2(!l2 || l2 < 0 && (!o2 || o2[0]) ? NaN : o2 ? this : 1 / 0);
        for (q = false, 0 == (l2 = Math.sqrt(+this)) || l2 == 1 / 0 ? (((t2 = et(o2)).length + s2) % 2 == 0 && (t2 += "0"), l2 = Math.sqrt(t2), s2 = W((s2 + 1) / 2) - (s2 < 0 || s2 % 2), n2 = new u2(t2 = l2 == 1 / 0 ? "5e" + s2 : (t2 = l2.toExponential()).slice(0, t2.indexOf("e") + 1) + s2)) : n2 = new u2(l2.toString()), r2 = (s2 = u2.precision) + 3; ; ) if (n2 = (a2 = n2).plus(ea(this, a2, r2 + 2, 1)).times(0.5), et(a2.d).slice(0, r2) === (t2 = et(n2.d)).slice(0, r2)) {
          if ("9999" != (t2 = t2.slice(r2 - 3, r2 + 1)) && (i2 || "4999" != t2)) {
            +t2 && (+t2.slice(1) || "5" != t2.charAt(0)) || (eo(n2, s2 + 1, 1), e10 = !n2.times(n2).eq(this));
            break;
          }
          if (!i2 && (eo(a2, s2 + 1, 0), a2.times(a2).eq(this))) {
            n2 = a2;
            break;
          }
          r2 += 4, i2 = 1;
        }
        return q = true, eo(n2, s2, u2.rounding, e10);
      }, ee.tangent = ee.tan = function() {
        var e10, t2, r2 = this, n2 = r2.constructor;
        return r2.isFinite() ? r2.isZero() ? new n2(r2) : (e10 = n2.precision, t2 = n2.rounding, n2.precision = e10 + 10, n2.rounding = 1, (r2 = r2.sin()).s = 1, r2 = ea(r2, new n2(1).minus(r2.times(r2)).sqrt(), e10 + 10, 0), n2.precision = e10, n2.rounding = t2, eo(2 == i || 4 == i ? r2.neg() : r2, e10, t2, true)) : new n2(NaN);
      }, ee.times = ee.mul = function(e10) {
        var t2, r2, n2, i2, a2, o2, s2, l2, u2, c2 = this.constructor, d2 = this.d, h2 = (e10 = new c2(e10)).d;
        if (e10.s *= this.s, !d2 || !d2[0] || !h2 || !h2[0]) return new c2(!e10.s || d2 && !d2[0] && !h2 || h2 && !h2[0] && !d2 ? NaN : !d2 || !h2 ? e10.s / 0 : 0 * e10.s);
        for (r2 = W(this.e / 7) + W(e10.e / 7), (l2 = d2.length) < (u2 = h2.length) && (a2 = d2, d2 = h2, h2 = a2, o2 = l2, l2 = u2, u2 = o2), a2 = [], n2 = o2 = l2 + u2; n2--; ) a2.push(0);
        for (n2 = u2; --n2 >= 0; ) {
          for (t2 = 0, i2 = l2 + n2; i2 > n2; ) s2 = a2[i2] + h2[n2] * d2[i2 - n2 - 1] + t2, a2[i2--] = s2 % 1e7 | 0, t2 = s2 / 1e7 | 0;
          a2[i2] = (a2[i2] + t2) % 1e7 | 0;
        }
        for (; !a2[--o2]; ) a2.pop();
        return t2 ? ++r2 : a2.shift(), e10.d = a2, e10.e = el(a2, r2), q ? eo(e10, c2.precision, c2.rounding) : e10;
      }, ee.toBinary = function(e10, t2) {
        return e_(this, 2, e10, t2);
      }, ee.toDecimalPlaces = ee.toDP = function(e10, t2) {
        var r2 = this, n2 = r2.constructor;
        return (r2 = new n2(r2), void 0 === e10) ? r2 : (er(e10, 0, 1e9), void 0 === t2 ? t2 = n2.rounding : er(t2, 0, 8), eo(r2, e10 + r2.e + 1, t2));
      }, ee.toExponential = function(e10, t2) {
        var r2, n2 = this, i2 = n2.constructor;
        return void 0 === e10 ? r2 = es(n2, true) : (er(e10, 0, 1e9), void 0 === t2 ? t2 = i2.rounding : er(t2, 0, 8), r2 = es(n2 = eo(new i2(n2), e10 + 1, t2), true, e10 + 1)), n2.isNeg() && !n2.isZero() ? "-" + r2 : r2;
      }, ee.toFixed = function(e10, t2) {
        var r2, n2, i2 = this.constructor;
        return void 0 === e10 ? r2 = es(this) : (er(e10, 0, 1e9), void 0 === t2 ? t2 = i2.rounding : er(t2, 0, 8), r2 = es(n2 = eo(new i2(this), e10 + this.e + 1, t2), false, e10 + n2.e + 1)), this.isNeg() && !this.isZero() ? "-" + r2 : r2;
      }, ee.toFraction = function(e10) {
        var t2, r2, n2, i2, a2, o2, s2, l2, u2, c2, d2, h2, f2 = this.d, p2 = this.constructor;
        if (!f2) return new p2(this);
        if (u2 = r2 = new p2(1), n2 = l2 = new p2(0), o2 = (a2 = (t2 = new p2(n2)).e = ed(f2) - this.e - 1) % 7, t2.d[0] = G(10, o2 < 0 ? 7 + o2 : o2), null == e10) e10 = a2 > 0 ? t2 : u2;
        else {
          if (!(s2 = new p2(e10)).isInt() || s2.lt(u2)) throw Error(Q + s2);
          e10 = s2.gt(t2) ? a2 > 0 ? t2 : u2 : s2;
        }
        for (q = false, s2 = new p2(et(f2)), c2 = p2.precision, p2.precision = a2 = 7 * f2.length * 2; d2 = ea(s2, t2, 0, 1, 1), 1 != (i2 = r2.plus(d2.times(n2))).cmp(e10); ) r2 = n2, n2 = i2, i2 = u2, u2 = l2.plus(d2.times(i2)), l2 = i2, i2 = t2, t2 = s2.minus(d2.times(i2)), s2 = i2;
        return i2 = ea(e10.minus(r2), n2, 0, 1, 1), l2 = l2.plus(i2.times(u2)), r2 = r2.plus(i2.times(n2)), l2.s = u2.s = this.s, h2 = 1 > ea(u2, n2, a2, 1).minus(this).abs().cmp(ea(l2, r2, a2, 1).minus(this).abs()) ? [u2, n2] : [l2, r2], p2.precision = c2, q = true, h2;
      }, ee.toHexadecimal = ee.toHex = function(e10, t2) {
        return e_(this, 16, e10, t2);
      }, ee.toNearest = function(e10, t2) {
        var r2 = this, n2 = r2.constructor;
        if (r2 = new n2(r2), null == e10) {
          if (!r2.d) return r2;
          e10 = new n2(1), t2 = n2.rounding;
        } else {
          if (e10 = new n2(e10), void 0 === t2 ? t2 = n2.rounding : er(t2, 0, 8), !r2.d) return e10.s ? r2 : e10;
          if (!e10.d) return e10.s && (e10.s = r2.s), e10;
        }
        return e10.d[0] ? (q = false, r2 = ea(r2, e10, 0, t2, 1).times(e10), q = true, eo(r2)) : (e10.s = r2.s, r2 = e10), r2;
      }, ee.toNumber = function() {
        return +this;
      }, ee.toOctal = function(e10, t2) {
        return e_(this, 8, e10, t2);
      }, ee.toPower = ee.pow = function(e10) {
        var t2, r2, n2, i2, a2, o2, s2 = this, l2 = s2.constructor, u2 = +(e10 = new l2(e10));
        if (!s2.d || !e10.d || !s2.d[0] || !e10.d[0]) return new l2(G(+s2, u2));
        if ((s2 = new l2(s2)).eq(1)) return s2;
        if (n2 = l2.precision, a2 = l2.rounding, e10.eq(1)) return eo(s2, n2, a2);
        if ((t2 = W(e10.e / 7)) >= e10.d.length - 1 && (r2 = u2 < 0 ? -u2 : u2) <= 9007199254740991) return i2 = ef(l2, s2, r2, n2), e10.s < 0 ? new l2(1).div(i2) : eo(i2, n2, a2);
        if ((o2 = s2.s) < 0) {
          if (t2 < e10.d.length - 1) return new l2(NaN);
          if ((1 & e10.d[t2]) == 0 && (o2 = 1), 0 == s2.e && 1 == s2.d[0] && 1 == s2.d.length) return s2.s = o2, s2;
        }
        return (t2 = 0 != (r2 = G(+s2, u2)) && isFinite(r2) ? new l2(r2 + "").e : W(u2 * (Math.log("0." + et(s2.d)) / Math.LN10 + s2.e + 1))) > l2.maxE + 1 || t2 < l2.minE - 1 ? new l2(t2 > 0 ? o2 / 0 : 0) : (q = false, l2.rounding = s2.s = 1, r2 = Math.min(12, (t2 + "").length), (i2 = eA(e10.times(em(s2, n2 + r2)), n2)).d && en((i2 = eo(i2, n2 + 5, 1)).d, n2, a2) && (t2 = n2 + 10, +et((i2 = eo(eA(e10.times(em(s2, t2 + r2)), t2), t2 + 5, 1)).d).slice(n2 + 1, n2 + 15) + 1 == 1e14 && (i2 = eo(i2, n2 + 1, 0))), i2.s = o2, q = true, l2.rounding = a2, eo(i2, n2, a2));
      }, ee.toPrecision = function(e10, t2) {
        var r2, n2 = this, i2 = n2.constructor;
        return void 0 === e10 ? r2 = es(n2, n2.e <= i2.toExpNeg || n2.e >= i2.toExpPos) : (er(e10, 1, 1e9), void 0 === t2 ? t2 = i2.rounding : er(t2, 0, 8), r2 = es(n2 = eo(new i2(n2), e10, t2), e10 <= n2.e || n2.e <= i2.toExpNeg, e10)), n2.isNeg() && !n2.isZero() ? "-" + r2 : r2;
      }, ee.toSignificantDigits = ee.toSD = function(e10, t2) {
        var r2 = this.constructor;
        return void 0 === e10 ? (e10 = r2.precision, t2 = r2.rounding) : (er(e10, 1, 1e9), void 0 === t2 ? t2 = r2.rounding : er(t2, 0, 8)), eo(new r2(this), e10, t2);
      }, ee.toString = function() {
        var e10 = this.constructor, t2 = es(this, this.e <= e10.toExpNeg || this.e >= e10.toExpPos);
        return this.isNeg() && !this.isZero() ? "-" + t2 : t2;
      }, ee.truncated = ee.trunc = function() {
        return eo(new this.constructor(this), this.e + 1, 1);
      }, ee.valueOf = ee.toJSON = function() {
        var e10 = this.constructor, t2 = es(this, this.e <= e10.toExpNeg || this.e >= e10.toExpPos);
        return this.isNeg() ? "-" + t2 : t2;
      };
      var ea = /* @__PURE__ */ function() {
        function e10(e11, t3, r3) {
          var n2, i2 = 0, a2 = e11.length;
          for (e11 = e11.slice(); a2--; ) n2 = e11[a2] * t3 + i2, e11[a2] = n2 % r3 | 0, i2 = n2 / r3 | 0;
          return i2 && e11.unshift(i2), e11;
        }
        function t2(e11, t3, r3, n2) {
          var i2, a2;
          if (r3 != n2) a2 = r3 > n2 ? 1 : -1;
          else for (i2 = a2 = 0; i2 < r3; i2++) if (e11[i2] != t3[i2]) {
            a2 = e11[i2] > t3[i2] ? 1 : -1;
            break;
          }
          return a2;
        }
        function r2(e11, t3, r3, n2) {
          for (var i2 = 0; r3--; ) e11[r3] -= i2, i2 = +(e11[r3] < t3[r3]), e11[r3] = i2 * n2 + e11[r3] - t3[r3];
          for (; !e11[0] && e11.length > 1; ) e11.shift();
        }
        return function(i2, a2, o2, s2, l2, u2) {
          var c2, d2, h2, f2, p2, g2, A2, m2, y2, w2, b2, v2, E2, _2, C2, x2, I2, S2, T2, O2, P2 = i2.constructor, R2 = i2.s == a2.s ? 1 : -1, N2 = i2.d, k2 = a2.d;
          if (!N2 || !N2[0] || !k2 || !k2[0]) return new P2(!i2.s || !a2.s || (N2 ? k2 && N2[0] == k2[0] : !k2) ? NaN : N2 && 0 == N2[0] || !k2 ? 0 * R2 : R2 / 0);
          for (u2 ? (p2 = 1, d2 = i2.e - a2.e) : (u2 = 1e7, p2 = 7, d2 = W(i2.e / p2) - W(a2.e / p2)), T2 = k2.length, I2 = N2.length, w2 = (y2 = new P2(R2)).d = [], h2 = 0; k2[h2] == (N2[h2] || 0); h2++) ;
          if (k2[h2] > (N2[h2] || 0) && d2--, null == o2 ? (_2 = o2 = P2.precision, s2 = P2.rounding) : _2 = l2 ? o2 + (i2.e - a2.e) + 1 : o2, _2 < 0) w2.push(1), g2 = true;
          else {
            if (_2 = _2 / p2 + 2 | 0, h2 = 0, 1 == T2) {
              for (f2 = 0, k2 = k2[0], _2++; (h2 < I2 || f2) && _2--; h2++) C2 = f2 * u2 + (N2[h2] || 0), w2[h2] = C2 / k2 | 0, f2 = C2 % k2 | 0;
              g2 = f2 || h2 < I2;
            } else {
              for ((f2 = u2 / (k2[0] + 1) | 0) > 1 && (k2 = e10(k2, f2, u2), N2 = e10(N2, f2, u2), T2 = k2.length, I2 = N2.length), x2 = T2, v2 = (b2 = N2.slice(0, T2)).length; v2 < T2; ) b2[v2++] = 0;
              (O2 = k2.slice()).unshift(0), S2 = k2[0], k2[1] >= u2 / 2 && ++S2;
              do
                f2 = 0, (c2 = t2(k2, b2, T2, v2)) < 0 ? (E2 = b2[0], T2 != v2 && (E2 = E2 * u2 + (b2[1] || 0)), (f2 = E2 / S2 | 0) > 1 ? (f2 >= u2 && (f2 = u2 - 1), m2 = (A2 = e10(k2, f2, u2)).length, v2 = b2.length, 1 == (c2 = t2(A2, b2, m2, v2)) && (f2--, r2(A2, T2 < m2 ? O2 : k2, m2, u2))) : (0 == f2 && (c2 = f2 = 1), A2 = k2.slice()), (m2 = A2.length) < v2 && A2.unshift(0), r2(b2, A2, v2, u2), -1 == c2 && (v2 = b2.length, (c2 = t2(k2, b2, T2, v2)) < 1 && (f2++, r2(b2, T2 < v2 ? O2 : k2, v2, u2))), v2 = b2.length) : 0 === c2 && (f2++, b2 = [0]), w2[h2++] = f2, c2 && b2[0] ? b2[v2++] = N2[x2] || 0 : (b2 = [N2[x2]], v2 = 1);
              while ((x2++ < I2 || void 0 !== b2[0]) && _2--);
              g2 = void 0 !== b2[0];
            }
            w2[0] || w2.shift();
          }
          if (1 == p2) y2.e = d2, n = g2;
          else {
            for (h2 = 1, f2 = w2[0]; f2 >= 10; f2 /= 10) h2++;
            y2.e = h2 + d2 * p2 - 1, eo(y2, l2 ? o2 + y2.e + 1 : o2, s2, g2);
          }
          return y2;
        };
      }();
      function eo(e10, t2, r2, n2) {
        var i2, a2, o2, s2, l2, u2, c2, d2, h2, f2 = e10.constructor;
        e: if (null != t2) {
          if (!(d2 = e10.d)) return e10;
          for (i2 = 1, s2 = d2[0]; s2 >= 10; s2 /= 10) i2++;
          if ((a2 = t2 - i2) < 0) a2 += 7, o2 = t2, l2 = (c2 = d2[h2 = 0]) / G(10, i2 - o2 - 1) % 10 | 0;
          else if ((h2 = Math.ceil((a2 + 1) / 7)) >= (s2 = d2.length)) if (n2) {
            for (; s2++ <= h2; ) d2.push(0);
            c2 = l2 = 0, i2 = 1, a2 %= 7, o2 = a2 - 7 + 1;
          } else break e;
          else {
            for (i2 = 1, c2 = s2 = d2[h2]; s2 >= 10; s2 /= 10) i2++;
            a2 %= 7, l2 = (o2 = a2 - 7 + i2) < 0 ? 0 : c2 / G(10, i2 - o2 - 1) % 10 | 0;
          }
          if (n2 = n2 || t2 < 0 || void 0 !== d2[h2 + 1] || (o2 < 0 ? c2 : c2 % G(10, i2 - o2 - 1)), u2 = r2 < 4 ? (l2 || n2) && (0 == r2 || r2 == (e10.s < 0 ? 3 : 2)) : l2 > 5 || 5 == l2 && (4 == r2 || n2 || 6 == r2 && (a2 > 0 ? o2 > 0 ? c2 / G(10, i2 - o2) : 0 : d2[h2 - 1]) % 10 & 1 || r2 == (e10.s < 0 ? 8 : 7)), t2 < 1 || !d2[0]) return d2.length = 0, u2 ? (t2 -= e10.e + 1, d2[0] = G(10, (7 - t2 % 7) % 7), e10.e = -t2 || 0) : d2[0] = e10.e = 0, e10;
          if (0 == a2 ? (d2.length = h2, s2 = 1, h2--) : (d2.length = h2 + 1, s2 = G(10, 7 - a2), d2[h2] = o2 > 0 ? (c2 / G(10, i2 - o2) % G(10, o2) | 0) * s2 : 0), u2) for (; ; ) if (0 == h2) {
            for (a2 = 1, o2 = d2[0]; o2 >= 10; o2 /= 10) a2++;
            for (o2 = d2[0] += s2, s2 = 1; o2 >= 10; o2 /= 10) s2++;
            a2 != s2 && (e10.e++, 1e7 == d2[0] && (d2[0] = 1));
            break;
          } else {
            if (d2[h2] += s2, 1e7 != d2[h2]) break;
            d2[h2--] = 0, s2 = 1;
          }
          for (a2 = d2.length; 0 === d2[--a2]; ) d2.pop();
        }
        return q && (e10.e > f2.maxE ? (e10.d = null, e10.e = NaN) : e10.e < f2.minE && (e10.e = 0, e10.d = [0])), e10;
      }
      function es(e10, t2, r2) {
        if (!e10.isFinite()) return ey(e10);
        var n2, i2 = e10.e, a2 = et(e10.d), o2 = a2.length;
        return t2 ? (r2 && (n2 = r2 - o2) > 0 ? a2 = a2.charAt(0) + "." + a2.slice(1) + eh(n2) : o2 > 1 && (a2 = a2.charAt(0) + "." + a2.slice(1)), a2 = a2 + (e10.e < 0 ? "e" : "e+") + e10.e) : i2 < 0 ? (a2 = "0." + eh(-i2 - 1) + a2, r2 && (n2 = r2 - o2) > 0 && (a2 += eh(n2))) : i2 >= o2 ? (a2 += eh(i2 + 1 - o2), r2 && (n2 = r2 - i2 - 1) > 0 && (a2 = a2 + "." + eh(n2))) : ((n2 = i2 + 1) < o2 && (a2 = a2.slice(0, n2) + "." + a2.slice(n2)), r2 && (n2 = r2 - o2) > 0 && (i2 + 1 === o2 && (a2 += "."), a2 += eh(n2))), a2;
      }
      function el(e10, t2) {
        var r2 = e10[0];
        for (t2 *= 7; r2 >= 10; r2 /= 10) t2++;
        return t2;
      }
      function eu(e10, t2, r2) {
        if (t2 > Y) throw q = true, r2 && (e10.precision = r2), Error(U);
        return eo(new e10($), t2, 1, true);
      }
      function ec(e10, t2, r2) {
        if (t2 > Z) throw Error(U);
        return eo(new e10(j), t2, r2, true);
      }
      function ed(e10) {
        var t2 = e10.length - 1, r2 = 7 * t2 + 1;
        if (t2 = e10[t2]) {
          for (; t2 % 10 == 0; t2 /= 10) r2--;
          for (t2 = e10[0]; t2 >= 10; t2 /= 10) r2++;
        }
        return r2;
      }
      function eh(e10) {
        for (var t2 = ""; e10--; ) t2 += "0";
        return t2;
      }
      function ef(e10, t2, r2, n2) {
        var i2, a2 = new e10(1), o2 = Math.ceil(n2 / 7 + 4);
        for (q = false; ; ) {
          if (r2 % 2 && eC((a2 = a2.times(t2)).d, o2) && (i2 = true), 0 === (r2 = W(r2 / 2))) {
            r2 = a2.d.length - 1, i2 && 0 === a2.d[r2] && ++a2.d[r2];
            break;
          }
          eC((t2 = t2.times(t2)).d, o2);
        }
        return q = true, a2;
      }
      function ep(e10) {
        return 1 & e10.d[e10.d.length - 1];
      }
      function eg(e10, t2, r2) {
        for (var n2, i2, a2 = new e10(t2[0]), o2 = 0; ++o2 < t2.length; ) {
          if (!(i2 = new e10(t2[o2])).s) {
            a2 = i2;
            break;
          }
          ((n2 = a2.cmp(i2)) === r2 || 0 === n2 && a2.s === r2) && (a2 = i2);
        }
        return a2;
      }
      function eA(e10, t2) {
        var r2, n2, i2, a2, o2, s2, l2, u2 = 0, c2 = 0, d2 = 0, h2 = e10.constructor, f2 = h2.rounding, p2 = h2.precision;
        if (!e10.d || !e10.d[0] || e10.e > 17) return new h2(e10.d ? !e10.d[0] ? 1 : e10.s < 0 ? 0 : 1 / 0 : e10.s ? e10.s < 0 ? 0 : e10 : 0 / 0);
        for (null == t2 ? (q = false, l2 = p2) : l2 = t2, s2 = new h2(0.03125); e10.e > -2; ) e10 = e10.times(s2), d2 += 5;
        for (l2 += n2 = Math.log(G(2, d2)) / Math.LN10 * 2 + 5 | 0, r2 = a2 = o2 = new h2(1), h2.precision = l2; ; ) {
          if (a2 = eo(a2.times(e10), l2, 1), r2 = r2.times(++c2), et((s2 = o2.plus(ea(a2, r2, l2, 1))).d).slice(0, l2) === et(o2.d).slice(0, l2)) {
            for (i2 = d2; i2--; ) o2 = eo(o2.times(o2), l2, 1);
            if (null != t2) return h2.precision = p2, o2;
            if (!(u2 < 3 && en(o2.d, l2 - n2, f2, u2))) return eo(o2, h2.precision = p2, f2, q = true);
            h2.precision = l2 += 10, r2 = a2 = s2 = new h2(1), c2 = 0, u2++;
          }
          o2 = s2;
        }
      }
      function em(e10, t2) {
        var r2, n2, i2, a2, o2, s2, l2, u2, c2, d2, h2, f2 = 1, p2 = e10, g2 = p2.d, A2 = p2.constructor, m2 = A2.rounding, y2 = A2.precision;
        if (p2.s < 0 || !g2 || !g2[0] || !p2.e && 1 == g2[0] && 1 == g2.length) return new A2(g2 && !g2[0] ? -1 / 0 : 1 != p2.s ? NaN : g2 ? 0 : p2);
        if (null == t2 ? (q = false, c2 = y2) : c2 = t2, A2.precision = c2 += 10, n2 = (r2 = et(g2)).charAt(0), !(15e14 > Math.abs(a2 = p2.e))) return u2 = eu(A2, c2 + 2, y2).times(a2 + ""), p2 = em(new A2(n2 + "." + r2.slice(1)), c2 - 10).plus(u2), A2.precision = y2, null == t2 ? eo(p2, y2, m2, q = true) : p2;
        for (; n2 < 7 && 1 != n2 || 1 == n2 && r2.charAt(1) > 3; ) n2 = (r2 = et((p2 = p2.times(e10)).d)).charAt(0), f2++;
        for (a2 = p2.e, n2 > 1 ? (p2 = new A2("0." + r2), a2++) : p2 = new A2(n2 + "." + r2.slice(1)), d2 = p2, l2 = o2 = p2 = ea(p2.minus(1), p2.plus(1), c2, 1), h2 = eo(p2.times(p2), c2, 1), i2 = 3; ; ) {
          if (o2 = eo(o2.times(h2), c2, 1), et((u2 = l2.plus(ea(o2, new A2(i2), c2, 1))).d).slice(0, c2) === et(l2.d).slice(0, c2)) {
            if (l2 = l2.times(2), 0 !== a2 && (l2 = l2.plus(eu(A2, c2 + 2, y2).times(a2 + ""))), l2 = ea(l2, new A2(f2), c2, 1), null != t2) return A2.precision = y2, l2;
            if (!en(l2.d, c2 - 10, m2, s2)) return eo(l2, A2.precision = y2, m2, q = true);
            A2.precision = c2 += 10, u2 = o2 = p2 = ea(d2.minus(1), d2.plus(1), c2, 1), h2 = eo(p2.times(p2), c2, 1), i2 = s2 = 1;
          }
          l2 = u2, i2 += 2;
        }
      }
      function ey(e10) {
        return String(e10.s * e10.s / 0);
      }
      function ew(e10, t2) {
        var r2, n2, i2;
        for ((r2 = t2.indexOf(".")) > -1 && (t2 = t2.replace(".", "")), (n2 = t2.search(/e/i)) > 0 ? (r2 < 0 && (r2 = n2), r2 += +t2.slice(n2 + 1), t2 = t2.substring(0, n2)) : r2 < 0 && (r2 = t2.length), n2 = 0; 48 === t2.charCodeAt(n2); n2++) ;
        for (i2 = t2.length; 48 === t2.charCodeAt(i2 - 1); --i2) ;
        if (t2 = t2.slice(n2, i2)) {
          if (i2 -= n2, e10.e = r2 = r2 - n2 - 1, e10.d = [], n2 = (r2 + 1) % 7, r2 < 0 && (n2 += 7), n2 < i2) {
            for (n2 && e10.d.push(+t2.slice(0, n2)), i2 -= 7; n2 < i2; ) e10.d.push(+t2.slice(n2, n2 += 7));
            n2 = 7 - (t2 = t2.slice(n2)).length;
          } else n2 -= i2;
          for (; n2--; ) t2 += "0";
          e10.d.push(+t2), q && (e10.e > e10.constructor.maxE ? (e10.d = null, e10.e = NaN) : e10.e < e10.constructor.minE && (e10.e = 0, e10.d = [0]));
        } else e10.e = 0, e10.d = [0];
        return e10;
      }
      function eb(e10, t2, r2, n2, i2) {
        var a2, o2, s2, l2, u2 = e10.precision, c2 = Math.ceil(u2 / 7);
        for (q = false, l2 = r2.times(r2), s2 = new e10(n2); ; ) {
          if (o2 = ea(s2.times(l2), new e10(t2++ * t2++), u2, 1), s2 = i2 ? n2.plus(o2) : n2.minus(o2), n2 = ea(o2.times(l2), new e10(t2++ * t2++), u2, 1), void 0 !== (o2 = s2.plus(n2)).d[c2]) {
            for (a2 = c2; o2.d[a2] === s2.d[a2] && a2--; ) ;
            if (-1 == a2) break;
          }
          a2 = s2, s2 = n2, n2 = o2, o2 = a2;
        }
        return q = true, o2.d.length = c2 + 1, o2;
      }
      function ev(e10, t2) {
        for (var r2 = e10; --t2; ) r2 *= e10;
        return r2;
      }
      function eE(e10, t2) {
        var r2, n2 = t2.s < 0, a2 = ec(e10, e10.precision, 1), o2 = a2.times(0.5);
        if ((t2 = t2.abs()).lte(o2)) return i = n2 ? 4 : 1, t2;
        if ((r2 = t2.divToInt(a2)).isZero()) i = n2 ? 3 : 2;
        else {
          if ((t2 = t2.minus(r2.times(a2))).lte(o2)) return i = ep(r2) ? n2 ? 2 : 3 : n2 ? 4 : 1, t2;
          i = ep(r2) ? n2 ? 1 : 4 : n2 ? 3 : 2;
        }
        return t2.minus(a2).abs();
      }
      function e_(e10, t2, r2, i2) {
        var a2, o2, s2, l2, u2, c2, d2, h2, f2, p2 = e10.constructor, g2 = void 0 !== r2;
        if (g2 ? (er(r2, 1, 1e9), void 0 === i2 ? i2 = p2.rounding : er(i2, 0, 8)) : (r2 = p2.precision, i2 = p2.rounding), e10.isFinite()) {
          for (s2 = (d2 = es(e10)).indexOf("."), g2 ? (a2 = 2, 16 == t2 ? r2 = 4 * r2 - 3 : 8 == t2 && (r2 = 3 * r2 - 2)) : a2 = t2, s2 >= 0 && (d2 = d2.replace(".", ""), (f2 = new p2(1)).e = d2.length - s2, f2.d = ei(es(f2), 10, a2), f2.e = f2.d.length), o2 = u2 = (h2 = ei(d2, 10, a2)).length; 0 == h2[--u2]; ) h2.pop();
          if (h2[0]) {
            if (s2 < 0 ? o2-- : ((e10 = new p2(e10)).d = h2, e10.e = o2, h2 = (e10 = ea(e10, f2, r2, i2, 0, a2)).d, o2 = e10.e, c2 = n), s2 = h2[r2], l2 = a2 / 2, c2 = c2 || void 0 !== h2[r2 + 1], c2 = i2 < 4 ? (void 0 !== s2 || c2) && (0 === i2 || i2 === (e10.s < 0 ? 3 : 2)) : s2 > l2 || s2 === l2 && (4 === i2 || c2 || 6 === i2 && 1 & h2[r2 - 1] || i2 === (e10.s < 0 ? 8 : 7)), h2.length = r2, c2) for (; ++h2[--r2] > a2 - 1; ) h2[r2] = 0, r2 || (++o2, h2.unshift(1));
            for (u2 = h2.length; !h2[u2 - 1]; --u2) ;
            for (s2 = 0, d2 = ""; s2 < u2; s2++) d2 += M.charAt(h2[s2]);
            if (g2) {
              if (u2 > 1) if (16 == t2 || 8 == t2) {
                for (s2 = 16 == t2 ? 4 : 3, --u2; u2 % s2; u2++) d2 += "0";
                for (u2 = (h2 = ei(d2, a2, t2)).length; !h2[u2 - 1]; --u2) ;
                for (s2 = 1, d2 = "1."; s2 < u2; s2++) d2 += M.charAt(h2[s2]);
              } else d2 = d2.charAt(0) + "." + d2.slice(1);
              d2 = d2 + (o2 < 0 ? "p" : "p+") + o2;
            } else if (o2 < 0) {
              for (; ++o2; ) d2 = "0" + d2;
              d2 = "0." + d2;
            } else if (++o2 > u2) for (o2 -= u2; o2--; ) d2 += "0";
            else o2 < u2 && (d2 = d2.slice(0, o2) + "." + d2.slice(o2));
          } else d2 = g2 ? "0p+0" : "0";
          d2 = (16 == t2 ? "0x" : 2 == t2 ? "0b" : 8 == t2 ? "0o" : "") + d2;
        } else d2 = ey(e10);
        return e10.s < 0 ? "-" + d2 : d2;
      }
      function eC(e10, t2) {
        if (e10.length > t2) return e10.length = t2, true;
      }
      function ex(e10) {
        return new this(e10).abs();
      }
      function eI(e10) {
        return new this(e10).acos();
      }
      function eS(e10) {
        return new this(e10).acosh();
      }
      function eT(e10, t2) {
        return new this(e10).plus(t2);
      }
      function eO(e10) {
        return new this(e10).asin();
      }
      function eP(e10) {
        return new this(e10).asinh();
      }
      function eR(e10) {
        return new this(e10).atan();
      }
      function eN(e10) {
        return new this(e10).atanh();
      }
      function ek(e10, t2) {
        e10 = new this(e10), t2 = new this(t2);
        var r2, n2 = this.precision, i2 = this.rounding, a2 = n2 + 4;
        return e10.s && t2.s ? e10.d || t2.d ? !t2.d || e10.isZero() ? (r2 = t2.s < 0 ? ec(this, n2, i2) : new this(0)).s = e10.s : !e10.d || t2.isZero() ? (r2 = ec(this, a2, 1).times(0.5)).s = e10.s : t2.s < 0 ? (this.precision = a2, this.rounding = 1, r2 = this.atan(ea(e10, t2, a2, 1)), t2 = ec(this, a2, 1), this.precision = n2, this.rounding = i2, r2 = e10.s < 0 ? r2.minus(t2) : r2.plus(t2)) : r2 = this.atan(ea(e10, t2, a2, 1)) : (r2 = ec(this, a2, 1).times(t2.s > 0 ? 0.25 : 0.75)).s = e10.s : r2 = new this(NaN), r2;
      }
      function eB(e10) {
        return new this(e10).cbrt();
      }
      function eD(e10) {
        return eo(e10 = new this(e10), e10.e + 1, 2);
      }
      function eM(e10, t2, r2) {
        return new this(e10).clamp(t2, r2);
      }
      function e$(e10) {
        if (!e10 || "object" != typeof e10) throw Error(F + "Object expected");
        var t2, r2, n2, i2 = true === e10.defaults, a2 = ["precision", 1, 1e9, "rounding", 0, 8, "toExpNeg", -9e15, 0, "toExpPos", 0, 9e15, "maxE", 0, 9e15, "minE", -9e15, 0, "modulo", 0, 9];
        for (t2 = 0; t2 < a2.length; t2 += 3) if (r2 = a2[t2], i2 && (this[r2] = L[r2]), void 0 !== (n2 = e10[r2])) if (W(n2) === n2 && n2 >= a2[t2 + 1] && n2 <= a2[t2 + 2]) this[r2] = n2;
        else throw Error(Q + r2 + ": " + n2);
        if (r2 = "crypto", i2 && (this[r2] = L[r2]), void 0 !== (n2 = e10[r2])) if (true === n2 || false === n2 || 0 === n2 || 1 === n2) if (n2) if ("u" > typeof crypto && crypto && (crypto.getRandomValues || crypto.randomBytes)) this[r2] = true;
        else throw Error(V);
        else this[r2] = false;
        else throw Error(Q + r2 + ": " + n2);
        return this;
      }
      function ej(e10) {
        return new this(e10).cos();
      }
      function eL(e10) {
        return new this(e10).cosh();
      }
      function eq(e10, t2) {
        return new this(e10).div(t2);
      }
      function eF(e10) {
        return new this(e10).exp();
      }
      function eQ(e10) {
        return eo(e10 = new this(e10), e10.e + 1, 3);
      }
      function eU() {
        var e10, t2, r2 = new this(0);
        for (e10 = 0, q = false; e10 < arguments.length; ) if (t2 = new this(arguments[e10++]), t2.d) r2.d && (r2 = r2.plus(t2.times(t2)));
        else {
          if (t2.s) return q = true, new this(1 / 0);
          r2 = t2;
        }
        return q = true, r2.sqrt();
      }
      function eV(e10) {
        return e10 instanceof tt || e10 && e10.toStringTag === H || false;
      }
      function eH(e10) {
        return new this(e10).ln();
      }
      function eW(e10, t2) {
        return new this(e10).log(t2);
      }
      function eG(e10) {
        return new this(e10).log(2);
      }
      function eX(e10) {
        return new this(e10).log(10);
      }
      function eJ() {
        return eg(this, arguments, -1);
      }
      function ez() {
        return eg(this, arguments, 1);
      }
      function eK(e10, t2) {
        return new this(e10).mod(t2);
      }
      function eY(e10, t2) {
        return new this(e10).mul(t2);
      }
      function eZ(e10, t2) {
        return new this(e10).pow(t2);
      }
      function e0(e10) {
        var t2, r2, n2, i2, a2 = 0, o2 = new this(1), s2 = [];
        if (void 0 === e10 ? e10 = this.precision : er(e10, 1, 1e9), n2 = Math.ceil(e10 / 7), this.crypto) if (crypto.getRandomValues) for (t2 = crypto.getRandomValues(new Uint32Array(n2)); a2 < n2; ) (i2 = t2[a2]) >= 429e7 ? t2[a2] = crypto.getRandomValues(new Uint32Array(1))[0] : s2[a2++] = i2 % 1e7;
        else if (crypto.randomBytes) {
          for (t2 = crypto.randomBytes(n2 *= 4); a2 < n2; ) (i2 = t2[a2] + (t2[a2 + 1] << 8) + (t2[a2 + 2] << 16) + ((127 & t2[a2 + 3]) << 24)) >= 214e7 ? crypto.randomBytes(4).copy(t2, a2) : (s2.push(i2 % 1e7), a2 += 4);
          a2 = n2 / 4;
        } else throw Error(V);
        else for (; a2 < n2; ) s2[a2++] = 1e7 * Math.random() | 0;
        for (n2 = s2[--a2], e10 %= 7, n2 && e10 && (i2 = G(10, 7 - e10), s2[a2] = (n2 / i2 | 0) * i2); 0 === s2[a2]; a2--) s2.pop();
        if (a2 < 0) r2 = 0, s2 = [0];
        else {
          for (r2 = -1; 0 === s2[0]; r2 -= 7) s2.shift();
          for (n2 = 1, i2 = s2[0]; i2 >= 10; i2 /= 10) n2++;
          n2 < 7 && (r2 -= 7 - n2);
        }
        return o2.e = r2, o2.d = s2, o2;
      }
      function e1(e10) {
        return eo(e10 = new this(e10), e10.e + 1, this.rounding);
      }
      function e2(e10) {
        return (e10 = new this(e10)).d ? e10.d[0] ? e10.s : 0 * e10.s : e10.s || NaN;
      }
      function e4(e10) {
        return new this(e10).sin();
      }
      function e3(e10) {
        return new this(e10).sinh();
      }
      function e8(e10) {
        return new this(e10).sqrt();
      }
      function e6(e10, t2) {
        return new this(e10).sub(t2);
      }
      function e9() {
        var e10 = 0, t2 = arguments, r2 = new this(t2[0]);
        for (q = false; r2.s && ++e10 < t2.length; ) r2 = r2.plus(t2[e10]);
        return q = true, eo(r2, this.precision, this.rounding);
      }
      function e5(e10) {
        return new this(e10).tan();
      }
      function e7(e10) {
        return new this(e10).tanh();
      }
      function te(e10) {
        return eo(e10 = new this(e10), e10.e + 1, 1);
      }
      ee[Symbol.for("nodejs.util.inspect.custom")] = ee.toString, ee[Symbol.toStringTag] = "Decimal";
      var tt = ee.constructor = function e10(t2) {
        var r2, n2, i2;
        function a2(e11) {
          var t3, r3, n3;
          if (!(this instanceof a2)) return new a2(e11);
          if (this.constructor = a2, eV(e11)) {
            this.s = e11.s, q ? !e11.d || e11.e > a2.maxE ? (this.e = NaN, this.d = null) : e11.e < a2.minE ? (this.e = 0, this.d = [0]) : (this.e = e11.e, this.d = e11.d.slice()) : (this.e = e11.e, this.d = e11.d ? e11.d.slice() : e11.d);
            return;
          }
          if ("number" == (n3 = typeof e11)) {
            if (0 === e11) {
              this.s = 1 / e11 < 0 ? -1 : 1, this.e = 0, this.d = [0];
              return;
            }
            if (e11 < 0 ? (e11 = -e11, this.s = -1) : this.s = 1, e11 === ~~e11 && e11 < 1e7) {
              for (t3 = 0, r3 = e11; r3 >= 10; r3 /= 10) t3++;
              q ? t3 > a2.maxE ? (this.e = NaN, this.d = null) : t3 < a2.minE ? (this.e = 0, this.d = [0]) : (this.e = t3, this.d = [e11]) : (this.e = t3, this.d = [e11]);
              return;
            }
            if (0 * e11 != 0) {
              e11 || (this.s = NaN), this.e = NaN, this.d = null;
              return;
            }
            return ew(this, e11.toString());
          }
          if ("string" === n3) return 45 === (r3 = e11.charCodeAt(0)) ? (e11 = e11.slice(1), this.s = -1) : (43 === r3 && (e11 = e11.slice(1)), this.s = 1), K.test(e11) ? ew(this, e11) : function(e12, t4) {
            var r4, n4, i3, a3, o2, s2, l2, u2, c2;
            if (t4.indexOf("_") > -1) {
              if (t4 = t4.replace(/(\d)_(?=\d)/g, "$1"), K.test(t4)) return ew(e12, t4);
            } else if ("Infinity" === t4 || "NaN" === t4) return +t4 || (e12.s = NaN), e12.e = NaN, e12.d = null, e12;
            if (J.test(t4)) r4 = 16, t4 = t4.toLowerCase();
            else if (X.test(t4)) r4 = 2;
            else if (z.test(t4)) r4 = 8;
            else throw Error(Q + t4);
            for ((a3 = t4.search(/p/i)) > 0 ? (l2 = +t4.slice(a3 + 1), t4 = t4.substring(2, a3)) : t4 = t4.slice(2), o2 = (a3 = t4.indexOf(".")) >= 0, n4 = e12.constructor, o2 && (a3 = (s2 = (t4 = t4.replace(".", "")).length) - a3, i3 = ef(n4, new n4(r4), a3, 2 * a3)), a3 = c2 = (u2 = ei(t4, r4, 1e7)).length - 1; 0 === u2[a3]; --a3) u2.pop();
            return a3 < 0 ? new n4(0 * e12.s) : (e12.e = el(u2, c2), e12.d = u2, q = false, o2 && (e12 = ea(e12, i3, 4 * s2)), l2 && (e12 = e12.times(54 > Math.abs(l2) ? G(2, l2) : tt.pow(2, l2))), q = true, e12);
          }(this, e11);
          if ("bigint" === n3) return e11 < 0 ? (e11 = -e11, this.s = -1) : this.s = 1, ew(this, e11.toString());
          throw Error(Q + e11);
        }
        if (a2.prototype = ee, a2.ROUND_UP = 0, a2.ROUND_DOWN = 1, a2.ROUND_CEIL = 2, a2.ROUND_FLOOR = 3, a2.ROUND_HALF_UP = 4, a2.ROUND_HALF_DOWN = 5, a2.ROUND_HALF_EVEN = 6, a2.ROUND_HALF_CEIL = 7, a2.ROUND_HALF_FLOOR = 8, a2.EUCLID = 9, a2.config = a2.set = e$, a2.clone = e10, a2.isDecimal = eV, a2.abs = ex, a2.acos = eI, a2.acosh = eS, a2.add = eT, a2.asin = eO, a2.asinh = eP, a2.atan = eR, a2.atanh = eN, a2.atan2 = ek, a2.cbrt = eB, a2.ceil = eD, a2.clamp = eM, a2.cos = ej, a2.cosh = eL, a2.div = eq, a2.exp = eF, a2.floor = eQ, a2.hypot = eU, a2.ln = eH, a2.log = eW, a2.log10 = eX, a2.log2 = eG, a2.max = eJ, a2.min = ez, a2.mod = eK, a2.mul = eY, a2.pow = eZ, a2.random = e0, a2.round = e1, a2.sign = e2, a2.sin = e4, a2.sinh = e3, a2.sqrt = e8, a2.sub = e6, a2.sum = e9, a2.tan = e5, a2.tanh = e7, a2.trunc = te, void 0 === t2 && (t2 = {}), t2 && true !== t2.defaults) for (r2 = 0, i2 = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"]; r2 < i2.length; ) t2.hasOwnProperty(n2 = i2[r2++]) || (t2[n2] = this[n2]);
        return a2.config(t2), a2;
      }(L);
      $ = new tt($), j = new tt(j);
      var tr = class e10 {
        constructor(t2, r2) {
          if (t2.length - 1 !== r2.length) {
            if (0 === t2.length) throw TypeError("Expected at least 1 string");
            throw TypeError(`Expected ${t2.length} strings to have ${t2.length - 1} values`);
          }
          const n2 = r2.reduce((t3, r3) => t3 + (r3 instanceof e10 ? r3.values.length : 1), 0);
          this.values = Array(n2), this.strings = Array(n2 + 1), this.strings[0] = t2[0];
          let i2 = 0, a2 = 0;
          for (; i2 < r2.length; ) {
            const n3 = r2[i2++], o2 = t2[i2];
            if (n3 instanceof e10) {
              this.strings[a2] += n3.strings[0];
              let e11 = 0;
              for (; e11 < n3.values.length; ) this.values[a2++] = n3.values[e11++], this.strings[a2] = n3.strings[e11];
              this.strings[a2] += o2;
            } else this.values[a2++] = n3, this.strings[a2] = o2;
          }
        }
        get sql() {
          let e11 = this.strings.length, t2 = 1, r2 = this.strings[0];
          for (; t2 < e11; ) r2 += `?${this.strings[t2++]}`;
          return r2;
        }
        get statement() {
          let e11 = this.strings.length, t2 = 1, r2 = this.strings[0];
          for (; t2 < e11; ) r2 += `:${t2}${this.strings[t2++]}`;
          return r2;
        }
        get text() {
          let e11 = this.strings.length, t2 = 1, r2 = this.strings[0];
          for (; t2 < e11; ) r2 += `$${t2}${this.strings[t2++]}`;
          return r2;
        }
        inspect() {
          return { sql: this.sql, statement: this.statement, text: this.text, values: this.values };
        }
      };
      function tn(e10, t2 = ",", r2 = "", n2 = "") {
        if (0 === e10.length) throw TypeError("Expected `join([])` to be called with an array of multiple elements, but got an empty array");
        return new tr([r2, ...Array(e10.length - 1).fill(t2), n2], e10);
      }
      function ti(e10) {
        return new tr([e10], []);
      }
      var ta = ti("");
      function to(e10, ...t2) {
        return new tr(e10, t2);
      }
    }, 27253, (e, t, r) => {
      "use strict";
      let n;
      var i, a, o, s, l, u, c = Object.create, d = Object.defineProperty, h = Object.getOwnPropertyDescriptor, f = Object.getOwnPropertyNames, p = Object.getPrototypeOf, g = Object.prototype.hasOwnProperty, A = (e10, t10) => () => (e10 && (t10 = e10(e10 = 0)), t10), m = (e10, t10) => () => (t10 || e10((t10 = { exports: {} }).exports, t10), t10.exports), y = (e10, t10) => {
        for (var r10 in t10) d(e10, r10, { get: t10[r10], enumerable: true });
      }, w = (e10, t10, r10, n10) => {
        if (t10 && "object" == typeof t10 || "function" == typeof t10) for (let i10 of f(t10)) g.call(e10, i10) || i10 === r10 || d(e10, i10, { get: () => t10[i10], enumerable: !(n10 = h(t10, i10)) || n10.enumerable });
        return e10;
      }, b = (e10, t10, r10) => (r10 = null != e10 ? c(p(e10)) : {}, w(!t10 && e10 && e10.__esModule ? r10 : d(r10, "default", { value: e10, enumerable: true }), e10)), v = (e10) => w(d({}, "__esModule", { value: true }), e10);
      function E(e10, t10) {
        if ("utf8" === (t10 = t10.toLowerCase()) || "utf-8" === t10) return new P(N.encode(e10));
        if ("base64" === t10 || "base64url" === t10) return e10 = (e10 = e10.replace(/-/g, "+").replace(/_/g, "/")).replace(/[^A-Za-z0-9+/]/g, ""), new P([...atob(e10)].map((e11) => e11.charCodeAt(0)));
        if ("binary" === t10 || "ascii" === t10 || "latin1" === t10 || "latin-1" === t10) return new P([...e10].map((e11) => e11.charCodeAt(0)));
        if ("ucs2" === t10 || "ucs-2" === t10 || "utf16le" === t10 || "utf-16le" === t10) {
          let t11 = new P(2 * e10.length), r10 = new DataView(t11.buffer);
          for (let t12 = 0; t12 < e10.length; t12++) r10.setUint16(2 * t12, e10.charCodeAt(t12), true);
          return t11;
        }
        if ("hex" === t10) {
          let t11 = new P(e10.length / 2);
          for (let r10 = 0, n10 = 0; n10 < e10.length; n10 += 2, r10++) t11[r10] = parseInt(e10.slice(n10, n10 + 2), 16);
          return t11;
        }
        _(`encoding "${t10}"`);
      }
      function _(e10) {
        throw Error(`Buffer polyfill does not implement "${e10}"`);
      }
      function C(e10, t10) {
        if (!(e10 instanceof Uint8Array)) throw TypeError(`The "${t10}" argument must be an instance of Buffer or Uint8Array`);
      }
      function x(e10, t10, r10 = D + 1) {
        if (e10 < 0 || e10 > r10) {
          let n10 = RangeError(`The value of "${t10}" is out of range. It must be >= 0 && <= ${r10}. Received ${e10}`);
          throw n10.code = "ERR_OUT_OF_RANGE", n10;
        }
      }
      function I(e10, t10) {
        if ("number" != typeof e10) {
          let r10 = TypeError(`The "${t10}" argument must be of type number. Received type ${typeof e10}.`);
          throw r10.code = "ERR_INVALID_ARG_TYPE", r10;
        }
      }
      function S(e10, t10) {
        if (!Number.isInteger(e10) || Number.isNaN(e10)) {
          let r10 = RangeError(`The value of "${t10}" is out of range. It must be an integer. Received ${e10}`);
          throw r10.code = "ERR_OUT_OF_RANGE", r10;
        }
      }
      function T(e10, t10) {
        if ("string" != typeof e10) {
          let r10 = TypeError(`The "${t10}" argument must be of type string. Received type ${typeof e10}`);
          throw r10.code = "ERR_INVALID_ARG_TYPE", r10;
        }
      }
      function O(e10, t10 = "utf8") {
        return P.from(e10, t10);
      }
      var P, R, N, k, B, D, M, $, j, L, q, F, Q = A(() => {
        var e10;
        let t10, r10, n10, i10;
        P = class e11 extends Uint8Array {
          _isBuffer = true;
          get offset() {
            return this.byteOffset;
          }
          static alloc(t11, r11 = 0, n11 = "utf8") {
            return T(n11, "encoding"), e11.allocUnsafe(t11).fill(r11, n11);
          }
          static allocUnsafe(t11) {
            return e11.from(t11);
          }
          static allocUnsafeSlow(t11) {
            return e11.from(t11);
          }
          static isBuffer(e12) {
            return e12 && !!e12._isBuffer;
          }
          static byteLength(e12, t11 = "utf8") {
            if ("string" == typeof e12) return E(e12, t11).byteLength;
            if (e12 && e12.byteLength) return e12.byteLength;
            let r11 = TypeError('The "string" argument must be of type string or an instance of Buffer or ArrayBuffer.');
            throw r11.code = "ERR_INVALID_ARG_TYPE", r11;
          }
          static isEncoding(e12) {
            return B.includes(e12);
          }
          static compare(e12, t11) {
            C(e12, "buff1"), C(t11, "buff2");
            for (let r11 = 0; r11 < e12.length; r11++) {
              if (e12[r11] < t11[r11]) return -1;
              if (e12[r11] > t11[r11]) return 1;
            }
            return e12.length === t11.length ? 0 : e12.length > t11.length ? 1 : -1;
          }
          static from(t11, r11 = "utf8") {
            if (t11 && "object" == typeof t11 && "Buffer" === t11.type) return new e11(t11.data);
            if ("number" == typeof t11) return new e11(new Uint8Array(t11));
            if ("string" == typeof t11) return E(t11, r11);
            if (ArrayBuffer.isView(t11)) {
              let { byteOffset: r12, byteLength: n11, buffer: i11 } = t11;
              return "map" in t11 && "function" == typeof t11.map ? new e11(t11.map((e12) => e12 % 256), r12, n11) : new e11(i11, r12, n11);
            }
            if (t11 && "object" == typeof t11 && ("length" in t11 || "byteLength" in t11 || "buffer" in t11)) return new e11(t11);
            throw TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
          }
          static concat(t11, r11) {
            if (0 === t11.length) return e11.alloc(0);
            let n11 = [].concat(...t11.map((e12) => [...e12])), i11 = e11.alloc(void 0 !== r11 ? r11 : n11.length);
            return i11.set(void 0 !== r11 ? n11.slice(0, r11) : n11), i11;
          }
          slice(e12 = 0, t11 = this.length) {
            return this.subarray(e12, t11);
          }
          subarray(t11 = 0, r11 = this.length) {
            return Object.setPrototypeOf(super.subarray(t11, r11), e11.prototype);
          }
          reverse() {
            return super.reverse(), this;
          }
          readIntBE(e12, t11) {
            I(e12, "offset"), S(e12, "offset"), x(e12, "offset", this.length - 1), I(t11, "byteLength"), S(t11, "byteLength");
            let r11 = new DataView(this.buffer, e12, t11), n11 = 0;
            for (let e13 = 0; e13 < t11; e13++) n11 = 256 * n11 + r11.getUint8(e13);
            return 128 & r11.getUint8(0) && (n11 -= Math.pow(256, t11)), n11;
          }
          readIntLE(e12, t11) {
            I(e12, "offset"), S(e12, "offset"), x(e12, "offset", this.length - 1), I(t11, "byteLength"), S(t11, "byteLength");
            let r11 = new DataView(this.buffer, e12, t11), n11 = 0;
            for (let e13 = 0; e13 < t11; e13++) n11 += r11.getUint8(e13) * Math.pow(256, e13);
            return 128 & r11.getUint8(t11 - 1) && (n11 -= Math.pow(256, t11)), n11;
          }
          readUIntBE(e12, t11) {
            I(e12, "offset"), S(e12, "offset"), x(e12, "offset", this.length - 1), I(t11, "byteLength"), S(t11, "byteLength");
            let r11 = new DataView(this.buffer, e12, t11), n11 = 0;
            for (let e13 = 0; e13 < t11; e13++) n11 = 256 * n11 + r11.getUint8(e13);
            return n11;
          }
          readUintBE(e12, t11) {
            return this.readUIntBE(e12, t11);
          }
          readUIntLE(e12, t11) {
            I(e12, "offset"), S(e12, "offset"), x(e12, "offset", this.length - 1), I(t11, "byteLength"), S(t11, "byteLength");
            let r11 = new DataView(this.buffer, e12, t11), n11 = 0;
            for (let e13 = 0; e13 < t11; e13++) n11 += r11.getUint8(e13) * Math.pow(256, e13);
            return n11;
          }
          readUintLE(e12, t11) {
            return this.readUIntLE(e12, t11);
          }
          writeIntBE(e12, t11, r11) {
            return e12 = e12 < 0 ? e12 + Math.pow(256, r11) : e12, this.writeUIntBE(e12, t11, r11);
          }
          writeIntLE(e12, t11, r11) {
            return e12 = e12 < 0 ? e12 + Math.pow(256, r11) : e12, this.writeUIntLE(e12, t11, r11);
          }
          writeUIntBE(e12, t11, r11) {
            I(t11, "offset"), S(t11, "offset"), x(t11, "offset", this.length - 1), I(r11, "byteLength"), S(r11, "byteLength");
            let n11 = new DataView(this.buffer, t11, r11);
            for (let t12 = r11 - 1; t12 >= 0; t12--) n11.setUint8(t12, 255 & e12), e12 /= 256;
            return t11 + r11;
          }
          writeUintBE(e12, t11, r11) {
            return this.writeUIntBE(e12, t11, r11);
          }
          writeUIntLE(e12, t11, r11) {
            I(t11, "offset"), S(t11, "offset"), x(t11, "offset", this.length - 1), I(r11, "byteLength"), S(r11, "byteLength");
            let n11 = new DataView(this.buffer, t11, r11);
            for (let t12 = 0; t12 < r11; t12++) n11.setUint8(t12, 255 & e12), e12 /= 256;
            return t11 + r11;
          }
          writeUintLE(e12, t11, r11) {
            return this.writeUIntLE(e12, t11, r11);
          }
          toJSON() {
            return { type: "Buffer", data: Array.from(this) };
          }
          swap16() {
            let e12 = new DataView(this.buffer, this.byteOffset, this.byteLength);
            for (let t11 = 0; t11 < this.length; t11 += 2) e12.setUint16(t11, e12.getUint16(t11, true), false);
            return this;
          }
          swap32() {
            let e12 = new DataView(this.buffer, this.byteOffset, this.byteLength);
            for (let t11 = 0; t11 < this.length; t11 += 4) e12.setUint32(t11, e12.getUint32(t11, true), false);
            return this;
          }
          swap64() {
            let e12 = new DataView(this.buffer, this.byteOffset, this.byteLength);
            for (let t11 = 0; t11 < this.length; t11 += 8) e12.setBigUint64(t11, e12.getBigUint64(t11, true), false);
            return this;
          }
          compare(t11, r11 = 0, n11 = t11.length, i11 = 0, a10 = this.length) {
            return C(t11, "target"), I(r11, "targetStart"), I(n11, "targetEnd"), I(i11, "sourceStart"), I(a10, "sourceEnd"), x(r11, "targetStart"), x(n11, "targetEnd", t11.length), x(i11, "sourceStart"), x(a10, "sourceEnd", this.length), e11.compare(this.slice(i11, a10), t11.slice(r11, n11));
          }
          equals(e12) {
            return C(e12, "otherBuffer"), this.length === e12.length && this.every((t11, r11) => t11 === e12[r11]);
          }
          copy(e12, t11 = 0, r11 = 0, n11 = this.length) {
            x(t11, "targetStart"), x(r11, "sourceStart", this.length), x(n11, "sourceEnd"), t11 >>>= 0, r11 >>>= 0, n11 >>>= 0;
            let i11 = 0;
            for (; r11 < n11 && void 0 !== this[r11] && void 0 !== e12[t11]; ) e12[t11] = this[r11], i11++, r11++, t11++;
            return i11;
          }
          write(e12, t11, r11, n11 = "utf8") {
            let i11 = "string" == typeof t11 ? 0 : t11 ?? 0, a10 = "string" == typeof r11 ? this.length - i11 : r11 ?? this.length - i11;
            return n11 = "string" == typeof t11 ? t11 : "string" == typeof r11 ? r11 : n11, I(i11, "offset"), I(a10, "length"), x(i11, "offset", this.length), x(a10, "length", this.length), ("ucs2" === n11 || "ucs-2" === n11 || "utf16le" === n11 || "utf-16le" === n11) && (a10 -= a10 % 2), E(e12, n11).copy(this, i11, 0, a10);
          }
          fill(t11 = 0, r11 = 0, n11 = this.length, i11 = "utf-8") {
            let a10 = "string" == typeof r11 ? 0 : r11, o2 = "string" == typeof n11 ? this.length : n11;
            if (i11 = "string" == typeof r11 ? r11 : "string" == typeof n11 ? n11 : i11, t11 = e11.from("number" == typeof t11 ? [t11] : t11 ?? [], i11), T(i11, "encoding"), x(a10, "offset", this.length), x(o2, "end", this.length), 0 !== t11.length) for (let e12 = a10; e12 < o2; e12 += t11.length) super.set(t11.slice(0, t11.length + e12 >= this.length ? this.length - e12 : t11.length), e12);
            return this;
          }
          includes(e12, t11 = null, r11 = "utf-8") {
            return -1 !== this.indexOf(e12, t11, r11);
          }
          lastIndexOf(e12, t11 = null, r11 = "utf-8") {
            return this.indexOf(e12, t11, r11, true);
          }
          indexOf(t11, r11 = null, n11 = "utf-8", i11 = false) {
            let a10 = i11 ? this.findLastIndex.bind(this) : this.findIndex.bind(this);
            n11 = "string" == typeof r11 ? r11 : n11;
            let o2 = e11.from("number" == typeof t11 ? [t11] : t11, n11), s2 = "string" == typeof r11 ? 0 : r11;
            return s2 = Number.isNaN(s2 = "number" == typeof r11 ? s2 : null) ? null : s2, s2 ??= i11 ? this.length : 0, s2 = s2 < 0 ? this.length + s2 : s2, 0 === o2.length && false === i11 ? s2 >= this.length ? this.length : s2 : 0 === o2.length && true === i11 ? (s2 >= this.length ? this.length : s2) || this.length : a10((e12, t12) => (i11 ? t12 <= s2 : t12 >= s2) && this[t12] === o2[0] && o2.every((e13, r12) => this[t12 + r12] === e13));
          }
          toString(e12 = "utf8", t11 = 0, r11 = this.length) {
            if (t11 = t11 < 0 ? 0 : t11, e12 = e12.toString().toLowerCase(), r11 <= 0) return "";
            if ("utf8" === e12 || "utf-8" === e12) return k.decode(this.slice(t11, r11));
            if ("base64" === e12 || "base64url" === e12) {
              let t12 = btoa(this.reduce((e13, t13) => e13 + $(t13), ""));
              return "base64url" === e12 ? t12.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") : t12;
            }
            if ("binary" === e12 || "ascii" === e12 || "latin1" === e12 || "latin-1" === e12) return this.slice(t11, r11).reduce((t12, r12) => t12 + $(r12 & ("ascii" === e12 ? 127 : 255)), "");
            if ("ucs2" === e12 || "ucs-2" === e12 || "utf16le" === e12 || "utf-16le" === e12) {
              let e13 = new DataView(this.buffer.slice(t11, r11));
              return Array.from({ length: e13.byteLength / 2 }, (t12, r12) => 2 * r12 + 1 < e13.byteLength ? $(e13.getUint16(2 * r12, true)) : "").join("");
            }
            if ("hex" === e12) return this.slice(t11, r11).reduce((e13, t12) => e13 + t12.toString(16).padStart(2, "0"), "");
            _(`encoding "${e12}"`);
          }
          toLocaleString() {
            return this.toString();
          }
          inspect() {
            return `<Buffer ${this.toString("hex").match(/.{1,2}/g).join(" ")}>`;
          }
        }, R = { int8: [-128, 127], int16: [-32768, 32767], int32: [-2147483648, 2147483647], uint8: [0, 255], uint16: [0, 65535], uint32: [0, 4294967295], float32: [-1 / 0, 1 / 0], float64: [-1 / 0, 1 / 0], bigint64: [-0x8000000000000000n, 0x7fffffffffffffffn], biguint64: [0n, 0xffffffffffffffffn] }, N = new TextEncoder(), k = new TextDecoder(), B = ["utf8", "utf-8", "hex", "base64", "ascii", "binary", "base64url", "ucs2", "ucs-2", "utf16le", "utf-16le", "latin1", "latin-1"], D = 4294967295, e10 = P.prototype, r10 = (t10 = Object.getOwnPropertyNames(DataView.prototype).filter((e11) => e11.startsWith("get") || e11.startsWith("set"))).map((e11) => e11.replace("get", "read").replace("set", "write")), n10 = (e11, r11) => function(n11 = 0) {
          return I(n11, "offset"), S(n11, "offset"), x(n11, "offset", this.length - 1), new DataView(this.buffer)[t10[e11]](n11, r11);
        }, i10 = (e11, r11) => function(n11, i11 = 0) {
          let a10 = R[t10[e11].match(/set(\w+\d+)/)[1].toLowerCase()];
          return I(i11, "offset"), S(i11, "offset"), x(i11, "offset", this.length - 1), function(e12, t11, r12, n12) {
            if (e12 < r12 || e12 > n12) {
              let i12 = RangeError(`The value of "${t11}" is out of range. It must be >= ${r12} and <= ${n12}. Received ${e12}`);
              throw i12.code = "ERR_OUT_OF_RANGE", i12;
            }
          }(n11, "value", a10[0], a10[1]), new DataView(this.buffer)[t10[e11]](i11, n11, r11), i11 + parseInt(t10[e11].match(/\d+/)[0]) / 8;
        }, r10.forEach((t11, r11) => {
          t11.startsWith("read") && (e10[t11] = n10(r11, false), e10[t11 + "LE"] = n10(r11, true), e10[t11 + "BE"] = n10(r11, false)), t11.startsWith("write") && (e10[t11] = i10(r11, false), e10[t11 + "LE"] = i10(r11, true), e10[t11 + "BE"] = i10(r11, false)), [t11, t11 + "LE", t11 + "BE"].forEach((t12) => {
            t12.includes("Uint") && (e10[t12.replace("Uint", "UInt")] = e10[t12]), t12.includes("Float64") && (e10[t12.replace("Float64", "Double")] = e10[t12]), t12.includes("Float32") && (e10[t12.replace("Float32", "Float")] = e10[t12]);
          });
        }), M = new Proxy(O, { construct: (e11, [t11, r11]) => P.from(t11, r11), get: (e11, t11) => P[t11] }), $ = String.fromCodePoint;
      }), U = A(() => {
        j = { nextTick: (e10, ...t10) => {
          setTimeout(() => {
            e10(...t10);
          }, 0);
        }, env: {}, version: "", cwd: () => "/", stderr: {}, argv: ["/bin/node"], pid: 1e4 }, { cwd: L } = j;
      }), V = A(() => {
        let e10;
        q = globalThis.performance ?? (e10 = Date.now(), { now: () => Date.now() - e10 });
      }), H = A(() => {
        (F = () => {
        }).prototype = F;
      });
      function W(e10, t10) {
        var r10, n10, i10, a10, o2, s2, l2, u2, c2 = e10.constructor, d2 = c2.precision;
        if (!e10.s || !t10.s) return t10.s || (t10 = new c2(e10)), el ? et(t10, d2) : t10;
        if (l2 = e10.d, u2 = t10.d, o2 = e10.e, i10 = t10.e, l2 = l2.slice(), a10 = o2 - i10) {
          for (a10 < 0 ? (n10 = l2, a10 = -a10, s2 = u2.length) : (n10 = u2, i10 = o2, s2 = l2.length), a10 > (s2 = (o2 = Math.ceil(d2 / em)) > s2 ? o2 + 1 : s2 + 1) && (a10 = s2, n10.length = 1), n10.reverse(); a10--; ) n10.push(0);
          n10.reverse();
        }
        for ((s2 = l2.length) - (a10 = u2.length) < 0 && (a10 = s2, n10 = u2, u2 = l2, l2 = n10), r10 = 0; a10; ) r10 = (l2[--a10] = l2[a10] + u2[a10] + r10) / eA | 0, l2[a10] %= eA;
        for (r10 && (l2.unshift(r10), ++i10), s2 = l2.length; 0 == l2[--s2]; ) l2.pop();
        return t10.d = l2, t10.e = i10, el ? et(t10, d2) : t10;
      }
      function G(e10, t10, r10) {
        if (e10 !== ~~e10 || e10 < t10 || e10 > r10) throw Error(ec + e10);
      }
      function X(e10) {
        var t10, r10, n10, i10 = e10.length - 1, a10 = "", o2 = e10[0];
        if (i10 > 0) {
          for (a10 += o2, t10 = 1; t10 < i10; t10++) n10 = e10[t10] + "", (r10 = em - n10.length) && (a10 += Y(r10)), a10 += n10;
          n10 = (o2 = e10[t10]) + "", (r10 = em - n10.length) && (a10 += Y(r10));
        } else if (0 === o2) return "0";
        for (; o2 % 10 == 0; ) o2 /= 10;
        return a10 + o2;
      }
      function J(e10, t10) {
        var r10, n10, i10, a10, o2, s2 = 0, l2 = 0, u2 = e10.constructor, c2 = u2.precision;
        if (z(e10) > 16) throw Error(ed + z(e10));
        if (!e10.s) return new u2(eg);
        for (null == t10 ? (el = false, o2 = c2) : o2 = t10, a10 = new u2(0.03125); e10.abs().gte(0.1); ) e10 = e10.times(a10), l2 += 5;
        for (o2 += Math.log(ef(2, l2)) / Math.LN10 * 2 + 5 | 0, r10 = n10 = i10 = new u2(eg), u2.precision = o2; ; ) {
          if (n10 = et(n10.times(e10), o2), r10 = r10.times(++s2), X((a10 = i10.plus(eb(n10, r10, o2))).d).slice(0, o2) === X(i10.d).slice(0, o2)) {
            for (; l2--; ) i10 = et(i10.times(i10), o2);
            return u2.precision = c2, null == t10 ? (el = true, et(i10, c2)) : i10;
          }
          i10 = a10;
        }
      }
      function z(e10) {
        for (var t10 = e10.e * em, r10 = e10.d[0]; r10 >= 10; r10 /= 10) t10++;
        return t10;
      }
      function K(e10, t10, r10) {
        if (t10 > e10.LN10.sd()) throw el = true, r10 && (e10.precision = r10), Error(eu + "LN10 precision limit exceeded");
        return et(new e10(e10.LN10), t10);
      }
      function Y(e10) {
        for (var t10 = ""; e10--; ) t10 += "0";
        return t10;
      }
      function Z(e10, t10) {
        var r10, n10, i10, a10, o2, s2, l2, u2, c2, d2 = 1, h2 = e10, f2 = h2.d, p2 = h2.constructor, g2 = p2.precision;
        if (h2.s < 1) throw Error(eu + (h2.s ? "NaN" : "-Infinity"));
        if (h2.eq(eg)) return new p2(0);
        if (null == t10 ? (el = false, u2 = g2) : u2 = t10, h2.eq(10)) return null == t10 && (el = true), K(p2, u2);
        if (p2.precision = u2 += 10, n10 = (r10 = X(f2)).charAt(0), !(15e14 > Math.abs(a10 = z(h2)))) return l2 = K(p2, u2 + 2, g2).times(a10 + ""), h2 = Z(new p2(n10 + "." + r10.slice(1)), u2 - 10).plus(l2), p2.precision = g2, null == t10 ? (el = true, et(h2, g2)) : h2;
        for (; n10 < 7 && 1 != n10 || 1 == n10 && r10.charAt(1) > 3; ) n10 = (r10 = X((h2 = h2.times(e10)).d)).charAt(0), d2++;
        for (a10 = z(h2), n10 > 1 ? (h2 = new p2("0." + r10), a10++) : h2 = new p2(n10 + "." + r10.slice(1)), s2 = o2 = h2 = eb(h2.minus(eg), h2.plus(eg), u2), c2 = et(h2.times(h2), u2), i10 = 3; ; ) {
          if (o2 = et(o2.times(c2), u2), X((l2 = s2.plus(eb(o2, new p2(i10), u2))).d).slice(0, u2) === X(s2.d).slice(0, u2)) return s2 = s2.times(2), 0 !== a10 && (s2 = s2.plus(K(p2, u2 + 2, g2).times(a10 + ""))), s2 = eb(s2, new p2(d2), u2), p2.precision = g2, null == t10 ? (el = true, et(s2, g2)) : s2;
          s2 = l2, i10 += 2;
        }
      }
      function ee(e10, t10) {
        var r10, n10, i10;
        for ((r10 = t10.indexOf(".")) > -1 && (t10 = t10.replace(".", "")), (n10 = t10.search(/e/i)) > 0 ? (r10 < 0 && (r10 = n10), r10 += +t10.slice(n10 + 1), t10 = t10.substring(0, n10)) : r10 < 0 && (r10 = t10.length), n10 = 0; 48 === t10.charCodeAt(n10); ) ++n10;
        for (i10 = t10.length; 48 === t10.charCodeAt(i10 - 1); ) --i10;
        if (t10 = t10.slice(n10, i10)) {
          if (i10 -= n10, e10.e = eh((r10 = r10 - n10 - 1) / em), e10.d = [], n10 = (r10 + 1) % em, r10 < 0 && (n10 += em), n10 < i10) {
            for (n10 && e10.d.push(+t10.slice(0, n10)), i10 -= em; n10 < i10; ) e10.d.push(+t10.slice(n10, n10 += em));
            t10 = t10.slice(n10), n10 = em - t10.length;
          } else n10 -= i10;
          for (; n10--; ) t10 += "0";
          if (e10.d.push(+t10), el && (e10.e > ey || e10.e < -ey)) throw Error(ed + r10);
        } else e10.s = 0, e10.e = 0, e10.d = [0];
        return e10;
      }
      function et(e10, t10, r10) {
        var n10, i10, a10, o2, s2, l2, u2, c2, d2 = e10.d;
        for (o2 = 1, a10 = d2[0]; a10 >= 10; a10 /= 10) o2++;
        if ((n10 = t10 - o2) < 0) n10 += em, i10 = t10, u2 = d2[c2 = 0];
        else {
          if ((c2 = Math.ceil((n10 + 1) / em)) >= (a10 = d2.length)) return e10;
          for (u2 = a10 = d2[c2], o2 = 1; a10 >= 10; a10 /= 10) o2++;
          n10 %= em, i10 = n10 - em + o2;
        }
        if (void 0 !== r10 && (s2 = u2 / (a10 = ef(10, o2 - i10 - 1)) % 10 | 0, l2 = t10 < 0 || void 0 !== d2[c2 + 1] || u2 % a10, l2 = r10 < 4 ? (s2 || l2) && (0 == r10 || r10 == (e10.s < 0 ? 3 : 2)) : s2 > 5 || 5 == s2 && (4 == r10 || l2 || 6 == r10 && (n10 > 0 ? i10 > 0 ? u2 / ef(10, o2 - i10) : 0 : d2[c2 - 1]) % 10 & 1 || r10 == (e10.s < 0 ? 8 : 7))), t10 < 1 || !d2[0]) return l2 ? (a10 = z(e10), d2.length = 1, t10 = t10 - a10 - 1, d2[0] = ef(10, (em - t10 % em) % em), e10.e = eh(-t10 / em) || 0) : (d2.length = 1, d2[0] = e10.e = e10.s = 0), e10;
        if (0 == n10 ? (d2.length = c2, a10 = 1, c2--) : (d2.length = c2 + 1, a10 = ef(10, em - n10), d2[c2] = i10 > 0 ? (u2 / ef(10, o2 - i10) % ef(10, i10) | 0) * a10 : 0), l2) for (; ; ) if (0 == c2) {
          (d2[0] += a10) == eA && (d2[0] = 1, ++e10.e);
          break;
        } else {
          if (d2[c2] += a10, d2[c2] != eA) break;
          d2[c2--] = 0, a10 = 1;
        }
        for (n10 = d2.length; 0 === d2[--n10]; ) d2.pop();
        if (el && (e10.e > ey || e10.e < -ey)) throw Error(ed + z(e10));
        return e10;
      }
      function er(e10, t10) {
        var r10, n10, i10, a10, o2, s2, l2, u2, c2, d2, h2 = e10.constructor, f2 = h2.precision;
        if (!e10.s || !t10.s) return t10.s ? t10.s = -t10.s : t10 = new h2(e10), el ? et(t10, f2) : t10;
        if (l2 = e10.d, d2 = t10.d, n10 = t10.e, u2 = e10.e, l2 = l2.slice(), o2 = u2 - n10) {
          for ((c2 = o2 < 0) ? (r10 = l2, o2 = -o2, s2 = d2.length) : (r10 = d2, n10 = u2, s2 = l2.length), o2 > (i10 = Math.max(Math.ceil(f2 / em), s2) + 2) && (o2 = i10, r10.length = 1), r10.reverse(), i10 = o2; i10--; ) r10.push(0);
          r10.reverse();
        } else {
          for ((c2 = (i10 = l2.length) < (s2 = d2.length)) && (s2 = i10), i10 = 0; i10 < s2; i10++) if (l2[i10] != d2[i10]) {
            c2 = l2[i10] < d2[i10];
            break;
          }
          o2 = 0;
        }
        for (c2 && (r10 = l2, l2 = d2, d2 = r10, t10.s = -t10.s), s2 = l2.length, i10 = d2.length - s2; i10 > 0; --i10) l2[s2++] = 0;
        for (i10 = d2.length; i10 > o2; ) {
          if (l2[--i10] < d2[i10]) {
            for (a10 = i10; a10 && 0 === l2[--a10]; ) l2[a10] = eA - 1;
            --l2[a10], l2[i10] += eA;
          }
          l2[i10] -= d2[i10];
        }
        for (; 0 === l2[--s2]; ) l2.pop();
        for (; 0 === l2[0]; l2.shift()) --n10;
        return l2[0] ? (t10.d = l2, t10.e = n10, el ? et(t10, f2) : t10) : new h2(0);
      }
      function en(e10, t10, r10) {
        var n10, i10 = z(e10), a10 = X(e10.d), o2 = a10.length;
        return t10 ? (r10 && (n10 = r10 - o2) > 0 ? a10 = a10.charAt(0) + "." + a10.slice(1) + Y(n10) : o2 > 1 && (a10 = a10.charAt(0) + "." + a10.slice(1)), a10 = a10 + (i10 < 0 ? "e" : "e+") + i10) : i10 < 0 ? (a10 = "0." + Y(-i10 - 1) + a10, r10 && (n10 = r10 - o2) > 0 && (a10 += Y(n10))) : i10 >= o2 ? (a10 += Y(i10 + 1 - o2), r10 && (n10 = r10 - i10 - 1) > 0 && (a10 = a10 + "." + Y(n10))) : ((n10 = i10 + 1) < o2 && (a10 = a10.slice(0, n10) + "." + a10.slice(n10)), r10 && (n10 = r10 - o2) > 0 && (i10 + 1 === o2 && (a10 += "."), a10 += Y(n10))), e10.s < 0 ? "-" + a10 : a10;
      }
      function ei(e10, t10) {
        if (e10.length > t10) return e10.length = t10, true;
      }
      function ea(e10) {
        if (!e10 || "object" != typeof e10) throw Error(eu + "Object expected");
        var t10, r10, n10, i10 = ["precision", 1, eo, "rounding", 0, 8, "toExpNeg", -1 / 0, 0, "toExpPos", 0, 1 / 0];
        for (t10 = 0; t10 < i10.length; t10 += 3) if (void 0 !== (n10 = e10[r10 = i10[t10]])) if (eh(n10) === n10 && n10 >= i10[t10 + 1] && n10 <= i10[t10 + 2]) this[r10] = n10;
        else throw Error(ec + r10 + ": " + n10);
        if (void 0 !== (n10 = e10[r10 = "LN10"])) if (n10 == Math.LN10) this[r10] = new this(n10);
        else throw Error(ec + r10 + ": " + n10);
        return this;
      }
      var eo, es, el, eu, ec, ed, eh, ef, ep, eg, eA, em, ey, ew, eb, ev = A(() => {
        Q(), U(), V(), H(), eE(), eo = 1e9, es = { precision: 20, rounding: 4, toExpNeg: -7, toExpPos: 21, LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286" }, el = true, ec = (eu = "[DecimalError] ") + "Invalid argument: ", ed = eu + "Exponent out of range: ", eh = Math.floor, ef = Math.pow, ep = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, eA = 1e7, ey = eh(9007199254740991 / (em = 7)), (ew = {}).absoluteValue = ew.abs = function() {
          var e10 = new this.constructor(this);
          return e10.s && (e10.s = 1), e10;
        }, ew.comparedTo = ew.cmp = function(e10) {
          var t10, r10, n10, i10;
          if (e10 = new this.constructor(e10), this.s !== e10.s) return this.s || -e10.s;
          if (this.e !== e10.e) return this.e > e10.e ^ this.s < 0 ? 1 : -1;
          for (n10 = this.d.length, i10 = e10.d.length, t10 = 0, r10 = n10 < i10 ? n10 : i10; t10 < r10; ++t10) if (this.d[t10] !== e10.d[t10]) return this.d[t10] > e10.d[t10] ^ this.s < 0 ? 1 : -1;
          return n10 === i10 ? 0 : n10 > i10 ^ this.s < 0 ? 1 : -1;
        }, ew.decimalPlaces = ew.dp = function() {
          var e10 = this.d.length - 1, t10 = (e10 - this.e) * em;
          if (e10 = this.d[e10]) for (; e10 % 10 == 0; e10 /= 10) t10--;
          return t10 < 0 ? 0 : t10;
        }, ew.dividedBy = ew.div = function(e10) {
          return eb(this, new this.constructor(e10));
        }, ew.dividedToIntegerBy = ew.idiv = function(e10) {
          var t10 = this.constructor;
          return et(eb(this, new t10(e10), 0, 1), t10.precision);
        }, ew.equals = ew.eq = function(e10) {
          return !this.cmp(e10);
        }, ew.exponent = function() {
          return z(this);
        }, ew.greaterThan = ew.gt = function(e10) {
          return this.cmp(e10) > 0;
        }, ew.greaterThanOrEqualTo = ew.gte = function(e10) {
          return this.cmp(e10) >= 0;
        }, ew.isInteger = ew.isint = function() {
          return this.e > this.d.length - 2;
        }, ew.isNegative = ew.isneg = function() {
          return this.s < 0;
        }, ew.isPositive = ew.ispos = function() {
          return this.s > 0;
        }, ew.isZero = function() {
          return 0 === this.s;
        }, ew.lessThan = ew.lt = function(e10) {
          return 0 > this.cmp(e10);
        }, ew.lessThanOrEqualTo = ew.lte = function(e10) {
          return 1 > this.cmp(e10);
        }, ew.logarithm = ew.log = function(e10) {
          var t10, r10 = this.constructor, n10 = r10.precision, i10 = n10 + 5;
          if (void 0 === e10) e10 = new r10(10);
          else if ((e10 = new r10(e10)).s < 1 || e10.eq(eg)) throw Error(eu + "NaN");
          if (this.s < 1) throw Error(eu + (this.s ? "NaN" : "-Infinity"));
          return this.eq(eg) ? new r10(0) : (el = false, t10 = eb(Z(this, i10), Z(e10, i10), i10), el = true, et(t10, n10));
        }, ew.minus = ew.sub = function(e10) {
          return e10 = new this.constructor(e10), this.s == e10.s ? er(this, e10) : W(this, (e10.s = -e10.s, e10));
        }, ew.modulo = ew.mod = function(e10) {
          var t10, r10 = this.constructor, n10 = r10.precision;
          if (!(e10 = new r10(e10)).s) throw Error(eu + "NaN");
          return this.s ? (el = false, t10 = eb(this, e10, 0, 1).times(e10), el = true, this.minus(t10)) : et(new r10(this), n10);
        }, ew.naturalExponential = ew.exp = function() {
          return J(this);
        }, ew.naturalLogarithm = ew.ln = function() {
          return Z(this);
        }, ew.negated = ew.neg = function() {
          var e10 = new this.constructor(this);
          return e10.s = -e10.s || 0, e10;
        }, ew.plus = ew.add = function(e10) {
          return e10 = new this.constructor(e10), this.s == e10.s ? W(this, e10) : er(this, (e10.s = -e10.s, e10));
        }, ew.precision = ew.sd = function(e10) {
          var t10, r10, n10;
          if (void 0 !== e10 && !!e10 !== e10 && 1 !== e10 && 0 !== e10) throw Error(ec + e10);
          if (t10 = z(this) + 1, r10 = (n10 = this.d.length - 1) * em + 1, n10 = this.d[n10]) {
            for (; n10 % 10 == 0; n10 /= 10) r10--;
            for (n10 = this.d[0]; n10 >= 10; n10 /= 10) r10++;
          }
          return e10 && t10 > r10 ? t10 : r10;
        }, ew.squareRoot = ew.sqrt = function() {
          var e10, t10, r10, n10, i10, a10, o2, s2 = this.constructor;
          if (this.s < 1) {
            if (!this.s) return new s2(0);
            throw Error(eu + "NaN");
          }
          for (e10 = z(this), el = false, 0 == (i10 = Math.sqrt(+this)) || i10 == 1 / 0 ? (((t10 = X(this.d)).length + e10) % 2 == 0 && (t10 += "0"), i10 = Math.sqrt(t10), e10 = eh((e10 + 1) / 2) - (e10 < 0 || e10 % 2), n10 = new s2(t10 = i10 == 1 / 0 ? "5e" + e10 : (t10 = i10.toExponential()).slice(0, t10.indexOf("e") + 1) + e10)) : n10 = new s2(i10.toString()), i10 = o2 = (r10 = s2.precision) + 3; ; ) if (n10 = (a10 = n10).plus(eb(this, a10, o2 + 2)).times(0.5), X(a10.d).slice(0, o2) === (t10 = X(n10.d)).slice(0, o2)) {
            if (t10 = t10.slice(o2 - 3, o2 + 1), i10 == o2 && "4999" == t10) {
              if (et(a10, r10 + 1, 0), a10.times(a10).eq(this)) {
                n10 = a10;
                break;
              }
            } else if ("9999" != t10) break;
            o2 += 4;
          }
          return el = true, et(n10, r10);
        }, ew.times = ew.mul = function(e10) {
          var t10, r10, n10, i10, a10, o2, s2, l2, u2, c2 = this.constructor, d2 = this.d, h2 = (e10 = new c2(e10)).d;
          if (!this.s || !e10.s) return new c2(0);
          for (e10.s *= this.s, r10 = this.e + e10.e, (l2 = d2.length) < (u2 = h2.length) && (a10 = d2, d2 = h2, h2 = a10, o2 = l2, l2 = u2, u2 = o2), a10 = [], n10 = o2 = l2 + u2; n10--; ) a10.push(0);
          for (n10 = u2; --n10 >= 0; ) {
            for (t10 = 0, i10 = l2 + n10; i10 > n10; ) s2 = a10[i10] + h2[n10] * d2[i10 - n10 - 1] + t10, a10[i10--] = s2 % eA | 0, t10 = s2 / eA | 0;
            a10[i10] = (a10[i10] + t10) % eA | 0;
          }
          for (; !a10[--o2]; ) a10.pop();
          return t10 ? ++r10 : a10.shift(), e10.d = a10, e10.e = r10, el ? et(e10, c2.precision) : e10;
        }, ew.toDecimalPlaces = ew.todp = function(e10, t10) {
          var r10 = this, n10 = r10.constructor;
          return r10 = new n10(r10), void 0 === e10 ? r10 : (G(e10, 0, eo), void 0 === t10 ? t10 = n10.rounding : G(t10, 0, 8), et(r10, e10 + z(r10) + 1, t10));
        }, ew.toExponential = function(e10, t10) {
          var r10, n10 = this, i10 = n10.constructor;
          return void 0 === e10 ? r10 = en(n10, true) : (G(e10, 0, eo), void 0 === t10 ? t10 = i10.rounding : G(t10, 0, 8), r10 = en(n10 = et(new i10(n10), e10 + 1, t10), true, e10 + 1)), r10;
        }, ew.toFixed = function(e10, t10) {
          var r10, n10, i10 = this.constructor;
          return void 0 === e10 ? en(this) : (G(e10, 0, eo), void 0 === t10 ? t10 = i10.rounding : G(t10, 0, 8), r10 = en((n10 = et(new i10(this), e10 + z(this) + 1, t10)).abs(), false, e10 + z(n10) + 1), this.isneg() && !this.isZero() ? "-" + r10 : r10);
        }, ew.toInteger = ew.toint = function() {
          var e10 = this.constructor;
          return et(new e10(this), z(this) + 1, e10.rounding);
        }, ew.toNumber = function() {
          return +this;
        }, ew.toPower = ew.pow = function(e10) {
          var t10, r10, n10, i10, a10, o2, s2 = this, l2 = s2.constructor, u2 = +(e10 = new l2(e10));
          if (!e10.s) return new l2(eg);
          if (!(s2 = new l2(s2)).s) {
            if (e10.s < 1) throw Error(eu + "Infinity");
            return s2;
          }
          if (s2.eq(eg)) return s2;
          if (n10 = l2.precision, e10.eq(eg)) return et(s2, n10);
          if (o2 = (t10 = e10.e) >= (r10 = e10.d.length - 1), a10 = s2.s, o2) {
            if ((r10 = u2 < 0 ? -u2 : u2) <= 9007199254740991) {
              for (i10 = new l2(eg), t10 = Math.ceil(n10 / em + 4), el = false; r10 % 2 && ei((i10 = i10.times(s2)).d, t10), 0 !== (r10 = eh(r10 / 2)); ) ei((s2 = s2.times(s2)).d, t10);
              return el = true, e10.s < 0 ? new l2(eg).div(i10) : et(i10, n10);
            }
          } else if (a10 < 0) throw Error(eu + "NaN");
          return a10 = a10 < 0 && 1 & e10.d[Math.max(t10, r10)] ? -1 : 1, s2.s = 1, el = false, i10 = e10.times(Z(s2, n10 + 12)), el = true, (i10 = J(i10)).s = a10, i10;
        }, ew.toPrecision = function(e10, t10) {
          var r10, n10, i10 = this, a10 = i10.constructor;
          return void 0 === e10 ? (r10 = z(i10), n10 = en(i10, r10 <= a10.toExpNeg || r10 >= a10.toExpPos)) : (G(e10, 1, eo), void 0 === t10 ? t10 = a10.rounding : G(t10, 0, 8), r10 = z(i10 = et(new a10(i10), e10, t10)), n10 = en(i10, e10 <= r10 || r10 <= a10.toExpNeg, e10)), n10;
        }, ew.toSignificantDigits = ew.tosd = function(e10, t10) {
          var r10 = this.constructor;
          return void 0 === e10 ? (e10 = r10.precision, t10 = r10.rounding) : (G(e10, 1, eo), void 0 === t10 ? t10 = r10.rounding : G(t10, 0, 8)), et(new r10(this), e10, t10);
        }, ew.toString = ew.valueOf = ew.val = ew.toJSON = ew[Symbol.for("nodejs.util.inspect.custom")] = function() {
          var e10 = z(this), t10 = this.constructor;
          return en(this, e10 <= t10.toExpNeg || e10 >= t10.toExpPos);
        }, eb = /* @__PURE__ */ function() {
          function e10(e11, t11) {
            var r11, n10 = 0, i10 = e11.length;
            for (e11 = e11.slice(); i10--; ) r11 = e11[i10] * t11 + n10, e11[i10] = r11 % eA | 0, n10 = r11 / eA | 0;
            return n10 && e11.unshift(n10), e11;
          }
          function t10(e11, t11, r11, n10) {
            var i10, a10;
            if (r11 != n10) a10 = r11 > n10 ? 1 : -1;
            else for (i10 = a10 = 0; i10 < r11; i10++) if (e11[i10] != t11[i10]) {
              a10 = e11[i10] > t11[i10] ? 1 : -1;
              break;
            }
            return a10;
          }
          function r10(e11, t11, r11) {
            for (var n10 = 0; r11--; ) e11[r11] -= n10, n10 = +(e11[r11] < t11[r11]), e11[r11] = n10 * eA + e11[r11] - t11[r11];
            for (; !e11[0] && e11.length > 1; ) e11.shift();
          }
          return function(n10, i10, a10, o2) {
            var s2, l2, u2, c2, d2, h2, f2, p2, g2, A2, m2, y2, w2, b2, v2, E2, _2, C2, x2 = n10.constructor, I2 = n10.s == i10.s ? 1 : -1, S2 = n10.d, T2 = i10.d;
            if (!n10.s) return new x2(n10);
            if (!i10.s) throw Error(eu + "Division by zero");
            for (l2 = n10.e - i10.e, _2 = T2.length, v2 = S2.length, p2 = (f2 = new x2(I2)).d = [], u2 = 0; T2[u2] == (S2[u2] || 0); ) ++u2;
            if (T2[u2] > (S2[u2] || 0) && --l2, (y2 = null == a10 ? a10 = x2.precision : o2 ? a10 + (z(n10) - z(i10)) + 1 : a10) < 0) return new x2(0);
            if (y2 = y2 / em + 2 | 0, u2 = 0, 1 == _2) for (c2 = 0, T2 = T2[0], y2++; (u2 < v2 || c2) && y2--; u2++) w2 = c2 * eA + (S2[u2] || 0), p2[u2] = w2 / T2 | 0, c2 = w2 % T2 | 0;
            else {
              for ((c2 = eA / (T2[0] + 1) | 0) > 1 && (T2 = e10(T2, c2), S2 = e10(S2, c2), _2 = T2.length, v2 = S2.length), b2 = _2, A2 = (g2 = S2.slice(0, _2)).length; A2 < _2; ) g2[A2++] = 0;
              (C2 = T2.slice()).unshift(0), E2 = T2[0], T2[1] >= eA / 2 && ++E2;
              do
                c2 = 0, (s2 = t10(T2, g2, _2, A2)) < 0 ? (m2 = g2[0], _2 != A2 && (m2 = m2 * eA + (g2[1] || 0)), (c2 = m2 / E2 | 0) > 1 ? (c2 >= eA && (c2 = eA - 1), h2 = (d2 = e10(T2, c2)).length, A2 = g2.length, 1 == (s2 = t10(d2, g2, h2, A2)) && (c2--, r10(d2, _2 < h2 ? C2 : T2, h2))) : (0 == c2 && (s2 = c2 = 1), d2 = T2.slice()), (h2 = d2.length) < A2 && d2.unshift(0), r10(g2, d2, A2), -1 == s2 && (A2 = g2.length, (s2 = t10(T2, g2, _2, A2)) < 1 && (c2++, r10(g2, _2 < A2 ? C2 : T2, A2))), A2 = g2.length) : 0 === s2 && (c2++, g2 = [0]), p2[u2++] = c2, s2 && g2[0] ? g2[A2++] = S2[b2] || 0 : (g2 = [S2[b2]], A2 = 1);
              while ((b2++ < v2 || void 0 !== g2[0]) && y2--);
            }
            return p2[0] || p2.shift(), f2.e = l2, et(f2, o2 ? a10 + z(f2) + 1 : a10);
          };
        }(), eg = new (function e10(t10) {
          var r10, n10, i10;
          function a10(e11) {
            if (!(this instanceof a10)) return new a10(e11);
            if (this.constructor = a10, e11 instanceof a10) {
              this.s = e11.s, this.e = e11.e, this.d = (e11 = e11.d) ? e11.slice() : e11;
              return;
            }
            if ("number" == typeof e11) {
              if (0 * e11 != 0) throw Error(ec + e11);
              if (e11 > 0) this.s = 1;
              else if (e11 < 0) e11 = -e11, this.s = -1;
              else {
                this.s = 0, this.e = 0, this.d = [0];
                return;
              }
              if (e11 === ~~e11 && e11 < 1e7) {
                this.e = 0, this.d = [e11];
                return;
              }
              return ee(this, e11.toString());
            }
            if ("string" != typeof e11) throw Error(ec + e11);
            if (45 === e11.charCodeAt(0) ? (e11 = e11.slice(1), this.s = -1) : this.s = 1, ep.test(e11)) ee(this, e11);
            else throw Error(ec + e11);
          }
          if (a10.prototype = ew, a10.ROUND_UP = 0, a10.ROUND_DOWN = 1, a10.ROUND_CEIL = 2, a10.ROUND_FLOOR = 3, a10.ROUND_HALF_UP = 4, a10.ROUND_HALF_DOWN = 5, a10.ROUND_HALF_EVEN = 6, a10.ROUND_HALF_CEIL = 7, a10.ROUND_HALF_FLOOR = 8, a10.clone = e10, a10.config = a10.set = ea, void 0 === t10 && (t10 = {}), t10) for (i10 = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], r10 = 0; r10 < i10.length; ) t10.hasOwnProperty(n10 = i10[r10++]) || (t10[n10] = this[n10]);
          return a10.config(t10), a10;
        }(es))(1);
      }), eE = A(() => {
        ev();
      }), e_ = {};
      function eC() {
        return globalThis.crypto.randomUUID();
      }
      function ex(e10, t10, r10) {
        return void 0 !== t10 && (e10 = void 0 !== r10 ? e10.subarray(t10, t10 + r10) : e10.subarray(t10)), globalThis.crypto.getRandomValues(e10);
      }
      function eI(e10) {
        return new eT(e10);
      }
      y(e_, { Hash: () => eT, createHash: () => eI, default: () => eO, randomFillSync: () => ex, randomUUID: () => eC, webcrypto: () => eS });
      var eS, eT, eO, eP, eR = A(() => {
        Q(), U(), V(), H(), eE(), eO = { webcrypto: eS = globalThis.crypto, randomUUID: eC, randomFillSync: ex, createHash: eI, Hash: eT = class {
          #i = [];
          #a;
          constructor(e10) {
            this.#a = e10;
          }
          update(e10) {
            this.#i.push(e10);
          }
          async digest() {
            let e10 = new Uint8Array(this.#i.reduce((e11, t11) => e11 + t11.length, 0)), t10 = 0;
            for (let r10 of this.#i) e10.set(r10, t10), t10 += r10.length;
            return new Uint8Array(await globalThis.crypto.subtle.digest(this.#a, e10));
          }
        } };
      }), eN = m(() => {
        Q(), U(), V(), H(), eE();
      }), ek = m((e10, t10) => {
        t10.exports = { name: "@prisma/engines-version", version: "7.8.0-6.3c6e192761c0362d496ed980de936e2f3cebcd3a", main: "index.js", types: "index.d.ts", license: "Apache-2.0", author: "Tim Suchanek <suchanek@prisma.io>", prisma: { enginesVersion: "3c6e192761c0362d496ed980de936e2f3cebcd3a" }, repository: { type: "git", url: "https://github.com/prisma/engines-wrapper.git", directory: "packages/engines-version" }, devDependencies: { "@types/node": "18.19.76", typescript: "4.9.5" }, files: ["index.js", "index.d.ts"], scripts: { build: "tsc -d" } };
      }), eB = m((e10) => {
        Q(), U(), V(), H(), eE(), Object.defineProperty(e10, "__esModule", { value: true }), e10.enginesVersion = void 0, e10.enginesVersion = ek().prisma.enginesVersion;
      }), eD = m((e10, t10) => {
        Q(), U(), V(), H(), eE(), t10.exports = (e11, t11 = 1, r10) => {
          if (r10 = { indent: " ", includeEmptyLines: false, ...r10 }, "string" != typeof e11) throw TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof e11}\``);
          if ("number" != typeof t11) throw TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof t11}\``);
          if ("string" != typeof r10.indent) throw TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof r10.indent}\``);
          if (0 === t11) return e11;
          let n10 = r10.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
          return e11.replace(n10, r10.indent.repeat(t11));
        };
      }), eM = m((e10, t10) => {
        Q(), U(), V(), H(), eE(), t10.exports = (e11 = {}) => {
          let t11;
          if (e11.repoUrl) t11 = e11.repoUrl;
          else if (e11.user && e11.repo) t11 = `https://github.com/${e11.user}/${e11.repo}`;
          else throw Error("You need to specify either the `repoUrl` option or both the `user` and `repo` options");
          let r10 = new URL(`${t11}/issues/new`);
          for (let t12 of ["body", "title", "labels", "template", "milestone", "assignee", "projects"]) {
            let n10 = e11[t12];
            if (void 0 !== n10) {
              if ("labels" === t12 || "projects" === t12) {
                if (!Array.isArray(n10)) throw TypeError(`The \`${t12}\` option should be an array`);
                n10 = n10.join(",");
              }
              r10.searchParams.set(t12, n10);
            }
          }
          return r10.toString();
        }, t10.exports.default = t10.exports;
      }), e$ = m((e10, t10) => {
        Q(), U(), V(), H(), eE(), t10.exports = /* @__PURE__ */ function() {
          function e11(e12, t11, r10, n10, i10) {
            return e12 < t11 || r10 < t11 ? e12 > r10 ? r10 + 1 : e12 + 1 : n10 === i10 ? t11 : t11 + 1;
          }
          return function(t11, r10) {
            if (t11 === r10) return 0;
            if (t11.length > r10.length) {
              var n10 = t11;
              t11 = r10, r10 = n10;
            }
            for (var i10 = t11.length, a10 = r10.length; i10 > 0 && t11.charCodeAt(i10 - 1) === r10.charCodeAt(a10 - 1); ) i10--, a10--;
            for (var o2 = 0; o2 < i10 && t11.charCodeAt(o2) === r10.charCodeAt(o2); ) o2++;
            if (i10 -= o2, a10 -= o2, 0 === i10 || a10 < 3) return a10;
            var s2, l2, u2, c2, d2, h2, f2, p2, g2, A2, m2, y2, w2 = 0, b2 = [];
            for (s2 = 0; s2 < i10; s2++) b2.push(s2 + 1), b2.push(t11.charCodeAt(o2 + s2));
            for (var v2 = b2.length - 1; w2 < a10 - 3; ) for (g2 = r10.charCodeAt(o2 + (l2 = w2)), A2 = r10.charCodeAt(o2 + (u2 = w2 + 1)), m2 = r10.charCodeAt(o2 + (c2 = w2 + 2)), y2 = r10.charCodeAt(o2 + (d2 = w2 + 3)), h2 = w2 += 4, s2 = 0; s2 < v2; s2 += 2) l2 = e11(f2 = b2[s2], l2, u2, g2, p2 = b2[s2 + 1]), u2 = e11(l2, u2, c2, A2, p2), c2 = e11(u2, c2, d2, m2, p2), h2 = e11(c2, d2, h2, y2, p2), b2[s2] = h2, d2 = c2, c2 = u2, u2 = l2, l2 = f2;
            for (; w2 < a10; ) for (g2 = r10.charCodeAt(o2 + (l2 = w2)), h2 = ++w2, s2 = 0; s2 < v2; s2 += 2) f2 = b2[s2], b2[s2] = h2 = e11(f2, l2, h2, g2, b2[s2 + 1]), l2 = f2;
            return h2;
          };
        }();
      }), ej = A(() => {
        Q(), U(), V(), H(), eE();
      }), eL = A(() => {
        Q(), U(), V(), H(), eE();
      }), eq = A(() => {
        Q(), U(), V(), H(), eE(), eP = class {
          events = {};
          on(e10, t10) {
            return this.events[e10] || (this.events[e10] = []), this.events[e10].push(t10), this;
          }
          emit(e10, ...t10) {
            return !!this.events[e10] && (this.events[e10].forEach((e11) => {
              e11(...t10);
            }), true);
          }
        };
      }), eF = m((e10) => {
        function t10(e11) {
          if (!Number.isSafeInteger(e11) || e11 < 0) throw Error("positive integer expected, got " + e11);
        }
        function r10(e11, ...t11) {
          if (!(e11 instanceof Uint8Array || ArrayBuffer.isView(e11) && "Uint8Array" === e11.constructor.name)) throw Error("Uint8Array expected");
          if (t11.length > 0 && !t11.includes(e11.length)) throw Error("Uint8Array expected of length " + t11 + ", got length=" + e11.length);
        }
        Q(), U(), V(), H(), eE(), Object.defineProperty(e10, "__esModule", { value: true }), e10.anumber = t10, e10.abytes = r10, e10.ahash = function(e11) {
          if ("function" != typeof e11 || "function" != typeof e11.create) throw Error("Hash should be wrapped by utils.wrapConstructor");
          t10(e11.outputLen), t10(e11.blockLen);
        }, e10.aexists = function(e11, t11 = true) {
          if (e11.destroyed) throw Error("Hash instance has been destroyed");
          if (t11 && e11.finished) throw Error("Hash#digest() has already been called");
        }, e10.aoutput = function(e11, t11) {
          r10(e11);
          let n10 = t11.outputLen;
          if (e11.length < n10) throw Error("digestInto() expects output buffer of length at least " + n10);
        };
      }), eQ = m((e10) => {
        Q(), U(), V(), H(), eE(), Object.defineProperty(e10, "__esModule", { value: true }), e10.add5L = e10.add5H = e10.add4H = e10.add4L = e10.add3H = e10.add3L = e10.rotlBL = e10.rotlBH = e10.rotlSL = e10.rotlSH = e10.rotr32L = e10.rotr32H = e10.rotrBL = e10.rotrBH = e10.rotrSL = e10.rotrSH = e10.shrSL = e10.shrSH = e10.toBig = void 0, e10.fromBig = n10, e10.split = i10, e10.add = y2;
        var t10 = BigInt(4294967296 - 1), r10 = BigInt(32);
        function n10(e11, i11 = false) {
          return i11 ? { h: Number(e11 & t10), l: Number(e11 >> r10 & t10) } : { h: 0 | Number(e11 >> r10 & t10), l: 0 | Number(e11 & t10) };
        }
        function i10(e11, t11 = false) {
          let r11 = new Uint32Array(e11.length), a11 = new Uint32Array(e11.length);
          for (let i11 = 0; i11 < e11.length; i11++) {
            let { h: o3, l: s3 } = n10(e11[i11], t11);
            [r11[i11], a11[i11]] = [o3, s3];
          }
          return [r11, a11];
        }
        var a10 = (e11, t11) => BigInt(e11 >>> 0) << r10 | BigInt(t11 >>> 0);
        e10.toBig = a10;
        var o2 = (e11, t11, r11) => e11 >>> r11;
        e10.shrSH = o2;
        var s2 = (e11, t11, r11) => e11 << 32 - r11 | t11 >>> r11;
        e10.shrSL = s2;
        var l2 = (e11, t11, r11) => e11 >>> r11 | t11 << 32 - r11;
        e10.rotrSH = l2;
        var u2 = (e11, t11, r11) => e11 << 32 - r11 | t11 >>> r11;
        e10.rotrSL = u2;
        var c2 = (e11, t11, r11) => e11 << 64 - r11 | t11 >>> r11 - 32;
        e10.rotrBH = c2;
        var d2 = (e11, t11, r11) => e11 >>> r11 - 32 | t11 << 64 - r11;
        e10.rotrBL = d2;
        var h2 = (e11, t11) => t11;
        e10.rotr32H = h2;
        var f2 = (e11, t11) => e11;
        e10.rotr32L = f2;
        var p2 = (e11, t11, r11) => e11 << r11 | t11 >>> 32 - r11;
        e10.rotlSH = p2;
        var g2 = (e11, t11, r11) => t11 << r11 | e11 >>> 32 - r11;
        e10.rotlSL = g2;
        var A2 = (e11, t11, r11) => t11 << r11 - 32 | e11 >>> 64 - r11;
        e10.rotlBH = A2;
        var m2 = (e11, t11, r11) => e11 << r11 - 32 | t11 >>> 64 - r11;
        function y2(e11, t11, r11, n11) {
          let i11 = (t11 >>> 0) + (n11 >>> 0);
          return { h: e11 + r11 + (i11 / 4294967296 | 0) | 0, l: 0 | i11 };
        }
        e10.rotlBL = m2;
        var w2 = (e11, t11, r11) => (e11 >>> 0) + (t11 >>> 0) + (r11 >>> 0);
        e10.add3L = w2;
        var b2 = (e11, t11, r11, n11) => t11 + r11 + n11 + (e11 / 4294967296 | 0) | 0;
        e10.add3H = b2;
        var v2 = (e11, t11, r11, n11) => (e11 >>> 0) + (t11 >>> 0) + (r11 >>> 0) + (n11 >>> 0);
        e10.add4L = v2;
        var E2 = (e11, t11, r11, n11, i11) => t11 + r11 + n11 + i11 + (e11 / 4294967296 | 0) | 0;
        e10.add4H = E2;
        var _2 = (e11, t11, r11, n11, i11) => (e11 >>> 0) + (t11 >>> 0) + (r11 >>> 0) + (n11 >>> 0) + (i11 >>> 0);
        e10.add5L = _2;
        var C2 = (e11, t11, r11, n11, i11, a11) => t11 + r11 + n11 + i11 + a11 + (e11 / 4294967296 | 0) | 0;
        e10.add5H = C2, e10.default = { fromBig: n10, split: i10, toBig: a10, shrSH: o2, shrSL: s2, rotrSH: l2, rotrSL: u2, rotrBH: c2, rotrBL: d2, rotr32H: h2, rotr32L: f2, rotlSH: p2, rotlSL: g2, rotlBH: A2, rotlBL: m2, add: y2, add3L: w2, add3H: b2, add4L: v2, add4H: E2, add5H: C2, add5L: _2 };
      }), eU = m((e10) => {
        Q(), U(), V(), H(), eE(), Object.defineProperty(e10, "__esModule", { value: true }), e10.crypto = void 0;
        var t10 = (eR(), v(e_));
        e10.crypto = t10 && "object" == typeof t10 && "webcrypto" in t10 ? t10.webcrypto : t10 && "object" == typeof t10 && "randomBytes" in t10 ? t10 : void 0;
      }), eV = m((e10) => {
        Q(), U(), V(), H(), eE(), Object.defineProperty(e10, "__esModule", { value: true }), e10.Hash = e10.nextTick = e10.byteSwapIfBE = e10.isLE = void 0, e10.isBytes = function(e11) {
          return e11 instanceof Uint8Array || ArrayBuffer.isView(e11) && "Uint8Array" === e11.constructor.name;
        }, e10.u8 = function(e11) {
          return new Uint8Array(e11.buffer, e11.byteOffset, e11.byteLength);
        }, e10.u32 = function(e11) {
          return new Uint32Array(e11.buffer, e11.byteOffset, Math.floor(e11.byteLength / 4));
        }, e10.createView = function(e11) {
          return new DataView(e11.buffer, e11.byteOffset, e11.byteLength);
        }, e10.rotr = function(e11, t11) {
          return e11 << 32 - t11 | e11 >>> t11;
        }, e10.rotl = function(e11, t11) {
          return e11 << t11 | e11 >>> 32 - t11 >>> 0;
        }, e10.byteSwap = n10, e10.byteSwap32 = function(e11) {
          for (let t11 = 0; t11 < e11.length; t11++) e11[t11] = n10(e11[t11]);
        }, e10.bytesToHex = function(e11) {
          (0, r10.abytes)(e11);
          let t11 = "";
          for (let r11 = 0; r11 < e11.length; r11++) t11 += i10[e11[r11]];
          return t11;
        }, e10.hexToBytes = function(e11) {
          if ("string" != typeof e11) throw Error("hex string expected, got " + typeof e11);
          let t11 = e11.length, r11 = t11 / 2;
          if (t11 % 2) throw Error("hex string expected, got unpadded hex of length " + t11);
          let n11 = new Uint8Array(r11);
          for (let t12 = 0, i11 = 0; t12 < r11; t12++, i11 += 2) {
            let r12 = a10(e11.charCodeAt(i11)), o3 = a10(e11.charCodeAt(i11 + 1));
            if (void 0 === r12 || void 0 === o3) throw Error('hex string expected, got non-hex character "' + (e11[i11] + e11[i11 + 1]) + '" at index ' + i11);
            n11[t12] = 16 * r12 + o3;
          }
          return n11;
        }, e10.asyncLoop = o2, e10.utf8ToBytes = s2, e10.toBytes = l2, e10.concatBytes = function(...e11) {
          let t11 = 0;
          for (let n12 = 0; n12 < e11.length; n12++) {
            let i11 = e11[n12];
            (0, r10.abytes)(i11), t11 += i11.length;
          }
          let n11 = new Uint8Array(t11);
          for (let t12 = 0, r11 = 0; t12 < e11.length; t12++) {
            let i11 = e11[t12];
            n11.set(i11, r11), r11 += i11.length;
          }
          return n11;
        }, e10.checkOpts = function(e11, t11) {
          if (void 0 !== t11 && "[object Object]" !== {}.toString.call(t11)) throw Error("Options should be object or undefined");
          return Object.assign(e11, t11);
        }, e10.wrapConstructor = function(e11) {
          let t11 = (t12) => e11().update(l2(t12)).digest(), r11 = e11();
          return t11.outputLen = r11.outputLen, t11.blockLen = r11.blockLen, t11.create = () => e11(), t11;
        }, e10.wrapConstructorWithOpts = function(e11) {
          let t11 = (t12, r12) => e11(r12).update(l2(t12)).digest(), r11 = e11({});
          return t11.outputLen = r11.outputLen, t11.blockLen = r11.blockLen, t11.create = (t12) => e11(t12), t11;
        }, e10.wrapXOFConstructorWithOpts = function(e11) {
          let t11 = (t12, r12) => e11(r12).update(l2(t12)).digest(), r11 = e11({});
          return t11.outputLen = r11.outputLen, t11.blockLen = r11.blockLen, t11.create = (t12) => e11(t12), t11;
        }, e10.randomBytes = function(e11 = 32) {
          if (t10.crypto && "function" == typeof t10.crypto.getRandomValues) return t10.crypto.getRandomValues(new Uint8Array(e11));
          if (t10.crypto && "function" == typeof t10.crypto.randomBytes) return t10.crypto.randomBytes(e11);
          throw Error("crypto.getRandomValues must be defined");
        };
        var t10 = eU(), r10 = eF();
        function n10(e11) {
          return e11 << 24 & 4278190080 | e11 << 8 & 16711680 | e11 >>> 8 & 65280 | e11 >>> 24 & 255;
        }
        e10.isLE = 68 === new Uint8Array(new Uint32Array([287454020]).buffer)[0], e10.byteSwapIfBE = e10.isLE ? (e11) => e11 : (e11) => n10(e11);
        var i10 = Array.from({ length: 256 }, (e11, t11) => t11.toString(16).padStart(2, "0"));
        function a10(e11) {
          return e11 >= 48 && e11 <= 57 ? e11 - 48 : e11 >= 65 && e11 <= 70 ? e11 - 55 : e11 >= 97 && e11 <= 102 ? e11 - 87 : void 0;
        }
        async function o2(t11, r11, n11) {
          let i11 = Date.now();
          for (let a11 = 0; a11 < t11; a11++) {
            n11(a11);
            let t12 = Date.now() - i11;
            t12 >= 0 && t12 < r11 || (await (0, e10.nextTick)(), i11 += t12);
          }
        }
        function s2(e11) {
          if ("string" != typeof e11) throw Error("utf8ToBytes expected string, got " + typeof e11);
          return new Uint8Array(new TextEncoder().encode(e11));
        }
        function l2(e11) {
          return "string" == typeof e11 && (e11 = s2(e11)), (0, r10.abytes)(e11), e11;
        }
        e10.nextTick = async () => {
        }, e10.Hash = class {
          clone() {
            return this._cloneInto();
          }
        };
      }), eH = m((e10) => {
        Q(), U(), V(), H(), eE(), Object.defineProperty(e10, "__esModule", { value: true }), e10.shake256 = e10.shake128 = e10.keccak_512 = e10.keccak_384 = e10.keccak_256 = e10.keccak_224 = e10.sha3_512 = e10.sha3_384 = e10.sha3_256 = e10.sha3_224 = e10.Keccak = void 0, e10.keccakP = m2;
        var t10 = eF(), r10 = eQ(), n10 = eV(), i10 = [], a10 = [], o2 = [], s2 = BigInt(0), l2 = BigInt(1), u2 = BigInt(2), c2 = BigInt(7), d2 = BigInt(256), h2 = BigInt(113);
        for (let e11 = 0, t11 = l2, r11 = 1, n11 = 0; e11 < 24; e11++) {
          [r11, n11] = [n11, (2 * r11 + 3 * n11) % 5], i10.push(2 * (5 * n11 + r11)), a10.push((e11 + 1) * (e11 + 2) / 2 % 64);
          let f3 = s2;
          for (let e12 = 0; e12 < 7; e12++) (t11 = (t11 << l2 ^ (t11 >> c2) * h2) % d2) & u2 && (f3 ^= l2 << (l2 << BigInt(e12)) - l2);
          o2.push(f3);
        }
        var [f2, p2] = (0, r10.split)(o2, true), g2 = (e11, t11, n11) => n11 > 32 ? (0, r10.rotlBH)(e11, t11, n11) : (0, r10.rotlSH)(e11, t11, n11), A2 = (e11, t11, n11) => n11 > 32 ? (0, r10.rotlBL)(e11, t11, n11) : (0, r10.rotlSL)(e11, t11, n11);
        function m2(e11, t11 = 24) {
          let r11 = new Uint32Array(10);
          for (let n11 = 24 - t11; n11 < 24; n11++) {
            for (let t13 = 0; t13 < 10; t13++) r11[t13] = e11[t13] ^ e11[t13 + 10] ^ e11[t13 + 20] ^ e11[t13 + 30] ^ e11[t13 + 40];
            for (let t13 = 0; t13 < 10; t13 += 2) {
              let n12 = (t13 + 8) % 10, i11 = (t13 + 2) % 10, a11 = r11[i11], o4 = r11[i11 + 1], s3 = g2(a11, o4, 1) ^ r11[n12], l3 = A2(a11, o4, 1) ^ r11[n12 + 1];
              for (let r12 = 0; r12 < 50; r12 += 10) e11[t13 + r12] ^= s3, e11[t13 + r12 + 1] ^= l3;
            }
            let t12 = e11[2], o3 = e11[3];
            for (let r12 = 0; r12 < 24; r12++) {
              let n12 = a10[r12], s3 = g2(t12, o3, n12), l3 = A2(t12, o3, n12), u3 = i10[r12];
              t12 = e11[u3], o3 = e11[u3 + 1], e11[u3] = s3, e11[u3 + 1] = l3;
            }
            for (let t13 = 0; t13 < 50; t13 += 10) {
              for (let n12 = 0; n12 < 10; n12++) r11[n12] = e11[t13 + n12];
              for (let n12 = 0; n12 < 10; n12++) e11[t13 + n12] ^= ~r11[(n12 + 2) % 10] & r11[(n12 + 4) % 10];
            }
            e11[0] ^= f2[n11], e11[1] ^= p2[n11];
          }
          r11.fill(0);
        }
        var y2 = class e11 extends n10.Hash {
          constructor(e12, r11, i11, a11 = false, o3 = 24) {
            if (super(), this.blockLen = e12, this.suffix = r11, this.outputLen = i11, this.enableXOF = a11, this.rounds = o3, this.pos = 0, this.posOut = 0, this.finished = false, this.destroyed = false, (0, t10.anumber)(i11), 0 >= this.blockLen || this.blockLen >= 200) throw Error("Sha3 supports only keccak-f1600 function");
            this.state = new Uint8Array(200), this.state32 = (0, n10.u32)(this.state);
          }
          keccak() {
            n10.isLE || (0, n10.byteSwap32)(this.state32), m2(this.state32, this.rounds), n10.isLE || (0, n10.byteSwap32)(this.state32), this.posOut = 0, this.pos = 0;
          }
          update(e12) {
            (0, t10.aexists)(this);
            let { blockLen: r11, state: i11 } = this, a11 = (e12 = (0, n10.toBytes)(e12)).length;
            for (let t11 = 0; t11 < a11; ) {
              let n11 = Math.min(r11 - this.pos, a11 - t11);
              for (let r12 = 0; r12 < n11; r12++) i11[this.pos++] ^= e12[t11++];
              this.pos === r11 && this.keccak();
            }
            return this;
          }
          finish() {
            if (this.finished) return;
            this.finished = true;
            let { state: e12, suffix: t11, pos: r11, blockLen: n11 } = this;
            e12[r11] ^= t11, (128 & t11) != 0 && r11 === n11 - 1 && this.keccak(), e12[n11 - 1] ^= 128, this.keccak();
          }
          writeInto(e12) {
            (0, t10.aexists)(this, false), (0, t10.abytes)(e12), this.finish();
            let r11 = this.state, { blockLen: n11 } = this;
            for (let t11 = 0, i11 = e12.length; t11 < i11; ) {
              this.posOut >= n11 && this.keccak();
              let a11 = Math.min(n11 - this.posOut, i11 - t11);
              e12.set(r11.subarray(this.posOut, this.posOut + a11), t11), this.posOut += a11, t11 += a11;
            }
            return e12;
          }
          xofInto(e12) {
            if (!this.enableXOF) throw Error("XOF is not possible for this instance");
            return this.writeInto(e12);
          }
          xof(e12) {
            return (0, t10.anumber)(e12), this.xofInto(new Uint8Array(e12));
          }
          digestInto(e12) {
            if ((0, t10.aoutput)(e12, this), this.finished) throw Error("digest() was already called");
            return this.writeInto(e12), this.destroy(), e12;
          }
          digest() {
            return this.digestInto(new Uint8Array(this.outputLen));
          }
          destroy() {
            this.destroyed = true, this.state.fill(0);
          }
          _cloneInto(t11) {
            let { blockLen: r11, suffix: n11, outputLen: i11, rounds: a11, enableXOF: o3 } = this;
            return t11 || (t11 = new e11(r11, n11, i11, o3, a11)), t11.state32.set(this.state32), t11.pos = this.pos, t11.posOut = this.posOut, t11.finished = this.finished, t11.rounds = a11, t11.suffix = n11, t11.outputLen = i11, t11.enableXOF = o3, t11.destroyed = this.destroyed, t11;
          }
        };
        e10.Keccak = y2;
        var w2 = (e11, t11, r11) => (0, n10.wrapConstructor)(() => new y2(t11, e11, r11));
        e10.sha3_224 = w2(6, 144, 28), e10.sha3_256 = w2(6, 136, 32), e10.sha3_384 = w2(6, 104, 48), e10.sha3_512 = w2(6, 72, 64), e10.keccak_224 = w2(1, 144, 28), e10.keccak_256 = w2(1, 136, 32), e10.keccak_384 = w2(1, 104, 48), e10.keccak_512 = w2(1, 72, 64);
        var b2 = (e11, t11, r11) => (0, n10.wrapXOFConstructorWithOpts)((n11 = {}) => new y2(t11, e11, void 0 === n11.dkLen ? r11 : n11.dkLen, true));
        e10.shake128 = b2(31, 168, 16), e10.shake256 = b2(31, 136, 32);
      }), eW = m((e10, t10) => {
        Q(), U(), V(), H(), eE();
        var { sha3_512: r10 } = eH(), n10 = 24, i10 = 32, a10 = (e11 = 4, t11 = Math.random) => {
          let r11 = "";
          for (; r11.length < e11; ) r11 += Math.floor(36 * t11()).toString(36);
          return r11;
        };
        function o2(e11) {
          let t11 = 0n;
          for (let r11 of e11.values()) t11 = (t11 << 8n) + BigInt(r11);
          return t11;
        }
        var s2 = (e11 = "") => o2(r10(e11)).toString(36).slice(1), l2 = Array.from({ length: 26 }, (e11, t11) => String.fromCharCode(t11 + 97)), u2 = ({ globalObj: e11 = "u" > typeof globalThis ? globalThis : {}, random: t11 = Math.random } = {}) => {
          let r11 = Object.keys(e11).toString();
          return s2(r11.length ? r11 + a10(i10, t11) : a10(i10, t11)).substring(0, i10);
        }, c2 = (e11) => () => e11++, d2 = 476782367, h2 = ({ random: e11 = Math.random, counter: t11 = c2(Math.floor(e11() * d2)), length: r11 = n10, fingerprint: i11 = u2({ random: e11 }) } = {}) => function() {
          let n11 = l2[Math.floor(e11() * l2.length)], o3 = Date.now().toString(36), u3 = t11().toString(36), c3 = a10(r11, e11), d3 = `${o3 + c3 + u3 + i11}`;
          return `${n11 + s2(d3).substring(1, r11)}`;
        }, f2 = h2();
        t10.exports.getConstants = () => ({ defaultLength: n10, bigLength: i10 }), t10.exports.init = h2, t10.exports.createId = f2, t10.exports.bufToBigInt = o2, t10.exports.createCounter = c2, t10.exports.createFingerprint = u2, t10.exports.isCuid = (e11, { minLength: t11 = 2, maxLength: r11 = i10 } = {}) => {
          let n11 = e11.length;
          return !!("string" == typeof e11 && n11 >= t11 && n11 <= r11 && /^[0-9a-z]+$/.test(e11));
        };
      }), eG = m((e10, t10) => {
        Q(), U(), V(), H(), eE();
        var { createId: r10, init: n10, getConstants: i10, isCuid: a10 } = eW();
        t10.exports.createId = r10, t10.exports.init = n10, t10.exports.getConstants = i10, t10.exports.isCuid = a10;
      }), eX = {};
      y(eX, { AnyNull: () => or.AnyNull, DMMF: () => tq, DbNull: () => or.DbNull, Debug: () => ty, Decimal: () => on.Decimal, Extensions: () => eJ, JsonNull: () => or.JsonNull, NullTypes: () => or.NullTypes, ObjectEnumValue: () => or.ObjectEnumValue, PrismaClientInitializationError: () => oe.PrismaClientInitializationError, PrismaClientKnownRequestError: () => oe.PrismaClientKnownRequestError, PrismaClientRustPanicError: () => oe.PrismaClientRustPanicError, PrismaClientUnknownRequestError: () => oe.PrismaClientUnknownRequestError, PrismaClientValidationError: () => oe.PrismaClientValidationError, Public: () => eY, Sql: () => ot.Sql, createParam: () => rw, defineDmmfProperty: () => rP, deserializeJsonObject: () => ng, deserializeRawResult: () => aB, dmmfToRuntimeDataModel: () => e4, empty: () => ot.empty, getPrismaClient: () => aY, getRuntime: () => a7, isAnyNull: () => or.isAnyNull, isDbNull: () => or.isDbNull, isJsonNull: () => or.isJsonNull, isObjectEnumValue: () => or.isObjectEnumValue, join: () => ot.join, makeStrictEnum: () => a1, makeTypedQueryFactory: () => rB, raw: () => ot.raw, serializeJsonQuery: () => rI, skip: () => rE, sqltag: () => ot.sql, warnOnce: () => tB }), t.exports = v(eX), Q(), U(), V(), H(), eE();
      var eJ = {};
      function ez(e10) {
        return "function" == typeof e10 ? e10 : (t10) => t10.$extends(e10);
      }
      function eK(e10) {
        return e10;
      }
      y(eJ, { defineExtension: () => ez, getExtensionContext: () => eK }), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var eY = {};
      function eZ() {
        return (e10) => e10;
      }
      y(eY, { validator: () => eZ }), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var e0 = class {
        _map = /* @__PURE__ */ new Map();
        get(e10) {
          return this._map.get(e10)?.value;
        }
        set(e10, t10) {
          this._map.set(e10, { value: t10 });
        }
        getOrCreate(e10, t10) {
          let r10 = this._map.get(e10);
          if (r10) return r10.value;
          let n10 = t10();
          return this.set(e10, n10), n10;
        }
      };
      function e1(e10) {
        return e10.substring(0, 1).toLowerCase() + e10.substring(1);
      }
      function e2(e10) {
        let t10;
        return { get: () => (t10 || (t10 = { value: e10() }), t10.value) };
      }
      function e4(e10) {
        return { models: e3(e10.models), enums: e3(e10.enums), types: e3(e10.types) };
      }
      function e3(e10) {
        let t10 = {};
        for (let { name: r10, ...n10 } of e10) t10[r10] = n10;
        return t10;
      }
      Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var e8 = e.r(84898);
      Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var e6, e9, e5, e7, te = true;
      "u" > typeof j && ({ FORCE_COLOR: e6, NODE_DISABLE_COLORS: e9, NO_COLOR: e5, TERM: e7 } = j.env || {}, te = j.stdout && j.stdout.isTTY);
      var tt = { enabled: !e9 && null == e5 && "dumb" !== e7 && (null != e6 && "0" !== e6 || te) };
      function tr(e10, t10) {
        let r10 = RegExp(`\\x1b\\[${t10}m`, "g"), n10 = `\x1B[${e10}m`, i10 = `\x1B[${t10}m`;
        return function(e11) {
          return tt.enabled && null != e11 ? n10 + (~("" + e11).indexOf(i10) ? e11.replace(r10, i10 + n10) : e11) + i10 : e11;
        };
      }
      tr(0, 0);
      var tn = tr(1, 22), ti = tr(2, 22), ta = (tr(3, 23), tr(4, 24)), to = (tr(7, 27), tr(8, 28), tr(9, 29), tr(30, 39), tr(31, 39)), ts = tr(32, 39), tl = tr(33, 39), tu = tr(34, 39), tc = (tr(35, 39), tr(36, 39)), td = (tr(37, 39), tr(90, 39));
      tr(90, 39), tr(40, 49), tr(41, 49), tr(42, 49), tr(43, 49), tr(44, 49), tr(45, 49), tr(46, 49), tr(47, 49), Q(), U(), V(), H(), eE();
      var th = ["green", "yellow", "blue", "magenta", "cyan", "red"], tf = [], tp = Date.now(), tg = 0, tA = "u" > typeof j ? j.env : {};
      globalThis.DEBUG ??= tA.DEBUG ?? "", globalThis.DEBUG_COLORS ??= !tA.DEBUG_COLORS || "true" === tA.DEBUG_COLORS;
      var tm = { enable(e10) {
        "string" == typeof e10 && (globalThis.DEBUG = e10);
      }, disable() {
        let e10 = globalThis.DEBUG;
        return globalThis.DEBUG = "", e10;
      }, enabled(e10) {
        let t10 = globalThis.DEBUG.split(",").map((e11) => e11.replace(/[.+?^${}()|[\]\\]/g, "\\$&")), r10 = t10.some((t11) => "" !== t11 && "-" !== t11[0] && e10.match(RegExp(t11.split("*").join(".*") + "$"))), n10 = t10.some((t11) => "" !== t11 && "-" === t11[0] && e10.match(RegExp(t11.slice(1).split("*").join(".*") + "$")));
        return r10 && !n10;
      }, log: (...e10) => {
        let [t10, r10, ...n10] = e10;
        (console.warn ?? console.log)(`${t10} ${r10}`, ...n10);
      }, formatters: {} }, ty = new Proxy(function(e10) {
        let t10 = { color: th[tg++ % th.length], enabled: tm.enabled(e10), namespace: e10, log: tm.log, extend: () => {
        } };
        return new Proxy((...e11) => {
          let { enabled: r10, namespace: n10, color: i10, log: a10 } = t10;
          if (0 !== e11.length && tf.push([n10, ...e11]), tf.length > 100 && tf.shift(), tm.enabled(n10) || r10) {
            let t11 = e11.map((e12) => "string" == typeof e12 ? e12 : function(e13, t12 = 2) {
              let r12 = /* @__PURE__ */ new Set();
              return JSON.stringify(e13, (e14, t13) => {
                if ("object" == typeof t13 && null !== t13) {
                  if (r12.has(t13)) return "[Circular *]";
                  r12.add(t13);
                } else if ("bigint" == typeof t13) return t13.toString();
                return t13;
              }, t12);
            }(e12)), r11 = `+${Date.now() - tp}ms`;
            tp = Date.now(), a10(n10, ...t11, r11);
          }
        }, { get: (e11, r10) => t10[r10], set: (e11, r10, n10) => t10[r10] = n10 });
      }, { get: (e10, t10) => tm[t10], set: (e10, t10, r10) => tm[t10] = r10 });
      function tw(e10, t10) {
        throw Error(t10);
      }
      Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var tb = "prisma+postgres:", tv = {};
      y(tv, { error: () => tS, info: () => tI, log: () => tC, query: () => tT, should: () => t_, tags: () => tE, warn: () => tx }), Q(), U(), V(), H(), eE();
      var tE = { error: to("prisma:error"), warn: tl("prisma:warn"), info: tc("prisma:info"), query: tu("prisma:query") }, t_ = { warn: () => !j.env.PRISMA_DISABLE_WARNINGS };
      function tC(...e10) {
        console.log(...e10);
      }
      function tx(e10, ...t10) {
        t_.warn() && console.warn(`${tE.warn} ${e10}`, ...t10);
      }
      function tI(e10, ...t10) {
        console.info(`${tE.info} ${e10}`, ...t10);
      }
      function tS(e10, ...t10) {
        console.error(`${tE.error} ${e10}`, ...t10);
      }
      function tT(e10, ...t10) {
        console.log(`${tE.query} ${e10}`, ...t10);
      }
      Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var tO = function({ onlyFirst: e10 = false } = {}) {
        return RegExp("[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\u0007|\\u001B\\u005C|\\u009C))|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))", e10 ? void 0 : "g");
      }();
      function tP(e10) {
        if ("string" != typeof e10) throw TypeError(`Expected a \`string\`, got \`${typeof e10}\``);
        return e10.replace(tO, "");
      }
      function tR(e10, t10) {
        let r10 = {};
        for (let n10 of Object.keys(e10)) r10[n10] = t10(e10[n10], n10);
        return r10;
      }
      function tN(e10, t10) {
        Object.defineProperty(e10, "name", { value: t10, configurable: true });
      }
      Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var tk = /* @__PURE__ */ new Set(), tB = (e10, t10, ...r10) => {
        tk.has(e10) || (tk.add(e10), tx(t10, ...r10));
      };
      function tD(e10) {
        return e10 instanceof Date || "[object Date]" === Object.prototype.toString.call(e10);
      }
      function tM(e10) {
        return "Invalid Date" !== e10.toString();
      }
      Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var t$ = e.r(84898);
      function tj(e10) {
        return !!t$.Decimal.isDecimal(e10) || null !== e10 && "object" == typeof e10 && "number" == typeof e10.s && "number" == typeof e10.e && "function" == typeof e10.toFixed && Array.isArray(e10.d);
      }
      Q(), U(), V(), H(), eE();
      var tL = e.r(84898);
      Q(), U(), V(), H(), eE();
      var tq = {};
      function tF(e10) {
        return { name: e10.name, values: e10.values.map((e11) => e11.name) };
      }
      y(tq, { ModelAction: () => tQ, datamodelEnumToSchemaEnum: () => tF }), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var tQ = ((n = tQ || {}).findUnique = "findUnique", n.findUniqueOrThrow = "findUniqueOrThrow", n.findFirst = "findFirst", n.findFirstOrThrow = "findFirstOrThrow", n.findMany = "findMany", n.create = "create", n.createMany = "createMany", n.createManyAndReturn = "createManyAndReturn", n.update = "update", n.updateMany = "updateMany", n.updateManyAndReturn = "updateManyAndReturn", n.upsert = "upsert", n.delete = "delete", n.deleteMany = "deleteMany", n.groupBy = "groupBy", n.count = "count", n.aggregate = "aggregate", n.findRaw = "findRaw", n.aggregateRaw = "aggregateRaw", n);
      b(eD());
      var tU = { red: to, gray: td, dim: ti, bold: tn, underline: ta, highlightSource: (e10) => e10.highlight() }, tV = { red: (e10) => e10, gray: (e10) => e10, dim: (e10) => e10, bold: (e10) => e10, underline: (e10) => e10, highlightSource: (e10) => e10 };
      function tH(e10) {
        let t10 = e10.showColors ? tU : tV;
        return function({ functionName: e11, location: t11, message: r10, isPanic: n10, contextLines: i10, callArguments: a10 }, o2) {
          var s2;
          let l2, u2 = [""], c2 = t11 ? " in" : ":";
          if (n10 ? (u2.push(o2.red(`Oops, an unknown error occurred! This is ${o2.bold("on us")}, you did nothing wrong.`)), u2.push(o2.red(`It occurred in the ${o2.bold(`\`${e11}\``)} invocation${c2}`))) : u2.push(o2.red(`Invalid ${o2.bold(`\`${e11}\``)} invocation${c2}`)), t11 && u2.push(o2.underline((l2 = [(s2 = t11).fileName], s2.lineNumber && l2.push(String(s2.lineNumber)), s2.columnNumber && l2.push(String(s2.columnNumber)), l2.join(":")))), i10) {
            u2.push("");
            let e12 = [i10.toString()];
            a10 && (e12.push(a10), e12.push(o2.dim(")"))), u2.push(e12.join("")), a10 && u2.push("");
          } else u2.push(""), a10 && u2.push(a10), u2.push("");
          return u2.push(r10), u2.join(`
`);
        }("u" > typeof $getTemplateParameters ? $getTemplateParameters(e10, t10) : function({ message: e11, originalMethod: t11, isPanic: r10, callArguments: n10 }) {
          return { functionName: `prisma.${t11}()`, message: e11, isPanic: r10 ?? false, callArguments: n10 };
        }(e10), t10);
      }
      Q(), U(), V(), H(), eE();
      var tW = b(e$());
      function tG(e10) {
        let t10 = 0;
        return Array.isArray(e10.selectionPath) && (t10 += e10.selectionPath.length), Array.isArray(e10.argumentPath) && (t10 += e10.argumentPath.length), t10;
      }
      function tX(e10) {
        switch (e10.kind) {
          case "InvalidArgumentValue":
          case "ValueTooLarge":
            return 20;
          case "InvalidArgumentType":
            return 10;
          case "RequiredArgumentMissing":
            return -10;
          default:
            return 0;
        }
      }
      Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var tJ = class {
        constructor(e10, t10) {
          this.name = e10, this.value = t10;
        }
        isRequired = false;
        makeRequired() {
          return this.isRequired = true, this;
        }
        write(e10) {
          let { colors: { green: t10 } } = e10.context;
          e10.addMarginSymbol(t10(this.isRequired ? "+" : "?")), e10.write(t10(this.name)), this.isRequired || e10.write(t10("?")), e10.write(t10(": ")), "string" == typeof this.value ? e10.write(t10(this.value)) : e10.write(this.value);
        }
      };
      Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), eL(), Q(), U(), V(), H(), eE();
      var tz = class {
        constructor(e10 = 0, t10) {
          this.context = t10, this.currentIndent = e10;
        }
        lines = [];
        currentLine = "";
        currentIndent = 0;
        marginSymbol;
        afterNextNewLineCallback;
        write(e10) {
          return "string" == typeof e10 ? this.currentLine += e10 : e10.write(this), this;
        }
        writeJoined(e10, t10, r10 = (e11, t11) => t11.write(e11)) {
          let n10 = t10.length - 1;
          for (let i10 = 0; i10 < t10.length; i10++) r10(t10[i10], this), i10 !== n10 && this.write(e10);
          return this;
        }
        writeLine(e10) {
          return this.write(e10).newLine();
        }
        newLine() {
          this.lines.push(this.indentedCurrentLine()), this.currentLine = "", this.marginSymbol = void 0;
          let e10 = this.afterNextNewLineCallback;
          return this.afterNextNewLineCallback = void 0, e10?.(), this;
        }
        withIndent(e10) {
          return this.indent(), e10(this), this.unindent(), this;
        }
        afterNextNewline(e10) {
          return this.afterNextNewLineCallback = e10, this;
        }
        indent() {
          return this.currentIndent++, this;
        }
        unindent() {
          return this.currentIndent > 0 && this.currentIndent--, this;
        }
        addMarginSymbol(e10) {
          return this.marginSymbol = e10, this;
        }
        toString() {
          return this.lines.concat(this.indentedCurrentLine()).join(`
`);
        }
        getCurrentLineLength() {
          return this.currentLine.length;
        }
        indentedCurrentLine() {
          let e10 = this.currentLine.padStart(this.currentLine.length + 2 * this.currentIndent);
          return this.marginSymbol ? this.marginSymbol + e10.slice(1) : e10;
        }
      };
      ej(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var tK = class {
        constructor(e10) {
          this.value = e10;
        }
        write(e10) {
          e10.write(this.value);
        }
        markAsError() {
          this.value.markAsError();
        }
      };
      Q(), U(), V(), H(), eE();
      var tY = (e10) => e10, tZ = { bold: tY, red: tY, green: tY, dim: tY, enabled: false }, t0 = { bold: tn, red: to, green: ts, dim: ti, enabled: true }, t1 = { write(e10) {
        e10.writeLine(",");
      } };
      Q(), U(), V(), H(), eE();
      var t2 = class {
        constructor(e10) {
          this.contents = e10;
        }
        isUnderlined = false;
        color = (e10) => e10;
        underline() {
          return this.isUnderlined = true, this;
        }
        setColor(e10) {
          return this.color = e10, this;
        }
        write(e10) {
          let t10 = e10.getCurrentLineLength();
          e10.write(this.color(this.contents)), this.isUnderlined && e10.afterNextNewline(() => {
            e10.write(" ".repeat(t10)).writeLine(this.color("~".repeat(this.contents.length)));
          });
        }
      };
      Q(), U(), V(), H(), eE();
      var t4 = class {
        hasError = false;
        markAsError() {
          return this.hasError = true, this;
        }
      }, t3 = class extends t4 {
        items = [];
        addItem(e10) {
          return this.items.push(new tK(e10)), this;
        }
        getField(e10) {
          return this.items[e10];
        }
        getPrintWidth() {
          return 0 === this.items.length ? 2 : Math.max(...this.items.map((e10) => e10.value.getPrintWidth())) + 2;
        }
        write(e10) {
          0 === this.items.length ? this.writeEmpty(e10) : this.writeWithItems(e10);
        }
        writeEmpty(e10) {
          let t10 = new t2("[]");
          this.hasError && t10.setColor(e10.context.colors.red).underline(), e10.write(t10);
        }
        writeWithItems(e10) {
          let { colors: t10 } = e10.context;
          e10.writeLine("[").withIndent(() => e10.writeJoined(t1, this.items).newLine()).write("]"), this.hasError && e10.afterNextNewline(() => {
            e10.writeLine(t10.red("~".repeat(this.getPrintWidth())));
          });
        }
        asObject() {
        }
      }, t8 = class e10 extends t4 {
        fields = {};
        suggestions = [];
        addField(e11) {
          this.fields[e11.name] = e11;
        }
        addSuggestion(e11) {
          this.suggestions.push(e11);
        }
        getField(e11) {
          return this.fields[e11];
        }
        getDeepField(t10) {
          let [r10, ...n10] = t10, i10 = this.getField(r10);
          if (!i10) return;
          let a10 = i10;
          for (let t11 of n10) {
            let r11;
            if (a10.value instanceof e10 ? r11 = a10.value.getField(t11) : a10.value instanceof t3 && (r11 = a10.value.getField(Number(t11))), !r11) return;
            a10 = r11;
          }
          return a10;
        }
        getDeepFieldValue(e11) {
          return 0 === e11.length ? this : this.getDeepField(e11)?.value;
        }
        hasField(e11) {
          return !!this.getField(e11);
        }
        removeAllFields() {
          this.fields = {};
        }
        removeField(e11) {
          delete this.fields[e11];
        }
        getFields() {
          return this.fields;
        }
        isEmpty() {
          return 0 === Object.keys(this.fields).length;
        }
        getFieldValue(e11) {
          return this.getField(e11)?.value;
        }
        getDeepSubSelectionValue(t10) {
          let r10 = this;
          for (let n10 of t10) {
            if (!(r10 instanceof e10)) return;
            let t11 = r10.getSubSelectionValue(n10);
            if (!t11) return;
            r10 = t11;
          }
          return r10;
        }
        getDeepSelectionParent(t10) {
          let r10 = this.getSelectionParent();
          if (!r10) return;
          let n10 = r10;
          for (let r11 of t10) {
            let t11 = n10.value.getFieldValue(r11);
            if (!t11 || !(t11 instanceof e10)) return;
            let i10 = t11.getSelectionParent();
            if (!i10) return;
            n10 = i10;
          }
          return n10;
        }
        getSelectionParent() {
          let e11 = this.getField("select")?.value.asObject();
          if (e11) return { kind: "select", value: e11 };
          let t10 = this.getField("include")?.value.asObject();
          if (t10) return { kind: "include", value: t10 };
        }
        getSubSelectionValue(e11) {
          return this.getSelectionParent()?.value.fields[e11].value;
        }
        getPrintWidth() {
          let e11 = Object.values(this.fields);
          return 0 == e11.length ? 2 : Math.max(...e11.map((e12) => e12.getPrintWidth())) + 2;
        }
        write(e11) {
          let t10 = Object.values(this.fields);
          0 === t10.length && 0 === this.suggestions.length ? this.writeEmpty(e11) : this.writeWithContents(e11, t10);
        }
        asObject() {
          return this;
        }
        writeEmpty(e11) {
          let t10 = new t2("{}");
          this.hasError && t10.setColor(e11.context.colors.red).underline(), e11.write(t10);
        }
        writeWithContents(e11, t10) {
          e11.writeLine("{").withIndent(() => {
            e11.writeJoined(t1, [...t10, ...this.suggestions]).newLine();
          }), e11.write("}"), this.hasError && e11.afterNextNewline(() => {
            e11.writeLine(e11.context.colors.red("~".repeat(this.getPrintWidth())));
          });
        }
      };
      Q(), U(), V(), H(), eE();
      var t6 = class extends t4 {
        constructor(e10) {
          super(), this.text = e10;
        }
        getPrintWidth() {
          return this.text.length;
        }
        write(e10) {
          let t10 = new t2(this.text);
          this.hasError && t10.underline().setColor(e10.context.colors.red), e10.write(t10);
        }
        asObject() {
        }
      };
      Q(), U(), V(), H(), eE();
      var t9 = class {
        fields = [];
        addField(e10, t10) {
          return this.fields.push({ write(r10) {
            let { green: n10, dim: i10 } = r10.context.colors;
            r10.write(n10(i10(`${e10}: ${t10}`))).addMarginSymbol(n10(i10("+")));
          } }), this;
        }
        write(e10) {
          let { colors: { green: t10 } } = e10.context;
          e10.writeLine(t10("{")).withIndent(() => {
            e10.writeJoined(t1, this.fields).newLine();
          }).write(t10("}")).addMarginSymbol(t10("+"));
        }
      };
      function t5(e10, t10, r10) {
        let n10 = [`Unknown argument \`${e10.red(t10)}\`.`], i10 = function(e11, t11) {
          let r11 = 1 / 0, n11;
          for (let i11 of t11) {
            let t12 = (0, tW.default)(e11, i11);
            t12 > 3 || t12 < r11 && (r11 = t12, n11 = i11);
          }
          return n11;
        }(t10, r10);
        return i10 && n10.push(`Did you mean \`${e10.green(i10)}\`?`), r10.length > 0 && n10.push(rn(e10)), n10.join(" ");
      }
      function t7(e10, t10) {
        for (let r10 of t10.fields) e10.hasField(r10.name) || e10.addSuggestion(new tJ(r10.name, "true"));
      }
      function re(e10, t10) {
        let [r10, n10] = rr(e10), i10 = t10.arguments.getDeepSubSelectionValue(r10)?.asObject();
        if (!i10) return { parentKind: "unknown", fieldName: n10 };
        let a10 = i10.getFieldValue("select")?.asObject(), o2 = i10.getFieldValue("include")?.asObject(), s2 = i10.getFieldValue("omit")?.asObject(), l2 = a10?.getField(n10);
        return a10 && l2 ? { parentKind: "select", parent: a10, field: l2, fieldName: n10 } : (l2 = o2?.getField(n10), o2 && l2 ? { parentKind: "include", field: l2, parent: o2, fieldName: n10 } : (l2 = s2?.getField(n10), s2 && l2 ? { parentKind: "omit", field: l2, parent: s2, fieldName: n10 } : { parentKind: "unknown", fieldName: n10 }));
      }
      function rt(e10, t10) {
        if ("object" === t10.kind) for (let r10 of t10.fields) e10.hasField(r10.name) || e10.addSuggestion(new tJ(r10.name, r10.typeNames.join(" | ")));
      }
      function rr(e10) {
        let t10 = [...e10], r10 = t10.pop();
        if (!r10) throw Error("unexpected empty path");
        return [t10, r10];
      }
      function rn({ green: e10, enabled: t10 }) {
        return "Available options are " + (t10 ? `listed in ${e10("green")}` : "marked with ?") + ".";
      }
      function ri(e10, t10) {
        if (1 === t10.length) return t10[0];
        let r10 = [...t10], n10 = r10.pop();
        return `${r10.join(", ")} ${e10} ${n10}`;
      }
      Q(), U(), V(), H(), eE();
      var ra = e.r(84898);
      Q(), U(), V(), H(), eE();
      var ro = class {
        modelName;
        name;
        typeName;
        isList;
        isEnum;
        constructor(e10, t10, r10, n10, i10) {
          this.modelName = e10, this.name = t10, this.typeName = r10, this.isList = n10, this.isEnum = i10;
        }
        _toGraphQLInputType() {
          let e10 = this.isList ? "List" : "", t10 = this.isEnum ? "Enum" : "";
          return `${e10}${t10}${this.typeName}FieldRefInput<${this.modelName}>`;
        }
      };
      function rs(e10) {
        return e10 instanceof ro;
      }
      Q(), U(), V(), H(), eE();
      var rl = class {
        constructor(e10, t10) {
          this.name = e10, this.value = t10;
        }
        hasError = false;
        markAsError() {
          this.hasError = true;
        }
        getPrintWidth() {
          return this.name.length + this.value.getPrintWidth() + 2;
        }
        write(e10) {
          let t10 = new t2(this.name);
          this.hasError && t10.underline().setColor(e10.context.colors.red), e10.write(t10).write(": ").write(this.value);
        }
      }, ru = class {
        arguments;
        errorMessages = [];
        constructor(e10) {
          this.arguments = e10;
        }
        write(e10) {
          e10.write(this.arguments);
        }
        addErrorMessage(e10) {
          this.errorMessages.push(e10);
        }
        renderAllMessages(e10) {
          return this.errorMessages.map((t10) => t10(e10)).join(`
`);
        }
      };
      function rc(e10) {
        return new ru(rd(e10));
      }
      function rd(e10) {
        let t10 = new t8();
        for (let [r10, n10] of Object.entries(e10)) {
          let e11 = new rl(r10, function e12(t11) {
            if ("string" == typeof t11) return new t6(JSON.stringify(t11));
            if ("number" == typeof t11 || "boolean" == typeof t11) return new t6(String(t11));
            if ("bigint" == typeof t11) return new t6(`${t11}n`);
            if (null === t11) return new t6("null");
            if (void 0 === t11) return new t6("undefined");
            if (tj(t11)) return new t6(`new Prisma.Decimal("${t11.toFixed()}")`);
            if (t11 instanceof Uint8Array) return new t6(M.isBuffer(t11) ? `Buffer.alloc(${t11.byteLength})` : `new Uint8Array(${t11.byteLength})`);
            if (t11 instanceof Date) {
              let e13 = tM(t11) ? t11.toISOString() : "Invalid Date";
              return new t6(`new Date("${e13}")`);
            }
            return (0, ra.isObjectEnumValue)(t11) ? new t6(`Prisma.${t11._getName()}`) : rs(t11) ? new t6(`prisma.${e1(t11.modelName)}.$fields.${t11.name}`) : Array.isArray(t11) ? function(t12) {
              let r11 = new t3();
              for (let n11 of t12) r11.addItem(e12(n11));
              return r11;
            }(t11) : "object" == typeof t11 ? rd(t11) : new t6(Object.prototype.toString.call(t11));
          }(n10));
          t10.addField(e11);
        }
        return t10;
      }
      function rh(e10, t10) {
        let r10 = "pretty" === t10 ? t0 : tZ;
        return { message: e10.renderAllMessages(r10), args: new tz(0, { colors: r10 }).write(e10).toString() };
      }
      function rf({ args: e10, errors: t10, errorFormat: r10, callsite: n10, originalMethod: i10, clientVersion: a10, globalOmit: o2 }) {
        let s2 = rc(e10);
        for (let e11 of t10) !function e12(t11, r11, n11) {
          switch (t11.kind) {
            case "MutuallyExclusiveFields":
              let i11;
              h2 = t11, f2 = r11, (i11 = f2.arguments.getDeepSubSelectionValue(h2.selectionPath)?.asObject()) && (i11.getField(h2.firstField)?.markAsError(), i11.getField(h2.secondField)?.markAsError()), f2.addErrorMessage((e13) => `Please ${e13.bold("either")} use ${e13.green(`\`${h2.firstField}\``)} or ${e13.green(`\`${h2.secondField}\``)}, but ${e13.red("not both")} at the same time.`);
              break;
            case "IncludeOnScalar":
              !function(e13, t12) {
                let [r12, n12] = rr(e13.selectionPath), i12 = e13.outputType, a12 = t12.arguments.getDeepSelectionParent(r12)?.value;
                if (a12 && (a12.getField(n12)?.markAsError(), i12)) for (let e14 of i12.fields) e14.isRelation && a12.addSuggestion(new tJ(e14.name, "true"));
                t12.addErrorMessage((e14) => {
                  let t13 = `Invalid scalar field ${e14.red(`\`${n12}\``)} for ${e14.bold("include")} statement`;
                  return i12 ? t13 += ` on model ${e14.bold(i12.name)}. ${rn(e14)}` : t13 += ".", t13 += `
Note that ${e14.bold("include")} statements only accept relation fields.`;
                });
              }(t11, r11);
              break;
            case "EmptySelection":
              !function(e13, t12, r12) {
                let n12 = t12.arguments.getDeepSubSelectionValue(e13.selectionPath)?.asObject();
                if (n12) {
                  let r13 = n12.getField("omit")?.value.asObject();
                  if (r13) {
                    var i12, a12, o4 = e13, s4 = t12, l4 = r13;
                    for (let e14 of (l4.removeAllFields(), o4.outputType.fields)) l4.addSuggestion(new tJ(e14.name, "false"));
                    s4.addErrorMessage((e14) => `The ${e14.red("omit")} statement includes every field of the model ${e14.bold(o4.outputType.name)}. At least one field must be included in the result`);
                    return;
                  }
                  if (n12.hasField("select")) {
                    let r14, n13, o5;
                    return i12 = e13, a12 = t12, r14 = i12.outputType, n13 = a12.arguments.getDeepSelectionParent(i12.selectionPath)?.value, o5 = n13?.isEmpty() ?? false, n13 && (n13.removeAllFields(), t7(n13, r14)), a12.addErrorMessage((e14) => o5 ? `The ${e14.red("`select`")} statement for type ${e14.bold(r14.name)} must not be empty. ${rn(e14)}` : `The ${e14.red("`select`")} statement for type ${e14.bold(r14.name)} needs ${e14.bold("at least one truthy value")}.`);
                  }
                }
                r12?.[e1(e13.outputType.name)] ? function(e14, t13) {
                  let r13 = new t9();
                  for (let t14 of e14.outputType.fields) t14.isRelation || r13.addField(t14.name, "false");
                  let n13 = new tJ("omit", r13).makeRequired();
                  if (0 === e14.selectionPath.length) t13.arguments.addSuggestion(n13);
                  else {
                    let [r14, i13] = rr(e14.selectionPath), a13 = t13.arguments.getDeepSelectionParent(r14)?.value.asObject()?.getField(i13);
                    if (a13) {
                      let e15 = a13?.value.asObject() ?? new t8();
                      e15.addSuggestion(n13), a13.value = e15;
                    }
                  }
                  t13.addErrorMessage((t14) => `The global ${t14.red("omit")} configuration excludes every field of the model ${t14.bold(e14.outputType.name)}. At least one field must be included in the result`);
                }(e13, t12) : t12.addErrorMessage(() => `Unknown field at "${e13.selectionPath.join(".")} selection"`);
              }(t11, r11, n11);
              break;
            case "UnknownSelectionField":
              !function(e13, t12) {
                let r12 = re(e13.selectionPath, t12);
                if ("unknown" !== r12.parentKind) {
                  r12.field.markAsError();
                  let t13 = r12.parent;
                  switch (r12.parentKind) {
                    case "select":
                      t7(t13, e13.outputType);
                      break;
                    case "include":
                      var n12 = t13, i12 = e13.outputType;
                      for (let e14 of i12.fields) e14.isRelation && !n12.hasField(e14.name) && n12.addSuggestion(new tJ(e14.name, "true"));
                      break;
                    case "omit":
                      var a12 = t13, o4 = e13.outputType;
                      for (let e14 of o4.fields) a12.hasField(e14.name) || e14.isRelation || a12.addSuggestion(new tJ(e14.name, "true"));
                  }
                }
                t12.addErrorMessage((t13) => {
                  let n13 = [`Unknown field ${t13.red(`\`${r12.fieldName}\``)}`];
                  return "unknown" !== r12.parentKind && n13.push(`for ${t13.bold(r12.parentKind)} statement`), n13.push(`on model ${t13.bold(`\`${e13.outputType.name}\``)}.`), n13.push(rn(t13)), n13.join(" ");
                });
              }(t11, r11);
              break;
            case "InvalidSelectionValue":
              let a11;
              p2 = t11, g2 = r11, "unknown" !== (a11 = re(p2.selectionPath, g2)).parentKind && a11.field.value.markAsError(), g2.addErrorMessage((e13) => `Invalid value for selection field \`${e13.red(a11.fieldName)}\`: ${p2.underlyingError}`);
              break;
            case "UnknownArgument":
              let o3, s3;
              A2 = t11, m2 = r11, o3 = A2.argumentPath[0], (s3 = m2.arguments.getDeepSubSelectionValue(A2.selectionPath)?.asObject()) && (s3.getField(o3)?.markAsError(), function(e13, t12) {
                for (let r12 of t12) e13.hasField(r12.name) || e13.addSuggestion(new tJ(r12.name, r12.typeNames.join(" | ")));
              }(s3, A2.arguments)), m2.addErrorMessage((e13) => t5(e13, o3, A2.arguments.map((e14) => e14.name)));
              break;
            case "UnknownInputField":
              !function(e13, t12) {
                let [r12, n12] = rr(e13.argumentPath), i12 = t12.arguments.getDeepSubSelectionValue(e13.selectionPath)?.asObject();
                if (i12) {
                  i12.getDeepField(e13.argumentPath)?.markAsError();
                  let t13 = i12.getDeepFieldValue(r12)?.asObject();
                  t13 && rt(t13, e13.inputType);
                }
                t12.addErrorMessage((t13) => t5(t13, n12, e13.inputType.fields.map((e14) => e14.name)));
              }(t11, r11);
              break;
            case "RequiredArgumentMissing":
              !function(e13, t12) {
                let r12;
                t12.addErrorMessage((e14) => r12?.value instanceof t6 && "null" === r12.value.text ? `Argument \`${e14.green(a12)}\` must not be ${e14.red("null")}.` : `Argument \`${e14.green(a12)}\` is missing.`);
                let n12 = t12.arguments.getDeepSubSelectionValue(e13.selectionPath)?.asObject();
                if (!n12) return;
                let [i12, a12] = rr(e13.argumentPath), o4 = new t9(), s4 = n12.getDeepFieldValue(i12)?.asObject();
                if (s4) {
                  if ((r12 = s4.getField(a12)) && s4.removeField(a12), 1 === e13.inputTypes.length && "object" === e13.inputTypes[0].kind) {
                    for (let t13 of e13.inputTypes[0].fields) o4.addField(t13.name, t13.typeNames.join(" | "));
                    s4.addSuggestion(new tJ(a12, o4).makeRequired());
                  } else {
                    let t13 = e13.inputTypes.map(function e14(t14) {
                      return "list" === t14.kind ? `${e14(t14.elementType)}[]` : t14.name;
                    }).join(" | ");
                    s4.addSuggestion(new tJ(a12, t13).makeRequired());
                  }
                  if (e13.dependentArgumentPath) {
                    n12.getDeepField(e13.dependentArgumentPath)?.markAsError();
                    let [, r13] = rr(e13.dependentArgumentPath);
                    t12.addErrorMessage((e14) => `Argument \`${e14.green(a12)}\` is required because argument \`${e14.green(r13)}\` was provided.`);
                  }
                }
              }(t11, r11);
              break;
            case "InvalidArgumentType":
              let l3, u3;
              y2 = t11, w2 = r11, l3 = y2.argument.name, (u3 = w2.arguments.getDeepSubSelectionValue(y2.selectionPath)?.asObject()) && u3.getDeepFieldValue(y2.argumentPath)?.markAsError(), w2.addErrorMessage((e13) => {
                let t12 = ri("or", y2.argument.typeNames.map((t13) => e13.green(t13)));
                return `Argument \`${e13.bold(l3)}\`: Invalid value provided. Expected ${t12}, provided ${e13.red(y2.inferredType)}.`;
              });
              break;
            case "InvalidArgumentValue":
              let c3, d2;
              b2 = t11, v2 = r11, c3 = b2.argument.name, (d2 = v2.arguments.getDeepSubSelectionValue(b2.selectionPath)?.asObject()) && d2.getDeepFieldValue(b2.argumentPath)?.markAsError(), v2.addErrorMessage((e13) => {
                let t12 = [`Invalid value for argument \`${e13.bold(c3)}\``];
                if (b2.underlyingError && t12.push(`: ${b2.underlyingError}`), t12.push("."), b2.argument.typeNames.length > 0) {
                  let r12 = ri("or", b2.argument.typeNames.map((t13) => e13.green(t13)));
                  t12.push(` Expected ${r12}.`);
                }
                return t12.join("");
              });
              break;
            case "ValueTooLarge":
              var h2, f2, p2, g2, A2, m2, y2, w2, b2, v2, E2 = t11, _2 = r11;
              let C2 = E2.argument.name, x2 = _2.arguments.getDeepSubSelectionValue(E2.selectionPath)?.asObject(), I2;
              if (x2) {
                let e13 = x2.getDeepField(E2.argumentPath)?.value;
                e13?.markAsError(), e13 instanceof t6 && (I2 = e13.text);
              }
              _2.addErrorMessage((e13) => {
                let t12 = ["Unable to fit value"];
                return I2 && t12.push(e13.red(I2)), t12.push(`into a 64-bit signed integer for field \`${e13.bold(C2)}\``), t12.join(" ");
              });
              break;
            case "SomeFieldsMissing":
              var S2 = t11, T2 = r11;
              let O2 = S2.argumentPath[S2.argumentPath.length - 1], P2 = T2.arguments.getDeepSubSelectionValue(S2.selectionPath)?.asObject();
              if (P2) {
                let e13 = P2.getDeepFieldValue(S2.argumentPath)?.asObject();
                e13 && rt(e13, S2.inputType);
              }
              T2.addErrorMessage((e13) => {
                let t12 = [`Argument \`${e13.bold(O2)}\` of type ${e13.bold(S2.inputType.name)} needs`];
                return 1 === S2.constraints.minFieldCount ? S2.constraints.requiredFields ? t12.push(`${e13.green("at least one of")} ${ri("or", S2.constraints.requiredFields.map((t13) => `\`${e13.bold(t13)}\``))} arguments.`) : t12.push(`${e13.green("at least one")} argument.`) : t12.push(`${e13.green(`at least ${S2.constraints.minFieldCount}`)} arguments.`), t12.push(rn(e13)), t12.join(" ");
              });
              break;
            case "TooManyFieldsGiven":
              var R2 = t11, N2 = r11;
              let k2 = R2.argumentPath[R2.argumentPath.length - 1], B2 = N2.arguments.getDeepSubSelectionValue(R2.selectionPath)?.asObject(), D2 = [];
              if (B2) {
                let e13 = B2.getDeepFieldValue(R2.argumentPath)?.asObject();
                e13 && (e13.markAsError(), D2 = Object.keys(e13.getFields()));
              }
              N2.addErrorMessage((e13) => {
                let t12 = [`Argument \`${e13.bold(k2)}\` of type ${e13.bold(R2.inputType.name)} needs`];
                return 1 === R2.constraints.minFieldCount && 1 == R2.constraints.maxFieldCount ? t12.push(`${e13.green("exactly one")} argument,`) : 1 == R2.constraints.maxFieldCount ? t12.push(`${e13.green("at most one")} argument,`) : t12.push(`${e13.green(`at most ${R2.constraints.maxFieldCount}`)} arguments,`), t12.push(`but you provided ${ri("and", D2.map((t13) => e13.red(t13)))}. Please choose`), 1 === R2.constraints.maxFieldCount ? t12.push("one.") : t12.push(`${R2.constraints.maxFieldCount}.`), t12.join(" ");
              });
              break;
            case "Union":
              let M2;
              (M2 = function(e13) {
                if (0 === e13.length) return;
                let t12 = e13[0];
                for (let r12 = 1; r12 < e13.length; r12++) 0 > ((e14, t13) => {
                  let r13 = tG(e14), n12 = tG(t13);
                  return r13 !== n12 ? r13 - n12 : tX(e14) - tX(t13);
                })(t12, e13[r12]) && (t12 = e13[r12]);
                return t12;
              }(function(e13) {
                let t12 = /* @__PURE__ */ new Map(), r12 = [];
                for (let a12 of e13) {
                  var n12, i12;
                  if ("InvalidArgumentType" !== a12.kind) {
                    r12.push(a12);
                    continue;
                  }
                  let e14 = `${a12.selectionPath.join(".")}:${a12.argumentPath.join(".")}`, o4 = t12.get(e14);
                  o4 ? t12.set(e14, { ...a12, argument: { ...a12.argument, typeNames: (n12 = o4.argument.typeNames, i12 = a12.argument.typeNames, [...new Set(n12.concat(i12))]) } }) : t12.set(e14, a12);
                }
                return r12.push(...t12.values()), r12;
              }(function e13(t12) {
                return t12.errors.flatMap((t13) => "Union" === t13.kind ? e13(t13) : [t13]);
              }(t11)))) ? e12(M2, r11, n11) : r11.addErrorMessage(() => "Unknown error");
              break;
            default:
              throw Error("not implemented: " + t11.kind);
          }
        }(e11, s2, o2);
        let { message: l2, args: u2 } = rh(s2, r10), c2 = tH({ message: l2, callsite: n10, originalMethod: i10, showColors: "pretty" === r10, callArguments: u2 });
        throw new tL.PrismaClientValidationError(c2, { clientVersion: a10 });
      }
      function rp(e10) {
        return e10.replace(/^./, (e11) => e11.toLowerCase());
      }
      function rg(e10, t10, r10) {
        return r10 ? tR(r10, ({ needs: e11, compute: r11 }, n10) => {
          var i10, a10, o2;
          let s2;
          return { name: n10, needs: e11 ? Object.keys(e11).filter((t11) => e11[t11]) : [], compute: (i10 = t10, a10 = n10, o2 = r11, (s2 = i10?.[a10]?.compute) ? (e12) => o2({ ...e12, [a10]: s2(e12) }) : o2) };
        }) : {};
      }
      Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var rA = class {
        constructor(e10, t10) {
          this.extension = e10, this.previous = t10;
        }
        computedFieldsCache = new e0();
        modelExtensionsCache = new e0();
        queryCallbacksCache = new e0();
        clientExtensions = e2(() => this.extension.client ? { ...this.previous?.getAllClientExtensions(), ...this.extension.client } : this.previous?.getAllClientExtensions());
        batchCallbacks = e2(() => {
          let e10 = this.previous?.getAllBatchQueryCallbacks() ?? [], t10 = this.extension.query?.$__internalBatch;
          return t10 ? e10.concat(t10) : e10;
        });
        getAllComputedFields(e10) {
          return this.computedFieldsCache.getOrCreate(e10, () => {
            var t10, r10, n10;
            let i10, a10, o2;
            return t10 = this.previous?.getAllComputedFields(e10), r10 = this.extension, i10 = rp(e10), r10.result && (r10.result.$allModels || r10.result[i10]) ? (n10 = { ...t10, ...rg(r10.name, t10, r10.result.$allModels), ...rg(r10.name, t10, r10.result[i10]) }, a10 = new e0(), o2 = (e11, t11) => a10.getOrCreate(e11, () => t11.has(e11) ? [e11] : (t11.add(e11), n10[e11] ? n10[e11].needs.flatMap((e12) => o2(e12, t11)) : [e11])), tR(n10, (e11) => ({ ...e11, needs: o2(e11.name, /* @__PURE__ */ new Set()) }))) : t10;
          });
        }
        getAllClientExtensions() {
          return this.clientExtensions.get();
        }
        getAllModelExtensions(e10) {
          return this.modelExtensionsCache.getOrCreate(e10, () => {
            let t10 = rp(e10);
            return this.extension.model && (this.extension.model[t10] || this.extension.model.$allModels) ? { ...this.previous?.getAllModelExtensions(e10), ...this.extension.model.$allModels, ...this.extension.model[t10] } : this.previous?.getAllModelExtensions(e10);
          });
        }
        getAllQueryCallbacks(e10, t10) {
          return this.queryCallbacksCache.getOrCreate(`${e10}:${t10}`, () => {
            let r10 = this.previous?.getAllQueryCallbacks(e10, t10) ?? [], n10 = [], i10 = this.extension.query;
            return i10 && (i10[e10] || i10.$allModels || i10[t10] || i10.$allOperations) ? (void 0 !== i10[e10] && (void 0 !== i10[e10][t10] && n10.push(i10[e10][t10]), void 0 !== i10[e10].$allOperations && n10.push(i10[e10].$allOperations)), "$none" !== e10 && void 0 !== i10.$allModels && (void 0 !== i10.$allModels[t10] && n10.push(i10.$allModels[t10]), void 0 !== i10.$allModels.$allOperations && n10.push(i10.$allModels.$allOperations)), void 0 !== i10[t10] && n10.push(i10[t10]), void 0 !== i10.$allOperations && n10.push(i10.$allOperations), r10.concat(n10)) : r10;
          });
        }
        getAllBatchQueryCallbacks() {
          return this.batchCallbacks.get();
        }
      }, rm = class e10 {
        constructor(e11) {
          this.head = e11;
        }
        static empty() {
          return new e10();
        }
        static single(t10) {
          return new e10(new rA(t10));
        }
        isEmpty() {
          return void 0 === this.head;
        }
        append(t10) {
          return new e10(new rA(t10, this.head));
        }
        getAllComputedFields(e11) {
          return this.head?.getAllComputedFields(e11);
        }
        getAllClientExtensions() {
          return this.head?.getAllClientExtensions();
        }
        getAllModelExtensions(e11) {
          return this.head?.getAllModelExtensions(e11);
        }
        getAllQueryCallbacks(e11, t10) {
          return this.head?.getAllQueryCallbacks(e11, t10) ?? [];
        }
        getAllBatchQueryCallbacks() {
          return this.head?.getAllBatchQueryCallbacks() ?? [];
        }
      };
      Q(), U(), V(), H(), eE();
      var ry = class {
        constructor(e10) {
          this.name = e10;
        }
      };
      function rw(e10) {
        return new ry(e10);
      }
      Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var rb = Symbol(), rv = class {
        constructor(e10) {
          if (e10 !== rb) throw Error("Skip instance can not be constructed directly");
        }
        ifUndefined(e10) {
          return void 0 === e10 ? rE : e10;
        }
      }, rE = new rv(rb);
      function r_(e10) {
        return e10 instanceof rv;
      }
      var rC = { findUnique: "findUnique", findUniqueOrThrow: "findUniqueOrThrow", findFirst: "findFirst", findFirstOrThrow: "findFirstOrThrow", findMany: "findMany", count: "aggregate", create: "createOne", createMany: "createMany", createManyAndReturn: "createManyAndReturn", update: "updateOne", updateMany: "updateMany", updateManyAndReturn: "updateManyAndReturn", upsert: "upsertOne", delete: "deleteOne", deleteMany: "deleteMany", executeRaw: "executeRaw", queryRaw: "queryRaw", aggregate: "aggregate", groupBy: "groupBy", runCommandRaw: "runCommandRaw", findRaw: "findRaw", aggregateRaw: "aggregateRaw" }, rx = "explicitly `undefined` values are not allowed";
      function rI({ modelName: e10, action: t10, args: r10, runtimeDataModel: n10, extensions: i10 = rm.empty(), callsite: a10, clientMethod: o2, errorFormat: s2, clientVersion: l2, previewFeatures: u2, globalOmit: c2, wrapRawValues: d2 }) {
        let h2 = new rO({ runtimeDataModel: n10, modelName: e10, action: t10, rootArgs: r10, callsite: a10, extensions: i10, selectionPath: [], argumentPath: [], originalMethod: o2, errorFormat: s2, clientVersion: l2, previewFeatures: u2, globalOmit: c2, wrapRawValues: d2 });
        return { modelName: e10, action: rC[t10], query: function e11({ select: t11, include: r11, ...n11 } = {}, i11) {
          var a11, o3, s3, l3, u3, c3, d3;
          let h3, f2 = n11.omit;
          return delete n11.omit, { arguments: rS(n11, i11), selection: (a11 = t11, o3 = r11, s3 = f2, l3 = i11, a11 ? (o3 ? l3.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "include", secondField: "select", selectionPath: l3.getSelectionPath() }) : s3 && l3.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "omit", secondField: "select", selectionPath: l3.getSelectionPath() }), function(t12, r12) {
            let n12 = {}, i12 = r12.getComputedFields();
            for (let [a12, o4] of Object.entries(function(e12, t13) {
              if (!t13) return e12;
              let r13 = { ...e12 };
              for (let n13 of Object.values(t13)) if (e12[n13.name]) for (let e13 of n13.needs) r13[e13] = true;
              return r13;
            }(t12, i12))) {
              if (r_(o4)) continue;
              let t13 = r12.nestSelection(a12);
              rT(o4, t13);
              let s4 = r12.findField(a12);
              if (!(i12?.[a12] && !s4)) {
                if (false === o4 || void 0 === o4 || r_(o4)) {
                  n12[a12] = false;
                  continue;
                }
                if (true === o4) {
                  s4?.kind === "object" ? n12[a12] = e11({}, t13) : n12[a12] = true;
                  continue;
                }
                n12[a12] = e11(o4, t13);
              }
            }
            return n12;
          }(a11, l3)) : (u3 = l3, c3 = o3, d3 = s3, h3 = {}, u3.modelOrType && !u3.isRawAction() && (h3.$composites = true, h3.$scalars = true), c3 && function(t12, r12, n12) {
            for (let [i12, a12] of Object.entries(r12)) {
              if (r_(a12)) continue;
              let r13 = n12.nestSelection(i12);
              if (rT(a12, r13), false === a12 || void 0 === a12) {
                t12[i12] = false;
                continue;
              }
              let o4 = n12.findField(i12);
              if (o4 && "object" !== o4.kind && n12.throwValidationError({ kind: "IncludeOnScalar", selectionPath: n12.getSelectionPath().concat(i12), outputType: n12.getOutputTypeDescription() }), o4) {
                t12[i12] = e11(true === a12 ? {} : a12, r13);
                continue;
              }
              if (true === a12) {
                t12[i12] = true;
                continue;
              }
              t12[i12] = e11(a12, r13);
            }
          }(h3, c3, u3), function(e12, t12, r12) {
            let n12 = r12.getComputedFields();
            for (let [i12, a12] of Object.entries(function(e13, t13) {
              if (!t13) return e13;
              let r13 = { ...e13 };
              for (let n13 of Object.values(t13)) if (!e13[n13.name]) for (let e14 of n13.needs) delete r13[e14];
              return r13;
            }({ ...r12.getGlobalOmit(), ...t12 }, n12))) {
              if (r_(a12)) continue;
              rT(a12, r12.nestSelection(i12));
              let t13 = r12.findField(i12);
              n12?.[i12] && !t13 || (e12[i12] = !a12);
            }
          }(h3, d3, u3), h3)) };
        }(r10, h2) };
      }
      function rS(e10, t10) {
        if (t10.shouldWrapRawValues() && e10.$type) return { $type: "Raw", value: e10 };
        let r10 = {};
        for (let n10 in e10) {
          let i10 = e10[n10], a10 = t10.nestArgument(n10);
          r_(i10) || (void 0 !== i10 ? r10[n10] = function e11(t11, r11) {
            var n11, i11;
            if (null === t11) return null;
            if ("string" == typeof t11 || "number" == typeof t11 || "boolean" == typeof t11) return t11;
            if ("bigint" == typeof t11) return { $type: "BigInt", value: String(t11) };
            if (tD(t11)) {
              if (tM(t11)) return { $type: "DateTime", value: t11.toISOString() };
              r11.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: r11.getSelectionPath(), argumentPath: r11.getArgumentPath(), argument: { name: r11.getArgumentName(), typeNames: ["Date"] }, underlyingError: "Provided Date object is invalid" });
            }
            if (t11 instanceof ry) return { $type: "Param", value: t11.name };
            if (rs(t11)) return { $type: "FieldRef", value: { _ref: t11.name, _container: t11.modelName } };
            if (Array.isArray(t11)) return function(t12, r12) {
              let n12 = [];
              for (let i12 = 0; i12 < t12.length; i12++) {
                let a11 = r12.nestArgument(String(i12)), o2 = t12[i12];
                if (void 0 === o2 || r_(o2)) {
                  let e12 = void 0 === o2 ? "undefined" : "Prisma.skip";
                  r12.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: a11.getSelectionPath(), argumentPath: a11.getArgumentPath(), argument: { name: `${r12.getArgumentName()}[${i12}]`, typeNames: [] }, underlyingError: `Can not use \`${e12}\` value within array. Use \`null\` or filter out \`${e12}\` values` });
                }
                n12.push(e11(o2, a11));
              }
              return n12;
            }(t11, r11);
            if (ArrayBuffer.isView(t11)) {
              let { buffer: e12, byteOffset: r12, byteLength: n12 } = t11;
              return { $type: "Bytes", value: M.from(e12, r12, n12).toString("base64") };
            }
            if ("object" == typeof (n11 = t11) && null !== n11 && true === n11.__prismaRawParameters__) return t11.values;
            if (tj(t11)) return { $type: "Decimal", value: t11.toFixed() };
            if ((0, e8.isObjectEnumValue)(t11)) {
              let e12 = t11._getName();
              if ("DbNull" !== e12 && "JsonNull" !== e12 && "AnyNull" !== e12) throw Error(`Invalid ObjectEnumValue: expected DbNull, JsonNull, or AnyNull, got ${e12}`);
              return { $type: "Enum", value: e12 };
            }
            return "object" == typeof (i11 = t11) && null !== i11 && "function" == typeof i11.toJSON ? t11.toJSON() : "object" == typeof t11 ? rS(t11, r11) : void r11.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: r11.getSelectionPath(), argumentPath: r11.getArgumentPath(), argument: { name: r11.getArgumentName(), typeNames: [] }, underlyingError: `We could not serialize ${Object.prototype.toString.call(t11)} value. Serialize the object to JSON or implement a ".toJSON()" method on it` });
          }(i10, a10) : t10.isPreviewFeatureOn("strictUndefinedChecks") && t10.throwValidationError({ kind: "InvalidArgumentValue", argumentPath: a10.getArgumentPath(), selectionPath: t10.getSelectionPath(), argument: { name: t10.getArgumentName(), typeNames: [] }, underlyingError: rx }));
        }
        return r10;
      }
      function rT(e10, t10) {
        void 0 === e10 && t10.isPreviewFeatureOn("strictUndefinedChecks") && t10.throwValidationError({ kind: "InvalidSelectionValue", selectionPath: t10.getSelectionPath(), underlyingError: rx });
      }
      var rO = class e10 {
        constructor(e11) {
          this.params = e11, this.params.modelName && (this.modelOrType = this.params.runtimeDataModel.models[this.params.modelName] ?? this.params.runtimeDataModel.types[this.params.modelName]);
        }
        modelOrType;
        throwValidationError(e11) {
          rf({ errors: [e11], originalMethod: this.params.originalMethod, args: this.params.rootArgs ?? {}, callsite: this.params.callsite, errorFormat: this.params.errorFormat, clientVersion: this.params.clientVersion, globalOmit: this.params.globalOmit });
        }
        getSelectionPath() {
          return this.params.selectionPath;
        }
        getArgumentPath() {
          return this.params.argumentPath;
        }
        getArgumentName() {
          return this.params.argumentPath[this.params.argumentPath.length - 1];
        }
        getOutputTypeDescription() {
          if (!(!this.params.modelName || !this.modelOrType)) return { name: this.params.modelName, fields: this.modelOrType.fields.map((e11) => ({ name: e11.name, typeName: "boolean", isRelation: "object" === e11.kind })) };
        }
        isRawAction() {
          return ["executeRaw", "queryRaw", "runCommandRaw", "findRaw", "aggregateRaw"].includes(this.params.action);
        }
        isPreviewFeatureOn(e11) {
          return this.params.previewFeatures.includes(e11);
        }
        shouldWrapRawValues() {
          return this.params.wrapRawValues ?? true;
        }
        getComputedFields() {
          if (this.params.modelName) return this.params.extensions.getAllComputedFields(this.params.modelName);
        }
        findField(e11) {
          return this.modelOrType?.fields.find((t10) => t10.name === e11);
        }
        nestSelection(t10) {
          let r10 = this.findField(t10), n10 = r10?.kind === "object" ? r10.type : void 0;
          return new e10({ ...this.params, modelName: n10, selectionPath: this.params.selectionPath.concat(t10) });
        }
        getGlobalOmit() {
          return this.params.modelName && this.shouldApplyGlobalOmit() ? this.params.globalOmit?.[e1(this.params.modelName)] ?? {} : {};
        }
        shouldApplyGlobalOmit() {
          switch (this.params.action) {
            case "findFirst":
            case "findFirstOrThrow":
            case "findUniqueOrThrow":
            case "findMany":
            case "upsert":
            case "findUnique":
            case "createManyAndReturn":
            case "create":
            case "update":
            case "updateManyAndReturn":
            case "delete":
              return true;
            case "executeRaw":
            case "aggregateRaw":
            case "runCommandRaw":
            case "findRaw":
            case "createMany":
            case "deleteMany":
            case "groupBy":
            case "updateMany":
            case "count":
            case "aggregate":
            case "queryRaw":
              return false;
            default:
              tw(this.params.action, "Unknown action");
          }
        }
        nestArgument(t10) {
          return new e10({ ...this.params, argumentPath: this.params.argumentPath.concat(t10) });
        }
      };
      function rP(e10, t10) {
        let r10 = e2(() => function() {
          throw Error("Prisma.dmmf is not available when running in edge runtimes.");
        }());
        Object.defineProperty(e10, "dmmf", { get: () => r10.get() });
      }
      Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var rR = /* @__PURE__ */ new WeakMap(), rN = "$$PrismaTypedSql", rk = class {
        constructor(e10, t10) {
          rR.set(this, { sql: e10, values: t10 }), Object.defineProperty(this, rN, { value: rN });
        }
        get sql() {
          return rR.get(this).sql;
        }
        get values() {
          return rR.get(this).values;
        }
      };
      function rB(e10) {
        return (...t10) => new rk(e10, t10);
      }
      function rD(e10) {
        return null != e10 && e10[rN] === rN;
      }
      Q(), U(), V(), H(), eE();
      var rM = e.r(84898);
      function r$(e10) {
        return { getKeys: () => Object.keys(e10), getPropertyValue: (t10) => e10[t10] };
      }
      function rj(e10, t10) {
        return { getKeys: () => [e10], getPropertyValue: () => t10() };
      }
      function rL(e10) {
        let t10 = new e0();
        return { getKeys: () => e10.getKeys(), getPropertyValue: (r10) => t10.getOrCreate(r10, () => e10.getPropertyValue(r10)), getPropertyDescriptor: (t11) => e10.getPropertyDescriptor?.(t11) };
      }
      Q(), U(), V(), H(), eE(), eq(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var rq = { enumerable: true, configurable: true, writable: true };
      function rF(e10) {
        let t10 = new Set(e10);
        return { getPrototypeOf: () => Object.prototype, getOwnPropertyDescriptor: () => rq, has: (e11, r10) => t10.has(r10), set: (e11, r10, n10) => t10.add(r10) && Reflect.set(e11, r10, n10), ownKeys: () => [...t10] };
      }
      var rQ = Symbol.for("nodejs.util.inspect.custom");
      function rU(e10, t10) {
        let r10 = function(e11) {
          let t11 = /* @__PURE__ */ new Map();
          for (let r11 of e11) for (let e12 of r11.getKeys()) t11.set(e12, r11);
          return t11;
        }(t10), n10 = /* @__PURE__ */ new Set(), i10 = new Proxy(e10, { get(e11, t11) {
          if (n10.has(t11)) return e11[t11];
          let i11 = r10.get(t11);
          return i11 ? i11.getPropertyValue(t11) : e11[t11];
        }, has(e11, t11) {
          if (n10.has(t11)) return true;
          let i11 = r10.get(t11);
          return i11 ? i11.has?.(t11) ?? true : Reflect.has(e11, t11);
        }, ownKeys: (e11) => [.../* @__PURE__ */ new Set([...rV(Reflect.ownKeys(e11), r10), ...rV(Array.from(r10.keys()), r10), ...n10])], set: (e11, t11, i11) => r10.get(t11)?.getPropertyDescriptor?.(t11)?.writable !== false && (n10.add(t11), Reflect.set(e11, t11, i11)), getOwnPropertyDescriptor(e11, t11) {
          let n11 = Reflect.getOwnPropertyDescriptor(e11, t11);
          if (n11 && !n11.configurable) return n11;
          let i11 = r10.get(t11);
          return i11 ? i11.getPropertyDescriptor ? { ...rq, ...i11?.getPropertyDescriptor(t11) } : rq : n11;
        }, defineProperty: (e11, t11, r11) => (n10.add(t11), Reflect.defineProperty(e11, t11, r11)), getPrototypeOf: () => Object.prototype });
        return i10[rQ] = function() {
          let e11 = { ...this };
          return delete e11[rQ], e11;
        }, i10;
      }
      function rV(e10, t10) {
        return e10.filter((e11) => t10.get(e11)?.has?.(e11) ?? true);
      }
      function rH(e10) {
        return { getKeys: () => e10, has: () => false, getPropertyValue() {
        } };
      }
      Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var rW = class {
        getLocation() {
          return null;
        }
      };
      function rG(e10) {
        return "function" == typeof $EnabledCallSite && "minimal" !== e10 ? new $EnabledCallSite() : new rW();
      }
      Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var rX = { _avg: true, _count: true, _sum: true, _min: true, _max: true };
      function rJ(e10 = {}) {
        return Object.entries(function(e11 = {}) {
          return "boolean" == typeof e11._count ? { ...e11, _count: { _all: e11._count } } : e11;
        }(e10)).reduce((e11, [t10, r10]) => (void 0 !== rX[t10] ? e11.select[t10] = { select: r10 } : e11[t10] = r10, e11), { select: {} });
      }
      function rz(e10 = {}) {
        return (t10) => ("boolean" == typeof e10._count && (t10._count = t10._count._all), t10);
      }
      function rK(e10 = {}) {
        let { select: t10, ...r10 } = e10;
        return "object" == typeof t10 ? rJ({ ...r10, _count: t10 }) : rJ({ ...r10, _count: { _all: true } });
      }
      function rY(e10 = {}) {
        let t10 = rJ(e10);
        if (Array.isArray(t10.by)) for (let e11 of t10.by) "string" == typeof e11 && (t10.select[e11] = true);
        else "string" == typeof t10.by && (t10.select[t10.by] = true);
        return t10;
      }
      Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var rZ = (e10) => Array.isArray(e10) ? e10 : e10.split("."), r0 = (e10, t10) => rZ(t10).reduce((e11, t11) => e11 && e11[t11], e10), r1 = ["findUnique", "findUniqueOrThrow", "findFirst", "findFirstOrThrow", "create", "update", "upsert", "delete"], r2 = ["aggregate", "count", "groupBy"];
      function r4(e10, t10) {
        var r10, n10, i10, a10;
        let o2, s2, l2 = e10._extensions.getAllModelExtensions(t10) ?? {};
        return rU({}, [(r10 = e10, o2 = rp(n10 = t10), s2 = Object.keys(tQ).concat("count"), { getKeys: () => s2, getPropertyValue(e11) {
          var t11;
          let i11 = (t12) => (i12) => {
            let a11 = rG(r10._errorFormat);
            return r10._createPrismaPromise((s3) => {
              let l3 = { args: i12, dataPath: [], action: e11, model: n10, clientMethod: `${o2}.${e11}`, jsModelName: o2, transaction: s3, callsite: a11 };
              return r10._request({ ...l3, ...t12 });
            }, { action: e11, args: i12, model: n10 });
          };
          return r1.includes(e11) ? function e12(t12, r11, n11, i12, a11, o3) {
            let s3 = t12._runtimeDataModel.models[r11].fields.reduce((e13, t13) => ({ ...e13, [t13.name]: t13 }), {});
            return (l3) => {
              var u2, c2;
              let d2, h2 = rG(t12._errorFormat), f2 = void 0 === i12 || void 0 === a11 ? [] : [...a11, "select", i12], p2 = void 0 === o3 ? l3 ?? {} : (d2 = l3 || true, rZ(f2).reduceRight((e13, t13, r12, n12) => Object.assign({}, r0(o3, n12.slice(0, r12)), { [t13]: e13 }), d2)), g2 = n11({ dataPath: f2, callsite: h2 })(p2), A2 = (u2 = t12, c2 = r11, u2._runtimeDataModel.models[c2].fields.filter((e13) => "object" === e13.kind).map((e13) => e13.name));
              return new Proxy(g2, { get: (r12, i13) => A2.includes(i13) ? e12(t12, s3[i13].type, n11, i13, f2, p2) : r12[i13], ...rF([...A2, ...Object.getOwnPropertyNames(g2)]) });
            };
          }(r10, n10, i11) : (t11 = e11, r2.includes(t11)) ? "aggregate" === e11 ? (e12) => i11({ action: "aggregate", unpacker: rz(e12), argsMapper: rJ })(e12) : "count" === e11 ? (e12) => i11({ action: "count", unpacker: function(e13 = {}) {
            return "object" == typeof e13.select ? (t12) => rz(e13)(t12)._count : (t12) => rz(e13)(t12)._count._all;
          }(e12), argsMapper: rK })(e12) : "groupBy" === e11 ? (e12) => i11({ action: "groupBy", unpacker: /* @__PURE__ */ function(e13 = {}) {
            return (t12) => ("boolean" == typeof e13?._count && t12.forEach((e14) => {
              e14._count = e14._count._all;
            }), t12);
          }(e12), argsMapper: rY })(e12) : void 0 : i11({});
        } }), (i10 = e10, a10 = t10, rL(rj("fields", () => {
          let e11, t11 = i10._runtimeDataModel.models[a10];
          return new Proxy({}, { get(t12, r11) {
            if (r11 in t12 || "symbol" == typeof r11) return t12[r11];
            let n11 = e11[r11];
            if (n11) return new ro(a10, r11, n11.type, n11.isList, "enum" === n11.kind);
          }, ...rF(Object.keys(e11 = function(e12, t12) {
            let r11 = {};
            for (let n11 of e12) r11[n11[t12]] = n11;
            return r11;
          }(t11.fields.filter((e12) => !e12.relationName), "name"))) });
        }))), r$(l2), rj("name", () => t10), rj("$name", () => t10), rj("$parent", () => e10._appliedParent)]);
      }
      Q(), U(), V(), H(), eE();
      var r3 = Symbol();
      function r8(e10) {
        var t10, r10;
        let n10, i10, a10, o2, s2 = [(n10 = [...new Set(Object.getOwnPropertyNames(Object.getPrototypeOf((t10 = e10)._originalClient)))], { getKeys: () => n10, getPropertyValue: (e11) => t10[e11] }), (a10 = (i10 = Object.keys((r10 = e10)._runtimeDataModel.models)).map(rp), o2 = [...new Set(i10.concat(a10))], rL({ getKeys: () => o2, getPropertyValue(e11) {
          let t11 = e11.replace(/^./, (e12) => e12.toUpperCase());
          return void 0 !== r10._runtimeDataModel.models[t11] ? r4(r10, t11) : void 0 !== r10._runtimeDataModel.models[e11] ? r4(r10, e11) : void 0;
        }, getPropertyDescriptor(e11) {
          if (!a10.includes(e11)) return { enumerable: false };
        } })), rj(r3, () => e10), rj("$parent", () => e10._appliedParent)], l2 = e10._extensions.getAllClientExtensions();
        return l2 && s2.push(r$(l2)), rU(e10, s2);
      }
      function r6(e10) {
        return "function" == typeof e10 ? e10(this) : r8(Object.create(this._originalClient, { _extensions: { value: this._extensions.append(e10) }, _appliedParent: { value: this, configurable: true }, $on: { value: void 0 } }));
      }
      function r9({ visitor: e10, result: t10, args: r10, runtimeDataModel: n10, modelName: i10 }) {
        if (Array.isArray(t10)) {
          for (let a11 = 0; a11 < t10.length; a11++) t10[a11] = r9({ result: t10[a11], args: r10, modelName: i10, runtimeDataModel: n10, visitor: e10 });
          return t10;
        }
        let a10 = e10(t10, i10, r10) ?? t10;
        return r10.include && r5({ includeOrSelect: r10.include, result: a10, parentModelName: i10, runtimeDataModel: n10, visitor: e10 }), r10.select && r5({ includeOrSelect: r10.select, result: a10, parentModelName: i10, runtimeDataModel: n10, visitor: e10 }), a10;
      }
      function r5({ includeOrSelect: e10, result: t10, parentModelName: r10, runtimeDataModel: n10, visitor: i10 }) {
        for (let [a10, o2] of Object.entries(e10)) {
          if (!o2 || null == t10[a10] || r_(o2)) continue;
          let e11 = n10.models[r10].fields.find((e12) => e12.name === a10);
          if (!e11 || "object" !== e11.kind || !e11.relationName) continue;
          let s2 = "object" == typeof o2 ? o2 : {};
          t10[a10] = r9({ visitor: i10, result: t10[a10], args: s2, modelName: e11.type, runtimeDataModel: n10 });
        }
      }
      Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var r7 = e.r(84898);
      Q(), U(), V(), H(), eE();
      var ne = ["$connect", "$disconnect", "$on", "$use", "$extends"];
      function nt(e10) {
        if ("object" != typeof e10 || null == e10 || (0, r7.isObjectEnumValue)(e10) || rs(e10) || r_(e10)) return e10;
        if (tj(e10)) return new r7.Decimal(e10.toFixed());
        if (tD(e10)) return /* @__PURE__ */ new Date(+e10);
        if (ArrayBuffer.isView(e10)) return e10.slice(0);
        if (Array.isArray(e10)) {
          let t10 = e10.length, r10;
          for (r10 = Array(t10); t10--; ) r10[t10] = nt(e10[t10]);
          return r10;
        }
        if ("object" == typeof e10) {
          let t10 = {};
          for (let r10 in e10) "__proto__" === r10 ? Object.defineProperty(t10, r10, { value: nt(e10[r10]), configurable: true, enumerable: true, writable: true }) : t10[r10] = nt(e10[r10]);
          return t10;
        }
        tw(e10, "Unknown value");
      }
      var nr = (e10) => e10;
      function nn(e10 = nr, t10 = nr) {
        return (r10) => e10(t10(r10));
      }
      function ni(e10) {
        return !!e10 && "object" == typeof e10 && !Array.isArray(e10);
      }
      Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var na = e.r(84898);
      Q(), U(), V(), H(), eE();
      var no = e.r(84898);
      function ns(e10, t10) {
        throw Error(t10);
      }
      function nl(e10, t10) {
        let r10 = Object.keys(e10), n10 = Object.keys(t10);
        return (r10.length < n10.length ? r10 : n10).every((r11) => {
          if (typeof e10[r11] == typeof t10[r11] && "object" != typeof e10[r11]) return e10[r11] === t10[r11];
          if (no.Decimal.isDecimal(e10[r11]) || no.Decimal.isDecimal(t10[r11])) {
            let n11 = nu(e10[r11]), i10 = nu(t10[r11]);
            return n11 && i10 && n11.equals(i10);
          }
          if (e10[r11] instanceof Uint8Array || t10[r11] instanceof Uint8Array) {
            let n11 = nc(e10[r11]), i10 = nc(t10[r11]);
            return n11 && i10 && n11.equals(i10);
          }
          return e10[r11] instanceof Date || t10[r11] instanceof Date ? nd(e10[r11])?.getTime() === nd(t10[r11])?.getTime() : "bigint" == typeof e10[r11] || "bigint" == typeof t10[r11] ? nh(e10[r11]) === nh(t10[r11]) : "number" == typeof e10[r11] || "number" == typeof t10[r11] ? nf(e10[r11]) === nf(t10[r11]) : function e11(t11, r12) {
            return t11 === r12 || null !== t11 && null !== r12 && "object" == typeof t11 && "object" == typeof r12 && Object.keys(t11).length === Object.keys(r12).length && Object.keys(t11).every((n11) => e11(t11[n11], r12[n11]));
          }(e10[r11], t10[r11]);
        });
      }
      function nu(e10) {
        return no.Decimal.isDecimal(e10) ? e10 : "number" == typeof e10 || "string" == typeof e10 ? new no.Decimal(e10) : void 0;
      }
      function nc(e10) {
        return M.isBuffer(e10) ? e10 : e10 instanceof Uint8Array ? M.from(e10.buffer, e10.byteOffset, e10.byteLength) : "string" == typeof e10 ? M.from(e10, "base64") : void 0;
      }
      function nd(e10) {
        return e10 instanceof Date ? e10 : "string" == typeof e10 || "number" == typeof e10 ? new Date(e10) : void 0;
      }
      function nh(e10) {
        return "bigint" == typeof e10 ? e10 : "number" == typeof e10 || "string" == typeof e10 ? BigInt(e10) : void 0;
      }
      function nf(e10) {
        return "number" == typeof e10 ? e10 : "string" == typeof e10 ? Number(e10) : void 0;
      }
      function np(e10) {
        return JSON.stringify(e10, (e11, t10) => "bigint" == typeof t10 ? t10.toString() : ArrayBuffer.isView(t10) ? M.from(t10.buffer, t10.byteOffset, t10.byteLength).toString("base64") : t10);
      }
      function ng(e10) {
        return null === e10 ? e10 : Array.isArray(e10) ? e10.map(ng) : "object" == typeof e10 ? null !== e10 && "object" == typeof e10 && "string" == typeof e10.$type ? function({ $type: e11, value: t10 }) {
          switch (e11) {
            case "BigInt":
              return BigInt(t10);
            case "Bytes": {
              let { buffer: e12, byteOffset: r10, byteLength: n10 } = M.from(t10, "base64");
              return new Uint8Array(e12, r10, n10);
            }
            case "DateTime":
              return new Date(t10);
            case "Decimal":
              return new na.Decimal(t10);
            case "Json":
              return JSON.parse(t10);
            case "Raw":
            case "Enum":
              return t10;
            case "FieldRef":
              throw Error("FieldRef tagged values cannot be deserialized to JavaScript values");
            default:
              ns(t10, "Unknown tagged value");
          }
        }(e10) : null !== e10.constructor && "Object" !== e10.constructor.name ? e10 : function(e11, t10) {
          let r10 = {};
          for (let n10 of Object.keys(e11)) r10[n10] = t10(e11[n10], n10);
          return r10;
        }(e10, ng) : e10;
      }
      function nA(e10) {
        return "DriverAdapterError" === e10.name && "object" == typeof e10.cause;
      }
      Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var nm = class extends Error {
        name = "UserFacingError";
        code;
        meta;
        constructor(e10, t10, r10) {
          super(e10), this.code = t10, this.meta = r10 ?? {};
        }
        toQueryResponseErrorObject() {
          return { error: this.message, user_facing_error: { is_panic: false, message: this.message, meta: this.meta, error_code: this.code } };
        }
      };
      function ny(e10) {
        if (!nA(e10)) throw e10;
        let t10 = function(e11) {
          switch (e11.cause.kind) {
            case "AuthenticationFailed":
              return "P1000";
            case "DatabaseNotReachable":
              return "P1001";
            case "DatabaseDoesNotExist":
              return "P1003";
            case "SocketTimeout":
              return "P1008";
            case "DatabaseAlreadyExists":
              return "P1009";
            case "DatabaseAccessDenied":
              return "P1010";
            case "TlsConnectionError":
              return "P1011";
            case "ConnectionClosed":
              return "P1017";
            case "TransactionAlreadyClosed":
              return "P1018";
            case "LengthMismatch":
              return "P2000";
            case "UniqueConstraintViolation":
              return "P2002";
            case "ForeignKeyConstraintViolation":
              return "P2003";
            case "InvalidInputValue":
              return "P2007";
            case "UnsupportedNativeDataType":
              return "P2010";
            case "NullConstraintViolation":
              return "P2011";
            case "ValueOutOfRange":
              return "P2020";
            case "TableDoesNotExist":
              return "P2021";
            case "ColumnNotFound":
              return "P2022";
            case "InvalidIsolationLevel":
            case "InconsistentColumnData":
              return "P2023";
            case "MissingFullTextSearchIndex":
              return "P2030";
            case "TransactionWriteConflict":
              return "P2034";
            case "GenericJs":
              return "P2036";
            case "TooManyConnections":
              return "P2037";
            case "postgres":
            case "sqlite":
            case "mysql":
            case "mssql":
              return;
            default:
              ns(e11.cause, `Unknown error: ${np(e11.cause)}`);
          }
        }(e10), r10 = nb(e10);
        throw t10 && r10 ? new nm(r10, t10, { driverAdapterError: e10 }) : e10;
      }
      function nw(e10) {
        throw nA(e10) ? new nm(`Raw query failed. Code: \`${e10.cause.originalCode ?? "N/A"}\`. Message: \`${e10.cause.originalMessage ?? nb(e10)}\``, "P2010", { driverAdapterError: e10 }) : e10;
      }
      function nb(e10) {
        switch (e10.cause.kind) {
          case "AuthenticationFailed":
            return `Authentication failed against the database server, the provided database credentials for \`${e10.cause.user ?? "(not available)"}\` are not valid`;
          case "DatabaseNotReachable": {
            let t10 = e10.cause.host && e10.cause.port ? `${e10.cause.host}:${e10.cause.port}` : e10.cause.host;
            return `Can't reach database server${t10 ? ` at ${t10}` : ""}`;
          }
          case "DatabaseDoesNotExist":
            return `Database \`${e10.cause.db ?? "(not available)"}\` does not exist on the database server`;
          case "SocketTimeout":
            return "Operation has timed out";
          case "DatabaseAlreadyExists":
            return `Database \`${e10.cause.db ?? "(not available)"}\` already exists on the database server`;
          case "DatabaseAccessDenied":
            return `User was denied access on the database \`${e10.cause.db ?? "(not available)"}\``;
          case "TlsConnectionError":
            return `Error opening a TLS connection: ${e10.cause.reason}`;
          case "ConnectionClosed":
            return "Server has closed the connection.";
          case "TransactionAlreadyClosed":
            return e10.cause.cause;
          case "LengthMismatch":
            return `The provided value for the column is too long for the column's type. Column: ${e10.cause.column ?? "(not available)"}`;
          case "UniqueConstraintViolation":
            return `Unique constraint failed on the ${nv(e10.cause.constraint)}`;
          case "ForeignKeyConstraintViolation":
            return `Foreign key constraint violated on the ${nv(e10.cause.constraint)}`;
          case "UnsupportedNativeDataType":
            return `Failed to deserialize column of type '${e10.cause.type}'. If you're using $queryRaw and this column is explicitly marked as \`Unsupported\` in your Prisma schema, try casting this column to any supported Prisma type such as \`String\`.`;
          case "NullConstraintViolation":
            return `Null constraint violation on the ${nv(e10.cause.constraint)}`;
          case "ValueOutOfRange":
            return `Value out of range for the type: ${e10.cause.cause}`;
          case "TableDoesNotExist":
            return `The table \`${e10.cause.table ?? "(not available)"}\` does not exist in the current database.`;
          case "ColumnNotFound":
            return `The column \`${e10.cause.column ?? "(not available)"}\` does not exist in the current database.`;
          case "InvalidIsolationLevel":
            return `Error in connector: Conversion error: ${e10.cause.level}`;
          case "InconsistentColumnData":
            return `Inconsistent column data: ${e10.cause.cause}`;
          case "MissingFullTextSearchIndex":
            return "Cannot find a fulltext index to use for the native search, try adding a @@fulltext([Fields...]) to your schema";
          case "TransactionWriteConflict":
            return "Transaction failed due to a write conflict or a deadlock. Please retry your transaction";
          case "GenericJs":
            return `Error in external connector (id ${e10.cause.id})`;
          case "TooManyConnections":
            return `Too many database connections opened: ${e10.cause.cause}`;
          case "InvalidInputValue":
            return `Invalid input value: ${e10.cause.message}`;
          case "sqlite":
          case "postgres":
          case "mysql":
          case "mssql":
            return;
          default:
            ns(e10.cause, `Unknown error: ${np(e10.cause)}`);
        }
      }
      function nv(e10) {
        return e10 && "fields" in e10 ? `fields: (${e10.fields.map((e11) => `\`${e11}\``).join(", ")})` : e10 && "index" in e10 ? `constraint: \`${e10.index}\`` : e10 && "foreignKey" in e10 ? "foreign key" : "(not available)";
      }
      Q(), U(), V(), H(), eE();
      var nE = e.r(84898), n_ = class extends nm {
        name = "DataMapperError";
        constructor(e10, t10) {
          super(e10, "P2023", t10);
        }
      }, nC = /* @__PURE__ */ new WeakMap();
      function nx(e10, t10, r10, n10) {
        if (null === e10) return null;
        if (Array.isArray(e10)) {
          let i10 = e10;
          return n10 && (i10 = i10.filter((e11) => null !== e11)), i10.map((e11) => nI(e11, t10, r10));
        }
        if ("object" == typeof e10) return nI(e10, t10, r10);
        if ("string" == typeof e10) {
          let i10;
          try {
            i10 = JSON.parse(e10);
          } catch (e11) {
            throw new n_("Expected an array or object, got a string that is not valid JSON", { cause: e11 });
          }
          return nx(i10, t10, r10, n10);
        }
        throw new n_(`Expected an array or an object, got: ${typeof e10}`);
      }
      function nI(e10, t10, r10) {
        let n10;
        if ("object" != typeof e10) throw new n_(`Expected an object, but got '${typeof e10}'`);
        let i10 = {};
        for (let [a10, o2] of ((n10 = nC.get(t10)) || (n10 = Object.entries(t10), nC.set(t10, n10)), n10)) switch (o2.type) {
          case "affectedRows":
            throw new n_(`Unexpected 'AffectedRows' node in data mapping for field '${a10}'`);
          case "object": {
            let { serializedName: t11, fields: n11, skipNulls: s2 } = o2;
            if (null !== t11 && !Object.hasOwn(e10, t11)) throw new n_(`Missing data field (Object): '${a10}'; node: ${JSON.stringify(o2)}; data: ${JSON.stringify(e10)}`);
            let l2 = null !== t11 ? e10[t11] : e10;
            i10[a10] = nx(l2, n11, r10, s2);
            break;
          }
          case "field":
            {
              let t11 = o2.dbName;
              if (Object.hasOwn(e10, t11)) i10[a10] = function(e11, t12, r11, n11) {
                return null === e11 ? "list" === r11.arity ? [] : null : "list" === r11.arity ? e11.map((e12, i11) => nS(e12, `${t12}[${i11}]`, r11, n11)) : nS(e11, t12, r11, n11);
              }(e10[t11], t11, o2.fieldType, r10);
              else throw new n_(`Missing data field (Value): '${t11}'; node: ${JSON.stringify(o2)}; data: ${JSON.stringify(e10)}`);
            }
            break;
          default:
            ns(o2, `DataMapper: Invalid data mapping node type: '${o2.type}'`);
        }
        return i10;
      }
      function nS(e10, t10, r10, n10) {
        switch (r10.type) {
          case "unsupported":
            return e10;
          case "string":
            if ("string" != typeof e10) throw new n_(`Expected a string in column '${t10}', got ${typeof e10}: ${e10}`);
            return e10;
          case "int":
            switch (typeof e10) {
              case "number":
                return Math.trunc(e10);
              case "string": {
                let r11 = Math.trunc(Number(e10));
                if (Number.isNaN(r11) || !Number.isFinite(r11)) throw new n_(`Expected an integer in column '${t10}', got string: ${e10}`);
                if (!Number.isSafeInteger(r11)) throw new n_(`Integer value in column '${t10}' is too large to represent as a JavaScript number without loss of precision, got: ${e10}. Consider using BigInt type.`);
                return r11;
              }
              default:
                throw new n_(`Expected an integer in column '${t10}', got ${typeof e10}: ${e10}`);
            }
          case "bigint":
            if ("number" != typeof e10 && "string" != typeof e10) throw new n_(`Expected a bigint in column '${t10}', got ${typeof e10}: ${e10}`);
            return { $type: "BigInt", value: e10 };
          case "float":
            if ("number" == typeof e10) return e10;
            if ("string" == typeof e10) {
              let r11 = Number(e10);
              if (Number.isNaN(r11) && !/^[-+]?nan$/.test(e10.toLowerCase())) throw new n_(`Expected a float in column '${t10}', got string: ${e10}`);
              return r11;
            }
            throw new n_(`Expected a float in column '${t10}', got ${typeof e10}: ${e10}`);
          case "boolean":
            if ("boolean" == typeof e10) return e10;
            if ("number" == typeof e10) return 1 === e10;
            if ("string" == typeof e10) {
              if ("true" === e10 || "TRUE" === e10 || "1" === e10) return true;
              if ("false" === e10 || "FALSE" === e10 || "0" === e10) return false;
              throw new n_(`Expected a boolean in column '${t10}', got ${typeof e10}: ${e10}`);
            }
            if (Array.isArray(e10) || e10 instanceof Uint8Array) {
              for (let t11 of e10) if (0 !== t11) return true;
              return false;
            }
            throw new n_(`Expected a boolean in column '${t10}', got ${typeof e10}: ${e10}`);
          case "decimal":
            if ("number" != typeof e10 && "string" != typeof e10 && !nE.Decimal.isDecimal(e10)) throw new n_(`Expected a decimal in column '${t10}', got ${typeof e10}: ${e10}`);
            return { $type: "Decimal", value: e10 };
          case "datetime":
            if ("string" == typeof e10) return { $type: "DateTime", value: function(e11) {
              let t11 = nT.exec(e11);
              if (null === t11) return `${e11}T00:00:00Z`;
              let r11 = e11, [n11, i10, a10] = t11;
              if (void 0 !== i10 && "Z" !== i10 && void 0 === a10 ? r11 = `${e11}:00` : void 0 === i10 && (r11 = `${e11}Z`), n11.length === e11.length) return `1970-01-01T${r11}`;
              let o2 = t11.index - 1;
              return " " === r11[o2] && (r11 = `${r11.slice(0, o2)}T${r11.slice(o2 + 1)}`), r11;
            }(e10) };
            if ("number" == typeof e10 || e10 instanceof Date) return { $type: "DateTime", value: e10 };
            throw new n_(`Expected a date in column '${t10}', got ${typeof e10}: ${e10}`);
          case "object":
            return { $type: "Json", value: np(e10) };
          case "json":
            return { $type: "Json", value: `${e10}` };
          case "bytes":
            switch (r10.encoding) {
              case "base64":
                if ("string" != typeof e10) throw new n_(`Expected a base64-encoded byte array in column '${t10}', got ${typeof e10}: ${e10}`);
                return { $type: "Bytes", value: e10 };
              case "hex":
                if ("string" != typeof e10 || !e10.startsWith("\\x")) throw new n_(`Expected a hex-encoded byte array in column '${t10}', got ${typeof e10}: ${e10}`);
                return { $type: "Bytes", value: M.from(e10.slice(2), "hex").toString("base64") };
              case "array":
                if (Array.isArray(e10) || e10 instanceof Uint8Array) return { $type: "Bytes", value: M.from(e10).toString("base64") };
                throw new n_(`Expected a byte array in column '${t10}', got ${typeof e10}: ${e10}`);
              default:
                ns(r10.encoding, `DataMapper: Unknown bytes encoding: ${r10.encoding}`);
            }
            break;
          case "enum": {
            let t11 = n10[r10.name];
            if (void 0 === t11) throw new n_(`Unknown enum '${r10.name}'`);
            let i10 = t11[`${e10}`];
            if (void 0 === i10) throw new n_(`Value '${e10}' not found in enum '${r10.name}'`);
            return i10;
          }
          default:
            ns(r10, `DataMapper: Unknown result type: ${r10.type}`);
        }
      }
      var nT = /\d{2}:\d{2}:\d{2}(?:\.\d+)?(Z|[+-]\d{2}(:?\d{2})?)?$/;
      function nO(e10) {
        if ("object" != typeof e10) return e10;
        var t10, r10, n10 = Object.prototype.toString.call(e10);
        if ("[object Object]" === n10) {
          if (e10.constructor !== Object && "function" == typeof e10.constructor) for (t10 in r10 = new e10.constructor(), e10) e10.hasOwnProperty(t10) && r10[t10] !== e10[t10] && (r10[t10] = nO(e10[t10]));
          else for (t10 in r10 = {}, e10) "__proto__" === t10 ? Object.defineProperty(r10, t10, { value: nO(e10[t10]), configurable: true, enumerable: true, writable: true }) : r10[t10] = nO(e10[t10]);
          return r10;
        }
        if ("[object Array]" === n10) {
          for (r10 = Array(t10 = e10.length); t10--; ) r10[t10] = nO(e10[t10]);
          return r10;
        }
        return "[object Set]" === n10 ? (r10 = /* @__PURE__ */ new Set(), e10.forEach(function(e11) {
          r10.add(nO(e11));
        }), r10) : "[object Map]" === n10 ? (r10 = /* @__PURE__ */ new Map(), e10.forEach(function(e11, t11) {
          r10.set(nO(t11), nO(e11));
        }), r10) : "[object Date]" === n10 ? /* @__PURE__ */ new Date(+e10) : "[object RegExp]" === n10 ? ((r10 = new RegExp(e10.source, e10.flags)).lastIndex = e10.lastIndex, r10) : "[object DataView]" === n10 ? new e10.constructor(nO(e10.buffer)) : "[object ArrayBuffer]" === n10 ? e10.slice(0) : "Array]" === n10.slice(-6) ? new e10.constructor(e10) : e10;
      }
      function nP(e10, t10) {
        let r10 = {};
        for (let n10 of e10) for (let [e11, i10] of Object.entries(n10(nO(t10)))) void 0 !== i10 && (r10[e11] = i10);
        return r10;
      }
      async function nR({ query: e10, tracingHelper: t10, provider: r10, onQuery: n10, execute: i10 }) {
        let o2 = void 0 === n10 ? i10 : async () => {
          let t11 = /* @__PURE__ */ new Date(), r11 = q.now(), a10 = await i10();
          return n10({ timestamp: t11, duration: q.now() - r11, query: e10.sql, params: e10.args }), a10;
        };
        return t10.isEnabled() ? await t10.runInChildSpan({ name: "db_query", kind: a.CLIENT, attributes: { "db.query.text": e10.sql, "db.system.name": function(e11) {
          switch (e11) {
            case "postgresql":
            case "postgres":
            case "prisma+postgres":
              return "postgresql";
            case "sqlserver":
              return "mssql";
            case "mysql":
            case "sqlite":
            case "cockroachdb":
            case "mongodb":
              return e11;
            default:
              ns(e11, `Unknown provider: ${e11}`);
          }
        }(r10) } }, o2) : o2();
      }
      function nN(e10, t10) {
        var r10 = "000000000" + e10;
        return r10.substr(r10.length - t10);
      }
      Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), (i = a || (a = {}))[i.INTERNAL = 0] = "INTERNAL", i[i.SERVER = 1] = "SERVER", i[i.CLIENT = 2] = "CLIENT", i[i.PRODUCER = 3] = "PRODUCER", i[i.CONSUMER = 4] = "CONSUMER", Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var nk = b(eN(), 1), nB = nN(j.pid.toString(36), 2), nD = function() {
        try {
          return nk.default.hostname();
        } catch {
          return j.env._CLUSTER_NETWORK_NAME_ || j.env.COMPUTERNAME || "hostname";
        }
      }(), nM = nD.length, n$ = nN(nD.split("").reduce(function(e10, t10) {
        return +e10 + t10.charCodeAt(0);
      }, +nM + 36).toString(36), 2);
      function nj(e10) {
        return "string" == typeof e10 && /^c[a-z0-9]{20,32}$/.test(e10);
      }
      Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var nL = function(e10) {
        let t10 = 0;
        function r10() {
          return nN((1679616 * Math.random() | 0).toString(36), 4);
        }
        function n10() {
          return "c" + (/* @__PURE__ */ new Date()).getTime().toString(36) + nN((t10 = t10 < 1679616 ? t10 : 0, ++t10 - 1).toString(36), 4) + e10() + (r10() + r10());
        }
        return n10.fingerprint = e10, n10.isCuid = nj, n10;
      }(function() {
        return nB + n$;
      }), nq = b(eG());
      function nF(e10 = 21) {
        var t10;
        t10 = e10 |= 0, !o || o.length < t10 ? (o = M.allocUnsafe(128 * t10), eS.getRandomValues(o), s = 0) : s + t10 > o.length && (eS.getRandomValues(o), s = 0), s += t10;
        let r10 = "";
        for (let t11 = s - e10; t11 < s; t11++) r10 += "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"[63 & o[t11]];
        return r10;
      }
      Q(), U(), V(), H(), eE(), eR(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), eR();
      var nQ = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
      (l = u || (u = {})).Base32IncorrectEncoding = "B32_ENC_INVALID", l.DecodeTimeInvalidCharacter = "DEC_TIME_CHAR", l.DecodeTimeValueMalformed = "DEC_TIME_MALFORMED", l.EncodeTimeNegative = "ENC_TIME_NEG", l.EncodeTimeSizeExceeded = "ENC_TIME_SIZE_EXCEED", l.EncodeTimeValueMalformed = "ENC_TIME_MALFORMED", l.PRNGDetectFailure = "PRNG_DETECT", l.ULIDInvalid = "ULID_INVALID", l.Unexpected = "UNEXPECTED", l.UUIDInvalid = "UUID_INVALID";
      var nU = class extends Error {
        constructor(e10, t10) {
          super(`${t10} (${e10})`), this.name = "ULIDError", this.code = e10;
        }
      };
      Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var nV = [];
      for (let e10 = 0; e10 < 256; ++e10) nV.push((e10 + 256).toString(16).slice(1));
      function nH(e10, t10 = 0) {
        return (nV[e10[t10 + 0]] + nV[e10[t10 + 1]] + nV[e10[t10 + 2]] + nV[e10[t10 + 3]] + "-" + nV[e10[t10 + 4]] + nV[e10[t10 + 5]] + "-" + nV[e10[t10 + 6]] + nV[e10[t10 + 7]] + "-" + nV[e10[t10 + 8]] + nV[e10[t10 + 9]] + "-" + nV[e10[t10 + 10]] + nV[e10[t10 + 11]] + nV[e10[t10 + 12]] + nV[e10[t10 + 13]] + nV[e10[t10 + 14]] + nV[e10[t10 + 15]]).toLowerCase();
      }
      Q(), U(), V(), H(), eE(), eR();
      var nW = new Uint8Array(256), nG = nW.length;
      function nX() {
        return nG > nW.length - 16 && (ex(nW), nG = 0), nW.slice(nG, nG += 16);
      }
      Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), eR();
      var nJ = function(e10, t10, r10) {
        if (eC && !t10 && !e10) return eC();
        let n10 = (e10 = e10 || {}).random ?? e10.rng?.() ?? nX();
        if (n10.length < 16) throw Error("Random bytes length must be >= 16");
        if (n10[6] = 15 & n10[6] | 64, n10[8] = 63 & n10[8] | 128, t10) {
          if ((r10 = r10 || 0) < 0 || r10 + 16 > t10.length) throw RangeError(`UUID byte range ${r10}:${r10 + 15} is out of buffer bounds`);
          for (let e11 = 0; e11 < 16; ++e11) t10[r10 + e11] = n10[e11];
          return t10;
        }
        return nH(n10);
      };
      Q(), U(), V(), H(), eE();
      var nz = {};
      function nK(e10, t10, r10, n10, i10 = 0) {
        if (e10.length < 16) throw Error("Random bytes length must be >= 16");
        if (n10) {
          if (i10 < 0 || i10 + 16 > n10.length) throw RangeError(`UUID byte range ${i10}:${i10 + 15} is out of buffer bounds`);
        } else n10 = new Uint8Array(16), i10 = 0;
        return t10 ??= Date.now(), r10 ??= 127 * e10[6] << 24 | e10[7] << 16 | e10[8] << 8 | e10[9], n10[i10++] = t10 / 1099511627776 & 255, n10[i10++] = t10 / 4294967296 & 255, n10[i10++] = t10 / 16777216 & 255, n10[i10++] = t10 / 65536 & 255, n10[i10++] = t10 / 256 & 255, n10[i10++] = 255 & t10, n10[i10++] = 112 | r10 >>> 28 & 15, n10[i10++] = r10 >>> 20 & 255, n10[i10++] = 128 | r10 >>> 14 & 63, n10[i10++] = r10 >>> 6 & 255, n10[i10++] = r10 << 2 & 255 | 3 & e10[10], n10[i10++] = e10[11], n10[i10++] = e10[12], n10[i10++] = e10[13], n10[i10++] = e10[14], n10[i10++] = e10[15], n10;
      }
      var nY = function(e10, t10, r10) {
        let n10;
        if (e10) n10 = nK(e10.random ?? e10.rng?.() ?? nX(), e10.msecs, e10.seq, t10, r10);
        else {
          var i10, a10, o2;
          let e11 = Date.now(), s2 = nX();
          i10 = nz, a10 = e11, o2 = s2, i10.msecs ??= -1 / 0, i10.seq ??= 0, a10 > i10.msecs ? (i10.seq = o2[6] << 23 | o2[7] << 16 | o2[8] << 8 | o2[9], i10.msecs = a10) : (i10.seq = i10.seq + 1 | 0, 0 === i10.seq && i10.msecs++), n10 = nK(s2, nz.msecs, nz.seq, t10, r10);
        }
        return t10 ?? nH(n10);
      }, nZ = class {
        #i = {};
        constructor() {
          this.register("uuid", new n1()), this.register("cuid", new n2()), this.register("ulid", new n4()), this.register("nanoid", new n3()), this.register("product", new n8());
        }
        snapshot() {
          return Object.create(this.#i, { now: { value: new n0() } });
        }
        register(e10, t10) {
          this.#i[e10] = t10;
        }
      }, n0 = class {
        #i;
        generate() {
          return void 0 === this.#i && (this.#i = /* @__PURE__ */ new Date()), this.#i.toISOString();
        }
      }, n1 = class {
        generate(e10) {
          if (4 === e10) return nJ();
          if (7 === e10) return nY();
          throw Error("Invalid UUID generator arguments");
        }
      }, n2 = class {
        generate(e10) {
          if (1 === e10) return nL();
          if (2 === e10) return (0, nq.createId)();
          throw Error("Invalid CUID generator arguments");
        }
      }, n4 = class {
        generate() {
          let e10;
          return e10 = function() {
            let e11 = "u" > typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : "u" > typeof globalThis || "u" > typeof globalThis ? globalThis : null, t10 = e11 && (e11.crypto || e11.msCrypto) || ("u" > typeof eO ? eO : null);
            if ("function" == typeof t10?.getRandomValues) return () => {
              let e12 = new Uint8Array(1);
              return t10.getRandomValues(e12), e12[0] / 255;
            };
            if ("function" == typeof t10?.randomBytes) return () => t10.randomBytes(1).readUInt8() / 255;
            if (eO?.randomBytes) return () => eO.randomBytes(1).readUInt8() / 255;
            throw new nU(u.PRNGDetectFailure, "Failed to find a reliable PRNG");
          }(), function(e11, t10 = 10) {
            if (isNaN(e11)) throw new nU(u.EncodeTimeValueMalformed, `Time must be a number: ${e11}`);
            if (e11 > 281474976710655) throw new nU(u.EncodeTimeSizeExceeded, `Cannot encode a time larger than 281474976710655: ${e11}`);
            if (e11 < 0) throw new nU(u.EncodeTimeNegative, `Time must be positive: ${e11}`);
            if (false === Number.isInteger(e11)) throw new nU(u.EncodeTimeValueMalformed, `Time must be an integer: ${e11}`);
            let r10, n10 = "";
            for (let i10 = t10; i10 > 0; i10--) r10 = e11 % 32, n10 = nQ.charAt(r10) + n10, e11 = (e11 - r10) / 32;
            return n10;
          }(Date.now(), 10) + function(e11, t10) {
            let r10 = "";
            for (; e11 > 0; e11--) r10 = function(e12) {
              let t11 = Math.floor(32 * e12());
              return 32 === t11 && (t11 = 31), nQ.charAt(t11);
            }(t10) + r10;
            return r10;
          }(16, e10);
        }
      }, n3 = class {
        generate(e10) {
          if ("number" == typeof e10) return nF(e10);
          if (void 0 === e10) return nF();
          throw Error("Invalid Nanoid generator arguments");
        }
      }, n8 = class {
        generate(e10, t10) {
          if (void 0 === e10 || void 0 === t10) throw Error("Invalid Product generator arguments");
          return Array.isArray(e10) && Array.isArray(t10) ? e10.flatMap((e11) => t10.map((t11) => [e11, t11])) : Array.isArray(e10) ? e10.map((e11) => [e11, t10]) : Array.isArray(t10) ? t10.map((t11) => [e10, t11]) : [[e10, t10]];
        }
      };
      function n6(e10, t10) {
        var r10, n10;
        return null == e10 ? e10 : "string" == typeof e10 ? n6(JSON.parse(e10), t10) : Array.isArray(e10) ? (r10 = e10, null !== (n10 = t10).distinct && (r10 = function(e11, t11) {
          let r11 = /* @__PURE__ */ new Set(), n11 = [];
          for (let i10 of e11) {
            let e12 = n7(i10, t11);
            r11.has(e12) || (r11.add(e12), n11.push(i10));
          }
          return n11;
        }(r10, null !== n10.linkingFields ? [...n10.distinct, ...n10.linkingFields] : n10.distinct)), n10.pagination && (r10 = function(e11, t11, r11) {
          if (null === r11) return n5(e11, t11);
          let n11 = /* @__PURE__ */ new Map();
          for (let t12 of e11) {
            let e12 = n7(t12, r11);
            n11.has(e12) || n11.set(e12, []), n11.get(e12).push(t12);
          }
          let i10 = Array.from(n11.entries());
          return i10.sort(([e12], [t12]) => e12 < t12 ? -1 : +(e12 > t12)), i10.flatMap(([, e12]) => n5(e12, t11));
        }(r10, n10.pagination, n10.linkingFields)), n10.reverse && r10.reverse(), 0 === Object.keys(n10.nested).length ? r10 : r10.map((e11) => n9(e11, n10.nested))) : function(e11, t11) {
          if (t11.pagination) {
            let { skip: r11, take: n11, cursor: i10 } = t11.pagination;
            if (null !== r11 && r11 > 0 || 0 === n11 || null !== i10 && !nl(e11, i10)) return null;
          }
          return n9(e11, t11.nested);
        }(e10, t10);
      }
      function n9(e10, t10) {
        for (let [r10, n10] of Object.entries(t10)) e10[r10] = n6(e10[r10], n10);
        return e10;
      }
      function n5(e10, { cursor: t10, skip: r10, take: n10 }) {
        let i10 = null !== t10 ? e10.findIndex((e11) => nl(e11, t10)) : 0;
        if (-1 === i10) return [];
        let a10 = i10 + (r10 ?? 0), o2 = null !== n10 ? a10 + n10 : e10.length;
        return e10.slice(a10, o2);
      }
      function n7(e10, t10, r10) {
        return JSON.stringify(t10.map((t11, n10) => r10?.[n10] ? null !== e10[t11] ? r10[n10](e10[t11]) : null : e10[t11]));
      }
      function ie(e10) {
        return "object" == typeof e10 && null !== e10 && "param" === e10.prisma__type;
      }
      function it(e10) {
        return "object" == typeof e10 && null !== e10 && "generatorCall" === e10.prisma__type;
      }
      function ir(e10, t10, r10, n10) {
        let i10 = e10.args.map((e11) => ii(e11, t10, r10));
        switch (e10.type) {
          case "rawSql":
            var a10;
            return [(a10 = e10.sql, { sql: a10, args: i10, argTypes: e10.argTypes })];
          case "templateSql":
            return (e10.chunkable ? function(e11, t11, r11) {
              let n11 = 0, i11 = 0;
              for (let r12 of io(e11, t11, void 0)) {
                let e12 = 0;
                for (let t12 of is(r12)) e12++;
                i11 = Math.max(i11, e12), n11 += e12;
              }
              let a11 = [[]];
              for (let o2 of io(e11, t11, void 0)) switch (o2.type) {
                case "parameter":
                  for (let e12 of a11) e12.push(o2.value);
                  break;
                case "stringChunk":
                  break;
                case "parameterTuple": {
                  let e12 = o2.value.length, t12 = [];
                  if (r11 && 1 === a11.length && e12 === i11 && n11 > r11 && n11 - e12 < r11) {
                    let i12 = r11 - (n11 - e12);
                    t12 = function(e13, t13) {
                      let r12 = [];
                      for (let n12 = 0; n12 < e13.length; n12 += t13) r12.push(e13.slice(n12, n12 + t13));
                      return r12;
                    }(o2.value, i12);
                  } else t12 = [o2.value];
                  a11 = a11.flatMap((e13) => t12.map((t13) => [...e13, t13]));
                  break;
                }
                case "parameterTupleList": {
                  let e12 = o2.value.reduce((e13, t13) => e13 + t13.length, 0), t12 = [], s2 = [], l2 = 0;
                  for (let u2 of o2.value) r11 && 1 === a11.length && e12 === i11 && s2.length > 0 && n11 - e12 + l2 + u2.length > r11 && (t12.push(s2), s2 = [], l2 = 0), s2.push(u2), l2 += u2.length;
                  s2.length > 0 && t12.push(s2), a11 = a11.flatMap((e13) => t12.map((t13) => [...e13, t13]));
                }
              }
              return a11;
            }(e10.fragments, i10, n10) : [i10]).map((t11) => {
              let r11 = function(e11, t12, r12, n11) {
                let i11 = "", a11 = { placeholderNumber: 1 }, o2 = [], s2 = [];
                for (let l2 of io(e11, r12, n11)) {
                  if (i11 += function(e13, t13, r14) {
                    let n12 = e13.type;
                    switch (n12) {
                      case "parameter":
                        return ia(t13, r14.placeholderNumber++);
                      case "stringChunk":
                        return e13.chunk;
                      case "parameterTuple":
                        return `(${0 == e13.value.length ? "NULL" : e13.value.map(() => {
                          let n13 = ia(t13, r14.placeholderNumber++);
                          return `${e13.itemPrefix}${n13}${e13.itemSuffix}`;
                        }).join(e13.itemSeparator)})`;
                      case "parameterTupleList":
                        return e13.value.map((n13) => {
                          let i12 = n13.map(() => ia(t13, r14.placeholderNumber++)).join(e13.itemSeparator);
                          return `${e13.itemPrefix}${i12}${e13.itemSuffix}`;
                        }).join(e13.groupSeparator);
                      default:
                        ns(n12, "Invalid fragment type");
                    }
                  }(l2, t12, a11), "stringChunk" === l2.type) continue;
                  let e12 = o2.length, r13 = o2.push(...is(l2)) - e12;
                  if ("tuple" === l2.argType.arity) {
                    if (r13 % l2.argType.elements.length != 0) throw Error(`Malformed query template. Expected the number of parameters to match the tuple arity, but got ${r13} parameters for a tuple of arity ${l2.argType.elements.length}.`);
                    for (let e13 = 0; e13 < r13 / l2.argType.elements.length; e13++) s2.push(...l2.argType.elements);
                  } else for (let e13 = 0; e13 < r13; e13++) s2.push(l2.argType);
                }
                return { sql: i11, args: o2, argTypes: s2 };
              }(e10.fragments, e10.placeholderFormat, t11, e10.argTypes);
              if (void 0 !== n10 && r11.args.length > n10) throw new nm("The query parameter limit supported by your database is exceeded.", "P2029");
              return r11;
            });
          default:
            ns(e10.type, "Invalid query type");
        }
      }
      function ii(e10, t10, r10) {
        for (var n10; ie(n10 = e10) || it(n10); ) if (ie(e10)) {
          let r11 = t10[e10.prisma__value.name];
          if (void 0 === r11) throw Error(`Missing value for query variable ${e10.prisma__value.name}`);
          e10 = "DateTime" === e10.prisma__value.type && "string" == typeof r11 ? new Date(r11) : r11;
        } else if (it(e10)) {
          let { name: n11, args: i10 } = e10.prisma__value, a10 = r10[n11];
          if (!a10) throw Error(`Encountered an unknown generator '${n11}'`);
          e10 = a10.generate(...i10.map((e11) => ii(e11, t10, r10)));
        } else ns(e10, `Unexpected unevaluated value type: ${e10}`);
        return Array.isArray(e10) && (e10 = e10.map((e11) => ii(e11, t10, r10))), e10;
      }
      function ia(e10, t10) {
        return e10.hasNumbering ? `${e10.prefix}${t10}` : e10.prefix;
      }
      function* io(e10, t10, r10) {
        let n10 = 0;
        for (let i10 of e10) switch (i10.type) {
          case "parameter":
            if (n10 >= t10.length) throw Error(`Malformed query template. Fragments attempt to read over ${t10.length} parameters.`);
            yield { ...i10, value: t10[n10], argType: r10?.[n10] }, n10++;
            break;
          case "stringChunk":
            yield i10;
            break;
          case "parameterTuple": {
            if (n10 >= t10.length) throw Error(`Malformed query template. Fragments attempt to read over ${t10.length} parameters.`);
            let e11 = t10[n10];
            yield { ...i10, value: Array.isArray(e11) ? e11 : [e11], argType: r10?.[n10] }, n10++;
            break;
          }
          case "parameterTupleList": {
            if (n10 >= t10.length) throw Error(`Malformed query template. Fragments attempt to read over ${t10.length} parameters.`);
            let e11 = t10[n10];
            if (!Array.isArray(e11)) throw Error("Malformed query template. Tuple list expected.");
            if (0 === e11.length) throw Error("Malformed query template. Tuple list cannot be empty.");
            for (let t11 of e11) if (!Array.isArray(t11)) throw Error("Malformed query template. Tuple expected.");
            yield { ...i10, value: e11, argType: r10?.[n10] }, n10++;
          }
        }
      }
      function* is(e10) {
        switch (e10.type) {
          case "parameter":
            yield e10.value;
            break;
          case "stringChunk":
            break;
          case "parameterTuple":
            yield* e10.value;
            break;
          case "parameterTupleList":
            for (let t10 of e10.value) yield* t10;
        }
      }
      function il(e10) {
        return e10.rows.map((t10) => t10.reduce((t11, r10, n10) => (t11[e10.columnNames[n10]] = r10, t11), {}));
      }
      function iu(e10) {
        return { columns: e10.columnNames, types: e10.columnTypes.map((e11) => function(e12) {
          switch (e12) {
            case 0:
              return "int";
            case 1:
              return "bigint";
            case 2:
              return "float";
            case 3:
              return "double";
            case 7:
            case 14:
              return "string";
            case 12:
              return "enum";
            case 13:
              return "bytes";
            case 5:
              return "bool";
            case 6:
              return "char";
            case 4:
              return "decimal";
            case 11:
              return "json";
            case 15:
              return "uuid";
            case 10:
              return "datetime";
            case 8:
              return "date";
            case 9:
              return "time";
            case 64:
              return "int-array";
            case 65:
              return "bigint-array";
            case 66:
              return "float-array";
            case 67:
              return "double-array";
            case 71:
            case 76:
              return "string-array";
            case 77:
              return "bytes-array";
            case 69:
              return "bool-array";
            case 70:
              return "char-array";
            case 68:
              return "decimal-array";
            case 75:
              return "json-array";
            case 78:
              return "uuid-array";
            case 74:
              return "datetime-array";
            case 72:
              return "date-array";
            case 73:
              return "time-array";
            case 128:
              return "unknown";
            default:
              ns(e12, `Unexpected column type: ${e12}`);
          }
        }(e11)), rows: e10.rows.map((t10) => t10.map((t11, r10) => function e11(t12, r11) {
          if (null === t12) return null;
          switch (r11) {
            case 0:
              switch (typeof t12) {
                case "number":
                  return Math.trunc(t12);
                case "string":
                  return Math.trunc(Number(t12));
                default:
                  throw Error(`Cannot serialize value of type ${typeof t12} as Int32`);
              }
            case 64:
              if (!Array.isArray(t12)) throw Error(`Cannot serialize value of type ${typeof t12} as Int32Array`);
              return t12.map((t13) => e11(t13, 0));
            case 1:
              switch (typeof t12) {
                case "number":
                  return BigInt(Math.trunc(t12));
                case "string":
                  return t12;
                default:
                  throw Error(`Cannot serialize value of type ${typeof t12} as Int64`);
              }
            case 65:
              if (!Array.isArray(t12)) throw Error(`Cannot serialize value of type ${typeof t12} as Int64Array`);
              return t12.map((t13) => e11(t13, 1));
            case 11:
              if ("string" == typeof t12) return JSON.parse(t12);
              throw Error(`Cannot serialize value of type ${typeof t12} as Json`);
            case 75:
              if (!Array.isArray(t12)) throw Error(`Cannot serialize value of type ${typeof t12} as JsonArray`);
              return t12.map((t13) => e11(t13, 11));
            case 5:
              switch (typeof t12) {
                case "boolean":
                  return t12;
                case "string":
                  return "true" === t12 || "1" === t12;
                case "number":
                  return 1 === t12;
                default:
                  throw Error(`Cannot serialize value of type ${typeof t12} as Boolean`);
              }
            case 69:
              if (!Array.isArray(t12)) throw Error(`Cannot serialize value of type ${typeof t12} as BooleanArray`);
              return t12.map((t13) => e11(t13, 5));
            default:
              return t12;
          }
        }(t11, e10.columnTypes[r10]))) };
      }
      function ic(e10, t10) {
        switch (t10.type) {
          case "rowCountEq":
            return Array.isArray(e10) ? e10.length === t10.args : null === e10 ? 0 === t10.args : 1 === t10.args;
          case "rowCountNeq":
            return Array.isArray(e10) ? e10.length !== t10.args : null === e10 ? 0 !== t10.args : 1 !== t10.args;
          case "affectedRowCountEq":
            return e10 === t10.args;
          case "never":
            return false;
          default:
            ns(t10, `Unknown rule type: ${t10.type}`);
        }
      }
      Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var id = class e10 {
        #i;
        #a = new nZ();
        #o;
        #s;
        #l;
        #u;
        #c;
        constructor({ onQuery: e11, tracingHelper: t10, serializer: r10, rawSerializer: n10, provider: i10, connectionInfo: a10 }) {
          this.#i = e11, this.#o = t10, this.#s = r10, this.#l = n10 ?? r10, this.#u = i10, this.#c = a10;
        }
        static forSql(t10) {
          return new e10({ onQuery: t10.onQuery, tracingHelper: t10.tracingHelper, serializer: il, rawSerializer: iu, provider: t10.provider, connectionInfo: t10.connectionInfo });
        }
        async run(e11, t10) {
          let { value: r10 } = await this.interpretNode(e11, { ...t10, generators: this.#a.snapshot() }).catch((e12) => ny(e12));
          return r10;
        }
        async interpretNode(e11, t10) {
          switch (e11.type) {
            case "value":
              return { value: ii(e11.args, t10.scope, t10.generators) };
            case "seq": {
              let r10;
              for (let n10 of e11.args) r10 = await this.interpretNode(n10, t10);
              return r10 ?? { value: void 0 };
            }
            case "get":
              return { value: t10.scope[e11.args.name] };
            case "let": {
              let r10 = Object.create(t10.scope);
              for (let n10 of e11.args.bindings) {
                let { value: e12 } = await this.interpretNode(n10.expr, { ...t10, scope: r10 });
                r10[n10.name] = e12;
              }
              return this.interpretNode(e11.args.expr, { ...t10, scope: r10 });
            }
            case "getFirstNonEmpty":
              for (let r10 of e11.args.names) {
                let e12 = t10.scope[r10];
                if (!ih(e12)) return { value: e12 };
              }
              return { value: [] };
            case "concat": {
              let r10 = await Promise.all(e11.args.map((e12) => this.interpretNode(e12, t10).then((e13) => e13.value)));
              return { value: r10.length > 0 ? r10.reduce((e12, t11) => e12.concat(ip(t11)), []) : [] };
            }
            case "sum": {
              let r10 = await Promise.all(e11.args.map((e12) => this.interpretNode(e12, t10).then((e13) => e13.value)));
              return { value: r10.length > 0 ? r10.reduce((e12, t11) => ig(e12) + ig(t11)) : 0 };
            }
            case "execute": {
              let r10 = ir(e11.args, t10.scope, t10.generators, this.#d()), n10 = 0;
              for (let i10 of r10) {
                let r11 = im(i10, t10.sqlCommenter);
                n10 += await this.#h(r11, t10.queryable, () => t10.queryable.executeRaw(nO(r11)).catch((t11) => "rawSql" === e11.args.type ? nw(t11) : ny(t11)));
              }
              return { value: n10 };
            }
            case "query": {
              let r10;
              for (let n10 of ir(e11.args, t10.scope, t10.generators, this.#d())) {
                let i10 = im(n10, t10.sqlCommenter), a10 = await this.#h(i10, t10.queryable, () => t10.queryable.queryRaw(nO(i10)).catch((t11) => "rawSql" === e11.args.type ? nw(t11) : ny(t11)));
                void 0 === r10 ? r10 = a10 : (r10.rows.push(...a10.rows), r10.lastInsertId = a10.lastInsertId);
              }
              return { value: "rawSql" === e11.args.type ? this.#l(r10) : this.#s(r10), lastInsertId: r10?.lastInsertId };
            }
            case "reverse": {
              let { value: r10, lastInsertId: n10 } = await this.interpretNode(e11.args, t10);
              return { value: Array.isArray(r10) ? r10.reverse() : r10, lastInsertId: n10 };
            }
            case "unique": {
              let { value: r10, lastInsertId: n10 } = await this.interpretNode(e11.args, t10);
              if (!Array.isArray(r10)) return { value: r10, lastInsertId: n10 };
              if (r10.length > 1) throw Error(`Expected zero or one element, got ${r10.length}`);
              return { value: r10[0] ?? null, lastInsertId: n10 };
            }
            case "required": {
              let { value: r10, lastInsertId: n10 } = await this.interpretNode(e11.args, t10);
              if (ih(r10)) throw Error("Required value is empty");
              return { value: r10, lastInsertId: n10 };
            }
            case "mapField": {
              let { value: r10, lastInsertId: n10 } = await this.interpretNode(e11.args.records, t10);
              return { value: function e12(t11, r11) {
                return Array.isArray(t11) ? t11.map((t12) => e12(t12, r11)) : "object" == typeof t11 && null !== t11 ? t11[r11] ?? null : t11;
              }(r10, e11.args.field), lastInsertId: n10 };
            }
            case "join": {
              let { value: r10, lastInsertId: n10 } = await this.interpretNode(e11.args.parent, t10);
              if (null === r10) return { value: null, lastInsertId: n10 };
              return { value: function(e12, t11, r11) {
                for (let { joinExpr: n11, childRecords: i10 } of t11) {
                  let t12 = n11.on.map(([e13]) => e13), a10 = n11.on.map(([, e13]) => e13), o2 = {}, s2 = Array.isArray(e12) ? e12 : [e12];
                  for (let e13 of s2) {
                    let r12 = iA(e13), i11 = n7(r12, t12);
                    o2[i11] || (o2[i11] = []), o2[i11].push(r12), n11.isRelationUnique ? r12[n11.parentField] = null : r12[n11.parentField] = [];
                  }
                  let l2 = r11 ? void 0 : function(e13, t13) {
                    let r12 = Array.from({ length: t13.length }), n12 = 0;
                    for (let i11 of e13) {
                      let e14 = iA(i11);
                      for (let [i12, a11] of t13.entries()) if (null !== e14[a11] && void 0 === r12[i12]) {
                        let t14 = function(e15) {
                          switch (e15) {
                            case "number":
                              return Number;
                            case "string":
                              return String;
                            case "boolean":
                              return Boolean;
                            case "bigint":
                              return BigInt;
                            default:
                              return;
                          }
                        }(typeof e14[a11]);
                        void 0 !== t14 && (r12[i12] = t14), n12++;
                      }
                      if (n12 === t13.length) break;
                    }
                    return r12;
                  }(s2, t12);
                  for (let e13 of Array.isArray(i10) ? i10 : [i10]) if (null !== e13) for (let t13 of o2[n7(iA(e13), a10, l2)] ?? []) n11.isRelationUnique ? t13[n11.parentField] = e13 : t13[n11.parentField].push(e13);
                }
                return e12;
              }(r10, await Promise.all(e11.args.children.map(async (e12) => ({ joinExpr: e12, childRecords: (await this.interpretNode(e12.child, t10)).value }))), e11.args.canAssumeStrictEquality), lastInsertId: n10 };
            }
            case "transaction": {
              if (!t10.transactionManager.enabled) return this.interpretNode(e11.args, t10);
              let r10 = t10.transactionManager.manager, n10 = await r10.startInternalTransaction(), i10 = await r10.getTransaction(n10, "query");
              try {
                let a10 = await this.interpretNode(e11.args, { ...t10, queryable: i10 });
                return await r10.commitTransaction(n10.id), a10;
              } catch (e12) {
                throw await r10.rollbackTransaction(n10.id), e12;
              }
            }
            case "dataMap": {
              let { value: r10, lastInsertId: n10 } = await this.interpretNode(e11.args.expr, t10);
              return { value: function(e12, t11, r11) {
                switch (t11.type) {
                  case "affectedRows":
                    if ("number" != typeof e12) throw new n_(`Expected an affected rows count, got: ${typeof e12} (${e12})`);
                    return { count: e12 };
                  case "object":
                    return nx(e12, t11.fields, r11, t11.skipNulls);
                  case "field":
                    return nS(e12, "<result>", t11.fieldType, r11);
                  default:
                    ns(t11, `Invalid data mapping type: '${t11.type}'`);
                }
              }(r10, e11.args.structure, e11.args.enums), lastInsertId: n10 };
            }
            case "validate": {
              let { value: r10, lastInsertId: n10 } = await this.interpretNode(e11.args.expr, t10);
              return function(e12, t11, r11) {
                if (!t11.every((t12) => ic(e12, t12))) throw new nm(function(e13, t12) {
                  switch (t12.errorIdentifier) {
                    case "RELATION_VIOLATION":
                      return `The change you are trying to make would violate the required relation '${t12.context.relation}' between the \`${t12.context.modelA}\` and \`${t12.context.modelB}\` models.`;
                    case "MISSING_RECORD":
                      return `An operation failed because it depends on one or more records that were required but not found. No record was found for ${t12.context.operation}.`;
                    case "MISSING_RELATED_RECORD": {
                      let e14 = t12.context.neededFor ? ` (needed to ${t12.context.neededFor})` : "";
                      return `An operation failed because it depends on one or more records that were required but not found. No '${t12.context.model}' record${e14} was found for ${t12.context.operation} on ${t12.context.relationType} relation '${t12.context.relation}'.`;
                    }
                    case "INCOMPLETE_CONNECT_INPUT":
                      return `An operation failed because it depends on one or more records that were required but not found. Expected ${t12.context.expectedRows} records to be connected, found only ${Array.isArray(e13) ? e13.length : e13}.`;
                    case "INCOMPLETE_CONNECT_OUTPUT":
                      return `The required connected records were not found. Expected ${t12.context.expectedRows} records to be connected after connect operation on ${t12.context.relationType} relation '${t12.context.relation}', found ${Array.isArray(e13) ? e13.length : e13}.`;
                    case "RECORDS_NOT_CONNECTED":
                      return `The records for relation \`${t12.context.relation}\` between the \`${t12.context.parent}\` and \`${t12.context.child}\` models are not connected.`;
                    default:
                      ns(t12, `Unknown error identifier: ${t12}`);
                  }
                }(e12, r11), function(e13) {
                  switch (e13.errorIdentifier) {
                    case "RELATION_VIOLATION":
                      return "P2014";
                    case "RECORDS_NOT_CONNECTED":
                      return "P2017";
                    case "INCOMPLETE_CONNECT_OUTPUT":
                      return "P2018";
                    case "MISSING_RECORD":
                    case "MISSING_RELATED_RECORD":
                    case "INCOMPLETE_CONNECT_INPUT":
                      return "P2025";
                    default:
                      ns(e13, `Unknown error identifier: ${e13}`);
                  }
                }(r11), r11.context);
              }(r10, e11.args.rules, e11.args), { value: r10, lastInsertId: n10 };
            }
            case "if": {
              let { value: r10 } = await this.interpretNode(e11.args.value, t10);
              return ic(r10, e11.args.rule) ? await this.interpretNode(e11.args.then, t10) : await this.interpretNode(e11.args.else, t10);
            }
            case "unit":
              return { value: void 0 };
            case "diff": {
              let { value: r10 } = await this.interpretNode(e11.args.from, t10), { value: n10 } = await this.interpretNode(e11.args.to, t10), i10 = (t11) => null !== t11 ? n7(iA(t11), e11.args.fields) : null, a10 = new Set(ip(n10).map(i10));
              return { value: ip(r10).filter((e12) => !a10.has(i10(e12))) };
            }
            case "process": {
              let { value: r10, lastInsertId: n10 } = await this.interpretNode(e11.args.expr, t10), i10 = nO(e11.args.operations);
              return function e12(t11, r11, n11) {
                let i11 = t11.pagination?.cursor;
                if (i11) for (let [e13, t12] of Object.entries(i11)) i11[e13] = ii(t12, r11, n11);
                for (let i12 of Object.values(t11.nested)) e12(i12, r11, n11);
              }(i10, t10.scope, t10.generators), { value: n6(r10, i10), lastInsertId: n10 };
            }
            case "initializeRecord": {
              let { lastInsertId: r10 } = await this.interpretNode(e11.args.expr, t10), n10 = {};
              for (let [i10, a10] of Object.entries(e11.args.fields)) n10[i10] = function(e12, t11, r11, n11) {
                switch (e12.type) {
                  case "value":
                    return ii(e12.value, r11, n11);
                  case "lastInsertId":
                    return t11;
                  default:
                    ns(e12, `Unexpected field initializer type: ${e12.type}`);
                }
              }(a10, r10, t10.scope, t10.generators);
              return { value: n10, lastInsertId: r10 };
            }
            case "mapRecord": {
              let { value: r10, lastInsertId: n10 } = await this.interpretNode(e11.args.expr, t10), i10 = null === r10 ? {} : iA(r10);
              for (let [r11, n11] of Object.entries(e11.args.fields)) i10[r11] = function(e12, t11, r12, n12) {
                switch (e12.type) {
                  case "set":
                    return ii(e12.value, r12, n12);
                  case "add":
                    return ig(t11) + ig(ii(e12.value, r12, n12));
                  case "subtract":
                    return ig(t11) - ig(ii(e12.value, r12, n12));
                  case "multiply":
                    return ig(t11) * ig(ii(e12.value, r12, n12));
                  case "divide": {
                    let i11 = ig(t11), a10 = ig(ii(e12.value, r12, n12));
                    return 0 === a10 ? null : i11 / a10;
                  }
                  default:
                    ns(e12, `Unexpected field operation type: ${e12.type}`);
                }
              }(n11, i10[r11], t10.scope, t10.generators);
              return { value: i10, lastInsertId: n10 };
            }
            default:
              ns(e11, `Unexpected node type: ${e11.type}`);
          }
        }
        #d() {
          return this.#c?.maxBindValues !== void 0 ? this.#c.maxBindValues : this.#f();
        }
        #f() {
          if (void 0 !== this.#u) switch (this.#u) {
            case "cockroachdb":
            case "postgres":
            case "postgresql":
            case "prisma+postgres":
              return 32766;
            case "mysql":
              return 65535;
            case "sqlite":
              return 999;
            case "sqlserver":
              return 2098;
            case "mongodb":
              return;
            default:
              ns(this.#u, `Unexpected provider: ${this.#u}`);
          }
        }
        #h(e11, t10, r10) {
          return nR({ query: e11, execute: r10, provider: this.#u ?? t10.provider, tracingHelper: this.#o, onQuery: this.#i });
        }
      };
      function ih(e10) {
        return Array.isArray(e10) ? 0 === e10.length : null == e10;
      }
      function ip(e10) {
        return Array.isArray(e10) ? e10 : [e10];
      }
      function ig(e10) {
        if ("number" == typeof e10) return e10;
        if ("string" == typeof e10) return Number(e10);
        throw Error(`Expected number, got ${typeof e10}`);
      }
      function iA(e10) {
        if ("object" == typeof e10 && null !== e10) return e10;
        throw Error(`Expected object, got ${typeof e10}`);
      }
      function im(e10, t10) {
        var r10, n10;
        let i10;
        if (!t10 || 0 === t10.plugins.length) return e10;
        let a10 = (n10 = t10.plugins, 0 === (i10 = Object.entries(nP(n10, { query: t10.queryInfo, sql: e10.sql }))).length ? "" : (i10.sort(([e11], [t11]) => e11.localeCompare(t11)), `/*${i10.map(([e11, t11]) => {
          let r11 = encodeURIComponent(e11), n11 = encodeURIComponent(t11).replace(/'/g, "\\'");
          return `${r11}='${n11}'`;
        }).join(",")}*/`));
        return a10 ? { ...e10, sql: (r10 = e10.sql, a10 ? `${r10} ${a10}` : r10) } : e10;
      }
      Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var iy = class {
        #i;
        #a;
        #o = 0;
        constructor(e10) {
          this.#i = e10;
          let t10 = function(e11) {
            return M.from(e11, "base64url");
          }(e10.graph);
          this.#a = new DataView(t10.buffer, t10.byteOffset, t10.byteLength);
        }
        deserialize() {
          let { inputNodeCount: e10, outputNodeCount: t10, rootCount: r10 } = this.#d(), n10 = this.#f(e10), i10 = this.#h(t10), a10 = this.#p(r10);
          return { strings: this.#i.strings, inputNodes: n10, outputNodes: i10, roots: a10 };
        }
        #s() {
          let e10 = 0, t10 = 0, r10;
          do
            e10 |= (127 & (r10 = this.#a.getUint8(this.#o++))) << t10, t10 += 7;
          while (r10 >= 128);
          return e10;
        }
        #l() {
          let e10 = this.#s();
          return 0 === e10 ? void 0 : e10 - 1;
        }
        #u() {
          let e10 = this.#a.getUint8(this.#o);
          return this.#o += 1, e10;
        }
        #c() {
          let e10 = this.#a.getUint16(this.#o, true);
          return this.#o += 2, e10;
        }
        #d() {
          return { inputNodeCount: this.#s(), outputNodeCount: this.#s(), rootCount: this.#s() };
        }
        #f(e10) {
          let t10 = [];
          for (let r10 = 0; r10 < e10; r10++) {
            let e11 = this.#s(), r11 = {};
            for (let t11 = 0; t11 < e11; t11++) {
              let e12 = this.#s(), t12 = this.#c(), n10 = this.#l(), i10 = this.#l(), a10 = { flags: this.#u() };
              0 !== t12 && (a10.scalarMask = t12), void 0 !== n10 && (a10.childNodeId = n10), void 0 !== i10 && (a10.enumNameIndex = i10), r11[e12] = a10;
            }
            t10.push({ edges: r11 });
          }
          return t10;
        }
        #h(e10) {
          let t10 = [];
          for (let r10 = 0; r10 < e10; r10++) {
            let e11 = this.#s(), r11 = {};
            for (let t11 = 0; t11 < e11; t11++) {
              let e12 = this.#s(), t12 = this.#l(), n10 = this.#l(), i10 = {};
              void 0 !== t12 && (i10.argsNodeId = t12), void 0 !== n10 && (i10.outputNodeId = n10), r11[e12] = i10;
            }
            t10.push({ edges: r11 });
          }
          return t10;
        }
        #p(e10) {
          let t10 = {};
          for (let r10 = 0; r10 < e10; r10++) {
            let e11 = this.#s(), r11 = this.#l(), n10 = this.#l(), i10 = this.#i.strings[e11], a10 = {};
            void 0 !== r11 && (a10.argsNodeId = r11), void 0 !== n10 && (a10.outputNodeId = n10), t10[i10] = a10;
          }
          return t10;
        }
      }, iw = class e10 {
        #i;
        #a;
        #o;
        constructor(e11, t10) {
          this.#i = e11, this.#o = t10, this.#a = /* @__PURE__ */ new Map();
          for (let t11 = 0; t11 < e11.strings.length; t11++) this.#a.set(e11.strings[t11], t11);
        }
        static deserialize(t10, r10) {
          return new e10(new iy(t10).deserialize(), r10);
        }
        static fromData(t10, r10) {
          return new e10(t10, r10);
        }
        root(e11) {
          let t10 = this.#i.roots[e11];
          if (t10) return { argsNodeId: t10.argsNodeId, outputNodeId: t10.outputNodeId };
        }
        inputNode(e11) {
          if (!(void 0 === e11 || e11 < 0 || e11 >= this.#i.inputNodes.length)) return { id: e11 };
        }
        outputNode(e11) {
          if (!(void 0 === e11 || e11 < 0 || e11 >= this.#i.outputNodes.length)) return { id: e11 };
        }
        inputEdge(e11, t10) {
          if (!e11) return;
          let r10 = this.#i.inputNodes[e11.id];
          if (!r10) return;
          let n10 = this.#a.get(t10);
          if (void 0 === n10) return;
          let i10 = r10.edges[n10];
          if (i10) return { flags: i10.flags, childNodeId: i10.childNodeId, scalarMask: i10.scalarMask ?? 0, enumNameIndex: i10.enumNameIndex };
        }
        outputEdge(e11, t10) {
          if (!e11) return;
          let r10 = this.#i.outputNodes[e11.id];
          if (!r10) return;
          let n10 = this.#a.get(t10);
          if (void 0 === n10) return;
          let i10 = r10.edges[n10];
          if (i10) return { argsNodeId: i10.argsNodeId, outputNodeId: i10.outputNodeId };
        }
        enumValues(e11) {
          if (e11?.enumNameIndex === void 0) return;
          let t10 = this.#i.strings[e11.enumNameIndex];
          if (t10) return this.#o(t10);
        }
        getString(e11) {
          return this.#i.strings[e11];
        }
      };
      function ib(e10, t10) {
        return (e10.flags & t10) != 0;
      }
      function iv(e10) {
        return e10.scalarMask;
      }
      Q(), U(), V(), H(), eE();
      var iE = /* @__PURE__ */ new Set(["DateTime", "Decimal", "BigInt", "Bytes", "Json", "Raw"]);
      function i_(e10) {
        if (null == e10) return { kind: "null" };
        if ("string" == typeof e10 || "number" == typeof e10 || "boolean" == typeof e10) return { kind: "primitive", value: e10 };
        if (Array.isArray(e10)) return { kind: "array", items: e10 };
        if ("object" == typeof e10) {
          if ("$type" in e10 && "string" == typeof e10.$type) {
            let t10 = e10.$type;
            return iE.has(t10) ? { kind: "taggedScalar", tag: t10, value: e10.value } : { kind: "structural", value: e10.value };
          }
          return { kind: "object", entries: e10 };
        }
        return { kind: "structural", value: e10 };
      }
      var iC = class {
        #i;
        #a = /* @__PURE__ */ new Map();
        #o = /* @__PURE__ */ new Map();
        #s = 1;
        constructor(e10) {
          this.#i = e10;
        }
        getPlaceholderValues() {
          return Object.fromEntries(this.#a);
        }
        #l(e10, t10) {
          let r10 = function(e11, t11) {
            let r11 = function e12(t12) {
              return "List" === t12.type ? `List<${e12(t12.inner)}>` : t12.type;
            }(t11), n11 = ArrayBuffer.isView(e11) ? M.from(e11.buffer, e11.byteOffset, e11.byteLength).toString("base64") : JSON.stringify(e11);
            return `${r11}:${n11}`;
          }(e10, t10), n10 = this.#o.get(r10);
          if (void 0 !== n10) return ix(n10, t10);
          let i10 = `%${this.#s++}`;
          return this.#o.set(r10, i10), this.#a.set(i10, e10), ix(i10, t10);
        }
        parameterizeFieldSelection(e10, t10, r10) {
          let n10 = this.#i.inputNode(t10), i10 = this.#i.outputNode(r10), a10 = { ...e10 };
          return e10.arguments && "Raw" !== e10.arguments.$type && (a10.arguments = this.#u(e10.arguments, n10)), e10.selection && (a10.selection = this.#g(e10.selection, i10)), a10;
        }
        #u(e10, t10) {
          if (!t10) return e10;
          let r10 = {};
          for (let [n10, i10] of Object.entries(e10)) {
            let e11 = this.#i.inputEdge(t10, n10);
            e11 ? r10[n10] = this.#c(i10, e11) : r10[n10] = i10;
          }
          return r10;
        }
        #c(e10, t10) {
          let r10 = i_(e10);
          switch (r10.kind) {
            case "null":
            case "structural":
              return e10;
            case "primitive":
              return this.#d(r10.value, t10);
            case "taggedScalar":
              return this.#f(e10, r10.tag, t10);
            case "array":
              return this.#h(r10.items, e10, t10);
            case "object":
              return this.#p(r10.entries, t10);
            default:
              throw Error(`Unknown value kind ${r10.kind}`);
          }
        }
        #d(e10, t10) {
          if (ib(t10, 2) && void 0 !== t10.enumNameIndex && "string" == typeof e10) {
            let r11 = this.#i.enumValues(t10);
            if (r11 && Object.hasOwn(r11, e10)) return this.#l(r11[e10], { type: "Enum" });
          }
          if (!ib(t10, 1)) return e10;
          let r10 = iv(t10);
          if (0 === r10) return e10;
          let n10 = iS(e10);
          return iT(n10, r10) ? (128 & r10 && (e10 = JSON.stringify(e10)), this.#l(e10, n10)) : e10;
        }
        #f(e10, t10, r10) {
          if (!ib(r10, 1)) return e10;
          let n10 = iv(r10);
          if (0 === n10 || !iP(t10, n10)) return e10;
          let i10 = iO(e10.$type), a10 = e10.value;
          return this.#l(a10, i10);
        }
        #h(e10, t10, r10) {
          if (ib(r10, 1) && 128 & iv(r10)) {
            let t11 = np(ng(e10));
            return this.#l(t11, { type: "Json" });
          }
          if (ib(r10, 2)) {
            let t11 = this.#i.enumValues(r10);
            if (t11 && e10.every((e11) => "string" == typeof e11 && Object.hasOwn(t11, e11))) return this.#l(e10, { type: "List", inner: { type: "Enum" } });
          }
          if (ib(r10, 4) && e10.every((e11) => function(e12, t11) {
            let r11 = i_(e12);
            switch (r11.kind) {
              case "structural":
              case "null":
              default:
                return false;
              case "primitive": {
                let e13 = iS(r11.value), n10 = iv(t11);
                return 0 !== n10 && iT(e13, n10);
              }
              case "taggedScalar": {
                let e13 = iv(t11);
                return 0 !== e13 && iP(r11.tag, e13);
              }
            }
          }(e11, r10)) && e10.length > 0) {
            let t11 = e10.map((e11) => function(e12) {
              return "object" == typeof e12 && null !== e12 && "$type" in e12 && "string" == typeof e12.$type ? function(e13) {
                return e13.value;
              }(e12) : e12;
            }(e11)), r11 = { type: "List", inner: function(e11) {
              let t12 = { type: "Any" };
              for (let r12 of e11) {
                let e12 = i_(r12), n10;
                switch (e12.kind) {
                  case "primitive":
                    n10 = iS(e12.value);
                    break;
                  case "taggedScalar":
                    n10 = iO(e12.tag) ?? { type: "Any" };
                    break;
                  default:
                    return { type: "Any" };
                }
                t12 = function(e13, t13) {
                  if ("Any" === e13.type) return t13;
                  if ("Any" === t13.type || e13.type === t13.type) return e13;
                  let r13 = { Int: 0, BigInt: 1, Float: 2 }, n11 = r13[e13.type], i10 = r13[t13.type];
                  return void 0 !== n11 && void 0 !== i10 ? n11 >= i10 ? e13 : t13 : { type: "Any" };
                }(t12, n10);
              }
              return t12;
            }(e10) };
            return this.#l(t11, r11);
          }
          if (ib(r10, 16)) {
            let t11 = this.#i.inputNode(r10.childNodeId);
            if (t11) return e10.map((e11) => "object" != typeof e11 || null === e11 || Array.isArray(e11) || "$type" in e11 ? e11 : this.#u(e11, t11));
          }
          return t10;
        }
        #p(e10, t10) {
          if (ib(t10, 32)) {
            let r10 = this.#i.inputNode(t10.childNodeId);
            if (r10) return this.#u(e10, r10);
          }
          if (128 & iv(t10)) {
            let t11 = np(ng(e10));
            return this.#l(t11, { type: "Json" });
          }
          return e10;
        }
        #g(e10, t10) {
          if (!e10 || !t10) return e10;
          let r10 = {};
          for (let [n10, i10] of Object.entries(e10)) {
            if ("$scalars" === n10 || "$composites" === n10 || "boolean" == typeof i10) {
              r10[n10] = i10;
              continue;
            }
            let e11 = this.#i.outputEdge(t10, n10);
            if (e11) {
              let t11 = this.#i.inputNode(e11.argsNodeId), a10 = this.#i.outputNode(e11.outputNodeId), o2 = { selection: i10.selection ? this.#g(i10.selection, a10) : {} };
              i10.arguments && (o2.arguments = this.#u(i10.arguments, t11)), r10[n10] = o2;
            } else r10[n10] = i10;
          }
          return r10;
        }
      };
      function ix(e10, t10) {
        return { $type: "Param", value: { name: e10, ...t10 } };
      }
      var iI = 2147483648 - 1;
      function iS(e10) {
        switch (typeof e10) {
          case "boolean":
            return { type: "Boolean" };
          case "number":
            return Number.isInteger(e10) ? -2147483648 <= e10 && e10 <= iI ? { type: "Int" } : { type: "BigInt" } : { type: "Float" };
          case "string":
            return { type: "String" };
          default:
            throw Error("unreachable");
        }
      }
      function iT({ type: e10 }, t10) {
        switch (e10) {
          case "Boolean":
            return (32 & t10) != 0;
          case "Int":
            return (14 & t10) != 0;
          case "BigInt":
            return (4 & t10) != 0;
          case "Float":
            return (8 & t10) != 0;
          case "String":
            return (1 & t10) != 0;
          default:
            return false;
        }
      }
      function iO(e10) {
        switch (e10) {
          case "BigInt":
          case "Bytes":
          case "DateTime":
          case "Json":
            return { type: e10 };
          case "Decimal":
            return { type: "Float" };
          default:
            return;
        }
      }
      function iP(e10, t10) {
        switch (e10) {
          case "DateTime":
            return (64 & t10) != 0;
          case "Decimal":
            return (16 & t10) != 0;
          case "BigInt":
            return (4 & t10) != 0;
          case "Bytes":
            return (256 & t10) != 0;
          case "Json":
            return (128 & t10) != 0;
          default:
            return false;
        }
      }
      async function iR() {
        return globalThis.crypto ?? await Promise.resolve().then(() => (eR(), e_));
      }
      async function iN() {
        return (await iR()).randomUUID();
      }
      async function ik(e10, t10) {
        return new Promise((r10) => {
          e10.addEventListener(t10, r10, { once: true });
        });
      }
      Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var iB = class extends nm {
        name = "TransactionManagerError";
        constructor(e10, t10) {
          super("Transaction API error: " + e10, "P2028", t10);
        }
      }, iD = class extends iB {
        constructor() {
          super("Transaction not found. Transaction ID is invalid, refers to an old closed transaction Prisma doesn't have information about anymore, or was obtained before disconnecting.");
        }
      }, iM = class extends iB {
        constructor(e10) {
          super(`Transaction already closed: A ${e10} cannot be executed on a committed transaction.`);
        }
      }, i$ = class extends iB {
        constructor(e10) {
          super(`Transaction already closed: A ${e10} cannot be executed on a transaction that was rolled back.`);
        }
      }, ij = class extends iB {
        constructor() {
          super("Unable to start a transaction in the given time.");
        }
      }, iL = class extends iB {
        constructor(e10, { timeout: t10, timeTaken: r10 }) {
          super(`A ${e10} cannot be executed on an expired transaction. The timeout for this transaction was ${t10} ms, however ${r10} ms passed since the start of the transaction. Consider increasing the interactive transaction timeout or doing less work in the transaction.`, { operation: e10, timeout: t10, timeTaken: r10 });
        }
      }, iq = class extends iB {
        constructor(e10) {
          super(`Internal Consistency Error: ${e10}`);
        }
      }, iF = class extends iB {
        constructor(e10) {
          super(`Invalid isolation level: ${e10}`, { isolationLevel: e10 });
        }
      }, iQ = ty("prisma:client:transactionManager"), iU = class {
        transactions = /* @__PURE__ */ new Map();
        closedTransactions = [];
        driverAdapter;
        transactionOptions;
        tracingHelper;
        #i;
        #a;
        constructor({ driverAdapter: e10, transactionOptions: t10, tracingHelper: r10, onQuery: n10, provider: i10 }) {
          this.driverAdapter = e10, this.transactionOptions = t10, this.tracingHelper = r10, this.#i = n10, this.#a = i10;
        }
        async startInternalTransaction(e10) {
          let t10 = void 0 !== e10 ? this.#A(e10) : {};
          return await this.tracingHelper.runInChildSpan("start_transaction", () => this.#o(t10));
        }
        async startTransaction(e10) {
          let t10 = void 0 !== e10 ? this.#A(e10) : this.transactionOptions;
          return await this.tracingHelper.runInChildSpan("start_transaction", () => this.#o(t10));
        }
        async #o(e10) {
          if (e10.newTxId) return await this.#p(e10.newTxId, "start", async (e11) => {
            if ("running" !== e11.status) throw new iq(`Transaction in invalid state ${e11.status} when starting a nested transaction.`);
            if (!e11.transaction) throw new iq("Transaction missing underlying driver transaction when starting a nested transaction.");
            e11.depth += 1;
            let t11 = this.#l(e11);
            e11.savepoints.push(t11);
            try {
              await this.#u(e11.transaction)(t11);
            } catch (t12) {
              throw e11.depth -= 1, e11.savepoints.pop(), t12;
            }
            return { id: e11.id };
          });
          let t10 = { id: await iN(), status: "waiting", timer: void 0, timeout: e10.timeout, startedAt: Date.now(), transaction: void 0, operationQueue: Promise.resolve(), depth: 1, savepoints: [], savepointCounter: 0 }, r10 = new AbortController(), n10 = iV(() => r10.abort(), e10.maxWait);
          n10?.unref?.();
          let i10 = this.driverAdapter.startTransaction(e10.isolationLevel).catch(ny);
          switch (t10.transaction = await Promise.race([i10.finally(() => clearTimeout(n10)), ik(r10.signal, "abort").then(() => {
          })]), this.transactions.set(t10.id, t10), t10.status) {
            case "waiting":
              if (r10.signal.aborted) throw i10.then((e11) => e11.rollback()).catch((e11) => iQ("error in discarded transaction:", e11)), await this.#m(t10, "timed_out"), new ij();
              return t10.status = "running", t10.timer = this.#h(t10.id, e10.timeout), { id: t10.id };
            case "timed_out":
            case "running":
            case "committed":
            case "rolled_back":
              throw new iq(`Transaction in invalid state ${t10.status} although it just finished startup.`);
            default:
              ns(t10.status, "Unknown transaction status.");
          }
        }
        async commitTransaction(e10) {
          return await this.tracingHelper.runInChildSpan("commit_transaction", async () => {
            await this.#p(e10, "commit", async (e11) => {
              if (e11.depth > 1) {
                if (!e11.transaction) throw new iD();
                let t10 = e11.savepoints.at(-1);
                if (!t10) throw new iq(`Missing savepoint for nested commit. Depth: ${e11.depth}, transactionId: ${e11.id}`);
                try {
                  await this.#d(e11.transaction, t10);
                } finally {
                  e11.savepoints.pop(), e11.depth -= 1;
                }
                return;
              }
              await this.#m(e11, "committed");
            });
          });
        }
        async rollbackTransaction(e10) {
          return await this.tracingHelper.runInChildSpan("rollback_transaction", async () => {
            await this.#p(e10, "rollback", async (e11) => {
              if (e11.depth > 1) {
                if (!e11.transaction) throw new iD();
                let t10 = e11.savepoints.at(-1);
                if (!t10) throw new iq(`Missing savepoint for nested rollback. Depth: ${e11.depth}, transactionId: ${e11.id}`);
                try {
                  await this.#c(e11.transaction)(t10), await this.#d(e11.transaction, t10);
                } finally {
                  e11.savepoints.pop(), e11.depth -= 1;
                }
                return;
              }
              await this.#m(e11, "rolled_back");
            });
          });
        }
        async getTransaction(e10, t10) {
          let r10 = this.#s(e10.id, t10);
          if ("closing" === r10.status && (await r10.closing, r10 = this.#s(e10.id, t10)), !r10.transaction) throw new iD();
          return r10.transaction;
        }
        #s(e10, t10) {
          let r10 = this.transactions.get(e10);
          if (!r10) {
            let r11 = this.closedTransactions.find((t11) => t11.id === e10);
            if (r11) switch (iQ("Transaction already closed.", { transactionId: e10, status: r11.status }), r11.status) {
              case "closing":
              case "waiting":
              case "running":
                throw new iq("Active transaction found in closed transactions list.");
              case "committed":
                throw new iM(t10);
              case "rolled_back":
                throw new i$(t10);
              case "timed_out":
                throw new iL(t10, { timeout: r11.timeout, timeTaken: Date.now() - r11.startedAt });
            }
            else throw iQ("Transaction not found.", e10), new iD();
          }
          if (["committed", "rolled_back", "timed_out"].includes(r10.status)) throw new iq("Closed transaction found in active transactions map.");
          return r10;
        }
        async cancelAllTransactions() {
          await Promise.allSettled([...this.transactions.values()].map((e10) => this.#g(e10, async () => {
            let t10 = this.transactions.get(e10.id);
            t10 && await this.#m(t10, "rolled_back");
          })));
        }
        #l(e10) {
          return `prisma_sp_${e10.savepointCounter++}`;
        }
        #u(e10) {
          if (e10.createSavepoint) return e10.createSavepoint.bind(e10);
          throw new iB(`Nested transactions are not supported by adapter "${e10.adapterName}" (${e10.provider}): createSavepoint is not implemented.`);
        }
        #c(e10) {
          if (e10.rollbackToSavepoint) return e10.rollbackToSavepoint.bind(e10);
          throw new iB(`Nested transactions are not supported by adapter "${e10.adapterName}" (${e10.provider}): rollbackToSavepoint is not implemented.`);
        }
        async #d(e10, t10) {
          e10.releaseSavepoint && await e10.releaseSavepoint(t10);
        }
        #f(e10) {
          iQ("Transaction already committed or rolled back when timeout happened.", e10);
        }
        #h(e10, t10) {
          let r10 = Date.now(), n10 = iV(async () => {
            iQ("Transaction timed out.", { transactionId: e10, timeoutStartedAt: r10, timeout: t10 });
            let n11 = this.transactions.get(e10);
            n11 ? await this.#g(n11, async () => {
              let t11 = this.transactions.get(e10);
              t11 && ["running", "waiting"].includes(t11.status) ? await this.#m(t11, "timed_out") : this.#f(e10);
            }) : this.#f(e10);
          }, t10);
          return n10?.unref?.(), n10;
        }
        async #p(e10, t10, r10) {
          let n10 = this.#s(e10, t10);
          return await this.#g(n10, async () => {
            let n11 = this.#s(e10, t10);
            return await r10(n11);
          });
        }
        async #g(e10, t10) {
          let r10 = e10.operationQueue, n10;
          e10.operationQueue = new Promise((e11) => {
            n10 = e11;
          }), await r10;
          try {
            return await t10();
          } finally {
            n10();
          }
        }
        async #m(e10, t10) {
          let r10 = async () => {
            iQ("Closing transaction.", { transactionId: e10.id, status: t10 });
            try {
              if (e10.transaction && "committed" === t10) if (e10.transaction.options.usePhantomQuery) await this.#y({ sql: '-- Implicit "COMMIT" query via underlying driver', args: [], argTypes: [] }, e10.transaction, () => e10.transaction.commit());
              else {
                let t11 = { sql: "COMMIT", args: [], argTypes: [] };
                await this.#y(t11, e10.transaction, () => e10.transaction.executeRaw(t11)).then(() => e10.transaction.commit(), (t12) => {
                  let r11 = () => Promise.reject(t12);
                  return e10.transaction.rollback().then(r11, r11);
                });
              }
              else if (e10.transaction) if (e10.transaction.options.usePhantomQuery) await this.#y({ sql: '-- Implicit "ROLLBACK" query via underlying driver', args: [], argTypes: [] }, e10.transaction, () => e10.transaction.rollback());
              else {
                let t11 = { sql: "ROLLBACK", args: [], argTypes: [] };
                try {
                  await this.#y(t11, e10.transaction, () => e10.transaction.executeRaw(t11));
                } finally {
                  await e10.transaction.rollback();
                }
              }
            } finally {
              e10.status = t10, clearTimeout(e10.timer), e10.timer = void 0, this.transactions.delete(e10.id), this.closedTransactions.push(e10), this.closedTransactions.length > 100 && this.closedTransactions.shift();
            }
          };
          "closing" === e10.status ? (await e10.closing, this.#s(e10.id, "committed" === t10 ? "commit" : "rollback")) : await Object.assign(e10, { status: "closing", reason: t10, closing: r10() }).closing;
        }
        #A(e10) {
          if (!e10.timeout) throw new iB("timeout is required");
          if (!e10.maxWait) throw new iB("maxWait is required");
          if ("SNAPSHOT" === e10.isolationLevel) throw new iF(e10.isolationLevel);
          return { ...e10, timeout: e10.timeout, maxWait: e10.maxWait };
        }
        #y(e10, t10, r10) {
          return nR({ query: e10, execute: r10, provider: this.#a ?? t10.provider, tracingHelper: this.tracingHelper, onQuery: this.#i });
        }
      };
      function iV(e10, t10) {
        return void 0 !== t10 ? setTimeout(e10, t10) : void 0;
      }
      var iH = e.r(84898), iW = "7.8.0";
      Q(), U(), V(), H(), eE();
      var iG = { bigint: "bigint", date: "datetime", decimal: "decimal", bytes: "bytes" };
      function iX(e10) {
        return "object" == typeof e10 && null !== e10 && "prisma__type" in e10 && "string" == typeof e10.prisma__type && e10.prisma__type in iG ? iG[e10.prisma__type] : "number" == typeof e10 ? "decimal" : "string" == typeof e10 ? "string" : "unknown";
      }
      Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var iJ = b(eM());
      Q(), U(), V(), H(), eE();
      var iz = class e10 {
        #i;
        #a;
        #o;
        #s;
        #l;
        constructor(e11, t10, r10) {
          this.#i = e11, this.#a = t10, this.#o = r10, this.#s = t10.getConnectionInfo?.(), this.#l = id.forSql({ onQuery: this.#i.onQuery, tracingHelper: this.#i.tracingHelper, provider: this.#i.provider, connectionInfo: this.#s });
        }
        static async connect(t10) {
          let r10, n10;
          try {
            r10 = await t10.driverAdapterFactory.connect(), n10 = new iU({ driverAdapter: r10, transactionOptions: t10.transactionOptions, tracingHelper: t10.tracingHelper, onQuery: t10.onQuery, provider: t10.provider });
          } catch (e11) {
            throw await r10?.dispose(), e11;
          }
          return new e10(t10, r10, n10);
        }
        getConnectionInfo() {
          let e11 = this.#s ?? { supportsRelationJoins: false };
          return Promise.resolve({ provider: this.#a.provider, connectionInfo: e11 });
        }
        async execute({ plan: e11, placeholderValues: t10, transaction: r10, batchIndex: n10, queryInfo: i10 }) {
          let a10 = r10 ? await this.#o.getTransaction(r10, void 0 !== n10 ? "batch query" : "query") : this.#a;
          return await this.#l.run(e11, { queryable: a10, transactionManager: r10 ? { enabled: false } : { enabled: true, manager: this.#o }, scope: t10, sqlCommenter: this.#i.sqlCommenters && { plugins: this.#i.sqlCommenters, queryInfo: i10 } });
        }
        async startTransaction(e11) {
          return { ...await this.#o.startTransaction(e11), payload: void 0 };
        }
        async commitTransaction(e11) {
          await this.#o.commitTransaction(e11.id);
        }
        async rollbackTransaction(e11) {
          await this.#o.rollbackTransaction(e11.id);
        }
        async disconnect() {
          try {
            await this.#o.cancelAllTransactions();
          } finally {
            await this.#a.dispose();
          }
        }
        apiKey() {
          return null;
        }
      };
      Q(), U(), V(), H(), eE();
      var iK = class {
        #i;
        #a;
        #o;
        constructor(e10 = 1e3) {
          this.#i = /* @__PURE__ */ new Map(), this.#a = /* @__PURE__ */ new Map(), this.#o = e10;
        }
        getSingle(e10) {
          let t10 = this.#i.get(e10);
          return t10 && (this.#i.delete(e10), this.#i.set(e10, t10)), t10;
        }
        setSingle(e10, t10) {
          if (this.#i.has(e10)) {
            this.#i.delete(e10), this.#i.set(e10, t10);
            return;
          }
          if (this.#i.size >= this.#o) {
            let e11 = this.#i.keys().next().value;
            void 0 !== e11 && this.#i.delete(e11);
          }
          this.#i.set(e10, t10);
        }
        getBatch(e10) {
          let t10 = this.#a.get(e10);
          return t10 && (this.#a.delete(e10), this.#a.set(e10, t10)), t10;
        }
        setBatch(e10, t10) {
          if (this.#a.has(e10)) {
            this.#a.delete(e10), this.#a.set(e10, t10);
            return;
          }
          if (this.#a.size >= this.#o) {
            let e11 = this.#a.keys().next().value;
            void 0 !== e11 && this.#a.delete(e11);
          }
          this.#a.set(e10, t10);
        }
        clear() {
          this.#i.clear(), this.#a.clear();
        }
        get size() {
          return this.#i.size + this.#a.size;
        }
        get singleCacheSize() {
          return this.#i.size;
        }
        get batchCacheSize() {
          return this.#a.size;
        }
      };
      Q(), U(), V(), H(), eE();
      var iY = e.r(84898);
      Q(), U(), V(), H(), eE();
      var iZ = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
      Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var i0 = class extends Error {
        clientVersion;
        cause;
        constructor(e10, t10) {
          super(e10), this.clientVersion = t10.clientVersion, this.cause = t10.cause;
        }
        get [Symbol.toStringTag]() {
          return this.name;
        }
      }, i1 = class extends i0 {
        isRetryable;
        constructor(e10, t10) {
          super(e10, t10), this.isRetryable = t10.isRetryable ?? true;
        }
      };
      Q(), U(), V(), H(), eE();
      var i2 = class extends i1 {
        name = "InvalidDatasourceError";
        code = "P6001";
        constructor(e10, t10) {
          super(e10, function(e11, t11) {
            return { ...e11, isRetryable: t11 };
          }(t10, false));
        }
      };
      tN(i2, "InvalidDatasourceError"), Q(), U(), V(), H(), eE();
      var i4 = b(eB()), i3 = class {
        apiKey;
        tracingHelper;
        logLevel;
        logQueries;
        engineHash;
        constructor({ apiKey: e10, tracingHelper: t10, logLevel: r10, logQueries: n10, engineHash: i10 }) {
          this.apiKey = e10, this.tracingHelper = t10, this.logLevel = r10, this.logQueries = n10, this.engineHash = i10;
        }
        build({ traceparent: e10, transactionId: t10 } = {}) {
          let r10 = { Accept: "application/json", Authorization: `Bearer ${this.apiKey}`, "Content-Type": "application/json", "Prisma-Engine-Hash": this.engineHash, "Prisma-Engine-Version": i4.enginesVersion };
          this.tracingHelper.isEnabled() && (r10.traceparent = e10 ?? this.tracingHelper.getTraceParent()), t10 && (r10["X-Transaction-Id"] = t10);
          let n10 = this.#i();
          return n10.length > 0 && (r10["X-Capture-Telemetry"] = n10.join(", ")), r10;
        }
        #i() {
          let e10 = [];
          return this.tracingHelper.isEnabled() && e10.push("tracing"), this.logLevel && e10.push(this.logLevel), this.logQueries && e10.push("query"), e10;
        }
      };
      function i8(e10) {
        return new Date(1e3 * e10[0] + e10[1] / 1e6);
      }
      Q(), U(), V(), H(), eE();
      var i6 = ty("prisma:client:clientEngine:remoteExecutor"), i9 = class {
        #i;
        #a;
        #o;
        #s;
        #l;
        #u;
        constructor(e10) {
          this.#i = e10.clientVersion, this.#s = e10.logEmitter, this.#l = e10.tracingHelper, this.#u = e10.sqlCommenters;
          let { url: t10, apiKey: r10 } = function(e11) {
            let t11 = { clientVersion: e11.clientVersion }, r11;
            try {
              r11 = new URL(e11.accelerateUrl);
            } catch (r12) {
              let e12 = r12.message;
              throw new i2(`Error validating \`accelerateUrl\`, the URL cannot be parsed, reason: ${e12}`, t11);
            }
            let { protocol: n10, searchParams: i10 } = r11;
            if ("prisma:" !== n10 && n10 !== tb) throw new i2("Error validating `accelerateUrl`: the URL must start with the protocol `prisma://` or `prisma+postgres://`", t11);
            let a10 = i10.get("api_key");
            if (null === a10 || a10.length < 1) throw new i2("Error validating `accelerateUrl`: the URL must contain a valid API key", t11);
            let o2 = !function(e12) {
              if (!e12?.toString().startsWith(`${tb}//`)) return false;
              let { host: t12 } = new URL(e12);
              return t12.includes("localhost") || t12.includes("127.0.0.1") || t12.includes("[::1]");
            }(r11) ? "https:" : "http:";
            return j.env.TEST_CLIENT_ENGINE_REMOTE_EXECUTOR && r11.searchParams.has("use_http") && (o2 = "http:"), { apiKey: a10, url: new URL(r11.href.replace(n10, o2)) };
          }({ clientVersion: e10.clientVersion, accelerateUrl: e10.accelerateUrl });
          this.#o = new i5(t10), this.#a = new i3({ apiKey: r10, engineHash: e10.clientVersion, logLevel: e10.logLevel, logQueries: e10.logQueries, tracingHelper: e10.tracingHelper });
        }
        async getConnectionInfo() {
          return await this.#c({ path: "/connection-info", method: "GET" });
        }
        async execute({ plan: e10, placeholderValues: t10, batchIndex: r10, model: n10, operation: i10, transaction: a10, customFetch: o2, queryInfo: s2 }) {
          let l2 = s2 && this.#u?.length ? nP(this.#u, { query: s2 }) : void 0;
          return (await this.#c({ path: a10 ? `/transaction/${a10.id}/query` : "/query", method: "POST", body: { model: n10, operation: i10, plan: e10, params: t10, comments: l2 && Object.keys(l2).length > 0 ? l2 : void 0 }, batchRequestIdx: r10, fetch: o2 })).data;
        }
        async startTransaction(e10) {
          return { ...await this.#c({ path: "/transaction/start", method: "POST", body: e10 }), payload: void 0 };
        }
        async commitTransaction(e10) {
          await this.#c({ path: `/transaction/${e10.id}/commit`, method: "POST" });
        }
        async rollbackTransaction(e10) {
          await this.#c({ path: `/transaction/${e10.id}/rollback`, method: "POST" });
        }
        disconnect() {
          return Promise.resolve();
        }
        apiKey() {
          return this.#a.apiKey;
        }
        async #c({ path: e10, method: t10, body: r10, fetch: n10 = globalThis.fetch, batchRequestIdx: i10 }) {
          let a10 = await this.#o.request({ method: t10, path: e10, headers: this.#a.build(), body: r10, fetch: n10 });
          a10.ok || await this.#d(a10, i10);
          let o2 = await a10.json();
          return "object" == typeof o2.extensions && null !== o2.extensions && this.#f(o2.extensions), o2;
        }
        async #d(e10, t10) {
          let r10 = e10.headers.get("Prisma-Error-Code"), n10 = await e10.text(), i10, a10 = n10;
          try {
            i10 = JSON.parse(n10);
          } catch {
            i10 = {};
          }
          "string" == typeof i10.code && (r10 = i10.code), "string" == typeof i10.error ? a10 = i10.error : "string" == typeof i10.message ? a10 = i10.message : "object" == typeof i10.InvalidRequestError && null !== i10.InvalidRequestError && "string" == typeof i10.InvalidRequestError.reason && (a10 = i10.InvalidRequestError.reason), a10 = a10 || `HTTP ${e10.status}: ${e10.statusText}`;
          let o2 = "object" == typeof i10.meta && null !== i10.meta ? i10.meta : i10;
          throw new iY.PrismaClientKnownRequestError(a10, { clientVersion: this.#i, code: r10 ?? "P6000", batchRequestIdx: t10, meta: o2 });
        }
        #f(e10) {
          if (e10.logs) for (let t10 of e10.logs) this.#h(t10);
          e10.spans && this.#l.dispatchEngineSpans(e10.spans);
        }
        #h(e10) {
          switch (e10.level) {
            case "debug":
            case "trace":
              i6(e10);
              break;
            case "error":
            case "warn":
            case "info":
              this.#s.emit(e10.level, { timestamp: i8(e10.timestamp), message: e10.attributes.message ?? "", target: e10.target ?? "RemoteExecutor" });
              break;
            case "query":
              this.#s.emit("query", { query: e10.attributes.query ?? "", timestamp: i8(e10.timestamp), duration: e10.attributes.duration_ms ?? 0, params: e10.attributes.params ?? "", target: e10.target ?? "RemoteExecutor" });
              break;
            default:
              throw Error(`Unexpected log level: ${e10.level}`);
          }
        }
      }, i5 = class {
        #i;
        #a;
        #o;
        constructor(e10) {
          this.#i = e10, this.#a = /* @__PURE__ */ new Map();
        }
        async request({ method: e10, path: t10, headers: r10, body: n10, fetch: i10 }) {
          let a10 = new URL(t10, this.#i), o2 = this.#s(a10);
          o2 && (r10.Cookie = o2), this.#o && (r10["Accelerate-Query-Engine-Jwt"] = this.#o);
          let s2 = await i10(a10.href, { method: e10, body: void 0 !== n10 ? JSON.stringify(n10) : void 0, headers: r10 });
          return i6(e10, a10, s2.status, s2.statusText), this.#o = s2.headers.get("Accelerate-Query-Engine-Jwt") ?? void 0, this.#l(a10, s2), s2;
        }
        #s(e10) {
          let t10 = [], r10 = /* @__PURE__ */ new Date();
          for (let [n10, i10] of this.#a) {
            if (i10.expires && i10.expires < r10) {
              this.#a.delete(n10);
              continue;
            }
            let a10 = i10.domain ?? e10.hostname, o2 = i10.path ?? "/";
            e10.hostname.endsWith(a10) && e10.pathname.startsWith(o2) && t10.push(function(e11, t11) {
              let r11 = {}, n11 = r11.encode || encodeURIComponent;
              if ("function" != typeof n11) throw TypeError("option encode is invalid");
              if (!iZ.test(e11)) throw TypeError("argument name is invalid");
              let i11 = n11(t11);
              if (i11 && !iZ.test(i11)) throw TypeError("argument val is invalid");
              let a11 = e11 + "=" + i11;
              if (void 0 !== r11.maxAge && null !== r11.maxAge) {
                let e12 = r11.maxAge - 0;
                if (Number.isNaN(e12) || !Number.isFinite(e12)) throw TypeError("option maxAge is invalid");
                a11 += "; Max-Age=" + Math.floor(e12);
              }
              if (r11.domain) {
                if (!iZ.test(r11.domain)) throw TypeError("option domain is invalid");
                a11 += "; Domain=" + r11.domain;
              }
              if (r11.path) {
                if (!iZ.test(r11.path)) throw TypeError("option path is invalid");
                a11 += "; Path=" + r11.path;
              }
              if (r11.expires) {
                var o3;
                if (o3 = r11.expires, "[object Date]" !== Object.prototype.toString.call(o3) && !(o3 instanceof Date) || Number.isNaN(r11.expires.valueOf())) throw TypeError("option expires is invalid");
                a11 += "; Expires=" + r11.expires.toUTCString();
              }
              if (r11.httpOnly && (a11 += "; HttpOnly"), r11.secure && (a11 += "; Secure"), r11.priority) switch ("string" == typeof r11.priority ? r11.priority.toLowerCase() : r11.priority) {
                case "low":
                  a11 += "; Priority=Low";
                  break;
                case "medium":
                  a11 += "; Priority=Medium";
                  break;
                case "high":
                  a11 += "; Priority=High";
                  break;
                default:
                  throw TypeError("option priority is invalid");
              }
              if (r11.sameSite) switch ("string" == typeof r11.sameSite ? r11.sameSite.toLowerCase() : r11.sameSite) {
                case true:
                case "strict":
                  a11 += "; SameSite=Strict";
                  break;
                case "lax":
                  a11 += "; SameSite=Lax";
                  break;
                case "none":
                  a11 += "; SameSite=None";
                  break;
                default:
                  throw TypeError("option sameSite is invalid");
              }
              return r11.partitioned && (a11 += "; Partitioned"), a11;
            }(i10.name, i10.value));
          }
          return t10.length > 0 ? t10.join("; ") : void 0;
        }
        #l(e10, t10) {
          let r10 = t10.headers.getSetCookie?.() || [];
          if (0 === r10.length) {
            let e11 = t10.headers.get("Set-Cookie");
            e11 && r10.push(e11);
          }
          for (let t11 of r10) {
            let r11 = function(e11) {
              let t12 = (e11 || "").split(";").filter((e12) => "string" == typeof e12 && !!e12.trim()), r12 = function(e12) {
                let t13 = "", r13 = "", n12 = e12.split("=");
                return n12.length > 1 ? (t13 = n12.shift(), r13 = n12.join("=")) : r13 = e12, { name: t13, value: r13 };
              }(t12.shift() || ""), n11 = r12.name, i11 = r12.value;
              try {
                i11 = decodeURIComponent(i11);
              } catch {
              }
              let a11 = { name: n11, value: i11 };
              for (let e12 of t12) {
                let t13 = e12.split("="), r13 = (t13.shift() || "").trimStart().toLowerCase(), n12 = t13.join("=");
                switch (r13) {
                  case "expires":
                    a11.expires = new Date(n12);
                    break;
                  case "max-age":
                    a11.maxAge = Number.parseInt(n12, 10);
                    break;
                  case "secure":
                    a11.secure = true;
                    break;
                  case "httponly":
                    a11.httpOnly = true;
                    break;
                  case "samesite":
                    a11.sameSite = n12;
                    break;
                  default:
                    a11[r13] = n12;
                }
              }
              return a11;
            }(t11), n10 = r11.domain ?? e10.hostname, i10 = r11.path ?? "/", a10 = `${n10}:${i10}:${r11.name}`;
            this.#a.set(a10, { name: r11.name, value: r11.value, domain: n10, path: i10, expires: r11.expires });
          }
        }
      };
      Q(), U(), V(), H(), eE();
      var i7 = e.r(84898), ae = {}, at = { async loadQueryCompiler(e10) {
        let t10, { clientVersion: r10, compilerWasm: n10 } = e10;
        if (void 0 === n10) throw new i7.PrismaClientInitializationError("WASM query compiler was unexpectedly `undefined`", r10);
        return void 0 === e10.activeProvider || void 0 === ae[e10.activeProvider] ? (t10 = (async () => {
          let e11 = await n10.getRuntime(), t11 = await n10.getQueryCompilerWasmModule();
          if (null == t11) throw new i7.PrismaClientInitializationError("The loaded wasm module was unexpectedly `undefined` or `null` once loaded", r10);
          let i10 = { [n10.importName]: e11 }, a10 = new WebAssembly.Instance(t11, i10), o2 = a10.exports.__wbindgen_start;
          return e11.__wbg_set_wasm(a10.exports), o2(), e11.QueryCompiler;
        })(), void 0 !== e10.activeProvider && (ae[e10.activeProvider] = t10)) : t10 = ae[e10.activeProvider], await t10;
      } }, ar = ty("prisma:client:clientEngine"), an = globalThis;
      an.PRISMA_WASM_PANIC_REGISTRY = { set_message(e10) {
        throw new iH.PrismaClientRustPanicError(e10, iW);
      } };
      var ai = class {
        name = "ClientEngine";
        #i;
        #a = { type: "disconnected" };
        #o;
        #s;
        #l;
        #u;
        config;
        datamodel;
        logEmitter;
        logQueries;
        logLevel;
        tracingHelper;
        #c;
        constructor(e10, t10) {
          if (void 0 !== e10.accelerateUrl) this.#s = { remote: true, accelerateUrl: e10.accelerateUrl };
          else if (e10.adapter) this.#s = { remote: false, driverAdapterFactory: e10.adapter }, ar("Using driver adapter: %O", e10.adapter);
          else throw new iH.PrismaClientInitializationError("Missing configured driver adapter. Engine type `client` requires an active driver adapter. Please check your PrismaClient initialization code.", e10.clientVersion, "P2038");
          this.#o = t10 ?? at, this.config = e10, this.logQueries = e10.logQueries ?? false, this.logLevel = e10.logLevel ?? "error", this.logEmitter = e10.logEmitter, this.datamodel = e10.inlineSchema, this.tracingHelper = e10.tracingHelper, this.#l = 0 === e10.queryPlanCacheMaxSize ? void 0 : new iK(e10.queryPlanCacheMaxSize), this.#u = iw.deserialize(e10.parameterizationSchema, (t11) => {
            if (!Object.hasOwn(e10.runtimeDataModel.enums, t11)) return;
            let r10 = {};
            for (let n10 of e10.runtimeDataModel.enums[t11].values) r10[n10.name] = n10.dbName ?? n10.name;
            return r10;
          }), e10.enableDebugLogs && (this.logLevel = "debug"), this.logQueries && (this.#c = (e11) => {
            this.logEmitter.emit("query", { ...e11, params: np(e11.params), target: "ClientEngine" });
          });
        }
        async #d() {
          switch (this.#a.type) {
            case "disconnected": {
              let e10 = this.tracingHelper.runInChildSpan("connect", async () => {
                let e11, t10;
                try {
                  e11 = await this.#f(), t10 = await this.#h(e11);
                } catch (r11) {
                  throw this.#a = { type: "disconnected" }, t10?.free(), await e11?.disconnect(), r11;
                }
                let r10 = { executor: e11, queryCompiler: t10 };
                return this.#a = { type: "connected", engine: r10 }, r10;
              });
              return this.#a = { type: "connecting", promise: e10 }, await e10;
            }
            case "connecting":
              return await this.#a.promise;
            case "connected":
              return this.#a.engine;
            case "disconnecting":
              return await this.#a.promise, await this.#d();
          }
        }
        async #f() {
          return this.#s.remote ? new i9({ clientVersion: this.config.clientVersion, accelerateUrl: this.#s.accelerateUrl, logEmitter: this.logEmitter, logLevel: this.logLevel, logQueries: this.logQueries, tracingHelper: this.tracingHelper, sqlCommenters: this.config.sqlCommenters }) : await iz.connect({ driverAdapterFactory: this.#s.driverAdapterFactory, tracingHelper: this.tracingHelper, transactionOptions: { ...this.config.transactionOptions, isolationLevel: this.#w(this.config.transactionOptions.isolationLevel) }, onQuery: this.#c, provider: this.config.activeProvider, sqlCommenters: this.config.sqlCommenters });
        }
        async #h(e10) {
          let t10 = this.#i;
          void 0 === t10 && (t10 = await this.#o.loadQueryCompiler(this.config), this.#i = t10);
          let { provider: r10, connectionInfo: n10 } = await e10.getConnectionInfo();
          try {
            return this.#A(() => new t10({ datamodel: this.datamodel, provider: r10, connectionInfo: n10 }), void 0, false);
          } catch (e11) {
            throw this.#p(e11);
          }
        }
        #p(e10) {
          if (e10 instanceof iH.PrismaClientRustPanicError) return e10;
          try {
            let t10 = JSON.parse(e10.message);
            return new iH.PrismaClientInitializationError(t10.message, this.config.clientVersion, t10.error_code);
          } catch {
            return e10;
          }
        }
        #g(e10, t10) {
          if (e10 instanceof iH.PrismaClientInitializationError) return e10;
          if ("GenericFailure" === e10.code && e10.message?.startsWith("PANIC:")) return new iH.PrismaClientRustPanicError(aa(this, e10.message, t10), this.config.clientVersion);
          if (e10 instanceof nm) return new iH.PrismaClientKnownRequestError(e10.message, { code: e10.code, meta: e10.meta, clientVersion: this.config.clientVersion });
          try {
            let t11 = JSON.parse(e10);
            return new iH.PrismaClientUnknownRequestError(`${t11.message}
${t11.backtrace}`, { clientVersion: this.config.clientVersion });
          } catch {
            return e10;
          }
        }
        #m(e10) {
          return e10 instanceof iH.PrismaClientRustPanicError ? e10 : "string" == typeof e10.message && "string" == typeof e10.code ? new iH.PrismaClientKnownRequestError(e10.message, { code: e10.code, meta: e10.meta, clientVersion: this.config.clientVersion }) : "string" == typeof e10.message ? new iH.PrismaClientUnknownRequestError(e10.message, { clientVersion: this.config.clientVersion }) : e10;
        }
        #A(e10, t10, r10 = true) {
          let n10 = an.PRISMA_WASM_PANIC_REGISTRY.set_message, i10;
          globalThis.PRISMA_WASM_PANIC_REGISTRY.set_message = (e11) => {
            i10 = e11;
          };
          try {
            return e10();
          } finally {
            if (globalThis.PRISMA_WASM_PANIC_REGISTRY.set_message = n10, i10) throw this.#i = void 0, r10 && this.stop().catch((e11) => ar("failed to disconnect:", e11)), new iH.PrismaClientRustPanicError(aa(this, i10, t10), this.config.clientVersion);
          }
        }
        onBeforeExit() {
          throw Error('"beforeExit" hook is not applicable to the client engine, it is only relevant and implemented for the binary engine. Please add your event listener to the `process` object directly instead.');
        }
        async start() {
          await this.#d();
        }
        async stop() {
          switch (this.#a.type) {
            case "disconnected":
              return;
            case "connecting":
              return await this.#a.promise, await this.stop();
            case "connected": {
              let e10 = this.#a.engine, t10 = this.tracingHelper.runInChildSpan("disconnect", async () => {
                try {
                  await e10.executor.disconnect(), e10.queryCompiler.free();
                } finally {
                  this.#a = { type: "disconnected" };
                }
              });
              return this.#a = { type: "disconnecting", promise: t10 }, await t10;
            }
            case "disconnecting":
              return await this.#a.promise;
          }
        }
        version() {
          return "unknown";
        }
        async transaction(e10, t10, r10) {
          let n10, { executor: i10 } = await this.#d();
          try {
            "start" === e10 ? n10 = await i10.startTransaction({ ...r10, isolationLevel: this.#w(r10.isolationLevel) }) : "commit" === e10 ? await i10.commitTransaction(r10) : "rollback" === e10 ? await i10.rollbackTransaction(r10) : tw(e10, "Invalid transaction action.");
          } catch (e11) {
            throw this.#g(e11);
          }
          return n10 ? { id: n10.id, payload: void 0 } : void 0;
        }
        async request(e10, { interactiveTransaction: t10, customDataProxyFetch: r10 }) {
          ar("sending request");
          let { executor: n10, queryCompiler: i10 } = await this.#d().catch((t11) => {
            throw this.#g(t11, JSON.stringify(e10));
          }), a10, o2 = {};
          if (ao(e10)) a10 = as(e10);
          else {
            var s2;
            let t11, r11, n11, { parameterizedQuery: l2, placeholderValues: u2 } = (t11 = new iC(s2 = this.#u), r11 = e10.modelName ? `${e10.modelName}.${e10.action}` : e10.action, n11 = s2.root(r11), { parameterizedQuery: { ...e10, query: t11.parameterizeFieldSelection(e10.query, n11?.argsNodeId, n11?.outputNodeId) }, placeholderValues: t11.getPlaceholderValues() }), c2 = JSON.stringify(l2);
            o2 = u2;
            let d2 = "createMany" !== e10.action && "createManyAndReturn" !== e10.action, h2 = d2 ? this.#l?.getSingle(c2) : void 0;
            h2 ? (ar("query plan cache hit"), a10 = h2) : (ar("query plan cache miss"), a10 = this.#y(l2, c2, i10), d2 && this.#l?.setSingle(c2, a10));
          }
          try {
            ar("query plan created", a10);
            let i11 = await n10.execute({ plan: a10, model: e10.modelName, operation: e10.action, placeholderValues: o2, transaction: t10, batchIndex: void 0, customFetch: r10?.(globalThis.fetch), queryInfo: { type: "single", modelName: e10.modelName, action: e10.action, query: e10.query } });
            return ar("query plan executed"), { data: { [e10.action]: i11 } };
          } catch (t11) {
            throw this.#g(t11, JSON.stringify(e10));
          }
        }
        async requestBatch(e10, { transaction: t10, customDataProxyFetch: r10 }) {
          if (0 === e10.length) return [];
          let n10 = e10[0].action, i10 = e10[0].modelName, a10 = { batch: e10, transaction: t10?.kind === "batch" ? { isolationLevel: t10.options.isolationLevel } : void 0 }, o2 = JSON.stringify(a10), { executor: s2, queryCompiler: l2 } = await this.#d().catch((e11) => {
            throw this.#g(e11, o2);
          }), u2, c2 = {};
          if (void 0 === i10) u2 = this.#b(e10, o2, l2);
          else {
            let { parameterizedBatch: e11, placeholderValues: t11 } = function(e12, t12) {
              let r12 = new iC(t12), n12 = [];
              for (let i11 = 0; i11 < e12.batch.length; i11++) {
                let a11 = e12.batch[i11], o3 = a11.modelName ? `${a11.modelName}.${a11.action}` : a11.action, s3 = t12.root(o3);
                n12.push({ ...a11, query: r12.parameterizeFieldSelection(a11.query, s3?.argsNodeId, s3?.outputNodeId) });
              }
              return { parameterizedBatch: { ...e12, batch: n12 }, placeholderValues: r12.getPlaceholderValues() };
            }(a10, this.#u), r11 = JSON.stringify(e11);
            c2 = t11;
            let n11 = this.#l?.getBatch(r11);
            if (n11) ar("batch query plan cache hit"), u2 = n11;
            else {
              ar("batch query plan cache miss");
              try {
                u2 = this.#b(e11.batch, r11, l2), this.#l?.setBatch(r11, u2);
              } catch (e12) {
                throw this.#m(e12);
              }
            }
          }
          try {
            let a11;
            switch (t10?.kind === "itx" && (a11 = t10.options), u2.type) {
              case "multi": {
                if (t10?.kind !== "itx") {
                  let e11 = t10?.options, r11 = { maxWait: e11?.maxWait ?? this.config.transactionOptions.maxWait, timeout: e11?.timeout ?? this.config.transactionOptions.timeout, isolationLevel: e11?.isolationLevel ?? this.config.transactionOptions.isolationLevel };
                  a11 = await this.transaction("start", {}, r11);
                }
                let n11 = [], i11 = false;
                for (let [t11, o3] of u2.plans.entries()) try {
                  let i12 = await s2.execute({ plan: o3, placeholderValues: c2, model: e10[t11].modelName, operation: e10[t11].action, batchIndex: t11, transaction: a11, customFetch: r10?.(globalThis.fetch), queryInfo: { type: "single", ...e10[t11] } });
                  n11.push({ data: { [e10[t11].action]: i12 } });
                } catch (e11) {
                  n11.push(e11), i11 = true;
                  break;
                }
                return void 0 !== a11 && t10?.kind !== "itx" && (i11 ? await this.transaction("rollback", {}, a11) : await this.transaction("commit", {}, a11)), n11;
              }
              case "compacted": {
                if (!e10.every((e11) => e11.action === n10 && e11.modelName === i10)) {
                  let t12 = e10.map((e11) => e11.action).join(", "), r11 = e10.map((e11) => e11.modelName).join(", ");
                  throw Error(`Internal error: All queries in a compacted batch must have the same action and model name, but received actions: [${t12}] and model names: [${r11}]. This indicates a bug in the client. Please report this issue to the Prisma team with your query details.`);
                }
                if (void 0 === i10) throw Error("Internal error: A compacted batch cannot contain raw queries. This indicates a bug in the client. Please report this issue to the Prisma team with your query details.");
                let t11 = await s2.execute({ plan: u2.plan, placeholderValues: c2, model: i10, operation: n10, batchIndex: void 0, transaction: a11, customFetch: r10?.(globalThis.fetch), queryInfo: { type: "compacted", action: n10, modelName: i10, queries: e10 } });
                return function(e11, t12, r11 = {}) {
                  let n11 = e11.map((e12) => t12.keys.reduce((t13, r12) => (t13[r12] = ng(e12[r12]), t13), {})), i11 = new Set(t12.nestedSelection);
                  return t12.arguments.map((a12) => {
                    let o3 = function(e12, t13) {
                      let r12 = {};
                      for (let [n12, i12] of Object.entries(e12)) if (r12[n12] = i12, "object" == typeof i12 && null !== i12 && ("$type" in i12 && "Param" === i12.$type || "prisma__type" in i12 && "param" === i12.prisma__type)) {
                        let e13 = "prisma__type" in i12 ? i12.prisma__value?.name : i12.value.name;
                        e13 && e13 in t13 && (r12[n12] = t13[e13]);
                      }
                      return r12;
                    }(a12, r11), s3 = n11.findIndex((e12) => nl(e12, o3));
                    return -1 === s3 ? t12.expectNonEmpty ? new nm("An operation failed because it depends on one or more records that were required but not found", "P2025") : null : Object.fromEntries(Object.entries(e11[s3]).filter(([e12]) => i11.has(e12)));
                  });
                }(t11, u2, c2).map((e11) => ({ data: { [n10]: e11 } }));
              }
            }
          } catch (e11) {
            throw this.#g(e11, o2);
          }
        }
        async apiKey() {
          let { executor: e10 } = await this.#d();
          return e10.apiKey();
        }
        #y(e10, t10, r10) {
          try {
            return this.#A(() => this.#v({ queries: [e10], execute: () => r10.compile(t10) }));
          } catch (e11) {
            throw this.#m(e11);
          }
        }
        #b(e10, t10, r10) {
          if (e10.every(ao)) return { type: "multi", plans: e10.map((e11) => as(e11)) };
          try {
            return this.#A(() => this.#v({ queries: e10, execute: () => r10.compileBatch(t10) }));
          } catch (e11) {
            throw this.#m(e11);
          }
        }
        #w(e10) {
          switch (e10) {
            case void 0:
              return;
            case "ReadUncommitted":
              return "READ UNCOMMITTED";
            case "ReadCommitted":
              return "READ COMMITTED";
            case "RepeatableRead":
              return "REPEATABLE READ";
            case "Serializable":
              return "SERIALIZABLE";
            case "Snapshot":
              return "SNAPSHOT";
            default:
              throw new iH.PrismaClientKnownRequestError(`Inconsistent column data: Conversion failed: Invalid isolation level \`${e10}\``, { code: "P2023", clientVersion: this.config.clientVersion, meta: { providedIsolationLevel: e10 } });
          }
        }
        #v({ queries: e10, execute: t10 }) {
          return this.tracingHelper.runInChildSpan({ name: "compile", attributes: { models: e10.map((e11) => e11.modelName).filter((e11) => void 0 !== e11), actions: e10.map((e11) => e11.action) } }, t10);
        }
      };
      function aa(e10, t10, r10) {
        return function({ version: e11, binaryTarget: t11, title: r11, description: n10, engineVersion: i10, database: a10, query: o2 }) {
          var s2;
          let l2 = tP(function(e12 = 7500) {
            let t12 = tf.map(([e13, ...t13]) => `${e13} ${t13.map((e14) => "string" == typeof e14 ? e14 : JSON.stringify(e14)).join(" ")}`).join(`
`);
            return t12.length < e12 ? t12 : t12.slice(-e12);
          }(6e3 - (o2?.length ?? 0))).split(`
`).map((e12) => e12.replace(/^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)\s*/, "").replace(/\+\d+\s*ms$/, "")).join(`
`), u2 = n10 ? `# Description
\`\`\`
${n10}
\`\`\`` : "", c2 = function({ title: e12, user: t12 = "prisma", repo: r12 = "prisma", template: n11 = "bug_report.yml", body: i11 }) {
            return (0, iJ.default)({ user: t12, repo: r12, template: n11, title: e12, body: i11 });
          }({ title: r11, body: tP(`Hi Prisma Team! My Prisma Client just crashed. This is the report:
## Versions

| Name            | Version            |
|-----------------|--------------------|
| Node            | ${j.version?.padEnd(19)}| 
| OS              | ${t11?.padEnd(19)}|
| Prisma Client   | ${e11?.padEnd(19)}|
| Query Engine    | ${i10?.padEnd(19)}|
| Database        | ${a10?.padEnd(19)}|

${u2}

## Logs
\`\`\`
${l2}
\`\`\`

## Client Snippet
\`\`\`ts
// PLEASE FILL YOUR CODE SNIPPET HERE
\`\`\`

## Schema
\`\`\`prisma
// PLEASE ADD YOUR SCHEMA HERE IF POSSIBLE
\`\`\`

## Prisma Engine Query
\`\`\`
${o2 && (s2 = o2) ? s2.replace(/".*"/g, '"X"').replace(/[\s:\[]([+-]?([0-9]*[.])?[0-9]+)/g, (e12) => `${e12[0]}5`) : ""}
\`\`\`
`) });
          return `${r11}

This is a non-recoverable error which probably happens when the Prisma Query Engine has a panic.

${ta(c2)}

If you want the Prisma team to look into it, please open the link above \u{1F64F}
To increase the chance of success, please post your schema and a snippet of
how you used Prisma Client in the issue. 
`;
        }({ binaryTarget: void 0, title: t10, version: e10.config.clientVersion, engineVersion: "unknown", database: e10.config.activeProvider, query: r10 });
      }
      function ao(e10) {
        return "queryRaw" === e10.action || "executeRaw" === e10.action;
      }
      function as(e10) {
        let t10 = e10.query.arguments.query, { args: r10, argTypes: n10 } = function(e11) {
          let t11;
          try {
            t11 = JSON.parse(e11);
          } catch (e12) {
            throw Error(`Received invalid serialized parameters: ${e12.message}`);
          }
          if (!Array.isArray(t11)) throw Error("Received invalid serialized parameters: expected an array");
          return { args: t11.map((e12) => function e13(t12) {
            if (Array.isArray(t12)) return t12.map((t13) => e13(t13));
            if ("object" == typeof t12 && null !== t12 && "prisma__value" in t12) {
              if (!("prisma__type" in t12)) throw Error("Invalid serialized parameter, prisma__type should be present when prisma__value is present");
              return `${t12.prisma__value}`;
            }
            return "object" == typeof t12 && null !== t12 ? JSON.stringify(t12) : t12;
          }(e12)), argTypes: t11.map((e12) => {
            var t12;
            return Array.isArray(t12 = e12) ? { scalarType: t12.length > 0 ? iX(t12[0]) : "unknown", arity: "list" } : { scalarType: iX(t12), arity: "scalar" };
          }) };
        }(e10.query.arguments.parameters);
        return { type: "queryRaw" === e10.action ? "query" : "execute", args: { type: "rawSql", sql: t10, args: r10, argTypes: n10 } };
      }
      Q(), U(), V(), H(), eE();
      var al = (e10) => ({ command: e10 });
      Q(), U(), V(), H(), eE();
      var au = e.r(84898);
      Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var ac = e.r(84898);
      function ad(e10) {
        try {
          return ah(e10, "fast");
        } catch {
          return ah(e10, "slow");
        }
      }
      function ah(e10, t10) {
        return JSON.stringify(e10.map((e11) => function e12(t11, r10) {
          var n10;
          if (Array.isArray(t11)) return t11.map((t12) => e12(t12, r10));
          if ("bigint" == typeof t11) return { prisma__type: "bigint", prisma__value: t11.toString() };
          if (tD(t11)) return { prisma__type: "date", prisma__value: t11.toJSON() };
          if (ac.Decimal.isDecimal(t11)) return { prisma__type: "decimal", prisma__value: t11.toJSON() };
          if (M.isBuffer(t11)) return { prisma__type: "bytes", prisma__value: t11.toString("base64") };
          if ((n10 = t11) instanceof ArrayBuffer || n10 instanceof SharedArrayBuffer || "object" == typeof n10 && null !== n10 && ("ArrayBuffer" === n10[Symbol.toStringTag] || "SharedArrayBuffer" === n10[Symbol.toStringTag])) return { prisma__type: "bytes", prisma__value: M.from(t11).toString("base64") };
          if (ArrayBuffer.isView(t11)) {
            let { buffer: e13, byteOffset: r11, byteLength: n11 } = t11;
            return { prisma__type: "bytes", prisma__value: M.from(e13, r11, n11).toString("base64") };
          }
          return "object" == typeof t11 && "slow" === r10 ? af(t11) : t11;
        }(e11, t10)));
      }
      function af(e10) {
        if ("object" != typeof e10 || null === e10) return e10;
        if ("function" == typeof e10.toJSON) return e10.toJSON();
        if (Array.isArray(e10)) return e10.map(ap);
        let t10 = {};
        for (let r10 of Object.keys(e10)) t10[r10] = ap(e10[r10]);
        return t10;
      }
      function ap(e10) {
        return "bigint" == typeof e10 ? e10.toString() : af(e10);
      }
      var ag = /^(\s*alter\s)/i, aA = ty("prisma:client");
      function am(e10, t10, r10, n10) {
        if (("postgresql" === e10 || "cockroachdb" === e10) && r10.length > 0 && ag.exec(t10)) throw Error(`Running ALTER using ${n10} is not supported
Using the example below you can still execute your query with Prisma, but please note that it is vulnerable to SQL injection attacks and requires you to take care of input sanitization.

Example:
  await prisma.$executeRawUnsafe(\`ALTER USER prisma WITH PASSWORD '\${password}'\`)

More Information: https://pris.ly/d/execute-raw
`);
      }
      var ay = ({ clientMethod: e10, activeProvider: t10 }) => (r10) => {
        let n10 = "", i10;
        if (rD(r10)) n10 = r10.sql, i10 = { values: ad(r10.values), __prismaRawParameters__: true };
        else if (Array.isArray(r10)) {
          let [e11, ...t11] = r10;
          n10 = e11, i10 = { values: ad(t11 || []), __prismaRawParameters__: true };
        } else switch (t10) {
          case "sqlite":
          case "mysql":
            n10 = r10.sql, i10 = { values: ad(r10.values), __prismaRawParameters__: true };
            break;
          case "cockroachdb":
          case "postgresql":
          case "postgres":
            n10 = r10.text, i10 = { values: ad(r10.values), __prismaRawParameters__: true };
            break;
          case "sqlserver":
            n10 = r10.strings.reduce((e11, t11, r11) => `${e11}@P${r11}${t11}`), i10 = { values: ad(r10.values), __prismaRawParameters__: true };
            break;
          default:
            throw Error(`The ${t10} provider does not support ${e10}`);
        }
        return i10?.values ? aA(`prisma.${e10}(${n10}, ${i10.values})`) : aA(`prisma.${e10}(${n10})`), { query: n10, parameters: i10 };
      }, aw = { requestArgsToMiddlewareArgs: (e10) => [e10.strings, ...e10.values], middlewareArgsToRequestArgs(e10) {
        let [t10, ...r10] = e10;
        return new au.Sql(t10, r10);
      } }, ab = { requestArgsToMiddlewareArgs: (e10) => [e10], middlewareArgsToRequestArgs: (e10) => e10[0] };
      function av(e10) {
        return function(t10, r10) {
          let n10, i10 = (r11 = e10) => {
            try {
              return void 0 === r11 || r11?.kind === "itx" ? n10 ??= aE(t10(r11)) : aE(t10(r11));
            } catch (e11) {
              return Promise.reject(e11);
            }
          };
          return { get spec() {
            return r10;
          }, then: (e11, t11) => i10().then(e11, t11), catch: (e11) => i10().catch(e11), finally: (e11) => i10().finally(e11), requestTransaction(e11) {
            let t11 = i10(e11);
            return t11.requestTransaction ? t11.requestTransaction(e11) : t11;
          }, [Symbol.toStringTag]: "PrismaPromise" };
        };
      }
      function aE(e10) {
        return "function" == typeof e10.then ? e10 : Promise.resolve(e10);
      }
      Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var a_ = "7.8.0".split(".")[0], aC = `V${a_}_PRISMA_INSTRUMENTATION`, ax = globalThis, aI = { isEnabled: () => false, getTraceParent: () => "00-10-10-00", dispatchEngineSpans() {
      }, getActiveContext() {
      }, runInChildSpan: (e10, t10) => t10() }, aS = class {
        isEnabled() {
          return this.getTracingHelper().isEnabled();
        }
        getTraceParent(e10) {
          return this.getTracingHelper().getTraceParent(e10);
        }
        dispatchEngineSpans(e10) {
          return this.getTracingHelper().dispatchEngineSpans(e10);
        }
        getActiveContext() {
          return this.getTracingHelper().getActiveContext();
        }
        runInChildSpan(e10, t10) {
          return this.getTracingHelper().runInChildSpan(e10, t10);
        }
        getTracingHelper() {
          let e10;
          return e10 = ax[aC], (e10?.helper ? e10.helper : ax.PRISMA_INSTRUMENTATION?.helper) ?? aI;
        }
      };
      Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var aT = e.r(84898);
      function aO(e10) {
        if ("findUnique" !== e10.action && "findUniqueOrThrow" !== e10.action) return;
        let t10 = [];
        return e10.modelName && t10.push(e10.modelName), e10.query.arguments && t10.push(aP(e10.query.arguments)), t10.push(aP(e10.query.selection)), t10.join("");
      }
      function aP(e10) {
        return `(${Object.keys(e10).sort().map((t10) => {
          let r10 = e10[t10];
          return "object" == typeof r10 && null !== r10 ? `(${t10} ${aP(r10)})` : t10;
        }).join(" ")})`;
      }
      Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var aR = { aggregate: false, aggregateRaw: false, createMany: true, createManyAndReturn: true, createOne: true, deleteMany: true, deleteOne: true, executeRaw: true, findFirst: false, findFirstOrThrow: false, findMany: false, findRaw: false, findUnique: false, findUniqueOrThrow: false, groupBy: false, queryRaw: false, runCommandRaw: true, updateMany: true, updateManyAndReturn: true, updateOne: true, upsertOne: true };
      Q(), U(), V(), H(), eE();
      var aN = class {
        constructor(e10) {
          this.options = e10, this.batches = {};
        }
        batches;
        tickActive = false;
        request(e10) {
          let t10 = this.options.batchBy(e10);
          return t10 ? (this.batches[t10] || (this.batches[t10] = [], this.tickActive || (this.tickActive = true, j.nextTick(() => {
            this.dispatchBatches(), this.tickActive = false;
          }))), new Promise((r10, n10) => {
            this.batches[t10].push({ request: e10, resolve: r10, reject: n10 });
          })) : this.options.singleLoader(e10);
        }
        dispatchBatches() {
          for (let e10 in this.batches) {
            let t10 = this.batches[e10];
            delete this.batches[e10], 1 === t10.length ? this.options.singleLoader(t10[0].request).then((e11) => {
              e11 instanceof Error ? t10[0].reject(e11) : t10[0].resolve(e11);
            }).catch((e11) => {
              t10[0].reject(e11);
            }) : (t10.sort((e11, t11) => this.options.batchOrder(e11.request, t11.request)), this.options.batchLoader(t10.map((e11) => e11.request)).then((e11) => {
              if (e11 instanceof Error) for (let r10 = 0; r10 < t10.length; r10++) t10[r10].reject(e11);
              else for (let r10 = 0; r10 < t10.length; r10++) {
                let n10 = e11[r10];
                n10 instanceof Error ? t10[r10].reject(n10) : t10[r10].resolve(n10);
              }
            }).catch((e11) => {
              for (let r10 = 0; r10 < t10.length; r10++) t10[r10].reject(e11);
            }));
          }
        }
        get [Symbol.toStringTag]() {
          return "DataLoader";
        }
      };
      Q(), U(), V(), H(), eE();
      var ak = e.r(84898);
      function aB(e10) {
        let t10 = [], r10 = function(e11) {
          let t11 = {};
          for (let r11 = 0; r11 < e11.columns.length; r11++) t11[e11.columns[r11]] = null;
          return t11;
        }(e10);
        for (let n10 = 0; n10 < e10.rows.length; n10++) {
          let i10 = e10.rows[n10], a10 = { ...r10 };
          for (let t11 = 0; t11 < i10.length; t11++) a10[e10.columns[t11]] = function e11(t12, r11) {
            if (null === r11) return r11;
            switch (t12) {
              case "bigint":
                return BigInt(r11);
              case "bytes": {
                let { buffer: e12, byteOffset: t13, byteLength: n11 } = M.from(r11, "base64");
                return new Uint8Array(e12, t13, n11);
              }
              case "decimal":
                return new ak.Decimal(r11);
              case "datetime":
              case "date":
                return new Date(r11);
              case "time":
                return /* @__PURE__ */ new Date(`1970-01-01T${r11}Z`);
              case "bigint-array":
                return r11.map((t13) => e11("bigint", t13));
              case "bytes-array":
                return r11.map((t13) => e11("bytes", t13));
              case "decimal-array":
                return r11.map((t13) => e11("decimal", t13));
              case "datetime-array":
                return r11.map((t13) => e11("datetime", t13));
              case "date-array":
                return r11.map((t13) => e11("date", t13));
              case "time-array":
                return r11.map((t13) => e11("time", t13));
              default:
                return r11;
            }
          }(e10.types[t11], i10[t11]);
          t10.push(a10);
        }
        return t10;
      }
      var aD = ty("prisma:client:request_handler"), aM = class {
        client;
        dataloader;
        logEmitter;
        constructor(e10, t10) {
          this.logEmitter = t10, this.client = e10, this.dataloader = new aN({ batchLoader: /* @__PURE__ */ function(e11) {
            return (t11) => {
              let r10 = { requests: t11 }, n10 = t11[0].extensions.getAllBatchQueryCallbacks();
              return n10.length ? function e12(t12, r11, n11, i10) {
                if (n11 === r11.length) return i10(t12);
                let a10 = t12.customDataProxyFetch, o2 = t12.requests[0].transaction;
                return r11[n11]({ args: { queries: t12.requests.map((e13) => ({ model: e13.modelName, operation: e13.action, args: e13.args })), transaction: o2 ? { isolationLevel: "batch" === o2.kind ? o2.isolationLevel : void 0 } : void 0 }, __internalParams: t12, query(o3, s2 = t12) {
                  let l2 = s2.customDataProxyFetch;
                  return s2.customDataProxyFetch = nn(a10, l2), e12(s2, r11, n11 + 1, i10);
                } });
              }(r10, n10, 0, e11) : e11(r10);
            };
          }(async ({ requests: e11, customDataProxyFetch: t11 }) => {
            let { transaction: r10, otelParentCtx: n10 } = e11[0], i10 = e11.map((e12) => e12.protocolQuery), a10 = this.client._tracingHelper.getTraceParent(n10), o2 = e11.some((e12) => aR[e12.protocolQuery.action]);
            return (await this.client._engine.requestBatch(i10, { traceparent: a10, transaction: function(e12) {
              if (e12) {
                if ("batch" === e12.kind) return { kind: "batch", options: { isolationLevel: e12.isolationLevel, maxWait: e12.maxWait, timeout: e12.timeout } };
                if ("itx" === e12.kind) return { kind: "itx", options: a$(e12) };
                tw(e12, "Unknown transaction kind");
              }
            }(r10), containsWrite: o2, customDataProxyFetch: t11 })).map((t12, r11) => {
              if (t12 instanceof Error) return t12;
              try {
                return this.mapQueryEngineResult(e11[r11], t12);
              } catch (e12) {
                return e12;
              }
            });
          }), singleLoader: async (e11) => {
            let t11 = e11.transaction?.kind === "itx" ? a$(e11.transaction) : void 0, r10 = await this.client._engine.request(e11.protocolQuery, { traceparent: this.client._tracingHelper.getTraceParent(), interactiveTransaction: t11, isWrite: aR[e11.protocolQuery.action], customDataProxyFetch: e11.customDataProxyFetch });
            return this.mapQueryEngineResult(e11, r10);
          }, batchBy: (e11) => {
            if (e11.transaction?.kind === "itx") {
              let t11 = aO(e11.protocolQuery);
              return `itx-${e11.transaction.id}${t11 ? `-${t11}` : ""}`;
            }
            return e11.transaction?.id ? `transaction-${e11.transaction.id}` : aO(e11.protocolQuery);
          }, batchOrder: (e11, t11) => e11.transaction?.kind === "batch" && t11.transaction?.kind === "batch" ? e11.transaction.index - t11.transaction.index : 0 });
        }
        async request(e10) {
          try {
            return await this.dataloader.request(e10);
          } catch (o2) {
            let { clientMethod: t10, callsite: r10, transaction: n10, args: i10, modelName: a10 } = e10;
            this.handleAndLogRequestError({ error: o2, clientMethod: t10, callsite: r10, transaction: n10, args: i10, modelName: a10, globalOmit: e10.globalOmit });
          }
        }
        mapQueryEngineResult({ dataPath: e10, unpacker: t10 }, r10) {
          let n10 = r10?.data, i10 = this.unpack(n10, e10, t10);
          return j.env.PRISMA_CLIENT_GET_TIME ? { data: i10 } : i10;
        }
        handleAndLogRequestError(e10) {
          try {
            this.handleRequestError(e10);
          } catch (t10) {
            throw this.logEmitter && this.logEmitter.emit("error", { message: t10.message, target: e10.clientMethod, timestamp: /* @__PURE__ */ new Date() }), t10;
          }
        }
        handleRequestError({ error: e10, clientMethod: t10, callsite: r10, transaction: n10, args: i10, modelName: a10, globalOmit: o2 }) {
          var s2, l2, u2;
          if (aD(e10), s2 = e10, l2 = n10, (0, aT.hasBatchIndex)(s2) && l2?.kind === "batch" && s2.batchRequestIdx !== l2.index) throw e10;
          e10 instanceof oe.PrismaClientKnownRequestError && ("P2009" === (u2 = e10).code || "P2012" === u2.code) && rf({ args: i10, errors: [function e11(t11) {
            if ("Union" === t11.kind) return { kind: "Union", errors: t11.errors.map(e11) };
            if (Array.isArray(t11.selectionPath)) {
              let [, ...e12] = t11.selectionPath;
              return { ...t11, selectionPath: e12 };
            }
            return t11;
          }(e10.meta)], callsite: r10, errorFormat: this.client._errorFormat, originalMethod: t10, clientVersion: this.client._clientVersion, globalOmit: o2 });
          let c2 = e10.message;
          if (r10 && (c2 = tH({ callsite: r10, originalMethod: t10, isPanic: e10.isPanic, showColors: "pretty" === this.client._errorFormat, message: c2 })), c2 = this.sanitizeMessage(c2), e10.code) {
            let t11 = a10 ? { modelName: a10, ...e10.meta } : e10.meta;
            throw new oe.PrismaClientKnownRequestError(c2, { code: e10.code, clientVersion: this.client._clientVersion, meta: t11, batchRequestIdx: e10.batchRequestIdx });
          }
          if (e10.isPanic) throw new oe.PrismaClientRustPanicError(c2, this.client._clientVersion);
          if (e10 instanceof oe.PrismaClientUnknownRequestError) throw new oe.PrismaClientUnknownRequestError(c2, { clientVersion: this.client._clientVersion, batchRequestIdx: e10.batchRequestIdx });
          if (e10 instanceof oe.PrismaClientInitializationError) throw new oe.PrismaClientInitializationError(c2, this.client._clientVersion);
          if (e10 instanceof oe.PrismaClientRustPanicError) throw new oe.PrismaClientRustPanicError(c2, this.client._clientVersion);
          throw e10.clientVersion = this.client._clientVersion, e10;
        }
        sanitizeMessage(e10) {
          return this.client._errorFormat && "pretty" !== this.client._errorFormat ? tP(e10) : e10;
        }
        unpack(e10, t10, r10) {
          if (!e10 || (e10.data && (e10 = e10.data), !e10)) return e10;
          let n10 = Object.keys(e10)[0], i10 = r0(Object.values(e10)[0], t10.filter((e11) => "select" !== e11 && "include" !== e11)), a10 = "queryRaw" === n10 ? aB(i10) : ng(i10);
          return r10 ? r10(a10) : a10;
        }
        get [Symbol.toStringTag]() {
          return "RequestHandler";
        }
      };
      function a$(e10) {
        return { id: e10.id, payload: e10.payload };
      }
      Q(), U(), V(), H(), eE(), Q(), U(), V(), H(), eE();
      var aj = b(e$());
      Q(), U(), V(), H(), eE();
      var aL = class extends Error {
        constructor(e10) {
          super(e10 + `
Read more at https://pris.ly/d/client-constructor`), this.name = "PrismaClientConstructorValidationError";
        }
        get [Symbol.toStringTag]() {
          return "PrismaClientConstructorValidationError";
        }
      };
      tN(aL, "PrismaClientConstructorValidationError");
      var aq = ["errorFormat", "adapter", "accelerateUrl", "log", "transactionOptions", "omit", "comments", "queryPlanCacheMaxSize", "__internal"], aF = ["pretty", "colorless", "minimal"], aQ = ["info", "query", "warn", "error"], aU = { adapter: () => {
      }, accelerateUrl: (e10) => {
        if (void 0 !== e10) {
          if ("string" != typeof e10) throw new aL(`Invalid value ${JSON.stringify(e10)} for "accelerateUrl" provided to PrismaClient constructor.`);
          if (0 === e10.trim().length) throw new aL('"accelerateUrl" provided to PrismaClient constructor must be a non-empty string.');
        }
      }, errorFormat: (e10) => {
        if (e10) {
          if ("string" != typeof e10) throw new aL(`Invalid value ${JSON.stringify(e10)} for "errorFormat" provided to PrismaClient constructor.`);
          if (!aF.includes(e10)) {
            let t10 = aV(e10, aF);
            throw new aL(`Invalid errorFormat ${e10} provided to PrismaClient constructor.${t10}`);
          }
        }
      }, log: (e10) => {
        if (e10) {
          if (!Array.isArray(e10)) throw new aL(`Invalid value ${JSON.stringify(e10)} for "log" provided to PrismaClient constructor.`);
          for (let r10 of e10) {
            t10(r10);
            let e11 = { level: t10, emit: (e12) => {
              let t11 = ["stdout", "event"];
              if (!t11.includes(e12)) {
                let r11 = aV(e12, t11);
                throw new aL(`Invalid value ${JSON.stringify(e12)} for "emit" in logLevel provided to PrismaClient constructor.${r11}`);
              }
            } };
            if (r10 && "object" == typeof r10) for (let [t11, n10] of Object.entries(r10)) if (e11[t11]) e11[t11](n10);
            else throw new aL(`Invalid property ${t11} for "log" provided to PrismaClient constructor`);
          }
        }
        function t10(e11) {
          if ("string" == typeof e11 && !aQ.includes(e11)) {
            let t11 = aV(e11, aQ);
            throw new aL(`Invalid log level "${e11}" provided to PrismaClient constructor.${t11}`);
          }
        }
      }, transactionOptions: (e10) => {
        if (!e10) return;
        let t10 = e10.maxWait;
        if (null != t10 && t10 <= 0) throw new aL(`Invalid value ${t10} for maxWait in "transactionOptions" provided to PrismaClient constructor. maxWait needs to be greater than 0`);
        let r10 = e10.timeout;
        if (null != r10 && r10 <= 0) throw new aL(`Invalid value ${r10} for timeout in "transactionOptions" provided to PrismaClient constructor. timeout needs to be greater than 0`);
      }, omit: (e10, t10) => {
        if ("object" != typeof e10) throw new aL('"omit" option is expected to be an object.');
        if (null === e10) throw new aL('"omit" option can not be `null`');
        let r10 = [];
        for (let [a10, o2] of Object.entries(e10)) {
          var n10, i10;
          let e11 = (n10 = a10, aH((i10 = t10.runtimeDataModel).models, n10) ?? aH(i10.types, n10));
          if (!e11) {
            r10.push({ kind: "UnknownModel", modelKey: a10 });
            continue;
          }
          for (let [t11, n11] of Object.entries(o2)) {
            let i11 = e11.fields.find((e12) => e12.name === t11);
            if (!i11) {
              r10.push({ kind: "UnknownField", modelKey: a10, fieldName: t11 });
              continue;
            }
            if (i11.relationName) {
              r10.push({ kind: "RelationInOmit", modelKey: a10, fieldName: t11 });
              continue;
            }
            "boolean" != typeof n11 && r10.push({ kind: "InvalidFieldValue", modelKey: a10, fieldName: t11 });
          }
        }
        if (r10.length > 0) throw new aL(function(e11, t11) {
          let r11 = rc(e11);
          for (let e12 of t11) switch (e12.kind) {
            case "UnknownModel":
              r11.arguments.getField(e12.modelKey)?.markAsError(), r11.addErrorMessage(() => `Unknown model name: ${e12.modelKey}.`);
              break;
            case "UnknownField":
              r11.arguments.getDeepField([e12.modelKey, e12.fieldName])?.markAsError(), r11.addErrorMessage(() => `Model "${e12.modelKey}" does not have a field named "${e12.fieldName}".`);
              break;
            case "RelationInOmit":
              r11.arguments.getDeepField([e12.modelKey, e12.fieldName])?.markAsError(), r11.addErrorMessage(() => 'Relations are already excluded by default and can not be specified in "omit".');
              break;
            case "InvalidFieldValue":
              r11.arguments.getDeepFieldValue([e12.modelKey, e12.fieldName])?.markAsError(), r11.addErrorMessage(() => "Omit field option value must be a boolean.");
          }
          let { message: n11, args: i11 } = rh(r11, "colorless");
          return `Error validating "omit" option:

${i11}

${n11}`;
        }(e10, r10));
      }, queryPlanCacheMaxSize: (e10) => {
        if (void 0 !== e10) {
          if ("number" != typeof e10) throw new aL(`Invalid value ${JSON.stringify(e10)} for "queryPlanCacheMaxSize" provided to PrismaClient constructor. Expected a number.`);
          if (!Number.isInteger(e10)) throw new aL(`Invalid value ${e10} for "queryPlanCacheMaxSize" provided to PrismaClient constructor. Expected an integer.`);
          if (e10 < 0) throw new aL(`Invalid value ${e10} for "queryPlanCacheMaxSize" provided to PrismaClient constructor. Cache size needs to be greater or equal to 0.`);
        }
      }, comments: (e10) => {
        if (void 0 !== e10) {
          if (!Array.isArray(e10)) throw new aL(`Invalid value ${JSON.stringify(e10)} for "comments" provided to PrismaClient constructor. Expected an array of SQL commenter plugins.`);
          for (let t10 = 0; t10 < e10.length; t10++) if ("function" != typeof e10[t10]) throw new aL(`Invalid value at index ${t10} for "comments" provided to PrismaClient constructor. Each plugin must be a function.`);
        }
      }, __internal: (e10) => {
        if (!e10) return;
        let t10 = ["debug", "engine", "configOverride"];
        if ("object" != typeof e10) throw new aL(`Invalid value ${JSON.stringify(e10)} for "__internal" to PrismaClient constructor`);
        for (let [r10] of Object.entries(e10)) if (!t10.includes(r10)) {
          let e11 = aV(r10, t10);
          throw new aL(`Invalid property ${JSON.stringify(r10)} for "__internal" provided to PrismaClient constructor.${e11}`);
        }
      } };
      function aV(e10, t10) {
        if (0 === t10.length || "string" != typeof e10) return "";
        let r10 = function(e11, t11) {
          if (0 === t11.length) return null;
          let r11 = t11.map((t12) => ({ value: t12, distance: (0, aj.default)(e11, t12) }));
          r11.sort((e12, t12) => e12.distance < t12.distance ? -1 : 1);
          let n10 = r11[0];
          return n10.distance < 3 ? n10.value : null;
        }(e10, t10);
        return r10 ? ` Did you mean "${r10}"?` : "";
      }
      function aH(e10, t10) {
        let r10 = Object.keys(e10).find((e11) => e1(e11) === t10);
        if (r10) return e10[r10];
      }
      Q(), U(), V(), H(), eE();
      var aW = e.r(84898), aG = ty("prisma:client");
      "object" == typeof globalThis && (globalThis.NODE_CLIENT = true);
      var aX = { requestArgsToMiddlewareArgs: (e10) => e10, middlewareArgsToRequestArgs: (e10) => e10 }, aJ = Symbol.for("prisma.client.transaction.scope_context");
      function az(e10) {
        var t10, r10;
        let n10 = e10[aJ];
        if (void 0 === n10) return { kind: "top-level" };
        if ("object" == typeof (t10 = n10) && null !== t10 && "nested" === t10.kind && "string" == typeof t10.txId && "string" == typeof t10.scopeId && "object" == typeof (r10 = t10.scopeState) && null !== r10 && Array.isArray(r10.stack)) return n10;
        throw Error("Internal error: inconsistent transaction scope context.");
      }
      var aK = { id: 0, nextId() {
        return ++this.id;
      } };
      function aY(e10) {
        class t10 {
          _originalClient = this;
          _runtimeDataModel;
          _requestHandler;
          _connectionPromise;
          _disconnectionPromise;
          _engineConfig;
          _accelerateEngineConfig;
          _clientVersion;
          _errorFormat;
          _tracingHelper;
          _previewFeatures;
          _activeProvider;
          _globalOmit;
          _extensions;
          _engine;
          _appliedParent;
          _createPrismaPromise = av();
          constructor(t11) {
            let r10;
            if (!t11) throw new oe.PrismaClientInitializationError("`PrismaClient` needs to be constructed with a non-empty, valid `PrismaClientOptions`:\n\n```\nnew PrismaClient({\n  ...\n})\n```\n\nor\n\n```\nconstructor() {\n  super({ ... });\n}\n```\n          ", iW);
            e10 = t11.__internal?.configOverride?.(e10) ?? e10, function(e11, t12) {
              for (let [r12, n12] of Object.entries(e11)) {
                if (!aq.includes(r12)) {
                  let e12 = aV(r12, aq);
                  throw new aL(`Unknown property ${r12} provided to PrismaClient constructor.${e12}`);
                }
                aU[r12](n12, t12);
              }
              let r11 = void 0 !== e11.adapter, n11 = void 0 !== e11.accelerateUrl;
              if (r11 && n11) throw new aL('The "adapter" and "accelerateUrl" options are mutually exclusive. Please provide only one of them.');
              if (!r11 && !n11) throw new aL('Using engine type "client" requires either "adapter" or "accelerateUrl" to be provided to PrismaClient constructor.');
            }(t11, e10);
            let n10 = new eP().on("error", () => {
            });
            if (this._extensions = rm.empty(), this._previewFeatures = e10.previewFeatures, this._clientVersion = e10.clientVersion ?? iW, this._activeProvider = e10.activeProvider, this._globalOmit = t11?.omit, this._tracingHelper = new aS(), t11.adapter) {
              r10 = t11.adapter;
              let n11 = "postgresql" === e10.activeProvider || "cockroachdb" === e10.activeProvider ? "postgres" : e10.activeProvider;
              if (r10.provider !== n11) throw new oe.PrismaClientInitializationError(`The Driver Adapter \`${r10.adapterName}\`, based on \`${r10.provider}\`, is not compatible with the provider \`${n11}\` specified in the Prisma schema.`, this._clientVersion);
            }
            try {
              let i10 = t11 ?? {}, a10 = true === (i10.__internal ?? {}).debug;
              if (a10 && ty.enable("prisma:client"), i10.errorFormat ? this._errorFormat = i10.errorFormat : "production" === j.env.NODE_ENV ? this._errorFormat = "minimal" : (j.env.NO_COLOR, this._errorFormat = "colorless"), this._runtimeDataModel = e10.runtimeDataModel, this._engineConfig = { enableDebugLogs: a10, logLevel: i10.log && function(e11) {
                return "string" == typeof e11 ? e11 : e11.reduce((e12, t12) => {
                  let r11 = "string" == typeof t12 ? t12 : t12.level;
                  return "query" === r11 ? e12 : e12 && ("info" === t12 || "info" === e12) ? "info" : r11;
                }, void 0);
              }(i10.log), logQueries: i10.log && !!("string" == typeof i10.log ? "query" === i10.log : i10.log.find((e11) => "string" == typeof e11 ? "query" === e11 : "query" === e11.level)), compilerWasm: e10.compilerWasm, clientVersion: e10.clientVersion, previewFeatures: this._previewFeatures, activeProvider: e10.activeProvider, inlineSchema: e10.inlineSchema, tracingHelper: this._tracingHelper, transactionOptions: { maxWait: i10.transactionOptions?.maxWait ?? 2e3, timeout: i10.transactionOptions?.timeout ?? 5e3, isolationLevel: i10.transactionOptions?.isolationLevel }, logEmitter: n10, adapter: r10, accelerateUrl: i10.accelerateUrl, sqlCommenters: i10.comments, parameterizationSchema: e10.parameterizationSchema, runtimeDataModel: e10.runtimeDataModel, queryPlanCacheMaxSize: t11.queryPlanCacheMaxSize }, this._accelerateEngineConfig = Object.create(this._engineConfig), this._accelerateEngineConfig.accelerateUtils = { resolveDatasourceUrl: () => {
                if (i10.accelerateUrl) return i10.accelerateUrl;
                throw new oe.PrismaClientInitializationError(`\`accelerateUrl\` is required when using \`@prisma/extension-accelerate\`:

new PrismaClient({
  accelerateUrl: "prisma://...",
}).$extends(withAccelerate())
`, e10.clientVersion);
              } }, aG("clientVersion", e10.clientVersion), this._engine = function(e11) {
                return new ai(e11);
              }(this._engineConfig), this._requestHandler = new aM(this, n10), i10.log) for (let e11 of i10.log) {
                let t12 = "string" == typeof e11 ? e11 : "stdout" === e11.emit ? e11.level : null;
                t12 && this.$on(t12, (e12) => {
                  tv.log(`${tv.tags[t12] ?? ""}`, e12.message || e12.query);
                });
              }
            } catch (e11) {
              throw e11.clientVersion = this._clientVersion, e11;
            }
            return this._appliedParent = r8(this);
          }
          get [Symbol.toStringTag]() {
            return "PrismaClient";
          }
          $on(e11, t11) {
            return "beforeExit" === e11 ? this._engine.onBeforeExit(t11) : e11 && this._engineConfig.logEmitter.on(e11, t11), this;
          }
          $connect() {
            try {
              return this._engine.start();
            } catch (e11) {
              throw e11.clientVersion = this._clientVersion, e11;
            }
          }
          async $disconnect() {
            try {
              await this._engine.stop();
            } catch (e11) {
              throw e11.clientVersion = this._clientVersion, e11;
            } finally {
              tf.length = 0;
            }
          }
          $executeRawInternal(e11, t11, r10, n10) {
            let i10 = this._activeProvider;
            return this._request({ action: "executeRaw", args: r10, transaction: e11, clientMethod: t11, argsMapper: ay({ clientMethod: t11, activeProvider: i10 }), callsite: rG(this._errorFormat), dataPath: [], middlewareArgsMapper: n10 });
          }
          $executeRaw(e11, ...t11) {
            return this._createPrismaPromise((r10) => {
              if (void 0 !== e11.raw || void 0 !== e11.sql) {
                let [n10, i10] = aZ(e11, t11);
                return am(this._activeProvider, n10.text, n10.values, Array.isArray(e11) ? "prisma.$executeRaw`<SQL>`" : "prisma.$executeRaw(sql`<SQL>`)"), this.$executeRawInternal(r10, "$executeRaw", n10, i10);
              }
              throw new oe.PrismaClientValidationError("`$executeRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#executeraw\n", { clientVersion: this._clientVersion });
            });
          }
          $executeRawUnsafe(e11, ...t11) {
            return this._createPrismaPromise((r10) => (am(this._activeProvider, e11, t11, "prisma.$executeRawUnsafe(<SQL>, [...values])"), this.$executeRawInternal(r10, "$executeRawUnsafe", [e11, ...t11])));
          }
          $runCommandRaw(t11) {
            if ("mongodb" !== e10.activeProvider) throw new oe.PrismaClientValidationError(`The ${e10.activeProvider} provider does not support $runCommandRaw. Use the mongodb provider.`, { clientVersion: this._clientVersion });
            return this._createPrismaPromise((e11) => this._request({ args: t11, clientMethod: "$runCommandRaw", dataPath: [], action: "runCommandRaw", argsMapper: al, callsite: rG(this._errorFormat), transaction: e11 }));
          }
          async $queryRawInternal(e11, t11, r10, n10) {
            let i10 = this._activeProvider;
            return this._request({ action: "queryRaw", args: r10, transaction: e11, clientMethod: t11, argsMapper: ay({ clientMethod: t11, activeProvider: i10 }), callsite: rG(this._errorFormat), dataPath: [], middlewareArgsMapper: n10 });
          }
          $queryRaw(e11, ...t11) {
            return this._createPrismaPromise((r10) => {
              if (void 0 !== e11.raw || void 0 !== e11.sql) return this.$queryRawInternal(r10, "$queryRaw", ...aZ(e11, t11));
              throw new oe.PrismaClientValidationError("`$queryRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#queryraw\n", { clientVersion: this._clientVersion });
            });
          }
          $queryRawTyped(e11) {
            return this._createPrismaPromise((t11) => {
              if (!this._hasPreviewFlag("typedSql")) throw new oe.PrismaClientValidationError("`typedSql` preview feature must be enabled in order to access $queryRawTyped API", { clientVersion: this._clientVersion });
              return this.$queryRawInternal(t11, "$queryRawTyped", e11);
            });
          }
          $queryRawUnsafe(e11, ...t11) {
            return this._createPrismaPromise((r10) => this.$queryRawInternal(r10, "$queryRawUnsafe", [e11, ...t11]));
          }
          _transactionWithArray({ promises: e11, options: t11 }) {
            var r10;
            let n10 = aK.nextId(), i10 = function(e12, t12 = () => {
            }) {
              let r11, n11 = new Promise((e13) => r11 = e13);
              return { then: (i11) => (0 == --e12 && r11(t12()), i11?.(n11)) };
            }(e11.length);
            return 0 === (r10 = e11.map((e12, r11) => {
              if (e12?.[Symbol.toStringTag] !== "PrismaPromise") throw Error("All elements of the array need to be Prisma Client promises. Hint: Please make sure you are not awaiting the Prisma client calls you intended to pass in the $transaction function.");
              let a10 = { kind: "batch", id: n10, index: r11, isolationLevel: t11?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel, maxWait: t11?.maxWait ?? this._engineConfig.transactionOptions.maxWait, timeout: t11?.timeout ?? this._engineConfig.transactionOptions.timeout, lock: i10 };
              return e12.requestTransaction?.(a10) ?? e12;
            })).length ? Promise.resolve([]) : new Promise((e12, t12) => {
              let n11 = Array(r10.length), i11 = null, a10 = false, o2 = 0, s2 = () => {
                a10 || ++o2 === r10.length && (a10 = true, i11 ? t12(i11) : e12(n11));
              }, l2 = (e13) => {
                a10 || (a10 = true, t12(e13));
              };
              for (let e13 = 0; e13 < r10.length; e13++) r10[e13].then((t13) => {
                n11[e13] = t13, s2();
              }, (t13) => {
                (0, aW.hasBatchIndex)(t13) ? t13.batchRequestIdx === e13 ? l2(t13) : (i11 || (i11 = t13), s2()) : l2(t13);
              });
            });
          }
          async _transactionWithCallback({ callback: e11, options: t11 = {} }) {
            let r10, n10 = az(this), i10 = "nested" === n10.kind, a10 = i10 ? n10.scopeState : { stack: [] }, o2 = a10.stack, s2 = "function" == typeof globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
            if (i10) {
              if (o2.at(-1) !== n10.scopeId) throw Error("Concurrent nested transactions are not supported");
              t11.newTxId = n10.txId;
            }
            o2.push(s2);
            let l2 = { traceparent: this._tracingHelper.getTraceParent() }, u2 = { maxWait: t11?.maxWait ?? this._engineConfig.transactionOptions.maxWait, timeout: t11?.timeout ?? this._engineConfig.transactionOptions.timeout, isolationLevel: t11?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel, newTxId: t11.newTxId }, c2;
            try {
              c2 = await this._engine.transaction("start", l2, u2);
            } catch (e12) {
              throw o2.at(-1) === s2 && o2.pop(), e12;
            }
            try {
              let t12 = { kind: "itx", ...c2 };
              if (r10 = await e11(this._createItxClient(t12, s2, a10)), i10) {
                if (o2.at(-1) !== s2) throw Error("Nested transactions must be closed in reverse order of creation.");
              } else if (1 !== o2.length) throw Error("Cannot close transaction while a nested transaction is still active.");
              await this._engine.transaction("commit", l2, c2);
            } catch (t12) {
              let e12 = o2.at(-1) !== s2 ? Math.max(1, o2.length) : 1;
              for (let t13 = 0; t13 < e12; t13++) await this._engine.transaction("rollback", l2, c2).catch((r11) => {
                aG("rollback attempt %d/%d failed: %O", t13 + 1, e12, r11);
              });
              throw t12;
            } finally {
              o2.at(-1) === s2 ? o2.pop() : o2.length = 0;
            }
            return r10;
          }
          _createItxClient(e11, t11, r10) {
            let n10 = { kind: "nested", txId: e11.id, scopeId: t11, scopeState: r10 };
            return rU(r8(rU(this[r3] ? this[r3] : this, [rj("_appliedParent", () => this._appliedParent._createItxClient(e11, t11, r10)), rj("_createPrismaPromise", () => av(e11)), rj(aJ, () => n10)])), [rH(ne)]);
          }
          $transaction(t11, r10) {
            let n10;
            return n10 = "function" == typeof t11 ? this._engineConfig.adapter?.adapterName === "@prisma/adapter-d1" ? () => {
              throw Error("Cloudflare D1 does not support interactive transactions. We recommend you to refactor your queries with that limitation in mind, and use batch transactions with `prisma.$transactions([])` where applicable.");
            } : "mongodb" === e10.activeProvider && "nested" === az(this).kind ? () => {
              throw new oe.PrismaClientValidationError(`The ${e10.activeProvider} provider does not support nested transactions`, { clientVersion: this._clientVersion });
            } : () => this._transactionWithCallback({ callback: t11, options: r10 }) : () => this._transactionWithArray({ promises: t11, options: r10 }), this._tracingHelper.runInChildSpan({ name: "transaction", attributes: { method: "$transaction" } }, n10);
          }
          _request(e11) {
            e11.otelParentCtx = this._tracingHelper.getActiveContext();
            let t11 = e11.middlewareArgsMapper ?? aX, r10 = { args: t11.requestArgsToMiddlewareArgs(e11.args), dataPath: e11.dataPath, runInTransaction: !!e11.transaction, action: e11.action, model: e11.model }, n10 = { operation: { name: "operation", attributes: { method: r10.action, model: r10.model, name: r10.model ? `${r10.model}.${r10.action}` : r10.action } } }, i10 = async (r11) => {
              let { runInTransaction: n11, args: i11, ...a10 } = r11, o2 = { ...e11, ...a10 };
              i11 && (o2.args = t11.middlewareArgsToRequestArgs(i11)), void 0 !== e11.transaction && false === n11 && delete o2.transaction;
              let s2 = await function(e12, t12) {
                let { jsModelName: r12, action: n12, clientMethod: i12 } = t12;
                if (e12._extensions.isEmpty()) return e12._executeRequest(t12);
                let a11 = e12._extensions.getAllQueryCallbacks(r12 ?? "$none", r12 ? n12 : i12);
                return function e13(t13, r13, n13, i13 = 0) {
                  return t13._createPrismaPromise((a12) => {
                    let o3 = r13.customDataProxyFetch;
                    return "transaction" in r13 && void 0 !== a12 && (r13.transaction?.kind === "batch" && r13.transaction.lock.then(), r13.transaction = a12), i13 === n13.length ? t13._executeRequest(r13) : n13[i13]({ model: r13.model, operation: r13.model ? r13.action : r13.clientMethod, args: function(e14) {
                      var t14, r14;
                      if (e14 instanceof r7.Sql) {
                        return t14 = e14, new r7.Sql(t14.strings, t14.values);
                      }
                      if (rD(e14)) {
                        return new rk((r14 = e14).sql, r14.values);
                      }
                      if (Array.isArray(e14)) {
                        let t15 = [e14[0]];
                        for (let r15 = 1; r15 < e14.length; r15++) t15[r15] = nt(e14[r15]);
                        return t15;
                      }
                      let n14 = {};
                      for (let t15 in e14) n14[t15] = nt(e14[t15]);
                      return n14;
                    }(r13.args ?? {}), __internalParams: r13, query: (a13, s3 = r13) => {
                      let l3 = s3.customDataProxyFetch;
                      return s3.customDataProxyFetch = nn(o3, l3), s3.args = a13, e13(t13, s3, n13, i13 + 1);
                    } });
                  });
                }(e12, t12, a11);
              }(this, o2);
              if (!o2.model) return s2;
              let l2 = function({ dataPath: e12, modelName: t12, args: r12, runtimeDataModel: n12 }) {
                let i12 = { modelName: t12, args: r12 ?? {} }, a11 = function(e13) {
                  let t13 = [];
                  for (let r13 = 0; r13 < e13.length; r13 += 2) {
                    let n13 = e13[r13], i13 = e13[r13 + 1];
                    if ("select" !== n13 && "include" !== n13 || void 0 === i13) return;
                    t13.push(i13);
                  }
                  return t13;
                }(e12);
                if (!a11 || 0 === a11.length) return i12;
                let o3 = t12, s3 = r12 ?? {};
                for (let t13 of a11) {
                  let r13 = n12.models[o3];
                  if (!r13) return i12;
                  let a12 = r13.fields.find((e13) => e13.name === t13);
                  if (!a12) throw Error(`Could not resolve relation field "${t13}" on model "${o3}" from dataPath "${e12.join(".")}"`);
                  if ("object" !== a12.kind || !a12.relationName) return i12;
                  o3 = a12.type, s3 = function(e13, t14) {
                    let r14 = e13.select?.[t14];
                    if (ni(r14)) return r14;
                    let n13 = e13.include?.[t14];
                    return ni(n13) ? n13 : {};
                  }(s3, t13);
                }
                return { modelName: o3, args: s3 };
              }({ dataPath: o2.dataPath, modelName: o2.model, args: o2.args, runtimeDataModel: this._runtimeDataModel });
              return function({ result: e12, modelName: t12, args: r12, extensions: n12, runtimeDataModel: i12, globalOmit: a11 }) {
                return n12.isEmpty() || null == e12 || "object" != typeof e12 || !i12.models[t12] ? e12 : r9({ result: e12, args: r12 ?? {}, modelName: t12, runtimeDataModel: i12, visitor: (e13, t13, r13) => {
                  let i13 = rp(t13);
                  return function({ result: e14, modelName: t14, select: r14, omit: n13, extensions: i14 }) {
                    let a12 = i14.getAllComputedFields(t14);
                    if (!a12) return e14;
                    let o3 = [], s3 = [];
                    for (let t15 of Object.values(a12)) {
                      if (n13) {
                        if (n13[t15.name]) continue;
                        let e15 = t15.needs.filter((e16) => n13[e16]);
                        e15.length > 0 && s3.push(rH(e15));
                      } else if (r14) {
                        if (!r14[t15.name]) continue;
                        let e15 = t15.needs.filter((e16) => !r14[e16]);
                        e15.length > 0 && s3.push(rH(e15));
                      }
                      (function(e15, t16) {
                        return t16.every((t17) => Object.prototype.hasOwnProperty.call(e15, t17));
                      })(e14, t15.needs) && o3.push(function(e15, t16) {
                        return rL(rj(e15.name, () => e15.compute(t16)));
                      }(t15, rU(e14, o3)));
                    }
                    return o3.length > 0 || s3.length > 0 ? rU(e14, [...o3, ...s3]) : e14;
                  }({ result: e13, modelName: i13, select: r13.select, omit: r13.select ? void 0 : { ...a11?.[i13], ...r13.omit }, extensions: n12 });
                } });
              }({ result: s2, modelName: l2.modelName, args: l2.args, extensions: this._extensions, runtimeDataModel: this._runtimeDataModel, globalOmit: this._globalOmit });
            };
            return this._tracingHelper.runInChildSpan(n10.operation, () => i10(r10));
          }
          async _executeRequest({ args: e11, clientMethod: t11, dataPath: r10, callsite: n10, action: i10, model: a10, argsMapper: o2, transaction: s2, unpacker: l2, otelParentCtx: u2, customDataProxyFetch: c2 }) {
            try {
              e11 = o2 ? o2(e11) : e11;
              let d2 = this._tracingHelper.runInChildSpan({ name: "serialize" }, () => rI({ modelName: a10, runtimeDataModel: this._runtimeDataModel, action: i10, args: e11, clientMethod: t11, callsite: n10, extensions: this._extensions, errorFormat: this._errorFormat, clientVersion: this._clientVersion, previewFeatures: this._previewFeatures, globalOmit: this._globalOmit }));
              return ty.enabled("prisma:client") && (aG("Prisma Client call:"), aG(`prisma.${t11}(${function(e12) {
                if (void 0 === e12) return "";
                let t12 = rc(e12);
                return new tz(0, { colors: tZ }).write(t12).toString();
              }(e11)})`), aG("Generated request:"), aG(JSON.stringify(d2, null, 2) + `
`)), s2?.kind === "batch" && await s2.lock, this._requestHandler.request({ protocolQuery: d2, modelName: a10, action: i10, clientMethod: t11, dataPath: r10, callsite: n10, args: e11, extensions: this._extensions, transaction: s2, unpacker: l2, otelParentCtx: u2, otelChildCtx: this._tracingHelper.getActiveContext(), globalOmit: this._globalOmit, customDataProxyFetch: c2 });
            } catch (e12) {
              throw e12.clientVersion = this._clientVersion, e12;
            }
          }
          _hasPreviewFlag(e11) {
            return !!this._engineConfig.previewFeatures?.includes(e11);
          }
          $extends = r6;
        }
        return t10;
      }
      function aZ(e10, t10) {
        var r10;
        return Array.isArray(r10 = e10) && Array.isArray(r10.raw) ? [new rM.Sql(e10, t10), aw] : [e10, ab];
      }
      Q(), U(), V(), H(), eE();
      var a0 = /* @__PURE__ */ new Set(["toJSON", "$$typeof", "asymmetricMatch", Symbol.iterator, Symbol.toStringTag, Symbol.isConcatSpreadable, Symbol.toPrimitive]);
      function a1(e10) {
        return new Proxy(e10, { get(e11, t10) {
          if (t10 in e11) return e11[t10];
          if (!a0.has(t10)) throw TypeError(`Invalid enum value: ${String(t10)}`);
        } });
      }
      Q(), U(), V(), H(), eE();
      var a2 = () => globalThis.process?.release?.name === "node", a4 = () => !!globalThis.Bun || !!globalThis.process?.versions?.bun, a3 = () => !!globalThis.Deno, a8 = () => "object" == typeof globalThis.Netlify, a6 = () => "object" == typeof globalThis.EdgeRuntime, a9 = () => globalThis.navigator?.userAgent === "Cloudflare-Workers", a5 = { node: "Node.js", workerd: "Cloudflare Workers", deno: "Deno and Deno Deploy", netlify: "Netlify Edge Functions", "edge-light": "Edge Runtime (Vercel Edge Functions, Vercel Edge Middleware, Next.js (Pages Router) Edge API Routes, Next.js (App Router) Edge Route Handlers or Next.js Middleware)" };
      function a7() {
        let e10 = [[a8, "netlify"], [a6, "edge-light"], [a9, "workerd"], [a3, "deno"], [a4, "bun"], [a2, "node"]].flatMap((e11) => e11[0]() ? [e11[1]] : []).at(0) ?? "";
        return { id: e10, prettyName: a5[e10] || e10, isEdge: ["workerd", "deno", "netlify", "edge-light"].includes(e10) };
      }
      var oe = e.r(84898), ot = e.r(84898), or = e.r(84898), on = e.r(84898);
    }, 34179, (e, t, r) => {
      "use strict";
      let n;
      var i = Object.defineProperty, a = Object.getOwnPropertyDescriptor, o = Object.getOwnPropertyNames, s = Object.prototype.hasOwnProperty, l = {}, u = { QueryCompiler: () => x, __wbg_Error_e83987f665cf5504: () => I, __wbg_Number_bb48ca12f395cd08: () => S, __wbg_String_8f0eb39a4a4c2f66: () => T, __wbg___wbindgen_boolean_get_6d5a1ee65bab5f68: () => O, __wbg___wbindgen_debug_string_df47ffb5e35e6763: () => P, __wbg___wbindgen_in_bb933bd9e1b3bc0f: () => R, __wbg___wbindgen_is_object_c818261d21f283a4: () => N, __wbg___wbindgen_is_string_fbb76cb2940daafd: () => k, __wbg___wbindgen_is_undefined_2d472862bd29a478: () => B, __wbg___wbindgen_jsval_loose_eq_b664b38a2f582147: () => D, __wbg___wbindgen_number_get_a20bf9b85341449d: () => M, __wbg___wbindgen_string_get_e4f06c90489ad01b: () => $, __wbg___wbindgen_throw_b855445ff6a94295: () => j, __wbg_entries_e171b586f8f6bdbf: () => L, __wbg_getTime_14776bfb48a1bff9: () => q, __wbg_get_7bed016f185add81: () => F, __wbg_get_with_ref_key_1dc361bd10053bfe: () => Q, __wbg_instanceof_ArrayBuffer_70beb1189ca63b38: () => U, __wbg_instanceof_Uint8Array_20c8e73002f7af98: () => V, __wbg_isSafeInteger_d216eda7911dde36: () => H, __wbg_length_69bca3cb64fc8748: () => W, __wbg_length_cdd215e10d9dd507: () => G, __wbg_new_0_f9740686d739025c: () => X, __wbg_new_1acc0b6eea89d040: () => J, __wbg_new_5a79be3ab53b8aa5: () => z, __wbg_new_68651c719dcda04e: () => K, __wbg_new_e17d9f43105b08be: () => Y, __wbg_prototypesetcall_2a6620b6922694b2: () => Z, __wbg_set_3f1d0b984ed272ed: () => ee, __wbg_set_907fb406c34a251d: () => et, __wbg_set_c213c871859d6500: () => er, __wbg_set_message_82ae475bb413aa5c: () => en, __wbg_set_wasm: () => h, __wbindgen_cast_2241b6af4c4b2941: () => ei, __wbindgen_cast_4625c577ab2ec9ee: () => ea, __wbindgen_cast_9ae0607507abb057: () => eo, __wbindgen_cast_d6cd19b81560fd6e: () => es, __wbindgen_init_externref_table: () => el };
      for (var c in u) i(l, c, { get: u[c], enumerable: true });
      t.exports = ((e2, t2, r2, n2) => {
        if (t2 && "object" == typeof t2 || "function" == typeof t2) for (let l2 of o(t2)) s.call(e2, l2) || l2 === r2 || i(e2, l2, { get: () => t2[l2], enumerable: !(n2 = a(t2, l2)) || n2.enumerable });
        return e2;
      })(i({}, "__esModule", { value: true }), l);
      var d = () => {
      };
      function h(e2) {
        n = e2;
      }
      d.prototype = d;
      let f = null;
      function p() {
        return (null === f || 0 === f.byteLength) && (f = new Uint8Array(n.memory.buffer)), f;
      }
      let g = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
      g.decode();
      let A = 0;
      function m(e2, t2) {
        var r2;
        return e2 >>>= 0, r2 = e2, (A += t2) >= 2146435072 && ((g = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true })).decode(), A = t2), g.decode(p().subarray(r2, r2 + t2));
      }
      let y = 0, w = new TextEncoder();
      function b(e2, t2, r2) {
        if (void 0 === r2) {
          let r3 = w.encode(e2), n3 = t2(r3.length, 1) >>> 0;
          return p().subarray(n3, n3 + r3.length).set(r3), y = r3.length, n3;
        }
        let n2 = e2.length, i2 = t2(n2, 1) >>> 0, a2 = p(), o2 = 0;
        for (; o2 < n2; o2++) {
          let t3 = e2.charCodeAt(o2);
          if (t3 > 127) break;
          a2[i2 + o2] = t3;
        }
        if (o2 !== n2) {
          0 !== o2 && (e2 = e2.slice(o2)), i2 = r2(i2, n2, n2 = o2 + 3 * e2.length, 1) >>> 0;
          let t3 = p().subarray(i2 + o2, i2 + n2);
          o2 += w.encodeInto(e2, t3).written, i2 = r2(i2, n2, o2, 1) >>> 0;
        }
        return y = o2, i2;
      }
      "encodeInto" in w || (w.encodeInto = function(e2, t2) {
        let r2 = w.encode(e2);
        return t2.set(r2), { read: e2.length, written: r2.length };
      });
      let v = null;
      function E() {
        return (null === v || true === v.buffer.detached || void 0 === v.buffer.detached && v.buffer !== n.memory.buffer) && (v = new DataView(n.memory.buffer)), v;
      }
      function _(e2) {
        let t2 = n.__wbindgen_externrefs.get(e2);
        return n.__externref_table_dealloc(e2), t2;
      }
      let C = typeof FinalizationRegistry > "u" ? { register: () => {
      }, unregister: () => {
      } } : new FinalizationRegistry((e2) => n.__wbg_querycompiler_free(e2 >>> 0, 1));
      class x {
        __destroy_into_raw() {
          let e2 = this.__wbg_ptr;
          return this.__wbg_ptr = 0, C.unregister(this), e2;
        }
        free() {
          let e2 = this.__destroy_into_raw();
          n.__wbg_querycompiler_free(e2, 0);
        }
        compileBatch(e2) {
          let t2 = b(e2, n.__wbindgen_malloc, n.__wbindgen_realloc), r2 = y, i2 = n.querycompiler_compileBatch(this.__wbg_ptr, t2, r2);
          if (i2[2]) throw _(i2[1]);
          return _(i2[0]);
        }
        constructor(e2) {
          const t2 = n.querycompiler_new(e2);
          if (t2[2]) throw _(t2[1]);
          return this.__wbg_ptr = t2[0] >>> 0, C.register(this, this.__wbg_ptr, this), this;
        }
        compile(e2) {
          let t2 = b(e2, n.__wbindgen_malloc, n.__wbindgen_realloc), r2 = y, i2 = n.querycompiler_compile(this.__wbg_ptr, t2, r2);
          if (i2[2]) throw _(i2[1]);
          return _(i2[0]);
        }
      }
      function I(e2, t2) {
        return Error(m(e2, t2));
      }
      function S(e2) {
        return Number(e2);
      }
      function T(e2, t2) {
        let r2 = b(String(t2), n.__wbindgen_malloc, n.__wbindgen_realloc), i2 = y;
        E().setInt32(e2 + 4, i2, true), E().setInt32(e2 + 0, r2, true);
      }
      function O(e2) {
        let t2 = "boolean" == typeof e2 ? e2 : void 0;
        return null == t2 ? 16777215 : +!!t2;
      }
      function P(e2, t2) {
        let r2 = b(function e3(t3) {
          let r3, n2 = typeof t3;
          if ("number" == n2 || "boolean" == n2 || null == t3) return `${t3}`;
          if ("string" == n2) return `"${t3}"`;
          if ("symbol" == n2) {
            let e4 = t3.description;
            return null == e4 ? "Symbol" : `Symbol(${e4})`;
          }
          if ("function" == n2) {
            let e4 = t3.name;
            return "string" == typeof e4 && e4.length > 0 ? `Function(${e4})` : "Function";
          }
          if (Array.isArray(t3)) {
            let r4 = t3.length, n3 = "[";
            r4 > 0 && (n3 += e3(t3[0]));
            for (let i4 = 1; i4 < r4; i4++) n3 += ", " + e3(t3[i4]);
            return n3 + "]";
          }
          let i3 = /\[object ([^\]]+)\]/.exec(toString.call(t3));
          if (!i3 || !(i3.length > 1)) return toString.call(t3);
          if ("Object" == (r3 = i3[1])) try {
            return "Object(" + JSON.stringify(t3) + ")";
          } catch {
            return "Object";
          }
          return t3 instanceof Error ? `${t3.name}: ${t3.message}
${t3.stack}` : r3;
        }(t2), n.__wbindgen_malloc, n.__wbindgen_realloc), i2 = y;
        E().setInt32(e2 + 4, i2, true), E().setInt32(e2 + 0, r2, true);
      }
      function R(e2, t2) {
        return e2 in t2;
      }
      function N(e2) {
        return "object" == typeof e2 && null !== e2;
      }
      function k(e2) {
        return "string" == typeof e2;
      }
      function B(e2) {
        return void 0 === e2;
      }
      function D(e2, t2) {
        return e2 == t2;
      }
      function M(e2, t2) {
        let r2 = "number" == typeof t2 ? t2 : void 0;
        E().setFloat64(e2 + 8, null == r2 ? 0 : r2, true), E().setInt32(e2 + 0, null != r2, true);
      }
      function $(e2, t2) {
        let r2 = "string" == typeof t2 ? t2 : void 0;
        var i2 = null == r2 ? 0 : b(r2, n.__wbindgen_malloc, n.__wbindgen_realloc), a2 = y;
        E().setInt32(e2 + 4, a2, true), E().setInt32(e2 + 0, i2, true);
      }
      function j(e2, t2) {
        throw Error(m(e2, t2));
      }
      function L(e2) {
        return Object.entries(e2);
      }
      function q(e2) {
        return e2.getTime();
      }
      function F(e2, t2) {
        return e2[t2 >>> 0];
      }
      function Q(e2, t2) {
        return e2[t2];
      }
      function U(e2) {
        let t2;
        try {
          t2 = e2 instanceof ArrayBuffer;
        } catch {
          t2 = false;
        }
        return t2;
      }
      function V(e2) {
        let t2;
        try {
          t2 = e2 instanceof Uint8Array;
        } catch {
          t2 = false;
        }
        return t2;
      }
      function H(e2) {
        return Number.isSafeInteger(e2);
      }
      function W(e2) {
        return e2.length;
      }
      function G(e2) {
        return e2.length;
      }
      function X() {
        return /* @__PURE__ */ new Date();
      }
      function J() {
        return {};
      }
      function z(e2) {
        return new Uint8Array(e2);
      }
      function K() {
        return /* @__PURE__ */ new Map();
      }
      function Y() {
        return [];
      }
      function Z(e2, t2, r2) {
        var n2;
        Uint8Array.prototype.set.call((n2 = e2 >>> 0, p().subarray(n2 / 1, n2 / 1 + t2)), r2);
      }
      function ee(e2, t2, r2) {
        e2[t2] = r2;
      }
      function et(e2, t2, r2) {
        return e2.set(t2, r2);
      }
      function er(e2, t2, r2) {
        e2[t2 >>> 0] = r2;
      }
      function en(t2, r2) {
        e.g.PRISMA_WASM_PANIC_REGISTRY.set_message(m(t2, r2));
      }
      function ei(e2, t2) {
        return m(e2, t2);
      }
      function ea(e2) {
        return BigInt.asUintN(64, e2);
      }
      function eo(e2) {
        return e2;
      }
      function es(e2) {
        return e2;
      }
      function el() {
        let e2 = n.__wbindgen_externrefs, t2 = e2.grow(4);
        e2.set(0, void 0), e2.set(t2 + 0, void 0), e2.set(t2 + 1, null), e2.set(t2 + 2, true), e2.set(t2 + 3, false);
      }
      Symbol.dispose && (x.prototype[Symbol.dispose] = x.prototype.free);
    }, 85949, (e, t, r) => {
      Object.defineProperty(r, "__esModule", { value: true });
      let { PrismaClientKnownRequestError: n, PrismaClientUnknownRequestError: i, PrismaClientRustPanicError: a, PrismaClientInitializationError: o, PrismaClientValidationError: s, getPrismaClient: l, sqltag: u, empty: c, join: d, raw: h, skip: f, Decimal: p, Debug: g, DbNull: A, JsonNull: m, AnyNull: y, NullTypes: w, makeStrictEnum: b, Extensions: v, warnOnce: E, defineDmmfProperty: _, Public: C, getRuntime: x, createParam: I } = e.r(27253), S = {};
      r.Prisma = S, r.$Enums = {}, S.prismaVersion = { client: "7.8.0", engine: "3c6e192761c0362d496ed980de936e2f3cebcd3a" }, S.PrismaClientKnownRequestError = n, S.PrismaClientUnknownRequestError = i, S.PrismaClientRustPanicError = a, S.PrismaClientInitializationError = o, S.PrismaClientValidationError = s, S.Decimal = p, S.sql = u, S.empty = c, S.join = d, S.raw = h, S.validator = C.validator, S.getExtensionContext = v.getExtensionContext, S.defineExtension = v.defineExtension, S.DbNull = A, S.JsonNull = m, S.AnyNull = y, S.NullTypes = w, r.Prisma.TransactionIsolationLevel = b({ Serializable: "Serializable" }), r.Prisma.AdminUserScalarFieldEnum = { id: "id", name: "name", email: "email", passwordHash: "passwordHash", role: "role", createdAt: "createdAt", updatedAt: "updatedAt" }, r.Prisma.SiteContentScalarFieldEnum = { key: "key", value: "value", createdAt: "createdAt", updatedAt: "updatedAt" }, r.Prisma.ProjectScalarFieldEnum = { id: "id", title: "title", slug: "slug", category: "category", client: "client", year: "year", servicesJson: "servicesJson", description: "description", fullDescription: "fullDescription", heroImage: "heroImage", galleryJson: "galleryJson", tagsJson: "tagsJson", featured: "featured", published: "published", sortOrder: "sortOrder", createdAt: "createdAt", updatedAt: "updatedAt" }, r.Prisma.JournalPostScalarFieldEnum = { id: "id", title: "title", slug: "slug", category: "category", authorName: "authorName", excerpt: "excerpt", content: "content", coverImage: "coverImage", tagsJson: "tagsJson", seoTitle: "seoTitle", seoDescription: "seoDescription", seoKeywords: "seoKeywords", canonicalUrl: "canonicalUrl", ogImage: "ogImage", published: "published", createdAt: "createdAt", updatedAt: "updatedAt" }, r.Prisma.InquiryScalarFieldEnum = { id: "id", name: "name", email: "email", phone: "phone", service: "service", budget: "budget", message: "message", status: "status", createdAt: "createdAt", updatedAt: "updatedAt" }, r.Prisma.SortOrder = { asc: "asc", desc: "desc" }, r.Prisma.NullsOrder = { first: "first", last: "last" }, r.Prisma.ModelName = { AdminUser: "AdminUser", SiteContent: "SiteContent", Project: "Project", JournalPost: "JournalPost", Inquiry: "Inquiry" };
      let T = { previewFeatures: [], clientVersion: "7.8.0", engineVersion: "3c6e192761c0362d496ed980de936e2f3cebcd3a", activeProvider: "sqlite", inlineSchema: 'generator client {\n  provider = "prisma-client-js"\n}\n\ndatasource db {\n  provider = "sqlite"\n}\n\nmodel AdminUser {\n  id           String   @id @default(cuid())\n  name         String\n  email        String   @unique\n  passwordHash String\n  role         String   @default("ADMIN")\n  createdAt    DateTime @default(now())\n  updatedAt    DateTime @updatedAt\n}\n\nmodel SiteContent {\n  key       String   @id\n  value     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Project {\n  id              String   @id @default(cuid())\n  title           String\n  slug            String   @unique\n  category        String\n  client          String\n  year            String\n  servicesJson    String\n  description     String\n  fullDescription String\n  heroImage       String\n  galleryJson     String\n  tagsJson        String\n  featured        Boolean  @default(false)\n  published       Boolean  @default(false)\n  sortOrder       Int      @default(0)\n  createdAt       DateTime @default(now())\n  updatedAt       DateTime @updatedAt\n}\n\nmodel JournalPost {\n  id             String   @id @default(cuid())\n  title          String\n  slug           String   @unique\n  category       String\n  authorName     String   @default("Studio Editorial")\n  excerpt        String\n  content        String\n  coverImage     String\n  tagsJson       String   @default("[]")\n  seoTitle       String   @default("")\n  seoDescription String   @default("")\n  seoKeywords    String   @default("")\n  canonicalUrl   String   @default("")\n  ogImage        String   @default("")\n  published      Boolean  @default(false)\n  createdAt      DateTime @default(now())\n  updatedAt      DateTime @updatedAt\n}\n\nmodel Inquiry {\n  id        String   @id @default(cuid())\n  name      String\n  email     String\n  phone     String?\n  service   String\n  budget    String?\n  message   String\n  status    String   @default("new")\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n' };
      T.runtimeDataModel = JSON.parse('{"models":{"AdminUser":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"passwordHash","kind":"scalar","type":"String"},{"name":"role","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"SiteContent":{"fields":[{"name":"key","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Project":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"category","kind":"scalar","type":"String"},{"name":"client","kind":"scalar","type":"String"},{"name":"year","kind":"scalar","type":"String"},{"name":"servicesJson","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"fullDescription","kind":"scalar","type":"String"},{"name":"heroImage","kind":"scalar","type":"String"},{"name":"galleryJson","kind":"scalar","type":"String"},{"name":"tagsJson","kind":"scalar","type":"String"},{"name":"featured","kind":"scalar","type":"Boolean"},{"name":"published","kind":"scalar","type":"Boolean"},{"name":"sortOrder","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"JournalPost":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"category","kind":"scalar","type":"String"},{"name":"authorName","kind":"scalar","type":"String"},{"name":"excerpt","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"coverImage","kind":"scalar","type":"String"},{"name":"tagsJson","kind":"scalar","type":"String"},{"name":"seoTitle","kind":"scalar","type":"String"},{"name":"seoDescription","kind":"scalar","type":"String"},{"name":"seoKeywords","kind":"scalar","type":"String"},{"name":"canonicalUrl","kind":"scalar","type":"String"},{"name":"ogImage","kind":"scalar","type":"String"},{"name":"published","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Inquiry":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"service","kind":"scalar","type":"String"},{"name":"budget","kind":"scalar","type":"String"},{"name":"message","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null}},"enums":{},"types":{}}'), _(r.Prisma, T.runtimeDataModel), T.parameterizationSchema = { strings: JSON.parse('["where","AdminUser.findUnique","AdminUser.findUniqueOrThrow","orderBy","cursor","AdminUser.findFirst","AdminUser.findFirstOrThrow","AdminUser.findMany","data","AdminUser.createOne","AdminUser.createMany","AdminUser.createManyAndReturn","AdminUser.updateOne","AdminUser.updateMany","AdminUser.updateManyAndReturn","create","update","AdminUser.upsertOne","AdminUser.deleteOne","AdminUser.deleteMany","having","_count","_min","_max","AdminUser.groupBy","AdminUser.aggregate","SiteContent.findUnique","SiteContent.findUniqueOrThrow","SiteContent.findFirst","SiteContent.findFirstOrThrow","SiteContent.findMany","SiteContent.createOne","SiteContent.createMany","SiteContent.createManyAndReturn","SiteContent.updateOne","SiteContent.updateMany","SiteContent.updateManyAndReturn","SiteContent.upsertOne","SiteContent.deleteOne","SiteContent.deleteMany","SiteContent.groupBy","SiteContent.aggregate","Project.findUnique","Project.findUniqueOrThrow","Project.findFirst","Project.findFirstOrThrow","Project.findMany","Project.createOne","Project.createMany","Project.createManyAndReturn","Project.updateOne","Project.updateMany","Project.updateManyAndReturn","Project.upsertOne","Project.deleteOne","Project.deleteMany","_avg","_sum","Project.groupBy","Project.aggregate","JournalPost.findUnique","JournalPost.findUniqueOrThrow","JournalPost.findFirst","JournalPost.findFirstOrThrow","JournalPost.findMany","JournalPost.createOne","JournalPost.createMany","JournalPost.createManyAndReturn","JournalPost.updateOne","JournalPost.updateMany","JournalPost.updateManyAndReturn","JournalPost.upsertOne","JournalPost.deleteOne","JournalPost.deleteMany","JournalPost.groupBy","JournalPost.aggregate","Inquiry.findUnique","Inquiry.findUniqueOrThrow","Inquiry.findFirst","Inquiry.findFirstOrThrow","Inquiry.findMany","Inquiry.createOne","Inquiry.createMany","Inquiry.createManyAndReturn","Inquiry.updateOne","Inquiry.updateMany","Inquiry.updateManyAndReturn","Inquiry.upsertOne","Inquiry.deleteOne","Inquiry.deleteMany","Inquiry.groupBy","Inquiry.aggregate","AND","OR","NOT","id","name","email","phone","service","budget","message","status","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","title","slug","category","authorName","excerpt","content","coverImage","tagsJson","seoTitle","seoDescription","seoKeywords","canonicalUrl","ogImage","published","client","year","servicesJson","description","fullDescription","heroImage","galleryJson","featured","sortOrder","key","value","passwordHash","role","set","increment","decrement","multiply","divide"]'), graph: "tAErUApcAACdAQAwXQAABAAQXgAAnQEAMF8BAAAAAWABAIsBACFhAQAAAAFnQACNAQAhaEAAjQEAIY0BAQCLAQAhjgEBAIsBACEBAAAAAQAgAQAAAAEAIApcAACdAQAwXQAABAAQXgAAnQEAMF8BAIsBACFgAQCLAQAhYQEAiwEAIWdAAI0BACFoQACNAQAhjQEBAIsBACGOAQEAiwEAIQADAAAABAAgAwAABQAwBAAAAQAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACAHXwEAAAABYAEAAAABYQEAAAABZ0AAAAABaEAAAAABjQEBAAAAAY4BAQAAAAEBCAAACQAgB18BAAAAAWABAAAAAWEBAAAAAWdAAAAAAWhAAAAAAY0BAQAAAAGOAQEAAAABAQgAAAsAMAEIAAALADAHXwEAogEAIWABAKIBACFhAQCiAQAhZ0AApAEAIWhAAKQBACGNAQEAogEAIY4BAQCiAQAhAgAAAAEAIAgAAA4AIAdfAQCiAQAhYAEAogEAIWEBAKIBACFnQACkAQAhaEAApAEAIY0BAQCiAQAhjgEBAKIBACECAAAABAAgCAAAEAAgAgAAAAQAIAgAABAAIAMAAAABACAPAAAJACAQAAAOACABAAAAAQAgAQAAAAQAIAMVAACyAQAgFgAAtAEAIBcAALMBACAKXAAAnAEAMF0AABcAEF4AAJwBADBfAQB_ACFgAQB_ACFhAQB_ACFnQACBAQAhaEAAgQEAIY0BAQB_ACGOAQEAfwAhAwAAAAQAIAMAABYAMBQAABcAIAMAAAAEACADAAAFADAEAAABACAHXAAAmwEAMF0AAB0AEF4AAJsBADBnQACNAQAhaEAAjQEAIYsBAQAAAAGMAQEAiwEAIQEAAAAaACABAAAAGgAgB1wAAJsBADBdAAAdABBeAACbAQAwZ0AAjQEAIWhAAI0BACGLAQEAiwEAIYwBAQCLAQAhAAMAAAAdACADAAAeADAEAAAaACADAAAAHQAgAwAAHgAwBAAAGgAgAwAAAB0AIAMAAB4AMAQAABoAIARnQAAAAAFoQAAAAAGLAQEAAAABjAEBAAAAAQEIAAAiACAEZ0AAAAABaEAAAAABiwEBAAAAAYwBAQAAAAEBCAAAJAAwAQgAACQAMARnQACkAQAhaEAApAEAIYsBAQCiAQAhjAEBAKIBACECAAAAGgAgCAAAJwAgBGdAAKQBACFoQACkAQAhiwEBAKIBACGMAQEAogEAIQIAAAAdACAIAAApACACAAAAHQAgCAAAKQAgAwAAABoAIA8AACIAIBAAACcAIAEAAAAaACABAAAAHQAgAxUAAK8BACAWAACxAQAgFwAAsAEAIAdcAACaAQAwXQAAMAAQXgAAmgEAMGdAAIEBACFoQACBAQAhiwEBAH8AIYwBAQB_ACEDAAAAHQAgAwAALwAwFAAAMAAgAwAAAB0AIAMAAB4AMAQAABoAIBRcAACYAQAwXQAANgAQXgAAmAEAMF8BAAAAAWdAAI0BACFoQACNAQAhdAEAiwEAIXUBAAAAAXYBAIsBACF7AQCLAQAhgQEgAJMBACGCAQEAiwEAIYMBAQCLAQAhhAEBAIsBACGFAQEAiwEAIYYBAQCLAQAhhwEBAIsBACGIAQEAiwEAIYkBIACTAQAhigECAJkBACEBAAAAMwAgAQAAADMAIBRcAACYAQAwXQAANgAQXgAAmAEAMF8BAIsBACFnQACNAQAhaEAAjQEAIXQBAIsBACF1AQCLAQAhdgEAiwEAIXsBAIsBACGBASAAkwEAIYIBAQCLAQAhgwEBAIsBACGEAQEAiwEAIYUBAQCLAQAhhgEBAIsBACGHAQEAiwEAIYgBAQCLAQAhiQEgAJMBACGKAQIAmQEAIQADAAAANgAgAwAANwAwBAAAMwAgAwAAADYAIAMAADcAMAQAADMAIAMAAAA2ACADAAA3ADAEAAAzACARXwEAAAABZ0AAAAABaEAAAAABdAEAAAABdQEAAAABdgEAAAABewEAAAABgQEgAAAAAYIBAQAAAAGDAQEAAAABhAEBAAAAAYUBAQAAAAGGAQEAAAABhwEBAAAAAYgBAQAAAAGJASAAAAABigECAAAAAQEIAAA7ACARXwEAAAABZ0AAAAABaEAAAAABdAEAAAABdQEAAAABdgEAAAABewEAAAABgQEgAAAAAYIBAQAAAAGDAQEAAAABhAEBAAAAAYUBAQAAAAGGAQEAAAABhwEBAAAAAYgBAQAAAAGJASAAAAABigECAAAAAQEIAAA9ADABCAAAPQAwEV8BAKIBACFnQACkAQAhaEAApAEAIXQBAKIBACF1AQCiAQAhdgEAogEAIXsBAKIBACGBASAAqAEAIYIBAQCiAQAhgwEBAKIBACGEAQEAogEAIYUBAQCiAQAhhgEBAKIBACGHAQEAogEAIYgBAQCiAQAhiQEgAKgBACGKAQIArgEAIQIAAAAzACAIAABAACARXwEAogEAIWdAAKQBACFoQACkAQAhdAEAogEAIXUBAKIBACF2AQCiAQAhewEAogEAIYEBIACoAQAhggEBAKIBACGDAQEAogEAIYQBAQCiAQAhhQEBAKIBACGGAQEAogEAIYcBAQCiAQAhiAEBAKIBACGJASAAqAEAIYoBAgCuAQAhAgAAADYAIAgAAEIAIAIAAAA2ACAIAABCACADAAAAMwAgDwAAOwAgEAAAQAAgAQAAADMAIAEAAAA2ACAFFQAAqQEAIBYAAKwBACAXAACrAQAgOAAAqgEAIDkAAK0BACAUXAAAlAEAMF0AAEkAEF4AAJQBADBfAQB_ACFnQACBAQAhaEAAgQEAIXQBAH8AIXUBAH8AIXYBAH8AIXsBAH8AIYEBIACPAQAhggEBAH8AIYMBAQB_ACGEAQEAfwAhhQEBAH8AIYYBAQB_ACGHAQEAfwAhiAEBAH8AIYkBIACPAQAhigECAJUBACEDAAAANgAgAwAASAAwFAAASQAgAwAAADYAIAMAADcAMAQAADMAIBRcAACSAQAwXQAATwAQXgAAkgEAMF8BAAAAAWdAAI0BACFoQACNAQAhdAEAiwEAIXUBAAAAAXYBAIsBACF3AQCLAQAheAEAiwEAIXkBAIsBACF6AQCLAQAhewEAiwEAIXwBAIsBACF9AQCLAQAhfgEAiwEAIX8BAIsBACGAAQEAiwEAIYEBIACTAQAhAQAAAEwAIAEAAABMACAUXAAAkgEAMF0AAE8AEF4AAJIBADBfAQCLAQAhZ0AAjQEAIWhAAI0BACF0AQCLAQAhdQEAiwEAIXYBAIsBACF3AQCLAQAheAEAiwEAIXkBAIsBACF6AQCLAQAhewEAiwEAIXwBAIsBACF9AQCLAQAhfgEAiwEAIX8BAIsBACGAAQEAiwEAIYEBIACTAQAhAAMAAABPACADAABQADAEAABMACADAAAATwAgAwAAUAAwBAAATAAgAwAAAE8AIAMAAFAAMAQAAEwAIBFfAQAAAAFnQAAAAAFoQAAAAAF0AQAAAAF1AQAAAAF2AQAAAAF3AQAAAAF4AQAAAAF5AQAAAAF6AQAAAAF7AQAAAAF8AQAAAAF9AQAAAAF-AQAAAAF_AQAAAAGAAQEAAAABgQEgAAAAAQEIAABUACARXwEAAAABZ0AAAAABaEAAAAABdAEAAAABdQEAAAABdgEAAAABdwEAAAABeAEAAAABeQEAAAABegEAAAABewEAAAABfAEAAAABfQEAAAABfgEAAAABfwEAAAABgAEBAAAAAYEBIAAAAAEBCAAAVgAwAQgAAFYAMBFfAQCiAQAhZ0AApAEAIWhAAKQBACF0AQCiAQAhdQEAogEAIXYBAKIBACF3AQCiAQAheAEAogEAIXkBAKIBACF6AQCiAQAhewEAogEAIXwBAKIBACF9AQCiAQAhfgEAogEAIX8BAKIBACGAAQEAogEAIYEBIACoAQAhAgAAAEwAIAgAAFkAIBFfAQCiAQAhZ0AApAEAIWhAAKQBACF0AQCiAQAhdQEAogEAIXYBAKIBACF3AQCiAQAheAEAogEAIXkBAKIBACF6AQCiAQAhewEAogEAIXwBAKIBACF9AQCiAQAhfgEAogEAIX8BAKIBACGAAQEAogEAIYEBIACoAQAhAgAAAE8AIAgAAFsAIAIAAABPACAIAABbACADAAAATAAgDwAAVAAgEAAAWQAgAQAAAEwAIAEAAABPACADFQAApQEAIBYAAKcBACAXAACmAQAgFFwAAI4BADBdAABiABBeAACOAQAwXwEAfwAhZ0AAgQEAIWhAAIEBACF0AQB_ACF1AQB_ACF2AQB_ACF3AQB_ACF4AQB_ACF5AQB_ACF6AQB_ACF7AQB_ACF8AQB_ACF9AQB_ACF-AQB_ACF_AQB_ACGAAQEAfwAhgQEgAI8BACEDAAAATwAgAwAAYQAwFAAAYgAgAwAAAE8AIAMAAFAAMAQAAEwAIA1cAACKAQAwXQAAaAAQXgAAigEAMF8BAAAAAWABAIsBACFhAQCLAQAhYgEAjAEAIWMBAIsBACFkAQCMAQAhZQEAiwEAIWYBAIsBACFnQACNAQAhaEAAjQEAIQEAAABlACABAAAAZQAgDVwAAIoBADBdAABoABBeAACKAQAwXwEAiwEAIWABAIsBACFhAQCLAQAhYgEAjAEAIWMBAIsBACFkAQCMAQAhZQEAiwEAIWYBAIsBACFnQACNAQAhaEAAjQEAIQJiAACeAQAgZAAAngEAIAMAAABoACADAABpADAEAABlACADAAAAaAAgAwAAaQAwBAAAZQAgAwAAAGgAIAMAAGkAMAQAAGUAIApfAQAAAAFgAQAAAAFhAQAAAAFiAQAAAAFjAQAAAAFkAQAAAAFlAQAAAAFmAQAAAAFnQAAAAAFoQAAAAAEBCAAAbQAgCl8BAAAAAWABAAAAAWEBAAAAAWIBAAAAAWMBAAAAAWQBAAAAAWUBAAAAAWYBAAAAAWdAAAAAAWhAAAAAAQEIAABvADABCAAAbwAwCl8BAKIBACFgAQCiAQAhYQEAogEAIWIBAKMBACFjAQCiAQAhZAEAowEAIWUBAKIBACFmAQCiAQAhZ0AApAEAIWhAAKQBACECAAAAZQAgCAAAcgAgCl8BAKIBACFgAQCiAQAhYQEAogEAIWIBAKMBACFjAQCiAQAhZAEAowEAIWUBAKIBACFmAQCiAQAhZ0AApAEAIWhAAKQBACECAAAAaAAgCAAAdAAgAgAAAGgAIAgAAHQAIAMAAABlACAPAABtACAQAAByACABAAAAZQAgAQAAAGgAIAUVAACfAQAgFgAAoQEAIBcAAKABACBiAACeAQAgZAAAngEAIA1cAAB-ADBdAAB7ABBeAAB-ADBfAQB_ACFgAQB_ACFhAQB_ACFiAQCAAQAhYwEAfwAhZAEAgAEAIWUBAH8AIWYBAH8AIWdAAIEBACFoQACBAQAhAwAAAGgAIAMAAHoAMBQAAHsAIAMAAABoACADAABpADAEAABlACANXAAAfgAwXQAAewAQXgAAfgAwXwEAfwAhYAEAfwAhYQEAfwAhYgEAgAEAIWMBAH8AIWQBAIABACFlAQB_ACFmAQB_ACFnQACBAQAhaEAAgQEAIQ4VAACDAQAgFgAAiQEAIBcAAIkBACBpAQAAAAFqAQAAAARrAQAAAARsAQAAAAFtAQAAAAFuAQAAAAFvAQAAAAFwAQCIAQAhcQEAAAABcgEAAAABcwEAAAABDhUAAIYBACAWAACHAQAgFwAAhwEAIGkBAAAAAWoBAAAABWsBAAAABWwBAAAAAW0BAAAAAW4BAAAAAW8BAAAAAXABAIUBACFxAQAAAAFyAQAAAAFzAQAAAAELFQAAgwEAIBYAAIQBACAXAACEAQAgaUAAAAABakAAAAAEa0AAAAAEbEAAAAABbUAAAAABbkAAAAABb0AAAAABcEAAggEAIQsVAACDAQAgFgAAhAEAIBcAAIQBACBpQAAAAAFqQAAAAARrQAAAAARsQAAAAAFtQAAAAAFuQAAAAAFvQAAAAAFwQACCAQAhCGkCAAAAAWoCAAAABGsCAAAABGwCAAAAAW0CAAAAAW4CAAAAAW8CAAAAAXACAIMBACEIaUAAAAABakAAAAAEa0AAAAAEbEAAAAABbUAAAAABbkAAAAABb0AAAAABcEAAhAEAIQ4VAACGAQAgFgAAhwEAIBcAAIcBACBpAQAAAAFqAQAAAAVrAQAAAAVsAQAAAAFtAQAAAAFuAQAAAAFvAQAAAAFwAQCFAQAhcQEAAAABcgEAAAABcwEAAAABCGkCAAAAAWoCAAAABWsCAAAABWwCAAAAAW0CAAAAAW4CAAAAAW8CAAAAAXACAIYBACELaQEAAAABagEAAAAFawEAAAAFbAEAAAABbQEAAAABbgEAAAABbwEAAAABcAEAhwEAIXEBAAAAAXIBAAAAAXMBAAAAAQ4VAACDAQAgFgAAiQEAIBcAAIkBACBpAQAAAAFqAQAAAARrAQAAAARsAQAAAAFtAQAAAAFuAQAAAAFvAQAAAAFwAQCIAQAhcQEAAAABcgEAAAABcwEAAAABC2kBAAAAAWoBAAAABGsBAAAABGwBAAAAAW0BAAAAAW4BAAAAAW8BAAAAAXABAIkBACFxAQAAAAFyAQAAAAFzAQAAAAENXAAAigEAMF0AAGgAEF4AAIoBADBfAQCLAQAhYAEAiwEAIWEBAIsBACFiAQCMAQAhYwEAiwEAIWQBAIwBACFlAQCLAQAhZgEAiwEAIWdAAI0BACFoQACNAQAhC2kBAAAAAWoBAAAABGsBAAAABGwBAAAAAW0BAAAAAW4BAAAAAW8BAAAAAXABAIkBACFxAQAAAAFyAQAAAAFzAQAAAAELaQEAAAABagEAAAAFawEAAAAFbAEAAAABbQEAAAABbgEAAAABbwEAAAABcAEAhwEAIXEBAAAAAXIBAAAAAXMBAAAAAQhpQAAAAAFqQAAAAARrQAAAAARsQAAAAAFtQAAAAAFuQAAAAAFvQAAAAAFwQACEAQAhFFwAAI4BADBdAABiABBeAACOAQAwXwEAfwAhZ0AAgQEAIWhAAIEBACF0AQB_ACF1AQB_ACF2AQB_ACF3AQB_ACF4AQB_ACF5AQB_ACF6AQB_ACF7AQB_ACF8AQB_ACF9AQB_ACF-AQB_ACF_AQB_ACGAAQEAfwAhgQEgAI8BACEFFQAAgwEAIBYAAJEBACAXAACRAQAgaSAAAAABcCAAkAEAIQUVAACDAQAgFgAAkQEAIBcAAJEBACBpIAAAAAFwIACQAQAhAmkgAAAAAXAgAJEBACEUXAAAkgEAMF0AAE8AEF4AAJIBADBfAQCLAQAhZ0AAjQEAIWhAAI0BACF0AQCLAQAhdQEAiwEAIXYBAIsBACF3AQCLAQAheAEAiwEAIXkBAIsBACF6AQCLAQAhewEAiwEAIXwBAIsBACF9AQCLAQAhfgEAiwEAIX8BAIsBACGAAQEAiwEAIYEBIACTAQAhAmkgAAAAAXAgAJEBACEUXAAAlAEAMF0AAEkAEF4AAJQBADBfAQB_ACFnQACBAQAhaEAAgQEAIXQBAH8AIXUBAH8AIXYBAH8AIXsBAH8AIYEBIACPAQAhggEBAH8AIYMBAQB_ACGEAQEAfwAhhQEBAH8AIYYBAQB_ACGHAQEAfwAhiAEBAH8AIYkBIACPAQAhigECAJUBACENFQAAgwEAIBYAAIMBACAXAACDAQAgOAAAlwEAIDkAAIMBACBpAgAAAAFqAgAAAARrAgAAAARsAgAAAAFtAgAAAAFuAgAAAAFvAgAAAAFwAgCWAQAhDRUAAIMBACAWAACDAQAgFwAAgwEAIDgAAJcBACA5AACDAQAgaQIAAAABagIAAAAEawIAAAAEbAIAAAABbQIAAAABbgIAAAABbwIAAAABcAIAlgEAIQhpCAAAAAFqCAAAAARrCAAAAARsCAAAAAFtCAAAAAFuCAAAAAFvCAAAAAFwCACXAQAhFFwAAJgBADBdAAA2ABBeAACYAQAwXwEAiwEAIWdAAI0BACFoQACNAQAhdAEAiwEAIXUBAIsBACF2AQCLAQAhewEAiwEAIYEBIACTAQAhggEBAIsBACGDAQEAiwEAIYQBAQCLAQAhhQEBAIsBACGGAQEAiwEAIYcBAQCLAQAhiAEBAIsBACGJASAAkwEAIYoBAgCZAQAhCGkCAAAAAWoCAAAABGsCAAAABGwCAAAAAW0CAAAAAW4CAAAAAW8CAAAAAXACAIMBACEHXAAAmgEAMF0AADAAEF4AAJoBADBnQACBAQAhaEAAgQEAIYsBAQB_ACGMAQEAfwAhB1wAAJsBADBdAAAdABBeAACbAQAwZ0AAjQEAIWhAAI0BACGLAQEAiwEAIYwBAQCLAQAhClwAAJwBADBdAAAXABBeAACcAQAwXwEAfwAhYAEAfwAhYQEAfwAhZ0AAgQEAIWhAAIEBACGNAQEAfwAhjgEBAH8AIQpcAACdAQAwXQAABAAQXgAAnQEAMF8BAIsBACFgAQCLAQAhYQEAiwEAIWdAAI0BACFoQACNAQAhjQEBAIsBACGOAQEAiwEAIQAAAAABjwEBAAAAAQGPAQEAAAABAY8BQAAAAAEAAAABjwEgAAAAAQAAAAAABY8BAgAAAAGQAQIAAAABkQECAAAAAZIBAgAAAAGTAQIAAAABAAAAAAAAAAAAAAMVAAYWAAcXAAgAAAADFQAGFgAHFwAIAAAAAxUADhYADxcAEAAAAAMVAA4WAA8XABAAAAAFFQAWFgAZFwAaOAAXOQAYAAAAAAAFFQAWFgAZFwAaOAAXOQAYAAAAAxUAIBYAIRcAIgAAAAMVACAWACEXACIAAAADFQAoFgApFwAqAAAAAxUAKBYAKRcAKgECAQIDAQUGAQYHAQcIAQkKAQoMAgsNAwwPAQ0RAg4SBBETARIUARMVAhgYBRkZCRobChscChwfCh0gCh4hCh8jCiAlAiEmCyIoCiMqAiQrDCUsCiYtCicuAigxDSkyESo0Eis1Eiw4Ei05Ei46Ei88EjA-AjE_EzJBEjNDAjREFDVFEjZGEjdHAjpKFTtLGzxNHD1OHD5RHD9SHEBTHEFVHEJXAkNYHURaHEVcAkZdHkdeHEhfHElgAkpjH0tkI0xmJE1nJE5qJE9rJFBsJFFuJFJwAlNxJVRzJFV1AlZ2Jld3JFh4JFl5Alp8J1t9Kw" }, T.compilerWasm = { getRuntime: async () => e.r(34179), getQueryCompilerWasmModule: async () => {
        let t2 = (await Promise.resolve().then(() => e.i(6124))).default;
        return (await t2).default;
      }, importName: "./query_compiler_fast_bg.js" }, ("u" > typeof globalThis && globalThis.DEBUG || "u" > typeof process && process.env && process.env.DEBUG) && g.enable("u" > typeof globalThis && globalThis.DEBUG || "u" > typeof process && process.env && process.env.DEBUG || void 0), r.PrismaClient = l(T), Object.assign(r, S);
    }, 7565, (e, t, r) => {
      t.exports = { ...e.r(85949) };
    }, 3466, (e, t, r) => {
      t.exports = { ...e.r(7565) };
    }, 82035, (e, t, r) => {
      "use strict";
      r.getBooleanOption = (e2, t2) => {
        let r2 = false;
        if (t2 in e2 && "boolean" != typeof (r2 = e2[t2])) throw TypeError(`Expected the "${t2}" option to be a boolean`);
        return r2;
      }, r.cppdb = Symbol(), r.inspect = Symbol.for("nodejs.util.inspect.custom");
    }, 77011, (e, t, r) => {
      "use strict";
      let { cppdb: n } = e.r(82035);
      r.prepare = function(e2) {
        return this[n].prepare(e2, this, false);
      }, r.exec = function(e2) {
        return this[n].exec(e2), this;
      }, r.close = function() {
        return this[n].close(), this;
      }, r.loadExtension = function(...e2) {
        return this[n].loadExtension(...e2), this;
      }, r.defaultSafeIntegers = function(...e2) {
        return this[n].defaultSafeIntegers(...e2), this;
      }, r.unsafeMode = function(...e2) {
        return this[n].unsafeMode(...e2), this;
      }, r.getters = { name: { get: function() {
        return this[n].name;
      }, enumerable: true }, open: { get: function() {
        return this[n].open;
      }, enumerable: true }, inTransaction: { get: function() {
        return this[n].inTransaction;
      }, enumerable: true }, readonly: { get: function() {
        return this[n].readonly;
      }, enumerable: true }, memory: { get: function() {
        return this[n].memory;
      }, enumerable: true } };
    }, 19862, (e, t, r) => {
      "use strict";
      let { cppdb: n } = e.r(82035), i = /* @__PURE__ */ new WeakMap();
      t.exports = function(e2) {
        if ("function" != typeof e2) throw TypeError("Expected first argument to be a function");
        let t2 = this[n], r2 = a(t2, this), { apply: i2 } = Function.prototype, s = { default: { value: o(i2, e2, t2, r2.default) }, deferred: { value: o(i2, e2, t2, r2.deferred) }, immediate: { value: o(i2, e2, t2, r2.immediate) }, exclusive: { value: o(i2, e2, t2, r2.exclusive) }, database: { value: this, enumerable: true } };
        return Object.defineProperties(s.default.value, s), Object.defineProperties(s.deferred.value, s), Object.defineProperties(s.immediate.value, s), Object.defineProperties(s.exclusive.value, s), s.default.value;
      };
      let a = (e2, t2) => {
        let r2 = i.get(e2);
        if (!r2) {
          let n2 = { commit: e2.prepare("COMMIT", t2, false), rollback: e2.prepare("ROLLBACK", t2, false), savepoint: e2.prepare("SAVEPOINT `	_bs3.	`", t2, false), release: e2.prepare("RELEASE `	_bs3.	`", t2, false), rollbackTo: e2.prepare("ROLLBACK TO `	_bs3.	`", t2, false) };
          i.set(e2, r2 = { default: Object.assign({ begin: e2.prepare("BEGIN", t2, false) }, n2), deferred: Object.assign({ begin: e2.prepare("BEGIN DEFERRED", t2, false) }, n2), immediate: Object.assign({ begin: e2.prepare("BEGIN IMMEDIATE", t2, false) }, n2), exclusive: Object.assign({ begin: e2.prepare("BEGIN EXCLUSIVE", t2, false) }, n2) });
        }
        return r2;
      }, o = (e2, t2, r2, { begin: n2, commit: i2, rollback: a2, savepoint: o2, release: s, rollbackTo: l }) => function() {
        let u, c, d;
        r2.inTransaction ? (u = o2, c = s, d = l) : (u = n2, c = i2, d = a2), u.run();
        try {
          let r3 = e2.call(t2, this, arguments);
          if (r3 && "function" == typeof r3.then) throw TypeError("Transaction function cannot return a promise");
          return c.run(), r3;
        } catch (e3) {
          throw r2.inTransaction && (d.run(), d !== a2 && c.run()), e3;
        }
      };
    }, 25523, (e, t, r) => {
      "use strict";
      let { getBooleanOption: n, cppdb: i } = e.r(82035);
      t.exports = function(e2, t2) {
        if (null == t2 && (t2 = {}), "string" != typeof e2) throw TypeError("Expected first argument to be a string");
        if ("object" != typeof t2) throw TypeError("Expected second argument to be an options object");
        let r2 = n(t2, "simple"), a = this[i].prepare(`PRAGMA ${e2}`, this, true);
        return r2 ? a.pluck().get() : a.all();
      };
    }, 29838, (e, t, r) => {
      e.n(__import_unsupported("fs"));
    }, 14216, (e, t, r) => {
      e.n(__import_unsupported("path"));
    }, 12057, (e, t, r) => {
      t.exports = e.x("node:util", () => (init_node_util(), __toCommonJS(node_util_exports)));
    }, 77931, (e, t, r) => {
      "use strict";
      let n = e.r(29838), i = e.r(14216), { promisify: a } = e.r(12057), { cppdb: o } = e.r(82035), s = a(n.access);
      t.exports = async function(e2, t2) {
        if (null == t2 && (t2 = {}), "string" != typeof e2) throw TypeError("Expected first argument to be a string");
        if ("object" != typeof t2) throw TypeError("Expected second argument to be an options object");
        e2 = e2.trim();
        let r2 = "attached" in t2 ? t2.attached : "main", n2 = "progress" in t2 ? t2.progress : null;
        if (!e2) throw TypeError("Backup filename cannot be an empty string");
        if (":memory:" === e2) throw TypeError('Invalid backup filename ":memory:"');
        if ("string" != typeof r2) throw TypeError('Expected the "attached" option to be a string');
        if (!r2) throw TypeError('The "attached" option cannot be an empty string');
        if (null != n2 && "function" != typeof n2) throw TypeError('Expected the "progress" option to be a function');
        await s(i.dirname(e2)).catch(() => {
          throw TypeError("Cannot save backup because the directory does not exist");
        });
        let a2 = await s(e2).then(() => false, () => true);
        return l(this[o].backup(this, r2, e2, a2), n2 || null);
      };
      let l = (e2, t2) => {
        let r2 = 0, n2 = true;
        return new Promise((i2, a2) => {
          setImmediate(function o2() {
            try {
              let a3 = e2.transfer(r2);
              if (!a3.remainingPages) {
                e2.close(), i2(a3);
                return;
              }
              if (n2 && (n2 = false, r2 = 100), t2) {
                let e3 = t2(a3);
                if (void 0 !== e3) if ("number" == typeof e3 && e3 == e3) r2 = Math.max(0, Math.min(2147483647, Math.round(e3)));
                else throw TypeError("Expected progress callback to return a number or undefined");
              }
              setImmediate(o2);
            } catch (t3) {
              e2.close(), a2(t3);
            }
          });
        });
      };
    }, 41498, (e, t, r) => {
      "use strict";
      let { cppdb: n } = e.r(82035);
      t.exports = function(e2) {
        if (null == e2 && (e2 = {}), "object" != typeof e2) throw TypeError("Expected first argument to be an options object");
        let t2 = "attached" in e2 ? e2.attached : "main";
        if ("string" != typeof t2) throw TypeError('Expected the "attached" option to be a string');
        if (!t2) throw TypeError('The "attached" option cannot be an empty string');
        return this[n].serialize(t2);
      };
    }, 53472, (e, t, r) => {
      "use strict";
      let { getBooleanOption: n, cppdb: i } = e.r(82035);
      t.exports = function(e2, t2, r2) {
        if (null == t2 && (t2 = {}), "function" == typeof t2 && (r2 = t2, t2 = {}), "string" != typeof e2) throw TypeError("Expected first argument to be a string");
        if ("function" != typeof r2) throw TypeError("Expected last argument to be a function");
        if ("object" != typeof t2) throw TypeError("Expected second argument to be an options object");
        if (!e2) throw TypeError("User-defined function name cannot be an empty string");
        let a = "safeIntegers" in t2 ? +n(t2, "safeIntegers") : 2, o = n(t2, "deterministic"), s = n(t2, "directOnly"), l = n(t2, "varargs"), u = -1;
        if (!l) {
          if (!Number.isInteger(u = r2.length) || u < 0) throw TypeError("Expected function.length to be a positive integer");
          if (u > 100) throw RangeError("User-defined functions cannot have more than 100 arguments");
        }
        return this[i].function(r2, e2, u, a, o, s), this;
      };
    }, 88217, (e, t, r) => {
      "use strict";
      let { getBooleanOption: n, cppdb: i } = e.r(82035);
      t.exports = function(e2, t2) {
        if ("string" != typeof e2) throw TypeError("Expected first argument to be a string");
        if ("object" != typeof t2 || null === t2) throw TypeError("Expected second argument to be an options object");
        if (!e2) throw TypeError("User-defined function name cannot be an empty string");
        let r2 = "start" in t2 ? t2.start : null, s = a(t2, "step", true), l = a(t2, "inverse", false), u = a(t2, "result", false), c = "safeIntegers" in t2 ? +n(t2, "safeIntegers") : 2, d = n(t2, "deterministic"), h = n(t2, "directOnly"), f = n(t2, "varargs"), p = -1;
        if (!f && ((p = Math.max(o(s), l ? o(l) : 0)) > 0 && (p -= 1), p > 100)) throw RangeError("User-defined functions cannot have more than 100 arguments");
        return this[i].aggregate(r2, s, l, u, e2, p, c, d, h), this;
      };
      let a = (e2, t2, r2) => {
        let n2 = t2 in e2 ? e2[t2] : null;
        if ("function" == typeof n2) return n2;
        if (null != n2) throw TypeError(`Expected the "${t2}" option to be a function`);
        if (r2) throw TypeError(`Missing required option "${t2}"`);
        return null;
      }, o = ({ length: e2 }) => {
        if (Number.isInteger(e2) && e2 >= 0) return e2;
        throw TypeError("Expected function.length to be a positive integer");
      };
    }, 59459, (e, t, r) => {
      "use strict";
      var n = e.i(51615);
      let { cppdb: i } = e.r(82035);
      function a(e2, t2, r2) {
        var i2, a2, s2;
        let c2;
        if (!o.call(e2, "rows")) throw TypeError(`Virtual table module "${r2}" ${t2} a table definition without a "rows" property`);
        if (!o.call(e2, "columns")) throw TypeError(`Virtual table module "${r2}" ${t2} a table definition without a "columns" property`);
        let d = e2.rows;
        if ("function" != typeof d || Object.getPrototypeOf(d) !== l) throw TypeError(`Virtual table module "${r2}" ${t2} a table definition with an invalid "rows" property (should be a generator function)`);
        let h = e2.columns;
        if (!Array.isArray(h) || !(h = [...h]).every((e3) => "string" == typeof e3)) throw TypeError(`Virtual table module "${r2}" ${t2} a table definition with an invalid "columns" property (should be an array of strings)`);
        if (h.length !== new Set(h).size) throw TypeError(`Virtual table module "${r2}" ${t2} a table definition with duplicate column names`);
        if (!h.length) throw RangeError(`Virtual table module "${r2}" ${t2} a table definition with zero columns`);
        if (o.call(e2, "parameters")) {
          if (!Array.isArray(c2 = e2.parameters) || !(c2 = [...c2]).every((e3) => "string" == typeof e3)) throw TypeError(`Virtual table module "${r2}" ${t2} a table definition with an invalid "parameters" property (should be an array of strings)`);
        } else c2 = function({ length: e3 }) {
          if (!Number.isInteger(e3) || e3 < 0) throw TypeError("Expected function.length to be a positive integer");
          let t3 = [];
          for (let r3 = 0; r3 < e3; ++r3) t3.push(`$${r3 + 1}`);
          return t3;
        }(d);
        if (c2.length !== new Set(c2).size) throw TypeError(`Virtual table module "${r2}" ${t2} a table definition with duplicate parameter names`);
        if (c2.length > 32) throw RangeError(`Virtual table module "${r2}" ${t2} a table definition with more than the maximum number of 32 parameters`);
        for (let e3 of c2) if (h.includes(e3)) throw TypeError(`Virtual table module "${r2}" ${t2} a table definition with column "${e3}" which was ambiguously defined as both a column and parameter`);
        let f = 2;
        if (o.call(e2, "safeIntegers")) {
          let n2 = e2.safeIntegers;
          if ("boolean" != typeof n2) throw TypeError(`Virtual table module "${r2}" ${t2} a table definition with an invalid "safeIntegers" property (should be a boolean)`);
          f = +n2;
        }
        let p = false;
        if (o.call(e2, "directOnly") && "boolean" != typeof (p = e2.directOnly)) throw TypeError(`Virtual table module "${r2}" ${t2} a table definition with an invalid "directOnly" property (should be a boolean)`);
        let g = [...c2.map(u).map((e3) => `${e3} HIDDEN`), ...h.map(u)];
        return [`CREATE TABLE x(${g.join(", ")});`, (i2 = d, a2 = new Map(h.map((e3, t3) => [e3, c2.length + t3])), s2 = r2, function* (...e3) {
          let t3 = e3.map((e4) => n.Buffer.isBuffer(e4) ? n.Buffer.from(e4) : e4);
          for (let e4 = 0; e4 < a2.size; ++e4) t3.push(null);
          for (let r3 of i2(...e3)) if (Array.isArray(r3)) (function(e4, t4, r4, n2) {
            if (e4.length !== r4) throw TypeError(`Virtual table module "${n2}" yielded a row with an incorrect number of columns`);
            let i3 = t4.length - r4;
            for (let n3 = 0; n3 < r4; ++n3) t4[n3 + i3] = e4[n3];
          })(r3, t3, a2.size, s2), yield t3;
          else if ("object" == typeof r3 && null !== r3) (function(e4, t4, r4, n2) {
            let i3 = 0;
            for (let a3 of Object.keys(e4)) {
              let o2 = r4.get(a3);
              if (void 0 === o2) throw TypeError(`Virtual table module "${n2}" yielded a row with an undeclared column "${a3}"`);
              t4[o2] = e4[a3], i3 += 1;
            }
            if (i3 !== r4.size) throw TypeError(`Virtual table module "${n2}" yielded a row with missing columns`);
          })(r3, t3, a2, s2), yield t3;
          else throw TypeError(`Virtual table module "${s2}" yielded something that isn't a valid row object`);
        }), c2, f, p];
      }
      t.exports = function(e2, t2) {
        if ("string" != typeof e2) throw TypeError("Expected first argument to be a string");
        if (!e2) throw TypeError("Virtual table module name cannot be an empty string");
        let r2 = false;
        if ("object" == typeof t2 && null !== t2) r2 = true, t2 = c(a(t2, "used", e2));
        else {
          var n2;
          if ("function" != typeof t2) throw TypeError("Expected second argument to be a function or a table definition object");
          n2 = t2, t2 = function(e3, t3, r3, ...i2) {
            let o2 = s.call(n2, { module: e3, database: t3, table: r3 }, i2);
            if ("object" != typeof o2 || null === o2) throw TypeError(`Virtual table module "${e3}" did not return a table definition object`);
            return a(o2, "returned", e3);
          };
        }
        return this[i].table(t2, e2, r2), this;
      };
      let { hasOwnProperty: o } = Object.prototype, { apply: s } = Function.prototype, l = Object.getPrototypeOf(function* () {
      }), u = (e2) => `"${e2.replace(/"/g, '""')}"`, c = (e2) => () => e2;
    }, 63112, (e, t, r) => {
      "use strict";
      let n = function() {
      };
      t.exports = function(e2, t2) {
        return Object.assign(new n(), this);
      };
    }, 60501, (e, t, r) => {
      "use strict";
      let n = { value: "SqliteError", writable: true, enumerable: false, configurable: true };
      function i(e2, t2) {
        if (new.target !== i) return new i(e2, t2);
        if ("string" != typeof t2) throw TypeError("Expected second argument to be a string");
        Error.call(this, e2), n.value = "" + e2, Object.defineProperty(this, "message", n), Error.captureStackTrace(this, i), this.code = t2;
      }
      Object.setPrototypeOf(i, Error), Object.setPrototypeOf(i.prototype, Error.prototype), Object.defineProperty(i.prototype, "name", n), t.exports = i;
    }, 91580, (e, t, r) => {
      var n = e.r(14216).sep || "/";
      t.exports = function(e2) {
        if ("string" != typeof e2 || e2.length <= 7 || "file://" != e2.substring(0, 7)) throw TypeError("must pass in a file:// URI to convert to a file path");
        var t2 = decodeURI(e2.substring(7)), r2 = t2.indexOf("/"), i = t2.substring(0, r2), a = t2.substring(r2 + 1);
        return "localhost" == i && (i = ""), i && (i = n + n + i), a = a.replace(/^(.+)\|/, "$1:"), "\\" == n && (a = a.replace(/\//g, "\\")), /^.+\:/.test(a) || (a = n + a), i + a;
      };
    }, 75492, (e, t, r) => {
      var n = e.r(29838), i = e.r(14216), a = e.r(91580), o = i.join, s = i.dirname, l = n.accessSync && function(e2) {
        try {
          n.accessSync(e2);
        } catch (e3) {
          return false;
        }
        return true;
      } || n.existsSync || i.existsSync, u = { arrow: process.env.NODE_BINDINGS_ARROW || " \u2192 ", compiled: process.env.NODE_BINDINGS_COMPILED_DIR || "compiled", platform: process.platform, arch: process.arch, nodePreGyp: "node-v" + process.versions.modules + "-" + process.platform + "-" + process.arch, version: process.versions.node, bindings: "bindings.node", try: [["module_root", "build", "bindings"], ["module_root", "build", "Debug", "bindings"], ["module_root", "build", "Release", "bindings"], ["module_root", "out", "Debug", "bindings"], ["module_root", "Debug", "bindings"], ["module_root", "out", "Release", "bindings"], ["module_root", "Release", "bindings"], ["module_root", "build", "default", "bindings"], ["module_root", "compiled", "version", "platform", "arch", "bindings"], ["module_root", "addon-build", "release", "install-root", "bindings"], ["module_root", "addon-build", "debug", "install-root", "bindings"], ["module_root", "addon-build", "default", "install-root", "bindings"], ["module_root", "lib", "binding", "nodePreGyp", "bindings"]] };
      t.exports = r = function(t2) {
        "string" == typeof t2 ? t2 = { bindings: t2 } : t2 || (t2 = {}), Object.keys(u).map(function(e2) {
          e2 in t2 || (t2[e2] = u[e2]);
        }), t2.module_root || (t2.module_root = r.getRoot(r.getFileName())), ".node" != i.extname(t2.bindings) && (t2.bindings += ".node");
        for (var n2, a2, s2, l2 = "function" == typeof __webpack_require__ ? __non_webpack_require__ : e.t, c = [], d = 0, h = t2.try.length; d < h; d++) {
          n2 = o.apply(null, t2.try[d].map(function(e2) {
            return t2[e2] || e2;
          })), c.push(n2);
          try {
            return a2 = t2.path ? l2.resolve(n2) : l2(n2), t2.path || (a2.path = n2), a2;
          } catch (e2) {
            if ("MODULE_NOT_FOUND" !== e2.code && "QUALIFIED_PATH_RESOLUTION_FAILED" !== e2.code && !/not find/i.test(e2.message)) throw e2;
          }
        }
        throw (s2 = Error("Could not locate the bindings file. Tried:\n" + c.map(function(e2) {
          return t2.arrow + e2;
        }).join("\n"))).tries = c, s2;
      }, r.getFileName = function(e2) {
        var t2, r2 = Error.prepareStackTrace, n2 = Error.stackTraceLimit, i2 = {};
        return Error.stackTraceLimit = 10, Error.prepareStackTrace = function(r3, n3) {
          for (var i3 = 0, a2 = n3.length; i3 < a2; i3++) if ("/ROOT/node_modules/bindings/bindings.js" !== (t2 = n3[i3].getFileName())) {
            if (!e2) return;
            else if (t2 !== e2) return;
          }
        }, Error.captureStackTrace(i2), i2.stack, Error.prepareStackTrace = r2, Error.stackTraceLimit = n2, 0 === t2.indexOf("file://") && (t2 = a(t2)), t2;
      }, r.getRoot = function(e2) {
        for (var t2, r2 = s(e2); ; ) {
          if ("." === r2 && (r2 = process.cwd()), l(o(r2, "package.json")) || l(o(r2, "node_modules"))) return r2;
          if (t2 === r2) throw Error('Could not find module root given file: "' + e2 + '". Do you have a `package.json` file? ');
          t2 = r2, r2 = o(r2, "..");
        }
      };
    }, 18126, (e, t, r) => {
      "use strict";
      let n;
      var i = e.i(51615);
      let a = e.r(29838), o = e.r(14216), s = e.r(82035), l = e.r(60501);
      function u(t2, r2) {
        let d, h;
        if (new.target == null) return new u(t2, r2);
        if (i.Buffer.isBuffer(t2) && (d = t2, t2 = ":memory:"), null == t2 && (t2 = ""), null == r2 && (r2 = {}), "string" != typeof t2) throw TypeError("Expected first argument to be a string");
        if ("object" != typeof r2) throw TypeError("Expected second argument to be an options object");
        if ("readOnly" in r2) throw TypeError('Misspelled option "readOnly" should be "readonly"');
        if ("memory" in r2) throw TypeError('Option "memory" was removed in v7.0.0 (use ":memory:" filename instead)');
        let f = t2.trim(), p = "" === f || ":memory:" === f, g = s.getBooleanOption(r2, "readonly"), A = s.getBooleanOption(r2, "fileMustExist"), m = "timeout" in r2 ? r2.timeout : 5e3, y = "verbose" in r2 ? r2.verbose : null, w = "nativeBinding" in r2 ? r2.nativeBinding : null;
        if (g && p && !d) throw TypeError("In-memory/temporary databases cannot be readonly");
        if (!Number.isInteger(m) || m < 0) throw TypeError('Expected the "timeout" option to be a positive integer');
        if (m > 2147483647) throw RangeError('Option "timeout" cannot be greater than 2147483647');
        if (null != y && "function" != typeof y) throw TypeError('Expected the "verbose" option to be a function');
        if (null != w && "string" != typeof w && "object" != typeof w) throw TypeError('Expected the "nativeBinding" option to be a string or addon object');
        if ((h = null == w ? n || (n = e.r(75492)("better_sqlite3.node")) : "string" == typeof w ? ("function" == typeof __non_webpack_require__ ? __non_webpack_require__ : e.t)(o.resolve(w).replace(/(\.node)?$/, ".node")) : w).isInitialized || (h.setErrorConstructor(l), h.isInitialized = true), !p && !f.startsWith("file:") && !a.existsSync(o.dirname(f))) throw TypeError("Cannot open database because the directory does not exist");
        Object.defineProperties(this, { [s.cppdb]: { value: new h.Database(f, t2, p, g, A, m, y || null, d || null) }, ...c.getters });
      }
      let c = e.r(77011);
      u.prototype.prepare = c.prepare, u.prototype.transaction = e.r(19862), u.prototype.pragma = e.r(25523), u.prototype.backup = e.r(77931), u.prototype.serialize = e.r(41498), u.prototype.function = e.r(53472), u.prototype.aggregate = e.r(88217), u.prototype.table = e.r(59459), u.prototype.loadExtension = c.loadExtension, u.prototype.exec = c.exec, u.prototype.close = c.close, u.prototype.defaultSafeIntegers = c.defaultSafeIntegers, u.prototype.unsafeMode = c.unsafeMode, u.prototype[s.inspect] = e.r(63112), t.exports = u;
    }, 84560, (e, t, r) => {
      "use strict";
      t.exports = e.r(18126), t.exports.SqliteError = e.r(60501);
    }, 42738, (e) => {
      "use strict";
      let t, r, n;
      async function i() {
        return "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
      }
      e.i(74398);
      let a = null;
      async function o() {
        if ("phase-production-build" === process.env.NEXT_PHASE) return;
        a || (a = i());
        let e10 = await a;
        if (null == e10 ? void 0 : e10.register) try {
          await e10.register();
        } catch (e11) {
          throw e11.message = `An error occurred while loading instrumentation hook: ${e11.message}`, e11;
        }
      }
      async function s(...e10) {
        let t10 = await i();
        try {
          var r10;
          await (null == t10 || null == (r10 = t10.onRequestError) ? void 0 : r10.call(t10, ...e10));
        } catch (e11) {
          console.error("Error in instrumentation.onRequestError:", e11);
        }
      }
      let l = null;
      function u() {
        return l || (l = o()), l;
      }
      function c(e10) {
        return `The edge runtime does not support Node.js '${e10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== e.g.process && (process.env = e.g.process.env, e.g.process = process);
      try {
        Object.defineProperty(globalThis, "__import_unsupported", { value: function(e10) {
          let t10 = new Proxy(function() {
          }, { get(t11, r10) {
            if ("then" === r10) return {};
            throw Object.defineProperty(Error(c(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, construct() {
            throw Object.defineProperty(Error(c(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, apply(r10, n10, i2) {
            if ("function" == typeof i2[0]) return i2[0](t10);
            throw Object.defineProperty(Error(c(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          } });
          return new Proxy({}, { get: () => t10 });
        }, enumerable: false, configurable: false });
      } catch {
      }
      u();
      class d extends Error {
        constructor({ page: e10 }) {
          super(`The middleware "${e10}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class h extends Error {
        constructor() {
          super("The request.page has been deprecated in favour of `URLPattern`.\n  Read more: https://nextjs.org/docs/messages/middleware-request-page\n  ");
        }
      }
      class f extends Error {
        constructor() {
          super("The request.ua has been removed in favour of `userAgent` function.\n  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent\n  ");
        }
      }
      let p = "x-prerender-revalidate", g = ".meta", A = "x-next-cache-tags", m = "x-next-revalidated-tags", y = "_N_T_", w = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", apiNode: "api-node", apiEdge: "api-edge", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", pagesDirBrowser: "pages-dir-browser", pagesDirEdge: "pages-dir-edge", pagesDirNode: "pages-dir-node" };
      function b(e10) {
        var t10, r10, n10, i2, a2, o2 = [], s2 = 0;
        function l2() {
          for (; s2 < e10.length && /\s/.test(e10.charAt(s2)); ) s2 += 1;
          return s2 < e10.length;
        }
        for (; s2 < e10.length; ) {
          for (t10 = s2, a2 = false; l2(); ) if ("," === (r10 = e10.charAt(s2))) {
            for (n10 = s2, s2 += 1, l2(), i2 = s2; s2 < e10.length && "=" !== (r10 = e10.charAt(s2)) && ";" !== r10 && "," !== r10; ) s2 += 1;
            s2 < e10.length && "=" === e10.charAt(s2) ? (a2 = true, s2 = i2, o2.push(e10.substring(t10, n10)), t10 = s2) : s2 = n10 + 1;
          } else s2 += 1;
          (!a2 || s2 >= e10.length) && o2.push(e10.substring(t10, e10.length));
        }
        return o2;
      }
      function v(e10) {
        let t10 = {}, r10 = [];
        if (e10) for (let [n10, i2] of e10.entries()) "set-cookie" === n10.toLowerCase() ? (r10.push(...b(i2)), t10[n10] = 1 === r10.length ? r10[0] : r10) : t10[n10] = i2;
        return t10;
      }
      function E(e10) {
        try {
          return String(new URL(String(e10)));
        } catch (t10) {
          throw Object.defineProperty(Error(`URL is malformed "${String(e10)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t10 }), "__NEXT_ERROR_CODE", { value: "E61", enumerable: false, configurable: true });
        }
      }
      ({ ...w, GROUP: { builtinReact: [w.reactServerComponents, w.actionBrowser], serverOnly: [w.reactServerComponents, w.actionBrowser, w.instrument, w.middleware], neutralTarget: [w.apiNode, w.apiEdge], clientOnly: [w.serverSideRendering, w.appPagesBrowser], bundled: [w.reactServerComponents, w.actionBrowser, w.serverSideRendering, w.appPagesBrowser, w.shared, w.instrument, w.middleware], appPages: [w.reactServerComponents, w.serverSideRendering, w.appPagesBrowser, w.actionBrowser] } });
      let _ = Symbol("response"), C = Symbol("passThrough"), x = Symbol("waitUntil");
      class I {
        constructor(e10, t10) {
          this[C] = false, this[x] = t10 ? { kind: "external", function: t10 } : { kind: "internal", promises: [] };
        }
        respondWith(e10) {
          this[_] || (this[_] = Promise.resolve(e10));
        }
        passThroughOnException() {
          this[C] = true;
        }
        waitUntil(e10) {
          if ("external" === this[x].kind) return (0, this[x].function)(e10);
          this[x].promises.push(e10);
        }
      }
      class S extends I {
        constructor(e10) {
          var t10;
          super(e10.request, null == (t10 = e10.context) ? void 0 : t10.waitUntil), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new d({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new d({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      function T(e10) {
        return e10.replace(/\/$/, "") || "/";
      }
      function O(e10) {
        let t10 = e10.indexOf("#"), r10 = e10.indexOf("?"), n10 = r10 > -1 && (t10 < 0 || r10 < t10);
        return n10 || t10 > -1 ? { pathname: e10.substring(0, n10 ? r10 : t10), query: n10 ? e10.substring(r10, t10 > -1 ? t10 : void 0) : "", hash: t10 > -1 ? e10.slice(t10) : "" } : { pathname: e10, query: "", hash: "" };
      }
      function P(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: n10, hash: i2 } = O(e10);
        return `${t10}${r10}${n10}${i2}`;
      }
      function R(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: n10, hash: i2 } = O(e10);
        return `${r10}${t10}${n10}${i2}`;
      }
      function N(e10, t10) {
        if ("string" != typeof e10) return false;
        let { pathname: r10 } = O(e10);
        return r10 === t10 || r10.startsWith(t10 + "/");
      }
      let k = /* @__PURE__ */ new WeakMap();
      function B(e10, t10) {
        let r10;
        if (!t10) return { pathname: e10 };
        let n10 = k.get(t10);
        n10 || (n10 = t10.map((e11) => e11.toLowerCase()), k.set(t10, n10));
        let i2 = e10.split("/", 2);
        if (!i2[1]) return { pathname: e10 };
        let a2 = i2[1].toLowerCase(), o2 = n10.indexOf(a2);
        return o2 < 0 ? { pathname: e10 } : (r10 = t10[o2], { pathname: e10 = e10.slice(r10.length + 1) || "/", detectedLocale: r10 });
      }
      let D = /^(?:127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)$/;
      function M(e10, t10) {
        let r10 = new URL(String(e10), t10 && String(t10));
        return D.test(r10.hostname) && (r10.hostname = "localhost"), r10;
      }
      let $ = Symbol("NextURLInternal");
      class j {
        constructor(e10, t10, r10) {
          let n10, i2;
          "object" == typeof t10 && "pathname" in t10 || "string" == typeof t10 ? (n10 = t10, i2 = r10 || {}) : i2 = r10 || t10 || {}, this[$] = { url: M(e10, n10 ?? i2.base), options: i2, basePath: "" }, this.analyze();
        }
        analyze() {
          var e10, t10, r10, n10, i2;
          let a2 = function(e11, t11) {
            let { basePath: r11, i18n: n11, trailingSlash: i3 } = t11.nextConfig ?? {}, a3 = { pathname: e11, trailingSlash: "/" !== e11 ? e11.endsWith("/") : i3 };
            r11 && N(a3.pathname, r11) && (a3.pathname = function(e12, t12) {
              if (!N(e12, t12)) return e12;
              let r12 = e12.slice(t12.length);
              return r12.startsWith("/") ? r12 : `/${r12}`;
            }(a3.pathname, r11), a3.basePath = r11);
            let o3 = a3.pathname;
            if (a3.pathname.startsWith("/_next/data/") && a3.pathname.endsWith(".json")) {
              let e12 = a3.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
              a3.buildId = e12[0], o3 = "index" !== e12[1] ? `/${e12.slice(1).join("/")}` : "/", true === t11.parseData && (a3.pathname = o3);
            }
            if (n11) {
              let e12 = t11.i18nProvider ? t11.i18nProvider.analyze(a3.pathname) : B(a3.pathname, n11.locales);
              a3.locale = e12.detectedLocale, a3.pathname = e12.pathname ?? a3.pathname, !e12.detectedLocale && a3.buildId && (e12 = t11.i18nProvider ? t11.i18nProvider.analyze(o3) : B(o3, n11.locales)).detectedLocale && (a3.locale = e12.detectedLocale);
            }
            return a3;
          }(this[$].url.pathname, { nextConfig: this[$].options.nextConfig, parseData: true, i18nProvider: this[$].options.i18nProvider }), o2 = function(e11, t11) {
            let r11;
            if (t11?.host && !Array.isArray(t11.host)) r11 = t11.host.toString().split(":", 1)[0];
            else {
              if (!e11.hostname) return;
              r11 = e11.hostname;
            }
            return r11.toLowerCase();
          }(this[$].url, this[$].options.headers);
          this[$].domainLocale = this[$].options.i18nProvider ? this[$].options.i18nProvider.detectDomainLocale(o2) : function(e11, t11, r11) {
            if (e11) {
              for (let n11 of (r11 && (r11 = r11.toLowerCase()), e11)) if (t11 === n11.domain?.split(":", 1)[0].toLowerCase() || r11 === n11.defaultLocale.toLowerCase() || n11.locales?.some((e12) => e12.toLowerCase() === r11)) return n11;
            }
          }(null == (t10 = this[$].options.nextConfig) || null == (e10 = t10.i18n) ? void 0 : e10.domains, o2);
          let s2 = (null == (r10 = this[$].domainLocale) ? void 0 : r10.defaultLocale) || (null == (i2 = this[$].options.nextConfig) || null == (n10 = i2.i18n) ? void 0 : n10.defaultLocale);
          this[$].url.pathname = a2.pathname, this[$].defaultLocale = s2, this[$].basePath = a2.basePath ?? "", this[$].buildId = a2.buildId, this[$].locale = a2.locale ?? s2, this[$].trailingSlash = a2.trailingSlash;
        }
        formatPathname() {
          var e10;
          let t10;
          return t10 = function(e11, t11, r10, n10) {
            if (!t11 || t11 === r10) return e11;
            let i2 = e11.toLowerCase();
            return !n10 && (N(i2, "/api") || N(i2, `/${t11.toLowerCase()}`)) ? e11 : P(e11, `/${t11}`);
          }((e10 = { basePath: this[$].basePath, buildId: this[$].buildId, defaultLocale: this[$].options.forceLocale ? void 0 : this[$].defaultLocale, locale: this[$].locale, pathname: this[$].url.pathname, trailingSlash: this[$].trailingSlash }).pathname, e10.locale, e10.buildId ? void 0 : e10.defaultLocale, e10.ignorePrefix), (e10.buildId || !e10.trailingSlash) && (t10 = T(t10)), e10.buildId && (t10 = R(P(t10, `/_next/data/${e10.buildId}`), "/" === e10.pathname ? "index.json" : ".json")), t10 = P(t10, e10.basePath), !e10.buildId && e10.trailingSlash ? t10.endsWith("/") ? t10 : R(t10, "/") : T(t10);
        }
        formatSearch() {
          return this[$].url.search;
        }
        get buildId() {
          return this[$].buildId;
        }
        set buildId(e10) {
          this[$].buildId = e10;
        }
        get locale() {
          return this[$].locale ?? "";
        }
        set locale(e10) {
          var t10, r10;
          if (!this[$].locale || !(null == (r10 = this[$].options.nextConfig) || null == (t10 = r10.i18n) ? void 0 : t10.locales.includes(e10))) throw Object.defineProperty(TypeError(`The NextURL configuration includes no locale "${e10}"`), "__NEXT_ERROR_CODE", { value: "E597", enumerable: false, configurable: true });
          this[$].locale = e10;
        }
        get defaultLocale() {
          return this[$].defaultLocale;
        }
        get domainLocale() {
          return this[$].domainLocale;
        }
        get searchParams() {
          return this[$].url.searchParams;
        }
        get host() {
          return this[$].url.host;
        }
        set host(e10) {
          this[$].url.host = e10;
        }
        get hostname() {
          return this[$].url.hostname;
        }
        set hostname(e10) {
          this[$].url.hostname = e10;
        }
        get port() {
          return this[$].url.port;
        }
        set port(e10) {
          this[$].url.port = e10;
        }
        get protocol() {
          return this[$].url.protocol;
        }
        set protocol(e10) {
          this[$].url.protocol = e10;
        }
        get href() {
          let e10 = this.formatPathname(), t10 = this.formatSearch();
          return `${this.protocol}//${this.host}${e10}${t10}${this.hash}`;
        }
        set href(e10) {
          this[$].url = M(e10), this.analyze();
        }
        get origin() {
          return this[$].url.origin;
        }
        get pathname() {
          return this[$].url.pathname;
        }
        set pathname(e10) {
          this[$].url.pathname = e10;
        }
        get hash() {
          return this[$].url.hash;
        }
        set hash(e10) {
          this[$].url.hash = e10;
        }
        get search() {
          return this[$].url.search;
        }
        set search(e10) {
          this[$].url.search = e10;
        }
        get password() {
          return this[$].url.password;
        }
        set password(e10) {
          this[$].url.password = e10;
        }
        get username() {
          return this[$].url.username;
        }
        set username(e10) {
          this[$].url.username = e10;
        }
        get basePath() {
          return this[$].basePath;
        }
        set basePath(e10) {
          this[$].basePath = e10.startsWith("/") ? e10 : `/${e10}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new j(String(this), this[$].options);
        }
      }
      var L, q, F, Q, U, V, H, W, G, X, J, z, K, Y, Z, ee, et, er, en, ei, ea, eo, es, el = e.i(28042);
      let eu = Symbol("internal request");
      class ec extends Request {
        constructor(e10, t10 = {}) {
          const r10 = "string" != typeof e10 && "url" in e10 ? e10.url : String(e10);
          E(r10), e10 instanceof Request ? super(e10, t10) : super(r10, t10);
          const n10 = new j(r10, { headers: v(this.headers), nextConfig: t10.nextConfig });
          this[eu] = { cookies: new el.RequestCookies(this.headers), nextUrl: n10, url: n10.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[eu].cookies;
        }
        get nextUrl() {
          return this[eu].nextUrl;
        }
        get page() {
          throw new h();
        }
        get ua() {
          throw new f();
        }
        get url() {
          return this[eu].url;
        }
      }
      class ed {
        static get(e10, t10, r10) {
          let n10 = Reflect.get(e10, t10, r10);
          return "function" == typeof n10 ? n10.bind(e10) : n10;
        }
        static set(e10, t10, r10, n10) {
          return Reflect.set(e10, t10, r10, n10);
        }
        static has(e10, t10) {
          return Reflect.has(e10, t10);
        }
        static deleteProperty(e10, t10) {
          return Reflect.deleteProperty(e10, t10);
        }
      }
      let eh = Symbol("internal response"), ef = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function ep(e10, t10) {
        var r10;
        if (null == e10 || null == (r10 = e10.request) ? void 0 : r10.headers) {
          if (!(e10.request.headers instanceof Headers)) throw Object.defineProperty(Error("request.headers must be an instance of Headers"), "__NEXT_ERROR_CODE", { value: "E119", enumerable: false, configurable: true });
          let r11 = [];
          for (let [n10, i2] of e10.request.headers) t10.set("x-middleware-request-" + n10, i2), r11.push(n10);
          t10.set("x-middleware-override-headers", r11.join(","));
        }
      }
      class eg extends Response {
        constructor(e10, t10 = {}) {
          super(e10, t10);
          const r10 = this.headers, n10 = new Proxy(new el.ResponseCookies(r10), { get(e11, n11, i2) {
            switch (n11) {
              case "delete":
              case "set":
                return (...i3) => {
                  let a2 = Reflect.apply(e11[n11], e11, i3), o2 = new Headers(r10);
                  return a2 instanceof el.ResponseCookies && r10.set("x-middleware-set-cookie", a2.getAll().map((e12) => (0, el.stringifyCookie)(e12)).join(",")), ep(t10, o2), a2;
                };
              default:
                return ed.get(e11, n11, i2);
            }
          } });
          this[eh] = { cookies: n10, url: t10.url ? new j(t10.url, { headers: v(r10), nextConfig: t10.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[eh].cookies;
        }
        static json(e10, t10) {
          let r10 = Response.json(e10, t10);
          return new eg(r10.body, r10);
        }
        static redirect(e10, t10) {
          let r10 = "number" == typeof t10 ? t10 : (null == t10 ? void 0 : t10.status) ?? 307;
          if (!ef.has(r10)) throw Object.defineProperty(RangeError('Failed to execute "redirect" on "response": Invalid status code'), "__NEXT_ERROR_CODE", { value: "E529", enumerable: false, configurable: true });
          let n10 = "object" == typeof t10 ? t10 : {}, i2 = new Headers(null == n10 ? void 0 : n10.headers);
          return i2.set("Location", E(e10)), new eg(null, { ...n10, headers: i2, status: r10 });
        }
        static rewrite(e10, t10) {
          let r10 = new Headers(null == t10 ? void 0 : t10.headers);
          return r10.set("x-middleware-rewrite", E(e10)), ep(t10, r10), new eg(null, { ...t10, headers: r10 });
        }
        static next(e10) {
          let t10 = new Headers(null == e10 ? void 0 : e10.headers);
          return t10.set("x-middleware-next", "1"), ep(e10, t10), new eg(null, { ...e10, headers: t10 });
        }
      }
      function eA(e10, t10) {
        let r10 = "string" == typeof t10 ? new URL(t10) : t10, n10 = new URL(e10, t10), i2 = n10.origin === r10.origin;
        return { url: i2 ? n10.toString().slice(r10.origin.length) : n10.toString(), isRelative: i2 };
      }
      let em = "next-router-prefetch", ey = ["rsc", "next-router-state-tree", em, "next-hmr-refresh", "next-router-segment-prefetch"], ew = "_rsc";
      function eb(e10) {
        return e10.startsWith("/") ? e10 : `/${e10}`;
      }
      function ev(e10) {
        return eb(e10.split("/").reduce((e11, t10, r10, n10) => t10 ? "(" === t10[0] && t10.endsWith(")") || "@" === t10[0] || ("page" === t10 || "route" === t10) && r10 === n10.length - 1 ? e11 : `${e11}/${t10}` : e11, ""));
      }
      class eE extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new eE();
        }
      }
      class e_ extends Headers {
        constructor(e10) {
          super(), this.headers = new Proxy(e10, { get(t10, r10, n10) {
            if ("symbol" == typeof r10) return ed.get(t10, r10, n10);
            let i2 = r10.toLowerCase(), a2 = Object.keys(e10).find((e11) => e11.toLowerCase() === i2);
            if (void 0 !== a2) return ed.get(t10, a2, n10);
          }, set(t10, r10, n10, i2) {
            if ("symbol" == typeof r10) return ed.set(t10, r10, n10, i2);
            let a2 = r10.toLowerCase(), o2 = Object.keys(e10).find((e11) => e11.toLowerCase() === a2);
            return ed.set(t10, o2 ?? r10, n10, i2);
          }, has(t10, r10) {
            if ("symbol" == typeof r10) return ed.has(t10, r10);
            let n10 = r10.toLowerCase(), i2 = Object.keys(e10).find((e11) => e11.toLowerCase() === n10);
            return void 0 !== i2 && ed.has(t10, i2);
          }, deleteProperty(t10, r10) {
            if ("symbol" == typeof r10) return ed.deleteProperty(t10, r10);
            let n10 = r10.toLowerCase(), i2 = Object.keys(e10).find((e11) => e11.toLowerCase() === n10);
            return void 0 === i2 || ed.deleteProperty(t10, i2);
          } });
        }
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r10) {
            switch (t10) {
              case "append":
              case "delete":
              case "set":
                return eE.callable;
              default:
                return ed.get(e11, t10, r10);
            }
          } });
        }
        merge(e10) {
          return Array.isArray(e10) ? e10.join(", ") : e10;
        }
        static from(e10) {
          return e10 instanceof Headers ? e10 : new e_(e10);
        }
        append(e10, t10) {
          let r10 = this.headers[e10];
          "string" == typeof r10 ? this.headers[e10] = [r10, t10] : Array.isArray(r10) ? r10.push(t10) : this.headers[e10] = t10;
        }
        delete(e10) {
          delete this.headers[e10];
        }
        get(e10) {
          let t10 = this.headers[e10];
          return void 0 !== t10 ? this.merge(t10) : null;
        }
        has(e10) {
          return void 0 !== this.headers[e10];
        }
        set(e10, t10) {
          this.headers[e10] = t10;
        }
        forEach(e10, t10) {
          for (let [r10, n10] of this.entries()) e10.call(t10, n10, r10, this);
        }
        *entries() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase(), r10 = this.get(t10);
            yield [t10, r10];
          }
        }
        *keys() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase();
            yield t10;
          }
        }
        *values() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = this.get(e10);
            yield t10;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
      e.i(7754);
      var eC = e.i(46478), eC = eC;
      class ex extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
        }
        static callable() {
          throw new ex();
        }
      }
      class eI {
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r10) {
            switch (t10) {
              case "clear":
              case "delete":
              case "set":
                return ex.callable;
              default:
                return ed.get(e11, t10, r10);
            }
          } });
        }
      }
      let eS = Symbol.for("next.mutated.cookies");
      class eT {
        static wrap(e10, t10) {
          let r10 = new el.ResponseCookies(new Headers());
          for (let t11 of e10.getAll()) r10.set(t11);
          let n10 = [], i2 = /* @__PURE__ */ new Set(), a2 = () => {
            let e11 = eC.workAsyncStorageInstance.getStore();
            if (e11 && (e11.pathWasRevalidated = 1), n10 = r10.getAll().filter((e12) => i2.has(e12.name)), t10) {
              let e12 = [];
              for (let t11 of n10) {
                let r11 = new el.ResponseCookies(new Headers());
                r11.set(t11), e12.push(r11.toString());
              }
              t10(e12);
            }
          }, o2 = new Proxy(r10, { get(e11, t11, r11) {
            switch (t11) {
              case eS:
                return n10;
              case "delete":
                return function(...t12) {
                  i2.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.delete(...t12), o2;
                  } finally {
                    a2();
                  }
                };
              case "set":
                return function(...t12) {
                  i2.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.set(...t12), o2;
                  } finally {
                    a2();
                  }
                };
              default:
                return ed.get(e11, t11, r11);
            }
          } });
          return o2;
        }
      }
      function eO(e10, t10) {
        if ("action" !== e10.phase) throw new ex();
      }
      var eP = ((L = eP || {}).handleRequest = "BaseServer.handleRequest", L.run = "BaseServer.run", L.pipe = "BaseServer.pipe", L.getStaticHTML = "BaseServer.getStaticHTML", L.render = "BaseServer.render", L.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", L.renderToResponse = "BaseServer.renderToResponse", L.renderToHTML = "BaseServer.renderToHTML", L.renderError = "BaseServer.renderError", L.renderErrorToResponse = "BaseServer.renderErrorToResponse", L.renderErrorToHTML = "BaseServer.renderErrorToHTML", L.render404 = "BaseServer.render404", L), eR = ((q = eR || {}).loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", q.loadComponents = "LoadComponents.loadComponents", q), eN = ((F = eN || {}).getRequestHandler = "NextServer.getRequestHandler", F.getRequestHandlerWithMetadata = "NextServer.getRequestHandlerWithMetadata", F.getServer = "NextServer.getServer", F.getServerRequestHandler = "NextServer.getServerRequestHandler", F.createServer = "createServer.createServer", F), ek = ((Q = ek || {}).compression = "NextNodeServer.compression", Q.getBuildId = "NextNodeServer.getBuildId", Q.createComponentTree = "NextNodeServer.createComponentTree", Q.clientComponentLoading = "NextNodeServer.clientComponentLoading", Q.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", Q.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", Q.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", Q.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", Q.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", Q.sendRenderResult = "NextNodeServer.sendRenderResult", Q.proxyRequest = "NextNodeServer.proxyRequest", Q.runApi = "NextNodeServer.runApi", Q.render = "NextNodeServer.render", Q.renderHTML = "NextNodeServer.renderHTML", Q.imageOptimizer = "NextNodeServer.imageOptimizer", Q.getPagePath = "NextNodeServer.getPagePath", Q.getRoutesManifest = "NextNodeServer.getRoutesManifest", Q.findPageComponents = "NextNodeServer.findPageComponents", Q.getFontManifest = "NextNodeServer.getFontManifest", Q.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", Q.getRequestHandler = "NextNodeServer.getRequestHandler", Q.renderToHTML = "NextNodeServer.renderToHTML", Q.renderError = "NextNodeServer.renderError", Q.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", Q.render404 = "NextNodeServer.render404", Q.startResponse = "NextNodeServer.startResponse", Q.route = "route", Q.onProxyReq = "onProxyReq", Q.apiResolver = "apiResolver", Q.internalFetch = "internalFetch", Q), eB = ((U = eB || {}).startServer = "startServer.startServer", U), eD = ((V = eD || {}).getServerSideProps = "Render.getServerSideProps", V.getStaticProps = "Render.getStaticProps", V.renderToString = "Render.renderToString", V.renderDocument = "Render.renderDocument", V.createBodyResult = "Render.createBodyResult", V), eM = ((H = eM || {}).renderToString = "AppRender.renderToString", H.renderToReadableStream = "AppRender.renderToReadableStream", H.getBodyResult = "AppRender.getBodyResult", H.fetch = "AppRender.fetch", H), e$ = ((W = e$ || {}).executeRoute = "Router.executeRoute", W), ej = ((G = ej || {}).runHandler = "Node.runHandler", G), eL = ((X = eL || {}).runHandler = "AppRouteRouteHandlers.runHandler", X), eq = ((J = eq || {}).generateMetadata = "ResolveMetadata.generateMetadata", J.generateViewport = "ResolveMetadata.generateViewport", J), eF = ((z = eF || {}).execute = "Middleware.execute", z);
      let eQ = /* @__PURE__ */ new Set(["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"]), eU = /* @__PURE__ */ new Set(["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"]);
      function eV(e10) {
        return null !== e10 && "object" == typeof e10 && "then" in e10 && "function" == typeof e10.then;
      }
      let eH = process.env.NEXT_OTEL_PERFORMANCE_PREFIX, { context: eW, propagation: eG, trace: eX, SpanStatusCode: eJ, SpanKind: ez, ROOT_CONTEXT: eK } = t = e.r(59110);
      class eY extends Error {
        constructor(e10, t10) {
          super(), this.bubble = e10, this.result = t10;
        }
      }
      let eZ = (e10, t10) => {
        "object" == typeof t10 && null !== t10 && t10 instanceof eY && t10.bubble ? e10.setAttribute("next.bubble", true) : (t10 && (e10.recordException(t10), e10.setAttribute("error.type", t10.name)), e10.setStatus({ code: eJ.ERROR, message: null == t10 ? void 0 : t10.message })), e10.end();
      }, e0 = /* @__PURE__ */ new Map(), e1 = t.createContextKey("next.rootSpanId"), e2 = 0, e4 = { set(e10, t10, r10) {
        e10.push({ key: t10, value: r10 });
      } }, e3 = (n = new class e {
        getTracerInstance() {
          return eX.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return eW;
        }
        getTracePropagationData() {
          let e10 = eW.active(), t10 = [];
          return eG.inject(e10, t10, e4), t10;
        }
        getActiveScopeSpan() {
          return eX.getSpan(null == eW ? void 0 : eW.active());
        }
        withPropagatedContext(e10, t10, r10, n10 = false) {
          let i2 = eW.active();
          if (n10) {
            let n11 = eG.extract(eK, e10, r10);
            if (eX.getSpanContext(n11)) return eW.with(n11, t10);
            let a3 = eG.extract(i2, e10, r10);
            return eW.with(a3, t10);
          }
          if (eX.getSpanContext(i2)) return t10();
          let a2 = eG.extract(i2, e10, r10);
          return eW.with(a2, t10);
        }
        trace(...e10) {
          let [t10, r10, n10] = e10, { fn: i2, options: a2 } = "function" == typeof r10 ? { fn: r10, options: {} } : { fn: n10, options: { ...r10 } }, o2 = a2.spanName ?? t10;
          if (!eQ.has(t10) && "1" !== process.env.NEXT_OTEL_VERBOSE || a2.hideSpan) return i2();
          let s2 = this.getSpanContext((null == a2 ? void 0 : a2.parentSpan) ?? this.getActiveScopeSpan());
          s2 || (s2 = (null == eW ? void 0 : eW.active()) ?? eK);
          let l2 = s2.getValue(e1), u2 = "number" != typeof l2 || !e0.has(l2), c2 = e2++;
          return a2.attributes = { "next.span_name": o2, "next.span_type": t10, ...a2.attributes }, eW.with(s2.setValue(e1, c2), () => this.getTracerInstance().startActiveSpan(o2, a2, (e11) => {
            let r11;
            eH && t10 && eU.has(t10) && (r11 = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0);
            let n11 = false, o3 = () => {
              !n11 && (n11 = true, e0.delete(c2), r11 && performance.measure(`${eH}:next-${(t10.split(".").pop() || "").replace(/[A-Z]/g, (e12) => "-" + e12.toLowerCase())}`, { start: r11, end: performance.now() }));
            };
            if (u2 && e0.set(c2, new Map(Object.entries(a2.attributes ?? {}))), i2.length > 1) try {
              return i2(e11, (t11) => eZ(e11, t11));
            } catch (t11) {
              throw eZ(e11, t11), t11;
            } finally {
              o3();
            }
            try {
              let t11 = i2(e11);
              if (eV(t11)) return t11.then((t12) => (e11.end(), t12)).catch((t12) => {
                throw eZ(e11, t12), t12;
              }).finally(o3);
              return e11.end(), o3(), t11;
            } catch (t11) {
              throw eZ(e11, t11), o3(), t11;
            }
          }));
        }
        wrap(...e10) {
          let t10 = this, [r10, n10, i2] = 3 === e10.length ? e10 : [e10[0], {}, e10[1]];
          return eQ.has(r10) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e11 = n10;
            "function" == typeof e11 && "function" == typeof i2 && (e11 = e11.apply(this, arguments));
            let a2 = arguments.length - 1, o2 = arguments[a2];
            if ("function" != typeof o2) return t10.trace(r10, e11, () => i2.apply(this, arguments));
            {
              let n11 = t10.getContext().bind(eW.active(), o2);
              return t10.trace(r10, e11, (e12, t11) => (arguments[a2] = function(e13) {
                return null == t11 || t11(e13), n11.apply(this, arguments);
              }, i2.apply(this, arguments)));
            }
          } : i2;
        }
        startSpan(...e10) {
          let [t10, r10] = e10, n10 = this.getSpanContext((null == r10 ? void 0 : r10.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(t10, r10, n10);
        }
        getSpanContext(e10) {
          return e10 ? eX.setSpan(eW.active(), e10) : void 0;
        }
        getRootSpanAttributes() {
          let e10 = eW.active().getValue(e1);
          return e0.get(e10);
        }
        setRootSpanAttribute(e10, t10) {
          let r10 = eW.active().getValue(e1), n10 = e0.get(r10);
          n10 && !n10.has(e10) && n10.set(e10, t10);
        }
        withSpan(e10, t10) {
          let r10 = eX.setSpan(eW.active(), e10);
          return eW.with(r10, t10);
        }
      }(), () => n), e8 = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(e8);
      class e6 {
        constructor(e10, t10, r10, n10) {
          var i2;
          const a2 = e10 && function(e11, t11) {
            let r11 = e_.from(e11.headers);
            return { isOnDemandRevalidate: r11.get(p) === t11.previewModeId, revalidateOnlyGenerated: r11.has("x-prerender-revalidate-if-generated") };
          }(t10, e10).isOnDemandRevalidate, o2 = null == (i2 = r10.get(e8)) ? void 0 : i2.value;
          this._isEnabled = !!(!a2 && o2 && e10 && o2 === e10.previewModeId), this._previewModeId = null == e10 ? void 0 : e10.previewModeId, this._mutableCookies = n10;
        }
        get isEnabled() {
          return this._isEnabled;
        }
        enable() {
          if (!this._previewModeId) throw Object.defineProperty(Error("Invariant: previewProps missing previewModeId this should never happen"), "__NEXT_ERROR_CODE", { value: "E93", enumerable: false, configurable: true });
          this._mutableCookies.set({ name: e8, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" }), this._isEnabled = true;
        }
        disable() {
          this._mutableCookies.set({ name: e8, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) }), this._isEnabled = false;
        }
      }
      function e9(e10, t10) {
        if ("x-middleware-set-cookie" in e10.headers && "string" == typeof e10.headers["x-middleware-set-cookie"]) {
          let r10 = e10.headers["x-middleware-set-cookie"], n10 = new Headers();
          for (let e11 of b(r10)) n10.append("set-cookie", e11);
          for (let e11 of new el.ResponseCookies(n10).getAll()) t10.set(e11);
        }
      }
      var e5 = e.i(53835), e7 = e.i(9939), e7 = e7, te = e.i(99734);
      class tt extends Error {
        constructor(e10, t10) {
          super(`Invariant: ${e10.endsWith(".") ? e10 : e10 + "."} This is a bug in Next.js.`, t10), this.name = "InvariantError";
        }
      }
      var eC = eC, tr = e.i(51615);
      process.env.NEXT_PRIVATE_DEBUG_CACHE, Symbol.for("@next/cache-handlers");
      let tn = Symbol.for("@next/cache-handlers-map"), ti = Symbol.for("@next/cache-handlers-set"), ta = globalThis;
      function to() {
        if (ta[tn]) return ta[tn].entries();
      }
      async function ts(e10, t10) {
        if (!e10) return t10();
        let r10 = tl(e10);
        try {
          return await t10();
        } finally {
          var n10, i2, a2, o2;
          let t11, s2, l2, u2, c2 = (n10 = r10, i2 = tl(e10), t11 = new Set(n10.pendingRevalidatedTags.map((e11) => {
            let t12 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return `${e11.tag}:${t12}`;
          })), s2 = new Set(n10.pendingRevalidateWrites), { pendingRevalidatedTags: i2.pendingRevalidatedTags.filter((e11) => {
            let r11 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return !t11.has(`${e11.tag}:${r11}`);
          }), pendingRevalidates: Object.fromEntries(Object.entries(i2.pendingRevalidates).filter(([e11]) => !(e11 in n10.pendingRevalidates))), pendingRevalidateWrites: i2.pendingRevalidateWrites.filter((e11) => !s2.has(e11)) });
          await (a2 = e10, l2 = [], (u2 = (null == (o2 = c2) ? void 0 : o2.pendingRevalidatedTags) ?? a2.pendingRevalidatedTags ?? []).length > 0 && l2.push(tu(u2, a2.incrementalCache, a2)), l2.push(...Object.values((null == o2 ? void 0 : o2.pendingRevalidates) ?? a2.pendingRevalidates ?? {})), l2.push(...(null == o2 ? void 0 : o2.pendingRevalidateWrites) ?? a2.pendingRevalidateWrites ?? []), 0 !== l2.length && Promise.all(l2).then(() => void 0));
        }
      }
      function tl(e10) {
        return { pendingRevalidatedTags: e10.pendingRevalidatedTags ? [...e10.pendingRevalidatedTags] : [], pendingRevalidates: { ...e10.pendingRevalidates }, pendingRevalidateWrites: e10.pendingRevalidateWrites ? [...e10.pendingRevalidateWrites] : [] };
      }
      async function tu(e10, t10, r10) {
        if (0 === e10.length) return;
        let n10 = function() {
          if (ta[ti]) return ta[ti].values();
        }(), i2 = [], a2 = /* @__PURE__ */ new Map();
        for (let t11 of e10) {
          let e11, r11 = t11.profile;
          for (let [t12] of a2) if ("string" == typeof t12 && "string" == typeof r11 && t12 === r11 || "object" == typeof t12 && "object" == typeof r11 && JSON.stringify(t12) === JSON.stringify(r11) || t12 === r11) {
            e11 = t12;
            break;
          }
          let n11 = e11 || r11;
          a2.has(n11) || a2.set(n11, []), a2.get(n11).push(t11.tag);
        }
        for (let [e11, s2] of a2) {
          let a3;
          if (e11) {
            let t11;
            if ("object" == typeof e11) t11 = e11;
            else if ("string" == typeof e11) {
              var o2;
              if (!(t11 = null == r10 || null == (o2 = r10.cacheLifeProfiles) ? void 0 : o2[e11])) throw Object.defineProperty(Error(`Invalid profile provided "${e11}" must be configured under cacheLife in next.config or be "max"`), "__NEXT_ERROR_CODE", { value: "E873", enumerable: false, configurable: true });
            }
            t11 && (a3 = { expire: t11.expire });
          }
          for (let t11 of n10 || []) e11 ? i2.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, s2, a3)) : i2.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, s2));
          t10 && i2.push(t10.revalidateTag(s2, a3));
        }
        await Promise.all(i2);
      }
      var tc = e.i(90044), e7 = e7;
      let td = (0, tc.createAsyncLocalStorage)();
      class th {
        constructor({ waitUntil: e10, onClose: t10, onTaskError: r10 }) {
          this.workUnitStores = /* @__PURE__ */ new Set(), this.waitUntil = e10, this.onClose = t10, this.onTaskError = r10, this.callbackQueue = new te.default(), this.callbackQueue.pause();
        }
        after(e10) {
          if (eV(e10)) this.waitUntil || tf(), this.waitUntil(e10.catch((e11) => this.reportTaskError("promise", e11)));
          else if ("function" == typeof e10) this.addCallback(e10);
          else throw Object.defineProperty(Error("`after()`: Argument must be a promise or a function"), "__NEXT_ERROR_CODE", { value: "E50", enumerable: false, configurable: true });
        }
        addCallback(e10) {
          this.waitUntil || tf();
          let t10 = e7.workUnitAsyncStorageInstance.getStore();
          t10 && this.workUnitStores.add(t10);
          let r10 = td.getStore(), n10 = r10 ? r10.rootTaskSpawnPhase : null == t10 ? void 0 : t10.phase;
          this.runCallbacksOnClosePromise || (this.runCallbacksOnClosePromise = this.runCallbacksOnClose(), this.waitUntil(this.runCallbacksOnClosePromise));
          let i2 = (0, tc.bindSnapshot)(async () => {
            try {
              await td.run({ rootTaskSpawnPhase: n10 }, () => e10());
            } catch (e11) {
              this.reportTaskError("function", e11);
            }
          });
          this.callbackQueue.add(i2);
        }
        async runCallbacksOnClose() {
          return await new Promise((e10) => this.onClose(e10)), this.runCallbacks();
        }
        async runCallbacks() {
          if (0 === this.callbackQueue.size) return;
          for (let e11 of this.workUnitStores) e11.phase = "after";
          let e10 = eC.workAsyncStorageInstance.getStore();
          if (!e10) throw Object.defineProperty(new tt("Missing workStore in AfterContext.runCallbacks"), "__NEXT_ERROR_CODE", { value: "E547", enumerable: false, configurable: true });
          return ts(e10, () => (this.callbackQueue.start(), this.callbackQueue.onIdle()));
        }
        reportTaskError(e10, t10) {
          if (console.error("promise" === e10 ? "A promise passed to `after()` rejected:" : "An error occurred in a function passed to `after()`:", t10), this.onTaskError) try {
            null == this.onTaskError || this.onTaskError.call(this, t10);
          } catch (e11) {
            console.error(Object.defineProperty(new tt("`onTaskError` threw while handling an error thrown from an `after` task", { cause: e11 }), "__NEXT_ERROR_CODE", { value: "E569", enumerable: false, configurable: true }));
          }
        }
      }
      function tf() {
        throw Object.defineProperty(Error("`after()` will not work correctly, because `waitUntil` is not available in the current environment."), "__NEXT_ERROR_CODE", { value: "E91", enumerable: false, configurable: true });
      }
      function tp(e10) {
        let t10, r10 = { then: (n10, i2) => (t10 || (t10 = Promise.resolve(e10())), t10.then((e11) => {
          r10.value = e11;
        }).catch(() => {
        }), t10.then(n10, i2)) };
        return r10;
      }
      var eC = eC;
      class tg {
        onClose(e10) {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot subscribe to a closed CloseController"), "__NEXT_ERROR_CODE", { value: "E365", enumerable: false, configurable: true });
          this.target.addEventListener("close", e10), this.listeners++;
        }
        dispatchClose() {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot close a CloseController multiple times"), "__NEXT_ERROR_CODE", { value: "E229", enumerable: false, configurable: true });
          this.listeners > 0 && this.target.dispatchEvent(new Event("close")), this.isClosed = true;
        }
        constructor() {
          this.target = new EventTarget(), this.listeners = 0, this.isClosed = false;
        }
      }
      function tA() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID || "", previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      let tm = Symbol.for("@next/request-context");
      async function ty(e10, t10, r10) {
        let n10 = /* @__PURE__ */ new Set();
        for (let t11 of ((e11) => {
          let t12 = ["/layout"];
          if (e11.startsWith("/")) {
            let r11 = e11.split("/");
            for (let e12 = 1; e12 < r11.length + 1; e12++) {
              let n11 = r11.slice(0, e12).join("/");
              n11 && (n11.endsWith("/page") || n11.endsWith("/route") || (n11 = `${n11}${!n11.endsWith("/") ? "/" : ""}layout`), t12.push(n11));
            }
          }
          return t12;
        })(e10)) t11 = `${y}${t11}`, n10.add(t11);
        if (t10 && (!r10 || 0 === r10.size)) {
          let e11 = `${y}${t10}`;
          n10.add(e11);
        }
        n10.has(`${y}/`) && n10.add(`${y}/index`), n10.has(`${y}/index`) && n10.add(`${y}/`);
        let i2 = Array.from(n10);
        return { tags: i2, expirationsByCacheKind: function(e11) {
          let t11 = /* @__PURE__ */ new Map(), r11 = to();
          if (r11) for (let [n11, i3] of r11) "getExpiration" in i3 && t11.set(n11, tp(async () => i3.getExpiration(e11)));
          return t11;
        }(i2) };
      }
      let tw = Symbol.for("NextInternalRequestMeta");
      class tb extends ec {
        constructor(e10) {
          super(e10.input, e10.init), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new d({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new d({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        waitUntil() {
          throw Object.defineProperty(new d({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      let tv = { keys: (e10) => Array.from(e10.keys()), get: (e10, t10) => e10.get(t10) ?? void 0 }, tE = (e10, t10) => e3().withPropagatedContext(e10.headers, t10, tv), t_ = false;
      async function tC(t10) {
        var r10, n10, i2, a2, o2;
        let s2, l2, c2, d2, h2;
        !function() {
          if (!t_ && (t_ = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
            let { interceptTestApis: t11, wrapRequestHandler: r11 } = e.r(94165);
            t11(), tE = r11(tE);
          }
        }(), await u();
        let f2 = void 0 !== globalThis.__BUILD_MANIFEST;
        t10.request.url = t10.request.url.replace(/\.rsc($|\?)/, "$1");
        let p2 = t10.bypassNextUrl ? new URL(t10.request.url) : new j(t10.request.url, { headers: t10.request.headers, nextConfig: t10.request.nextConfig });
        for (let e10 of [...p2.searchParams.keys()]) {
          let t11 = p2.searchParams.getAll(e10), r11 = function(e11) {
            for (let t12 of ["nxtP", "nxtI"]) if (e11 !== t12 && e11.startsWith(t12)) return e11.substring(t12.length);
            return null;
          }(e10);
          if (r11) {
            for (let e11 of (p2.searchParams.delete(r11), t11)) p2.searchParams.append(r11, e11);
            p2.searchParams.delete(e10);
          }
        }
        let g2 = process.env.__NEXT_BUILD_ID || "";
        "buildId" in p2 && (g2 = p2.buildId || "", p2.buildId = "");
        let A2 = function(e10) {
          let t11 = new Headers();
          for (let [r11, n11] of Object.entries(e10)) for (let e11 of Array.isArray(n11) ? n11 : [n11]) void 0 !== e11 && ("number" == typeof e11 && (e11 = e11.toString()), t11.append(r11, e11));
          return t11;
        }(t10.request.headers), m2 = A2.has("x-nextjs-data"), y2 = "1" === A2.get("rsc");
        m2 && "/index" === p2.pathname && (p2.pathname = "/");
        let w2 = /* @__PURE__ */ new Map();
        if (!f2) for (let e10 of ey) {
          let t11 = A2.get(e10);
          null !== t11 && (w2.set(e10, t11), A2.delete(e10));
        }
        let b2 = p2.searchParams.get(ew), v2 = new tb({ page: t10.page, input: ((d2 = (c2 = "string" == typeof p2) ? new URL(p2) : p2).searchParams.delete(ew), c2 ? d2.toString() : d2).toString(), init: { body: t10.request.body, headers: A2, method: t10.request.method, nextConfig: t10.request.nextConfig, signal: t10.request.signal } });
        t10.request.requestMeta && (o2 = t10.request.requestMeta, v2[tw] = o2), m2 && Object.defineProperty(v2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCacheShared && t10.IncrementalCache && (globalThis.__incrementalCache = new t10.IncrementalCache({ CurCacheHandler: t10.incrementalCacheHandler, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: t10.request.headers, getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: tA() }) }));
        let E2 = t10.request.waitUntil ?? (null == (r10 = null == (h2 = globalThis[tm]) ? void 0 : h2.get()) ? void 0 : r10.waitUntil), _2 = new S({ request: v2, page: t10.page, context: E2 ? { waitUntil: E2 } : void 0 });
        if ((s2 = await tE(v2, () => {
          if ("/middleware" === t10.page || "/src/middleware" === t10.page || "/proxy" === t10.page || "/src/proxy" === t10.page) {
            let e10 = _2.waitUntil.bind(_2), r11 = new tg();
            return e3().trace(eF.execute, { spanName: `middleware ${v2.method}`, attributes: { "http.target": v2.nextUrl.pathname, "http.method": v2.method } }, async () => {
              try {
                var n11, i3, a3, o3, s3, u2;
                let c3 = tA(), d3 = await ty("/", v2.nextUrl.pathname, null), h3 = (s3 = v2.nextUrl, u2 = (e11) => {
                  l2 = e11;
                }, function(e11, t11, r12, n12, i4, a4, o4, s4, l3, u3) {
                  function c4(e12) {
                    r12 && r12.setHeader("Set-Cookie", e12);
                  }
                  let d4 = {};
                  return { type: "request", phase: e11, implicitTags: a4, url: { pathname: n12.pathname, search: n12.search ?? "" }, rootParams: i4, get headers() {
                    return d4.headers || (d4.headers = function(e12) {
                      let t12 = e_.from(e12);
                      for (let e13 of ey) t12.delete(e13);
                      return e_.seal(t12);
                    }(t11.headers)), d4.headers;
                  }, get cookies() {
                    if (!d4.cookies) {
                      let e12 = new el.RequestCookies(e_.from(t11.headers));
                      e9(t11, e12), d4.cookies = eI.seal(e12);
                    }
                    return d4.cookies;
                  }, set cookies(value) {
                    d4.cookies = value;
                  }, get mutableCookies() {
                    if (!d4.mutableCookies) {
                      var h4, f4;
                      let e12, n13 = (h4 = t11.headers, f4 = o4 || (r12 ? c4 : void 0), e12 = new el.RequestCookies(e_.from(h4)), eT.wrap(e12, f4));
                      e9(t11, n13), d4.mutableCookies = n13;
                    }
                    return d4.mutableCookies;
                  }, get userspaceMutableCookies() {
                    if (!d4.userspaceMutableCookies) {
                      var p3;
                      let e12;
                      p3 = this, d4.userspaceMutableCookies = e12 = new Proxy(p3.mutableCookies, { get(t12, r13, n13) {
                        switch (r13) {
                          case "delete":
                            return function(...r14) {
                              return eO(p3, "cookies().delete"), t12.delete(...r14), e12;
                            };
                          case "set":
                            return function(...r14) {
                              return eO(p3, "cookies().set"), t12.set(...r14), e12;
                            };
                          default:
                            return ed.get(t12, r13, n13);
                        }
                      } });
                    }
                    return d4.userspaceMutableCookies;
                  }, get draftMode() {
                    return d4.draftMode || (d4.draftMode = new e6(s4, t11, this.cookies, this.mutableCookies)), d4.draftMode;
                  }, renderResumeDataCache: null, isHmrRefresh: l3, serverComponentsHmrCache: u3 || globalThis.__serverComponentsHmrCache, fallbackParams: null };
                }("action", v2, void 0, s3, {}, d3, u2, c3, false, void 0)), f3 = function({ page: e11, renderOpts: t11, isPrefetchRequest: r12, buildId: n12, deploymentId: i4, previouslyRevalidatedTags: a4, nonce: o4 }) {
                  let s4 = !t11.shouldWaitOnAllReady && !t11.supportsDynamicResponse && !t11.isDraftMode && !t11.isPossibleServerAction, l3 = s4 && (!!process.env.NEXT_DEBUG_BUILD || "1" === process.env.NEXT_SSG_FETCH_METRICS), u3 = { isStaticGeneration: s4, page: e11, route: ev(e11), incrementalCache: t11.incrementalCache || globalThis.__incrementalCache, cacheLifeProfiles: t11.cacheLifeProfiles, isBuildTimePrerendering: t11.isBuildTimePrerendering, fetchCache: t11.fetchCache, isOnDemandRevalidate: t11.isOnDemandRevalidate, isDraftMode: t11.isDraftMode, isPrefetchRequest: r12, buildId: n12, deploymentId: i4, reactLoadableManifest: (null == t11 ? void 0 : t11.reactLoadableManifest) || {}, assetPrefix: (null == t11 ? void 0 : t11.assetPrefix) || "", nonce: o4, afterContext: function(e12) {
                    let { waitUntil: t12, onClose: r13, onAfterTaskError: n13 } = e12;
                    return new th({ waitUntil: t12, onClose: r13, onTaskError: n13 });
                  }(t11), cacheComponentsEnabled: t11.cacheComponents, previouslyRevalidatedTags: a4, refreshTagsByCacheKind: function() {
                    let e12 = /* @__PURE__ */ new Map(), t12 = to();
                    if (t12) for (let [r13, n13] of t12) "refreshTags" in n13 && e12.set(r13, tp(async () => n13.refreshTags()));
                    return e12;
                  }(), runInCleanSnapshot: (0, tc.createSnapshot)(), shouldTrackFetchMetrics: l3, reactServerErrorsByDigest: /* @__PURE__ */ new Map() };
                  return t11.store = u3, u3;
                }({ page: "/", renderOpts: { cacheLifeProfiles: null == (i3 = t10.request.nextConfig) || null == (n11 = i3.experimental) ? void 0 : n11.cacheLife, cacheComponents: false, experimental: { isRoutePPREnabled: false, authInterrupts: !!(null == (o3 = t10.request.nextConfig) || null == (a3 = o3.experimental) ? void 0 : a3.authInterrupts) }, supportsDynamicResponse: true, waitUntil: e10, onClose: r11.onClose.bind(r11), onAfterTaskError: void 0 }, isPrefetchRequest: "1" === v2.headers.get(em), buildId: g2 ?? "", deploymentId: false, previouslyRevalidatedTags: [] });
                return await eC.workAsyncStorageInstance.run(f3, () => e7.workUnitAsyncStorageInstance.run(h3, t10.handler, v2, _2));
              } finally {
                setTimeout(() => {
                  r11.dispatchClose();
                }, 0);
              }
            });
          }
          return t10.handler(v2, _2);
        })) && !(s2 instanceof Response)) throw Object.defineProperty(TypeError("Expected an instance of Response to be returned"), "__NEXT_ERROR_CODE", { value: "E567", enumerable: false, configurable: true });
        s2 && l2 && s2.headers.set("set-cookie", l2);
        let C2 = null == s2 ? void 0 : s2.headers.get("x-middleware-rewrite");
        if (s2 && C2 && (y2 || !f2)) {
          let e10 = new j(C2, { forceLocale: true, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          f2 || e10.host !== v2.nextUrl.host || (e10.buildId = g2 || e10.buildId, s2.headers.set("x-middleware-rewrite", String(e10)));
          let { url: r11, isRelative: o3 } = eA(e10.toString(), p2.toString());
          !f2 && m2 && s2.headers.set("x-nextjs-rewrite", r11);
          let l3 = !o3 && (null == (a2 = t10.request.nextConfig) || null == (i2 = a2.experimental) || null == (n10 = i2.clientParamParsingOrigins) ? void 0 : n10.some((t11) => new RegExp(t11).test(e10.origin)));
          y2 && (o3 || l3) && (p2.pathname !== e10.pathname && s2.headers.set("x-nextjs-rewritten-path", e10.pathname), p2.search !== e10.search && s2.headers.set("x-nextjs-rewritten-query", e10.search.slice(1)));
        }
        if (s2 && C2 && y2 && b2) {
          let e10 = new URL(C2);
          e10.searchParams.has(ew) || (e10.searchParams.set(ew, b2), s2.headers.set("x-middleware-rewrite", e10.toString()));
        }
        let I2 = null == s2 ? void 0 : s2.headers.get("Location");
        if (s2 && I2 && !f2) {
          let e10 = new j(I2, { forceLocale: false, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          s2 = new Response(s2.body, s2), e10.host === p2.host && (e10.buildId = g2 || e10.buildId, s2.headers.set("Location", eA(e10, p2).url)), m2 && (s2.headers.delete("Location"), s2.headers.set("x-nextjs-redirect", eA(e10.toString(), p2.toString()).url));
        }
        let T2 = s2 || eg.next(), O2 = T2.headers.get("x-middleware-override-headers"), P2 = [];
        if (O2) {
          for (let [e10, t11] of w2) T2.headers.set(`x-middleware-request-${e10}`, t11), P2.push(e10);
          P2.length > 0 && T2.headers.set("x-middleware-override-headers", O2 + "," + P2.join(","));
        }
        return { response: T2, waitUntil: ("internal" === _2[x].kind ? Promise.all(_2[x].promises).then(() => {
        }) : void 0) ?? Promise.resolve(), fetchMetrics: v2.fetchMetrics };
      }
      class tx {
        constructor() {
          let e10, t10;
          this.promise = new Promise((r10, n10) => {
            e10 = r10, t10 = n10;
          }), this.resolve = e10, this.reject = t10;
        }
      }
      class tI {
        constructor(e10, t10, r10) {
          this.prev = null, this.next = null, this.key = e10, this.data = t10, this.size = r10;
        }
      }
      class tS {
        constructor() {
          this.prev = null, this.next = null;
        }
      }
      class tT {
        constructor(e10, t10, r10) {
          this.cache = /* @__PURE__ */ new Map(), this.totalSize = 0, this.maxSize = e10, this.calculateSize = t10, this.onEvict = r10, this.head = new tS(), this.tail = new tS(), this.head.next = this.tail, this.tail.prev = this.head;
        }
        addToHead(e10) {
          e10.prev = this.head, e10.next = this.head.next, this.head.next.prev = e10, this.head.next = e10;
        }
        removeNode(e10) {
          e10.prev.next = e10.next, e10.next.prev = e10.prev;
        }
        moveToHead(e10) {
          this.removeNode(e10), this.addToHead(e10);
        }
        removeTail() {
          let e10 = this.tail.prev;
          return this.removeNode(e10), e10;
        }
        set(e10, t10) {
          let r10 = (null == this.calculateSize ? void 0 : this.calculateSize.call(this, t10)) ?? 1;
          if (r10 <= 0) throw Object.defineProperty(Error(`LRUCache: calculateSize returned ${r10}, but size must be > 0. Items with size 0 would never be evicted, causing unbounded cache growth.`), "__NEXT_ERROR_CODE", { value: "E1045", enumerable: false, configurable: true });
          if (r10 > this.maxSize) return console.warn("Single item size exceeds maxSize"), false;
          let n10 = this.cache.get(e10);
          if (n10) n10.data = t10, this.totalSize = this.totalSize - n10.size + r10, n10.size = r10, this.moveToHead(n10);
          else {
            let n11 = new tI(e10, t10, r10);
            this.cache.set(e10, n11), this.addToHead(n11), this.totalSize += r10;
          }
          for (; this.totalSize > this.maxSize && this.cache.size > 0; ) {
            let e11 = this.removeTail();
            this.cache.delete(e11.key), this.totalSize -= e11.size, null == this.onEvict || this.onEvict.call(this, e11.key, e11.data);
          }
          return true;
        }
        has(e10) {
          return this.cache.has(e10);
        }
        get(e10) {
          let t10 = this.cache.get(e10);
          if (t10) return this.moveToHead(t10), t10.data;
        }
        *[Symbol.iterator]() {
          let e10 = this.head.next;
          for (; e10 && e10 !== this.tail; ) {
            let t10 = e10;
            yield [t10.key, t10.data], e10 = e10.next;
          }
        }
        remove(e10) {
          let t10 = this.cache.get(e10);
          t10 && (this.removeNode(t10), this.cache.delete(e10), this.totalSize -= t10.size);
        }
        get size() {
          return this.cache.size;
        }
        get currentSize() {
          return this.totalSize;
        }
      }
      let { env: tO, stdout: tP } = (null == (Z = globalThis) ? void 0 : Z.process) ?? {}, tR = tO && !tO.NO_COLOR && (tO.FORCE_COLOR || (null == tP ? void 0 : tP.isTTY) && !tO.CI && "dumb" !== tO.TERM), tN = (e10, t10, r10, n10) => {
        let i2 = e10.substring(0, n10) + r10, a2 = e10.substring(n10 + t10.length), o2 = a2.indexOf(t10);
        return ~o2 ? i2 + tN(a2, t10, r10, o2) : i2 + a2;
      }, tk = (e10, t10, r10 = e10) => tR ? (n10) => {
        let i2 = "" + n10, a2 = i2.indexOf(t10, e10.length);
        return ~a2 ? e10 + tN(i2, t10, r10, a2) + t10 : e10 + i2 + t10;
      } : String, tB = tk("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m");
      tk("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"), tk("\x1B[3m", "\x1B[23m"), tk("\x1B[4m", "\x1B[24m"), tk("\x1B[7m", "\x1B[27m"), tk("\x1B[8m", "\x1B[28m"), tk("\x1B[9m", "\x1B[29m"), tk("\x1B[30m", "\x1B[39m");
      let tD = tk("\x1B[31m", "\x1B[39m"), tM = tk("\x1B[32m", "\x1B[39m"), t$ = tk("\x1B[33m", "\x1B[39m");
      tk("\x1B[34m", "\x1B[39m");
      let tj = tk("\x1B[35m", "\x1B[39m");
      tk("\x1B[38;2;173;127;168m", "\x1B[39m"), tk("\x1B[36m", "\x1B[39m");
      let tL = tk("\x1B[37m", "\x1B[39m");
      tk("\x1B[90m", "\x1B[39m"), tk("\x1B[40m", "\x1B[49m"), tk("\x1B[41m", "\x1B[49m"), tk("\x1B[42m", "\x1B[49m"), tk("\x1B[43m", "\x1B[49m"), tk("\x1B[44m", "\x1B[49m"), tk("\x1B[45m", "\x1B[49m"), tk("\x1B[46m", "\x1B[49m"), tk("\x1B[47m", "\x1B[49m"), tL(tB("\u25CB")), tD(tB("\u2A2F")), t$(tB("\u26A0")), tL(tB(" ")), tM(tB("\u2713")), tj(tB("\xBB")), new tT(1e4, (e10) => e10.length), new tT(1e4, (e10) => e10.length);
      var tq = ((K = {}).APP_PAGE = "APP_PAGE", K.APP_ROUTE = "APP_ROUTE", K.PAGES = "PAGES", K.FETCH = "FETCH", K.REDIRECT = "REDIRECT", K.IMAGE = "IMAGE", K), tF = ((Y = {}).APP_PAGE = "APP_PAGE", Y.APP_ROUTE = "APP_ROUTE", Y.PAGES = "PAGES", Y.FETCH = "FETCH", Y.IMAGE = "IMAGE", Y);
      function tQ() {
      }
      new TextEncoder();
      let tU = new TextEncoder();
      function tV(e10) {
        return new ReadableStream({ start(t10) {
          t10.enqueue(tU.encode(e10)), t10.close();
        } });
      }
      function tH(e10) {
        return new ReadableStream({ start(t10) {
          t10.enqueue(e10), t10.close();
        } });
      }
      async function tW(e10, t10) {
        let r10 = new TextDecoder("utf-8", { fatal: true }), n10 = "";
        for await (let i2 of e10) {
          if (null == t10 ? void 0 : t10.aborted) return n10;
          n10 += r10.decode(i2, { stream: true });
        }
        return n10 + r10.decode();
      }
      let tG = "ResponseAborted";
      class tX extends Error {
        constructor(...e10) {
          super(...e10), this.name = tG;
        }
      }
      let tJ = 0, tz = 0, tK = 0;
      function tY(e10) {
        return (null == e10 ? void 0 : e10.name) === "AbortError" || (null == e10 ? void 0 : e10.name) === tG;
      }
      async function tZ(e10, t10, r10) {
        try {
          let n10, { errored: i2, destroyed: a2 } = t10;
          if (i2 || a2) return;
          let o2 = (n10 = new AbortController(), t10.once("close", () => {
            t10.writableFinished || n10.abort(new tX());
          }), n10), s2 = function(e11, t11) {
            let r11 = false, n11 = new tx();
            function i3() {
              n11.resolve();
            }
            e11.on("drain", i3), e11.once("close", () => {
              e11.off("drain", i3), n11.resolve();
            });
            let a3 = new tx();
            return e11.once("finish", () => {
              a3.resolve();
            }), new WritableStream({ write: async (t12) => {
              if (!r11) {
                if (r11 = true, "performance" in globalThis && process.env.NEXT_OTEL_PERFORMANCE_PREFIX) {
                  let e12 = function(e13 = {}) {
                    let t13 = 0 === tJ ? void 0 : { clientComponentLoadStart: tJ, clientComponentLoadTimes: tz, clientComponentLoadCount: tK };
                    return e13.reset && (tJ = 0, tz = 0, tK = 0), t13;
                  }();
                  e12 && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-client-component-loading`, { start: e12.clientComponentLoadStart, end: e12.clientComponentLoadStart + e12.clientComponentLoadTimes });
                }
                e11.flushHeaders(), e3().trace(ek.startResponse, { spanName: "start response" }, () => void 0);
              }
              try {
                let r12 = e11.write(t12);
                "flush" in e11 && "function" == typeof e11.flush && e11.flush(), r12 || (await n11.promise, n11 = new tx());
              } catch (t13) {
                throw e11.end(), Object.defineProperty(Error("failed to write chunk to response", { cause: t13 }), "__NEXT_ERROR_CODE", { value: "E321", enumerable: false, configurable: true });
              }
            }, abort: (t12) => {
              e11.writableFinished || e11.destroy(t12);
            }, close: async () => {
              if (t11 && await t11, !e11.writableFinished) return e11.end(), a3.promise;
            } });
          }(t10, r10);
          await e10.pipeTo(s2, { signal: o2.signal });
        } catch (e11) {
          if (tY(e11)) return;
          throw Object.defineProperty(Error("failed to pipe response", { cause: e11 }), "__NEXT_ERROR_CODE", { value: "E180", enumerable: false, configurable: true });
        }
      }
      class t0 {
        static #E = this.EMPTY = new t0(null, { metadata: {}, contentType: null });
        static fromStatic(e10, t10) {
          return new t0(e10, { metadata: {}, contentType: t10 });
        }
        constructor(e10, { contentType: t10, waitUntil: r10, metadata: n10 }) {
          this.response = e10, this.contentType = t10, this.metadata = n10, this.waitUntil = r10;
        }
        assignMetadata(e10) {
          Object.assign(this.metadata, e10);
        }
        get isNull() {
          return null === this.response;
        }
        get isDynamic() {
          return "string" != typeof this.response;
        }
        toUnchunkedString(e10 = false) {
          if (null === this.response) return "";
          if ("string" != typeof this.response) {
            if (!e10) throw Object.defineProperty(new tt("dynamic responses cannot be unchunked. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E732", enumerable: false, configurable: true });
            return tW(this.readable);
          }
          return this.response;
        }
        get readable() {
          return null === this.response ? new ReadableStream({ start(e10) {
            e10.close();
          } }) : "string" == typeof this.response ? tV(this.response) : tr.Buffer.isBuffer(this.response) ? tH(this.response) : Array.isArray(this.response) ? function(...e10) {
            if (0 === e10.length) return new ReadableStream({ start(e11) {
              e11.close();
            } });
            if (1 === e10.length) return e10[0];
            let { readable: t10, writable: r10 } = new TransformStream(), n10 = e10[0].pipeTo(r10, { preventClose: true }), i2 = 1;
            for (; i2 < e10.length - 1; i2++) {
              let t11 = e10[i2];
              n10 = n10.then(() => t11.pipeTo(r10, { preventClose: true }));
            }
            let a2 = e10[i2];
            return (n10 = n10.then(() => a2.pipeTo(r10))).catch(tQ), t10;
          }(...this.response) : this.response;
        }
        coerce() {
          return null === this.response ? [] : "string" == typeof this.response ? [tV(this.response)] : Array.isArray(this.response) ? this.response : tr.Buffer.isBuffer(this.response) ? [tH(this.response)] : [this.response];
        }
        pipeThrough(e10) {
          this.response = this.readable.pipeThrough(e10);
        }
        unshift(e10) {
          this.response = this.coerce(), this.response.unshift(e10);
        }
        push(e10) {
          this.response = this.coerce(), this.response.push(e10);
        }
        async pipeTo(e10) {
          try {
            await this.readable.pipeTo(e10, { preventClose: true }), this.waitUntil && await this.waitUntil, await e10.close();
          } catch (t10) {
            if (tY(t10)) return void await e10.abort(t10);
            throw t10;
          }
        }
        async pipeToNodeResponse(e10) {
          await tZ(this.readable, e10, this.waitUntil);
        }
      }
      function t1(e10, t10) {
        if (!e10) return t10;
        let r10 = parseInt(e10, 10);
        return Number.isFinite(r10) && r10 > 0 ? r10 : t10;
      }
      t1(process.env.NEXT_PRIVATE_RESPONSE_CACHE_TTL, 1e4), t1(process.env.NEXT_PRIVATE_RESPONSE_CACHE_MAX_SIZE, 150);
      var t2 = e.i(68886);
      let t4 = /* @__PURE__ */ new Map(), t3 = (e10, t10) => {
        for (let r10 of e10) {
          let e11 = t4.get(r10), n10 = null == e11 ? void 0 : e11.expired;
          if ("number" == typeof n10 && n10 <= Date.now() && n10 > t10) return true;
        }
        return false;
      }, t8 = (e10, t10) => {
        for (let r10 of e10) {
          let e11 = t4.get(r10), n10 = (null == e11 ? void 0 : e11.stale) ?? 0;
          if ("number" == typeof n10 && n10 > t10) return true;
        }
        return false;
      };
      class t6 {
        constructor(e10) {
          this.fs = e10, this.tasks = [];
        }
        findOrCreateTask(e10) {
          for (let t11 of this.tasks) if (t11[0] === e10) return t11;
          let t10 = this.fs.mkdir(e10);
          t10.catch(() => {
          });
          let r10 = [e10, t10, []];
          return this.tasks.push(r10), r10;
        }
        append(e10, t10) {
          let r10 = this.findOrCreateTask(t2.default.dirname(e10)), n10 = r10[1].then(() => this.fs.writeFile(e10, t10));
          n10.catch(() => {
          }), r10[2].push(n10);
        }
        wait() {
          return Promise.all(this.tasks.flatMap((e10) => e10[2]));
        }
      }
      function t9(e10) {
        return (null == e10 ? void 0 : e10.length) || 0;
      }
      class t5 {
        static #E = this.debug = !!process.env.NEXT_PRIVATE_DEBUG_CACHE;
        constructor(e10) {
          this.fs = e10.fs, this.flushToDisk = e10.flushToDisk, this.serverDistDir = e10.serverDistDir, this.revalidatedTags = e10.revalidatedTags, e10.maxMemoryCacheSize ? t5.memoryCache ? t5.debug && console.log("FileSystemCache: memory store already initialized") : (t5.debug && console.log("FileSystemCache: using memory store for fetch cache"), t5.memoryCache = function(e11) {
            return r || (r = new tT(e11, function({ value: e12 }) {
              var t10, r10;
              if (!e12) return 25;
              if (e12.kind === tq.REDIRECT) return JSON.stringify(e12.props).length;
              if (e12.kind === tq.IMAGE) throw Object.defineProperty(Error("invariant image should not be incremental-cache"), "__NEXT_ERROR_CODE", { value: "E501", enumerable: false, configurable: true });
              if (e12.kind === tq.FETCH) return JSON.stringify(e12.data || "").length;
              if (e12.kind === tq.APP_ROUTE) return e12.body.length;
              return e12.kind === tq.APP_PAGE ? Math.max(1, e12.html.length + t9(e12.rscData) + ((null == (r10 = e12.postponed) ? void 0 : r10.length) || 0) + function(e13) {
                if (!e13) return 0;
                let t11 = 0;
                for (let [r11, n10] of e13) t11 += r11.length + t9(n10);
                return t11;
              }(e12.segmentData)) : e12.html.length + ((null == (t10 = JSON.stringify(e12.pageData)) ? void 0 : t10.length) || 0);
            })), r;
          }(e10.maxMemoryCacheSize)) : t5.debug && console.log("FileSystemCache: not using memory store for fetch cache");
        }
        resetRequestCache() {
        }
        async revalidateTag(e10, t10) {
          if (e10 = "string" == typeof e10 ? [e10] : e10, t5.debug && console.log("FileSystemCache: revalidateTag", e10, t10), 0 === e10.length) return;
          let r10 = Date.now();
          for (let n10 of e10) {
            let e11 = t4.get(n10) || {};
            if (t10) {
              let i2 = { ...e11 };
              i2.stale = r10, void 0 !== t10.expire && (i2.expired = r10 + 1e3 * t10.expire), t4.set(n10, i2);
            } else t4.set(n10, { ...e11, expired: r10 });
          }
        }
        async get(...e10) {
          var t10, r10, n10, i2, a2, o2;
          let [s2, l2] = e10, { kind: u2 } = l2, c2 = null == (t10 = t5.memoryCache) ? void 0 : t10.get(s2);
          if (t5.debug && (u2 === tF.FETCH ? console.log("FileSystemCache: get", s2, l2.tags, u2, !!c2) : console.log("FileSystemCache: get", s2, u2, !!c2)), (null == c2 || null == (r10 = c2.value) ? void 0 : r10.kind) === tq.APP_PAGE || (null == c2 || null == (n10 = c2.value) ? void 0 : n10.kind) === tq.APP_ROUTE || (null == c2 || null == (i2 = c2.value) ? void 0 : i2.kind) === tq.PAGES) {
            let e11 = null == (o2 = c2.value.headers) ? void 0 : o2[A];
            if ("string" == typeof e11) {
              let t11 = e11.split(",");
              if (t11.length > 0 && t3(t11, c2.lastModified)) return t5.debug && console.log("FileSystemCache: expired tags", t11), null;
            }
          } else if ((null == c2 || null == (a2 = c2.value) ? void 0 : a2.kind) === tq.FETCH) {
            let e11 = l2.kind === tF.FETCH ? [...l2.tags || [], ...l2.softTags || []] : [];
            if (e11.some((e12) => this.revalidatedTags.includes(e12))) return t5.debug && console.log("FileSystemCache: was revalidated", e11), null;
            if (t3(e11, c2.lastModified)) return t5.debug && console.log("FileSystemCache: expired tags", e11), null;
          }
          return c2 ?? null;
        }
        async set(e10, t10, r10) {
          var n10;
          if (null == (n10 = t5.memoryCache) || n10.set(e10, { value: t10, lastModified: Date.now() }), t5.debug && console.log("FileSystemCache: set", e10), !this.flushToDisk || !t10) return;
          let i2 = new t6(this.fs);
          if (t10.kind === tq.APP_ROUTE) {
            let r11 = this.getFilePath(`${e10}.body`, tF.APP_ROUTE);
            i2.append(r11, t10.body);
            let n11 = { headers: t10.headers, status: t10.status, postponed: void 0, segmentPaths: void 0, prefetchHints: void 0 };
            i2.append(r11.replace(/\.body$/, g), JSON.stringify(n11, null, 2));
          } else if (t10.kind === tq.PAGES || t10.kind === tq.APP_PAGE) {
            let n11 = t10.kind === tq.APP_PAGE, a2 = this.getFilePath(`${e10}.html`, n11 ? tF.APP_PAGE : tF.PAGES);
            if (i2.append(a2, t10.html), r10.fetchCache || r10.isFallback || r10.isRoutePPREnabled || i2.append(this.getFilePath(`${e10}${n11 ? ".rsc" : ".json"}`, n11 ? tF.APP_PAGE : tF.PAGES), n11 ? t10.rscData : JSON.stringify(t10.pageData)), (null == t10 ? void 0 : t10.kind) === tq.APP_PAGE) {
              let e11;
              if (t10.segmentData) {
                e11 = [];
                let r12 = a2.replace(/\.html$/, ".segments");
                for (let [n12, a3] of t10.segmentData) {
                  e11.push(n12);
                  let t11 = r12 + n12 + ".segment.rsc";
                  i2.append(t11, a3);
                }
              }
              let r11 = { headers: t10.headers, status: t10.status, postponed: t10.postponed, segmentPaths: e11, prefetchHints: void 0 };
              i2.append(a2.replace(/\.html$/, g), JSON.stringify(r11));
            }
          } else if (t10.kind === tq.FETCH) {
            let n11 = this.getFilePath(e10, tF.FETCH);
            i2.append(n11, JSON.stringify({ ...t10, tags: r10.fetchCache ? r10.tags : [] }));
          }
          await i2.wait();
        }
        getFilePath(e10, t10) {
          switch (t10) {
            case tF.FETCH:
              return t2.default.join(this.serverDistDir, "..", "cache", "fetch-cache", e10);
            case tF.PAGES:
              return t2.default.join(this.serverDistDir, "pages", e10);
            case tF.IMAGE:
            case tF.APP_PAGE:
            case tF.APP_ROUTE:
              return t2.default.join(this.serverDistDir, "app", e10);
            default:
              throw Object.defineProperty(Error(`Unexpected file path kind: ${t10}`), "__NEXT_ERROR_CODE", { value: "E479", enumerable: false, configurable: true });
          }
        }
      }
      let t7 = ["(..)(..)", "(.)", "(..)", "(...)"], re = /\/[^/]*\[[^/]+\][^/]*(?=\/|$)/, rt = /\/\[[^/]+\](?=\/|$)/;
      function rr(e10) {
        return e10.replace(/(?:\/index)?\/?$/, "") || "/";
      }
      class rn {
        static #E = this.cacheControls = /* @__PURE__ */ new Map();
        constructor(e10) {
          this.prerenderManifest = e10;
        }
        get(e10) {
          let t10 = rn.cacheControls.get(e10);
          if (t10) return t10;
          let r10 = this.prerenderManifest.routes[e10];
          if (r10) {
            let { initialRevalidateSeconds: e11, initialExpireSeconds: t11 } = r10;
            if (void 0 !== e11) return { revalidate: e11, expire: t11 };
          }
          let n10 = this.prerenderManifest.dynamicRoutes[e10];
          if (n10) {
            let { fallbackRevalidate: e11, fallbackExpire: t11 } = n10;
            if (void 0 !== e11) return { revalidate: e11, expire: t11 };
          }
        }
        set(e10, t10) {
          rn.cacheControls.set(e10, t10);
        }
        clear() {
          rn.cacheControls.clear();
        }
      }
      var e7 = e7;
      e.i(67914);
      var eC = eC;
      class ri {
        static #E = this.debug = !!process.env.NEXT_PRIVATE_DEBUG_CACHE;
        constructor({ fs: e10, dev: t10, flushToDisk: r10, minimalMode: n10, serverDistDir: i2, requestHeaders: a2, maxMemoryCacheSize: o2, getPrerenderManifest: s2, fetchCacheKeyPrefix: l2, CurCacheHandler: u2, allowedRevalidateHeaderKeys: c2 }) {
          var d2, h2, f2, g2;
          this.locks = /* @__PURE__ */ new Map(), this.hasCustomCacheHandler = !!u2;
          const A2 = Symbol.for("@next/cache-handlers"), y2 = globalThis;
          if (u2) ri.debug && console.log("IncrementalCache: using custom cache handler", u2.name);
          else {
            const t11 = y2[A2];
            (null == t11 ? void 0 : t11.FetchCache) ? (u2 = t11.FetchCache, ri.debug && console.log("IncrementalCache: using global FetchCache cache handler")) : e10 && i2 && (ri.debug && console.log("IncrementalCache: using filesystem cache handler"), u2 = t5);
          }
          process.env.__NEXT_TEST_MAX_ISR_CACHE && (o2 = parseInt(process.env.__NEXT_TEST_MAX_ISR_CACHE, 10)), this.dev = t10, this.disableForTestmode = "true" === process.env.NEXT_PRIVATE_TEST_PROXY, this.minimalMode = n10, this.requestHeaders = a2, this.allowedRevalidateHeaderKeys = c2, this.prerenderManifest = s2(), this.cacheControls = new rn(this.prerenderManifest), this.fetchCacheKeyPrefix = l2;
          let w2 = [];
          a2[p] === (null == (h2 = this.prerenderManifest) || null == (d2 = h2.preview) ? void 0 : d2.previewModeId) && (this.isOnDemandRevalidate = true), n10 && (w2 = this.revalidatedTags = function(e11, t11) {
            return "string" == typeof e11[m] && e11["x-next-revalidate-tag-token"] === t11 ? e11[m].split(",") : [];
          }(a2, null == (g2 = this.prerenderManifest) || null == (f2 = g2.preview) ? void 0 : f2.previewModeId)), u2 && (this.cacheHandler = new u2({ dev: t10, fs: e10, flushToDisk: r10, serverDistDir: i2, revalidatedTags: w2, maxMemoryCacheSize: o2, _requestHeaders: a2, fetchCacheKeyPrefix: l2 }));
        }
        calculateRevalidate(e10, t10, r10, n10) {
          if (r10) return Math.floor(performance.timeOrigin + performance.now() - 1e3);
          let i2 = this.cacheControls.get(rr(e10)), a2 = i2 ? i2.revalidate : !n10 && 1;
          return "number" == typeof a2 ? 1e3 * a2 + t10 : a2;
        }
        _getPathname(e10, t10) {
          return t10 ? e10 : /^\/index(\/|$)/.test(e10) && !function(e11, t11 = true) {
            return (void 0 !== e11.split("/").find((e12) => t7.find((t12) => e12.startsWith(t12))) && (e11 = function(e12) {
              let t12, r10, n10;
              for (let i2 of e12.split("/")) if (r10 = t7.find((e13) => i2.startsWith(e13))) {
                [t12, n10] = e12.split(r10, 2);
                break;
              }
              if (!t12 || !r10 || !n10) throw Object.defineProperty(Error(`Invalid interception route: ${e12}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`), "__NEXT_ERROR_CODE", { value: "E269", enumerable: false, configurable: true });
              switch (t12 = ev(t12), r10) {
                case "(.)":
                  n10 = "/" === t12 ? `/${n10}` : t12 + "/" + n10;
                  break;
                case "(..)":
                  if ("/" === t12) throw Object.defineProperty(Error(`Invalid interception route: ${e12}. Cannot use (..) marker at the root level, use (.) instead.`), "__NEXT_ERROR_CODE", { value: "E207", enumerable: false, configurable: true });
                  n10 = t12.split("/").slice(0, -1).concat(n10).join("/");
                  break;
                case "(...)":
                  n10 = "/" + n10;
                  break;
                case "(..)(..)":
                  let i2 = t12.split("/");
                  if (i2.length <= 2) throw Object.defineProperty(Error(`Invalid interception route: ${e12}. Cannot use (..)(..) marker at the root level or one level up.`), "__NEXT_ERROR_CODE", { value: "E486", enumerable: false, configurable: true });
                  n10 = i2.slice(0, -2).concat(n10).join("/");
                  break;
                default:
                  throw Object.defineProperty(Error("Invariant: unexpected marker"), "__NEXT_ERROR_CODE", { value: "E112", enumerable: false, configurable: true });
              }
              return { interceptingRoute: t12, interceptedRoute: n10 };
            }(e11).interceptedRoute), t11) ? rt.test(e11) : re.test(e11);
          }(e10) ? `/index${e10}` : "/" === e10 ? "/index" : eb(e10);
        }
        resetRequestCache() {
          var e10, t10;
          null == (t10 = this.cacheHandler) || null == (e10 = t10.resetRequestCache) || e10.call(t10);
        }
        async lock(e10) {
          for (; ; ) {
            let t11 = this.locks.get(e10);
            if (ri.debug && console.log("IncrementalCache: lock get", e10, !!t11), !t11) break;
            await t11;
          }
          let { resolve: t10, promise: r10 } = new tx();
          return ri.debug && console.log("IncrementalCache: successfully locked", e10), this.locks.set(e10, r10), () => {
            t10(), this.locks.delete(e10);
          };
        }
        async revalidateTag(e10, t10) {
          var r10;
          return null == (r10 = this.cacheHandler) ? void 0 : r10.revalidateTag(e10, t10);
        }
        async generateCacheKey(e10, t10 = {}) {
          let r10 = [], n10 = new TextEncoder(), i2 = new TextDecoder();
          if (t10.body) if (t10.body instanceof Uint8Array) r10.push(i2.decode(t10.body)), t10._ogBody = t10.body;
          else if ("function" == typeof t10.body.getReader) {
            let e11 = t10.body, a3 = [];
            try {
              await e11.pipeTo(new WritableStream({ write(e12) {
                "string" == typeof e12 ? (a3.push(n10.encode(e12)), r10.push(e12)) : (a3.push(e12), r10.push(i2.decode(e12, { stream: true })));
              } })), r10.push(i2.decode());
              let o3 = a3.reduce((e12, t11) => e12 + t11.length, 0), s3 = new Uint8Array(o3), l2 = 0;
              for (let e12 of a3) s3.set(e12, l2), l2 += e12.length;
              t10._ogBody = s3;
            } catch (e12) {
              console.error("Problem reading body", e12);
            }
          } else if ("function" == typeof t10.body.keys) {
            let e11 = t10.body;
            for (let n11 of (t10._ogBody = t10.body, /* @__PURE__ */ new Set([...e11.keys()]))) {
              let t11 = e11.getAll(n11);
              r10.push(`${n11}=${(await Promise.all(t11.map(async (e12) => "string" == typeof e12 ? e12 : await e12.text()))).join(",")}`);
            }
          } else if ("function" == typeof t10.body.arrayBuffer) {
            let e11 = t10.body, n11 = await e11.arrayBuffer();
            r10.push(await e11.text()), t10._ogBody = new Blob([n11], { type: e11.type });
          } else "string" == typeof t10.body && (r10.push(t10.body), t10._ogBody = t10.body);
          let a2 = "function" == typeof (t10.headers || {}).keys ? Object.fromEntries(t10.headers) : Object.assign({}, t10.headers);
          "traceparent" in a2 && delete a2.traceparent, "tracestate" in a2 && delete a2.tracestate;
          let o2 = JSON.stringify(["v3", this.fetchCacheKeyPrefix || "", e10, t10.method, a2, t10.mode, t10.redirect, t10.credentials, t10.referrer, t10.referrerPolicy, t10.integrity, t10.cache, r10]);
          {
            var s2;
            let e11 = n10.encode(o2);
            return s2 = await crypto.subtle.digest("SHA-256", e11), Array.prototype.map.call(new Uint8Array(s2), (e12) => e12.toString(16).padStart(2, "0")).join("");
          }
        }
        async get(e10, t10) {
          var r10, n10, i2, a2, o2, s2, l2;
          let u2, c2;
          if (t10.kind === tF.FETCH) {
            let r11 = e7.workUnitAsyncStorageInstance.getStore(), n11 = r11 ? (0, e5.getRenderResumeDataCache)(r11) : null;
            if (n11) {
              let r12 = n11.fetch.get(e10);
              if ((null == r12 ? void 0 : r12.kind) === tq.FETCH) {
                let n12 = eC.workAsyncStorageInstance.getStore();
                if (![...t10.tags || [], ...t10.softTags || []].some((e11) => {
                  var t11, r13;
                  return (null == (t11 = this.revalidatedTags) ? void 0 : t11.includes(e11)) || (null == n12 || null == (r13 = n12.pendingRevalidatedTags) ? void 0 : r13.some((t12) => t12.tag === e11));
                })) return ri.debug && console.log("IncrementalCache: rdc:hit", e10), { isStale: false, value: r12 };
                ri.debug && console.log("IncrementalCache: rdc:revalidated-tag", e10);
              } else ri.debug && console.log("IncrementalCache: rdc:miss", e10);
            } else ri.debug && console.log("IncrementalCache: rdc:no-resume-data");
          }
          if (this.disableForTestmode || this.dev && (t10.kind !== tF.FETCH || "no-cache" === this.requestHeaders["cache-control"])) return null;
          e10 = this._getPathname(e10, t10.kind === tF.FETCH);
          let d2 = await (null == (r10 = this.cacheHandler) ? void 0 : r10.get(e10, t10));
          if (t10.kind === tF.FETCH) {
            if (!d2) return null;
            if ((null == (i2 = d2.value) ? void 0 : i2.kind) !== tq.FETCH) throw Object.defineProperty(new tt(`Expected cached value for cache key ${JSON.stringify(e10)} to be a "FETCH" kind, got ${JSON.stringify(null == (a2 = d2.value) ? void 0 : a2.kind)} instead.`), "__NEXT_ERROR_CODE", { value: "E653", enumerable: false, configurable: true });
            let r11 = eC.workAsyncStorageInstance.getStore(), n11 = [...t10.tags || [], ...t10.softTags || []];
            if (n11.some((e11) => {
              var t11, n12;
              return (null == (t11 = this.revalidatedTags) ? void 0 : t11.includes(e11)) || (null == r11 || null == (n12 = r11.pendingRevalidatedTags) ? void 0 : n12.some((t12) => t12.tag === e11));
            })) return ri.debug && console.log("IncrementalCache: expired tag", e10), null;
            let o3 = e7.workUnitAsyncStorageInstance.getStore();
            if (o3) {
              let t11 = (0, e5.getPrerenderResumeDataCache)(o3);
              t11 && (ri.debug && console.log("IncrementalCache: rdc:set", e10), t11.fetch.set(e10, d2.value));
            }
            let s3 = t10.revalidate || d2.value.revalidate, l3 = (performance.timeOrigin + performance.now() - (d2.lastModified || 0)) / 1e3 > s3, u3 = d2.value.data;
            return t3(n11, d2.lastModified) ? null : (t8(n11, d2.lastModified) && (l3 = true), { isStale: l3, value: { kind: tq.FETCH, data: u3, revalidate: s3 } });
          }
          if ((null == d2 || null == (n10 = d2.value) ? void 0 : n10.kind) === tq.FETCH) throw Object.defineProperty(new tt(`Expected cached value for cache key ${JSON.stringify(e10)} not to be a ${JSON.stringify(t10.kind)} kind, got "FETCH" instead.`), "__NEXT_ERROR_CODE", { value: "E652", enumerable: false, configurable: true });
          let h2 = null, { isFallback: f2 } = t10, p2 = this.cacheControls.get(rr(e10));
          if ((null == d2 ? void 0 : d2.lastModified) === -1) u2 = -1, c2 = -31536e6;
          else {
            let r11 = performance.timeOrigin + performance.now(), n11 = (null == d2 ? void 0 : d2.lastModified) || r11;
            if (void 0 === (u2 = false !== (c2 = this.calculateRevalidate(e10, n11, this.dev ?? false, t10.isFallback)) && c2 < r11 || void 0) && ((null == d2 || null == (o2 = d2.value) ? void 0 : o2.kind) === tq.APP_PAGE || (null == d2 || null == (s2 = d2.value) ? void 0 : s2.kind) === tq.APP_ROUTE)) {
              let e11 = null == (l2 = d2.value.headers) ? void 0 : l2[A];
              if ("string" == typeof e11) {
                let t11 = e11.split(",");
                t11.length > 0 && (t3(t11, n11) ? u2 = -1 : t8(t11, n11) && (u2 = true));
              }
            }
          }
          return d2 && (h2 = { isStale: u2, cacheControl: p2, revalidateAfter: c2, value: d2.value, isFallback: f2 }), !d2 && this.prerenderManifest.notFoundRoutes.includes(e10) && (h2 = { isStale: u2, value: null, cacheControl: p2, revalidateAfter: c2, isFallback: f2 }, this.set(e10, h2.value, { ...t10, cacheControl: p2 })), h2;
        }
        async set(e10, t10, r10) {
          if ((null == t10 ? void 0 : t10.kind) === tq.FETCH) {
            let r11 = e7.workUnitAsyncStorageInstance.getStore(), n11 = r11 ? (0, e5.getPrerenderResumeDataCache)(r11) : null;
            n11 && (ri.debug && console.log("IncrementalCache: rdc:set", e10), n11.fetch.set(e10, t10));
          }
          if (this.disableForTestmode || this.dev && !r10.fetchCache) return;
          e10 = this._getPathname(e10, r10.fetchCache);
          let n10 = JSON.stringify(t10).length;
          if (r10.fetchCache && n10 > 2097152 && !this.hasCustomCacheHandler && !r10.isImplicitBuildTimeCache) {
            let t11 = `Failed to set Next.js data cache for ${r10.fetchUrl || e10}, items over 2MB can not be cached (${n10} bytes)`;
            if (this.dev) throw Object.defineProperty(Error(t11), "__NEXT_ERROR_CODE", { value: "E1003", enumerable: false, configurable: true });
            console.warn(t11);
            return;
          }
          try {
            var i2;
            !r10.fetchCache && r10.cacheControl && this.cacheControls.set(rr(e10), r10.cacheControl), await (null == (i2 = this.cacheHandler) ? void 0 : i2.set(e10, t10, r10));
          } catch (t11) {
            console.warn("Failed to update prerender cache for", e10, t11);
          }
        }
      }
      e.i(64445), e.i(63072);
      var ra = e.i(40049);
      let ro = { current: null }, rs = "function" == typeof ra.cache ? ra.cache : (e10) => e10, rl = console.warn;
      function ru(e10) {
        return function(...t10) {
          rl(e10(...t10));
        };
      }
      rs((e10) => {
        try {
          rl(ro.current);
        } finally {
          ro.current = null;
        }
      }), /* @__PURE__ */ new WeakMap(), ru(function(e10, t10) {
        let r10 = e10 ? `Route "${e10}" ` : "This route ";
        return Object.defineProperty(Error(`${r10}used ${t10}. \`cookies()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E830", enumerable: false, configurable: true });
      }), /* @__PURE__ */ new WeakMap(), ru(function(e10, t10) {
        let r10 = e10 ? `Route "${e10}" ` : "This route ";
        return Object.defineProperty(Error(`${r10}used ${t10}. \`headers()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E836", enumerable: false, configurable: true });
      });
      var eC = eC, e7 = e7;
      e.i(18368), /* @__PURE__ */ new WeakMap(), ru(function(e10, t10) {
        let r10 = e10 ? `Route "${e10}" ` : "This route ";
        return Object.defineProperty(Error(`${r10}used ${t10}. \`draftMode()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E835", enumerable: false, configurable: true });
      });
      URLSearchParams, e.r(91375).actionAsyncStorage, e.r(82748).unstable_rethrow;
      var rc = e.i(3466), rd = Object.defineProperty, rh = {}, rf = { $: () => rA, bgBlack: () => rM, bgBlue: () => rq, bgCyan: () => rQ, bgGreen: () => rj, bgMagenta: () => rF, bgRed: () => r$, bgWhite: () => rU, bgYellow: () => rL, black: () => rI, blue: () => rP, bold: () => rw, cyan: () => rN, dim: () => rb, gray: () => rB, green: () => rT, grey: () => rD, hidden: () => rC, inverse: () => r_, italic: () => rv, magenta: () => rR, red: () => rS, reset: () => ry, strikethrough: () => rx, underline: () => rE, white: () => rk, yellow: () => rO };
      for (var rp in rf) rd(rh, rp, { get: rf[rp], enumerable: true });
      var rg = true;
      "u" > typeof process && ({ FORCE_COLOR: ee, NODE_DISABLE_COLORS: et, NO_COLOR: er, TERM: en } = process.env || {}, rg = process.stdout && process.stdout.isTTY);
      var rA = { enabled: !et && null == er && "dumb" !== en && (null != ee && "0" !== ee || rg) };
      function rm(e10, t10) {
        let r10 = RegExp(`\\x1b\\[${t10}m`, "g"), n10 = `\x1B[${e10}m`, i2 = `\x1B[${t10}m`;
        return function(e11) {
          return rA.enabled && null != e11 ? n10 + (~("" + e11).indexOf(i2) ? e11.replace(r10, i2 + n10) : e11) + i2 : e11;
        };
      }
      var ry = rm(0, 0), rw = rm(1, 22), rb = rm(2, 22), rv = rm(3, 23), rE = rm(4, 24), r_ = rm(7, 27), rC = rm(8, 28), rx = rm(9, 29), rI = rm(30, 39), rS = rm(31, 39), rT = rm(32, 39), rO = rm(33, 39), rP = rm(34, 39), rR = rm(35, 39), rN = rm(36, 39), rk = rm(37, 39), rB = rm(90, 39), rD = rm(90, 39), rM = rm(40, 49), r$ = rm(41, 49), rj = rm(42, 49), rL = rm(43, 49), rq = rm(44, 49), rF = rm(45, 49), rQ = rm(46, 49), rU = rm(47, 49), rV = ["green", "yellow", "blue", "magenta", "cyan", "red"], rH = [], rW = Date.now(), rG = 0, rX = "u" > typeof process ? process.env : {};
      globalThis.DEBUG ??= rX.DEBUG ?? "", globalThis.DEBUG_COLORS ??= !rX.DEBUG_COLORS || "true" === rX.DEBUG_COLORS;
      var rJ = { enable(e10) {
        "string" == typeof e10 && (globalThis.DEBUG = e10);
      }, disable() {
        let e10 = globalThis.DEBUG;
        return globalThis.DEBUG = "", e10;
      }, enabled(e10) {
        let t10 = globalThis.DEBUG.split(",").map((e11) => e11.replace(/[.+?^${}()|[\]\\]/g, "\\$&")), r10 = t10.some((t11) => "" !== t11 && "-" !== t11[0] && e10.match(RegExp(t11.split("*").join(".*") + "$"))), n10 = t10.some((t11) => "" !== t11 && "-" === t11[0] && e10.match(RegExp(t11.slice(1).split("*").join(".*") + "$")));
        return r10 && !n10;
      }, log: (...e10) => {
        let [t10, r10, ...n10] = e10;
        (console.warn ?? console.log)(`${t10} ${r10}`, ...n10);
      }, formatters: {} }, rz = new Proxy(function(e10) {
        let t10 = { color: rV[rG++ % rV.length], enabled: rJ.enabled(e10), namespace: e10, log: rJ.log, extend: () => {
        } };
        return new Proxy((...e11) => {
          let { enabled: r10, namespace: n10, color: i2, log: a2 } = t10;
          if (0 !== e11.length && rH.push([n10, ...e11]), rH.length > 100 && rH.shift(), rJ.enabled(n10) || r10) {
            let t11 = e11.map((e12) => "string" == typeof e12 ? e12 : function(e13, t12 = 2) {
              let r12 = /* @__PURE__ */ new Set();
              return JSON.stringify(e13, (e14, t13) => {
                if ("object" == typeof t13 && null !== t13) {
                  if (r12.has(t13)) return "[Circular *]";
                  r12.add(t13);
                } else if ("bigint" == typeof t13) return t13.toString();
                return t13;
              }, t12);
            }(e12)), r11 = `+${Date.now() - rW}ms`;
            rW = Date.now(), globalThis.DEBUG_COLORS ? a2(rh[i2](rw(n10)), ...t11, rh[i2](r11)) : a2(n10, ...t11, r11);
          }
        }, { get: (e11, r10) => t10[r10], set: (e11, r10, n10) => t10[r10] = n10 });
      }, { get: (e10, t10) => rJ[t10], set: (e10, t10, r10) => rJ[t10] = r10 }), rK = class extends Error {
        name = "DriverAdapterError";
        cause;
        constructor(e10) {
          super("string" == typeof e10.message ? e10.message : e10.kind), this.cause = e10;
        }
      };
      rz("driver-adapter-utils");
      Error("Not implemented: queryRaw"), Error("Not implemented: executeRaw"), Error("Not implemented: startTransaction"), Error("Not implemented: executeScript"), Error("Not implemented: dispose");
      var rY = e.i(84560);
      Error("timeout while waiting for mutex to become available"), Error("mutex already locked");
      var rZ = Error("request for lock canceled"), r0 = class {
        constructor(e10, t10 = rZ) {
          this._value = e10, this._cancelError = t10, this._queue = [], this._weightedWaiters = [];
        }
        acquire(e10 = 1, t10 = 0) {
          if (e10 <= 0) throw Error(`invalid weight ${e10}: must be positive`);
          return new Promise((r10, n10) => {
            let i2 = { resolve: r10, reject: n10, weight: e10, priority: t10 }, a2 = r1(this._queue, (e11) => t10 <= e11.priority);
            -1 === a2 && e10 <= this._value ? this._dispatchItem(i2) : this._queue.splice(a2 + 1, 0, i2);
          });
        }
        runExclusive(e10) {
          var t10, r10, n10, i2;
          return t10 = this, r10 = arguments, n10 = void 0, i2 = function* (e11, t11 = 1, r11 = 0) {
            let [n11, i3] = yield this.acquire(t11, r11);
            try {
              return yield e11(n11);
            } finally {
              i3();
            }
          }, new (n10 || (n10 = Promise))(function(e11, a2) {
            function o2(e12) {
              try {
                l2(i2.next(e12));
              } catch (e13) {
                a2(e13);
              }
            }
            function s2(e12) {
              try {
                l2(i2.throw(e12));
              } catch (e13) {
                a2(e13);
              }
            }
            function l2(t11) {
              var r11;
              t11.done ? e11(t11.value) : ((r11 = t11.value) instanceof n10 ? r11 : new n10(function(e12) {
                e12(r11);
              })).then(o2, s2);
            }
            l2((i2 = i2.apply(t10, r10 || [])).next());
          });
        }
        waitForUnlock(e10 = 1, t10 = 0) {
          if (e10 <= 0) throw Error(`invalid weight ${e10}: must be positive`);
          return this._couldLockImmediately(e10, t10) ? Promise.resolve() : new Promise((r10) => {
            var n10, i2;
            let a2;
            this._weightedWaiters[e10 - 1] || (this._weightedWaiters[e10 - 1] = []), n10 = this._weightedWaiters[e10 - 1], i2 = { resolve: r10, priority: t10 }, a2 = r1(n10, (e11) => i2.priority <= e11.priority), n10.splice(a2 + 1, 0, i2);
          });
        }
        isLocked() {
          return this._value <= 0;
        }
        getValue() {
          return this._value;
        }
        setValue(e10) {
          this._value = e10, this._dispatchQueue();
        }
        release(e10 = 1) {
          if (e10 <= 0) throw Error(`invalid weight ${e10}: must be positive`);
          this._value += e10, this._dispatchQueue();
        }
        cancel() {
          this._queue.forEach((e10) => e10.reject(this._cancelError)), this._queue = [];
        }
        _dispatchQueue() {
          for (this._drainUnlockWaiters(); this._queue.length > 0 && this._queue[0].weight <= this._value; ) this._dispatchItem(this._queue.shift()), this._drainUnlockWaiters();
        }
        _dispatchItem(e10) {
          let t10 = this._value;
          this._value -= e10.weight, e10.resolve([t10, this._newReleaser(e10.weight)]);
        }
        _newReleaser(e10) {
          let t10 = false;
          return () => {
            t10 || (t10 = true, this.release(e10));
          };
        }
        _drainUnlockWaiters() {
          if (0 === this._queue.length) for (let e10 = this._value; e10 > 0; e10--) {
            let t10 = this._weightedWaiters[e10 - 1];
            t10 && (t10.forEach((e11) => e11.resolve()), this._weightedWaiters[e10 - 1] = []);
          }
          else {
            let e10 = this._queue[0].priority;
            for (let t10 = this._value; t10 > 0; t10--) {
              let r10 = this._weightedWaiters[t10 - 1];
              if (!r10) continue;
              let n10 = r10.findIndex((t11) => t11.priority <= e10);
              (-1 === n10 ? r10 : r10.splice(0, n10)).forEach((e11) => e11.resolve());
            }
          }
        }
        _couldLockImmediately(e10, t10) {
          return (0 === this._queue.length || this._queue[0].priority < t10) && e10 <= this._value;
        }
      };
      function r1(e10, t10) {
        for (let r10 = e10.length - 1; r10 >= 0; r10--) if (t10(e10[r10])) return r10;
        return -1;
      }
      var r2 = class {
        constructor(e10) {
          this._semaphore = new r0(1, e10);
        }
        acquire() {
          var e10, t10, r10, n10;
          return e10 = this, t10 = arguments, r10 = void 0, n10 = function* (e11 = 0) {
            let [, t11] = yield this._semaphore.acquire(1, e11);
            return t11;
          }, new (r10 || (r10 = Promise))(function(i2, a2) {
            function o2(e11) {
              try {
                l2(n10.next(e11));
              } catch (e12) {
                a2(e12);
              }
            }
            function s2(e11) {
              try {
                l2(n10.throw(e11));
              } catch (e12) {
                a2(e12);
              }
            }
            function l2(e11) {
              var t11;
              e11.done ? i2(e11.value) : ((t11 = e11.value) instanceof r10 ? t11 : new r10(function(e12) {
                e12(t11);
              })).then(o2, s2);
            }
            l2((n10 = n10.apply(e10, t10 || [])).next());
          });
        }
        runExclusive(e10, t10 = 0) {
          return this._semaphore.runExclusive(() => e10(), 1, t10);
        }
        isLocked() {
          return this._semaphore.isLocked();
        }
        waitForUnlock(e10 = 0) {
          return this._semaphore.waitForUnlock(1, e10);
        }
        release() {
          this._semaphore.isLocked() && this._semaphore.release();
        }
        cancel() {
          return this._semaphore.cancel();
        }
      }, r4 = "@prisma/adapter-better-sqlite3", r3 = rz("prisma:driver-adapter:better-sqlite3:conversion"), r8 = class extends Error {
        name = "UnexpectedTypeError";
        constructor(e10) {
          const t10 = typeof e10, r10 = "object" === t10 ? JSON.stringify(e10) : String(e10);
          super(`unexpected value of type ${t10}: ${r10}`);
        }
      };
      function r6(e10, t10, r10) {
        if (null === e10) return null;
        if ("string" == typeof e10 && "int" === t10.scalarType) return Number.parseInt(e10);
        if ("string" == typeof e10 && "float" === t10.scalarType || "string" == typeof e10 && "decimal" === t10.scalarType) return Number.parseFloat(e10);
        if ("string" == typeof e10 && "bigint" === t10.scalarType) return BigInt(e10);
        if ("boolean" == typeof e10) return +!!e10;
        if ("string" == typeof e10 && "datetime" === t10.scalarType && (e10 = new Date(e10)), e10 instanceof Date) {
          let t11 = r10?.timestampFormat ?? "iso8601";
          switch (t11) {
            case "unixepoch-ms":
              return e10.getTime();
            case "iso8601":
              return e10.toISOString().replace("Z", "+00:00");
            default:
              throw Error(`Unknown timestamp format: ${t11}`);
          }
        }
        return "string" == typeof e10 && "bytes" === t10.scalarType ? tr.Buffer.from(e10, "base64") : e10;
      }
      var r9 = rz("prisma:driver-adapter:better-sqlite3"), r5 = class {
        constructor(e10, t10) {
          this.client = e10, this.adapterOptions = t10;
        }
        provider = "sqlite";
        adapterName = r4;
        async queryRaw(e10) {
          r9("[js::queryRaw] %O", e10);
          let { columnNames: t10, declaredTypes: r10, values: n10 } = await this.performIO(e10), i2 = function(e11, t11) {
            let r11, [n11, i3] = (r11 = /* @__PURE__ */ new Set(), [e11.map((e12, t12) => {
              let n12 = function(e13) {
                if (null === e13) return null;
                switch (e13.toUpperCase()) {
                  case "":
                    return null;
                  case "DECIMAL":
                    return 4;
                  case "FLOAT":
                    return 2;
                  case "DOUBLE":
                  case "DOUBLE PRECISION":
                  case "NUMERIC":
                  case "REAL":
                    return 3;
                  case "TINYINT":
                  case "SMALLINT":
                  case "MEDIUMINT":
                  case "INT":
                  case "INTEGER":
                  case "SERIAL":
                  case "INT2":
                    return 0;
                  case "BIGINT":
                  case "UNSIGNED BIG INT":
                  case "INT8":
                    return 1;
                  case "DATETIME":
                  case "TIMESTAMP":
                    return 10;
                  case "TIME":
                    return 9;
                  case "DATE":
                    return 8;
                  case "TEXT":
                  case "CLOB":
                  case "CHARACTER":
                  case "VARCHAR":
                  case "VARYING CHARACTER":
                  case "NCHAR":
                  case "NATIVE CHARACTER":
                  case "NVARCHAR":
                    return 7;
                  case "BLOB":
                    return 13;
                  case "BOOLEAN":
                    return 5;
                  case "JSONB":
                    return 11;
                  default:
                    return r3("unknown decltype:", e13), null;
                }
              }(e12);
              return null === n12 && r11.add(t12), n12;
            }), r11]);
            if (0 === i3.size) return n11;
            t: for (let e12 of i3) {
              for (let r12 = 0; r12 < t11.length; r12++) {
                let i4 = t11[r12][e12];
                if (null !== i4) {
                  n11[e12] = function(e13) {
                    switch (typeof e13) {
                      case "string":
                        return 7;
                      case "bigint":
                        return 1;
                      case "boolean":
                        return 5;
                      case "number":
                        return 128;
                      case "object":
                        var t12 = e13;
                        if (t12 instanceof ArrayBuffer) return 13;
                        throw new r8(t12);
                      default:
                        throw new r8(e13);
                    }
                  }(i4);
                  continue t;
                }
              }
              n11[e12] = 0;
            }
            return n11;
          }(r10, n10);
          return { columnNames: t10, columnTypes: i2, rows: n10.map((e11) => function(e12, t11) {
            let r11 = [];
            for (let n11 = 0; n11 < e12.length; n11++) {
              let i3 = e12[n11];
              if ("number" == typeof i3 && (0 === t11[n11] || 1 === t11[n11]) && !Number.isInteger(i3)) {
                r11[n11] = Math.trunc(i3);
                continue;
              }
              if (["number", "bigint"].includes(typeof i3) && 10 === t11[n11]) {
                r11[n11] = new Date(Number(i3)).toISOString();
                continue;
              }
              if ("bigint" == typeof i3) {
                let e13 = Number(i3);
                r11[n11] = Number.isSafeInteger(e13) ? e13 : i3.toString();
                continue;
              }
              r11[n11] = i3;
            }
            return r11;
          }(e11, i2)) };
        }
        async executeRaw(e10) {
          return r9("[js::executeRaw] %O", e10), (await this.executeIO(e10)).changes;
        }
        executeIO(e10) {
          try {
            let t10 = e10.args.map((t11, r11) => r6(t11, e10.argTypes[r11], this.adapterOptions)), r10 = this.client.prepare(e10.sql).bind(t10).run();
            return Promise.resolve(r10);
          } catch (e11) {
            this.onError(e11);
          }
        }
        performIO(e10) {
          try {
            let t10 = e10.args.map((t11, r11) => r6(t11, e10.argTypes[r11], this.adapterOptions)), r10 = this.client.prepare(e10.sql).bind(t10);
            if (!r10.reader) return r10.run(), Promise.resolve({ columnNames: [], declaredTypes: [], values: [] });
            let n10 = r10.columns(), i2 = { declaredTypes: n10.map((e11) => e11.type), columnNames: n10.map((e11) => e11.name), values: r10.raw().all() };
            return Promise.resolve(i2);
          } catch (e11) {
            this.onError(e11);
          }
        }
        onError(e10) {
          throw r9("Error in performIO: %O", e10), new rK(function(e11) {
            var t10;
            if ("string" == typeof (t10 = e11).code && "string" == typeof t10.message) return { originalCode: e11.code, originalMessage: e11.message, ...function(e12) {
              switch (e12.code) {
                case "SQLITE_BUSY":
                  return { kind: "SocketTimeout" };
                case "SQLITE_CONSTRAINT_UNIQUE":
                case "SQLITE_CONSTRAINT_PRIMARYKEY": {
                  let t11 = e12.message.split("constraint failed: ").at(1)?.split(", ").map((e13) => e13.split(".").pop());
                  return { kind: "UniqueConstraintViolation", constraint: void 0 !== t11 ? { fields: t11 } : void 0 };
                }
                case "SQLITE_CONSTRAINT_NOTNULL": {
                  let t11 = e12.message.split("constraint failed: ").at(1)?.split(", ").map((e13) => e13.split(".").pop());
                  return { kind: "NullConstraintViolation", constraint: void 0 !== t11 ? { fields: t11 } : void 0 };
                }
                case "SQLITE_CONSTRAINT_FOREIGNKEY":
                case "SQLITE_CONSTRAINT_TRIGGER":
                  return { kind: "ForeignKeyConstraintViolation", constraint: { foreignKey: {} } };
                default:
                  if (e12.message.startsWith("no such table")) return { kind: "TableDoesNotExist", table: e12.message.split(": ").at(1) };
                  if (e12.message.startsWith("no such column")) return { kind: "ColumnNotFound", column: e12.message.split(": ").at(1) };
                  if (e12.message.includes("has no column named ")) return { kind: "ColumnNotFound", column: e12.message.split("has no column named ").at(1) };
                  throw e12;
              }
            }(e11) };
            throw e11;
          }(e10));
        }
      }, r7 = class extends r5 {
        constructor(e10, t10, r10, n10) {
          super(e10, r10), this.options = t10, this.#_ = n10;
        }
        #_;
        commit() {
          return r9("[js::commit]"), this.#_(), Promise.resolve();
        }
        rollback() {
          return r9("[js::rollback]"), this.#_(), Promise.resolve();
        }
        async createSavepoint(e10) {
          await this.executeRaw({ sql: `SAVEPOINT ${e10}`, args: [], argTypes: [] });
        }
        async rollbackToSavepoint(e10) {
          await this.executeRaw({ sql: `ROLLBACK TO ${e10}`, args: [], argTypes: [] });
        }
        async releaseSavepoint(e10) {
          await this.executeRaw({ sql: `RELEASE SAVEPOINT ${e10}`, args: [], argTypes: [] });
        }
      }, ne = class extends r5 {
        #C = new r2();
        constructor(e10, t10) {
          super(e10, t10);
        }
        executeScript(e10) {
          try {
            this.client.exec(e10);
          } catch (e11) {
            this.onError(e11);
          }
          return Promise.resolve();
        }
        async startTransaction(e10) {
          if (e10 && "SERIALIZABLE" !== e10) throw new rK({ kind: "InvalidIsolationLevel", level: e10 });
          let t10 = { usePhantomQuery: false };
          r9("%s options: %O", "[js::startTransaction]", t10);
          try {
            let e11 = await this.#C.acquire();
            return this.client.prepare("BEGIN").run(), new r7(this.client, t10, this.adapterOptions, e11);
          } catch (e11) {
            this.onError(e11);
          }
        }
        dispose() {
          return this.client.close(), Promise.resolve();
        }
      }, nt = class {
        provider = "sqlite";
        adapterName = r4;
        #x;
        #I;
        constructor(e10, t10) {
          this.#x = e10, this.#I = t10;
        }
        connect() {
          return Promise.resolve(new ne(nr(this.#x), this.#I));
        }
        connectToShadowDb() {
          let e10 = this.#I?.shadowDatabaseUrl ?? ":memory:";
          return Promise.resolve(new ne(nr({ ...this.#x, url: e10 }), this.#I));
        }
      };
      function nr(e10) {
        let { url: t10, ...r10 } = e10, n10 = t10.replace(/^file:/, ""), i2 = new rY.default(n10, r10);
        return i2.defaultSafeIntegers(true), i2;
      }
      class nn extends Error {
        response;
        request;
        options;
        constructor(e10, t10, r10) {
          const n10 = e10.status || 0 === e10.status ? e10.status : "", i2 = e10.statusText || "", a2 = `${n10} ${i2}`.trim(), o2 = a2 ? `status code ${a2}` : "an unknown error";
          super(`Request failed with ${o2}: ${t10.method} ${t10.url}`), this.name = "HTTPError", this.response = e10, this.request = t10, this.options = r10;
        }
      }
      class ni extends Error {
        request;
        constructor(e10) {
          super(`Request timed out: ${e10.method} ${e10.url}`), this.name = "TimeoutError", this.request = e10;
        }
      }
      let na = (e10) => null !== e10 && "object" == typeof e10, no = (...e10) => {
        for (let t10 of e10) if ((!na(t10) || Array.isArray(t10)) && void 0 !== t10) throw TypeError("The `options` argument must be an object");
        return nc({}, ...e10);
      }, ns = (e10 = {}, t10 = {}) => {
        let r10 = new globalThis.Headers(e10), n10 = t10 instanceof globalThis.Headers;
        for (let [e11, i2] of new globalThis.Headers(t10).entries()) n10 && "undefined" === i2 || void 0 === i2 ? r10.delete(e11) : r10.set(e11, i2);
        return r10;
      };
      function nl(e10, t10, r10) {
        return Object.hasOwn(t10, r10) && void 0 === t10[r10] ? [] : nc(e10[r10] ?? [], t10[r10] ?? []);
      }
      let nu = (e10 = {}, t10 = {}) => ({ beforeRequest: nl(e10, t10, "beforeRequest"), beforeRetry: nl(e10, t10, "beforeRetry"), afterResponse: nl(e10, t10, "afterResponse"), beforeError: nl(e10, t10, "beforeError") }), nc = (...e10) => {
        let t10 = {}, r10 = {}, n10 = {};
        for (let i2 of e10) if (Array.isArray(i2)) Array.isArray(t10) || (t10 = []), t10 = [...t10, ...i2];
        else if (na(i2)) {
          for (let [e11, r11] of Object.entries(i2)) na(r11) && e11 in t10 && (r11 = nc(t10[e11], r11)), t10 = { ...t10, [e11]: r11 };
          na(i2.hooks) && (n10 = nu(n10, i2.hooks), t10.hooks = n10), na(i2.headers) && (r10 = ns(r10, i2.headers), t10.headers = r10);
        }
        return t10;
      }, nd = (() => {
        let e10 = false, t10 = false, r10 = "function" == typeof globalThis.Request;
        if ("function" == typeof globalThis.ReadableStream && r10) try {
          t10 = new globalThis.Request("https://empty.invalid", { body: new globalThis.ReadableStream(), method: "POST", get duplex() {
            return e10 = true, "half";
          } }).headers.has("Content-Type");
        } catch (e11) {
          if (e11 instanceof Error && "unsupported BodyInit type" === e11.message) return false;
          throw e11;
        }
        return e10 && !t10;
      })(), nh = "function" == typeof globalThis.AbortController, nf = "function" == typeof globalThis.ReadableStream, np = "function" == typeof globalThis.FormData, ng = ["get", "post", "put", "patch", "head", "delete"], nA = { json: "application/json", text: "text/*", formData: "multipart/form-data", arrayBuffer: "*/*", blob: "*/*" }, nm = Symbol("stop"), ny = { json: true, parseJson: true, stringifyJson: true, searchParams: true, prefixUrl: true, retry: true, timeout: true, hooks: true, throwHttpErrors: true, onDownloadProgress: true, fetch: true }, nw = { method: true, headers: true, body: true, mode: true, credentials: true, cache: true, redirect: true, referrer: true, referrerPolicy: true, integrity: true, keepalive: true, signal: true, window: true, dispatcher: true, duplex: true, priority: true }, nb = { limit: 2, methods: ["get", "put", "head", "delete", "options", "trace"], statusCodes: [408, 413, 429, 500, 502, 503, 504], afterStatusCodes: [413, 429, 503], maxRetryAfter: 1 / 0, backoffLimit: 1 / 0, delay: (e10) => 0.3 * 2 ** (e10 - 1) * 1e3 };
      async function nv(e10, t10, r10, n10) {
        return new Promise((i2, a2) => {
          let o2 = setTimeout(() => {
            r10 && r10.abort(), a2(new ni(e10));
          }, n10.timeout);
          n10.fetch(e10, t10).then(i2).catch(a2).then(() => {
            clearTimeout(o2);
          });
        });
      }
      async function nE(e10, { signal: t10 }) {
        return new Promise((r10, n10) => {
          function i2() {
            clearTimeout(a2), n10(t10.reason);
          }
          t10 && (t10.throwIfAborted(), t10.addEventListener("abort", i2, { once: true }));
          let a2 = setTimeout(() => {
            t10?.removeEventListener("abort", i2), r10();
          }, e10);
        });
      }
      class n_ {
        static create(e10, t10) {
          let r10 = new n_(e10, t10), n10 = async () => {
            if ("number" == typeof r10._options.timeout && r10._options.timeout > 2147483647) throw RangeError("The `timeout` option cannot be greater than 2147483647");
            await Promise.resolve();
            let e11 = await r10._fetch();
            for (let t11 of r10._options.hooks.afterResponse) {
              let n11 = await t11(r10.request, r10._options, r10._decorateResponse(e11.clone()));
              n11 instanceof globalThis.Response && (e11 = n11);
            }
            if (r10._decorateResponse(e11), !e11.ok && r10._options.throwHttpErrors) {
              let t11 = new nn(e11, r10.request, r10._options);
              for (let e12 of r10._options.hooks.beforeError) t11 = await e12(t11);
              throw t11;
            }
            if (r10._options.onDownloadProgress) {
              if ("function" != typeof r10._options.onDownloadProgress) throw TypeError("The `onDownloadProgress` option must be a function");
              if (!nf) throw Error("Streams are not supported in your environment. `ReadableStream` is missing.");
              return r10._stream(e11.clone(), r10._options.onDownloadProgress);
            }
            return e11;
          }, i2 = r10._options.retry.methods.includes(r10.request.method.toLowerCase()) ? r10._retry(n10) : n10();
          for (let [e11, n11] of Object.entries(nA)) i2[e11] = async () => {
            r10.request.headers.set("accept", r10.request.headers.get("accept") || n11);
            let a2 = await i2;
            if ("json" === e11) {
              if (204 === a2.status || 0 === (await a2.clone().arrayBuffer()).byteLength) return "";
              if (t10.parseJson) return t10.parseJson(await a2.text());
            }
            return a2[e11]();
          };
          return i2;
        }
        request;
        abortController;
        _retryCount = 0;
        _input;
        _options;
        constructor(e10, t10 = {}) {
          if (this._input = e10, this._options = { ...t10, headers: ns(this._input.headers, t10.headers), hooks: nu({ beforeRequest: [], beforeRetry: [], beforeError: [], afterResponse: [] }, t10.hooks), method: ((e11) => ng.includes(e11) ? e11.toUpperCase() : e11)(t10.method ?? this._input.method ?? "GET"), prefixUrl: String(t10.prefixUrl || ""), retry: ((e11 = {}) => {
            if ("number" == typeof e11) return { ...nb, limit: e11 };
            if (e11.methods && !Array.isArray(e11.methods)) throw Error("retry.methods must be an array");
            if (e11.statusCodes && !Array.isArray(e11.statusCodes)) throw Error("retry.statusCodes must be an array");
            return { ...nb, ...e11 };
          })(t10.retry), throwHttpErrors: false !== t10.throwHttpErrors, timeout: t10.timeout ?? 1e4, fetch: t10.fetch ?? globalThis.fetch.bind(globalThis) }, "string" != typeof this._input && !(this._input instanceof URL || this._input instanceof globalThis.Request)) throw TypeError("`input` must be a string, URL, or Request");
          if (this._options.prefixUrl && "string" == typeof this._input) {
            if (this._input.startsWith("/")) throw Error("`input` must not begin with a slash when using `prefixUrl`");
            this._options.prefixUrl.endsWith("/") || (this._options.prefixUrl += "/"), this._input = this._options.prefixUrl + this._input;
          }
          if (nh) {
            this.abortController = new globalThis.AbortController();
            const e11 = this._options.signal ?? this._input.signal;
            e11?.aborted && this.abortController.abort(e11?.reason), e11?.addEventListener("abort", () => {
              this.abortController.abort(e11.reason);
            }), this._options.signal = this.abortController.signal;
          }
          if (nd && (this._options.duplex = "half"), void 0 !== this._options.json && (this._options.body = this._options.stringifyJson?.(this._options.json) ?? JSON.stringify(this._options.json), this._options.headers.set("content-type", this._options.headers.get("content-type") ?? "application/json")), this.request = new globalThis.Request(this._input, this._options), this._options.searchParams) {
            const e11 = "string" == typeof this._options.searchParams ? this._options.searchParams.replace(/^\?/, "") : new URLSearchParams(this._options.searchParams).toString(), t11 = this.request.url.replace(/(?:\?.*?)?(?=#|$)/, "?" + e11);
            (np && this._options.body instanceof globalThis.FormData || this._options.body instanceof URLSearchParams) && !(this._options.headers && this._options.headers["content-type"]) && this.request.headers.delete("content-type"), this.request = new globalThis.Request(new globalThis.Request(t11, { ...this.request }), this._options);
          }
        }
        _calculateRetryDelay(e10) {
          if (this._retryCount++, this._retryCount > this._options.retry.limit || e10 instanceof ni) throw e10;
          if (e10 instanceof nn) {
            if (!this._options.retry.statusCodes.includes(e10.response.status)) throw e10;
            let t11 = e10.response.headers.get("Retry-After") ?? e10.response.headers.get("RateLimit-Reset") ?? e10.response.headers.get("X-RateLimit-Reset") ?? e10.response.headers.get("X-Rate-Limit-Reset");
            if (t11 && this._options.retry.afterStatusCodes.includes(e10.response.status)) {
              let e11 = 1e3 * Number(t11);
              Number.isNaN(e11) ? e11 = Date.parse(t11) - Date.now() : e11 >= Date.parse("2024-01-01") && (e11 -= Date.now());
              let r10 = this._options.retry.maxRetryAfter ?? e11;
              return e11 < r10 ? e11 : r10;
            }
            if (413 === e10.response.status) throw e10;
          }
          let t10 = this._options.retry.delay(this._retryCount);
          return Math.min(this._options.retry.backoffLimit, t10);
        }
        _decorateResponse(e10) {
          return this._options.parseJson && (e10.json = async () => this._options.parseJson(await e10.text())), e10;
        }
        async _retry(e10) {
          try {
            return await e10();
          } catch (r10) {
            let t10 = Math.min(this._calculateRetryDelay(r10), 2147483647);
            if (this._retryCount < 1) throw r10;
            for (let e11 of (await nE(t10, { signal: this._options.signal }), this._options.hooks.beforeRetry)) if (await e11({ request: this.request, options: this._options, error: r10, retryCount: this._retryCount }) === nm) return;
            return this._retry(e10);
          }
        }
        async _fetch() {
          for (let e11 of this._options.hooks.beforeRequest) {
            let t11 = await e11(this.request, this._options);
            if (t11 instanceof Request) {
              this.request = t11;
              break;
            }
            if (t11 instanceof Response) return t11;
          }
          let e10 = ((e11, t11) => {
            let r10 = {};
            for (let n10 in t11) n10 in nw || n10 in ny || n10 in e11 || (r10[n10] = t11[n10]);
            return r10;
          })(this.request, this._options), t10 = this.request;
          return (this.request = t10.clone(), false === this._options.timeout) ? this._options.fetch(t10, e10) : nv(t10, e10, this.abortController, this._options);
        }
        _stream(e10, t10) {
          let r10 = Number(e10.headers.get("content-length")) || 0, n10 = 0;
          return 204 === e10.status ? (t10 && t10({ percent: 1, totalBytes: r10, transferredBytes: n10 }, new Uint8Array()), new globalThis.Response(null, { status: e10.status, statusText: e10.statusText, headers: e10.headers })) : new globalThis.Response(new globalThis.ReadableStream({ async start(i2) {
            let a2 = e10.body.getReader();
            async function o2() {
              let { done: e11, value: s2 } = await a2.read();
              e11 ? i2.close() : (t10 && (n10 += s2.byteLength, t10({ percent: 0 === r10 ? 0 : n10 / r10, transferredBytes: n10, totalBytes: r10 }, s2)), i2.enqueue(s2), await o2());
            }
            t10 && t10({ percent: 0, transferredBytes: 0, totalBytes: r10 }, new Uint8Array()), await o2();
          } }), { status: e10.status, statusText: e10.statusText, headers: e10.headers });
        }
      }
      let nC = (e10) => {
        let t10 = (t11, r10) => n_.create(t11, no(e10, r10));
        for (let r10 of ng) t10[r10] = (t11, n10) => n_.create(t11, no(e10, n10, { method: r10 }));
        return t10.create = (e11) => nC(no(e11)), t10.extend = (t11) => ("function" == typeof t11 && (t11 = t11(e10 ?? {})), nC(no(e10, t11))), t10.stop = nm, t10;
      }, nx = nC();
      var nI = "@prisma/adapter-d1", nS = true;
      "u" > typeof process && ({ FORCE_COLOR: ei, NODE_DISABLE_COLORS: ea, NO_COLOR: eo, TERM: es } = process.env || {}, nS = process.stdout && process.stdout.isTTY);
      var nT = { enabled: !ea && null == eo && "dumb" !== es && (null != ei && "0" !== ei || nS) };
      function nO(e10, t10) {
        let r10 = RegExp(`\\x1b\\[${t10}m`, "g"), n10 = `\x1B[${e10}m`, i2 = `\x1B[${t10}m`;
        return function(e11) {
          return nT.enabled && null != e11 ? n10 + (~("" + e11).indexOf(i2) ? e11.replace(r10, i2 + n10) : e11) + i2 : e11;
        };
      }
      nO(0, 0), nO(1, 22), nO(2, 22), nO(3, 23), nO(4, 24), nO(7, 27), nO(8, 28), nO(9, 29), nO(30, 39);
      var nP = nO(31, 39);
      nO(32, 39);
      var nR = nO(33, 39), nN = nO(34, 39);
      nO(35, 39);
      var nk = nO(36, 39);
      function nB(e10, t10) {
        let r10 = [];
        t: for (let n10 = 0; n10 < e10.length; n10++) {
          for (let e11 = 0; e11 < t10.length; e11++) {
            let i2 = t10[e11][n10];
            if (null !== i2) {
              let e12 = function(e13) {
                switch (typeof e13) {
                  case "string":
                    return function(e14) {
                      return nD.test(e14) || nM.test(e14) ? 10 : 7;
                    }(e13);
                  case "number":
                    return 128;
                  case "object":
                    var t11 = e13;
                    if (t11 instanceof Array) return 13;
                    throw new n$(t11);
                  default:
                    throw new n$(e13);
                }
              }(i2);
              if ((void 0 === r10[n10] || 7 === e12) && (r10[n10] = e12), 128 !== e12) continue t;
            }
          }
          void 0 === r10[n10] && (r10[n10] = 0);
        }
        return r10;
      }
      nO(37, 39), nO(90, 39), nO(90, 39), nO(40, 49), nO(41, 49), nO(42, 49), nO(43, 49), nO(44, 49), nO(45, 49), nO(46, 49), nO(47, 49);
      var nD = new RegExp(/^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))$|^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$|^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/), nM = /^\d{4}-[0-1]\d-[0-3]\d [0-2]\d:[0-5]\d:[0-5]\d$/, n$ = class extends Error {
        name = "UnexpectedTypeError";
        constructor(e10) {
          const t10 = typeof e10, r10 = "object" === t10 ? JSON.stringify(e10) : String(e10);
          super(`unexpected value of type ${t10}: ${r10}`);
        }
      };
      function nj(e10, t10) {
        for (let r10 = 0; r10 < e10.length; r10++) {
          let n10 = e10[r10];
          if (n10 instanceof ArrayBuffer) {
            e10[r10] = new Uint8Array(n10);
            continue;
          }
          if ("number" == typeof n10 && (0 === t10[r10] || 1 === t10[r10]) && !Number.isInteger(n10)) {
            e10[r10] = Math.trunc(n10);
            continue;
          }
          if ("number" == typeof n10 && 7 === t10[r10] || "bigint" == typeof n10) {
            e10[r10] = n10.toString();
            continue;
          }
          5 === t10[r10] && (e10[r10] = JSON.parse(n10));
        }
        return e10;
      }
      function nL(e10, t10) {
        if (null === e10) return null;
        if ("bigint" == typeof e10 || "bigint" === t10.scalarType) {
          let t11 = Number.parseInt(`${e10}`);
          if (!Number.isSafeInteger(t11)) throw Error(`Invalid Int64-encoded value received: ${e10}`);
          return t11;
        }
        return "string" == typeof e10 && "int" === t10.scalarType ? Number.parseInt(e10) : "string" == typeof e10 && "float" === t10.scalarType || "string" == typeof e10 && "decimal" === t10.scalarType ? Number.parseFloat(e10) : true === e10 ? 1 : false === e10 ? 0 : ("string" == typeof e10 && "datetime" === t10.scalarType && (e10 = new Date(e10)), e10 instanceof Date) ? e10.toISOString().replace("Z", "+00:00") : "string" == typeof e10 && "bytes" === t10.scalarType ? Array.from(tr.Buffer.from(e10, "base64")) : e10 instanceof Uint8Array ? Array.from(e10) : e10;
      }
      function nq(e10) {
        if ("string" == typeof e10.message) return { originalMessage: e10.message, ...function(e11) {
          let t10 = e11.message.split("D1_ERROR: ").at(1) ?? e11.message;
          if ((t10 = t10.split("SqliteError: ").at(1) ?? t10).startsWith("UNIQUE constraint failed") || t10.startsWith("PRIMARY KEY constraint failed")) {
            let e12 = t10.split(": ").at(1)?.split(", ").map((e13) => e13.split(".").pop());
            return { kind: "UniqueConstraintViolation", constraint: void 0 !== e12 ? { fields: e12 } : void 0 };
          }
          if (t10.startsWith("NOT NULL constraint failed")) {
            let e12 = t10.split(": ").at(1)?.split(", ").map((e13) => e13.split(".").pop());
            return { kind: "NullConstraintViolation", constraint: void 0 !== e12 ? { fields: e12 } : void 0 };
          }
          if (t10.startsWith("FOREIGN KEY constraint failed") || t10.startsWith("CHECK constraint failed")) return { kind: "ForeignKeyConstraintViolation", constraint: { foreignKey: {} } };
          if (t10.startsWith("no such table")) return { kind: "TableDoesNotExist", table: t10.split(": ").at(1) };
          if (t10.startsWith("no such column")) return { kind: "ColumnNotFound", column: t10.split(": ").at(1) };
          else if (t10.includes("has no column named ")) return { kind: "ColumnNotFound", column: t10.split("has no column named ").at(1) };
          return { kind: "sqlite", extendedCode: e11.code ?? e11.cause?.code ?? 1, message: e11.message };
        }(e10) };
        throw e10;
      }
      var nF = rz("prisma:driver-adapter:d1-http");
      function nQ({ errors: e10 }) {
        throw nF("D1 HTTP Errors: %O", e10), new rK(nq(e10.at(0) ?? { message: "Unknown error", code: 1 }));
      }
      function nU(e10) {
        throw nF("HTTP Error: %O", e10), new rK(nq(e10));
      }
      function nV(e10) {
        throw console.error("Error in performIO: %O", e10), new rK(nq(e10));
      }
      async function nH(e10, t10) {
        try {
          let r10 = await e10.post("raw", t10).json();
          return nF("[js::performRawQuery] %O", { success: r10.success, errors: r10.errors, messages: r10.messages, result: r10.result }), r10.success || nQ(r10), r10.result;
        } catch (e11) {
          nU(e11);
        }
      }
      var nW = class {
        constructor(e10) {
          this.client = e10;
        }
        provider = "sqlite";
        adapterName = `${nI}-http`;
        async queryRaw(e10) {
          nF("[js::query_raw] %O", e10);
          let t10 = await this.performIO(e10);
          return this.convertData(t10);
        }
        convertData({ columnNames: e10, rows: t10 }) {
          if (0 === t10.length) return { columnNames: [], columnTypes: [], rows: [] };
          let r10 = nB(e10, t10), n10 = t10.map((e11) => nj(e11, r10));
          return { columnNames: e10, columnTypes: r10, rows: n10 };
        }
        async executeRaw(e10) {
          return nF("[js::execute_raw] %O", e10), (await this.performIO(e10)).affectedRows ?? 0;
        }
        async performIO(e10) {
          try {
            let t10 = { json: { sql: e10.sql, params: e10.args.map((t11, r11) => nL(t11, e10.argTypes[r11])) } };
            nF("[js::perform_io] %O", t10);
            let r10 = await nH(this.client, t10);
            if (1 !== r10.length) throw Error("Expected exactly one result");
            let n10 = r10[0], { columns: i2 = [], rows: a2 = [] } = n10.results ?? {}, o2 = n10.meta?.changes;
            return { rows: a2, columnNames: i2, affectedRows: o2 };
          } catch (e11) {
            nV(e11);
          }
        }
      }, nG = class extends nW {
        constructor(e10, t10) {
          super(e10), this.options = t10;
        }
        async commit() {
          nF("[js::commit]");
        }
        async rollback() {
          nF("[js::rollback]");
        }
        async createSavepoint(e10) {
          nF("[js::createSavepoint] %s", e10);
        }
        async rollbackToSavepoint(e10) {
          nF("[js::rollbackToSavepoint] %s", e10);
        }
        async releaseSavepoint(e10) {
          nF("[js::releaseSavepoint] %s", e10);
        }
      }, nX = class extends nW {
        constructor(e10, t10) {
          const r10 = `https://api.cloudflare.com/client/v4/accounts/${e10.CLOUDFLARE_ACCOUNT_ID}/d1/database/${e10.CLOUDFLARE_DATABASE_ID}`;
          super(nx.create({ prefixUrl: r10, headers: { Authorization: `Bearer ${e10.CLOUDFLARE_D1_TOKEN}` }, throwHttpErrors: false })), this.release = t10;
        }
        tags = { error: nP("prisma:error"), warn: nR("prisma:warn"), info: nk("prisma:info"), query: nN("prisma:query") };
        alreadyWarned = /* @__PURE__ */ new Set();
        warnOnce = (e10, t10, ...r10) => {
          this.alreadyWarned.has(e10) || (this.alreadyWarned.add(e10), console.info(`${this.tags.warn} ${t10}`, ...r10));
        };
        async executeScript(e10) {
          try {
            await nH(this.client, { json: { sql: e10 } });
          } catch (e11) {
            nV(e11);
          }
        }
        getConnectionInfo() {
          return { maxBindValues: 98, supportsRelationJoins: false };
        }
        async startTransaction(e10) {
          if (e10 && "SERIALIZABLE" !== e10) throw new rK({ kind: "InvalidIsolationLevel", level: e10 });
          this.warnOnce("D1 Transaction", "Cloudflare D1 does not support transactions yet. When using Prisma's D1 adapter, implicit & explicit transactions will be ignored and run as individual queries, which breaks the guarantees of the ACID properties of transactions. For more details see https://pris.ly/d/d1-transactions");
          let t10 = { usePhantomQuery: true };
          return nF("%s options: %O", "[js::startTransaction]", t10), new nG(this.client, t10);
        }
        async dispose() {
          await this.release?.();
        }
      }, nJ = class {
        constructor(e10) {
          this.params = e10;
        }
        provider = "sqlite";
        adapterName = `${nI}-http`;
        async connect() {
          return new nX(this.params, async () => {
          });
        }
        async connectToShadowDb() {
          let e10 = `https://api.cloudflare.com/client/v4/accounts/${this.params.CLOUDFLARE_ACCOUNT_ID}/d1/database`, t10 = nx.create({ headers: { Authorization: `Bearer ${this.params.CLOUDFLARE_D1_TOKEN}` }, throwHttpErrors: false }), r10 = async () => {
            let r11 = "[js::connectToShadowDb::createShadowDatabase]", n11 = `_prisma_shadow_${globalThis.crypto.randomUUID()}`;
            nF(`${r11} creating database %s`, n11);
            try {
              let i3 = await t10.post(e10, { json: { name: n11 } }).json();
              nF(`${r11} %O`, i3), i3.success || nQ(i3);
              let { uuid: a2 } = i3.result;
              return nF(`${r11} created database %s with ID %s`, n11, a2), a2;
            } catch (e11) {
              nU(e11);
            }
          }, n10 = this.params.CLOUDFLARE_SHADOW_DATABASE_ID ?? await r10(), i2 = async () => {
            let r11 = "[js::connectToShadowDb::dispose]";
            try {
              nF(`${r11} deleting database %s`, n10);
              let i3 = await t10.delete(`${e10}/${n10}`).json();
              nF(`${r11} %O`, i3), i3.success || nQ(i3);
            } catch (e11) {
              nU(e11);
            }
          };
          return new nX(this.params, i2);
        }
      }, nz = rz("prisma:driver-adapter:d1"), nK = class {
        constructor(e10) {
          this.client = e10;
        }
        provider = "sqlite";
        adapterName = nI;
        async queryRaw(e10) {
          nz("[js::query_raw] %O", e10);
          let t10 = await this.performIO(e10);
          return this.convertData(t10);
        }
        convertData(e10) {
          let t10 = e10[0], r10 = e10[1];
          if (0 === r10.length) return { columnNames: [], columnTypes: [], rows: [] };
          let n10 = Object.values(nB(t10, r10)), i2 = r10.map((e11) => nj(e11, n10));
          return { columnNames: t10, columnTypes: n10, rows: i2 };
        }
        async executeRaw(e10) {
          return nz("[js::execute_raw] %O", e10), (await this.performIO(e10, true)).meta.changes ?? 0;
        }
        async performIO(e10, t10 = false) {
          try {
            let r10 = e10.args.map((t11, r11) => nL(t11, e10.argTypes[r11])), n10 = this.client.prepare(e10.sql).bind(...r10);
            if (t10) return await n10.run();
            {
              let [e11, ...t11] = await n10.raw({ columnNames: true });
              return [e11, t11];
            }
          } catch (e11) {
            n1(e11);
          }
        }
      }, nY = class extends nK {
        constructor(e10, t10) {
          super(e10), this.options = t10;
        }
        async commit() {
          nz("[js::commit]");
        }
        async rollback() {
          nz("[js::rollback]");
        }
        async createSavepoint(e10) {
          nz("[js::createSavepoint] %s", e10);
        }
        async rollbackToSavepoint(e10) {
          nz("[js::rollbackToSavepoint] %s", e10);
        }
        async releaseSavepoint(e10) {
          nz("[js::releaseSavepoint] %s", e10);
        }
      }, nZ = class extends nK {
        constructor(e10, t10) {
          super(e10), this.release = t10;
        }
        tags = { error: nP("prisma:error"), warn: nR("prisma:warn"), info: nk("prisma:info"), query: nN("prisma:query") };
        alreadyWarned = /* @__PURE__ */ new Set();
        warnOnce = (e10, t10, ...r10) => {
          this.alreadyWarned.has(e10) || (this.alreadyWarned.add(e10), console.info(`${this.tags.warn} ${t10}`, ...r10));
        };
        async executeScript(e10) {
          try {
            await this.client.exec(e10);
          } catch (e11) {
            n1(e11);
          }
        }
        getConnectionInfo() {
          return { maxBindValues: 98, supportsRelationJoins: false };
        }
        async startTransaction(e10) {
          if (e10 && "SERIALIZABLE" !== e10) throw new rK({ kind: "InvalidIsolationLevel", level: e10 });
          this.warnOnce("D1 Transaction", "Cloudflare D1 does not support transactions yet. When using Prisma's D1 adapter, implicit & explicit transactions will be ignored and run as individual queries, which breaks the guarantees of the ACID properties of transactions. For more details see https://pris.ly/d/d1-transactions");
          let t10 = { usePhantomQuery: true };
          return nz("%s options: %O", "[js::startTransaction]", t10), new nY(this.client, t10);
        }
        async dispose() {
          await this.release?.();
        }
      }, n0 = class {
        constructor(e10) {
          this.client = e10;
        }
        provider = "sqlite";
        adapterName = nI;
        async connect() {
          return new nZ(this.client, async () => {
          });
        }
      };
      function n1(e10) {
        throw console.error("Error in performIO: %O", e10), new rK(nq(e10));
      }
      var n2 = class {
        provider = "sqlite";
        adapterName = nI;
        connect;
        connectToShadowDb;
        constructor(e10) {
          if (function(e11) {
            return "object" == typeof e11 && null !== e11 && "CLOUDFLARE_D1_TOKEN" in e11 && "CLOUDFLARE_ACCOUNT_ID" in e11 && "CLOUDFLARE_DATABASE_ID" in e11;
          }(e10)) {
            const t10 = new nJ(e10);
            this.connect = t10.connect.bind(t10), this.connectToShadowDb = t10.connectToShadowDb.bind(t10);
          } else {
            const t10 = new n0(e10);
            this.connect = t10.connect.bind(t10);
          }
        }
      };
      let n4 = Symbol.for("__cloudflare-context__");
      function n3() {
        return globalThis[n4];
      }
      function n8() {
        let e10 = globalThis;
        return e10.__NEXT_DATA__?.nextExport === true;
      }
      async function n6() {
        let e10 = n3();
        if (e10) return e10;
        if (n8()) {
          var t10;
          let e11 = await n9();
          return t10 = e11, globalThis[n4] = t10, e11;
        }
        throw Error(n5);
      }
      async function n9(e10) {
        let { getPlatformProxy: t10 } = await import(`${"__wrangler".replaceAll("_", "")}`), r10 = e10?.environment ?? process.env.NEXT_DEV_WRANGLER_ENV, { env: n10, cf: i2, ctx: a2 } = await t10({ ...e10, envFiles: [], environment: r10 });
        return { env: n10, cf: i2, ctx: a2 };
      }
      let n5 = `

ERROR: \`getCloudflareContext\` has been called without having called \`initOpenNextCloudflareForDev\` from the Next.js config file.
You should update your Next.js config file as shown below:

   \`\`\`
   // next.config.mjs

   import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

   initOpenNextCloudflareForDev();

   const nextConfig = { ... };
   export default nextConfig;
   \`\`\`

`;
      globalThis.prisma ?? new rc.PrismaClient({ adapter: function() {
        try {
          let e10 = function(e11 = { async: false }) {
            return e11.async ? n6() : function() {
              let e12 = n3();
              if (e12) return e12;
              if (n8()) throw Error("  - make sure that the call is not at the top level and that the route is not static\n  - call `getCloudflareContext({async: true})` to use the `async` mode\n  - avoid calling `getCloudflareContext` in the route\n");
              throw Error(n5);
            }();
          }().env.DB;
          if (e10) return new n2(e10);
        } catch {
        }
        return new nt({ url: process.env.DATABASE_URL || "file:./prisma/dev.db" });
      }(), log: ["error"] }), e.x("node:crypto", () => (init_node_crypto(), __toCommonJS(node_crypto_exports)), true), process.env.SESSION_SECRET, (/* @__PURE__ */ new Date()).toISOString(), (/* @__PURE__ */ new Date()).toISOString(), (/* @__PURE__ */ new Date()).toISOString(), (/* @__PURE__ */ new Date()).toISOString(), e.s(["config", 0, { matcher: ["/admin/:path*"] }, "middleware", 0, function(e10) {
        let { pathname: t10 } = e10.nextUrl;
        return t10.startsWith("/admin") && !e10.cookies.get("studio_admin_session")?.value ? eg.redirect(new URL("/login", e10.url)) : eg.next();
      }], 99446);
      let n7 = { ...e.i(99446) }, ie = "/middleware", it = n7.middleware || n7.default;
      if ("function" != typeof it) throw new class extends Error {
        constructor(e10) {
          super(e10), this.stack = "";
        }
      }(`The Middleware file "${ie}" must export a function named \`middleware\` or a default function.`);
      let ir = (e10) => tC({ ...e10, IncrementalCache: ri, incrementalCacheHandler: null, page: ie, handler: async (...e11) => {
        try {
          return await it(...e11);
        } catch (i2) {
          let t10 = e11[0], r10 = new URL(t10.url), n10 = r10.pathname + r10.search;
          throw await s(i2, { path: n10, method: t10.method, headers: Object.fromEntries(t10.headers.entries()) }, { routerKind: "Pages Router", routePath: "/proxy", routeType: "proxy", revalidateReason: void 0 }), i2;
        }
      } });
      async function ii(e10, t10) {
        let r10 = await ir({ request: { url: e10.url, method: e10.method, headers: v(e10.headers), nextConfig: { basePath: "", i18n: "", trailingSlash: false, experimental: { cacheLife: { default: { stale: 300, revalidate: 900, expire: 4294967294 }, seconds: { stale: 30, revalidate: 1, expire: 60 }, minutes: { stale: 300, revalidate: 60, expire: 3600 }, hours: { stale: 300, revalidate: 3600, expire: 86400 }, days: { stale: 300, revalidate: 86400, expire: 604800 }, weeks: { stale: 300, revalidate: 604800, expire: 2592e3 }, max: { stale: 300, revalidate: 2592e3, expire: 31536e3 } }, authInterrupts: false, clientParamParsingOrigins: [] } }, page: { name: ie }, body: "GET" !== e10.method && "HEAD" !== e10.method ? e10.body ?? void 0 : void 0, waitUntil: t10.waitUntil, requestMeta: t10.requestMeta, signal: t10.signal || new AbortController().signal } });
        return null == t10.waitUntil || t10.waitUntil.call(t10, r10.waitUntil), r10.response;
      }
      e.s(["default", 0, ir, "handler", 0, ii], 42738);
    }]);
  }
});

// .next/server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0syktl3.js
var require_turbopack_node_modules_next_dist_esm_build_templates_edge_wrapper_0syktl3 = __commonJS({
  ".next/server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0syktl3.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0syktl3.js", { otherChunks: ["chunks/node_modules_0ch0kgf._.js", "chunks/[root-of-the-server]__0bqxa8m._.js"], runtimeModuleIds: [38022] }]), (() => {
      let e;
      if (!Array.isArray(globalThis.TURBOPACK)) return;
      let t = ["NEXT_DEPLOYMENT_ID", "NEXT_CLIENT_ASSET_SUFFIX"];
      var r, n = ((r = n || {})[r.Runtime = 0] = "Runtime", r[r.Parent = 1] = "Parent", r[r.Update = 2] = "Update", r);
      let o = /* @__PURE__ */ new WeakMap();
      function u(e2, t2) {
        this.m = e2, this.e = t2;
      }
      let l = u.prototype, i = Object.prototype.hasOwnProperty, a = "u" > typeof Symbol && Symbol.toStringTag;
      function s(e2, t2, r2) {
        i.call(e2, t2) || Object.defineProperty(e2, t2, r2);
      }
      function c(e2, t2) {
        let r2 = e2[t2];
        return r2 || (r2 = f(t2), e2[t2] = r2), r2;
      }
      function f(e2) {
        return { exports: {}, error: void 0, id: e2, namespaceObject: void 0 };
      }
      function h(e2, t2) {
        s(e2, "__esModule", { value: true }), a && s(e2, a, { value: "Module" });
        let r2 = 0;
        for (; r2 < t2.length; ) {
          let n2 = t2[r2++], o2 = t2[r2++];
          if ("number" == typeof o2) if (0 === o2) s(e2, n2, { value: t2[r2++], enumerable: true, writable: false });
          else throw Error(`unexpected tag: ${o2}`);
          else "function" == typeof t2[r2] ? s(e2, n2, { get: o2, set: t2[r2++], enumerable: true }) : s(e2, n2, { get: o2, enumerable: true });
        }
        Object.seal(e2);
      }
      function d(e2, t2) {
        (null != t2 ? c(this.c, t2) : this.m).exports = e2;
      }
      l.s = function(e2, t2) {
        let r2, n2;
        null != t2 ? n2 = (r2 = c(this.c, t2)).exports : (r2 = this.m, n2 = this.e), r2.namespaceObject = n2, h(n2, e2);
      }, l.j = function(e2, t2) {
        var r2, n2;
        let u2, l2, a2;
        null != t2 ? l2 = (u2 = c(this.c, t2)).exports : (u2 = this.m, l2 = this.e);
        let s2 = (r2 = u2, n2 = l2, (a2 = o.get(r2)) || (o.set(r2, a2 = []), r2.exports = r2.namespaceObject = new Proxy(n2, { get(e3, t3) {
          if (i.call(e3, t3) || "default" === t3 || "__esModule" === t3) return Reflect.get(e3, t3);
          for (let e4 of a2) {
            let r3 = Reflect.get(e4, t3);
            if (void 0 !== r3) return r3;
          }
        }, ownKeys(e3) {
          let t3 = Reflect.ownKeys(e3);
          for (let e4 of a2) for (let r3 of Reflect.ownKeys(e4)) "default" === r3 || t3.includes(r3) || t3.push(r3);
          return t3;
        } })), a2);
        "object" == typeof e2 && null !== e2 && s2.push(e2);
      }, l.v = d, l.n = function(e2, t2) {
        let r2;
        (r2 = null != t2 ? c(this.c, t2) : this.m).exports = r2.namespaceObject = e2;
      };
      let p = Object.getPrototypeOf ? (e2) => Object.getPrototypeOf(e2) : (e2) => e2.__proto__, m = [null, p({}), p([]), p(p)];
      function b(e2, t2, r2) {
        let n2 = [], o2 = -1;
        for (let t3 = e2; ("object" == typeof t3 || "function" == typeof t3) && !m.includes(t3); t3 = p(t3)) for (let r3 of Object.getOwnPropertyNames(t3)) n2.push(r3, /* @__PURE__ */ function(e3, t4) {
          return () => e3[t4];
        }(e2, r3)), -1 === o2 && "default" === r3 && (o2 = n2.length - 1);
        return r2 && o2 >= 0 || (o2 >= 0 ? n2.splice(o2, 1, 0, e2) : n2.push("default", 0, e2)), h(t2, n2), t2;
      }
      function y(e2) {
        return "function" == typeof e2 ? function(...t2) {
          return e2.apply(this, t2);
        } : /* @__PURE__ */ Object.create(null);
      }
      function g(e2) {
        let t2 = K(e2, this.m);
        if (t2.namespaceObject) return t2.namespaceObject;
        let r2 = t2.exports;
        return t2.namespaceObject = b(r2, y(r2), r2 && r2.__esModule);
      }
      function w(e2) {
        let t2 = e2.indexOf("#");
        -1 !== t2 && (e2 = e2.substring(0, t2));
        let r2 = e2.indexOf("?");
        return -1 !== r2 && (e2 = e2.substring(0, r2)), e2;
      }
      function O(e2) {
        return "string" == typeof e2 ? e2 : e2.path;
      }
      function k() {
        let e2, t2;
        return { promise: new Promise((r2, n2) => {
          t2 = n2, e2 = r2;
        }), resolve: e2, reject: t2 };
      }
      l.i = g, l.A = function(e2) {
        return this.r(e2)(g.bind(this));
      }, l.t = "function" == typeof __require ? __require : function() {
        throw Error("Unexpected use of runtime require");
      }, l.r = function(e2) {
        return K(e2, this.m).exports;
      }, l.f = function(e2) {
        function t2(t3) {
          if (t3 = w(t3), i.call(e2, t3)) return e2[t3].module();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }
        return t2.keys = () => Object.keys(e2), t2.resolve = (t3) => {
          if (t3 = w(t3), i.call(e2, t3)) return e2[t3].id();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }, t2.import = async (e3) => await t2(e3), t2;
      };
      let _ = Symbol("turbopack queues"), j = Symbol("turbopack exports"), C = Symbol("turbopack error");
      function P(e2) {
        e2 && 1 !== e2.status && (e2.status = 1, e2.forEach((e3) => e3.queueCount--), e2.forEach((e3) => e3.queueCount-- ? e3.queueCount++ : e3()));
      }
      l.a = function(e2, t2) {
        let r2 = this.m, n2 = t2 ? Object.assign([], { status: -1 }) : void 0, o2 = /* @__PURE__ */ new Set(), { resolve: u2, reject: l2, promise: i2 } = k(), a2 = Object.assign(i2, { [j]: r2.exports, [_]: (e3) => {
          n2 && e3(n2), o2.forEach(e3), a2.catch(() => {
          });
        } }), s2 = { get: () => a2, set(e3) {
          e3 !== a2 && (a2[j] = e3);
        } };
        Object.defineProperty(r2, "exports", s2), Object.defineProperty(r2, "namespaceObject", s2), e2(function(e3) {
          let t3 = e3.map((e4) => {
            if (null !== e4 && "object" == typeof e4) {
              if (_ in e4) return e4;
              if (null != e4 && "object" == typeof e4 && "then" in e4 && "function" == typeof e4.then) {
                let t4 = Object.assign([], { status: 0 }), r4 = { [j]: {}, [_]: (e5) => e5(t4) };
                return e4.then((e5) => {
                  r4[j] = e5, P(t4);
                }, (e5) => {
                  r4[C] = e5, P(t4);
                }), r4;
              }
            }
            return { [j]: e4, [_]: () => {
            } };
          }), r3 = () => t3.map((e4) => {
            if (e4[C]) throw e4[C];
            return e4[j];
          }), { promise: u3, resolve: l3 } = k(), i3 = Object.assign(() => l3(r3), { queueCount: 0 });
          function a3(e4) {
            e4 !== n2 && !o2.has(e4) && (o2.add(e4), e4 && 0 === e4.status && (i3.queueCount++, e4.push(i3)));
          }
          return t3.map((e4) => e4[_](a3)), i3.queueCount ? u3 : r3();
        }, function(e3) {
          e3 ? l2(a2[C] = e3) : u2(a2[j]), P(n2);
        }), n2 && -1 === n2.status && (n2.status = 0);
      };
      let v = function(e2) {
        let t2 = new URL(e2, "x:/"), r2 = {};
        for (let e3 in t2) r2[e3] = t2[e3];
        for (let t3 in r2.href = e2, r2.pathname = e2.replace(/[?#].*/, ""), r2.origin = r2.protocol = "", r2.toString = r2.toJSON = (...t4) => e2, r2) Object.defineProperty(this, t3, { enumerable: true, configurable: true, value: r2[t3] });
      };
      function E(e2, t2) {
        throw Error(`Invariant: ${t2(e2)}`);
      }
      v.prototype = URL.prototype, l.U = v, l.z = function(e2) {
        throw Error("dynamic usage of require is not supported");
      }, l.g = globalThis;
      let U = u.prototype, R = /* @__PURE__ */ new Map();
      l.M = R;
      let x = /* @__PURE__ */ new Map(), M = /* @__PURE__ */ new Map();
      async function $(e2, t2, r2) {
        let n2;
        if ("string" == typeof r2) return q(e2, t2, A(r2));
        let o2 = r2.included || [], u2 = o2.map((e3) => !!R.has(e3) || x.get(e3));
        if (u2.length > 0 && u2.every((e3) => e3)) return void await Promise.all(u2);
        let l2 = r2.moduleChunks || [], i2 = l2.map((e3) => M.get(e3)).filter((e3) => e3);
        if (i2.length > 0) {
          if (i2.length === l2.length) return void await Promise.all(i2);
          let r3 = /* @__PURE__ */ new Set();
          for (let e3 of l2) M.has(e3) || r3.add(e3);
          for (let n3 of r3) {
            let r4 = q(e2, t2, A(n3));
            M.set(n3, r4), i2.push(r4);
          }
          n2 = Promise.all(i2);
        } else {
          for (let o3 of (n2 = q(e2, t2, A(r2.path)), l2)) M.has(o3) || M.set(o3, n2);
        }
        for (let e3 of o2) x.has(e3) || x.set(e3, n2);
        await n2;
      }
      U.l = function(e2) {
        return $(n.Parent, this.m.id, e2);
      };
      let T = Promise.resolve(void 0), S = /* @__PURE__ */ new WeakMap();
      function q(t2, r2, o2) {
        let u2 = e.loadChunkCached(t2, o2), l2 = S.get(u2);
        if (void 0 === l2) {
          let e2 = S.set.bind(S, u2, T);
          l2 = u2.then(e2).catch((e3) => {
            let u3;
            switch (t2) {
              case n.Runtime:
                u3 = `as a runtime dependency of chunk ${r2}`;
                break;
              case n.Parent:
                u3 = `from module ${r2}`;
                break;
              case n.Update:
                u3 = "from an HMR update";
                break;
              default:
                E(t2, (e4) => `Unknown source type: ${e4}`);
            }
            let l3 = Error(`Failed to load chunk ${o2} ${u3}${e3 ? `: ${e3}` : ""}`, e3 ? { cause: e3 } : void 0);
            throw l3.name = "ChunkLoadError", l3;
          }), S.set(u2, l2);
        }
        return l2;
      }
      function A(e2) {
        return `${e2.split("/").map((e3) => encodeURIComponent(e3)).join("/")}`;
      }
      U.L = function(e2) {
        return q(n.Parent, this.m.id, e2);
      }, U.R = function(e2) {
        let t2 = this.r(e2);
        return t2?.default ?? t2;
      }, U.P = function(e2) {
        return `/ROOT/${e2 ?? ""}`;
      }, U.q = function(e2, t2) {
        d.call(this, `${e2}`, t2);
      }, U.b = function(e2, r2, n2, o2) {
        let u2 = "SharedWorker" === e2.name, l2 = [n2.map((e3) => A(e3)).reverse(), ""];
        for (let e3 of t) l2.push(globalThis[e3]);
        let i2 = new URL(A(r2), location.origin), a2 = JSON.stringify(l2);
        return u2 ? i2.searchParams.set("params", a2) : i2.hash = "#params=" + encodeURIComponent(a2), new e2(i2, o2 ? { ...o2, type: void 0 } : void 0);
      };
      let N = /\.js(?:\?[^#]*)?(?:#.*)?$/;
      l.w = function(t2, r2, o2) {
        return e.loadWebAssembly(n.Parent, this.m.id, t2, r2, o2);
      }, l.u = function(t2, r2) {
        return e.loadWebAssemblyModule(n.Parent, this.m.id, t2, r2);
      };
      let I = {};
      l.c = I;
      let K = (e2, t2) => {
        let r2 = I[e2];
        if (r2) {
          if (r2.error) throw r2.error;
          return r2;
        }
        return L(e2, n.Parent, t2.id);
      };
      function L(e2, t2, r2) {
        let n2 = R.get(e2);
        if ("function" != typeof n2) throw Error(function(e3, t3, r3) {
          let n3;
          switch (t3) {
            case 0:
              n3 = `as a runtime entry of chunk ${r3}`;
              break;
            case 1:
              n3 = `because it was required from module ${r3}`;
              break;
            case 2:
              n3 = "because of an HMR update";
              break;
            default:
              E(t3, (e4) => `Unknown source type: ${e4}`);
          }
          return `Module ${e3} was instantiated ${n3}, but the module factory is not available.`;
        }(e2, t2, r2));
        let o2 = f(e2), l2 = o2.exports;
        I[e2] = o2;
        let i2 = new u(o2, l2);
        try {
          n2(i2, o2, l2);
        } catch (e3) {
          throw o2.error = e3, e3;
        }
        return o2.namespaceObject && o2.exports !== o2.namespaceObject && b(o2.exports, o2.namespaceObject), o2;
      }
      function W(t2) {
        let r2, n2 = function(e2) {
          if ("string" == typeof e2) return e2;
          if (e2) return { src: e2.getAttribute("src") };
          if ("u" > typeof TURBOPACK_NEXT_CHUNK_URLS) return { src: TURBOPACK_NEXT_CHUNK_URLS.pop() };
          throw Error("chunk path empty but not in a worker");
        }(t2[0]);
        return 2 === t2.length ? r2 = t2[1] : (r2 = void 0, !function(e2, t3) {
          let r3 = 1;
          for (; r3 < e2.length; ) {
            let n3, o2 = r3 + 1;
            for (; o2 < e2.length && "function" != typeof e2[o2]; ) o2++;
            if (o2 === e2.length) throw Error("malformed chunk format, expected a factory function");
            let u2 = e2[o2];
            for (let u3 = r3; u3 < o2; u3++) {
              let r4 = e2[u3], o3 = t3.get(r4);
              if (o3) {
                n3 = o3;
                break;
              }
            }
            let l2 = n3 ?? u2, i2 = false;
            for (let n4 = r3; n4 < o2; n4++) {
              let r4 = e2[n4];
              t3.has(r4) || (i2 || (l2 === u2 && Object.defineProperty(u2, "name", { value: "module evaluation" }), i2 = true), t3.set(r4, l2));
            }
            r3 = o2 + 1;
          }
        }(t2, R)), e.registerChunk(n2, r2);
      }
      function B(e2, t2, r2 = false) {
        let n2;
        try {
          n2 = t2();
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return !r2 || n2.__esModule ? n2 : b(n2, y(n2), true);
      }
      l.y = async function(e2) {
        let t2;
        try {
          t2 = await import(e2);
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return t2 && t2.__esModule && t2.default && "default" in t2.default ? b(t2.default, y(t2), true) : t2;
      }, B.resolve = (e2, t2) => __require.resolve(e2, t2), l.x = B, e = { registerChunk(e2, t2) {
        let r2 = function(e3) {
          if ("string" == typeof e3) return e3;
          let t3 = decodeURIComponent(e3.src.replace(/[?#].*$/, ""));
          return t3.startsWith("") ? t3.slice(0) : t3;
        }(e2);
        F.add(r2), function(e3) {
          let t3 = D.get(e3);
          if (null != t3) {
            for (let r3 of t3) r3.requiredChunks.delete(e3), 0 === r3.requiredChunks.size && X(r3.runtimeModuleIds, r3.chunkPath);
            D.delete(e3);
          }
        }(r2), null != t2 && (0 === t2.otherChunks.length ? X(t2.runtimeModuleIds, r2) : function(e3, t3, r3) {
          let n2 = /* @__PURE__ */ new Set(), o2 = { runtimeModuleIds: r3, chunkPath: e3, requiredChunks: n2 };
          for (let e4 of t3) {
            let t4 = O(e4);
            if (F.has(t4)) continue;
            n2.add(t4);
            let r4 = D.get(t4);
            null == r4 && (r4 = /* @__PURE__ */ new Set(), D.set(t4, r4)), r4.add(o2);
          }
          0 === o2.requiredChunks.size && X(o2.runtimeModuleIds, o2.chunkPath);
        }(r2, t2.otherChunks.filter((e3) => {
          var t3;
          return t3 = O(e3), N.test(t3);
        }), t2.runtimeModuleIds));
      }, loadChunkCached(e2, t2) {
        throw Error("chunk loading is not supported");
      }, async loadWebAssembly(e2, t2, r2, n2, o2) {
        let u2 = await H(r2, n2);
        return await WebAssembly.instantiate(u2, o2);
      }, loadWebAssemblyModule: async (e2, t2, r2, n2) => H(r2, n2) };
      let F = /* @__PURE__ */ new Set(), D = /* @__PURE__ */ new Map();
      function X(e2, t2) {
        for (let r2 of e2) !function(e3, t3) {
          let r3 = I[t3];
          if (r3) {
            if (r3.error) throw r3.error;
            return;
          }
          L(t3, n.Runtime, e3);
        }(t2, r2);
      }
      async function H(e2, t2) {
        let r2;
        try {
          r2 = t2();
        } catch (e3) {
        }
        if (!r2) throw Error(`dynamically loading WebAssembly is not supported in this runtime as global was not injected for chunk '${e2}'`);
        return r2;
      }
      let z = globalThis.TURBOPACK;
      globalThis.TURBOPACK = { push: W }, z.forEach(W);
    })();
  }
});

// node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
import __onw_wasm_aab3702b0d04903290f192f33b07094a__ from "./wasm/wasm_aab3702b0d04903290f192f33b07094a.wasm";
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  const correspondingRoute = routes.find((route) => route.regex.some((r) => new RegExp(r).test(path3)));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/admin(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$"] }];
    globalThis.wasm_aab3702b0d04903290f192f33b07094a = __onw_wasm_aab3702b0d04903290f192f33b07094a__;
    require_node_modules_0ch0kgf();
    require_root_of_the_server_0bqxa8m();
    require_turbopack_node_modules_next_dist_esm_build_templates_edge_wrapper_0syktl3();
  }
});

// node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();

// node_modules/@opennextjs/aws/dist/utils/requestCache.js
var RequestCache = class {
  _caches = /* @__PURE__ */ new Map();
  /**
   * Returns the Map registered under `key`.
   * If no Map exists yet for that key, a new empty Map is created, stored, and returned.
   * Repeated calls with the same key always return the **same** Map instance.
   */
  getOrCreate(key) {
    let cache = this._caches.get(key);
    if (!cache) {
      cache = /* @__PURE__ */ new Map();
      this._caches.set(key, cache);
    }
    return cache;
  }
};

// node_modules/@opennextjs/aws/dist/utils/promise.js
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set(),
    requestCache: new RequestCache()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const handlerConfig = config[handler3.type];
  const override = handlerConfig && "override" in handlerConfig ? handlerConfig.override : void 0;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto2 from "node:crypto";
import { parse as parseQs, stringify as stringifyQs } from "node:querystring";

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "typescript": { "ignoreBuildErrors": false }, "typedRoutes": false, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.ts", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": false, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 31536e3, "formats": ["image/avif", "image/webp"], "maximumRedirects": 3, "maximumResponseBody": 5e7, "dangerouslyAllowLocalIP": false, "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "localPatterns": [{ "pathname": "**", "search": "" }], "remotePatterns": [{ "protocol": "https", "hostname": "images.unsplash.com" }], "qualities": [75], "unoptimized": false, "customCacheHandler": false }, "devIndicators": { "position": "bottom-left" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "reactProductionProfiling": false, "reactStrictMode": null, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": { "serverFunctions": true, "browserToTerminal": "warn" }, "compiler": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "/Users/adityajain/Downloads/Apple Website", "cacheComponents": false, "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 30, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 31536e3 } }, "cacheHandlers": {}, "experimental": { "appNewScrollHandler": false, "useSkewCookie": false, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "prerenderEarlyExit": true, "serverMinification": true, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "cachedNavigations": false, "partialFallbacks": false, "dynamicOnHover": false, "varyParams": false, "prefetchInlining": false, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "proxyPrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 7, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "imgOptSkipMetadata": null, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "strictRouteTypes": false, "viewTransition": false, "removeUncaughtErrorAndRejectionListeners": false, "validateRSCRequestHeaders": false, "staleTimes": { "dynamic": 0, "static": 300 }, "reactDebugChannel": true, "serverComponentsHmrCache": true, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "transitionIndicator": false, "gestureTransition": false, "inlineCss": false, "useCache": false, "globalNotFound": false, "browserDebugInfoInTerminal": "warn", "lockDistDir": true, "proxyClientMaxBodySize": 10485760, "hideLogsAfterAbort": false, "mcpServer": true, "turbopackFileSystemCacheForDev": true, "turbopackFileSystemCacheForBuild": false, "turbopackInferModuleSideEffects": true, "turbopackPluginRuntimeStrategy": "childProcesses", "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-sqlite-node", "@effect/sql-sqlite-bun", "@effect/sql-sqlite-wasm", "@effect/sql-sqlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "htmlLimitedBots": "[\\w-]+-Google|Google-[\\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight", "bundlePagesRouterDependencies": false, "configFileName": "next.config.ts", "turbopack": { "root": "/Users/adityajain/Downloads/Apple Website" }, "distDirRoot": ".next" };
var BuildId = "RSMaIRE5v6l6Nn6F8sevU";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "priority": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_global-error", "regex": "^/_global\\-error(?:/)?$", "routeKeys": {}, "namedRegex": "^/_global\\-error(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/admin", "regex": "^/admin(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin(?:/)?$" }, { "page": "/admin/inquiries", "regex": "^/admin/inquiries(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/inquiries(?:/)?$" }, { "page": "/admin/journal", "regex": "^/admin/journal(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/journal(?:/)?$" }, { "page": "/admin/journal/new", "regex": "^/admin/journal/new(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/journal/new(?:/)?$" }, { "page": "/admin/projects", "regex": "^/admin/projects(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/projects(?:/)?$" }, { "page": "/admin/projects/new", "regex": "^/admin/projects/new(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/projects/new(?:/)?$" }, { "page": "/admin/settings", "regex": "^/admin/settings(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/settings(?:/)?$" }, { "page": "/blog", "regex": "^/blog(?:/)?$", "routeKeys": {}, "namedRegex": "^/blog(?:/)?$" }, { "page": "/contact", "regex": "^/contact(?:/)?$", "routeKeys": {}, "namedRegex": "^/contact(?:/)?$" }, { "page": "/favicon.ico", "regex": "^/favicon\\.ico(?:/)?$", "routeKeys": {}, "namedRegex": "^/favicon\\.ico(?:/)?$" }, { "page": "/journal", "regex": "^/journal(?:/)?$", "routeKeys": {}, "namedRegex": "^/journal(?:/)?$" }, { "page": "/login", "regex": "^/login(?:/)?$", "routeKeys": {}, "namedRegex": "^/login(?:/)?$" }, { "page": "/privacy", "regex": "^/privacy(?:/)?$", "routeKeys": {}, "namedRegex": "^/privacy(?:/)?$" }, { "page": "/process", "regex": "^/process(?:/)?$", "routeKeys": {}, "namedRegex": "^/process(?:/)?$" }, { "page": "/robots.txt", "regex": "^/robots\\.txt(?:/)?$", "routeKeys": {}, "namedRegex": "^/robots\\.txt(?:/)?$" }, { "page": "/services", "regex": "^/services(?:/)?$", "routeKeys": {}, "namedRegex": "^/services(?:/)?$" }, { "page": "/sitemap", "regex": "^/sitemap(?:/)?$", "routeKeys": {}, "namedRegex": "^/sitemap(?:/)?$" }, { "page": "/sitemap.xml", "regex": "^/sitemap\\.xml(?:/)?$", "routeKeys": {}, "namedRegex": "^/sitemap\\.xml(?:/)?$" }, { "page": "/studio", "regex": "^/studio(?:/)?$", "routeKeys": {}, "namedRegex": "^/studio(?:/)?$" }, { "page": "/terms", "regex": "^/terms(?:/)?$", "routeKeys": {}, "namedRegex": "^/terms(?:/)?$" }, { "page": "/work", "regex": "^/work(?:/)?$", "routeKeys": {}, "namedRegex": "^/work(?:/)?$" }], "dynamic": [{ "page": "/admin/journal/[id]", "regex": "^/admin/journal/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/admin/journal/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/admin/projects/[id]", "regex": "^/admin/projects/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/admin/projects/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/blog/[slug]", "regex": "^/blog/([^/]+?)(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/blog/(?<nxtPslug>[^/]+?)(?:/)?$" }, { "page": "/journal/[slug]", "regex": "^/journal/([^/]+?)(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/journal/(?<nxtPslug>[^/]+?)(?:/)?$" }, { "page": "/services/[slug]", "regex": "^/services/([^/]+?)(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/services/(?<nxtPslug>[^/]+?)(?:/)?$" }, { "page": "/work/[id]", "regex": "^/work/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/work/(?<nxtPid>[^/]+?)(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [{ "source": "/(.*)", "headers": [{ "key": "X-Content-Type-Options", "value": "nosniff" }, { "key": "X-Frame-Options", "value": "DENY" }, { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }, { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }], "regex": "^(?:/(.*))(?:/)?$" }];
var PrerenderManifest = { "version": 4, "routes": { "/": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/", "dataRoute": "/index.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/_global-error": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_global-error", "dataRoute": "/_global-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/_not-found": { "initialStatus": 404, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_not-found", "dataRoute": "/_not-found.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog", "dataRoute": "/blog.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/contact": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/contact", "dataRoute": "/contact.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/favicon.ico": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/x-icon", "x-next-cache-tags": "_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico" }, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/favicon.ico", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/journal": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/journal", "dataRoute": "/journal.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/privacy": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/privacy", "dataRoute": "/privacy.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/process": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/process", "dataRoute": "/process.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/robots.txt": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "text/plain", "x-next-cache-tags": "_N_T_/layout,_N_T_/robots.txt/layout,_N_T_/robots.txt/route,_N_T_/robots.txt" }, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/robots.txt", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/services": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/services", "dataRoute": "/services.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sitemap": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sitemap", "dataRoute": "/sitemap.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sitemap.xml": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "application/xml", "x-next-cache-tags": "_N_T_/layout,_N_T_/sitemap.xml/layout,_N_T_/sitemap.xml/route,_N_T_/sitemap.xml" }, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sitemap.xml", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/studio": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/studio", "dataRoute": "/studio.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/terms": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/terms", "dataRoute": "/terms.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/work": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/work", "dataRoute": "/work.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "89a1665046b1a39986c953a07e0529b5", "previewModeSigningKey": "4e5660fd64c83134e6514c01801a9828d5144855448d23ae8d495c950a299b5e", "previewModeEncryptionKey": "a1105f298c0e966a086e6c0c1b5c8cd8a57bab2d460d5a48a2eef0cc2e80d1b2" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge/chunks/node_modules_0ch0kgf._.js", "server/edge/chunks/[root-of-the-server]__0bqxa8m._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0syktl3.js"], "name": "middleware", "page": "/", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0syktl3.js", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/admin(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "originalSource": "/admin/:path*" }], "wasm": [{ "name": "wasm_aab3702b0d04903290f192f33b07094a", "filePath": "server/edge/chunks/node_modules__prisma_client_query_compiler_fast_bg_0656eb_.wasm" }], "assets": [], "env": { "__NEXT_BUILD_ID": "RSMaIRE5v6l6Nn6F8sevU", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "642ZcAmOiGihq8QMYG789BNiJydVgzNndxUxZNkE9Cc=", "__NEXT_PREVIEW_MODE_ID": "89a1665046b1a39986c953a07e0529b5", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "a1105f298c0e966a086e6c0c1b5c8cd8a57bab2d460d5a48a2eef0cc2e80d1b2", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "4e5660fd64c83134e6514c01801a9828d5144855448d23ae8d495c950a299b5e" } } }, "sortedMiddleware": ["/"], "functions": {} };
var AppPathRoutesManifest = { "/_global-error/page": "/_global-error", "/_not-found/page": "/_not-found", "/admin/inquiries/page": "/admin/inquiries", "/admin/journal/[id]/page": "/admin/journal/[id]", "/admin/journal/new/page": "/admin/journal/new", "/admin/journal/page": "/admin/journal", "/admin/page": "/admin", "/admin/projects/[id]/page": "/admin/projects/[id]", "/admin/projects/new/page": "/admin/projects/new", "/admin/projects/page": "/admin/projects", "/admin/settings/page": "/admin/settings", "/blog/[slug]/page": "/blog/[slug]", "/blog/page": "/blog", "/contact/page": "/contact", "/favicon.ico/route": "/favicon.ico", "/journal/[slug]/page": "/journal/[slug]", "/journal/page": "/journal", "/login/page": "/login", "/page": "/", "/privacy/page": "/privacy", "/process/page": "/process", "/robots.txt/route": "/robots.txt", "/services/[slug]/page": "/services/[slug]", "/services/page": "/services", "/sitemap.xml/route": "/sitemap.xml", "/sitemap/page": "/sitemap", "/studio/page": "/studio", "/terms/page": "/terms", "/work/[id]/page": "/work/[id]", "/work/page": "/work" };
var FunctionsConfigManifest = { "version": 1, "functions": {} };
var PagesManifest = { "/404": "pages/404.html", "/500": "pages/500.html" };
process.env.NEXT_BUILD_ID = BuildId;
process.env.OPEN_NEXT_BUILD_ID = NextConfig.deploymentId ?? BuildId;
process.env.NEXT_PREVIEW_MODE_ID = PrerenderManifest?.preview?.previewModeId;

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();
import { ReadableStream as ReadableStream3 } from "node:stream/web";

// node_modules/@opennextjs/aws/dist/utils/binary.js
var commonBinaryMimeTypes = /* @__PURE__ */ new Set([
  "application/octet-stream",
  // Docs
  "application/epub+zip",
  "application/msword",
  "application/pdf",
  "application/rtf",
  "application/vnd.amazon.ebook",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Fonts
  "font/otf",
  "font/woff",
  "font/woff2",
  // Images
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/vnd.microsoft.icon",
  "image/webp",
  // Audio
  "audio/3gpp",
  "audio/aac",
  "audio/basic",
  "audio/flac",
  "audio/mpeg",
  "audio/ogg",
  "audio/wavaudio/webm",
  "audio/x-aiff",
  "audio/x-midi",
  "audio/x-wav",
  // Video
  "video/3gpp",
  "video/mp2t",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  // Archives
  "application/java-archive",
  "application/vnd.apple.installer+xml",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-gzip",
  "application/x-java-archive",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/x-zip",
  "application/zip",
  // Serialized data
  "application/x-protobuf"
]);
function isBinaryContentType(contentType) {
  if (!contentType)
    return false;
  const value = contentType.split(";")[0];
  return commonBinaryMimeTypes.has(value);
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    const nextUrl = constructNextUrl(internalEvent.url, `/${detectedLocale}${NextConfig.trailingSlash ? "/" : ""}`);
    const queryString = convertToQueryString(internalEvent.query);
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: `${nextUrl}${queryString}`
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (!pattern.test(url))
    return false;
  if (host) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.host !== host;
    } catch {
      return !url.includes(host);
    }
  }
  return true;
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  return new ReadableStream3({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));
function normalizeLocationHeader(location2, baseUrl, encodeQuery = false) {
  if (!URL.canParse(location2)) {
    return location2;
  }
  const locationURL = new URL(location2);
  const origin = new URL(baseUrl).origin;
  let search = locationURL.search;
  if (encodeQuery && search) {
    search = `?${stringifyQs(parseQs(search.slice(1)))}`;
  }
  const href = `${locationURL.origin}${locationURL.pathname}${search}${locationURL.hash}`;
  if (locationURL.origin === origin) {
    return href.slice(origin.length);
  }
  return href;
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();

// node_modules/@opennextjs/aws/dist/utils/semver.js
function compareSemver(v1, operator, v2) {
  let versionDiff = 0;
  if (v1 === "latest") {
    versionDiff = 1;
  } else {
    if (/^[^\d]/.test(v1)) {
      v1 = v1.substring(1);
    }
    if (/^[^\d]/.test(v2)) {
      v2 = v2.substring(1);
    }
    const [major1, minor1 = 0, patch1 = 0] = v1.split(".").map(Number);
    const [major2, minor2 = 0, patch2 = 0] = v2.split(".").map(Number);
    if (Number.isNaN(major1) || Number.isNaN(major2)) {
      throw new Error("The major version is required.");
    }
    if (major1 !== major2) {
      versionDiff = major1 - major2;
    } else if (minor1 !== minor2) {
      versionDiff = minor1 - minor2;
    } else if (patch1 !== patch2) {
      versionDiff = patch1 - patch2;
    }
  }
  switch (operator) {
    case "=":
      return versionDiff === 0;
    case ">=":
      return versionDiff >= 0;
    case "<=":
      return versionDiff <= 0;
    case ">":
      return versionDiff > 0;
    case "<":
      return versionDiff < 0;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

// node_modules/@opennextjs/aws/dist/utils/cache.js
async function isStale(key, tags, lastModified) {
  if (!compareSemver(globalThis.nextVersion, ">=", "16.0.0")) {
    return false;
  }
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.isStale?.(tags, lastModified) ?? false;
  }
  return await globalThis.tagCache.isStale?.(key, lastModified) ?? false;
}
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    const cacheTags = value.meta?.headers?.["x-next-cache-tags"]?.split(",") ?? [];
    delete value.meta?.headers?.["x-next-cache-tags"];
    return cacheTags;
  } catch (e) {
    return [];
  }
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
var NEXT_SEGMENT_PREFETCH_HEADER = "next-router-segment-prefetch";
var NEXT_PRERENDER_HEADER = "x-nextjs-prerender";
var NEXT_POSTPONED_HEADER = "x-nextjs-postponed";
async function computeCacheControl(path3, body, host, revalidate, lastModified, isStaleFromTagCache = false) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest?.routes ?? {}).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  const isSSG = finalRevalidate === CACHE_ONE_YEAR;
  const remainingTtl = Math.max(finalRevalidate - age, 1);
  const isStaleFromTime = !isSSG && remainingTtl === 1;
  const isStale2 = isStaleFromTime || isStaleFromTagCache;
  if (!isSSG || isStaleFromTagCache) {
    const sMaxAge = isStaleFromTagCache ? 1 : remainingTtl;
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate,
      isStaleFromTagCache
    });
    if (isStale2) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale2 ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
function getBodyForAppRouter(event, cachedValue) {
  if (cachedValue.type !== "app") {
    throw new Error("getBodyForAppRouter called with non-app cache value");
  }
  try {
    const segmentHeader = `${event.headers[NEXT_SEGMENT_PREFETCH_HEADER]}`;
    const isSegmentResponse = Boolean(segmentHeader) && segmentHeader in (cachedValue.segmentData || {}) && !NextConfig.experimental?.prefetchInlining;
    const body = isSegmentResponse ? cachedValue.segmentData[segmentHeader] : cachedValue.rsc;
    return {
      body,
      additionalHeaders: isSegmentResponse ? { [NEXT_PRERENDER_HEADER]: "1", [NEXT_POSTPONED_HEADER]: "2" } : {}
    };
  } catch (e) {
    error("Error while getting body for app router from cache:", e);
    return { body: cachedValue.rsc, additionalHeaders: {} };
  }
}
async function generateResult(event, localizedPath, cachedValue, lastModified, isStaleFromTagCache = false) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  let additionalHeaders = {};
  if (cachedValue.type === "app") {
    isDataRequest = event.headers.rsc === "1";
    if (isDataRequest) {
      const { body: appRouterBody, additionalHeaders: appHeaders } = getBodyForAppRouter(event, cachedValue);
      body = appRouterBody;
      additionalHeaders = appHeaders;
    } else {
      body = cachedValue.html;
    }
    type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
  } else if (cachedValue.type === "page") {
    isDataRequest = Boolean(event.query.__nextDataReq);
    body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
    type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
  } else {
    throw new Error("generateResult called with unsupported cache value type, only 'app' and 'page' are supported");
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified, isStaleFromTagCache);
  return {
    type: "core",
    // Sometimes other status codes can be cached, like 404. For these cases, we should return the correct status code
    // Also set the status code to the rewriteStatusCode if defined
    // This can happen in handleMiddleware in routingHandler.
    // `NextResponse.rewrite(url, { status: xxx})
    // The rewrite status code should take precedence over the cached one
    statusCode: event.rewriteStatusCode ?? cachedValue.meta?.status ?? 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers,
      vary: VARY_HEADER,
      ...additionalHeaders
    }
  };
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => {
    try {
      return escapePathDelimiters(decodeURIComponent(segment), true);
    } catch (e) {
      return segment;
    }
  }).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  const cookies = event.headers.cookie || "";
  const hasPreviewData = cookies.includes("__prerender_bypass") || cookies.includes("__next_preview_data");
  if (hasPreviewData) {
    debug("Preview mode detected, passing through to handler");
    return event;
  }
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  localizedPath = decodePathParams(localizedPath);
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest?.routes ?? {}).includes(localizedPath ?? "/") || Object.values(PrerenderManifest?.dynamicRoutes ?? {}).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(localizedPath ?? "/index");
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      const tags = getTagsFromValue(cachedData.value);
      if (cachedData.value?.type === "app" || cachedData.value?.type === "route") {
        const _hasBeenRevalidated = cachedData.shouldBypassTagCache ? false : await hasBeenRevalidated(localizedPath, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const _isStale = cachedData.shouldBypassTagCache ? false : await isStale(localizedPath, tags, cachedData.lastModified ?? Date.now());
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified, _isStale);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified, _isStale);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        case "route": {
          const cacheControl = await computeCacheControl(localizedPath, cachedData.value.body, host, cachedData.value.revalidate, cachedData.lastModified, _isStale);
          const isBinary = isBinaryContentType(String(cachedData.value.meta?.headers?.["content-type"]));
          return {
            type: "core",
            statusCode: event.rewriteStatusCode ?? cachedData.value.meta?.status ?? 200,
            body: toReadableStream(cachedData.value.body, isBinary),
            headers: {
              ...cacheControl,
              ...cachedData.value.meta?.headers,
              vary: VARY_HEADER
            },
            isBase64Encoded: isBinary
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => (route.startsWith("/api/") || route === "/api") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !(event.query.__nextDataReq === "1") && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes = {}, routes = {} } = prerenderManifest ?? {};
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
var REDIRECTS = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"] && headers["x-prerender-revalidate"] === PrerenderManifest?.preview?.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else if (REDIRECTS.has(statusCode) && key.toLowerCase() === "location") {
        resHeaders[key] = normalizeLocationHeader(value, internalEvent.url);
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite,
    rewriteStatusCode: rewriteUrl && !isExternalRewrite ? statusCode : void 0
  };
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_HEADER_REWRITE_STATUS_CODE = `${INTERNAL_HEADER_PREFIX}rewrite-status-code`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
var NEXT_INTERNAL_HEADERS = [
  "x-middleware-rewrite",
  "x-middleware-redirect",
  "x-middleware-set-cookie",
  "x-middleware-skip",
  "x-middleware-override-headers",
  "x-middleware-next",
  "x-now-route-matches",
  "x-matched-path",
  "x-nextjs-data",
  "x-next-resume-state-length"
];
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      const lowerCaseKey = key.toLowerCase();
      if (lowerCaseKey.startsWith(INTERNAL_HEADER_PREFIX) || lowerCaseKey.startsWith(MIDDLEWARE_HEADER_PREFIX) || NEXT_INTERNAL_HEADERS.includes(lowerCaseKey)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = normalizeLocationHeader(redirect.headers.Location, event.url, true);
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    const middlewareHeadersPrioritized = globalThis.openNextConfig.dangerous?.middlewareHeadersOverrideNextConfigHeaders ?? false;
    if (middlewareHeadersPrioritized) {
      headers = {
        ...headers,
        ...middlewareEventOrResult.responseHeaders
      };
    } else {
      headers = {
        ...middlewareEventOrResult.responseHeaders,
        ...headers
      };
    }
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0)) {
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0,
      rewriteStatusCode: middlewareEventOrResult.rewriteStatusCode
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const middlewareConfig = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(middlewareConfig?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(middlewareConfig?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(middlewareConfig?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers["x-isr"] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId,
              [INTERNAL_HEADER_REWRITE_STATUS_CODE]: String(result.rewriteStatusCode)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    if (process.env.OPEN_NEXT_REQUEST_ID_HEADER || globalThis.openNextDebug) {
      result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    }
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
