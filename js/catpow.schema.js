(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // modules/src/schema/functions/createAgent.js
  var createAgent = (matrix, ref, key2, value, parent, params) => {
    const agent = { matrix, ref, key: key2, value, parent };
    for (let functionName in matrix.curries) {
      agent[functionName] = matrix.curries[functionName](agent);
    }
    if (params != null) {
      Object.assign(agent, params);
    }
    agent.message = false;
    agent.schemaStatus = /* @__PURE__ */ new Map();
    agent.conditionalSchemaStatus = /* @__PURE__ */ new WeakMap();
    agent.conditionalRequiredFlag = /* @__PURE__ */ new Map();
    agent.eventListeners = {};
    agent.debug = parent ? parent.debug : params?.debug || false;
    agent.rootAgent = parent ? parent.rootAgent : agent;
    agent.rootMatrix = parent ? parent.rootMatrix : matrix;
    agent.rootSchema = agent.rootMatrix.schemas[0];
    for (let schema2 of matrix.schemas) {
      if (schema2.isConditional) {
        agent.schemaStatus.set(schema2, 0);
        agent.conditionalSchemaStatus.set(schema2, 0);
      } else {
        agent.schemaStatus.set(schema2, parent ? parent.getSchemaStatus(schema2.parent) : 3);
      }
    }
    if (matrix.properties != null) {
      if (agent.value == null || Array.isArray(agent.value) || typeof agent.value !== "object") {
        agent.value = value = {};
      }
      agent.properties = {};
      for (let propertyName in matrix.properties) {
        agent.properties[propertyName] = createAgent(matrix.properties[propertyName], value, propertyName, value[propertyName], agent);
      }
    } else if (matrix.items != null) {
      if (agent.value == null || !Array.isArray(agent.value)) {
        agent.value = value = [];
      }
      if (value.length > 0) {
        agent.items = [];
        for (let index in value) {
          agent.items[index] = createAgent(matrix.items, value, index, value[index], agent);
        }
      } else {
        agent.items = [createAgent(matrix.items, value, 0, null, agent)];
      }
    }
    return agent;
  };

  // modules/src/schema/methods/index.js
  var methods_exports = {};
  __export(methods_exports, {
    extractDependencies: () => extractDependencies,
    find: () => find,
    getDefaultValue: () => getDefaultValue,
    getErrorMessage: () => getErrorMessage,
    getErrorMessageFormat: () => getErrorMessageFormat,
    getMatchedSchemas: () => getMatchedSchemas,
    getMergedSchema: () => getMergedSchema,
    getMergedSchemaForValue: () => getMergedSchemaForValue,
    getPrimaryPropertyName: () => getPrimaryPropertyName,
    getResolvedSchema: () => getResolvedSchema,
    getSubSchema: () => getSubSchema,
    getType: () => getType,
    mergeSchema: () => mergeSchema,
    mergeSchemas: () => mergeSchemas,
    sanitize: () => sanitize,
    test: () => test
  });

  // modules/src/schema/methods/getErrorMessageFormat.js
  var getErrorMessageFormat = (params) => {
    const { invalidBy, schema: schema2 } = params;
    if (schema2.message != null) {
      return schema2.message;
    }
    switch (invalidBy) {
      case "type":
        return "\u5165\u529B\u5024\u306E\u578B\u304C\u4E00\u81F4\u3057\u307E\u305B\u3093";
      case "minimum":
        return schema2.exclusiveMinimum ? "{minimum}\u3088\u308A\u5927\u304D\u3044\u6570\u5024\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044" : "{minimum}\u4EE5\u4E0A\u306E\u6570\u5024\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044";
      case "exclusiveMinimum":
        return "{exclusiveMinimum}\u3088\u308A\u5927\u304D\u3044\u6570\u5024\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044";
      case "maximum":
        return schema2.exclusiveMaximum ? "{maximum}\u3088\u308A\u5C0F\u3055\u3044\u6570\u5024\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044" : "{maximum}\u4EE5\u4E0B\u306E\u6570\u5024\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044";
      case "exclusiveMaximum":
        return "{exclusiveMaximum}\u3088\u308A\u5C0F\u3055\u3044\u6570\u5024\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044";
      case "multipleOf":
        return "{multipleOf}\u306E\u500D\u6570\u3067\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044";
      case "pattern":
        return "\u5165\u529B\u5F62\u5F0F\u304C\u4E00\u81F4\u3057\u307E\u305B\u3093";
      case "minLength":
        return "{minLength}\u6587\u5B57\u4EE5\u4E0A\u3067\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044";
      case "maxLength":
        return "{maxLength}\u6587\u5B57\u4EE5\u4E0B\u3067\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044";
      case "required":
      case "dependentRequired":
        return "\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044";
      case "additionalProperties":
        return "\u898F\u5B9A\u306E\u30D7\u30ED\u30D1\u30C6\u30A3\u4EE5\u5916\u5165\u529B\u3067\u304D\u307E\u305B\u3093";
      case "minProperties":
        return "{minProperties}\u4EE5\u4E0A\u306E\u30D7\u30ED\u30D1\u30C6\u30A3\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044";
      case "maxProperties":
        return "{maxProperties}\u4EE5\u4E0B\u306E\u30D7\u30ED\u30D1\u30C6\u30A3\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044";
      case "minItems":
        return "{minItems}\u4EE5\u4E0A\u306E\u30A2\u30A4\u30C6\u30E0\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044";
      case "maxItems":
        return "{maxItems}\u4EE5\u4E0B\u306E\u30A2\u30A4\u30C6\u30E0\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044";
      case "contains":
        return "\u898F\u5B9A\u306E\u5F62\u5F0F\u306E\u30A2\u30A4\u30C6\u30E0\u3092\u542B\u3081\u3066\u304F\u3060\u3055\u3044";
      case "minContains":
        return "\u898F\u5B9A\u306E\u5F62\u5F0F\u306E\u30A2\u30A4\u30C6\u30E0\u3092{maxItems}\u4EE5\u4E0A\u542B\u3081\u3066\u304F\u3060\u3055\u3044";
      case "maxContains":
        return "\u898F\u5B9A\u306E\u5F62\u5F0F\u306E\u30A2\u30A4\u30C6\u30E0\u306F{maxContains}\u4EE5\u4E0B\u306B\u3057\u3066\u304F\u3060\u3055\u3044";
      case "uniqueItems":
        return "\u5024\u304C\u91CD\u8907\u3057\u3066\u3044\u307E\u3059";
      case "oneOf":
        return params.matchedSchemaLength > 1 ? "\u8907\u6570\u306E\u5165\u529B\u898F\u5247\u306B\u4E00\u81F4\u3057\u3066\u3044\u307E\u3059" : "\u4E00\u81F4\u3059\u308B\u5165\u529B\u898F\u5247\u304C\u3042\u308A\u307E\u305B\u3093";
      case "anyOf":
        return "\u4E00\u81F4\u3059\u308B\u5165\u529B\u898F\u5247\u304C\u3042\u308A\u307E\u305B\u3093";
    }
    return null;
  };

  // modules/src/schema/methods/getErrorMessage.js
  var getErrorMessage = (params) => {
    const format = getErrorMessageFormat(params);
    if (format == null) {
      return null;
    }
    return format.replace(/{\w+}/g, (matches) => {
      const key2 = matches.slice(1, -1);
      if (params[key2] != null) {
        return params[key2];
      }
      if (params.schema[key2] != null) {
        return params.schema[key2];
      }
      return matches;
    });
  };

  // modules/src/schema/methods/extractDependencies.js
  var extractDependencies = (schema2) => {
    if (schema2.dependencies != null) {
      if (Array.isArray(Object.values(schema2.dependencies)[0])) {
        return { dependentRequired: schema2.dependencies };
      } else {
        return { dependentSchemas: schema2.dependencies };
      }
    } else {
      const { dependentRequired, dependentSchemas } = schema2;
      return { dependentRequired, dependentSchemas };
    }
  };

  // modules/src/schema/methods/getSubSchema.js
  var getSubSchema = (path, schema2, rootSchema2) => {
    let keys = path.split("/");
    if (keys[0] === "#") {
      keys.shift();
      schema2 = rootSchema2;
    }
    keys.every((key2) => {
      if (!schema2.hasOwnProperty(key2)) {
        schema2 = null;
        return false;
      }
      schema2 = schema2[key2];
      return true;
    });
    return schema2;
  };

  // modules/src/schema/methods/find.js
  var find = (callback, schema2, rootSchema2, params = {}) => {
    if (schema2 == null) {
      return null;
    }
    const result = callback(schema2, rootSchema2);
    if (result != null) {
      return result;
    }
    if (!params.refStack != null) {
      params.refStack = /* @__PURE__ */ new WeakMap();
    }
    if (params.refStack.has(schema2)) {
      return null;
    }
    params.refStack.set(schema2, true);
    if (schema2.allOf != null) {
      for (let i2 in schema2.allOf) {
        const result2 = find(callback, schema2.allOf[i2], rootSchema2, params);
        if (result2 != null) {
          return result2;
        }
      }
    }
    if (params.proactive) {
      if (schema2.anyOf != null) {
        for (let i2 in schema2.anyOf) {
          const result2 = find(callback, schema2.anyOf[i2], rootSchema2, params);
          if (result2 != null) {
            return result2;
          }
        }
      }
      if (schema2.oneOf != null) {
        for (let i2 in schema2.oneOf) {
          const result2 = find(callback, schema2.oneOf[i2], rootSchema2, params);
          if (result2 != null) {
            return result2;
          }
        }
      }
      for (let key2 in ["if", "then", "else"]) {
        if (schema2[key2] == null) {
          break;
        }
        const result2 = find(callback, schema2[key2], rootSchema2, params);
        if (result2 != null) {
          return result2;
        }
      }
      const { dependentSchemas } = extractDependencies(schema2);
      if (dependentSchemas) {
        for (let i2 in dependentSchemas) {
          const result2 = find(callback, dependentSchemas[i2], rootSchema2, params);
          if (result2 != null) {
            return result2;
          }
        }
      }
    }
    if (schema2["$ref"] != null) {
      const refSchema = getSubSchema(schema2.$ref, schema2, rootSchema2);
      const result2 = find(callback, refSchema, rootSchema2, params);
      if (result2 != null) {
        return result2;
      }
    }
    return null;
  };

  // modules/src/schema/methods/getType.js
  var getType = (schema2, rootSchema2) => {
    return find(
      (schema3) => {
        if (schema3.type != null) {
          return schema3.type;
        }
        if (schema3.properties != null) {
          return "object";
        }
        if (schema3.items != null || schema3.prefixItems != null) {
          return "array";
        }
        if (schema3.minimum != null || schema3.maximam != null || schema3.multipleOf != null) {
          return "number";
        }
        if (schema3.pattern != null || schema3.minLength != null || schema3.maxLength != null) {
          return "string";
        }
        if (schema3.const != null) {
          return typeof schema3.const;
        }
        if (schema3.default != null) {
          return typeof schema3.default;
        }
        if (schema3.enum != null && schema3.enum.length) {
          return typeof schema3.enum[0];
        }
        if (schema3["@type"] != null) {
          return "object";
        }
      },
      schema2,
      rootSchema2
    );
  };

  // modules/src/schema/methods/getResolvedSchema.js
  var cache = /* @__PURE__ */ new WeakMap();
  var getResolvedSchema = (schema2, rootSchema2) => {
    if (schema2 == null) {
      return {};
    }
    if (rootSchema2 == null) {
      rootSchema2 = schema2;
    }
    if (cache.has(schema2)) {
      return cache.get(schema2);
    }
    const resolvedSchema = {};
    const { properties = null, items = null, ...otherParams } = schema2;
    if (schema2.hasOwnProperty("@type")) {
      Object.assign(resolvedSchema, getResolvedSchema(getSubSchema("#/$defs/" + schema2["@type"], schema2, rootSchema2), rootSchema2));
    }
    if (schema2.hasOwnProperty("$ref")) {
      Object.assign(resolvedSchema, getResolvedSchema(getSubSchema(schema2.$ref, schema2, rootSchema2), rootSchema2));
    }
    if (items != null) {
      if (resolvedSchema.items) {
        const { properties: itemsProperties = null, ...otherItemsParams } = items;
        if (itemsProperties != null) {
          resolvedSchema.items.properties = Object.assign({}, resolvedSchema.items.properties || {}, itemsProperties);
        }
        Object.assign(resolvedSchema.items, otherItemsParams);
      } else {
        resolvedSchema.items = items;
      }
    }
    if (properties != null) {
      if (resolvedSchema.properties == null) {
        resolvedSchema.properties = {};
      }
      resolvedSchema.properties = Object.assign({}, resolvedSchema.properties, properties);
    }
    Object.assign(resolvedSchema, otherParams);
    if (resolvedSchema.type == null) {
      resolvedSchema.type = getType(resolvedSchema, rootSchema2);
    }
    cache.set(schema2, resolvedSchema);
    return resolvedSchema;
  };

  // modules/src/schema/methods/test.js
  var test = (value, schema2, rootSchema2, params = {}) => {
    const type = getType(schema2, rootSchema2);
    schema2 = getResolvedSchema(schema2, rootSchema2);
    const { ignoreRequired = false, recursive = false, onError = false, onSuccess = false } = params;
    const cb = (invalidBy, params2 = {}) => onError && onError(Object.assign({ invalidBy, schema: schema2, value }, params2));
    if (schema2.const != null && schema2.const !== value) {
      return cb("const");
    }
    if (schema2.enum != null && !schema2.enum.includes(value)) {
      return cb("enum");
    }
    if (value == null) {
      return true;
    }
    switch (type) {
      case "boolean": {
        if (typeof value !== "boolean") {
          return cb("type");
        }
        break;
      }
      case "integer":
      case "number": {
        if (type === "intger" && !Number.isInteger(value)) {
          return cb("type");
        }
        if (schema2.minimum != null && value < schema2.minimum) {
          return cb("minimum");
        }
        if (schema2.maximum != null && value > schema2.maximum) {
          return cb("maximum");
        }
        if (schema2.exclusiveMinimum != null) {
          if (typeof schema2.exclusiveMinimum === "boolean") {
            if (schema2.exclusiveMinimum === true && value <= schema2.minimum) {
              return cb("minimum");
            }
          } else {
            if (value <= schema2.exclusiveMinimum) {
              return cb("exclusiveMinimum");
            }
          }
        }
        if (schema2.exclusiveMaximum != null) {
          if (typeof schema2.exclusiveMaximum === "boolean") {
            if (schema2.exclusiveMaximum === true && value >= schema2.maximum) {
              return cb("maximum");
            }
          } else {
            if (value >= schema2.exclusiveMaximum) {
              return cb("exclusiveMaximum");
            }
          }
        }
        if (schema2.multipleOf != null) {
          if (value % schema2.multipleOf !== 0) {
            return cb("multipleOf");
          }
        }
        break;
      }
      case "string": {
        if (schema2.pattern != null) {
          const reg = new RegExp(schema2.pattern);
          if (!reg.test(value)) {
            return cb("pattern");
          }
        }
        if (schema2.minLength != null && value.length < schema2.minLength) {
          return cb("minLength");
        }
        if (schema2.maxLength != null && value.length > schema2.maxLength) {
          return cb("maxLength");
        }
        break;
      }
      case "object": {
        if (typeof value !== "object" || Array.isArray(value)) {
          return cb("type");
        }
        if (schema2.required != null && !ignoreRequired) {
          for (let propertyName of schema2.required) {
            if (value[propertyName] == null) {
              return cb("required", { propertyName });
            }
          }
        }
        if (schema2.additionalProperties != null && schema2.additionalProperties === false) {
          if (Object.keys(value).some((key2) => !schema2.properties.hasOwnProperty(key2))) {
            return cb("additionalProperties");
          }
        }
        const { dependentRequired, dependentSchemas } = extractDependencies(schema2);
        if (dependentRequired) {
          if (!ignoreRequired) {
            for (let keyPropertyName in dependentRequired) {
              if (value[keyPropertyName] == null) {
                continue;
              }
              for (let propertyName of dependentRequired[keyPropertyName]) {
                if (value[propertyName] == null) {
                  return cb("dependentRequired", { propertyName });
                }
              }
            }
          }
        }
        if (dependentSchemas) {
          for (let propertyName in dependentSchemas) {
            if (value[key] == null) {
              continue;
            }
            const result = test(value, dependentSchemas[propertyName], rootSchema2, params);
            if (result !== true) {
              return result;
            }
          }
        }
        const length = Object.keys(value).length;
        if (schema2.minProperties != null && length < schema2.minProperties) {
          return cb("minProperties");
        }
        if (schema2.maxProperties != null && length > schema2.maxProperties) {
          return cb("maxProperties");
        }
        if (recursive && schema2.properties != null) {
          if (Object.keys(schema2.properties).some((key2) => {
            if (value[key2] == null) {
              return false;
            }
            return test(value[key2], schema2.properties[key2], rootSchema2, params) !== true;
          })) {
            return false;
          }
        }
        break;
      }
      case "array": {
        if (schema2.minItems != null && value.length < schema2.minItems) {
          return cb("minItems");
        }
        if (schema2.maxItems != null && value.length > schema2.maxItems) {
          return cb("maxItems");
        }
        if (schema2.prefixItems != null) {
          if (schema2.prefixItems.some((itemSchema, index) => value[index] !== void 0 && test(value[index], itemSchema, rootSchema2, params) !== true)) {
            return cb("prefixItems");
          }
        }
        if (schema2.contains != null) {
          const matchedItems = value.filter((item) => test(item, schema2.contain, rootSchema2, params) !== true);
          if (matchedItems.length === 0) {
            return cb("contains");
          }
          if (schema2.minContains != null && matchedItems.length < schema2.minContains) {
            return cb("minContains");
          }
          if (schema2.maxContains != null && matchedItems.length > schema2.maxContains) {
            return cb("maxContains");
          }
        }
        if (schema2.uniqueItems != null && schema2.uniqueItems === true) {
          if (value.slice(0, -1).some((item, index) => value.indexOf(item, index + 1) !== -1)) {
            return cb("uniqueItems");
          }
        }
        break;
      }
    }
    if (schema2.oneOf != null) {
      const matchedSchemaLength = getMatchedSchemas(value, schema2.oneOf, rootSchema2, { recursive: true }).length;
      if (matchedSchemaLength !== 1) {
        return cb("oneOf", { matchedSchemaLength });
      }
    }
    if (schema2.anyOf != null) {
      if (schema2.anyOf.every((subSchema) => test(value, subSchema, rootSchema2) !== true)) {
        return cb("anyOf");
      }
    }
    if (schema2.allOf != null) {
      for (let subSchema of schema2.allOf) {
        const result = test(value, subSchema, rootSchema2, params);
        if (result !== true) {
          return result;
        }
      }
    }
    if (onSuccess) {
      onSuccess(Object.assign({ schema: schema2, value }, params));
    }
    return true;
  };

  // modules/src/schema/methods/getMatchedSchemas.js
  var getMatchedSchemas = (value, schemas, rootSchema2, params) => {
    return schemas.filter((schema2) => test(value, schema2, rootSchema2, params) === true);
  };

  // modules/src/schema/methods/sanitize.js
  var sanitize = (value, schema2, rootSchema2) => {
    const type = getType(schema2, rootSchema2);
    schema2 = getResolvedSchema(schema2, rootSchema2);
    if (value == null) {
      return value;
    }
    if (schema2.const != null && schema2.const !== value) {
      return schema2.const;
    }
    if (schema2.enum != null && !schema2.enum.includes(value)) {
      return null;
    }
    switch (type) {
      case "integer":
        if (!Number.isInteger(value)) {
          value = parseInt(value);
        }
      case "number": {
        if (typeof value !== "number") {
          parseFloat(value);
        }
        if (schema2.minimum != null && value < schema2.minimum) {
          value = schema2.minimum;
        }
        if (schema2.maximum != null && value > schema2.maximum) {
          value = schema2.maximum;
        }
        const step = schema2.multipleOf || 1;
        if (schema2.exclusiveMinimum != null) {
          if (typeof schema2.exclusiveMinimum === "boolean") {
            if (schema2.exclusiveMinimum === true && value <= schema2.minimum) {
              value = schema2.minimum + step;
            }
          } else {
            if (value <= schema2.exclusiveMinimum) {
              value = schema2.exclusiveMinimum + step;
            }
          }
        }
        if (schema2.exclusiveMaximum != null) {
          if (typeof schema2.exclusiveMaximum === "boolean") {
            if (schema2.exclusiveMaximum === true && value >= schema2.maximum) {
              value = schema2.maximum - step;
            }
          } else {
            if (value <= schema2.exclusiveMaximum) {
              value = schema2.exclusiveMaximum - step;
            }
          }
        }
        break;
      }
      case "string": {
        if (typeof value !== "string" && value.toString) {
          return value.toString();
        }
        break;
      }
      case "object": {
        if (typeof value !== "object" || Array.isArray(value)) {
          return {};
        }
        if (schema2.additionalProperties != null && schema2.additionalProperties === false) {
          for (let key2 in value) {
            if (!schema2.properties.hasOwnProperty(key2)) {
              delete value[key2];
            }
          }
        }
        break;
      }
    }
    return value;
  };

  // modules/src/schema/consts.js
  var consts_exports = {};
  __export(consts_exports, {
    conditionalSchemaKeys: () => conditionalSchemaKeys,
    minMaxKeys: () => minMaxKeys2,
    reservedKeys: () => reservedKeys,
    schemaStatusFlag: () => schemaStatusFlag,
    typeSpecificKeys: () => typeSpecificKeys
  });
  var schemaStatusFlag = Object.freeze({
    input: 1,
    validation: 2
  });
  var reservedKeys = Object.freeze({
    const: 1,
    enum: 1,
    oneOf: 1,
    anyOf: 1,
    $ref: 1,
    minimum: 1,
    maximum: 1,
    multipleOf: 1,
    minLength: 1,
    maxLength: 1,
    items: 1,
    prefixItems: 1,
    minItems: 1,
    maxItems: 1,
    contains: 1,
    minContains: 1,
    maxContains: 1,
    properties: 1,
    required: 1,
    dependencies: 1,
    dependentSchemas: 1,
    dependentRequired: 1
  });
  var typeSpecificKeys = Object.freeze({
    number: ["minimum", "maximum", "multipleOf"],
    string: ["minLength", "maxLength", "pattern"],
    array: ["items", "prefixItems", "minItems", "maxItems", "contains", "minContains", "maxContains"],
    object: [
      "properties",
      "minProperties",
      "maxProperties",
      "propertyNames",
      "patternProperties",
      "additionalProperties",
      "unevaluatedProperties",
      "required",
      "depndencies",
      "dependentSchemas",
      "dependentRequired"
    ]
  });
  var minMaxKeys2 = Object.freeze({
    minimum: false,
    maximum: true,
    minLength: false,
    maxLength: true,
    minItems: false,
    maxItems: true,
    minContains: false,
    maxContains: true
  });
  var conditionalSchemaKeys = Object.freeze({
    allOf: true,
    anyOf: true,
    oneOf: true,
    if: false,
    then: false,
    else: false,
    dependentSchemas: true
  });

  // modules/src/schema/methods/getMergedSchemaForValue.js
  var getMergedSchemaForValue = (value, schema2, rootSchema2) => {
    if (rootSchema2 == null) {
      rootSchema2 = schema2;
    }
    const mergedSchema = {};
    find(
      (schema3) => {
        mergeSchema(mergedSchema, schema3, rootSchema2, { extend: false, value });
      },
      schema2,
      rootSchema2,
      { proactive: false }
    );
    return mergedSchema;
  };

  // modules/src/schema/methods/mergeSchema.js
  var mergeSchema = (targetSchema, schema2, rootSchema2, params = {}) => {
    const { extend = false, initialize = true, value = null } = params;
    const forValue = params.hasOwnProperty("value");
    const includeConditional = forValue || params.includeConditional;
    for (let key2 in schema2) {
      if (!reservedKeys[key2] && targetSchema[key2] == null) {
        targetSchema[key2] = schema2[key2];
      }
    }
    if (schema2.const != null) {
      if (extend) {
        if (targetSchema.enum != null) {
          if (!targetSchema.enum) {
            targetSchema.enum = [];
          }
          if (!targetSchema.enum.includes(schema2.const)) {
            targetSchema.enum.push(schema2.const);
          }
        } else if (initialize) {
          targetSchema.const = schema2.const;
        }
      } else {
        targetSchema.const = schema2.const;
      }
    } else {
      if (extend && targetSchema.const != null) {
        targetSchema.const = null;
      }
      if (schema2.enum != null) {
        if (extend) {
          if (targetSchema.enum == null) {
            if (targetSchema.const != null) {
              targetSchema.enum = schema2.enum.slice();
              if (!targetSchema.enum.includes(targetSchema.cons)) {
                targetSchema.enum.push(targetSchema.const);
              }
              targetSchema.const = null;
            } else if (initialize) {
              targetSchema.enum = schema2.enum.slice();
            }
          } else {
            targetSchema.enum.push.apply(
              targetSchema.enum,
              schema2.enum.filter((val) => !targetSchema.enum.includes(val))
            );
          }
        } else {
          if (targetSchema.enum == null) {
            targetSchema.enum = schema2.enum.slice();
          } else {
            targetSchema.enum = targetSchema.enum.filter((val) => schema2.enum.includes(val));
          }
        }
      } else if (extend && targetSchema.enum != null) {
        targetSchema.enum = null;
      }
    }
    for (let key2 in minMaxKeys2) {
      if (schema2[key2] != null) {
        if (targetSchema[key2] != null) {
          targetSchema[key2] = Math[minMaxKeys2[key2] == extend ? "max" : "min"](targetSchema[key2], schema2[key2]);
        } else {
          if (initialize) {
            targetSchema[key2] = schema2[key2];
          }
        }
      } else if (extend && targetSchema[key2] != null) {
        targetSchema[key2] = null;
      }
    }
    if (schema2.required != null) {
      if (extend) {
        if (targetSchema.required !== null) {
          if (targetSchema.required == null) {
            targetSchema.required = schema2.required.slice();
          } else {
            targetSchema.required = targetSchema.required.filter((val) => schema2.required.includes(val));
          }
        }
      } else {
        if (targetSchema.required == null) {
          targetSchema.required = schema2.required.slice();
        } else {
          targetSchema.required.push.apply(
            targetSchema.required,
            schema2.required.filter((val) => !targetSchema.required.includes(val))
          );
        }
      }
    } else if (extend && targetSchema.required != null) {
      targetSchema.required = null;
    }
    if (schema2.properties != null) {
      if (targetSchema.properties == null) {
        targetSchema.properties = {};
      }
      for (let key2 in schema2.properties) {
        const propParams = Object.assign({}, params);
        if (forValue) {
          propParams.value = propParams.value[key2];
        }
        if (targetSchema.properties[key2] != null) {
          mergeSchema(targetSchema.properties[key2], schema2.properties[key2], rootSchema2, propParams);
        } else {
          const propSchema = {};
          mergeSchema(propSchema, schema2.properties[key2], rootSchema2, propParams);
          targetSchema.properties[key2] = propSchema;
        }
      }
    }
    if (schema2.items != null) {
      if (targetSchema.items == null) {
        targetSchema.items = getMergedSchema(schema2.items, rootSchema2);
        if (forValue && value != null) {
          targetSchema.itemsForValue = [];
          for (let i2 in value) {
            targetSchema.itemsForValue.push(getMergedSchemaForValue(value[i2], schema2.items, rootSchema2));
          }
        }
      }
    }
    if (!includeConditional) {
      return targetSchema;
    }
    const conditionalSchemas = [];
    if (schema2.oneOf != null) {
      conditionalSchemas.push.apply(conditionalSchemas, forValue ? getMatchedSchemas(value, schema2.oneOf, rootSchema2, { ignoreRequired: true }) : schema2.oneOf);
    }
    if (schema2.anyOf != null) {
      conditionalSchemas.push.apply(conditionalSchemas, forValue ? getMatchedSchemas(value, schema2.anyOf, rootSchema2, { ignoreRequired: true }) : schema2.anyOf);
    }
    const { dependentSchemas } = extractDependencies(schema2);
    if (dependentSchemas != null) {
      if (forValue) {
        for (let key2 in dependentSchemas) {
          if (value[key2] != null) {
            conditionalSchemas.push(dependentSchemas[key2]);
          }
        }
      } else {
        conditionalSchemas.push.apply(conditionalSchemas, Object.values(dependentSchemas));
      }
    }
    if (conditionalSchemas.length) {
      const mergedConditionalSchema = {};
      for (let i2 in conditionalSchemas) {
        if (forValue) {
          mergeSchema(mergedConditionalSchema, getMergedSchemaForValue(value, conditionalSchemas[i2], rootSchema2), rootSchema2, { extend: true, value });
        } else {
          mergeSchema(mergedConditionalSchema, getMergedSchemaForValue(value, conditionalSchemas[i2], rootSchema2), rootSchema2, { extend: true });
        }
      }
      mergeSchema(targetSchema, conditionalSchemas[i], rootSchema2, params);
    }
    return targetSchema;
  };

  // modules/src/schema/methods/getMergedSchema.js
  var cache2 = /* @__PURE__ */ new WeakMap();
  var getMergedSchema = (schema2, rootSchema2) => {
    if (rootSchema2 == null) {
      rootSchema2 = schema2;
    }
    if (cache2.has(schema2)) {
      return cache2.get(schema2);
    }
    const mergedSchema = {};
    find(
      (schema3) => {
        mergeSchema(mergedSchema, schema3, rootSchema2, { extend: false });
      },
      schema2,
      rootSchema2,
      { proactive: false }
    );
    cache2.set(schema2, mergedSchema);
    return mergedSchema;
  };

  // modules/src/schema/methods/getPrimaryPropertyName.js
  var getPrimaryPropertyName = (schema2, rootSchema2) => {
    if (getType(schema2, rootSchema2) !== "object") {
      return null;
    }
    const mergedSchema = getMergedSchema(schema2, rootSchema2);
    if (mergedSchema.properties["@type"] != null) {
      return "@type";
    }
    return Object.keys(mergedSchema.properties).find((key2) => mergedSchema.properties[key2].enum != null);
  };

  // modules/src/schema/methods/mergeSchemas.js
  var mergeSchemas = (schemas, rootSchema2, params = {}) => {
    const mergedSchema = {};
    schemas.forEach((schema2) => mergeSchema(mergedSchema, schema2, rootSchema2, params));
    if (mergedSchema.properties != null) {
      const sortedProperties = {};
      Object.keys(mergedSchema.properties).sort((key1, key2) => {
        return (mergedSchema.properties[key1].order || 10) - (mergedSchema.properties[key2].order || 10);
      }).forEach((key2) => {
        sortedProperties[key2] = mergedSchema.properties[key2];
      });
      mergedSchema.properties = sortedProperties;
    }
    return mergedSchema;
  };

  // modules/src/schema/methods/getDefaultValue.js
  var getDefaultValue = (schema2, rootSchema2) => {
    const type = getType(schema2, rootSchema2);
    schema2 = getResolvedSchema(schema2, rootSchema2);
    if (schema2.default != null) {
      return schema2.default;
    }
    if (schema2.const != null) {
      return schema2.const;
    }
    if (schema2.enum != null) {
      return schema2.enum[0];
    }
    switch (type) {
      case "null": {
        return null;
      }
      case "boolean": {
        return false;
      }
      case "integer":
      case "number": {
        if (schema2.minimum != null) {
          const unit2 = schema2.multipleOf != null ? schema2.multipleOf : 1;
          if (schema2.exclusiveMinimum === true) {
            return schema2.minimum + unit2;
          }
          return schema2.minimum;
        }
        if (schema2.exclusiveMinimum != null) {
          return schema2.exclusiveMinimum + unit;
        }
        return 0;
      }
      case "string": {
        return "";
      }
    }
    return null;
  };

  // modules/src/schema/functions/getPossibleTypes.js
  var getPossibleTypes = (schemas) => {
    const flags = {};
    schemas.forEach((schema2) => flags[schema2.type] = true);
    return flags;
  };

  // modules/src/schema/functions/walkDescendantSchema.js
  var walkDescendantSchema = (agent, schema2, cb) => {
    agent.walkChildren((child) => {
      for (let subSchema of child.matrix.schemas) {
        if (subSchema.parent === schema2) {
          if (cb(child, subSchema) !== false) {
            walkDescendantSchema(child, subSchema, cb);
          }
        }
      }
    });
  };

  // modules/src/schema/functions/debugLog.js
  var debugLog2 = (message, object) => {
    console.groupCollapsed(message);
    console.debug(object);
    console.trace();
    console.groupEnd();
  };

  // modules/src/schema/functions/createMatrix.js
  var updateHandles = /* @__PURE__ */ new WeakMap();
  var createMatrix = (schemas) => {
    const possibleTypes = getPossibleTypes(schemas);
    const curries = {
      on: (agent) => {
        return (type, callback, arg = null) => {
          if (agent.eventListeners[type] == null) {
            agent.eventListeners[type] = /* @__PURE__ */ new Map();
          }
          agent.eventListeners[type].set(callback, arg);
        };
      },
      off: (agent) => {
        return (type, callback) => {
          if (agent.eventListeners[type] == null) {
            return;
          }
          return agent.eventListeners[type].delete(callback);
        };
      },
      trigger: (agent) => {
        return (event) => {
          if (typeof event === "string") {
            event = { type: event, bubbles: true };
          }
          if (agent.debug) {
            debugLog2(`\u26A1 trigger event '${event.type}' on '${agent.key}'`, { event, agent });
          }
          event.target = agent;
          const cb = (agent2) => {
            if (agent2.eventListeners[event.type] == null) {
              return true;
            }
            let stopPropagation = false;
            agent2.eventListeners[event.type].forEach((arg, callback) => {
              if (callback(event, arg) === false) {
                stopPropagation = true;
              }
            });
            return !stopPropagation;
          };
          if (cb(agent) !== false && event.bubbles && agent.parent != null) {
            agent.parent.trigger(event);
          }
        };
      },
      getAgent: (agent) => {
        return (path) => {
          if (!Array.isArray(path)) {
            path = path.split("/");
          }
          if (path.length === 0) {
            return agent;
          }
          const key2 = path.shift();
          if (isNaN(key2)) {
            return agent.properties[key2].getAgent(path);
          } else {
            const index = parseInt(key2);
            if (agent.prefixItems != null) {
              if (index < agent.prefixItems.length) {
                return agent.prefixItems[index].getAgent(path);
              } else {
                return agent.prefixItems[index - agent.prefixItems.length].getAgent(path);
              }
            } else {
              return agent.items[index].getAgent(path);
            }
          }
        };
      },
      walkChildren: (agent) => {
        return (cb) => {
          if (agent.properties != null) {
            for (let name in agent.properties) {
              cb(agent.properties[name]);
            }
          }
          if (agent.prefixItems != null) {
            for (let child of agent.prefixItems) {
              cb(child);
            }
          }
          if (agent.items != null) {
            for (let child of agent.items) {
              cb(child);
            }
          }
        };
      },
      getConditionalSchemaStatus: (agent) => {
        return (schema2) => {
          return agent.conditionalSchemaStatus.get(schema2);
        };
      },
      setConditionalSchemaStatus: (agent) => {
        return (schema2, status) => {
          if (agent.conditionalSchemaStatus.get(schema2) === status) {
            return status;
          }
          agent.conditionalSchemaStatus.set(schema2, status);
          if (agent.debug) {
            debugLog2(`\u{1F511} conditionalSchemaStatus of '${agent.key}' was changed`, { schema: schema2, status });
          }
          agent.setSchemaStatus(schema2, agent.parent == null ? 3 : agent.parent.getSchemaStatus(schema2.parent) & status);
        };
      },
      getParentSchemaStatus: (agent) => {
        return (schema2) => {
          return agent.conditionalSchemaStatus.get(schema2);
        };
      },
      setConditionalRequiredFlag: (agent) => {
        return (schema2, flag) => {
          if (agent.conditionalRequiredFlag.get(schema2) === flag) {
            return flag;
          }
          agent.conditionalRequiredFlag.set(schema2, flag);
          agent.isReqired = false;
          for (let [schema3, flag2] of agent.conditionalRequiredFlag.entries()) {
            if (flag2 && agent.getSchemaStatus(schema3) & 1) {
              agent.isReqired = true;
              break;
            }
          }
        };
      },
      getSchemaStatus: (agent) => {
        return (schema2) => {
          if (agent.schemaStatus == null || !agent.schemaStatus.has(schema2)) {
            return 1;
          }
          return agent.schemaStatus.get(schema2);
        };
      },
      setSchemaStatus: (agent) => {
        return (schema2, status) => {
          if (agent.schemaStatus.get(schema2) === status) {
            return status;
          }
          agent.schemaStatus.set(schema2, status);
          if (agent.debug) {
            debugLog2(`\u{1F511} schemaStatus of '${agent.key}' was changed`, { schema: schema2, status });
          }
          walkDescendantSchema(agent, schema2, (agent2, schema3) => {
            const currentStatus = agent2.schemaStatus.get(schema3);
            let status2 = agent2.parent.schemaStatus.get(schema3.parent);
            if (agent2.conditionalSchemaStatus.has(schema3)) {
              status2 &= agent2.conditionalSchemaStatus.get(schema3);
              let container = schema3.container;
              while (agent2.conditionalSchemaStatus.has(container)) {
                status2 &= agent2.conditionalSchemaStatus.get(container);
                container = container.container;
              }
            }
            if (status2 === currentStatus) {
              return false;
            }
            agent2.schemaStatus.set(schema3, status2);
          });
        };
      },
      getSchemas: (agent) => {
        return (status) => {
          return schemas.filter((schema2) => (agent.getSchemaStatus(schema2) & status) != 0);
        };
      },
      getSchemasForInput: (agent) => {
        return () => agent.getSchemas(1);
      },
      getSchemasForValidation: (agent) => {
        return () => agent.getSchemas(2);
      },
      getMergedSchema: (agent) => {
        const cache3 = {};
        return (status = 1, extend = true) => {
          const key2 = agent.getMergedSchemaKey(status, extend);
          if (cache3[key2] != null) {
            return cache3[key2];
          }
          cache3[key2] = mergeSchemas(agent.getSchemas(status), agent.rootSchema, extend);
          return cache3[key2];
        };
      },
      getMergedSchemaKey: (agent) => {
        return (status = 1, extend = true) => {
          return Array.from(agent.schemaStatus.values()).join("") + "-" + status + (extend ? "-e" : "");
        };
      },
      getMergedSchemaForInput: (agent) => {
        return () => agent.getMergedSchema(1, true);
      },
      getMergedSchemaForValidation: (agent) => {
        return () => agent.getMergedSchema(2, false);
      },
      getValue: (agent) => {
        return (getDefaultValueIfEmpty = true) => {
          if (agent.value == null && getDefaultValueIfEmpty) {
            return getDefaultValue(agent.getMergedSchemaForInput(), agent.rootSchema);
          }
          return agent.value;
        };
      },
      setValue: (agent) => {
        return (value) => {
          agent.value = value;
          agent.trigger({ type: "change", bubbles: true });
          if (agent.debug) {
            debugLog2(`\u{1F4DD} change value for '${agent.key}'`, { value });
          }
        };
      },
      deleteValue: (agent) => {
        return () => {
          agent.value = null;
          agent.trigger({ type: "change", bubbles: true });
        };
      },
      update: (agent) => {
        return () => {
          if (agent.debug) {
            debugLog2(`\u2699\uFE0F update process for '${agent.key}' start`, { agent });
          }
          if (agent.value == null) {
            delete agent.ref[agent.key];
          } else {
            agent.ref[agent.key] = agent.value;
          }
          if (agent.parent != null) {
            agent.parent.update();
          }
          updateHandles.get(agent.matrix)(agent);
          agent.validate();
          if (!agent.isValid) {
            agent.trigger({ type: "error", bubbles: false });
          }
          agent.trigger({ type: "update", bubbles: false });
          if (agent.debug) {
            debugLog2(`\u2699\uFE0F update process for '${agent.key}' end`, { agent });
          }
        };
      },
      validate: (agent) => {
        return () => {
          agent.isValid = agent.getSchemasForValidation().every((schema2) => {
            return test(agent.value, schema2, agent.rootSchema, {
              onSuccess: (params) => {
                agent.setMessage(null);
              },
              onError: (params) => {
                if (agent.debug) {
                  debugLog2("\u26A0\uFE0F invalid value was found", params);
                }
                agent.setMessage(getErrorMessage(params));
                agent.trigger({ type: "error", bubble: false });
                return false;
              }
            });
          });
          agent.trigger({ type: "validate", bubbles: false });
        };
      },
      initialize: (agent) => {
        return () => {
          if (agent.value == null) {
            agent.value = getDefaultValue(agent.getMergedSchemaForInput(), agent.rootSchema);
          }
          agent.walkChildren((agent2) => agent2.initialize());
          updateHandles.get(agent.matrix)(agent);
          agent.trigger({ type: "initialize", bubbles: false });
        };
      },
      sanitize: (agent) => {
        return () => {
          let value = agent.getValue();
          const schemas2 = agent.getSchemasForValidation();
          for (const schema2 of schemas2) {
            value = sanitize(value, schema2, agent.rootSchema);
          }
          if (value !== agent.getValue()) {
            agent.setValue(value);
          }
          agent.walkChildren((agent2) => agent2.sanitize());
          updateHandles.get(agent.matrix)(agent);
          agent.trigger({ type: "sanitize", bubbles: false });
        };
      },
      getMessage: (agent) => {
        return () => agent.message;
      },
      setMessage: (agent) => {
        return (message) => {
          agent.message = message;
        };
      },
      getProperties: (agent) => {
        return () => {
          return agent.properties;
        };
      },
      getPrefixItems: (agent) => {
        return () => {
          return agent.prefixItems;
        };
      },
      getItems: (agent) => {
        return () => {
          return agent.items;
        };
      },
      addItem: (agent) => {
        return (index, value) => {
          const item = createAgent(agent.matrix.items, agent.value, index, value, agent.parent);
          agent.value.splice(index, 0, value);
          agent.items.splice(index, 0, item);
          agent.items.forEach((item2, index2) => item2.key = index2);
          item.initialize();
          agent.trigger({ type: "addItem", bubbles: false });
          agent.trigger({ type: "modifyItems", bubbles: false });
        };
      },
      copyItem: (agent) => {
        return (from, to) => {
          agent.addItem(to, JSON.parse(JSON.stringify(agent.items[from].getValue())));
        };
      },
      moveItem: (agent) => {
        return (from, to) => {
          agent.items.splice(to, 0, agent.items.splice(from, 1)[0]);
          agent.items.forEach((item, index) => item.key = index);
          agent.trigger({ type: "moveItem", bubbles: false });
          agent.trigger({ type: "modifyItems", bubbles: false });
        };
      },
      removeItem: (agent) => {
        return (index) => {
          agent.value.splice(index, 1);
          agent.items.splice(index, 1);
          agent.items.forEach((item, index2) => item.key = index2);
          agent.trigger({ type: "removeItem", bubbles: false });
          agent.trigger({ type: "modifyItems", bubbles: false });
        };
      }
    };
    return { possibleTypes, curries, schemas };
  };

  // modules/src/schema/functions/getUnlimietedSchema.js
  var getUnlimietedSchema = (schema2) => {
    const unlimitedSchema = Object.assign({}, schema2);
    delete unlimitedSchema.enum;
    delete unlimitedSchema.const;
    for (let key2 in minMaxKeys) {
      if (unlimitedSchema[key2] != null) {
        delete unlimitedSchema[key2];
      }
    }
    return unlimitedSchema;
  };

  // modules/src/schema/functions/getMatrix.js
  var getMatrix = (originalSchemas) => {
    const updateHandlesList = [];
    const schemas = originalSchemas.slice();
    const registerSchema = (schema2) => {
      if (schema2.if != null) {
        schemas.push(getUnlimietedSchema(schema2.if));
        updateHandlesList.push((agent) => {
          const isValid = test(agent.getValue(), schema2.if, rootSchema);
          if (schema2.then != null) {
            agent.setConditionalSchemaStatus(schema2.then, isValid ? 3 : 0);
          }
          if (schema2.else != null) {
            agent.setConditionalSchemaStatus(schema2.else, isValid ? 0 : 3);
          }
        });
      }
      if (schema2.allOf != null) {
        schemas.push.apply(schemas, schema2.allOf);
      }
      if (schema2.anyOf != null) {
        schemas.push.apply(schemas, schema2.anyOf);
        const keyPropertyNames = Object.keys(schema2.properties);
        updateHandlesList.push((agent) => {
          schema2.anyOf.forEach((subSchema) => {
            if (subSchema.properties == null) {
              return;
            }
            const isValid = keyPropertyNames.every((keyPropertyName) => {
              return subSchema.properties[keyPropertyName] == null || test(agent.properties[keyPropertyName].getValue(), subSchema.properties[keyPropertyName], rootSchema);
            });
            agent.setConditionalSchemaStatus(subSchema, isValid ? 3 : 0);
            keyPropertyNames.forEach((keyPropertyName) => {
              if (subSchema.properties[keyPropertyName] == null) {
                return;
              }
              agent.properties[keyPropertyName].setConditionalSchemaStatus(subSchema.properties[keyPropertyName], 0);
            });
          });
        });
      }
      if (schema2.oneOf != null) {
        schemas.push.apply(schemas, schema2.oneOf);
        const keyPropertyNames = Object.keys(schema2.properties);
        updateHandlesList.push((agent) => {
          schema2.oneOf.forEach((subSchema) => {
            if (subSchema.properties == null) {
              return;
            }
            const isValid = keyPropertyNames.every((keyPropertyName) => {
              return subSchema.properties[keyPropertyName] == null || test(agent.properties[keyPropertyName].getValue(), subSchema.properties[keyPropertyName], rootSchema);
            });
            agent.setConditionalSchemaStatus(subSchema, isValid ? 3 : 0);
            keyPropertyNames.forEach((keyPropertyName) => {
              if (subSchema.properties[keyPropertyName] == null) {
                return;
              }
              agent.properties[keyPropertyName].setConditionalSchemaStatus(subSchema.properties[keyPropertyName], 0);
            });
          });
        });
      }
      const { dependentRequired, dependentSchemas } = extractDependencies(schema2);
      if (dependentSchemas != null) {
        for (let name in dependentSchemas) {
          schemas.push(dependentSchemas[name]);
        }
        updateHandlesList.push((agent) => {
          const value = agent.getValue();
          for (let name in dependentSchemas) {
            agent.setConditionalSchemaStatus(dependentSchemas[name], value[name] != null ? 3 : 0);
          }
        });
      }
      if (dependentRequired != null) {
        updateHandlesList.push((agent) => {
          const value = agent.getValue();
          for (let name in dependentRequired) {
            const flag = value[name] != null;
            dependentRequired[name].forEach((name2) => {
              agent.properties[name2].setConditionalRequiredFlag(schema2, flag);
            });
          }
        });
      }
    };
    for (let i2 = 0; i2 < schemas.length; i2++) {
      registerSchema(schemas[i2]);
    }
    const matrix = createMatrix(schemas);
    updateHandles.set(matrix, (agent) => {
      updateHandlesList.forEach((cb) => cb(agent));
    });
    schemas.forEach((schema2) => {
      if (schema2.properties != null) {
        if (matrix.properties == null) {
          matrix.properties = {};
        }
        for (let key2 in schema2.properties) {
          if (matrix.properties[key2] == null) {
            matrix.properties[key2] = [];
          }
          matrix.properties[key2].push(schema2.properties[key2]);
        }
      }
      if (schema2.prefixItems != null) {
        if (matrix.prefixItems == null) {
          matrix.prefixItems = [];
        }
        for (let index in schema2.prefixItems) {
          if (matrix.prefixItems[index] == null) {
            matrix.prefixItems[index] = [];
          }
          matrix.prefixItems[index].push(schema2.prefixItems[index]);
        }
      }
      if (schema2.items != null) {
        if (matrix.items == null) {
          matrix.items = [];
        }
        matrix.items.push(schema2.items);
      }
    });
    if (matrix.properties != null) {
      for (let key2 in matrix.properties) {
        matrix.properties[key2] = getMatrix(matrix.properties[key2]);
      }
    }
    if (matrix.prefixItems != null) {
      for (let index in matrix.prefixItems) {
        matrix.prefixItems[index] = getMatrix(matrix.prefixItems[index]);
      }
    }
    if (matrix.items != null) {
      matrix.items = getMatrix(matrix.items);
    }
    return matrix;
  };

  // modules/src/schema/functions/resolveSchema.js
  var resolveSchema = (uri, schema2, rootSchema2, param) => {
    const resolvedSchema = getResolvedSchema(schema2, rootSchema2);
    Object.assign(resolvedSchema, param);
    if (resolvedSchema.$ref != null) {
      delete resolvedSchema.$ref;
    }
    const { parent } = param;
    for (let conditionalSchemaKey in conditionalSchemaKeys) {
      if (resolvedSchema[conditionalSchemaKey] == null) {
        continue;
      }
      if (conditionalSchemaKeys[conditionalSchemaKey]) {
        for (let key2 in resolvedSchema[conditionalSchemaKey]) {
          resolvedSchema[conditionalSchemaKey][key2] = resolveSchema(uri, resolvedSchema[conditionalSchemaKey][key2], rootSchema2, { parent, isConditional: true, container: resolvedSchema });
        }
      } else {
        resolvedSchema[conditionalSchemaKey] = resolveSchema(uri, resolvedSchema[conditionalSchemaKey], rootSchema2, { parent, isConditional: true, container: resolvedSchema });
      }
    }
    const { dependentSchemas } = extractDependencies(resolvedSchema);
    if (dependentSchemas != null) {
      for (let propertyName in dependentSchemas) {
        dependentSchemas[propertyName] = resolveSchema(uri, dependentSchemas[propertyName], rootSchema2, { parent, isConditional: true });
      }
    }
    if (resolvedSchema.properties != null) {
      for (let key2 in resolvedSchema.properties) {
        resolvedSchema.properties[key2] = resolveSchema(uri + "/" + key2, resolvedSchema.properties[key2], rootSchema2, { parent: resolvedSchema });
      }
      if (resolvedSchema.required) {
        for (let key2 of resolvedSchema.required) {
          if (resolvedSchema.properties[key2]) {
            resolvedSchema.properties[key2].isRequired = true;
          }
        }
      }
    }
    if (resolvedSchema.prefixItems != null) {
      for (let index in resolvedSchema.prefixItems) {
        resolvedSchema.prefixItems[index] = resolveSchema(uri + "/" + index, resolvedSchema.prefixItems[index], rootSchema2, { parent: resolvedSchema });
      }
    }
    if (resolvedSchema.items != null) {
      resolvedSchema.items = resolveSchema(uri + "/$", resolvedSchema.items, rootSchema2, { parent: resolvedSchema });
    }
    return resolvedSchema;
  };

  // modules/src/schema/main.js
  var main = (originalRootSchema, matrixParams = {}) => {
    const { debug = false } = matrixParams;
    const rootSchema2 = JSON.parse(JSON.stringify(originalRootSchema));
    const resolvedRootSchema = resolveSchema("#", rootSchema2, rootSchema2, {});
    if (debug) {
      debugLog2("\u2728 resolve rootSchema", { originalRootSchema, resolvedRootSchema });
    }
    const rootMatrix = getMatrix([resolvedRootSchema]);
    rootMatrix.createAgent = (data, agentParams) => {
      agentParams = { ...matrixParams, ...agentParams };
      const rootAgent = createAgent(rootMatrix, { data }, "data", data, null, agentParams);
      rootAgent.initialize();
      if (debug) {
        debugLog2("\u2728 rootAgent was created", { rootAgent });
      }
      return rootAgent;
    };
    if (debug) {
      debugLog2("\u2728 rootMatrix was created", { rootMatrix });
    }
    return rootMatrix;
  };

  // modules/src/schema/index.js
  var schema = Object.assign(main, consts_exports, methods_exports);

  // ../js/catpow.schema/index.js
  window.Catpow.schema = schema;
})();
