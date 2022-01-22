//Latin to Arabic Array
var sConvertLatin2ArabicB = new Array(
    '(^|[^a-zêîûçş0-9\'’])([aeiouêîû])', '$1ئ$2', //insert hamza
    '(ئ)([uû])([^êîûçşa-z0-9])', 'و$3', //omit the inserted hamza for 'u' (=and)
    'a', 'ا',
    'b', 'ب',
    'ch|ç', 'چ',
    'c', 'ج',
    'd', 'د',
    'ee|ê|é', 'ێ',
    'e', 'ە',
    'f', 'ف',
    'gh', 'غ',
    'g', 'گ',
    'hh', 'ح',
    'sh|ş', 'ش',
    'h', 'ھ',
    'î|y|í', 'ی',
    'j', 'ژ',
    'k', 'ک',
    'll', 'ڵ',
    'l', 'ل',
    'm', 'م',
    'n', 'ن',
    'o', 'ۆ',
    'p', 'پ',
    'q', 'ق',
    'rr', 'ڕ',
    'r', 'ر',
    's', 'س',
    't', 'ت',
    'uu|û|ú', 'وو',
    'u|w', 'و',
    'v', 'ڤ',
    'x', 'خ',
    'z', 'ز',
    '\'|’', 'ع',
    '\\u003F', '؟', //question mark
    '\,', '،',
    '\;', '؛',
    'i', '', // Remove all i letters since they do dot exist in arabic alphabet
);

var sSuffixesB = new Array(
    '[ ]+()ئ(م|ی|ە|ین|ن|ا|ێ|ێن)($|[^ء-يٱ-ە])', //e.g. ziman a
    '[ ]+()(یی|یە|یا|یێ|یێن)($|[^ء-يٱ-ە])', //e.g. zana ye
    '([^ء-يٱ-ە])ئ(م|ی|ە|ین|ن|ا|ێ|ێن)($|[^ء-يٱ-ە])' //e.g. (ziman)a
);

var sCapitalLettersB = new Array(
    'ê', 'Ê',
    'î', 'Î',
    'û', 'Û',
    'ç', 'Ç',
    'ş', 'Ş'
);

