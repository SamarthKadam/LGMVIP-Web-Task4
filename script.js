
'use strict'
let inputOper='';
let stack=[];
let stackPointer=-1;
let result=[];
const getResult=document.querySelector('.operater6');
const buttonQuestion=document.querySelector('.amazing-input');
const reset=document.querySelector('.operater');
window.addEventListener("click",function(e){
    // if((e.target.closest('.click')) && e.target.closest('.operater6'))
    // {
    //     return;
    // }
    // else{
    //     let num=e.target.closest('.click').dataset.num;
    //     inputOper+=num;
    //     buttonQuestion.value=inputOper;
    // }

    if(e.target.closest('.operater'))
    {
        return;
    }

    if(e.target.closest('.operater6'))
    {
        return 
    } 

    if(e.target.closest('.click')==null)
    {
        return;
    }
    else{
        let num=e.target.closest('.click').dataset.num;
        inputOper+=num;
        buttonQuestion.value=inputOper;
    }
});


const Presedence=function(elem)
{
    if(elem=='*'||elem=='/'||elem=='%')
    {
        return 2;
    }
    else if(elem=='+'||elem=='-')
    {
        return 1;
    }
}

function opener(str)
{
    if(str=='*'|| str=='/'||str=='-'||str=='+')
    {
        return 0;
    }
    else{
        return 1;
    }

}

const clearStuff=function(){
    inputOper='';
 stack=[];
 stackPointer=-1;
 result=[];

}

const FindAnswer=function()
{
    let Anotherstack=[];
    let i=0;
    while(i<result.length)
    {
        if(!isNaN(result[i]) && opener(result[i]))
        {
            Anotherstack.push(result[i]);
        }
        else{
            let x;
            let y;
            y=Number(Anotherstack.pop());
            x=Number(Anotherstack.pop());
            switch(result[i])
            {
                case '*': Anotherstack.push(x*y);
                break;

                case '/':Anotherstack.push(x/y);
                break;

                case '+':Anotherstack.push(x+y);
                break;

                case '-':Anotherstack.push(x-y);
                break;

                case '%':Anotherstack.push(x%y);
                break;
            }
        }
        i=i+1;
    }

    buttonQuestion.value=Anotherstack.pop();
    clearStuff();
}

const Isoperater=function(c)
{
    if(c=='*'||c=='/'|| c=='%'||c=='+'||c=='-')
    {
        return 1;
    }
    else{
        return 0;
    }
}

const ModifyArray=function()
{
    // let index=0;
    // let MArray=[];
    // while(index<inputOper.length)
    // {
    //     if(!Isoperater(inputOper[index]))
    //     {
    //         let str='';
    //         while(!(Isoperater(inputOper[index])))
    //         {
    //             str+=inputOper[index];
    //             index++;
    //         }
    //         MArray.push(str);
    //     }
    //     else{
    //         MArray.push(inputOper[index]);
    //         index=index+2;
    //     }
    // }
    // inputOper=ModifyArray;
    let index=0;
    let AuxArray=[];
    while(index<inputOper.length)
    {
        if(!(Isoperater(inputOper[index])))
        {
            let str='';
            while(!(Isoperater(inputOper[index])) && index<inputOper.length)
            {
                str+=inputOper[index];
                index++;
            }
            AuxArray.push(str);
        }
        else{
            AuxArray.push(inputOper[index]);
            index=index+2;
        }
    }
    inputOper=AuxArray;
}


const evaluatePF=function()
{
    let i=0;
  inputOper=inputOper.split('');
  let l=0;
  for(l=0;l<inputOper.length;l++)
  {
    if(isNaN(inputOper[l]) && inputOper[l]!='x')
    {
        inputOper.splice(l+1,0,'x');
    }
  }
  ModifyArray();

   while(i<inputOper.length)
    {
        if(!isNaN(inputOper[i]))
        {
            result.push(inputOper[i]);
            i++;
        }
        else{
            if(stackPointer==-1 || Presedence(inputOper[i])>Presedence(stack[stackPointer]))
            {
                stackPointer++;
                stack.push(inputOper[i]);
                i++;
            }
            else{
                stackPointer--;
               result.push(stack.pop());
            }
        }
    }
    while(stackPointer!=-1)
    {
        result.push(stack.pop());
        stackPointer--;
    }
    FindAnswer();
}

getResult.addEventListener("click",function(e){
    evaluatePF();
});

reset.addEventListener("click",function(){
    buttonQuestion.value='';
    clearStuff()
});