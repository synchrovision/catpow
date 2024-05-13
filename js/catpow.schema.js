(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // ../js/catpow.schema/consts.jsx
  var consts_exports = {};
  __export(consts_exports, {
    conditionalSchemaKeys: () => conditionalSchemaKeys,
    minMaxKeys: () => minMaxKeys,
    reservedKeys: () => reservedKeys,
    schemaStatusFlag: () => schemaStatusFlag,
    typeSpecificKeys: () => typeSpecificKeys
  });
  var schemaStatusFlag = Object.freeze({
    input: 1,
    validation: 2
  });
  var reservedKeys = Object.freeze({
    "const": 1,
    "enum": 1,
    "oneOf": 1,
    "anyOf": 1,
    "$ref": 1,
    "minimum": 1,
    "maximum": 1,
    "multipleOf": 1,
    "minLength": 1,
    "maxLength": 1,
    "items": 1,
    "prefixItems": 1,
    "minItems": 1,
    "maxItems": 1,
    "contains": 1,
    "minContains": 1,
    "maxContains": 1,
    "properties": 1,
    "required": 1,
    "dependencies": 1,
    "dependentSchemas": 1,
    "dependentRequired": 1
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
  var minMaxKeys = Object.freeze({
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

  // ../js/catpow.schema/extractDependencies.jsx
  var extractDependencies = (schema) => {
    if (schema.dependencies != null) {
      if (Array.isArray(Object.values(schema.dependencies)[0])) {
        return { dependentRequired: schema.dependencies };
      } else {
        return { dependentSchemas: schema.dependencies };
      }
    } else {
      const { dependentRequired, dependentSchemas } = schema;
      return { dependentRequired, dependentSchemas };
    }
  };

  // ../js/catpow.schema/getSubSchema.jsx
  var getSubSchema = (path, schema, rootSchema) => {
    let keys = path.split("/");
    if (keys[0] === "#") {
      keys.shift();
      schema = rootSchema;
    }
    keys.every((key2) => {
      if (!schema.hasOwnProperty(key2)) {
        schema = null;
        return false;
      }
      schema = schema[key2];
      return true;
    });
    return schema;
  };

  // ../js/catpow.schema/find.jsx
  var find = (callback, schema, rootSchema, params = {}) => {
    if (schema == null) {
      return null;
    }
    const result = callback(schema, rootSchema);
    if (result != null) {
      return result;
    }
    if (!params.refStack != null) {
      params.refStack = /* @__PURE__ */ new WeakMap();
    }
    if (params.refStack.has(schema)) {
      return null;
    }
    params.refStack.set(schema, true);
    if (schema.allOf != null) {
      for (let i2 in schema.allOf) {
        const result2 = find(callback, schema.allOf[i2], rootSchema, params);
        if (result2 != null) {
          return result2;
        }
      }
    }
    if (params.proactive) {
      if (schema.anyOf != null) {
        for (let i2 in schema.anyOf) {
          const result2 = find(callback, schema.anyOf[i2], rootSchema, params);
          if (result2 != null) {
            return result2;
          }
        }
      }
      if (schema.oneOf != null) {
        for (let i2 in schema.oneOf) {
          const result2 = find(callback, schema.oneOf[i2], rootSchema, params);
          if (result2 != null) {
            return result2;
          }
        }
      }
      for (let key2 in ["if", "then", "else"]) {
        if (schema[key2] == null) {
          break;
        }
        const result2 = find(callback, schema[key2], rootSchema, params);
        if (result2 != null) {
          return result2;
        }
      }
      const { dependentSchemas } = extractDependencies(schema);
      if (dependentSchemas) {
        for (let i2 in dependentSchemas) {
          const result2 = find(callback, dependentSchemas[i2], rootSchema, params);
          if (result2 != null) {
            return result2;
          }
        }
      }
    }
    if (schema["$ref"] != null) {
      const refSchema = getSubSchema(schema.$ref, schema, rootSchema);
      const result2 = find(callback, refSchema, rootSchema, params);
      if (result2 != null) {
        return result2;
      }
    }
    return null;
  };

  // ../js/catpow.schema/getType.jsx
  var getType = (schema, rootSchema) => {
    return find((schema2) => {
      if (schema2.type != null) {
        return schema2.type;
      }
      if (schema2.properties != null) {
        return "object";
      }
      if (schema2.items != null || schema2.prefixItems != null) {
        return "array";
      }
      if (schema2.minimum != null || schema2.maximam != null || schema2.multipleOf != null) {
        return "number";
      }
      if (schema2.pattern != null || schema2.minLength != null || schema2.maxLength != null) {
        return "string";
      }
      if (schema2.const != null) {
        return typeof schema2.const;
      }
      if (schema2.default != null) {
        return typeof schema2.default;
      }
      if (schema2.enum != null && schema2.enum.length) {
        return typeof schema2.enum[0];
      }
      if (schema2["@type"] != null) {
        return "object";
      }
    }, schema, rootSchema);
  };

  // ../js/catpow.schema/getResolvedSchema.jsx
  var cache = /* @__PURE__ */ new WeakMap();
  var getResolvedSchema = (schema, rootSchema) => {
    if (schema == null) {
      return {};
    }
    if (rootSchema == null) {
      rootSchema = schema;
    }
    if (cache.has(schema)) {
      return cache.get(schema);
    }
    const resolvedSchema = {};
    if (schema.hasOwnProperty("@type")) {
      Object.assign(
        resolvedSchema,
        getResolvedSchema(
          getSubSchema("#/$defs/" + schema["@type"], schema, rootSchema),
          rootSchema
        )
      );
    }
    if (schema.hasOwnProperty("$ref")) {
      Object.assign(
        resolvedSchema,
        getResolvedSchema(
          getSubSchema(schema.$ref, schema, rootSchema),
          rootSchema
        )
      );
    }
    Object.assign(resolvedSchema, schema);
    if (resolvedSchema.type == null) {
      resolvedSchema.type = getType(resolvedSchema, rootSchema);
    }
    cache.set(schema, resolvedSchema);
    return resolvedSchema;
  };

  // ../js/catpow.schema/getMergedSchemaForValue.jsx
  var getMergedSchemaForValue = (value, schema, rootSchema) => {
    if (rootSchema == null) {
      rootSchema = schema;
    }
    const mergedSchema = {};
    find((schema2) => {
      mergeSchema(mergedSchema, schema2, rootSchema, { extend: false, value });
    }, schema, rootSchema, { proactive: false });
    return mergedSchema;
  };

  // ../js/catpow.schema/getMergedSchema.jsx
  var cache2 = /* @__PURE__ */ new WeakMap();
  var getMergedSchema = (schema, rootSchema) => {
    if (rootSchema == null) {
      rootSchema = schema;
    }
    if (cache2.has(schema)) {
      return cache2.get(schema);
    }
    const mergedSchema = {};
    find((schema2) => {
      mergeSchema(mergedSchema, schema2, rootSchema, { extend: false });
    }, schema, rootSchema, { proactive: false });
    cache2.set(schema, mergedSchema);
    return mergedSchema;
  };

  // ../js/catpow.schema/test.jsx
  var test = (value, schema, rootSchema, params = {}) => {
    const type = getType(schema, rootSchema);
    schema = getResolvedSchema(schema, rootSchema);
    const { ignoreRequired = false, recursive = false, onError = false } = params;
    const cb = (invalidBy, params2 = {}) => onError && onError(Object.assign({ invalidBy, schema, value }, params2));
    if (schema.const != null && schema.const !== value) {
      return cb("const");
    }
    if (schema.enum != null && !schema.enum.includes(value)) {
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
        if (schema.minimum != null && value < schema.minimum) {
          return cb("minimum");
        }
        if (schema.maximum != null && value > schema.maximum) {
          return cb("maximum");
        }
        if (schema.exclusiveMinimum != null) {
          if (typeof schema.exclusiveMinimum === "boolean") {
            if (schema.exclusiveMinimum === true && value <= schema.minimum) {
              return cb("minimum");
            }
          } else {
            if (value <= schema.exclusiveMinimum) {
              return cb("exclusiveMinimum");
            }
          }
        }
        if (schema.exclusiveMaximum != null) {
          if (typeof schema.exclusiveMaximum === "boolean") {
            if (schema.exclusiveMaximum === true && value >= schema.maximum) {
              return cb("maximum");
            }
          } else {
            if (value >= schema.exclusiveMaximum) {
              return cb("exclusiveMaximum");
            }
          }
        }
        if (schema.multipleOf != null) {
          if (value % schema.multipleOf !== 0) {
            return cb("multipleOf");
          }
        }
        break;
      }
      case "string": {
        if (schema.pattern != null) {
          const reg = new RegExp(schema.pattern);
          if (!reg.test(value)) {
            return cb("pattern");
          }
        }
        if (schema.minLength != null && value.length < schema.minLength) {
          return cb("minLength");
        }
        if (schema.maxLength != null && value.length > schema.maxLength) {
          return cb("maxLength");
        }
        break;
      }
      case "object": {
        if (typeof value !== "object" || Array.isArray(value)) {
          return cb("type");
        }
        if (schema.required != null && !ignoreRequired) {
          for (let propertyName of schema.required) {
            if (value[propertyName] == null) {
              return cb("required", { propertyName });
            }
          }
        }
        if (schema.additionalProperties != null && schema.additionalProperties === false) {
          if (Object.keys(value).some((key2) => !schema.properties.hasOwnProperty(key2))) {
            return cb("additionalProperties");
          }
        }
        const { dependentRequired, dependentSchemas } = extractDependencies(schema);
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
            const result = test(value, dependentSchemas[propertyName], rootSchema, params);
            if (result !== true) {
              return result;
            }
          }
        }
        const length = Object.keys(value).length;
        if (schema.minProperties != null && length < schema.minProperties) {
          return cb("minProperties");
        }
        if (schema.maxProperties != null && length > schema.maxProperties) {
          return cb("maxProperties");
        }
        if (recursive && schema.properties != null) {
          if (Object.keys(schema.properties).some((key2) => {
            if (value[key2] == null) {
              return false;
            }
            return test(value[key2], schema.properties[key2], rootSchema, params) !== true;
          })) {
            return false;
          }
        }
        break;
      }
      case "array": {
        if (schema.minItems != null && value.length < schema.minItems) {
          return cb("minItems");
        }
        if (schema.maxItems != null && value.length > schema.maxItems) {
          return cb("maxItems");
        }
        if (schema.prefixItems != null) {
          if (schema.prefixItems.some((itemSchema, index) => value[index] !== void 0 && test(value[index], itemSchema, rootSchema, params) !== true)) {
            return cb("prefixItems");
          }
        }
        if (schema.contains != null) {
          const matchedItems = value.filter((item) => test(item, schema.contain, rootSchema, params) !== true);
          if (matchedItems.length === 0) {
            return cb("contains");
          }
          if (schema.minContains != null && matchedItems.length < schema.minContains) {
            return cb("minContains");
          }
          if (schema.maxContains != null && matchedItems.length > schema.maxContains) {
            return cb("maxContains");
          }
        }
        if (schema.uniqueItems != null && schema.uniqueItems === true) {
          if (value.slice(0, -1).some((item, index) => value.indexOf(item, index + 1) !== -1)) {
            return cb("uniqueItems");
          }
        }
        break;
      }
    }
    if (schema.oneOf != null) {
      const matchedSchemaLength = getMatchedSchemas(value, schema.oneOf, rootSchema, { recursive: true }).length;
      if (matchedSchemaLength !== 1) {
        return cb("oneOf", { matchedSchemaLength });
      }
    }
    if (schema.anyOf != null) {
      if (schema.anyOf.every((subSchema) => test(value, subSchema, rootSchema) !== true)) {
        return cb("anyOf");
      }
    }
    if (schema.allOf != null) {
      for (let subSchema of schema.allOf) {
        const result = test(value, subSchema, rootSchema, params);
        if (result !== true) {
          return result;
        }
      }
    }
    return true;
  };

  // ../js/catpow.schema/getMatchedSchemas.jsx
  var getMatchedSchemas = (value, schemas, rootSchema, params) => {
    return schemas.filter((schema) => test(value, schema, rootSchema, params) === true);
  };

  // ../js/catpow.schema/mergeSchema.jsx
  var mergeSchema = (targetSchema, schema, rootSchema, params = {}) => {
    const { extend = false, initialize = true, value = null } = params;
    const forValue = params.hasOwnProperty("value");
    const includeConditional = forValue || params.includeConditional;
    for (let key2 in schema) {
      if (!reservedKeys[key2] && targetSchema[key2] == null) {
        targetSchema[key2] = schema[key2];
      }
    }
    if (schema.const != null) {
      if (extend) {
        if (targetSchema.enum != null) {
          if (!targetSchema.enum) {
            targetSchema.enum = [];
          }
          if (!targetSchema.enum.includes(schema.const)) {
            targetSchema.enum.push(schema.const);
          }
        } else if (initialize) {
          targetSchema.const = schema.const;
        }
      } else {
        targetSchema.const = schema.const;
      }
    } else {
      if (extend && targetSchema.const != null) {
        targetSchema.const = null;
      }
      if (schema.enum != null) {
        if (extend) {
          if (targetSchema.enum == null) {
            if (targetSchema.const != null) {
              targetSchema.enum = schema.enum.slice();
              if (!targetSchema.enum.includes(targetSchema.cons)) {
                targetSchema.enum.push(targetSchema.const);
              }
              targetSchema.const = null;
            } else if (initialize) {
              targetSchema.enum = schema.enum.slice();
            }
          } else {
            targetSchema.enum.push.apply(
              targetSchema.enum,
              schema.enum.filter((val) => !targetSchema.enum.includes(val))
            );
          }
        } else {
          if (targetSchema.enum == null) {
            targetSchema.enum = schema.enum.slice();
          } else {
            targetSchema.enum = targetSchema.enum.filter((val) => schema.enum.includes(val));
          }
        }
      } else if (extend && targetSchema.enum != null) {
        targetSchema.enum = null;
      }
    }
    for (let key2 in minMaxKeys) {
      if (schema[key2] != null) {
        if (targetSchema[key2] != null) {
          targetSchema[key2] = Math[minMaxKeys[key2] == extend ? "max" : "min"](targetSchema[key2], schema[key2]);
        } else {
          if (initialize) {
            targetSchema[key2] = schema[key2];
          }
        }
      } else if (extend && targetSchema[key2] != null) {
        targetSchema[key2] = null;
      }
    }
    if (schema.required != null) {
      if (extend) {
        if (targetSchema.required !== null) {
          if (targetSchema.required == null) {
            targetSchema.required = schema.required.slice();
          } else {
            targetSchema.required = targetSchema.required.filter((val) => schema.required.includes(val));
          }
        }
      } else {
        if (targetSchema.required == null) {
          targetSchema.required = schema.required.slice();
        } else {
          targetSchema.required.push.apply(
            targetSchema.required,
            schema.required.filter((val) => !targetSchema.required.includes(val))
          );
        }
      }
    } else if (extend && targetSchema.required != null) {
      targetSchema.required = null;
    }
    if (schema.properties != null) {
      if (targetSchema.properties == null) {
        targetSchema.properties = {};
      }
      for (let key2 in schema.properties) {
        const propParams = Object.assign({}, params);
        if (forValue) {
          propParams.value = propParams.value[key2];
        }
        if (targetSchema.properties[key2] != null) {
          mergeSchema(targetSchema.properties[key2], schema.properties[key2], rootSchema, propParams);
        } else {
          const propSchema = {};
          mergeSchema(propSchema, schema.properties[key2], rootSchema, propParams);
          targetSchema.properties[key2] = propSchema;
        }
      }
    }
    if (schema.items != null) {
      if (targetSchema.items == null) {
        targetSchema.items = getMergedSchema(schema.items, rootSchema);
        if (forValue && value != null) {
          targetSchema.itemsForValue = [];
          for (let i2 in value) {
            targetSchema.itemsForValue.push(
              getMergedSchemaForValue(value[i2], schema.items, rootSchema)
            );
          }
        }
      }
    }
    if (!includeConditional) {
      return targetSchema;
    }
    const conditionalSchemas = [];
    if (schema.oneOf != null) {
      conditionalSchemas.push.apply(
        conditionalSchemas,
        forValue ? getMatchedSchemas(value, schema.oneOf, rootSchema, { ignoreRequired: true }) : schema.oneOf
      );
    }
    if (schema.anyOf != null) {
      conditionalSchemas.push.apply(
        conditionalSchemas,
        forValue ? getMatchedSchemas(value, schema.anyOf, rootSchema, { ignoreRequired: true }) : schema.anyOf
      );
    }
    const { dependentSchemas } = extractDependencies(schema);
    if (dependentSchemas != null) {
      if (forValue) {
        for (let key2 in dependentSchemas) {
          if (value[key2] != null) {
            conditionalSchemas.push(dependentSchemas[key2]);
          }
        }
      } else {
        conditionalSchemas.push.apply(
          conditionalSchemas,
          Object.values(dependentSchemas)
        );
      }
    }
    if (conditionalSchemas.length) {
      const mergedConditionalSchema = {};
      for (let i2 in conditionalSchemas) {
        if (forValue) {
          mergeSchema(
            mergedConditionalSchema,
            getMergedSchemaForValue(value, conditionalSchemas[i2], rootSchema),
            rootSchema,
            { extend: true, value }
          );
        } else {
          mergeSchema(
            mergedConditionalSchema,
            getMergedSchemaForValue(value, conditionalSchemas[i2], rootSchema),
            rootSchema,
            { extend: true }
          );
        }
      }
      mergeSchema(targetSchema, conditionalSchemas[i], rootSchema, params);
    }
    return targetSchema;
  };

  // ../js/catpow.schema/mergeSchemas.jsx
  var mergeSchemas = (schemas, rootSchema, params = {}) => {
    const mergedSchema = {};
    schemas.forEach((schema) => mergeSchema(mergedSchema, schema, rootSchema, params));
    return mergedSchema;
  };

  // ../js/catpow.schema/getDefaultValue.jsx
  var getDefaultValue = (schema, rootSchema) => {
    const type = getType(schema, rootSchema);
    schema = getResolvedSchema(schema, rootSchema);
    if (schema.default != null) {
      return schema.default;
    }
    if (schema.const != null) {
      return schema.const;
    }
    if (schema.enum != null) {
      return schema.enum[0];
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
        if (schema.minimum != null) {
          const unit2 = schema.multipleOf != null ? schema.multipleOf : 1;
          if (schema.exclusiveMinimum === true) {
            return schema.minimum + unit2;
          }
          return schema.minimum;
        }
        if (schema.exclusiveMinimum != null) {
          return schema.exclusiveMinimum + unit;
        }
        return 0;
      }
      case "string": {
        return "";
      }
    }
    return null;
  };

  // ../js/catpow.schema/getErrorMessageFormat.jsx
  var getErrorMessageFormat = (params) => {
    const { invalidBy, schema } = params;
    if (schema.message != null) {
      return schema.message;
    }
    switch (invalidBy) {
      case "type":
        return "\u5165\u529B\u5024\u306E\u578B\u304C\u4E00\u81F4\u3057\u307E\u305B\u3093";
      case "minimum":
        return schema.exclusiveMinimum ? "{minimum}\u3088\u308A\u5927\u304D\u3044\u6570\u5024\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044" : "{minimum}\u4EE5\u4E0A\u306E\u6570\u5024\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044";
      case "exclusiveMinimum":
        return "{exclusiveMinimum}\u3088\u308A\u5927\u304D\u3044\u6570\u5024\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044";
      case "maximum":
        return schema.exclusiveMaximum ? "{maximum}\u3088\u308A\u5C0F\u3055\u3044\u6570\u5024\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044" : "{maximum}\u4EE5\u4E0B\u306E\u6570\u5024\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044";
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

  // ../js/catpow.schema/getErrorMessage.jsx
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

  // ../js/catpow.schema/sanitize.jsx
  var sanitize = (value, schema, rootSchema) => {
    const type = getType(schema, rootSchema);
    schema = getResolvedSchema(schema, rootSchema);
    if (value == null) {
      return value;
    }
    if (schema.const != null && schema.const !== value) {
      return schema.const;
    }
    if (schema.enum != null && !schema.enum.includes(value)) {
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
        if (schema.minimum != null && value < schema.minimum) {
          value = schema.minimum;
        }
        if (schema.maximum != null && value > schema.maximum) {
          value = schema.maximum;
        }
        const step = schema.multipleOf || 1;
        if (schema.exclusiveMinimum != null) {
          if (typeof schema.exclusiveMinimum === "boolean") {
            if (schema.exclusiveMinimum === true && value <= schema.minimum) {
              value = schema.minimum + step;
            }
          } else {
            if (value <= schema.exclusiveMinimum) {
              value = schema.exclusiveMinimum + step;
            }
          }
        }
        if (schema.exclusiveMaximum != null) {
          if (typeof schema.exclusiveMaximum === "boolean") {
            if (schema.exclusiveMaximum === true && value >= schema.maximum) {
              value = schema.maximum - step;
            }
          } else {
            if (value <= schema.exclusiveMaximum) {
              value = schema.exclusiveMaximum - step;
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
        if (schema.additionalProperties != null && schema.additionalProperties === false) {
          for (let key2 in value) {
            if (!schema.properties.hasOwnProperty(key2)) {
              delete value[key2];
            }
          }
        }
        break;
      }
    }
    return value;
  };

  // ../js/catpow.schema/main.jsx
  var main = (originalRootSchema, params = {}) => {
    const { debug = false } = params;
    const resolveSchema = (uri, schema, param) => {
      const resolvedSchema = getResolvedSchema(schema, rootSchema);
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
            resolvedSchema[conditionalSchemaKey][key2] = resolveSchema(
              uri,
              resolvedSchema[conditionalSchemaKey][key2],
              { parent, isConditional: true, container: resolvedSchema }
            );
          }
        } else {
          resolvedSchema[conditionalSchemaKey] = resolveSchema(
            uri,
            resolvedSchema[conditionalSchemaKey],
            { parent, isConditional: true, container: resolvedSchema }
          );
        }
      }
      const { dependentSchemas } = extractDependencies(resolvedSchema);
      if (dependentSchemas != null) {
        for (let propertyName in dependentSchemas) {
          dependentSchemas[propertyName] = resolveSchema(uri, dependentSchemas[propertyName], { parent, isConditional: true });
        }
      }
      if (resolvedSchema.properties != null) {
        for (let key2 in resolvedSchema.properties) {
          resolvedSchema.properties[key2] = resolveSchema(
            uri + "/" + key2,
            resolvedSchema.properties[key2],
            { parent: resolvedSchema }
          );
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
          resolvedSchema.prefixItems[index] = resolveSchema(
            uri + "/" + index,
            resolvedSchema.prefixItems[index],
            { parent: resolvedSchema }
          );
        }
      }
      if (resolvedSchema.items != null) {
        resolvedSchema.items = resolveSchema(
          uri + "/$",
          resolvedSchema.items,
          { parent: resolvedSchema }
        );
      }
      return resolvedSchema;
    };
    const rootSchema = JSON.parse(JSON.stringify(originalRootSchema));
    const resolvedRootSchema = resolveSchema("#", rootSchema, {});
    const mergeSchemasProxy = (schemas, extend) => {
      return mergeSchemas(schemas, resolvedRootSchema, { extend });
    };
    const debugLog = (message, object) => {
      console.groupCollapsed(message);
      console.debug(object);
      console.trace();
      console.groupEnd();
    };
    const debugWatch = (object, property) => {
      Object.defineProperty(object, property, {
        set: (value) => {
          debugLog(`\u{1F4DD} ${property} was changed`, value);
          (void 0)[property] = value;
        }
      });
    };
    const updateHandles = /* @__PURE__ */ new WeakMap();
    const getTypeOfValue = (value) => {
      if (value == null) {
        return "null";
      }
      if (Array.isArray(value)) {
        return "array";
      }
      return typeof value;
    };
    const getPossibleTypes = (schemas) => {
      const flags = {};
      schemas.forEach((schema) => flags[schema.type] = true);
      return flags;
    };
    const getKeyPropertyName = (schemas) => {
      return Object.keys(schemas[0].properties).find((key2) => schemas.every((schema) => schema.properties[key2] != null));
    };
    const walkAncestor = (agent, cb) => {
      if (cb(agent) === false) {
        return false;
      }
      if (agent.parent) {
        return walkAncestor(agent.parent, cb);
      }
      return true;
    };
    const walkAncestorSchema = (agent, schema, cb) => {
      if (cb(agent, schema) === false) {
        return false;
      }
      if (agent.parent && schema.parent) {
        return walkAncestorSchema(agent.parent, schema.parent, cb);
      }
      return true;
    };
    const walkDescendant = (agent, cb) => {
      agent.walkChildren((child) => {
        if (cb(child) !== false) {
          walkDescendant(child, cb);
        }
      });
    };
    const walkDescendantSchema = (agent, schema, cb) => {
      agent.walkChildren((child) => {
        for (let subSchema of child.matrix.schemas) {
          if (subSchema.parent === schema) {
            if (cb(child, subSchema) !== false) {
              walkDescendantSchema(child, subSchema, cb);
            }
          }
        }
      });
    };
    const getUnlimietedSchema = (schema) => {
      const unlimitedSchema = Object.assign({}, schema);
      delete unlimitedSchema.enum;
      delete unlimitedSchema.const;
      for (let key2 in minMaxKeys) {
        if (unlimitedSchema[key2] != null) {
          delete unlimitedSchema[key2];
        }
      }
      return unlimitedSchema;
    };
    const getMatrix = (originalSchemas) => {
      const updateHandlesList = [];
      const schemas = originalSchemas.slice();
      const registerSchema = (schema) => {
        if (schema.if != null) {
          schemas.push(getUnlimietedSchema(schema.if));
          updateHandlesList.push((agent) => {
            const isValid = test(agent.getValue(), schema.if, rootSchema);
            if (schema.then != null) {
              agent.setConditionalSchemaStatus(schema.then, isValid ? 3 : 0);
            }
            if (schema.else != null) {
              agent.setConditionalSchemaStatus(schema.else, isValid ? 0 : 3);
            }
          });
        }
        if (schema.allOf != null) {
          schemas.push.apply(schemas, schema.allOf);
        }
        if (schema.anyOf != null) {
          schemas.push(mergeSchemasProxy(schema.anyOf, true));
        }
        if (schema.oneOf != null) {
          schemas.push.apply(schemas, schema.oneOf);
          const keyPropertyName = getKeyPropertyName(schema.oneOf);
          updateHandlesList.push((agent) => {
            const keyValue = agent.properties[keyPropertyName].getValue();
            schema.oneOf.forEach((schema2) => {
              agent.setConditionalSchemaStatus(
                schema2,
                test(keyValue, schema2.properties[keyPropertyName], rootSchema) ? 3 : 0
              );
            });
          });
        }
        const { dependentRequired, dependentSchemas } = extractDependencies(schema);
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
                agent.properties[name2].setConditionalRequiredFlag(schema, flag);
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
      schemas.forEach((schema) => {
        if (schema.properties != null) {
          if (matrix.properties == null) {
            matrix.properties = {};
          }
          for (let key2 in schema.properties) {
            if (matrix.properties[key2] == null) {
              matrix.properties[key2] = [];
            }
            matrix.properties[key2].push(schema.properties[key2]);
          }
        }
        if (schema.prefixItems != null) {
          if (matrix.prefixItems == null) {
            matrix.prefixItems = [];
          }
          for (let index in schema.prefixItems) {
            if (matrix.prefixItems[index] == null) {
              matrix.prefixItems[index] = [];
            }
            matrix.prefixItems[index].push(schema.prefixItems[index]);
          }
        }
        if (schema.items != null) {
          if (matrix.items == null) {
            matrix.items = [];
          }
          matrix.items.push(schema.items);
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
    const createMatrix = (schemas) => {
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
            if (debug) {
              debugLog(`\u26A1 trigger event '${event.type}' on '${agent.key}'`, { event, agent });
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
            if (event.bubbles) {
              walkAncestor(agent, cb);
            } else {
              cb(agent);
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
          return (schema) => {
            return agent.conditionalSchemaStatus.get(schema);
          };
        },
        setConditionalSchemaStatus: (agent) => {
          return (schema, status) => {
            if (agent.conditionalSchemaStatus.get(schema) === status) {
              return status;
            }
            agent.conditionalSchemaStatus.set(schema, status);
            if (debug) {
              debugLog(`\u{1F511} conditionalSchemaStatus of '${agent.key}' was changed`, { schema, status });
            }
            agent.setSchemaStatus(schema, agent.parent == null ? 3 : agent.parent.getSchemaStatus(schema.parent) & status);
          };
        },
        getParentSchemaStatus: (agent) => {
          return (schema) => {
            return agent.conditionalSchemaStatus.get(schema);
          };
        },
        setConditionalRequiredFlag: (agent) => {
          return (schema, flag) => {
            if (agent.conditionalRequiredFlag.get(schema) === flag) {
              return flag;
            }
            agent.conditionalRequiredFlag.set(schema, flag);
            agent.isReqired = false;
            for (let [schema2, flag2] of agent.conditionalRequiredFlag.entries()) {
              if (flag2 && agent.getSchemaStatus(schema2) & 1) {
                agent.isReqired = true;
                break;
              }
            }
          };
        },
        getSchemaStatus: (agent) => {
          return (schema) => {
            if (agent.schemaStatus == null || !agent.schemaStatus.has(schema)) {
              return 1;
            }
            return agent.schemaStatus.get(schema);
          };
        },
        setSchemaStatus: (agent) => {
          return (schema, status) => {
            if (agent.schemaStatus.get(schema) === status) {
              return status;
            }
            agent.schemaStatus.set(schema, status);
            if (debug) {
              debugLog(`\u{1F511} schemaStatus of '${agent.key}' was changed`, { schema, status });
            }
            walkDescendantSchema(agent, schema, (agent2, schema2) => {
              const currentStatus = agent2.schemaStatus.get(schema2);
              let status2 = agent2.parent.schemaStatus.get(schema2.parent);
              if (agent2.conditionalSchemaStatus.has(schema2)) {
                status2 &= agent2.conditionalSchemaStatus.get(schema2);
                let container = schema2.container;
                while (agent2.conditionalSchemaStatus.has(container)) {
                  status2 &= agent2.conditionalSchemaStatus.get(container);
                  container = container.container;
                }
              }
              if (status2 === currentStatus) {
                return false;
              }
              agent2.schemaStatus.set(schema2, status2);
            });
          };
        },
        getSchemas: (agent) => {
          return (status) => {
            return schemas.filter((schema) => (agent.getSchemaStatus(schema) & status) != 0);
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
            cache3[key2] = mergeSchemasProxy(agent.getSchemas(status), extend);
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
              return getDefaultValue(agent.getMergedSchemaForInput(), rootSchema);
            }
            return agent.value;
          };
        },
        setValue: (agent) => {
          return (value) => {
            agent.value = value;
            agent.trigger({ type: "change", bubbles: true });
            if (debug) {
              debugLog(`\u{1F4DD} change value for '${agent.key}'`, { value });
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
            if (debug) {
              debugLog(`\u2699\uFE0F update process for '${agent.key}' start`, { agent });
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
            if (debug) {
              debugLog(`\u2699\uFE0F update process for '${agent.key}' end`, { agent });
            }
          };
        },
        validate: (agent) => {
          return () => {
            agent.isValid = agent.getSchemasForValidation().every((schema) => {
              return test(agent.value, schema, rootSchema, { onError: (params2) => {
                if (debug) {
                  debugLog("\u26A0\uFE0F invalid value was found", params2);
                }
                agent.setMessage(getErrorMessage(params2));
                agent.trigger({ type: "error", bubble: false });
                return false;
              } });
            });
            agent.trigger({ type: "validate", bubbles: false });
          };
        },
        initialize: (agent) => {
          return () => {
            if (agent.value == null) {
              agent.value = getDefaultValue(agent.getMergedSchemaForInput(), rootSchema);
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
            for (const schema of schemas2) {
              value = sanitize(value, schema, rootSchema);
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
            const item = createAgent(
              agent.matrix.items,
              agent.value,
              index,
              value,
              agent.parent
            );
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
    const createAgent = (matrix, ref, key2, value, parent, params2) => {
      const agent = { matrix, ref, key: key2, value, parent };
      for (let functionName in matrix.curries) {
        agent[functionName] = matrix.curries[functionName](agent);
      }
      if (params2 != null) {
        Object.assign(agent, params2);
      }
      agent.message = false;
      agent.schemaStatus = /* @__PURE__ */ new Map();
      agent.conditionalSchemaStatus = /* @__PURE__ */ new WeakMap();
      agent.conditionalRequiredFlag = /* @__PURE__ */ new Map();
      agent.eventListeners = {};
      for (let schema of matrix.schemas) {
        if (schema.isConditional) {
          agent.schemaStatus.set(schema, 0);
          agent.conditionalSchemaStatus.set(schema, 0);
        } else {
          agent.schemaStatus.set(schema, parent ? parent.getSchemaStatus(schema.parent) : 3);
        }
      }
      if (matrix.properties != null) {
        if (agent.value == null || Array.isArray(agent.value) || typeof agent.value !== "object") {
          agent.value = value = {};
        }
        agent.properties = {};
        for (let propertyName in matrix.properties) {
          agent.properties[propertyName] = createAgent(
            matrix.properties[propertyName],
            value,
            propertyName,
            value[propertyName],
            agent
          );
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
    const rootMatrix = getMatrix([resolvedRootSchema]);
    rootMatrix.createAgent = (data, params2) => {
      const rootAgent = createAgent(rootMatrix, { data }, "data", data, null, params2);
      rootAgent.initialize();
      if (debug) {
        debugLog("\u2728 rootAgent was created", { rootAgent });
      }
      return rootAgent;
    };
    if (debug) {
      debugLog("\u2728 rootMatrix was created", { rootMatrix });
    }
    return rootMatrix;
  };

  // ../js/catpow.schema/methods.jsx
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

  // ../js/catpow.schema/getPrimaryPropertyName.jsx
  var getPrimaryPropertyName = (schema, rootSchema) => {
    if (getType(schema, rootSchema) !== "object") {
      return null;
    }
    const mergedSchema = getMergedSchema(schema, rootSchema);
    if (mergedSchema.properties["@type"] != null) {
      return "@type";
    }
    return Object.keys(mergedSchema.properties).find((key2) => mergedSchema.properties[key2].enum != null);
  };

  // ../js/catpow.schema/index.jsx
  window.Catpow.schema = main;
  Object.assign(window.Catpow.schema, consts_exports, methods_exports);
})();
