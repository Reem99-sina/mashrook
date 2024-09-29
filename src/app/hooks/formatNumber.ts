export const FormatNumber=(numberEnter?:number|null)=>{
    return numberEnter?new Intl.NumberFormat().format(numberEnter):numberEnter
}
export const formatPhoneNumber = (phoneNumber?:number|null) => {  
    // Remove any non-digit characters  
    if(phoneNumber){
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');  
  
        // Check if it is a valid number (length for Saudi Arabia numbers)  
        if (cleaned.length === 13 && cleaned.startsWith('966')) {  
          return `+${cleaned.substring(0, 3)} ${cleaned.substring(3, 5)} ${cleaned.substring(5, 8)} ${cleaned.substring(8)}`;  
        }  
      
        return phoneNumber;
    } 
  };  