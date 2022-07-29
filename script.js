
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

    // console.log(Anotherstack.pop());
    buttonQuestion.value=Anotherstack.pop();
    clearStuff();
}

const evaluatePF=function()
{
    let i=0;
    console.log(inputOper);
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
        result.push(stack.shift());
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