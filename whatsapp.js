function criarBarra() {
  var userBar = document.createElement('div')
  userBar.className = 'user-bar'

  var backButton = document.createElement('div')
  backButton.className = 'back'
  backButton.innerHTML = `<a href="${whats.link_voltar}"><i class="zmdi zmdi-arrow-left"></i></a>`

  var avatar = document.createElement('div')
  avatar.className = 'avatar'
  avatar.innerHTML = `<img src="${whats.img_perfil}">`
    
  var name = document.createElement('div')
  name.className = 'name'
  name.innerHTML = `<span>${whats.seu_nome}</span> <span data-testid="psa-verified" data-icon="psa-verified" class="verificado"><img src="https://i.ibb.co/QnZpVn5/verificado.png"></span><span class="status">digitando...</span>`

  var moreActions = document.createElement('div')
  moreActions.className = 'actions more'
  moreActions.innerHTML = '<i class="zmdi zmdi-more-vert"></i>'

  var attachmentAction = document.createElement('div')
  attachmentAction.className = 'actions attachment'
  attachmentAction.innerHTML = '<i class="zmdi zmdi-attachment-alt"></i>'

  var phoneAction = document.createElement('div')
  phoneAction.className = 'actions'
  phoneAction.innerHTML = '<i class="zmdi zmdi-phone"></i>'

  userBar.appendChild(backButton)
  userBar.appendChild(avatar)
  userBar.appendChild(name)
  userBar.appendChild(moreActions);
  //userBar.appendChild(attachmentAction);
  //userBar.appendChild(phoneAction);

  var elementoPai = document.querySelector('#__next')
  if (elementoPai) {
    elementoPai.insertBefore(userBar, elementoPai.firstChild)
  }
}

criarBarra();
 
const targetElement = document
  .querySelector('typebot-standard')
  .shadowRoot.querySelector('.typebot-container')

const statusText = document.querySelector('.status')

const observerConfig = { childList: true, subtree: true }

