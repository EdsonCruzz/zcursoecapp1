sap.ui.define([
    "sap/ui/core/mvc/Controller"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("zcursoecapp1.controller.View1", {
            onInit: function () {

            },

            onDelete: function () {
                var that = this;
                var totRemove = this.getView().byId("idTableAluno").getSelectedItems();
                
                for(var i = 0; i < totRemove.length; i++){
                    var sPath = totRemove[i].getBindingContextPath(); //this.getView().byId("idTableAluno").getSelectedContextPaths();

                    this.getView().getModel().remove(sPath, {
                        success: function(odata, oReponse){
                            sap.m.MessageBox.success(that.getView().getModel("i18n").getResourceBundle().getText("lblMsgRemoveOk"));
                        return;
                        },
                        error: function(oError){
    
                        }
                    })
                }
            },
            
            onChangeUser: function(){
                let idUsuario = this.getView().byId("idUsuario").getValue()

                if(idUsuario){
                    this.onQuery(idUsuario)
                }else{
                    sap.m.MessageBox.error(this.getView().getModel("i18n").getResourceBundle().getText("lblMsgErrorUser"));
                    return;
                }

            },

            onQuery: function (usuario)  {
                var that = this;

                this.getView().getModel().read('/AlunosFioriEDSONCRSet', {
                    filters: [
                        new sap.ui.model.Filter("Usuario", sap.ui.model.FilterOperator.EQ, usuario)
                    ],
                    success: function (oData, oReponse) {
                        sap.m.MessageBox.success(that.getView().getModel("i18n").getResourceBundle().getText("lblMsgConsultarOK"));

                        if (!oResponse) {
                            sap.m.MessageBox.error(that.getView().getModel("i18n").getResourceBundle().getText("lblMsgConsultarError"));
                        
                        }else {
                            
                        }
                   
                    },
                    error: function (oError) {
                        sap.m.MessageBox.error(that.getView().getModel("i18n").getResourceBundle().getText("lblMsgConsultarError"));
                    }
                });
            },

            onUpdate: function() {
                var that = this;
                var usuario     = this.getView().byId("idUsuario").getValue();
                var nome        = this.getView().byId("idNome").getValue();
                var projsegw    = this.getView().byId("idProjSegw").getValue();
                var email       = this.getView().byId("idEmail").getValue();

                var pStrPath = this.getView().byId("idTableAluno").getSelectedContextPaths();

                var oDados = {
                    Usuario: usuario,
                    Nome: nome,
                    ProjetoSegw: projsegw,
                    Email: email
                }

                this.getView().getModel().update(oStrPath[0], oDados, {
                    success: function (oData, oResponse) {
                        sap.m.MessageBox.success(that.getView().getModel("i18n").getResourceBundle().getText("lblMsgUpdateOK"));
                        // Clear fields
                        that.getView().byId("idUsuario").setValue("");
                        that.getView().byId("idNome") .setValue("");
                        that.getView().byId("idProjSegw").setValue("");
                        that.getView().byId("idEmail").setValue("");
                    },
                    error: function (oError){
                        sap.m.MessageBox.error(that.getView().getModel("i18n").getResourceBundle().getText("lblMsgUpdateError"));
                    }
                });

            },

            onCreate: function() {
                var that = this;
                var usuario     = this.getView().byId("idUsuario").getValue();
                var nome        = this.getView().byId("idNome").getValue();
                var projsegw    = this.getView().byId("idProjSegw").getValue();
                var email       = this.getView().byId("idEmail").getValue();

                if (!usuario) {
                    // Popup message error
                    sap.m.MessageBox.error(this.getView().getModel("i18n").getResourceBundle().getText("lblMsgErrorUser"));
                    return;
                }

                var oDados = {
                    Usuario: usuario,
                    Nome: nome,
                    ProjetoSegw: projsegw,
                    Email: email
                }

                this.getView().getModel().create('/AlunosFioriEDSONCRSet', oDados, {
                    success: function (oData, oResponse) {
                        sap.m.MessageBox.success(that.getView().getModel("i18n").getResourceBundle().getText("lblMsgCreateOK"));
                        // Clear fields
                        that.getView().byId("idUsuario").setValue("");
                        that.getView().byId("idNome") .setValue("");
                        that.getView().byId("idProjSegw").setValue("");
                        that.getView().byId("idEmail").setValue("");
                    },
                    error: function (oError){
                        sap.m.MessageBox.error(that.getView().getModel("i18n").getResourceBundle().getText("lblMsgCreateError"));
                    }
                });

            }

        });
    });
