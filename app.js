"use strict";
const data=window.project;
const pilot=data.name==="Pilotbrief";
const byId=id=>document.getElementById(id);
const form=byId("editor");
const rows=byId("rows");
const status=byId("feedback");
let entries=structuredClone(data.sample);
let selected=0;

function criterionMet(entry){
  return entry.observed!=="" && (entry.direction==="Higher is better"
    ? Number(entry.observed)>=Number(entry.target)
    : Number(entry.observed)<=Number(entry.target));
}

function outcome(entry){
  if(!pilot)return entry.decision;
  if(entry.observed==="")return "Pending measurement";
  return criterionMet(entry)?"Target met":"Below target performance";
}

function metricValues(){
  if(!pilot)return data.labels.map(label=>entries.filter(entry=>entry.decision===label).length);
  const measurable=entries.filter(entry=>entry.observed!=="");
  const better=measurable.filter(entry=>entry.direction==="Higher is better"
    ? Number(entry.observed)>Number(entry.baseline)
    : Number(entry.observed)<Number(entry.baseline));
  return [better.length,entries.filter(criterionMet).length,entries.length];
}

function makeField(label,key){
  const wrapper=document.createElement("label");
  wrapper.textContent=label;
  const choices={decision:data.labels,direction:["Lower is better","Higher is better"]};
  const isNumber=["baseline","target","observed"].includes(key);
  const isLong=["evidence","notes"].includes(key);
  const input=document.createElement(choices[key]?"select":isLong?"textarea":"input");
  input.name=key;
  input.required=["claim","baseline","target"].includes(key);
  if(isNumber){input.type="number";input.step="any";}
  if(!isNumber)wrapper.className="wide";
  if(choices[key])for(const choice of choices[key])input.add(new Option(choice,choice));
  wrapper.append(input);
  return wrapper;
}

function refresh(){
  const metrics=metricValues();
  byId("metrics").replaceChildren(...data.labels.map((label,index)=>{
    const card=document.createElement("div");card.className="stat";
    const value=document.createElement("strong");value.textContent=metrics[index];
    card.append(value,label);return card;
  }));
  rows.replaceChildren(...entries.map((entry,index)=>{
    const button=document.createElement("button");button.type="button";button.className="row";
    button.setAttribute("aria-pressed",String(index===selected));
    const label=document.createElement("small");label.textContent=outcome(entry);
    button.append(entry.claim,label);
    button.addEventListener("click",()=>select(index,true));
    return button;
  }));
  byId("export").disabled=!entries.length;
}

let dirty=false;
form.addEventListener("input",()=>{dirty=true;status.textContent="Unsaved edits";});
function canLeave(){
  return !dirty||window.confirm("Discard unsaved edits?");
}

function select(index,focus=false){
  if(!canLeave())return;
  selected=index;
  dirty=false;
  status.textContent="";
  const entry=entries[index]||{};
  for(const [,key] of data.fields){
    const field=form.elements.namedItem(key);
    field.value=entry[key]??(field.tagName==="SELECT"?field.options[0].value:"");
  }
  byId("remove").hidden=index<0;
  refresh();
  if(focus)form.elements.namedItem("claim").focus();
}

form.addEventListener("submit",event=>{
  event.preventDefault();
  const entry=Object.fromEntries(new FormData(form));
  entry.claim=entry.claim.trim();
  if(!entry.claim){status.textContent="Enter a title.";return;}
  if(!pilot&&entry.decision==="Approved"&&!entry.evidence.trim()){
    status.textContent="Add a source before approving this claim.";return;
  }
  if(selected<0){selected=entries.length;entries.push(entry);}
  else entries[selected]=entry;
  dirty=false;
  select(selected);
  status.textContent="Saved.";
});

byId("add").addEventListener("click",()=>select(-1,true));
byId("remove").addEventListener("click",()=>{
  if(selected<0||!window.confirm("Remove this item and discard any unsaved edits?"))return;
  entries.splice(selected,1);
  dirty=false;
  select(entries.length?Math.min(selected,entries.length-1):-1,true);
  status.textContent="Removed.";
});
byId("reset").addEventListener("click",()=>{
  if(!window.confirm("Replace your work with the fictional sample?"))return;
  dirty=false;
  entries=structuredClone(data.sample);
  select(0);
  status.textContent="Fictional sample restored.";
});
byId("export").addEventListener("click",()=>{
  if(dirty){status.textContent="Save your edits before exporting.";return;}
  const markdown=["# "+data.name+" handoff","",...data.labels.map((label,index)=>"- "+label+" — "+metricValues()[index]),"",
    ...entries.flatMap(entry=>["## "+entry.claim, "",...data.fields.slice(1).map(([label,key])=>"- **"+label+"** — "+(entry[key]!==""?entry[key]:"Pending")), "- **Outcome** — "+outcome(entry),""])
  ].join("\n");
  const url=URL.createObjectURL(new Blob([markdown],{type:"text/markdown"}));
  const link=document.createElement("a");
  link.download=data.name.toLowerCase()+"-handoff.md";
  link.href=url;
  link.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
  status.textContent="Download started.";
});
byId("fields").append(...data.fields.map(([label,key])=>makeField(label,key)));
select(0);

