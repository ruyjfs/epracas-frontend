import moment from "moment"

class PracaDetailCtrl {
  constructor($scope, $document, $window, $mdDialog, $log, User, Atividade, praca) {
    "ngInject"

      angular.extend(this, {
        $scope,
        $document,
        $mdDialog,
        $log,
        currentUser: User.current,
        praca,
      })


    Atividade.list(praca.id_pub)
      .then(atividades => atividades.map(atividade => {
        if (!atividade.ocorrencia) return atividade

        const formatString = "DD.MM.YYYY"
        atividade.data_inicio = moment(atividade.ocorrencia.start.slice(0, 10))
        .format(formatString)
        atividade.data_encerramento = moment(atividade.ocorrencia.repeat_until)
        .format(formatString)

        return atividade
      }))
    .then((atividades) => {
      // console.log(atividades)
      praca.agenda = atividades
    })

    if (angular.isUndefined(praca.header_img) || praca.header_img === null ) {
      praca.header_img = "/assets/header.jpg"
    }

    if (!praca.bio) {
      praca.bio = "Texto de apresentação da Praça(a ser preenchido pelo Gestor)"
    }

    const geoLoc = {
      defaults: {
        tileLayerOptions: {
          detectRetina: true,
          reuseTiles: true,
        },
        scrollWheelMouse: false,
        doubleClickZoom: false,
        zoomControl: false,
        dragging: false,
      },

      center: {
        lat: Number(praca.lat),
        lng: Number(praca.long),
        zoom: 13,
      },

      markers: {
        marker: {
          lat: Number(praca.lat),
          lng: Number(praca.long),
          message: praca.localizacao,
          focus: true,
          draggable: false,
        },
      },
    }
    $scope.geoLoc = geoLoc

    $scope.$watch(
        () => User.current,
        (newUser) => {
          if (newUser) {
            this.currentUser = newUser
            this.userMenu = this.buildMenu(this.currentUser)
          }
        }
    )
    $scope.tabIntSelected = 0
    $scope.intWindowHeight = $(window).height()

    // Pegando o evento scroll da tela para deixar as abas dinamicas conforme o scroll.
    // angular.element(document).ready(function(){
    $document.ready(function () {
      $(".materialboxed").materialbox()
      let elmTabPracas = $(".tab-pracas"),
      intPracasPosition = elmTabPracas.offset().top

    setTimeout(()=>{
      $(document).scrollTop(0)
        intPracasPosition = elmTabPracas.offset().top
    }, 20)
      $document.on("scroll", () => {
        let arrElmScrollContainers = $("md-tab"),
        arrObjScrollContainers = arrElmScrollContainers.map((intKey, elm) => {
          let intPositionStart = $($(elm).attr("scroll")).offset().top, // Pega a posicao do container.
          intPositionEnd = (arrElmScrollContainers[intKey + 1]) ? $($(arrElmScrollContainers[intKey + 1]).attr("scroll")).offset().top : "" // Pega a posicao do proximo container e diminui um, no caso e o limite deste container.
              return {
                strSelector: $(elm).attr("scroll"),
                intPositionStart: intPositionStart - 96,
                intPositionEnd: intPositionEnd - 1
              }
        })

        let intPosition = $window.scrollY
          arrObjScrollContainers.each((intKey, objValue) => {
            if (intPosition >= objValue.intPositionStart && intPosition <= objValue.intPositionEnd && intKey != $scope.tabIntSelected) {
              $scope.tabIntSelected = intKey
              $scope.$apply()
            }
          })
        if (intPosition >= intPracasPosition) {
          elmTabPracas.addClass("fixed")
        } else {
          elmTabPracas.removeClass("fixed")
        }
      })
    })

    $scope.arrPhotos = this.buildGridModel(praca.imagem);
  }

