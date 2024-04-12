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
