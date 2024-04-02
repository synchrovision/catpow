export const reservedKeys=Object.freeze({
	"const":1,"enum":1,
	"oneOf":1,"anyOf":1,"$ref":1,
	"minimum":1,"maximum":1,"multipleOf":1,
	"minLength":1,"maxLength":1,
	"items":1,"prefixItems":1,"minItems":1,"maxItems":1,"contains":1,"minContains":1,"maxContains":1,
	"properties":1,"required":1,"dependencies":1,"dependentSchemas":1,"dependentRequired":1,
});
export const typeSpecificKeys=Object.freeze({
	number:['minimum','maximum','multipleOf'],
	string:['minLength','maxLength','pattern'],
	array:['items','prefixItems','minItems','maxItems','contains','minContains','maxContains'],
	object:[
		'properties','minProperties','maxProperties','propertyNames',
		'patternProperties','additionalProperties','unevaluatedProperties',
		'required','depndencies','dependentSchemas','dependentRequired'
	]
});
export const minMaxKeys=Object.freeze({
	minimum:false,maximum:true,
	minLength:false,maxLength:true,
	minItems:false,maxItems:true,
	minContains:false,maxContains:true,
});
export const conditionalSchemaKeys=Object.freeze({
	allOf:true,anyOf:true,oneOf:true,
	if:false,then:false,else:false,
	dependentSchemas:true,
});