export const FormatNumber=(numberEnter?:number|null)=>{
    return numberEnter?new Intl.NumberFormat().format(numberEnter):numberEnter
}