// Arabic to Latin Array
var sConvertArabic2LatinB = new Array(
    //managing 'و' and 'ی'
    'و([اێۆە])', 'w$1', //و + vowel => w (e.g. wan)
    'ی([اێۆە])', 'y$1', //ی + vowel => y (e.g. yas)
    '([اێۆە])و', '$1w', //vowel + و => w (e.g. kew)
    '([اێۆە])ی', '$1y', //vowel + ی => y (e.g. bey)
    '(^|[^ء-يٱ-ەwy])و([^ء-يٱ-ەwy])', '$1û$2', //non-letter + 'و' + non-letter => û (=and)
    '(^|[^ء-يٱ-ەwy])و', '$1w', //non-letter + 'و' => w (e.g. wtar)
    'یو', 'îw', //'ی' + 'و' => îw (e.g. nîw)
    'یی', 'îy', //'ی' + 'ی' => îy (e.g. kanîy)
    'وی', 'uy', //'و' + 'ی' => uy (e.g. buyn)
    'وو', 'û', //'و' + 'و' => û (e.g. bû)
    'ی', 'î',
    'و', 'u',
    'uu', 'û', //'و' + 'و' => û (e.g. bû)

    '([ء-يٱ-ەîuûwy])ڕ', '$1rr', //when 'ڕ' not at the beginning of a word => rr
    'ر|ڕ', 'r',
    'ش', 'ş',
    'ئ', '',
    'ا', 'a',
    'ب', 'b',
    'چ', 'ç',
    'ج', 'c',
    'د', 'd',
    'ێ', 'ê',
    'ە|ه‌', 'e',
    'ف', 'f',
    'خ|غ', 'x',
    'گ', 'g',
    'ح|ھ', 'h',
    'ژ', 'j',
    'ک', 'k',
    'ڵ', 'll',
    'ل', 'l',
    'م', 'm',
    'ن', 'n',
    'ۆ', 'o',
    'پ', 'p',
    'ق', 'q',
    'س', 's',
    'ت', 't',
    'ڤ', 'v',
    'ز', 'z',
    'ع', '\'',
    '‌', '',
    '؟', '?',
    '،', '\,',
    '؛', '\;',
    '٠|۰', '0',
    '١|۱', '1',
    '٢|۲', '2',
    '٣|۳', '3',
    '٤|۴', '4',
    '٥|۵', '5',
    '٦|۶', '6',
    '٧|۷', '7',
    '٨|۸', '8',
    '٩|۹', '9',
    '»|«', '"',
	'ـ', '',

    //insert i where applicable

    'll', 'Ľ', //temporary conversion to avoid seeing ll as 2 letters
    'rr', 'Ŕ', //temporary conversion to avoid seeing rr as 2 letters
    '([bcçdfghjklĽmnpqrŔsştvwxz])([fjlĽmnrŔsşvwxyz])([fjlĽmnrŔsşvwxyz])([^aeêiîouûy])', '$1$2i$3$4', //e.g. grft -> grift
    '([aeêiîouû])([bcçdfghjklĽmnpqrŔsştvwxz])([bcçdfghjklĽmnpqrŔsştvwxz])([bcçdfghjklĽmnpqrŔsştvwxz])\\b', '$1$2$3i$4', //e.g. cejnt -> cejnit
    '([fjlĽrŔsşwyz])([fjlĽmnrŔsşvwxyz])([bcçdfghjklĽmnpqrŔsştvwxz])', '$1i$2$3', //e.g. wrd -> wird
    '([bcçdghkmnpqtvx])([fjlĽmnrŔsşvwxyz])($|[^aeêiîouû])', '$1i$2$3', //e.g. prd -> pird
    '([^aeêiîouû])([bcçdghkmnpqtvx])([fjlĽmnrŔsşvwxyz])($|[^aeêiîouû])', '$1$2i$3$4', //repeat the latter expression, in case skipped
    '(^|[^aeêiîouy])([bcçdfghjklĽmnpqrŔsştvwxz])([bcçdfghjklĽmnpqrŔsştvwxz])($|[^aeêiîouû])', '$1$2i$3$4', //e.g. ktk -> kitk
	'(^|[^a-zçşêîûĽŔ])([bcçdfghjklĽmnpqrŔsştvwxz])(\\s)', '$1$2i$3', //e.g. j -> ji
    'Ľ', 'll', //revert the temporary conversion
    'Ŕ', 'rr' //revert the temporary conversion
);

var sOnsetIB = new Array(
    '([bcçdfghjklmnpqrsştvwxz])([wy][aeêiîouû])', '$1i$2', //e.g. dyar -> diyar
    '(^|[^a-zêîûçş0-9\'’])([bcçdfghjklĽmnpqrŔsştvwxz])([bcçdfghjklĽmnpqrŔsştvwxz])', '$1$2i$3', //e.g. bra -> bira
    '([bcçdfghjklmnpqrsştvwxz][bcçdfghjklĽmnpqrŔsştvwxz])([bcçdfghjklĽmnpqrŔsştvwxz])', '$1i$2' //e.g. aşkra -> aşkira
);

// Standardize Arabic scripts Array
var sConvertStandardiseB = new Array(
	'‌{1,}', '‌', //omit multiple successive zero-width non-joiners
    'لاَ|لأ|لآ', 'ڵا',
    'لً|لَ', 'ڵ',
    'ض', 'چ',
    'ث', 'پ',
    'ظ', 'ڤ',
    'ط', 'گ',
    'ىَ|يَ|یَ', 'ێ',
    'رِ', 'ڕ',
    'ؤ|وَ', 'ۆ',
    'ي|ى', 'ی',
    'ذ', 'ژ',
    'ك', 'ک',
    // using unicode: 06D5 (Arabic letter Ae) for E
    // using unicode: 06BE (Arabic letter He Doachashmee) for H
    'ه‍', 'ھ',
    'ه($|[^ء-يٱ-ە])', 'ە$1',
    'ە‌', 'ە',
    'ة', 'ە',
    'ه', 'ھ', // rest of هs are H
    '([ء-يٱ-ە])‌([^ء-يٱ-ە])', '$1$2'
);

