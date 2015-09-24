/**
 * 
 */

/*global hasUserFormRWAccess : true*/

/*global define, dojo, dojox, dijit, console, alert, setTimeout, confirm : true*/

define(["dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/Deferred",
	"dijit/_WidgetBase",
    "dijit/_TemplatedMixin",  
	"dijit/_WidgetsInTemplateMixin",
    "dojo/text!/frmsadmin/controllers/widgets/templates/formsModuleSearch.html",
	"models/formsModule/formsModuleModel.js"],
    function (declare,lang,Deferred,_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin,template,FormsModuleModel) {
		var _self, formFieldsConfig, callBackFunction;
        return declare('app.formsModuleSearch',[_WidgetBase, _TemplatedMixin,_WidgetsInTemplateMixin],{
			templateString : template,
			postCreate : function(e) {
				console.log(this);
				formFieldsConfig = FormsModuleModel.getFormFieldConfig();
				_self = this;
				FRMS.FrmsUtils.initializeFields(formFieldsConfig,_self);
				// map page actions
				this.searchForm_btn.on('click',_self.searchForm);
			},
			setCallbackFunction : function(callback){
				_self.callBackFunction = callback;
			},
			searchForm : function(){
				console.log('RecordsSearchForm');
				var srchProcess=new Deferred();
				//Create a DOC and pass the records# number to it
				var doc=FormsModuleModel.createDocumentInsance();
				doc.frmRecNum=_self.RecNumSrch.get('value');
				console.log(doc);
				//Call service to get the resords
				srchProcess.resolve(doc);
				//Pass the response to callback funtion
				srchProcess.then(_self.callBackFunction);
			}
		});

    });