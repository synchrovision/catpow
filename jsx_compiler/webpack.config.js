/* globals module require*/
const path=require('path');
module.exports=()=>{
	return {
		output: {
			environment: {
				arrowFunction: false
			},
		},
		module: {
			rules: [
				{
					test: /\.jsx$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								plugins: [
									"@babel/external-helpers",
									["@babel/transform-react-jsx",{
										"pragma":"wp.element.createElement"
									}],
									"@babel/plugin-proposal-object-rest-spread",
									"@babel/transform-object-assign",
									"@babel/plugin-transform-named-capturing-groups-regex"
								]
							}
						}
					]
				},
				{
					test: /\.scss$/i,
					use: [
						'style-loader',
						{
							loader:'css-loader',
							options:{
								url:false
							}
						},
						{
							loader:'sass-loader',
							options:{
								sassOptions:{
									includePaths:[
										path.resolve('../scss')
									]
								}
							}
						}
					]
				}
			]
		},
		resolve: {
			extensions: ["",".js",".jsx"],
			modules: [
				path.resolve('./components'),
				path.resolve('./node_modules')
			]
		}
	};
};