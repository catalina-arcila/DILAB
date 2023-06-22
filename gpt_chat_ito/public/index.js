const btnSend = document.getElementById("btnSend");
const btnClear = document.getElementById("btnClear");
const txtPromptInput = document.getElementById("txtPromptInput");
const txtPromptInput2 = document.getElementById("txtPromptInput2");
const lstResults = document.getElementById("lstResults");

btnSend.addEventListener("click",sendToChatGPT);
btnClear.addEventListener("click",clearAll);

const string = '';
const string2 = '';
const vision = '';

  
function sendToChatGPT(){

    const string2 = "A partir de la siguiente visión: ";
    const vision = txtPromptInput2.value;
    const string = ". Necesito que me generes una lista de requerimientos y objetivos, con sus respectivas tareas para su cumplimiento. Lo anterior será realizado por un equipo interdisciplinario que busca satisfacer estas historias de usuario:";
    const prompt = string2 + vision + string + txtPromptInput.value;

    if(!prompt){
        return;
    }

    fetch("/api/chatgpt",{
        method: "POST",
        mode:"no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"prompt":prompt})
    })
    .then((response)=>response.json())
    .then((data)=>{
        console.log(prompt)
        console.log(data.message.content);
        console.log(data.usage);
        const stringParsed = replaceBackticksWithPre(data.message.content);
        lstResults.innerHTML += createItem(prompt,stringParsed);
    })
    .catch((error)=>{
        console.error("Error:", error);
    })

}

function transformTableToHTML(tableString) {
    const tableLines = tableString.trim().split('\n');
    const header = tableLines[0].split('|').map(cell => cell.trim());
    const rows = tableLines.slice(2).map(line => line.split('|').map(cell => cell.trim()));
  
    let html = '<table>\n<thead>\n<tr>\n';
    html += header.map(cell => `<th>${cell}</th>\n`).join('');
    html += '</tr>\n</thead>\n<tbody>\n';
  
    rows.forEach(row => {
      html += '<tr>\n';
      html += row.map(cell => `<td>${cell}</td>\n`).join('');
      html += '</tr>\n';
    });
  
    html += '</tbody>\n</table>';
    words = html.split(/[.,\s]+/);
    return html;
  }

function createItem(prompt,message){
    var htmlTable = transformTableToHTML(message);
    const item = `<li class="list-group-item d-flex justify-content-between align-items-start">
                    <div class="ms-2 me-auto">
                        <p>${htmlTable}
                        </p>
                    </div>
                </li>`
    console.log(prompt)
    console.log(string)

    return item;
}

function replaceBackticksWithPre(string) {
    const regex = /```([\s\S]*?)```/g;
    const response = string.replace(regex, "<pre>$1</pre>");    
    return response;
}

function clearAll(){
    lstResults.innerHTML = "";
    txtPromptInput.value = "";
    txtPromptInput2.value = "";
}