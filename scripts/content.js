const tagsBlacklist = ['script', 'style', 'noscript']
const tagName = 'readiesely'

function recursiveSearchAndReplace(node) {
  if (node.nodeType === Node.ELEMENT_NODE) {
    node.childNodes.forEach(recursiveSearchAndReplace)
  } else if (node.nodeType === Node.TEXT_NODE) {
    if (node.textContent.trim() === "" || tagsBlacklist.includes(node.parentNode.nodeName.toLocaleLowerCase())) {
      return false
    }
    
    const nodes = node
      .textContent
      .split(' ')
      .map(textNode => {
        const container = document.createElement(tagName)
        const lengthToHighlight = Math.floor(textNode.length/2)
        const boldIt =`${textNode.slice(0, lengthToHighlight)}`
      
        if (boldIt.trim() !== '') {
          const strongTag = document.createElement('strong')
          strongTag.innerText = boldIt
        
          container.append(strongTag)
          container.append(`${textNode.slice(lengthToHighlight)} `)
        
          return container.outerHTML
        }
        
        container.append(`${textNode} `)
      
        return container.outerHTML
      })
      .join()

    const children = new DOMParser().parseFromString(nodes, 'text/html').body.childNodes
    const parent = document.createElement(tagName)
    
    children.forEach(child => parent.append(child))
    node.replaceWith(parent)
    
    return true
  }
}

recursiveSearchAndReplace(document.querySelector('body'))