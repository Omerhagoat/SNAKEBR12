function getInput(){
    let UserInput = prompt("enter number ");
    let squared = UserInput*UserInput;
        if(squared%2==0){
            document.writeln("<div class =text>" +squared+"</div>");
        }
    alert("Done");
}

getInput()