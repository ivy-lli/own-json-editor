import { JSONEditor } from "@json-editor/json-editor";
import { editors } from "@json-editor/json-editor/src/editors/index.js";
import { DialogIdEditor } from "./dialog-id-editor";
import { fetchConfig } from "./api";

function createEditor(data) {
  const element = document.querySelector('.editor');

  console.log(element);
  const editor = new JSONEditor(element, data);
  editor.on('ready',() => {
    editor.setValue(data.config);
    editor.validate();
  });
}

fetchConfig().then(result => createEditor(result));

Object.assign(JSONEditor.defaults.editors, {...editors, DialogIdEditor})
JSONEditor.defaults.resolvers.unshift(schema => schema.type==='string' && schema.format==='dialogid' && 'DialogIdEditor');
