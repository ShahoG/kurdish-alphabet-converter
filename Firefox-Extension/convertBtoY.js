const YCapitalLetters = new Array(
    'é', 'É',
    'í', 'Í',
    'ú', 'Ú',
    'ch', 'Ch',
    'sh', 'Sh'
);
const YConvertLatinB = new Array(
    'ş','sh',
    'Ş','Sh',
    'î', 'í',
    'Î', 'Í',
    'û', 'ú',
    'Û', 'Ú',
    'ê', 'é',
    'Ê', 'É',
    'c','j',
    'C', 'J',
    'ĵ','jh',
    'Ĵ', 'Jh',
    'ć','c',
    'Ç','C', 
);

function convertBtoY(text) {
    let convertedText = text;
     
    // Temporary pre-conversion due to the jh/j/c possible confusion
    convertedText = convertedText.replace(new RegExp('j', 'gim'), 'ĵ').replace(new RegExp('ç', 'gim'), 'ć');
    
    // Main conversion
    for (i = 0; i < YConvertLatinB.length; i += 2){
        convertedText = convertedText.replace(new RegExp(YConvertLatinB[i], 'gim'), YConvertLatinB[i + 1]);
    }
  
    // Capitalise the first words of sentences
    convertedText = convertedText.replace(new RegExp('(^|\r\n|[\\.\\u003F!] [^a-zêîûçş0-9\'’]*)([a-zêîûçş])', 'gim'), function (m, p1, p2) {
        for (i = 0; i < YCapitalLetters.length; i += 2)
            p2.replace(YCapitalLetters[i], YCapitalLetters[i + 1]);
        return p1 + p2.toUpperCase();
    });

     
  return convertedText;
}