  /**
   * Constroi o objecto da grid em mozaico com as imagens da praca ficando no formato que o componente do Material Angular espera.
   * @param {Array} arrValue - Array com as imagens das pracas.
   * @returns {Array} - Array tratado para o componente do Material Angular.
   */
  buildGridModel(arrValue) {
    let arrValueTreated = [], arrDefault = [];
    arrDefault[0] = {title: "Bloco 1", url: "/assets/praca-grid/bloco1.jpg", background : "red", span : {row : 2, col : 2}};
    arrDefault[1] = {title: "Bloco 2", url: "/assets/praca-grid/bloco2.jpg", background : "green", span : {row : 1, col : 1}};
    arrDefault[2] = {title: "Bloco 3", url: "/assets/praca-grid/bloco3.jpg", background : "darkBlue", span : {row : 1, col : 1}};
    arrDefault[3] = {title: "Bloco 4", url: "/assets/praca-grid/bloco4.jpg", background : "blue", span : {row : 1, col : 2}};
    arrDefault[4] = {title: "Bloco 5", url: "/assets/praca-grid/bloco5.jpg", background : "yellow", span : {row : 2, col : 2}};
    arrDefault[5] = {title: "Bloco 6", url: "/assets/praca-grid/bloco6.jpg", background : "pink", span : {row : 1, col : 1}};
    arrDefault[6] = {title: "Bloco 7", url: "/assets/praca-grid/bloco7.jpg", background : "darkBlue", span : {row : 1, col : 1}};
    arrDefault[7] = {title: "Bloco 8", url: "/assets/praca-grid/bloco8.jpg", background : "purple", span : {row : 1, col : 1}};
    arrDefault[8] = {title: "Bloco 9", url: "/assets/praca-grid/bloco9.jpg", background : "deepBlue", span : {row : 1, col : 1}};
    arrDefault[9] = {title: "Bloco 10", url: "/assets/praca-grid/bloco10.jpg", background : "lightPurple", span : {row : 1, col : 1}};
    arrDefault[10] = {title: "Bloco 11", url: "/assets/praca-grid/bloco11.jpg", background : "yellow", span : {row : 1, col : 1}};
    arrDefault[11] = {title: "Bloco 12", url: "/assets/praca-grid/bloco12.jpg", background : "yellow", span : {row : 1, col : 1}};
    arrDefault[12] = {title: "Bloco 13", url: "/assets/praca-grid/bloco12.jpg", background : "pink", span : {row : 1, col : 1}};
    arrDefault[13] = {title: "Bloco 14", url: "/assets/praca-grid/bloco14.jpg", background : "darkBlue", span : {row : 1, col : 1}};
    arrDefault[14] = {title: "Bloco 15", url: "/assets/praca-grid/bloco15.jpg", background : "purple", span : {row : 1, col : 2}};
    arrDefault[15] = {title: "Bloco 16", url: "/assets/praca-grid/bloco16.jpg", background : "deepBlue", span : {row : 1, col : 1}};
    arrDefault[16] = {title: "Bloco 17", url: "/assets/praca-grid/bloco17.jpg", background : "lightPurple", span : {row : 1, col : 1}};
    arrDefault[17] = {title: "Bloco 18", url: "/assets/praca-grid/bloco18.jpg", background : "yellow", span : {row : 1, col : 1}};
    for (let j = 0; j < 16; j++) {
      let it = {
        title : arrDefault[j].title,
        url : arrDefault[j].url,
        span : arrDefault[j].span,
        background : arrDefault[j].background
      };
      if (typeof arrValue[j] == 'object') {
        it.title = arrValue[j].titulo;
        it.url = arrValue[j].arquivo;
      }
      arrValueTreated.push(it);
    }
    return arrValueTreated;
  }

  parseDate(dataObj) {
    if (!this.dateSet) {
      return undefined
    }

    return moment(dataObj).format("DD.MM.YYYY")
  }

  permissionIsManagerOrAdmin(user, praca){
    if (user.is_staff === true) {
      return true
    } else if ((angular.isDefined(praca.gestor) && praca.gestor !== null)) {
      return user.id_pub === praca.gestor.user_id_pub
    } else {
      return false
    }
  }

  buildMenu(currentUser) {
    const userMenu = {}

    if (!this.permissionIsManagerOrAdmin(this.currentUser, this.praca)) {
    // if ((currentUser.is_staff === false) && (angular.isUndefined(this.praca.gestor) || this.praca.gestor === null)) {
      userMenu.vinculo = {
        id: "vinculo",
        name: "Solicitar vinculo para gestão da Praça",
        icon: "assignment_ind",
        // action: this.showVinculacao,
        dialog: {
          controller: "VinculacaoCtrl",
          controllerAs: "$ctrl",
          templateUrl: "praca/vinculacao.tmpl.html",
          parent: angular.element(this.$document.body),
          locals: { praca: this.praca },
          clickOutsiteToClose: false,
          fullscreen: true,
        },
      }
    }

    if (this.permissionIsManagerOrAdmin(this.currentUser, this.praca)) {
      userMenu.event = {
        id: "evento",
        name: "Adicionar Evento",
        icon: "insert_invitation",
        dialog: {
          controller: "EventCtrl",
          controllerAs: "$ctrl",
          templateUrl: "praca/event-dialog.tmpl.html",
          parent: angular.element(this.$document.body),
          locals: { praca: this.praca },
          fullscreen: true,
        },
      }

      userMenu.partner = {
        id: "parceiro",
        name: "Adicionar Parceiro",
        icon: "people",
        dialog: {
          controller: "ParceirosCtrl",
          controllerAs: "$ctrl",
          templateUrl: "praca/parceiros-dialog.tmpl.html",
          parent: angular.element(this.$document.body),
          locals: { praca: this.praca },
          fullscreen: true,
        },
      }

      userMenu.profile = {
        id: "perfil",
        name: "Editar informações sobre a Praça",
        icon: "info",
        dialog: {
          controller: "PracaInfoCtrl",
          controllerAs: "$ctrl",
          templateUrl: "praca/pracainfo-dialog.tmpl.html",
          parent: angular.element(this.$document.body),
          locals: { praca: this.praca },
          fullscreen: true,
        },
      }

      userMenu.headerImg = {
        id: "headerImg",
        name: "Editar o cabeçalho da pagina da Praça",
        icon: "aspect_ratio",
        dialog: {
          controller: "ChangeHeaderImgCtrl",
          controllerAs: "$ctrl",
          templateUrl: "praca/header-dialog.tmpl.html",
          parent: angular.element(this.$document.body),
          locals: { praca: this.praca },
        },
      }

      userMenu.uploadImg = {
        id: "uploadImg",
        name: "Enviar imagens para a Praça",
        icon: "photo_camera",
        dialog: {
          controller: "UploadImgCtrl",
          controllerAs: "$ctrl",
          templateUrl: "praca/galeria-upload.tmpl.html",
          parent: angular.element(this.$document.body),
          locals: { praca: this.praca },
        },
      }
    }

    return userMenu
  }

  showDialog($event, dialog) {
    dialog.targetEvent = $event
    this.$mdDialog.show(dialog)
  }
}

export default PracaDetailCtrl
