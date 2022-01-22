    
function convertBedirxaniToArabic() { 
  let treeWalker = document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null,false)
  let nodeList = [];
  while(treeWalker.nextNode()) nodeList.push(treeWalker.currentNode);
    nodeList.forEach(node => {
        
      const parent = node.parentElement
      if (['SCRIPT','STYLE'].includes(parent.tagName)){
        return
      }
  
      if(node.textContent.trim().length > 0){
        parent.style.direction = 'rtl'
        node.textContent = convA(node.nodeValue)
      }
  })
}

convertBedirxaniToArabic()