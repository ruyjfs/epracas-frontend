class GestorDialogController {
  constructor($http, $mdDialog, AppConstants) {
    "ngInject"

    angular.extend(this, {
      $http,
      $mdDialog,
      AppConstants,
    })
  }

  cancel() { this.$mdDialog.cancel() }

  save(gestor){}
}
const GestorDialog = {
  controller: GestorDialogController,
  controllerAs: "$ctrl",
  fullscreen: true,
  template: `
<md-dialog layout="column" aria-label="Adicionar um parceiro da Praça">
  <form name="ParceiroForm" ng-submit="$ctrl.save($ctrl.praca.id_pub, $ctrl.parceiro)">
    <md-dialog-content>

      <md-content md-theme="docs-dark" layout-padding>

        <h2>Adicione um parceiro da Praça</h2>
        <p>Parceiro é um agente da sociedade civil que possui uma ligação muito forte com a Praça e sua comunidade ao entorno. Eles podem disponibilizar seu trabalho em cursos e oficinas...</p>
      </md-content>
      <md-content layout="column" layout-padding>

        <md-input-container class="md-icon-float md-block">
          <md-icon>business</md-icon>
          <label>Nome do(a) Parceiro</label>
          <input name="nomeParceiro" required ng-model="$ctrl.parceiro.nome">
        </md-input-container>

        <div>
          <md-input-container class="md-block">
            <label>Endereço</label>
            <md-icon>subject</md-icon>
            <textarea rows="5" name="parceiroLogradouro" required ng-model="$ctrl.parceiro.endereco"></textarea>
          </md-input-container>
        </div>

        <md-input-container class="md-icon-float md-block">
          <md-icon>person</md-icon>
          <label>Nome do Contato</label>
          <input name="contatoParceiro" ng-model="$ctrl.parceiro.contato">
        </md-input-container>

        <div layout="row">
          <md-input-container class="md-inline" flex>
            <md-icon>phone</md-icon>
            <label>Telefone</label>
            <input mask="(99)99999-9999" clean="true" name="telefoneParceiro" ng-model="$ctrl.parceiro.telefone">
          </md-input-container>

          <md-input-container class="md-inline" flex>
            <md-icon>email</md-icon>
            <label>Email</label>
            <input type="email" name="emailParceiro" ng-model="$ctrl.parceiro.email">
          </md-input-container>
        </div>

        <md-input-container class="md-block">
            <md-icon>work</md-icon>
            <label>Ramo de Atividade do Parceiro</label>
            <md-select ng-model="$ctrl.parceiro.ramo_atividade">
              <md-option ng-repeat="atividade in $ctrl._listaAtividades" value="{{atividade.value}}">
                {{atividade.display_name}}
              </md-option>
            </md-select>
        </md-input-container>

        <div>
          <md-input-container class="md-block">
            <label>Quais ações estamos realizando juntos?</label>
            <md-icon>link</md-icon>
            <textarea rows="5" name="parceiroAcoes" ng-model="$ctrl.parceiro.acoes"></textarea>
          </md-input-container>
        </div>

        <md-input-container flex="50">
          <md-icon>history</md-icon>
          <label>Tempo previsto para a parceria (em dias)</label>
          <input type="number" min="0" name="tempoParceiro" ng-model="$ctrl.parceiro.tempo_parceria">
        </md-input-container>

        <div layout-align="start center" layout="row">
          <div flex="30">
            <md-switch ng-model="$ctrl.parceiro.rec_financeiro" name="recfinanceiroParceiro">
              A parceria envolve recursos financeiros?
            </md-switch>
          </div>
          <div>
            <md-input-container flex ng-show="$ctrl.parceiro.rec_financeiro">
              <md-icon>attach_money</md-icon>
              <label>Qual o valor?</label>
              <input type="number" min="0" name="tempoParceiro" ng-model="$ctrl.parceiro.recursos_financeiros">
            </md-input-container>
          </div>
        </div>

      </md-content>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button ng-click="$ctrl.cancel()">
        Cancelar
      </md-button>
      <md-button class="md-no-focus md-raised md-primary" type="submit" ng-disabled="ParceiroForm.$invalid">
        Enviar
      </md-button>
    </md-dialog-actions>

  </form>
</md-dialog>
    `,
}

export default GestorDialog
