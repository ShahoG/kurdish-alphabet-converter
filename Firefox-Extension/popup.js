document.addEventListener('DOMContentLoaded', () => {
    
    // Declare buttons
    const ArabicToYekgirtuButton = document.getElementById('convertToY')
    const ArabicToBedirxaniButton = document.getElementById('convertToB')
    const BedirxaniToYekgirtuButton = document.getElementById('convertBtoY')
    const BedirxaniToArabicButton = document.getElementById('convertBtoA')

    // Execute scripts from clicks on btns
    ArabicToYekgirtuButton.onclick = () => { 
        executeScript('scriptY.js')
    }

    ArabicToBedirxaniButton.onclick = () => { 
        executeScript('scriptB.js')
    }

    BedirxaniToYekgirtuButton.onclick = () => { 
        executeScript('scriptBtoY.js')
    }

    BedirxaniToArabicButton.onclick = () => { 
        executeScript('scriptBtoA.js')
    }

    // Add listener for keyboard shorcuts
    document.addEventListener('keyup', (e) => {
        if(e.code === 'KeyY'){
            executeScript('scriptY.js')
        }else if(e.code === 'KeyB'){
            executeScript('scriptB.js')
        }else if(e.code === 'KeyU'){
            executeScript('scriptBtoY.js')
        }else if(e.code === 'KeyA'){
            executeScript('scriptBtoA.js')
        }
    })  
    

    // Execute the correct script
    let executeScript = (type) => {
        chrome.tabs.executeScript({file:type})
        window.close()
    }
})


