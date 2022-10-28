
  
  
  function Validator(options) {
    var selectorRule={};
    function validate(inputElement,rule) {
      var errorElement=inputElement.parentElement.querySelector('.input-form p');
      var errorMessage;
         var rules=selectorRule[rule.selector];
        for(var i=0;i<rules.length;i++){
          errorMessage=rules[i](inputElement.value);
          if(errorMessage) break;
        }
          if(errorMessage)
          {
            errorElement.innerText=errorMessage;
            inputElement.parentElement.classList.add('invalid');
          }
          else{
            errorElement.innerText='';
            inputElement.parentElement.classList.remove('invalid');
          }
       return !errorMessage;
    }
   var formelement=document.querySelector(options.form);
  
   if(formelement)
   {
    formelement.onclick = function(e){
      e.preventDefault();
      var isFormValid=true;
      options.rules.forEach(function(rule){
        var inputElement=formelement.querySelector(rule.selector);
        var isValid=validate(inputElement,rule);
        if(!isValid){
          isFormValid=false;
        }
      });
      if(isFormValid){
      window.location="https://bkit-cpp.github.io/WebKiemThu/";
      }
      else{
      
      }
      
    }
    options.rules.forEach(function(rule){
     if(Array.isArray(selectorRule[rule.selector]))
     {
      selectorRule[rule.selector].push(rule.test);
     }
     else{
      selectorRule[rule.selector]=[rule.test];
     }
     var inputElement=formelement.querySelector(rule.selector);
     
      if(inputElement)
      {
        inputElement.onblur=function(){
          validate(inputElement,rule);
          
        }
      }
    });
   console.log(selectorRule);
   }
  }
  Validator.isRequired = function(selector,message){
   return{
    selector:selector,
    test:function(value){
       return value.trim() ? undefined : message||'The username is blank'
    }
   };
  }
  Validator.minlenght = function(selector,min,message){
    return{
      selector:selector,
      test:function(value){
  return value.length >= min? undefined : message||'The pass is so short, min is';
      }
     };
  }
  Validator.isPasswordConfirm = function(selector,getConfirmValue,message){
    return{
      selector:selector,
      test:function(value){
        return value===getConfirmValue()? undefined : message|| 'The confirm value is error';
      }
     };
  }

  
  
  