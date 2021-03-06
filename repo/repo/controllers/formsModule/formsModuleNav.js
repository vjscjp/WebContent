/*global define:true*/
define(["dojo/dom", "dojo/on", "dojo/_base/lang"], function(dom, on, lang) {
    "use strict";
    return {
        init: function() {
            var create = dom.byId("btnCreateRecord_formsModuleNav"),
                search = dom.byId("btnModifyRecord_formsModuleNav");
            on(create, "click", lang.hitch(this, function(e) {
                //this.transitionTo(e, "recordsSearch");
            	
            	var transOpts = {
                    target: "formsModule",
                    data : {
    					displaySearch: false,
    					type:'',
    					path:'',
    					hasUserFormRWAccess:''
    				}
                };
                FRMS.transitionToView(e.target, transOpts);
            }));
            on(search, "click", lang.hitch(this, function(e) {
                //this.transitionTo(e, "recordsSearch");
            	var transOpts = {
                        target: "formsModule",
                        data : {
        					displaySearch:true,
        					type:'',
        					path:'',
        					hasUserFormRWAccess:''
        				}
                    };
                FRMS.transitionToView(e.target, transOpts);
            }));
        }
    };
});
