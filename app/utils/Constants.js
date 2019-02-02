const app_name = 'CardsStack'

class Screens {
  ALL_CARDS_SCREEN = `${app_name}.AllCardsScreen`
}

class Colors {
  WHITE = '#ffffff'
  RED = '#e84c4d'
  BLACK = '#000000'
  GRAY = '#c9d2d7'
}

export default class Constants {
  static APP_NAME = app_name
  static screens = new Screens()
  static colors = new Colors()
}