var sAliWebB = new Array(
    'ص', 'ێ',
    'أ', 'ڕ'
);

var sConvertDilanB = new Array(
	'ص', 'ڵ',
	'ث', 'ێ',
	'ذ', 'ڕ'
);

// Latin type Array - Not used
var sConvertLatinB = new Array(
    //typed, Hawar
    'ee', 'ê',
    'ii', 'î',
    'uu', 'û',
    'Ee|EE', 'Ê',
    'Ii|II', 'Î',
    'Uu|UU', 'Û',
    'ch', 'ç',
    'sh', 'ş',
    'Ch|CH', 'Ç',
    'Sh|SH', 'Ş'
);

// Not used
var sNumbersB = new Array(
    '0', '٠',
    '1', '١',
    '2', '٢',
    '3', '٣',
    '4', '٤',
    '5', '٥',
    '6', '٦',
    '7', '٧',
    '8', '٨',
    '9', '٩'
);

//Arabic type Array - Not used
var sKeyboardLayoutsB = new Array(
//English keyboard, Rojhellat keyboard, Bakur keyboard, Bashur Keyboard

    //numbers row
    '`', 'پ', '', 'ژ',
    '1', '١', '١', '١',
    '2', '٢', '٢', '٢',
    '3', '٣', '٣', '٣',
    '4', '٤', '٤', '٤',
    '5', '٥', '٥', '٥',
    '6', '٦', '٦', '٦',
    '7', '٧', '٧', '٧',
    '8', '٨', '٨', '٨',
    '9', '٩', '٩', '٩',
    '0', '٠', '٠', '٠',
    '-', '-', '+', '-',
    '=', '=', '\'', '=',

    //numbers row shifted
    '~', '~', '~', '~',
    '!', '!', '!', '!',
    '@', '@', '@', '@',
    '#', '#', '#', '#',
    '$', '$', '$', '$',
    '%', '%', '%', '%',
    '^', '÷', '^', '^',
    '&', '×', '&', '&',
    '*', '*', '*', '*',
    '(', ')', ')', ')',
    ')', '(', '(', '(',
    '_', 'ـ', '_', '_',
    '+', '+', '+', '+',

    //letters top row     
    'q', 'ڵ', 'ق', 'چ',
    'w', 'ۆ', 'و', 'ص',
    'e', 'ێ', 'ە', 'پ',
    'r', 'ق', 'ر', 'ق',
    't', 'ف', 'ت', 'ف',
    'y', 'غ', 'ی', 'غ',
    'u', 'ع', 'و', 'ع',
    'i', 'ە', 'ئ', 'ھ',
    'o', 'خ', 'ۆ', 'خ',
    'p', 'ح', 'پ', 'ح',
    '[', 'ج', 'وو', 'ج',
    ']', 'چ', 'ش', 'د',
    '\\', 'ژ', 'چ', '\\',

    //letters top row shifted    
    'Q', 'ض', '`', 'ض',
    'W', 'ص', 'وو', '}',
    'E', 'ث', 'ي', 'ث',
    'R', 'ك', 'ڕ', '{',
    'T', 'ي', 'ط', 'ڤ',
    'Y', '_', 'ێ', 'إ',
    'U', '', 'ء', '',
    'I', 'ه‌', 'ع', '÷',
    'O', ',', 'ؤ', '×',
    'P', '‍', 'ث', '؛',
    '{', ']', ']', '>',
    '}', '[', '[', '<',
    '|', '|', '|', '|',

    //letters mid row
    'a', 'ش', 'ا', 'ش',
    's', 'س', 'س', 'س',
    'd', 'ی', 'د', 'ی',
    'f', 'ب', 'ف', 'ب',
    'g', 'ل', 'گ', 'ل',
    'h', 'ا', 'ھ', 'ا',
    'j', 'ت', 'ژ', 'ت',
    'k', 'ن', 'ک', 'ن',
    'l', 'م', 'ل', 'م',
    ';', 'ک', 'ێ', 'ک',
    '\'', 'گ', 'ی', 'گ',

    //letters mid row shifted
    'A', '»', 'آ', ']',
    'S', '«', 'ش', '[',
    'D', 'ێ', 'ذ', 'ێ',
    'F', '', 'إ', '',
    'G', 'ڵ', 'غ', 'ڵ',
    'H', 'ئا', 'ە', 'أ',
    'J', 'ء', 'أ', 'ـ',
    'K', '}', 'ك', '،',
    'L', '{', 'ڵ', '/',
    ':', ':', ':', 'ك',
    '"', '؛', '"', 'ط',

    //letters bottom row
    'z', 'ڤ', 'ز', 'ئ',
    'x', 'ھ', 'خ', 'ء',
    'c', 'ز', 'ج', 'ۆ',
    'v', 'ر', 'ڤ', 'ر',
    'b', 'ڕ', 'ب', 'لا',
    'n', 'د', 'ن', 'ی',
    'm', 'ئ', 'م', 'ە',
    ',', 'و', '،', 'و',
    '.', '.', '.', 'ز',
    '/', '/', '-', '/',

    //letters bottom row shifted
    'Z', 'ظ', 'ض', '',
    'X', 'ط', 'ص', 'وو',
    'C', 'ژ', 'چ', 'ؤ',
    'V', 'ڕ', 'ظ', 'ڕ',
    'B', '‌', 'ى', 'ڵا',
    'N', '‌ذ', 'ة', 'آ',
    'M', 'ة', 'ـ', 'ة',
    '<', 'ۆ', '>', ',',
    '>', '،', '<', '.',
    '?', '؟', '؟', '؟'
);


