const {Fragment} = wp.element;
const {registerBlockType,createBlock} = wp.blocks;
const {InnerBlocks,BlockControls,AlignmentToolbar,BlockAlignmentToolbar,BlockVerticalAlignmentToolbar,PanelColorSettings,PanelColorGradientSettings,InspectorControls,RichText,RichTextToolbarButton,RichTextShortcut} = wp.blockEditor;
const {PanelBody,BaseControl,TreeSelect,TextareaControl,TextControl,ServerSideRender,ToggleControl,SelectControl,CheckboxControl,RadioControl,RangeControl,Button,Toolbar,FormFileUpload,Icon} = wp.components;
const {registerFormatType,toggleFormat}=wp.richText;
const {__}=wp.i18n;
const el=wp.element.createElement;

const {registerPlugin}=wp.plugins;
const {PluginSidebarMoreMenuItem,PluginSidebar}=wp.editPost;
