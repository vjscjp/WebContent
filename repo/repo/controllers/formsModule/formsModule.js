
/*global hasUserFormRWAccess : true*/

/*global define, dojo, dojox, dijit, console, alert, setTimeout, confirm : true*/

define(["dojo/_base/lang","dijit/form/Form","dojox/mvc/at","dojox/mvc/Output",
		"dijit/form/DateTextBox","dijit/form/Textarea","/common/widgets/ValidationTextArea.js",
		"dijit/form/RadioButton","dijit/form/CheckBox","dojo/dom-class","dojo/on",
		"controllers/widgets/formsModuleSearch.js",
		"models/formsModule/formsModuleModel.js",
		"dojo/domReady!"],
    function (lang,Form,at,Output,Textarea,ValidationTextArea,DateTextBox,RadioButton,CheckBox,domClass,on,FormsModuleSearchWidget,formsModuleModel) {
        "use strict";
		var _self;
		var formsModel;
		var formModuleFieldsConfig = formsModuleModel.getFormFieldConfig();
		var formModuleSearchWidget;
        return {
			
            init: function () {
				_self=this;
				_self.initializeView();
				formModuleSearchWidget = new FormsModuleSearchWidget();
				formModuleSearchWidget.setCallbackFunction(_self.updateModel);
            },
			
			//initialize field and page actions
			initializeView:function(){
				FRMS.FrmsUtils.initializeFields(formModuleFieldsConfig,_self);
				// map page actions
				//this.validateRecords_btn.on('click',_self.promoteForm);
				//this.btnSave_recordsCreate.on('click',_self.saveForm );
				//this.btnCancel_recordsCreate.on('click',_self.cancelForm);
			},

			//before Activate
			beforeActivate: function (previousView, data) {
                console.debug('Forms Module :Entering into beforeActivate method..');
                
				_self.resetView();
				debugger;
				if(data && data.displaySearch){
					formModuleSearchWidget.placeAt(_self.formsModuleSearchContainer);
					_self.viewTitle.innerHTML =FRMS.FrmsConstants.constants.MODIFY_FORMS_MODULE_TITLE;
				}else{
					
					_self.viewTitle.innerHTML =FRMS.FrmsConstants.constants.CREATE_FORMS_MODULE_TITLE;
				}
				var document = null;
				//set document obj if passed from another view
				if(data && data.document){
					document = data.document;
				}
				formsModel = formsModuleModel.createformsModuleModel(document);
				_self.loadViewWithModel(formsModel);
            },
            // Reset view
			resetView:function(){
				_self.documentFormModule.reset();
				_self.formsModuleSearchContainer.innerHTML = "";
			},
			//call back function on search
			updateModel:function(documentInstance){
				console.log('UpdateModel');
				console.log(documentInstance);
				console.log(formsModuleModel);
				formsModuleModel.document = documentInstance;
				alert("callback from forms module search");
				_self.loadViewWithModel(formsModuleModel);
			},
			
			loadViewWithModel:function(modelObj){
				for(var field in formModuleFieldsConfig){
					//set value from model to all form Fields
					var fld=_self[field];
					if(fld){
						// map fields with modal data
						if(modelObj){
							var customMapping =formModuleFieldsConfig[field].customMapping;
							var doc =modelObj.document;
							if(customMapping){
								fld.set(customMapping.mappingAttr,at(doc,field).transform(customMapping.converter),false);
							}else {
								fld.set('value',at(doc,field),false);
							}
						}else{
							console.log('Model is null. Nothing to map');
						}						
					}
				}
			},
			
			highlightFields:function(invalidFlds){
				dojo.forEach(invalidFlds , function(field){
					var wdg=_self[field];
					if(wdg){
						wdg.set('state','Error');
					}
				});		
			}
			

        };

    });