function convB(texten){
	var s = texten;
            
    // standardize Arabic before converting Arabic to Latin
    for (i = 0; i < sConvertDilanB.length; i += 2){
        s = s.replace(new RegExp(sConvertDilanB[i], 'g'), sConvertDilanB[i + 1]);
    }

    for (i = 0; i < sAliWebB.length; i += 2){
        s = s.replace(new RegExp(sAliWebB[i], 'g'), sAliWebB[i + 1]);
    }

    for (i = 0; i < sConvertStandardiseB.length; i += 2){
        s = s.replace(new RegExp(sConvertStandardiseB[i], 'g'), sConvertStandardiseB[i + 1]);
    }

    //main conversion
    for (i = 0; i < sConvertArabic2LatinB.length; i += 2){
        s = s.replace(new RegExp(sConvertArabic2LatinB[i], 'gim'), sConvertArabic2LatinB[i + 1]);
    }

    s = s.replace(new RegExp('ll', 'gim'), 'Ľ').replace(new RegExp('rr', 'gim'), 'Ŕ'); //temporary conversion

    //add extra i's for Kurmanci texts
    for (i = 0; i < sOnsetIB.length; i += 2){
            s = s.replace(new RegExp(sOnsetIB[i], 'gim'), sOnsetIB[i + 1]); //e.g. bra -> bira
    }

    s = s.replace(new RegExp('Ľ', 'gim'), 'll').replace(new RegExp('Ŕ', 'gim'), 'rr'); //temporary conversion

    //capitalise the first words of sentences
    s = s.replace(new RegExp('(^|\r\n|[\\.\\u003F!] [^a-zêîûçş0-9\'’]*)([a-zêîûçş])', 'gm'), function (m, p1, p2) {
        for (i = 0; i < sCapitalLettersB.length; i += 2)
            p2.replace(sCapitalLettersB[i], sCapitalLettersB[i + 1]);
        return p1 + p2.toUpperCase();
    });

	return s;
}

function convA(texten){
    
    let convertedText = texten;

    //main conversion
    for (i = 0; i < sConvertLatin2ArabicB.length; i += 2){
        convertedText = convertedText.replace(new RegExp(sConvertLatin2ArabicB[i], 'gim'), sConvertLatin2ArabicB[i + 1]);
    }

	return convertedText;
}