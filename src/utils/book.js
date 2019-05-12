export const FONT_SIZE_LIST = [
    { fontSize: 12 },
    { fontSize: 14 },
    { fontSize: 16 },
    { fontSize: 18 },
    { fontSize: 20 },
    { fontSize: 22 },
    { fontSize: 24 },
]

export const FONT_FAMILY = [
    { font: 'Default' },
    { font: 'Cabin' },
    { font: 'Days One' },
    { font: 'Montserrat' },
    { font: 'Tangerine' },
]

// export const FONT_FAMILY = [
//     { font: 'Default' },
//     { font: 'SimHei' },
//     { font: 'SimSun' },
//     { font: 'KaiTi' },
//     // { font: 'Tangerine' },
// ]

export const themeList = function(vue) {
    return [
    {
      alias: vue.$t('book.themeDefault'),
      name: 'Default',
      style: {
        body: {
          'color': '#333',
          'background': '#fff',
        //   'padding-top': `${realPx(48)}px!important`,
        //   'padding-bottom': `${realPx(48)}px!important`
        }
      }
    },
    {
      alias: vue.$t('book.themeGold'),
      name: 'Gold',
      style: {
        body: {
          'color': '#5c5b56',
          'background': '#c6c2b6',
        //   'padding-top': `${realPx(48)}px!important`,
        //   'padding-bottom': `${realPx(48)}px!important`
        }
      }
    },
    {
      alias: vue.$t('book.themeEye'),
      name: 'Eye',
      style: {
        body: {
          'color': '#404c42',
          'background': '#a9c1a9',
        //   'padding-top': `${realPx(48)}px!important`,
        //   'padding-bottom': `${realPx(48)}px!important`
        }
      }
    },
    {
      alias: vue.$t('book.themeNight'),
      name: 'Night',
      style: {
        body: {
          'color': '#cecece',
          'background': '#000000',
        //   'padding-top': `${realPx(48)}px!important`,
        //   'padding-bottom': `${realPx(48)}px!important`
        }
      }
    }
  ]
}

export const addCss = function(href) {
    let temp = document.querySelector('#addCss')
    if(temp) {
        temp.remove()
    }
    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('type', 'text/css')
    link.setAttribute('href', href)
    link.setAttribute('id', 'addCss')
    document.querySelector('head').appendChild(link)
}
