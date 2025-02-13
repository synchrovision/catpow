import * as esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';
import {transform } from '@svgr/core';
import inlineImportPlugin from 'esbuild-plugin-inline-import';

let pathResolver={
	name:'pathResolver',
	setup(build) {
		const externalModules = new Set(build.initialOptions.external || []);
		
		build.onResolve({filter:/^cpdev/},async(args)=>{
			const result=await build.resolve('./'+args.path.slice(6),{
				kind:'import-statement',resolveDir:'./cpdev'
			});
			if(result.errors.length===0){return {path:result.path};}
		});
		build.onResolve({filter:/^catpow/},async(args)=>{
			const result=await build.resolve('./'+args.path.slice(6),{
				kind:'import-statement',resolveDir:'./modules/src'
			});
			if(result.errors.length===0){return {path:result.path};}
		});
		build.onResolve({filter:/^@?\w/},async(args)=>{
			if(args.path==='react' || args.path==='react-dom'){
				return {
					path: args.path,
					namespace: 'react-global'
				};
			}
			if(externalModules.has(args.path)){return {path:args.path,external:true}};
			const result=await build.resolve('./'+args.path,{
				kind:'import-statement',
				resolveDir:'./node_modules'
			});
			if(result.errors.length===0){return {path:result.path};}
		});
		build.onLoad({filter:/.*/,namespace:'react-global'}, async(args)=>{
			if (args.path==='react' || args.path==='react-dom') {
				return {
					contents:'export default window.wp.element;',
					loader:'js',
				};
			}
		});
	},
}
let svgAsJsx={
	name:'svgAsJsx',
	setup(build){
		build.onResolve({filter:/\.svg$/},(args)=>{
			return {
				path:path.join(args.resolveDir,args.path),
				namespace:/\.[jt]sx?$/.test(args.importer)?'svgr':undefined,
			}
		})

		build.onLoad({filter:/.*/,namespace:'svgr'},async({path:pathname})=>{
			const [filename]=pathname.split('?',2)
			const dirname=path.dirname(filename)
			const svg=await fs.promises.readFile(pathname,'utf8')
			const contents=await transform(svg,{jsxRuntime:'automatic'},{filePath:pathname})

			return {
				contents,
				loader: 'jsx',
				resolveDir:dirname,
			}
		})
	},
}
let inlineCssImporter=inlineImportPlugin({
	filter:/css:/,
	transform:async (contents,args)=>{
		return contents;
	}
});


await esbuild.build({
	entryPoints:[process.argv[2]],
	outfile:process.argv[3],
	format:process.argv[3].slice(-4)==='.mjs'?'esm':'iife',
	bundle:true,
	external:['react','react-dom'],
	define:{
		'React':'wp.element',
		'React.createElement':'wp.element.createElement',
		'React.Fragment':'wp.element.Fragment',
		'ReactDOM':'wp.element',
		'ReactDOM.render':'wp.element.render',
	},
	jsxFactory:'wp.element.createElement',
	jsxFragment:'wp.element.Fragment',
	plugins:[inlineCssImporter,pathResolver,svgAsJsx],
	tsconfigRaw: {}
})