const mutationCallback = function (mutationsList, observer) {
  for (const mutation of mutationsList) {
    const guestBubbles = document
      .querySelector('typebot-standard')
      .shadowRoot.querySelectorAll('span.typebot-guest-bubble')
    const hostBubbles = document
      .querySelector('typebot-standard')
      .shadowRoot.querySelectorAll('div.bubble-typing')

    const newOuterDiv = document.createElement('div')
    newOuterDiv.className = 'feno-bubble'
    newOuterDiv.style.display = 'flex'
    newOuterDiv.style.alignItems = 'baseline'
    newOuterDiv.style.fontSize = '11px'
    newOuterDiv.style.justifyContent = 'flex-end'
    newOuterDiv.style.gap = '4px'
    newOuterDiv.style.color = '#667781'
    newOuterDiv.style.marginBottom = '-8px'

    const newInnerSpan = document.createElement('span')
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(
      minutes
    ).padStart(2, '0')}`
    newInnerSpan.textContent = formattedTime
    newInnerSpan.style.paddingBottom = '2px'

    const newImg = document.createElement('img')
    newImg.src = 'https://svgshare.com/i/wTr.svg'
    newImg.style.width = '16px'
    newImg.style.height = '11px'

    newOuterDiv.appendChild(newInnerSpan)

    if (mutation.type === 'childList') {
      for (const addedNode of mutation.addedNodes) {
        if (addedNode instanceof HTMLElement) {
          function divExistsInGuestBubble(bubble) {
            const existingDiv = bubble.querySelector('div')
            return existingDiv !== null
          }

          guestBubbles.forEach((bubble) => {
            if (!divExistsInGuestBubble(bubble)) {
              newOuterDiv.appendChild(newImg)
              bubble.appendChild(newOuterDiv.cloneNode(true))
            }
          })
        }
      }
    }
    function divExistsInHostBubble(bubble) {
      const existingDiv =
        bubble.nextElementSibling.querySelector('div.feno-bubble')
      return existingDiv !== null
    }

    hostBubbles.forEach((bubble) => {
        if (!divExistsInHostBubble(bubble)) {
          if (bubble.querySelector('.rounded-full') === null) {
            statusText.innerText = 'online'
            newOuterDiv.style.opacity = '0'
            const ifr = bubble.nextElementSibling.querySelector('iframe')
      
            if (ifr) {
              console.log(ifr, bubble)
              bubble.nextElementSibling.style.width = 'fit-content'
              bubble.nextElementSibling.style.maxHeight = '32px !important'
              bubble.style.width = '320px'
              bubble.style.height = '32px !important'
      
              const src = ifr.src
      
              if (src.includes('vimeo')) {
                bubble.style.width = '270px'
                bubble.style.height = '150px !important'
                bubble.nextElementSibling.style.width = '270px'
                bubble.nextElementSibling.style.height = '320px'
                ifr.style.maxHeight = 'calc(100% - 26px)'
      
                bubble.nextElementSibling.appendChild(newOuterDiv.cloneNode(true))
                const newElement =
                  bubble.nextElementSibling.querySelector('div.feno-bubble')
                setTimeout(() => {
                  newElement.style.opacity = '1'
                }, 400)
              } else {
                // Resto do seu código aqui
      
                // Código removido para evitar criação de elementos <audio>
              }
            } else {
              bubble.nextElementSibling.appendChild(newOuterDiv.cloneNode(true))
              const newElement = bubble.nextElementSibling.querySelector('div.feno-bubble')
              setTimeout(() => {
                newElement.style.opacity = '1'
              }, 400)
            }
          } else {
            const ifr = bubble.nextElementSibling.querySelector('iframe')
            if (ifr) {
              statusText.innerText = 'gravando audio...'
            } else {
              statusText.innerText = 'digitando...'
            }
          }
        }
      })
              
  }
}

const observer = new MutationObserver(mutationCallback)
observer.observe(targetElement, observerConfig)

  // Estilos da Barra
const userBarStyles = {
  '.user-bar .back a': {
    color: '#fff',
  },
  '.hide': {
    display: 'none',
  },
  'typebot-standard': {
    position: 'relative',
    'z-index': '9999',
  },
  '#__next': {
    position: 'relative',
    'z-index': '9999',
  },
  '.user-bar': {
    width: '100%',
    height: '55px',
    background: '#005e54',
    color: '#fff',
    padding: '0',
    'font-size': '24px',
    position: 'fixed',
    'z-index': '99999',
    display: 'block',
    top: '0',
  },
  '.user-bar:after': {
    content: "''",
    display: 'table',
    clear: 'both',
  },
  '.user-bar div': {
    float: 'left',
    transform: 'translateY(-50%)',
    position: 'relative',
    top: '50%',
    'margin-left': '10px',
  },
  '.user-bar .actions': {
    float: 'right',
    margin: '0 0 0 20px',
  },
  '.user-bar .actions.more': {
    margin: '0 12px 0 32px',
  },
  '.user-bar .actions.attachment': {
    margin: '0 0 0 30px',
  },
  '.user-bar .actions.attachment i': {
    display: 'block',
    transform: 'rotate(-45deg)',
  },
  '.user-bar .avatar': {
    margin: '0px 0 0 10px',
    width: '40px',
    height: '40px',
  },
  '.user-bar .avatar img': {
    'border-radius': '50%',
    'box-shadow': '0 1px 0 rgba(255, 255, 255, 0.1)',
    display: 'block',
    width: '100%',
    height: '100%',
  },
  '.user-bar .name': {
    'font-size': '17px',
    'font-weight': '600',
    'text-overflow': 'ellipsis',
    'letter-spacing': '0.3px',
    margin: '0 0 0 8px',
    overflow: 'hidden',
    'white-space': 'nowrap',
    width: '200px',
  },
  '.user-bar .status': {
    display: 'block',
    'font-size': '12px',
    'font-weight': '400',
    'letter-spacing': '0',
    'margin-top': '-2px',
  },
  '.user-bar .verificado img': {
    'width': '14px',
    'margin-bottom': '-1px',
  },
};

// Aplicar estilos aos elementos
function applyStyles(styles) {
  for (const selector in styles) {
    const elements = document.querySelectorAll(selector);
    const style = styles[selector];
    for (const element of elements) {
      for (const property in style) {
        element.style[property] = style[property];
      }
    }
  }
}

// Aplicar estilos da Barra
applyStyles(userBarStyles);

// Impedir download do Template
function removeData() {
  __NEXT_DATA__ = undefined;
  document.getElementById("__NEXT_DATA__").remove();
}
removeData();
// FIM DO JAVASCRIPT
