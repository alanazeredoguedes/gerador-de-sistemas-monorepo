export const string_validation = {
    ucwords: (value) => {
        return value.charAt(0).toUpperCase() + value.substring(1);
    },
    capitalize: (value) =>{
        return value.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    },
    removeSpace: (value) => {

        if(value.includes(' ')){
            let indexL = value.indexOf(' ')
            if(value[indexL+1] !== undefined){
                return value.replace(/\s/g, '');
            }
        }

        return value
    },
    changeSpaceTo: (value, change) =>{
        return value.replace(/\s/g, change);
    },
    normalizeString:(value) =>{
        return value.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z\s])/g, '')
    },
    normalizeStringExceptUnderscore:(value) =>{
        return value.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9_a-zA-Z\s])/g, '')
    },
    capitalizeLetterToSpace:(value) =>{
        return value.split(/(?=[A-Z])/).join([' '])
    },
    capitalizeLetterToUnderline:(value) =>{
        return value.split(/(?=[A-Z])/).join(['_'])
    },
    UpperCaseToScoreAndLower:(str) =>{

        let result = '';
        str.split('').forEach((letter) => {
            result += (letter === letter.toUpperCase()) ? '_'+letter.toLowerCase() : letter;
        });

        return (result[0] === '_') ? result.substring(1) : result
    },






    notEmptyValues: (values) => {
        let existEmpty = false
        values.forEach((value)=>{
            if( !(['', null, undefined].indexOf(value) === -1) ){
                existEmpty = true
                stop();
            }
        })
        return existEmpty;
    },
    resetEventsFront: () => {
        $(function () {
            $('.showinfo').popover({
                container: 'body',
                trigger: 'hover'
            })
        })
    }
}