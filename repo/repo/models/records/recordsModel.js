//Predefined tokens
/*global define, console, dijit, dojox, dojo, alert : true*/

/**
 * This model will have all the operations related to form association to package.
 */
define(["dojo/Stateful","dojo/domReady!"],
    function (Stateful) {
        "use strict";
			
		var DocumentInstance =function(){
			this.rec_txtRecordNumber='';
			this.rec_txtRecordTitle='';
			this.rec_ddlRecordSource='';
			this.rec_ddlClass='';
			this.rec_ddlSubClass='';
			this.rec_effectiveDate=null;
			this.rec_expirationDate=null;
			this.rec_ddlNPPI='';
			this.rec_ddlTimingCode='';
			this.rec_txtLunarDocType='';
			this.rec_txtInitialComment='';
			this.rec_ric='';
			this.rec_promoInd='';
		};
		
        return {
			
			createDocumentInsance:function(){
				return new DocumentInstance();
			},
			
			createFormModel:function(document){
				if(!document){
					//if null create new
					document = this.createDocumentInsance();
				}
				//console.log(form);
				return new Stateful({
					document:new Stateful(document),
					comment:'',
					documentValues:{}
				});
			},		
			// modal validation
			isDocValidForSave:function(document){
				var validFlag=false;
				var fldConfig = this.getFormFieldConfig();
				return validFlag;
			},			
			getFormFieldConfig:function(){
				var frmsConstants =FRMS.FrmsConstants.constants;
				var alphaNumericPattern =FRMS.SharedUtils.getAlphaNumericPattern();
				//TODO Move to constants
				var numericPattern = '^[0-9]*$';
				
				//custom validation logic goes here
				var validateFn=function(){
					console.log(this);
					return false;
				};
				return {
					// forms Search fields				
					
					
					// form view fields
					rec_txtRecordNumber:{
						reqForShell:true,
						reqForPromotion:true,
						properties:{
							pattern:alphaNumericPattern,
							maxLength:100,
							required: true
						}
					},
					rec_txtRecordTitle:{
						reqForShell: false,
						reqForPromotion: false,
						properties:{
							pattern:alphaNumericPattern,
							maxLength:100,
							required: false
						}
					},
					rec_ddlRecordSource:{
						reqForShell : true,
						reqForPromotion : true,
						properties:{
							required: true
						}
					},
					rec_ddlClass:{
						reqForShell : true,
						reqForPromotion : true,
						properties:{
							required: true
						}
					},
					rec_ddlSubClass:{
						reqForShell : true,
						reqForPromotion : true,
						properties:{
							required: true
						}
					},
					rec_effectiveDate:{
						reqForShell : true,
						reqForPromotion : true,
						properties:{
							"placeholder" :frmsConstants.DT_FMT_LONG
						}
					},
					rec_expirationDate:{
						reqForShell : false,
						reqForPromotion : false,
						properties:{
							"placeholder" :frmsConstants.DT_FMT_LONG
						}
					},
					rec_ddlNPPI:{
						reqForShell:true,
						reqForPromotion:true,
						properties:{
							required : false
						}
					},
					rec_ddlTimingCode:{
						reqForShell:false,
						reqForPromotion:false,
						properties:{
							required : false
						}
					},
					rec_txtLunarDocType:{
						reqForShell:false,
						reqForPromotion:false,
						properties:{
							required : false
						}
					},
					rec_txtInitialComment:{
						reqForShell:false,
						reqForPromotion:false,
						properties:{
							pattern:alphaNumericPattern,
							maxLength:1000,
							style:'height:30px;width:242px;',
							rows:2,
							cols:34,
							isValid:validateFn
						}

					},
					rec_ric:{
						reqForShell:false,
						reqForPromotion:true,
						properties:{
							isValid:validateFn
						}
					},
					rec_promoInd:{
						reqForShell:false,
						reqForPromotion:false,
						customMapping:{
							converter:FRMS.FrmsUtils.ZeroOneConverter,
							mappingAttr:'checked'
						},
						properties:{
							isValid:validateFn
						}
					}
					
				};
			}
        };
    });