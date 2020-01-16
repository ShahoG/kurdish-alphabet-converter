document.addEventListener('DOMContentLoaded', () => {
    
    // Declare buttons
    const yekgirtuButton = document.getElementById('convertToY')
    const bedirxaniButton = document.getElementById('convertToB')

    // Execute scripts from clicks on btns
    yekgirtuButton.onclick = () => { 
        executeScript('scriptY.js')
    }

    bedirxaniButton.onclick = () => { 
        executeScript('scriptB.js')
    }

    // Add listener for keyboard shorcuts
    document.addEventListener('keyup', (e) => {
        if(e.code === 'KeyY'){
            executeScript('scriptY.js')
        }else if(e.code === 'KeyB'){
            executeScript('scriptB.js')
        }
    })  
    

    // Execute the correct script
    let executeScript = (type) => {
        chrome.tabs.executeScript({file:type})
        window.close()
    }
})


