//Predefined tokens
/*global define, console, dijit, dojox, dojo, alert : true*/

/**
 * This model will have all the operations related to form association to package.
 */
define(["dojo/Stateful","dojo/domReady!"],
    function (Stateful) {
        "use strict";
			
		var DocumentInstance =function(){
			this.docFrmMod_num_reqre='';
			this.docFrmMod_name_reqre='';
			this.docFrmMod_desc_reqre='';
			this.docFrmMod_num_reqre_full='';
			this.docFrmMod_promoInd='';
			this.docFrmMod_code_abbr_state='';
			this.docFrmMod_num_id_chnl='';
			this.docFrmMod_code_prod='';
			this.docFrmMod_code_abbr_state_select='';
			this.docFrmMod_classtnCd='';
			this.docFrmMod_code_prod_select='';
			this.docFrmMod_code_type_state='';
			this.docFrmMod_subclasstnCd='';
			this.docFrmMod_code_type_lang='';
			this.docFrmMod_date_eff_prod='';
			this.docFrmMod_date_prod_prod='';
		};
		
        return {
			
			createDocumentInsance:function(){
				return new DocumentInstance();
			},
			
			createformsModuleModel:function(document){
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
					// forms Module Search fields				
					docFrmMod_num_reqre:{
						properties:{
							required:true,
							pattern:alphaNumericPattern,
							maxLength:20
						}
					},
					docFrmMod_name_reqre:{
						properties:{
							required:false,
							pattern:alphaNumericPattern,
							maxLength:60
						}
					},
					// form Module view fields
					docFrmMod_desc_reqre:{
						properties:{
							pattern:alphaNumericPattern,
							maxLength:30
						}
					},
					docFrmMod_num_reqre_full:{
						properties:{
							pattern:alphaNumericPattern,
							maxLength:100
						}
					},
					docFrmMod_promoInd:{
						customMapping:{
							converter:FRMS.FrmsUtils.ZeroOneConverter,
							mappingAttr:'checked'
						},
						properties:{
							isValid:validateFn
						}
					},
					docFrmMod_code_abbr_state:{
						properties:{
							readOnly:true,
							style:'height:30px;width:242px;'
						}
					},
					docFrmMod_num_id_chnl:{
						properties:{
							required: false
						}
					},
					docFrmMod_code_prod:{
						properties:{
							readOnly:true,
							style:'height:30px;width:242px;'
						}
					},
					docFrmMod_code_abbr_state_select:{
						properties:{
							required: true
						}
					},
					docFrmMod_classtnCd:{
						properties:{
							required: true
						}
					},
					docFrmMod_code_prod_select:{
						properties:{
							required: true
						}
					},
					docFrmMod_code_type_state:{
						properties:{
							required: true
						}
					},
					docFrmMod_subclasstnCd:{
						properties:{
							required: true
						}
					},
					docFrmMod_code_type_lang:{
						properties:{
							required: true
						}
					},
					docFrmMod_date_eff_prod:{						
						properties:{
							"placeholder" :frmsConstants.DT_FMT_LONG
						}
					},
					docFrmMod_date_prod_prod:{
						properties:{							
							required : false
						}
					}
				};
			}
        };
    });